'use client';
import { FormEvent } from "react";
import NavBar from "../navbar";
import { addStaff } from "../helper";
import "./addstaff.css";

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
        <div className="div-containers">
            <NavBar />
            
            <div className ="form-container">

                <form onSubmit={submitHandler} className="form" >
                    <div className="grid grid-cols-2 gap-y-5">
                        <label className="input-label">Section</label>
                        <select className="selected-option" id="deptselect">
                            <option className="drop-down" value="assist">Lib Assistant</option>
                            <option className="drop-down" value="helper">Lib Helper</option>
                            <option className="drop-down" value="dlStaff">Digital Library</option>
                        </select>
                    
                        <label className="input-label">Staff Code</label>
                        <input id="newstaffcode" className='input' required></input>
                    
                        <label className="input-label">Name</label>
                        <input id="newstaffname" className="input" required></input>
                    </div>

                    <div className="button-container"><input type="submit" value="Submit" className="submit-button" /></div>
                </form>
            </div>
        </div>
    )
}