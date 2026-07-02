"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics for smooth return and fluid motion
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map the mouse position to a rotation angle (-10 to 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to the center of the card (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Return to default flat state when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {/* 
        We wrap the children in a div with translateZ to give it a 3D pop effect. 
        When the card tilts, the content inside appears to hover slightly above the background card.
      */}
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
