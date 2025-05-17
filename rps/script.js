let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
const msg =document.querySelector("#msg");

const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");

const genCompchoice =()=>{
    const options =["rock","paper","scissors"];
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
    //rock , paper ,sicssor
}

const drawGame=()=>{
    msg.innerText="game was draw, play again!";
    msg.style.backgroundColor = "skyblue"
    msg.style.color = "black"


}
const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorepara.innerText= userScore;
        msg.innerText=`you win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green"
    }else{
        compScore++;
        compScorepara.innerText= compScore;
        msg.innerText=`you loose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red"

    }
};
const playGame = (userChoice) =>{

    const compChoice = genCompchoice();

    if(userChoice=== compChoice){
        //draw game
        drawGame();
    }else {
        let userWin = true;
        if (userChoice === "rock"){
            //scissor,paper
            userWin=compChoice ==="paper" ? false:true;
        }else if(userChoice === "paper"){
            //rock, scissor 
            userWin=compChoice ==="scissor" ? false:true;
        }
        else{
            //rock,paper
            userWin=compChoice === "rock"? false:true;
        }
        showWinner(userWin,userChoice,compChoice)
    }
};

choices.forEach((choice)=>{
    choice.addEventListener("click",() =>{
        const userChoice = choice.getAttribute("id")
        playGame(userChoice);
    });
});
