'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`bg-primary px-3 py-2 rounded ${pending && 'opacity-50 cursor-not-allowed'}`}
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </button>
  )
}