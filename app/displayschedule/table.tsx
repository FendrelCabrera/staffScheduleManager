export default function Table( { options }: {options: [number, number, [string, string, string][]]}) {
    let [month, year, entries] = options;

    let data: String[][] = [];
    let temp: String[] = [""];

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

    return (
        <table>
            {
                data.map(item => <tr>{item.map(subitem => <td>{subitem}</td>)}</tr>)
            }
        </table>
    )
}