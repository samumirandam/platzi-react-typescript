'use client';

import React, { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';

import { RandomFox } from '@/components/RandomFox';
import { generateRandomID, generateRandomNumber } from '@/utils/generateRandom';

type ImageItem = {
  id: string;
  url: string;
  alt: string;
};

export default function Home() {
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
          <RandomFox image={image.url} alt={image.alt} />
        </div>
      ))}
    </main>
  );
}
