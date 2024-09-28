import { auth } from "@/app/auth";
import { updateProfile } from "@/app/lib/actions";
import db from '@/app/lib/prisma';
import Link from "next/link";

const formFields = [
  { label: 'First Name', id: 'firstName', name: 'firstName', type: 'text', required: true },
  { label: 'Last Name', id: 'lastName', name: 'lastName', type: 'text', required: true },
  { label: 'Phone Number', id: 'phoneNumber', name: 'phoneNumber', type: 'text', required: false },
  { label: 'Street', id: 'street', name: 'street', type: 'text', required: false },
  { label: 'City', id: 'city', name: 'city', type: 'text', required: false },
  { label: 'State', id: 'state', name: 'state', type: 'text', required: false },
  { label: 'Postal Code', id: 'postalCode', name: 'postalCode', type: 'text', required: false },
  { label: 'Country', id: 'country', name: 'country', type: 'text', required: false },
];
export default async function EditProfile() {
  // TODO: add functionality
  // TODO: make sure the middleware includes that page

  const email = (await auth())?.user!.email;
  if (!email) {
    return "Unauthorized";
  }

  // TODO: defaultValue address too...
  const user = await db.user.findUnique({
    where: { email },
    include: { address: true },
  });

  const userData = {
    ...user,
    ...user?.address,
  }
  delete userData.address;

  console.log('userData', userData);

  return (
    <main className="p-4 bg-white">
      <h1 className="text-xl font-bold my-2">Edit Profile</h1>
      <form
        className="space-y-4"
        action={updateProfile}
      >
        {formFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              className="border rounded p-2 w-full border-primary bg-background"
              required={field.required}
              // TODO: fix implicit any type
              defaultValue={userData[field.name]}
            />
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}