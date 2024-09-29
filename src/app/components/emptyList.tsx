'use client';
import { useRouter } from "next/navigation";

export default function EmptyList() {
  const router = useRouter();

  return (
    <section className='flex items-center justify-center h-full p-2 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 text-center'>
        <h1 className='text-xl font-bold text-gray-800 mb-4'>
          We did not find any results
        </h1>
        <p className='text-gray-600 mb-6'>
          Sorry, but it seems there’s nothing to display here.
        </p>
        <button
          onClick={() => router.back()}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'>
          Go Back
        </button>
      </div>
    </section>
  );
}