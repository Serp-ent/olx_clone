export default function EditProfile() {
  return (
    <main className="p-4 bg-white">
      <h1 className="text-xl font-bold">Edit Profile</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded p-2 w-full bg-background border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded p-2 w-full border-primary bg-background"
            required
          />
        </div>
        <div>
          <label htmlFor="bio" className="block">Bio</label>
          <textarea
            id="bio"
            name="bio"
            className="border rounded p-2 w-full border-primary bg-background"
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white rounded p-2">Save Changes</button>
        </div>
      </form>
    </main>
  );
}