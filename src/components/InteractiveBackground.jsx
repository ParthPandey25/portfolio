"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let scanlineY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const mouse = {
      x: null,
      y: null,
      radius: 140,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class CyberNode {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.8 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.4 ? "#10b981" : "#06b6d4"; // Emerald & Cyan SecOps palette
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse deflection (Active Sensor Disruption)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const fx = (dx / dist) * force * 4;
            const fy = (dy / dist) * force * 4;
            this.x -= fx;
            this.y -= fy;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function init() {
      particles = [];
      // Calculate node count proportional to screen area
      const nodeCount = Math.floor((canvas.width * canvas.height) / 9500);
      for (let i = 0; i < Math.min(nodeCount, 130); i++) {
        particles.push(
          new CyberNode(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    }

    function drawNetworkGrid() {
      // Connect close nodes with packet mesh telemetry lines
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = 1 - dist / 110;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.18})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Draw active probe connections to cursor
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const opacity = 1 - dist / mouse.radius;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Radar target cursor ping
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawTelemetryScanline() {
      scanlineY = (scanlineY + 1.2) % canvas.height;
      const grad = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY);
      grad.addColorStop(0, "rgba(16, 185, 129, 0)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0.04)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, scanlineY - 40, canvas.width, 40);

      ctx.beginPath();
      ctx.moveTo(0, scanlineY);
      ctx.lineTo(canvas.width, scanlineY);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawTelemetryScanline();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawNetworkGrid();

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020617]">
      {/* Subtle digital grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-[#020617]" />
      {/* Realtime Canvas Network Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </div>
  );
}
