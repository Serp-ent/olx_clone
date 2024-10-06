'use client';

import { useFormState, useFormStatus } from 'react-dom';
import TextAreaNextWrapper from '../components/TextAreaNextWrapper';
import { createAd } from '../lib/actions';
import { SubmitButton } from './SubmitButton';

const inputs = [
  { name: 'name', type: 'text', },
  { name: 'description', type: 'textarea', },
  { name: 'price', type: 'number', },
];

export default function AddItemForm({
  categories
}: {
  categories: {
    id: number;
    name: string;
    imageUrl: string | null;
  }[]
}) {
  const [
    errorMessage,
    formAction,
  ] = useFormState(createAd, {});

  return (
    <form
      action={formAction}
      className="flex flex-col p-4 gap-4"
    >
      {inputs.map((input, i) => (
        <div
          key={i}
          className="flex flex-col"
        >
          <label
            htmlFor={input.name}
            className="capitalize pb-1 text-sm"
          >
            {input.name}
          </label>
          {
            input.type !== 'textarea' ? (
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className="bg-background p-2 border-emerald-950 border rounded"
              />
            ) : (
              <TextAreaNextWrapper
                name={input.name}
                id={input.name}
                className="resize-none text-sm bg-background p-2 border-emerald-950 border rounded"
              />
            )
          }

          <div className='text-red-700 text-xs'>
            {errorMessage[input.name]}
          </div>

        </div>
      ))}

      <div className='flex justify-center gap-4 items-center'>
        <label htmlFor='category' className='capitalize text-sm'>
          category:
        </label>
        <select
          id='category'
          name='category'
          className='bg-background px-2 py-1 rounded w-1/2 text-xs'
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col'>
        <label htmlFor="photos">
          Photos:
        </label>
        <input type="file" name="photos" multiple className='text-xs' />
      </div>

      <div className="flex justify-end text-white">
        <SubmitButton />
      </div>

    </form>
  );
}