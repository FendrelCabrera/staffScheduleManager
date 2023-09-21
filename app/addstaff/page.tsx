'use client';
import { FormEvent } from "react";
import NavBar from "../navbar";
import { addStaff } from "../helper";

export default function NewStaff() {

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        
        //@ts-ignore
        let dept: string = document.querySelector("#deptselect").value;
        //@ts-ignore
        let staffCode: string = document.querySelector("#newstaffcode").value;
        //@ts-ignore
        let name: string = document.querySelector("#newstaffname").value;
        
        addStaff(dept, staffCode, name).then(() => window.location.reload())
    }

    return (
        <>
            <NavBar />
            
            <form onSubmit={submitHandler} className="grid gap-y-10">
                <div className="grid grid-cols-2">
                    <label>Section</label>
                    <select id="deptselect">
                        <option value="assist">Lib Assistant</option>
                        <option value="helper">Lib Helper</option>
                        <option value="dlStaff">Digital Library</option>
                    </select>
                
                    <label>Staff Code</label>
                    <input id="newstaffcode" required></input>
                
                    <label>Name</label>
                    <input id="newstaffname" required></input>
                </div>

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}