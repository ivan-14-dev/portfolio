import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const trailRef = useRef(null);
  const dotsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPositions = useRef([]);
  
  useEffect(() => {
    const numDots = 25;
    const dots = [];
    
    // Create trail squares
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(3, 10 - i * 0.3);
      const opacity = Math.max(0.05, 1 - i * 0.04);
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 123, 255, ${opacity});
        border-radius: 0;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%) rotate(${i * 15}deg);
        transition: transform 0.1s ease-out;
      `;
      document.body.appendChild(dot);
      dots.push(dot);
    }
    
    dotsRef.current = dots;
    dotPositions.current = Array(numDots).fill({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateDots = () => {
      dotsRef.current.forEach((dot, index) => {
        if (index === 0) {
          dotPositions.current[0] = { ...mousePos.current };
        } else {
          const prevPos = dotPositions.current[index - 1];
          const currentPos = dotPositions.current[index];
          
          // Smooth follow with delay based on index
          const ease = 0.08 + (index * 0.012);
          currentPos.x += (prevPos.x - currentPos.x) * ease;
          currentPos.y += (prevPos.y - currentPos.y) * ease;
        }
        
        const pos = dotPositions.current[index];
        dot.style.left = `${pos.x}px`;
        dot.style.top = `${pos.y}px`;
        dot.style.background = `rgba(0, 123, 255, ${Math.max(0.05, 1 - index * 0.04)})`;
      });
      
      requestAnimationFrame(animateDots);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateDots();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      dotsRef.current.forEach(dot => dot.remove());
    };
  }, []);

  return null;
};

export default CursorTrail;
