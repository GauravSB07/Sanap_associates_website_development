import React, { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll > 0) {
        const progress = (currentScroll / totalScroll) * 100;
        setScrollProgress(progress);
      }

      if (currentScroll > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circumference for r=49 is ~307.8
  const pathLength = 307.8;
  const strokeDashoffset = pathLength - (scrollProgress / 100) * pathLength;

  return (
    <div 
      className={`progress-wrap ${isVisible ? 'active-progress' : ''}`}
      onClick={scrollToTop}
      title="Back to Top"
      aria-label="Back to Top"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 15px rgba(0, 37, 44, 0.15)',
        cursor: 'pointer',
        zIndex: 9999,
        display: isVisible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <i 
        className="ri-arrow-up-line"
        style={{
          fontSize: '20px',
          color: 'var(--color-primary, #00252C)',
          position: 'absolute',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      ></i>
      <svg 
        className="progress-circle svg-content" 
        width="48" 
        height="48" 
        viewBox="-1 -1 102 102"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '48px',
          height: '48px',
          pointerEvents: 'none'
        }}
      >
        <path 
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="var(--color-primary, #00252C)"
          strokeWidth="5"
          style={{
            strokeDasharray: `${pathLength} ${pathLength}`,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 100ms linear'
          }}
        />
      </svg>
    </div>
  );
};
