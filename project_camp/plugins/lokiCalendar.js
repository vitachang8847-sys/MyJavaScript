//dayjs 初始化
dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore);

//全域變數宣告區：任何初始變數 & 套件宣告
let
    nationalHoliday = [],
    pallet = {},
    booked = [];

//初次執行項目：任何第一次執行的工作
/*fetch('./db.json',{method:'GET'}).then(function (res) {return res.json();
}).then(function(data){
    console.log(data);
});
*/

async function init() {
    const res = await fetch('./db.json', { method: 'GET' });
    const data = await res.json();
    // nationalHoliday = data.nationalHoliday; 
    // pallet = data.pallet;
    // booked = data.booked;
    ({ nationalHoliday, pallet, booked } = data);
    const service = calenderService(); //規劃成一個 "閉包"，回傳一個物件方法
    service.print();

    //規劃左右Click 事件，更改月份
    //document.querySelector('a[href="#prevCtrl"]')
    document.querySelector('a[href="#prevCtrl"]').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Sub button clicked!')
        service.sub();
    });
    document.querySelector('a[href="#nextCtrl"]').addEventListener('click', (e) => {
        e.preventDefault();
        service.add();
    });
}

init(); //擱置一下，待會等await 觸發再回來處理

//try & catch 捕捉問題
/*try {
    const res = fetch('./db.json', { method: 'GET' });
    const data = await res.json();
    console.log(data);
} catch (err) {
    console.log('經TRY CATCH 捕捉問題' + err);

}*/

//fetchData();




//服務區：所有fn 都整理在一起
const calenderService = () => {

    let theDay = dayjs();

    const today = dayjs();
    const objL = {
        listBox: '',
        title: '',
        thisDate: theDay
    };
    const objR = {
        listBox: '',
        title: '',
        thisDate: theDay.add(1, 'month')
    };

    changeMonth = (num) => {
        theDay = theDay.add(num, 'month');
        objL.thisDate = theDay;
        objR.thisDate = theDay.add(1, 'month');

        objL.listBox = '';
        objR.listBox = '';

        listPrint();
    };
    const listMaker = (obj) => {
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
            let className = 'JSCal'
            console.log(obj.thisDate.date(i).isSameOrBefore(today));
            //把i 轉成 dayjs，確認是否早於今日
            if (obj.thisDate.date(i).isSameOrBefore(today)) className += ' delDay';
            else {
                className += ' selectDay';

                //反之，才去評估否為假日
                /*method 1
                const isHoliday = obj.thisDate.date(i).day() === 0 || obj.thisDate.date(i).day() === 6;
                //method 2
                f = 0, isHoliday => (0, l) + 7 * n === i === 0, 1, 7, 8, 14, 15, 21, 22, 28, 29
                f = 1, isHoliday => (6, 7) + 7 * n === i === 6, 7, 13, 14, 20, 21, 27, 28
                f = 2, isHoliday => (5, 6) + 7 * n === i === 5, 6, 12, 13, 19, 20, 26, 27
                f = 3, isHoliday => (4, 5) + 7 * n === i === 4, 5, 11, 12, 18, 19, 25, 26
                f = 4, isHoliday => (3, 4) + 7 * n === i === 3, 4, 10, 11, 17, 18, 24, 25, 31
                f = 5, isHoliday => (2, 3) + 7 * n === i === 2, 3, 9, 10, 16, 17, 23, 24, 30
                f = 6, isHoliday => (l, 2) + 7 * n === i === 1, 2, 8, 9, 15, 16, 22, 23, 29, 30
                //當i從1 ~31，根據firstDay 是多少，判斷是不是红字
                // (i + firstDay)當被7除，餘數為0 =周六
                // (i + firstDay)當被7除，餘數為1 =周日
                */

                const theDayFormatStr = obj.thisDate.date(i).format('YYYY-MM-DD');

                const isHoliday = (i + firstDay) % 7 < 2 || nationalHoliday.includes(obj.thisDate.date(i).format('YYYY-MM-DD'));
                //console.log(obj.thisDate.date(i).format('YYYY-MM-DD'),nationalHoliday.includes(obj.thisDate.date(i).format('YYYY-MM-DD')));
                if (isHoliday) className += ' holiday';

                //客滿日期
                const checkDateBooked = booked.find((item) => item.date === theDayFormatStr);
                /*if(checkDateBooked){
                    const sellTotal
                    =checkDateBooked.sellout.aArea
                    +checkDateBooked.sellout.bArea
                    +checkDateBooked.sellout.cArea
                    +checkDateBooked.sellout.dArea;
                    if (pallet.count === sellTotal) className += ' fullDay';
                }
                */
                if (checkDateBooked && Object.values(checkDateBooked.sellout).reduce((acc, cur) => acc + cur, 0) === pallet.count) className += ' fullDay';

            }
            obj.listBox += `<li class="${className}">${i}</li>`;


        }
        //更新標題包含年月份
        obj.title = `${obj.thisDate.year()} ${dayjs.monthsShort()[obj.thisDate.month()]}`;
        return obj;

    };
    const listPrint = () => {
        //const newTitle = listMaker(objL).title;
        //console.log(newTitle, objL.title);
        //負責DOM操作，把產生的清單印到畫面上
        document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
        document.querySelector('.leftBar>h4').innerHTML = objL.title;
        document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
        document.querySelector('.rightBar>h4').innerHTML = objR.title;

        //console.log(objL, objR)
    };

    return {
        print: () => listPrint()
    }
};

//listPrint();


