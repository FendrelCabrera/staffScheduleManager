'use client';
import NavBar from "../navbar";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { getAllStaff } from "../helper";

export default function DisplaySchedule() {
    useEffect(() => {
        const setData = async () => {
            setStaff(await getAllStaff());
        }

        setData();
    }, []);

    type dept = ("-1" | "helper" | "assist" | "dlStaff");
    const cyear = new Date().getFullYear();
    const [show, setShow] = useState<Boolean>(false);
    const [tableInput, setTI] = useState<string[][]>([]);

    const [allStaff, setStaff] = useState<{[key in dept]: [string, string, string][]}>( {
        "assist": [],
        "helper": [],
        "dlStaff": [],
        "-1": []
    }
    )

    const formatData = (d: string, year: number, month: number, entries: [string, string, string][]) => {
        let data: string[][] = [];
        let temp: string[] = [d];

        entries.forEach(item => {
            temp.push(item[0].concat(": ", item[1]))
        })
        data.push(temp);

        let cdate = new Date(year, month - 1, 1);
        let nodays = new Date(year, month, 0).getDate();

        let shifts = {
            "0": "Off",
            "1": "Morning",
            "2": "Evening",
            "3": "Night"
        };

        for(let day = 1; day <= nodays; day++) {
            temp = [cdate.toDateString()];
            let wday = cdate.getDay();

            entries.forEach(item => {
                //@ts-ignore
                temp.push(shifts[item[2][wday]])
            })

            data.push(temp);
            cdate.setDate(day + 1);
        }

        return data;
    }

    const validate:FormEventHandler = (e:FormEvent) => {
        e.preventDefault();

        //@ts-ignore
        let month = document.querySelector("#month").value
        //@ts-ignore
        let year = document.querySelector("#year").value
        //@ts-ignore
        let d: dept = document.querySelector("#deptSelect").value

        if(d == "-1")
            setShow(false);
        else {
            let dstring;
            if(d == 'assist')
                dstring = "Assistants"
            else if(d == 'dlStaff')
                dstring = "DL Staff"
            else
                dstring = "Helpers"

            setShow(true);
            setTI(formatData(dstring, year, month, allStaff[d]));
        }

        return;
    }

    const downloadCSV = () => {
        let csvData = tableInput.map(item => item.join(", ")).join("\n");
        const blob = new Blob([csvData], { type: "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <NavBar />

            <form className="grid grid-cols-2" onSubmit={validate}>
                <label>Section</label>
                {
                //@ts-ignore
                <select id="deptSelect">
                    <option value="assist">Lib Assistant</option>
                    <option value="helper">Lib Helper</option>
                    <option value="dlStaff">Digital Library</option>
                </select>
                }
            
                <label>Month</label>
                <input id="month" required type="number" min={1} max={12}/>

                <label>Year</label>
                <input id="year" required type="number" min={cyear} max={cyear+5}/>

                <input className="col-span-2" type="submit" value="Show Table" />
            </form>

            {show && <>
                <table>
                    {
                        tableInput.map(item => <tr>{item.map(subitem => <td>{subitem}</td>)}</tr>)
                    }
                </table>
                <button onClick={window.print}>Print Page</button>
                <button onClick={downloadCSV}>Download CSV file</button>
            </>}
        </>
    )
}