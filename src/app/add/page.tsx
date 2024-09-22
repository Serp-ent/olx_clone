import db from '@/app/lib/prisma'
import fs from 'fs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';

const inputs = [
  { name: 'name', type: 'text', },
  { name: 'description', type: 'textarea', },
  { name: 'price', type: 'number', },
];

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

    const newProduct = await db.product.create({
      data: {
        name: form.name,
        description: form.description,
        price, // storing price as a number
        categoryId, // storing categoryId as a number
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
    <main className="p-2 bg-">
      <form
        action={create}
        method="POST"
        className="flex flex-col p-4 gap-4"
      >
        {inputs.map((input, i) => (
          <div
            key={i}
            className="flex flex-col"
          >
            <label
              htmlFor={input.name}
              className=""
            >
              {input.name}
            </label>
            {
              input.type !== 'textarea' ? (
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  className="bg-neutral-800 p-2 border-emerald-950 border-2 rounded"
                />
              ) : (
                <textarea
                  name={input.name}
                  id={input.name}
                  className="bg-neutral-800 p-2 border-emerald-950 border-2 rounded"
                />
              )
            }

          </div>
        ))}

        <div className='flex justify-center gap-4'>
          <label htmlFor='category'>
            Category:
          </label>
          <select
            id='category'
            name='category'
            className='bg-neutral-800 px-2 py-1 rounded w-1/2'
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
          <input type="file" name="photo" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-950 px-3 py-2 rounded"
          >
            Create
          </button>
        </div>

      </form>
    </main>
  );

}