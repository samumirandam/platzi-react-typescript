import React, { useRef, useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const LazyImage = ({
  src,
  ...imageProps
}: LazyImageProps): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [srcCurrent, setSrcCurrent] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  );

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSrcCurrent(src);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={node} src={srcCurrent} alt={imageProps.alt} {...imageProps} />
  );
};
