'use client';

import { RandomFox } from '@/components/RandomFox';
import { generateRandomID, generateRandomNumber } from '@/utils/generateRandom';
import React, { useMemo, useState } from 'react';

type ImageItem = {
  id: string;
  url: string;
  alt: string;
};

export default function Home() {
  const foxId = useMemo(() => {
    return generateRandomNumber();
  }, []);

  const [images, setImages] = useState<ImageItem[]>([
    {
      id: generateRandomID(),
      url: `https://randomfox.ca/images/${foxId}.jpg`,
      alt: `Image of fox #${foxId}`,
    },
  ]);

  const handleClick = () => {
    setImages((prevState) => {
      const foxId = generateRandomNumber();
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

  return (
    <main className="">
      <h1>What the fox says? 🤦</h1>
      <button type="button" onClick={() => handleClick()}>
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
