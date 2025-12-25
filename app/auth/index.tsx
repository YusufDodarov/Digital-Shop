import { currentUser } from '@clerk/nextjs/server';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AdminMenu } from './AdminMenu';

export default async function Auth() {
  try {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin === true;
    return (
      <div>
        <SignedIn>
          {isAdmin ? (
              <div className='pt-4 scale-110'><AdminMenu /></div>) : (
              <div className='pt-4 scale-110'><UserButton /></div>)}
        </SignedIn>
        <SignedOut>
          <div className='bg-indigo-500  mt-[10px] text-white p-2 rounded-md cursor-pointer'>
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    );
  } catch (error) {
    return <div></div>}
}
