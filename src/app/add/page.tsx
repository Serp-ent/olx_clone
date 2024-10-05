import db from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { createAd } from '../lib/actions';

const inputs = [
  { name: 'name', type: 'text', },
  { name: 'description', type: 'textarea', },
  { name: 'price', type: 'number', },
];


/* TODO: each category requires their own filters
e.g. cars have price, model, production date hp etc...
*/

// TODO: change appearance
// TODO: textarea of description should expand and not be scrollable
// on multiline input

export default async function AddPage() {
  // TODO: add validation using zod
  // TODO: there is undefined file added when no photo is submitted

  const categories = await db.category.findMany();

  return (
    <main className="p-2 bg-white">
      <form
        action={createAd}
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
                <textarea
                  name={input.name}
                  id={input.name}
                  className="bg-background p-2 border-emerald-950 border rounded"
                />
              )
            }

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
          <button
            type="submit"
            className="bg-primary px-3 py-2 rounded"
          >
            Create
          </button>
        </div>

      </form>
    </main>
  );

}