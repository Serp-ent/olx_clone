'use client';

import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleFavorites } from "../lib/actions";

interface FavoriteButtonProps {
  itemId: string;
  initialIsFavorite: boolean;
}

// TODO: add optimistic ui
// TODO: add popup when item was added to favorites
export default function FavoriteButton({ itemId, initialIsFavorite }: FavoriteButtonProps) {

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);


  // TODO: add adding offer to favorites
  {/* TODO: there should be image carousel */ }
  // TODO: the image should fill whole width
  const toggleFavoritesId = toggleFavorites.bind(null, itemId);

  return (
    <button onClick={async (e) => {
      const updatedValue = await toggleFavoritesId();
      if (updatedValue) {
        setIsFavorite(updatedValue.isFavorited);
      }

      e.stopPropagation();
    }}>
      {isFavorite
        ? <BsHeartFill color="red" />
        : <BsHeart color="gray" />}
    </button>
  );
}