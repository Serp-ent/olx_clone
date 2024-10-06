'use client';

import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleFavorites } from "../lib/actions";

interface FavoriteButtonProps {
  itemId: string;
  initialIsFavorite: boolean;
}

export default function FavoriteButton({ itemId, initialIsFavorite }: FavoriteButtonProps) {

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavoritesId = toggleFavorites.bind(null, itemId);

  return (
    <button onClick={async (e) => {
      setIsFavorite(!isFavorite);
      const updatedValue = await toggleFavoritesId();
      if (updatedValue) {
        setIsFavorite(updatedValue.isFavorited);
      } else {
        // on error move back
        setIsFavorite(isFavorite);
      }

      e.stopPropagation();
    }}>
      {isFavorite
        ? <BsHeartFill color="red" />
        : <BsHeart color="gray" />}
    </button>
  );
}