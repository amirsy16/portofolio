'use client';

import { useEffect, useState } from 'react';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function StaggeredText({ 
  text, 
  className = '', 
  delay = 30,
  duration = 0.3
}: StaggeredTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity ${duration}s ease, transform ${duration}s ease`,
            transitionDelay: `${index * delay}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
