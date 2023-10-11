import Link from "next/link";
import "./navbar.css"

export default function NavBar({ options = true }: {options?:boolean}) {
    return (
        // <div className="bg-black text-white flex justify-between">
        //     <Link href="/">Schedule Manager</Link>
            
        //     {options && <div className="flex gap-2">
        //         <Link href="/addstaff">Add Staff</Link>
        //         <Link href="/changeschedule">Change Schedule</Link>
        //         <Link href="/displayschedule">Display Schedule</Link>
        //     </div>}
        // </div>
        <div className="navbar navbar-container">
            <div className="nav-title">
                <Link href="/">Schedule Manager</Link>
            </div>

            {options && <div className="navbar-options">
                <div className="options">
                    <Link href="/addstaff">Add Staff</Link>
                </div>
                <div className="options">
                    <Link href="/changeschedule">Change Schedule</Link>
                </div>
                <div className="options">
                    <Link href="/displayschedule">Display Schedule</Link>
                </div>
            </div>}
        </div>
    )
}