import React, { useRef, useEffect, useState } from 'react';

type RandomFoxProps = {
  image: string;
  alt: string;
};

export const RandomFox = ({ image, alt }: RandomFoxProps): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  );

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSrc(image);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [image]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={node}
      className="rounded bg-gray-300"
      width={320}
      height="auto"
      src={src}
      alt={alt}
    />
  );
};
