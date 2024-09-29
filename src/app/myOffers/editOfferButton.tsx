import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";

export default function EditOfferButton({ id }: { id: number }) {
  return (
    <Link
      href={'/TODO'}
    >
      <BsPencilFill />
    </Link>
  );
}