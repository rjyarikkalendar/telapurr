
import React, { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  elementId: string;
}

export const ScrollIndicator = ({ elementId }: ScrollIndicatorProps) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const handleScroll = () => {
      const scrollWidth = element.scrollWidth - element.clientWidth;
      const percentage = (element.scrollLeft / scrollWidth) * 100;
      setScrollPercentage(percentage);
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [elementId]);

  return (
    <div className="w-full h-0.5 bg-tea-brown/20 mt-2">
      <div
        className="h-full bg-tea-brown transition-all duration-150"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
