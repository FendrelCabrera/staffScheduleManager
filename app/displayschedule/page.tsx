import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getAllStaff } from "../helper";

export default function DisplaySchedule() {
    useEffect(() => {
        const setData = async () => {
            setStaff(await getAllStaff());
        }

        setData();
    }, []);

    type dept = ("-1" | "helper" | "assist" | "dlStaff");

    const [allStaff, setStaff] = useState<{[key in dept]: [string, string, string][]}>( {
        "assist": [],
        "helper": [],
        "dlStaff": [],
        "-1": []
    }
    )


    return (
        <>
            <NavBar />

            Hello
        </>
    )
}