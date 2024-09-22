import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Define the categories to be pushed into the database
  const categories = [
    {
      name: 'Electronics',
      imageUrl: '/images/categories/electronic.png'
    },
    {
      name: 'Clothing & Fashion',
      imageUrl: '/images/categories/clothing.png'
    },
    { name: 'Home & Kitchen' },
    { name: 'Beauty & Personal Care' },
    { name: 'Sports & Outdoors' },
    { name: 'Toys & Games' },
    { name: 'Books & Stationery' },
    { name: 'Automotive' },
    { name: 'Health & Wellness' },
    {
      name: 'Pets',
      imageUrl: '/images/categories/pets.jpeg'

    },
    { name: 'Groceries & Gourmet Food' },
    { name: 'Furniture' },
    { name: 'Office Supplies' },
    { name: 'Footwear' },
    { name: 'Jewelry & Watches' },
    { name: 'Travel & Luggage' }
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true, // Avoid inserting duplicate categories
  });

  console.log('Categories have been added to the database');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });