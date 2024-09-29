'use client';

import { BsTrashFill } from "react-icons/bs";
import { deleteOffer } from "../lib/actions";

export default function DeleteOfferButton({ id, redirectLink }: { id: number, redirectLink: string | null }) {
  // TODO: maybe add name which element is being removed
  return (
    <button
      onClick={async () => {
        const response = confirm(`Are you sure you want to remove that item?`);
        if (!response) {
          return;
        }

        await deleteOffer(id, redirectLink);
      }}
    >
      <BsTrashFill />
    </button>
  );
}