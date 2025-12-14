//全域變數宣告區：任何初始變數 & 套件宣告
let
    nationalHoliday = [],
    pallet = {},
    booked = [];


//服務區：所有fn 都整理在一起
const calenderService = () => {

    let theDay = dayjs();

    const
        today = dayjs(),
        objL = {
            listBox: '',
            title: '',
            thisDate: theDay
        },

        objR = {
            listBox: '',
            title: '',
            thisDate: theDay.add(1, 'month')
        };
    }
    listMaker = (obj) => {
        //obj.title = '新標題'
        //負責將指定的obj，利用obj.thisDate 產生對應的listBox & title 並覆蓋原本的obj


        //算出1st day是星期幾? >> 塞多少空白日
        const firstDay = obj.thisDate.date(1).day();

        for (let i = 1; i < (firstDay || 7); i++) {
            obj.listBox += '<li class="JSCal"></li>';
        }
    

        //算出當月有幾天
        const totalDay = obj.thisDate.daysInMonth(); //ans:31

        for (let i = 1; i <= totalDay; i++) {
        obj.listBox += `<li class="JSCal">${i}</li>`;
        }


    return obj;
};
listPrint = () => {
    //const newTitle = listMaker(objL).title;
    //console.log(newTitle, objL.title);
    //負責DOM操作，把產生的清單印到畫面上
    document.querySelector('leftDayList').innerHTML = listMaker(objL).listBox;
    document.querySelector('rightDayList').innerHTML = listMaker(objR).listBox;
}




//初次執行項目：任何第一次執行的工作
calenderService();
















/*fetch('./db.json',{method:'GET'}).then(function (res) {return res.json();
}).then(function(data){
    console.log(data);
});
*/

async function fetchData() {
    try {
        const res = fetch('./db.json', { method: 'GET' });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log('經TRY CATCH 捕捉問題' + err);

    }

}

fetchData()