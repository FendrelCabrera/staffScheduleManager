import Link from "next/link";

export default function NavBar({ options = true }: {options?:boolean}) {
    return (
        <div className="bg-black text-white flex justify-between">
            <Link href="/">Schedule Manager</Link>
            
            {options && <div className="flex gap-2">
                <Link href="/addstaff">Add Staff</Link>
                <Link href="/changeschedule">Change Schedule</Link>
                <Link href="/displayschedule">Display Schedule</Link>
            </div>}
        </div>
    )
}