import NavBar from './navbar'
// import Link from 'next/link'
import "./home.css"

export default function Home() {
  return (
    <>
      {/* <NavBar options={false}/> */}

      {/* <Link href="addstaff">Add New Staff</Link>
          <Link href="changeschedule">Change Schedule</Link>
          <Link href="displayschedule">Display Schedule</Link> */}
    <div className='home'>

      <NavBar/>
      <div className='welcome-container'>
          
          <div className='welcome'>Welcome to NITC Library Schedule Manager</div>
      </div>
    </div>
    </>
  )
}
