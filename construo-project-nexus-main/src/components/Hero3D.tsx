
import { useEffect, useRef } from "react";

const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;
    const mouse = { x: 0, y: 0 };
    
    // Construction-themed shapes
    const shapes: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      type: 'building' | 'crane' | 'blueprint' | 'gear' | 'pyramid';
      rotation: { x: number; y: number; z: number };
      color: string;
      speed: number;
      originalX: number;
      originalY: number;
    }> = [];

    // Initialize construction shapes
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 400;
      shapes.push({
        x,
        y,
        z: (Math.random() - 0.5) * 300,
        size: Math.random() * 40 + 25,
        type: ['building', 'crane', 'blueprint', 'gear', 'pyramid'][Math.floor(Math.random() * 5)] as any,
        rotation: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2
        },
        color: `hsl(${Math.random() * 40 + 200}, ${Math.random() * 30 + 60}%, ${Math.random() * 20 + 55}%)`,
        speed: Math.random() * 0.5 + 0.2,
        originalX: x,
        originalY: y
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouse.y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Draw building shape
    const drawBuilding = (ctx: CanvasRenderingContext2D, size: number) => {
      const width = size;
      const height = size * 1.5;
      
      // Main building
      ctx.fillRect(-width/2, -height/2, width, height);
      ctx.strokeRect(-width/2, -height/2, width, height);
      
      // Windows
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          const windowX = -width/2 + (width/4) * (i + 0.5);
          const windowY = -height/2 + (height/5) * (j + 0.5);
          ctx.fillRect(windowX - 3, windowY - 3, 6, 6);
        }
      }
      
      // Roof
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(-width/2, -height/2);
      ctx.lineTo(0, -height/2 - 15);
      ctx.lineTo(width/2, -height/2);
      ctx.closePath();
      ctx.fill();
    };

    // Draw crane shape
    const drawCrane = (ctx: CanvasRenderingContext2D, size: number) => {
      const baseWidth = size * 0.3;
      const height = size * 1.8;
      
      // Base
      ctx.fillRect(-baseWidth/2, height/2 - 10, baseWidth, 20);
      
      // Mast
      ctx.fillRect(-3, -height/2, 6, height);
      
      // Jib
      ctx.fillRect(-3, -height/2, size * 0.8, 4);
      
      // Counter jib
      ctx.fillRect(-size * 0.3, -height/2, size * 0.3, 3);
      
      // Hook line
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(size * 0.6, -height/2 + 4);
      ctx.lineTo(size * 0.6, -height/2 + 30);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Draw blueprint shape
    const drawBlueprint = (ctx: CanvasRenderingContext2D, size: number) => {
      // Paper background
      ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
      ctx.fillRect(-size/2, -size/2, size, size * 0.7);
      ctx.strokeRect(-size/2, -size/2, size, size * 0.7);
      
      // Blueprint lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      
      // Grid lines
      for (let i = 1; i < 4; i++) {
        const x = -size/2 + (size/4) * i;
        ctx.beginPath();
        ctx.moveTo(x, -size/2);
        ctx.lineTo(x, -size/2 + size * 0.7);
        ctx.stroke();
      }
      
      for (let i = 1; i < 3; i++) {
        const y = -size/2 + (size * 0.7 / 3) * i;
        ctx.beginPath();
        ctx.moveTo(-size/2, y);
        ctx.lineTo(size/2, y);
        ctx.stroke();
      }
    };

    // Draw gear shape
    const drawGear = (ctx: CanvasRenderingContext2D, size: number) => {
      const outerRadius = size / 2;
      const innerRadius = outerRadius * 0.6;
      const teeth = 8;
      
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const angle = (i * Math.PI) / teeth;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Center hole
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw pyramid shape
    const drawPyramid = (ctx: CanvasRenderingContext2D, size: number) => {
      // Front face
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Side face (lighter)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(size/2, size/2);
      ctx.lineTo(size/3, size/3);
      ctx.lineTo(size/6, -size/6);
      ctx.closePath();
      ctx.fill();
    };

    // Animation function
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create dynamic gradient background
      const gradient = ctx.createRadialGradient(
        width/2 + mouse.x * 100, 
        height/2 + mouse.y * 100, 
        0, 
        width/2, 
        height/2, 
        Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.05)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.03)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      time += 0.008;

      // Draw and animate shapes
      shapes.forEach((shape, index) => {
        // Parallax effect based on z-depth
        const parallaxX = mouse.x * (1 + shape.z * 0.002) * 50;
        const parallaxY = mouse.y * (1 + shape.z * 0.002) * 50;
        
        // 3D perspective calculation
        const perspective = 400;
        const scale = perspective / (perspective + shape.z);
        
        // Floating animation
        const floatX = Math.sin(time * shape.speed + index * 0.5) * 20;
        const floatY = Math.cos(time * shape.speed * 0.7 + index * 0.3) * 15;
        
        const screenX = width / 2 + (shape.originalX + floatX + parallaxX) * scale;
        const screenY = height / 2 + (shape.originalY + floatY + parallaxY) * scale;
        const size = shape.size * scale;

        // Update rotation with different speeds
        shape.rotation.x += 0.003 * shape.speed;
        shape.rotation.y += 0.002 * shape.speed;
        shape.rotation.z += 0.004 * shape.speed;

        // Skip if shape is outside viewport
        if (screenX < -size || screenX > width + size || 
            screenY < -size || screenY > height + size) return;

        // Draw shape with 3D transformations
        ctx.save();
        ctx.translate(screenX, screenY);
        
        // Apply rotation based on shape type
        if (shape.type === 'gear') {
          ctx.rotate(shape.rotation.z);
        } else {
          ctx.rotate(shape.rotation.y * 0.5);
        }
        
        // Set opacity based on z-depth
        ctx.globalAlpha = Math.max(0.3, 1 - Math.abs(shape.z) / 300);
        
        ctx.fillStyle = shape.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = Math.max(0.5, scale);

        // Draw shape based on type
        switch (shape.type) {
          case 'building':
            drawBuilding(ctx, size);
            break;
          case 'crane':
            drawCrane(ctx, size);
            break;
          case 'blueprint':
            drawBlueprint(ctx, size);
            break;
          case 'gear':
            drawGear(ctx, size);
            break;
          case 'pyramid':
            drawPyramid(ctx, size);
            break;
        }

        ctx.restore();
      });

      // Add floating particles for depth
      for (let i = 0; i < 30; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 0.3) * 200) + width / 2;
        const particleY = (Math.cos(time * 0.3 + i * 0.7) * 150) + height / 2;
        const particleZ = Math.sin(time + i) * 100;
        const particleScale = 400 / (400 + particleZ);
        const alpha = Math.sin(time * 2 + i) * 0.3 + 0.2;
        
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * particleScale})`;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 1.5 * particleScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add connecting lines between nearby shapes
      shapes.forEach((shape1, i) => {
        shapes.slice(i + 1, i + 3).forEach(shape2 => {
          const dx = shape1.x - shape2.x;
          const dy = shape1.y - shape2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const scale1 = 400 / (400 + shape1.z);
            const scale2 = 400 / (400 + shape2.z);
            
            const x1 = width / 2 + shape1.x * scale1;
            const y1 = height / 2 + shape1.y * scale1;
            const x2 = width / 2 + shape2.x * scale2;
            const y2 = height / 2 + shape2.y * scale2;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default Hero3D;
