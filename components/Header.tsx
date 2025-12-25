
import Auth from '@/app/auth'
import InnerHeader from './InnerHeader'
import { currentUser } from '@clerk/nextjs/server'

export default async function Header() {
  const user=await currentUser()
  const isAdmin=user?.privateMetadata.isAdmin??false
  const auth=await Auth()
  return <InnerHeader isAdmin={isAdmin} auth={auth}/>
}

