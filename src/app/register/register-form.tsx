'use client';

import Link from "next/link";
import { authenticate, registerUser } from "../lib/actions";
import { useFormState } from "react-dom";

export default function RegisterForm() {
  const [
    errorMessage,
    formAction,
    isPending,
  ] = useFormState(registerUser, { error: undefined, errors: {} });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 p-4 text-emerald-950"
    >
      <h1 className="text-xl font-bold">Sign Up</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
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

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="font-semibold">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-emerald-700"
          placeholder="Confirm your password"
        />
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500">
          {errorMessage.errors && Object.entries(errorMessage.errors).map(([field, messages]) => (
            messages.map((msg, index) => (
              <p key={`${field}-${index}`}>{msg}</p>
            ))
          ))}
          {errorMessage.error && <p>{errorMessage.error}</p>}
        </div>
      )}


      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-emerald-950 text-white rounded-md disabled:opacity-50"
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>

      <p className="text-sm mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald-700 underline">
          Log in
        </Link>
      </p>
    </form>
  );
}