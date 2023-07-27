import React from 'react';

type RandomFoxProps = {
  image: string;
  alt: string;
};

export const RandomFox = ({ image, alt }: RandomFoxProps): JSX.Element => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded" width={320} height="auto" src={image} alt={alt} />
  );
};
