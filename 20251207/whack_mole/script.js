
// 痊癒變數
const time = document.getElementById("time")
const combo = document.getElementById("combo");
const animals = document.querySelectorAll(".imgs-box>img")
const startBtn = document.querySelector("button");

// 初始化執行
startBtn.addEventListener("click", startGame, { once: true });

animals.forEach((node, idx) => {
    node.addEventListener("click", () => getCount(node, idx));
});

//

// 函式區



function startGame() {
    console.log("GAME START~")
    startBtn.disabled = true;
    combo.textContent = 0;
    let sec = 6;
    time.textContent = sec;


    const timerID = setInterval(() => {
        time.textContent = --sec;

        if (sec === 0) {
            clearInterval(timerID);
            alert("TIMEOUT!")
            startBtn.disabled = false;
            startBtn.addEventlistener("click", startGame, { once: true });

        }

    }, 1000);

    // 規劃紅色事件
    for (let i = 0; i < 100; i++) {
        const space = Math.floor(Math.random() * 9);
        const showTimer = Math.floor(Math.random() * 56000);
        const delay = Math.floor(Math.random() * 3) + 2;

        setTimeout(() => toRedEvent({ space, delay }), showTimer);
    }

}



function toRedEvent({ space, delay }) {
    console.log(space, delay);
    const targetSpace = animals[space];

    if (targetSpace.src.includes('state')) {
        targetSpace.src = './img/on.png';
        setTimeout(() => targetSpace.src = './img/state.png', delay * 1000);
    }
    else {
        toRedEvent({ space: (space + 1) % 9, delay });
    }



}