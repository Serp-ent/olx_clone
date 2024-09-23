'use client';

import { authenticate } from "../lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate, undefined,
  );

  return (
    <form
      className="flex flex-col gap-2 text-emerald-950"
      action={formAction}
    >
      <input name="email" />
      <input name="password" />
      <button
        type="submit"
        className="px-2 py-1 bg-emerald-950 text-white"
        aria-disabled={isPending}
      >
        Log in
      </button>

      {errorMessage && (
        <>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
}
