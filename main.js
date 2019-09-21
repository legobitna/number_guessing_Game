let numberText=document.getElementById("numberText");
let guessButton=document.getElementById("guessButton");
let randomNumber=Math.floor((Math.random()*100) + 1);
let pTag=document.getElementById("result");

let countArea=document.getElementById("countArea");
let resetButton=document.getElementById("reset")
let count =10;
let history=[]; // value for save the history 
let historyArea=document.getElementById("historyArea");

let rounds=[]; // 여러라운드 보여주기 
let roundArea=document.getElementById("roundArea");
let roundsMessage="";

let bestGuess=[]; // 최고 라운드 보여주기 
let bestGuessAre=document.getElementById("bestGuessCount");

let timer=document.getElementById("timer");// 타이머 보여주기 
let time=0;
let myTime;
let timeHistory=[];

let remainTime=document.getElementById("remaintime");


let round=1;

function timeCounting(){ // 타이머 카운트 
    myTime = setInterval(function(){
        time +=1;
        timer.innerHTML=`time: ${time} sec`; // 진행시간 보여주기 
        remainTime.innerHTML=`remain Time: ${30-time} sec`// 남은시간 보여주기

        if(time==30){ // 30 초 다되면 종료 
            stopTimer();
            alert("you lost, reset the game to try again");
            guessButton.disabled=true;
        }
    },1000)
}
function stopTimer(){ // 타이머멈추기 
    clearInterval(myTime);

}
timeCounting(); // 타이머 시작 

// define button event 
guessButton.addEventListener('click',numberGuess);
resetButton.addEventListener('click',reset);

// when user click the guess button 
function numberGuess(){

    if(history.includes(numberText.value)){ // 이미 그 숫자를 말한경우 
        alert("you already guess this number");
        numberText.value="";
        return ;
    }
  
    --count;
    
    if(count==0){ // 0이면 더이상 추측 못하게 막기 
        guessButton.disabled=true;
        alert("game is done , reset the game to try again");
    }

    history.push(numberText.value); // 추측한 숫자들 넣기 

    let message; // too low , too high, correct 보여줄 메세지 
    if(numberText.value<randomNumber){// 너무 작으면 
        message="too low"
        pTag.setAttribute('class','alert alert-danger');
    }
    else if(numberText.value>randomNumber){ // 너무 크면 
        message="too high"
        pTag.setAttribute('class','alert alert-danger');
    } 
    else { // 맞으면 
        message="correct"
        guessButton.disabled=true;  
        pTag.setAttribute('class','alert alert-success');

        bestGuess.push(history.length); // 추측횟수배열에 넣기 
        bestGuessAre.innerHTML=Math.min.apply(null,bestGuess)+"tries";

        stopTimer();// 타이머 정지 
        timeHistory.push(time);//걸린시간 넣기 

        rounds.push(history);// 추측기록 남기기 

        roundsMessage += `<li>${round} round: ${history} in ${time} sec</li>`;// 기록에 남겨줄 메세지 
        round++; // 라운드 횟수 증가 

        
    }
    pTag.innerHTML=`${message}`;
    countArea.innerHTML=`remaining chance(${count})`;
    numberText.value="";
     roundArea.innerHTML=roundsMessage // 그동안 게임기록 보여주기 
    historyArea.innerHTML=history; // 추측한 숫자들 보여주기 
}

// when user click the reset button 
function reset(){
    
    count =10;
    guessButton.disabled=false;
    randomNumber=Math.floor((Math.random()*100) + 1);
    pTag.innerHTML=``;
    countArea.innerHTML=`remaining chance(${count})`;
    history=[];
    historyArea.innerHTML=``;
    pTag.setAttribute('class','alert alert-primary');
    time=0;
    timeCounting();


}

