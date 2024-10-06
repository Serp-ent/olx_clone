'use client';

import { BsTrashFill } from "react-icons/bs";
import { deleteOffer } from "../lib/actions";

export default function DeleteOfferButton({ id, redirectLink, name }: { id: number, redirectLink: string | null, name: string | undefined }) {
  const message = `Are you sure you want to remove ${name ? `item named '${name}'` : 'that item'}`;
  return (
    <button
      onClick={async () => {
        const response = confirm(message);
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