let numberText=document.getElementById("numberText");
let guessButton=document.getElementById("guessButton");
let randomNumber=Math.floor((Math.random()*100) + 1);
let pTag=document.getElementById("result");

let countArea=document.getElementById("countArea");
let resetButton=document.getElementById("reset")
let count =10;
let history=[]; // value for save the history 
let historyArea=document.getElementById("historyArea");

let rounds=[];
let roundArea=document.getElementById("roundArea");
let roundsMessage="";

let bestGuess=[];
let bestGuessAre=document.getElementById("bestGuessCount");

let timer=document.getElementById("timer");
let time=0;
let myTime;
let timeHistory=[];

let remainTime=document.getElementById("remaintime");


let round=1;

function timeCounting(){
    myTime = setInterval(function(){
        time +=1;
        timer.innerHTML=`time: ${time} sec`;;
        remainTime.innerHTML=`remain Time: ${30-time} sec`

        if(time==30){
            stopTimer();
            alert("you lost, reset the game to try again");
            guessButton.disabled=true;
        }
    },1000)
}
function stopTimer(){
    clearInterval(myTime);

}
timeCounting();

// define button event 
guessButton.addEventListener('click',numberGuess);
resetButton.addEventListener('click',reset);

// when user click the guess button 
function numberGuess(){

    if(history.includes(numberText.value)){
        alert("you already guess this number");
        numberText.value="";
        return ;
    }
  
    --count;
    
    if(count==0){
        guessButton.disabled=true;
        alert("game is done , reset the game to try again");
    }
    history.push(numberText.value);
    

    let message;
    if(numberText.value<randomNumber){
        message="too low"
        pTag.setAttribute('class','alert alert-danger');
    }
    else if(numberText.value>randomNumber){
        message="too high"
        pTag.setAttribute('class','alert alert-danger');
    } 
    else {
        message="correct"
        guessButton.disabled=true;  
        
        pTag.setAttribute('class','alert alert-success');
        bestGuess.push(history.length);
        bestGuessAre.innerHTML=Math.min.apply(null,bestGuess)+"tries";
        stopTimer();
        timeHistory.push(time);
        rounds.push(history);
        roundsMessage += `<li>${round} round: ${history} in ${time} sec</li>`;
        round++;

        
    }
    pTag.innerHTML=`${message}`;
    countArea.innerHTML=`remaining chance(${count})`;
    numberText.value="";
   
     
    
     roundArea.innerHTML=roundsMessage
    historyArea.innerHTML=history;
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

