'use client';

import Link from "next/link";
import { authenticate } from "../lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate, undefined,
  );


  return (
    <form className="flex flex-col gap-4 p-4 text-emerald-950" action={formAction}>
      <h1 className="text-xl font-bold">Login</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          // TODO: change to email
          // TODO: add client side validation
          type="name"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-emerald-700"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-emerald-700"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 px-4 py-2 bg-emerald-950 text-white rounded-md disabled:opacity-50"
      >
        {isPending ? 'Logging in...' : 'Log in'}
      </button>

      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}

      <p className="text-sm mt-4">
        Don't have an account?{' '}
        <Link href="/register" className="text-emerald-700 underline">
          Register now
        </Link>
      </p>
    </form>
  );
}
