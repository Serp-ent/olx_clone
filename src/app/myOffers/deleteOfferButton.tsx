'use client';

import { BsTrashFill } from "react-icons/bs";
import { deleteOffer } from "../lib/actions";

export default function DeleteOfferButton({id}: {id: number}) {
  // TODO: maybe add name which element is being removed
  return (
    <button
      onClick={async () => {
        const response = confirm(`Are you sure you want to remove that item?`);
        if (!response) {
          return;
        }

        await deleteOffer(id);
      }}
    >
      <BsTrashFill />
    </button>
  );
}