export default function showResult(target_El, content) {
    localStorage.setItem(+new Date, content);
    (function drawOnLoad() {
        let temp_arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            temp_arr.push(+localStorage.key(i));
        }
        temp_arr.sort();
        for (let i = 0; i < temp_arr.length; i++) {
            let item_time = new Date(temp_arr[i]);
            target_El.insertAdjacentHTML('afterend',
                `<th>${item_time.getDate()} / ${item_time.getMonth()} ${item_time.getHours()} : ${item_time.getMinutes()} </th>
                <th> ${localStorage.getItem(String(temp_arr[i]))} </th>
            `);
        }
    })();
}
