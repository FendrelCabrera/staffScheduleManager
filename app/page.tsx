import NavBar from './navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <NavBar options={false}/>

      <Link href="addstaff">Add New Staff</Link>
      <Link href="changeschedule">Change Schedule</Link>
      <Link href="displayschedule">Display Schedule</Link>
    </>
  )
}
