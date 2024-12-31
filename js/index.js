const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  let 맞은_개수 = 0;

  const handleBackspace = () => {
    index -= 1;
    const preBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    preBlock.innerText = null;
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:white; border:1px solid black; width:200px; height:100px; ";
    document.body.appendChild(div);
  };

  const gameover = () => {
    clearInterval(timer);
    window.removeEventListener("keydown", handleKeydown);
    if (맞은_개수 === 5) alert("you win");
    else alert("you lose");
    displayGameover();
  };

  const nextLine = () => {
    if (attempts === 5) gameover();
    index = 0;
    attempts += 1;
  };

  const handleEnterKey = () => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "green";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "orange";
      } else {
        block.style.background = "gray";
      }
      block.style.color = "white";
    }

    if (맞은_개수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
      // HTML속성을 비교하는 코드이기에 CSS문법에 따라 '='은 속성 값을 비교하기 위해서 쓰인다.
    );
    console.log(event.key);

    if (event.key === "Backspace" && index !== 0) {
      handleBackspace();
    } else if (event.key === "Enter" && index >= 5) {
      handleEnterKey();
    } else if (65 <= keyCode && keyCode <= 90 && index <= 4) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const 시작_시간 = new Date();
  const startTimer = () => {
    const 현재_시간 = new Date();
    const 흐른_시간 = new Date(현재_시간 - 시작_시간);
    const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
    const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
    const time = document.querySelector(".timer");
    time.innerText = `time : ${분}:${초}`;
  };

  timer = setInterval(startTimer, 1000);
  console.log(timer); // timer의 id가 호출된다.
  window.addEventListener("keydown", handleKeydown);
}

appStart();
