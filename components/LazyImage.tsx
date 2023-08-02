import React, { useRef, useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
}

export const LazyImage = ({
  src,
  onLazyLoad,
  ...imageProps
}: LazyImageProps): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  );
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);

        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLazyLoaded]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={node} src={currentSrc} alt={imageProps.alt} {...imageProps} />
  );
};
