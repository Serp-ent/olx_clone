import Profile from "../profile";

export default function UserIdProfilePage({ params }:
  { params: { userId: string } }
) {
  // TODO: if its user own profile redirect just to /profile page
  // TODO: create custom 404 page
  // TODO: create custom error fetching page
  // TODO: create loading page (maybe skeleton?)

  return <Profile userId={params.userId}></Profile>;
}