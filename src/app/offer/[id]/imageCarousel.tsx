"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';
import Slider from "react-slick";

interface ImageCarouselProps {
  id: number;
  url: string
}

export default function ImageCarousel({ images }: { images: ImageCarouselProps[] }) {
  if (!images || images.length === 0) {
    return <p>No images available</p>; // Handle empty images
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id} className="relative h-44">
          <Image
            src={image.url}
            alt={`Image ${image.id}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </Slider>
  );
}