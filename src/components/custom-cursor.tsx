'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOut = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      if (followerRef.current) {
        followerRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
      if (followerRef.current) {
        followerRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer') ||
                           target.closest('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer');
      setIsHovered(!!isInteractive);
    };
    
    // Apply comprehensive cursor hiding
    const applyCursorHiding = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          cursor: none !important;
        }
        html, body {
          cursor: none !important;
        }
        ::-webkit-scrollbar {
          cursor: none !important;
        }
        ::-webkit-scrollbar-thumb {
          cursor: none !important;
        }
        ::-webkit-scrollbar-track {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      return style;
    };

    const styleElement = applyCursorHiding();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      // Remove the style element to restore cursors
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={cn(
          'pointer-events-none fixed z-[9999] transition-all duration-150 ease-out',
          isClicked && 'scale-90',
          isHovered && 'scale-125'
        )}
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          willChange: 'transform',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(-2.8125deg)' }}
        >
          <path 
            d="M4.5 3.5L18.5 10.5L11.5 12.5L9.5 19.5L4.5 3.5Z" 
            fill={isHovered ? "#40E0D0" : "black"}
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Follower cursor */}
      <div
        ref={followerRef}
        className={cn(
          'pointer-events-none fixed z-[9998] transition-all duration-300 ease-out',
          isHovered && 'scale-150 opacity-30'
        )}
        style={{
          left: -12,
          top: -12,
          opacity: 0,
          willChange: 'transform',
          width: '24px',
          height: '24px',
          border: '2px solid #40E0D0',
          borderRadius: '50%',
          background: 'rgba(64, 224, 208, 0.1)'
        }}
      />
    </>
  );
}
