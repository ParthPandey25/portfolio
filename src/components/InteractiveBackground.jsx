"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 150 // Distance at which particles react
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
        // Random drift speed (space-like floating)
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // Add a soft glow to particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }

      update() {
        // Space-like floating drift
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around screen bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Interaction with mouse cursor
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            // Scatter intensity calculation
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            // Push particles away (Scatter effect)
            this.x -= directionX * 3;
            this.y -= directionY * 3;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 3500;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        
        // Cyber/Space theme colors: emerald, cyan, slate-white
        let colors = ["#10b981", "#06b6d4", "#e2e8f0", "#334155"];
        let color = colors[Math.floor(Math.random() * colors.length)];
        
        particlesArray.push(new Particle(x, y, size, color));
      }
    }

    function animate() {
      // Clear with slight opacity for a subtle motion blur / trail effect
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        ctx.fillStyle = particlesArray[i].color;
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Draw the scattering orb around the cursor
      if (mouse.x != null && mouse.y != null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981"; // Emerald core
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#10b981";
        ctx.fill();
        ctx.closePath();
        
        // Outer energy ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(6, 182, 212, 0.2)"; // Cyan ring
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.closePath();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020617]">
      {/* Background depth gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020617] to-[#020617]"></div>
      {/* Dynamic Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-70" />
    </div>
  );
}
