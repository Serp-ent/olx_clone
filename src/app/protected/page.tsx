import { auth } from "../auth";

export default async function ProtectedRoute() {
  const session = await auth();
  console.log(session);
  const message = session ? `Logged in as ${JSON.stringify(session.user)}` : 'Unauthenticated';
  return (
    <div>
      <p>{message}</p>
      This route is protected
    </div>
  );
}