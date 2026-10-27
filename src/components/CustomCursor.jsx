import React, { useEffect, useRef } from 'react';

/**
 * Human-crafted bespoke Custom Cursor
 * - Surface-aware: automatically detects light/white surfaces vs dark surfaces
 * - Velocity-aware physics: subtle organic squash/stretch along movement angle
 * - Magnetic feel and smooth lerp interpolation
 * - Tactile click shockwave and rich contextual hover animations
 * - Note: cursor text badge feature removed per design specifications
 */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    // Only initialize on devices with fine pointer (mouse)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const inner = innerRef.current;
    const ripple = rippleRef.current;

    if (!cursor || !inner) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    const lerpSpeed = 0.16;
    let animationFrameId;

    // Follow cursor & check background luminance
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
        inner.style.opacity = '1';
        cursorX = mouseX;
        cursorY = mouseY;
      }

      // Fast immediate tracking for the inner dot
      inner.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Surface detection: check if cursor is over a dark section or white/light section
      const targetElem = document.elementFromPoint(mouseX, mouseY);
      if (targetElem) {
        const isDark = !!targetElem.closest(
          '[data-theme="dark"], .bg_primary, .hero-section, .founder-section, .site-master-footer, .why-us-enclosure, .cta-master-banner, .prestige-header'
        );
        
        if (isDark) {
          cursor.classList.remove('cursor--light-area');
          inner.classList.remove('cursor--light-area');
          cursor.classList.add('cursor--dark-area');
          inner.classList.add('cursor--dark-area');
        } else {
          cursor.classList.remove('cursor--dark-area');
          inner.classList.remove('cursor--dark-area');
          cursor.classList.add('cursor--light-area');
          inner.classList.add('cursor--light-area');
        }
      }
    };

    // Smooth outer ring physics with velocity stretch
    const animate = () => {
      if (isVisible) {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        const dist = Math.hypot(dx, dy);

        cursorX += dx * lerpSpeed;
        cursorY += dy * lerpSpeed;

        // Velocity-based squash & stretch (subtle and organic)
        if (!isHovering && dist > 1.5) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const stretch = Math.min(1.28, 1 + dist * 0.003);
          const squeeze = Math.max(0.78, 1 - dist * 0.0025);
          cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squeeze})`;
        } else {
          cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
      inner.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      inner.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrameId = requestAnimationFrame(animate);

    // Tactile Click Shockwave
    const handleMouseDown = () => {
      isClicking = true;
      cursor.classList.add('cursor--clicking');
      inner.classList.add('cursor--clicking');

      if (ripple) {
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        ripple.classList.remove('active');
        // Force reflow
        void ripple.offsetWidth;
        ripple.classList.add('active');
      }
    };

    const handleMouseUp = () => {
      isClicking = false;
      cursor.classList.remove('cursor--clicking');
      inner.classList.remove('cursor--clicking');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover detection on interactive elements
    const handleMouseOver = (e) => {
      const interactiveTarget = e.target.closest(
        'a, button, .btn, .brand-logo-card, .service-practice-card, .hallmark-card, .statutory-pillar-card, .hero-visual-card, .about-portrait-card, .founder-insignia-card, input, select, textarea, .category-filter-btn, .progress-wrap, .suggestion-chip'
      );

      if (interactiveTarget) {
        isHovering = true;
        cursor.classList.add('cursor--hover');
        inner.classList.add('cursor--hover');
      }
    };

    const handleMouseOut = (e) => {
      const interactiveTarget = e.target.closest(
        'a, button, .btn, .brand-logo-card, .service-practice-card, .hallmark-card, .statutory-pillar-card, .hero-visual-card, .about-portrait-card, .founder-insignia-card, input, select, textarea, .category-filter-btn, .progress-wrap, .suggestion-chip'
      );

      if (interactiveTarget) {
        isHovering = false;
        cursor.classList.remove('cursor--hover');
        inner.classList.remove('cursor--hover');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Outer interactive ring with dynamic surface adaptation */}
      <div className="custom-cursor-ring cursor--light-area" ref={cursorRef}></div>

      {/* Immediate tactile inner point */}
      <div className="custom-cursor-dot cursor--light-area" ref={innerRef}></div>

      {/* Click shockwave ripple element */}
      <div className="custom-cursor-ripple" ref={rippleRef}></div>
    </>
  );
};

export default CustomCursor;
