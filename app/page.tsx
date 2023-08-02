'use client';

import React, { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';

import { LazyImage } from '@/components/LazyImage';
import { generateRandomID, generateRandomNumber } from '@/utils/generateRandom';

type ImageItem = {
  id: string;
  url: string;
  alt: string;
};

export default function Home(): JSX.Element {
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, foxId: number) => {
    event.preventDefault();

    setImages((prevState) => {
      return [
        ...prevState,
        {
          id: generateRandomID(),
          url: `https://randomfox.ca/images/${foxId}.jpg`,
          alt: `Image of fox #${foxId}`,
        },
      ];
    });
  };

  useEffect(() => {
    const foxId = generateRandomNumber();
    setImages([
      {
        id: generateRandomID(),
        url: `https://randomfox.ca/images/${foxId}.jpg`,
        alt: `Image of fox #${foxId}`,
      },
    ]);
  }, []);

  return (
    <main className="">
      <h1>What the fox says? 🤦</h1>
      <button
        type="button"
        onClick={(event) => handleClick(event, generateRandomNumber())}
      >
        Add new fox
      </button>
      {images.map((image) => (
        <div key={image.id} className="p-4">
          <LazyImage
            src={image.url}
            alt={image.alt}
            className="rounded bg-gray-300"
            width={320}
            height="auto"
          />
        </div>
      ))}
    </main>
  );
}
