import axios from "axios";

type dept = ("-1" | "helper" | "assist" | "dlStaff");

const addStaff = async(dept: string, staffCode: string, name: string) => {
    let data = {
        dept,
        staffCode,
        name
    };

    try {
        let resp = await axios.post('/api/addstaff', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        console.log(resp);
    } catch(e) {
        console.log(e);
    }
}

const getAllStaff = async () => {
    let resp = await axios.get("/api/allstaff");

    let data : {[key in dept]: {[key:string]: [string, string]}} = resp.data;

    let ret:{[key in dept]: [string, string, string][]} = {
        "assist": [],
        "helper": [],
        "dlStaff": [],
        "-1": []
    };

    ret["assist"] = Object.entries(data["assist"]).map((e) => [e[0], ...e[1]]);
    ret["helper"] = Object.entries(data["helper"]).map((e) => [e[0], ...e[1]]);
    ret["dlStaff"] = Object.entries(data["dlStaff"]).map((e) => [e[0], ...e[1]]);
    
    return ret;
}

const updateSchedule = async (dept: string, staffCode: string, schedule: string) => {
    let data = {
        dept,
        staffCode,
        schedule
    };

    try {
        let resp = await axios.post('/api/updateschedule', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        console.log(resp);
    } catch(e) {
        console.log(e);
    }
}

export { addStaff, getAllStaff, updateSchedule };