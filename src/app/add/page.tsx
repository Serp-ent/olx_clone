import db from '@/app/lib/prisma'
import fs from 'fs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import { auth } from '../auth';

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
  async function create(formData: FormData) {
    'use server';

    const form = {
      name: formData.get('name')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      price: formData.get('price')?.toString() || '',
      categoryId: formData.get('category')?.toString() || '',
    };

    const price = parseFloat(form.price);
    const categoryId = parseInt(form.categoryId, 10);
    const photoFile = formData.get('photo') as File;

    if (!form.name || isNaN(price) || isNaN(categoryId) || !photoFile) {
      throw new Error('Invalid form data');
    }

    // TODO: the session should contain user id
    const email = (await auth())!.user!.email!;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Cannot find user for current session');
    }

    const newProduct = await db.item.create({
      data: {
        name: form.name,
        description: form.description,
        price, // storing price as a number
        categoryId, // storing categoryId as a number
        authorId: user.id,
      },
    });

    if (photoFile) {
      const buffer = await photoFile.arrayBuffer();
      const photoBuffer = Buffer.from(buffer);

      const destinationPath = path.join(
        process.cwd(),
        'public',
        'items',
        newProduct.id.toString()
      );

      // Ensure the directory exists
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }

      const filePath = path.join(destinationPath, photoFile.name);

      fs.writeFileSync(filePath, photoBuffer);

      const imageUrl = `/items/${newProduct.id}/${photoFile.name}`;
      await db.productImage.create({
        data: {
          url: imageUrl,
          productId: newProduct.id,
        },
      });
    }

    revalidatePath('/');
    redirect('/');
  }
  const categories = await db.category.findMany();

  return (
    <main className="p-2 bg-white">
      <form
        action={create}
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

        {/* TODO: handle multiple images */}
        <div className='flex flex-col'>
          <label htmlFor="photo">
            Photo:
          </label>
          <input type="file" name="photo" className='text-xs' />
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