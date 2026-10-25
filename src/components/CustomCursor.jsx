import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [dotPosition, setDotPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setDotPosition({ x: e.clientX, y: e.clientY });
      
      // Slight lag for outer circle
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      // Check hovered elements
      const target = e.target.closest('[data-cursor-text], .case-card, .service-card, .btn, .industry-category-card');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text') || 
                     (target.classList.contains('case-card') ? 'View Case' : 
                      target.classList.contains('service-card') ? 'Explore' : '');
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor ${isHovered ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <span className="cursor-text-preview">{hoverText}</span>
      </div>
      <div 
        className="cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          opacity: isHovered ? 0 : 1
        }}
      />
    </>
  );
};
