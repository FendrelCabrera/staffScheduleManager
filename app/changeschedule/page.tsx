'use client';
import { FormEvent, useEffect, useState } from "react";
import NavBar from "../navbar";
import { getAllStaff, updateSchedule } from "../helper";

export default function ChangeSchedule() {

    useEffect(() => {
        const setData = async () => {
            setStaff(await getAllStaff());
            setPeople(allStaff["assist"]);
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
    const [people, setPeople] = useState<[string, string, string][]>([]);
    const [person, setPerson] = useState<[dept, string, string]>(["-1", "-1", "-1"]);

    const populate = (e: any) => {
        let val: dept = e.target.value;

        setPeople(allStaff[val]);
        setPerson([val, "-1", "-1"]);

        //@ts-ignore
        let s:HTMLSelectElement = document.querySelector("#peoplelist");
        s.value = "-1";
    } 

    const memberFound = (e: any) => {
        setPerson([person[0], "-1", "-1"]);

        if(e.target.value != "-1") {
            let identifer: [string, string] = e.target.value.split(",");
            setPerson([person[0], ...identifer]);
            
            if(document.querySelector('#mon')) {
                //@ts-ignore
                document.querySelector('#mon').value = identifer[1][1];
                //@ts-ignore
                document.querySelector("#tue").value = identifer[1][2];
                //@ts-ignore
                document.querySelector("#wed").value = identifer[1][3];
                //@ts-ignore
                document.querySelector("#thurs").value = identifer[1][4];
                //@ts-ignore
                document.querySelector("#fri").value = identifer[1][5];
                //@ts-ignore
                document.querySelector("#sat").value = identifer[1][6];
                //@ts-ignore
                document.querySelector("#sun").value = identifer[1][0];
            }
        } else
            setPerson([person[0], "-1", "-1"]);
    }

    const updateScheduleForm = (e: any, i: number) => {
        let sc = person[2].split("");
        sc[i] = e.target.value;

        setPerson([person[0], person[1], sc.join("")]);
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if(person[2] === "-1")
            alert("No one selected !!");
        else {
            // console.log(person);
            updateSchedule(...person).then(() => window.location.reload());
        }

    }

    // const peopleMenu = <select name="Member" onChange={memberFound} defaultValue="-1">
    //     <option value="-1">Select</option>
    //     {
    //         people.map((x: any, i: number) => <option key={i} value={[x[0], x[2]]}>{x[1]}</option>)
    //     }
    // </select>

    return (
        <div className = "div-containers">
            <NavBar />
            <div className="form-container">
                
                <form onSubmit={submitHandler} className="form">
                    <div className="grid grid-cols-2 gap-y-5">
                        <label>Section</label>
                        <select name="Section" onChange={populate} defaultValue={-1}>
                            <option className="drop-down" value="-1">Select</option>
                            <option className="drop-down" value="assist">Lib Assistant</option>
                            <option className="drop-down" value="helper">Lib Helper</option>
                            <option className="drop-down" value="dlStaff">Digital Library</option>
                        </select>
                    
                        {
                        people && <>
                            <label>Member</label>
                            <select id="peoplelist" onChange={memberFound} defaultValue="-1">
                                <option className="drop-down" value="-1">Select</option>
                                {
                                    people.map((x: any, i: number) => <option key={i} value={[x[0], x[2]]}>{x[0]}: {x[1]}</option>)
                                }
                            </select>
                        </>
                        }

                        {
                        person[1] != "-1" && 
                            <>
                                <label>Monday</label>
                                <select id="mon" defaultValue={person[2][1]} onChange={e => updateScheduleForm(e, 1)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>    

                                <label>Tuesday</label>
                                <select id="tue" defaultValue={person[2][2]} onChange={e => updateScheduleForm(e, 2)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>

                                <label>Wednesday</label>
                                <select id="wed" defaultValue={person[2][3]} onChange={e => updateScheduleForm(e, 3)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>

                                <label>Thursday</label>
                                <select id="thurs" defaultValue={person[2][4]} onChange={e => updateScheduleForm(e, 4)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>

                                <label>Friday</label>
                                <select id="fri" defaultValue={person[2][5]} onChange={e => updateScheduleForm(e, 5)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>

                                <label>Saturday</label>
                                <select id="sat" defaultValue={person[2][6]} onChange={e => updateScheduleForm(e, 6)}>
                                    <option value={0}>Off</option>
                                    <option value={1}>Morning</option>
                                    <option value={2}>Evening</option>
                                    <option value={3}>Night</option>
                                </select>

                                <label>Sunday</label>
                                <select id="sun" defaultValue={person[2][0]} onChange={e => updateScheduleForm(e, 0)}>
                                    <option className="drop-down" value={0}>Off</option>
                                    <option className="drop-down" value={1}>Morning</option>
                                    <option className="drop-down" value={2}>Evening</option>
                                    <option className="drop-down" value={3}>Night</option>
                                </select>
                            </>
                        }
                    </div>

                    <input type="submit" value="Submit" className="submit-button" />
                </form>
            </div>
        </div>
    )
}