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
    >
      <i className="ri-arrow-up-line"></i>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path 
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            strokeDasharray: `${pathLength} ${pathLength}`,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>
    </div>
  );
};
