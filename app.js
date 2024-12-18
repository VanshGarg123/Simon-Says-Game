let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let highestScore = 0;
let highestadd = false;

let color = ["yellow","green","purple","red"];

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelup();
    }
})


function gameflash(button){
    button.classList.add("flash");
    setTimeout(()=>{
        button.classList.remove("flash");
    },250);
}

function userflash(button){
    button.classList.add("userflash");
    setTimeout(()=>{
        button.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random()*4);
    let randcolor = color[randidx];
    let randbtn = document.querySelector(`.${randcolor}`)

    gameseq.push(randcolor);
    gameflash(randbtn);
}


function checkAns(index){
    if(userseq[index] === gameseq[index]){
        if(index == gameseq.length-1){
            setTimeout(levelup,500);
        }
    }else{
        highestScore = Math.max(highestScore,level);
        if(highestadd == false){
            highestadd = true;
            let h3 = document.createElement("h3");
            h3.innerText = `Highest Score : ${highestScore}`;
            h1.insertAdjacentElement("afterend",h3);
        }else{
            let h3 = document.querySelector("h3");
            h3.innerText = `Highest Score : ${highestScore}`;
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key again to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}


function btnpress(){
    let btn = this;
    userflash(btn);

    let color = btn.getAttribute("id");
    userseq.push(color);
    
    checkAns(userseq.length-1);
}

let btns = document.querySelectorAll(".btn");
for (btn of btns) {
    btn.addEventListener("click",btnpress);
}

function reset(){
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}

