const gametable = document.getElementById("keke")

const right=0
const up=1
const left=2
const down=3
const board={
    x:9,
    y:9
}

class snakeHead{
    score=0
    isFed=false;
    pos={
        x:4,
        y:0,
    }
    lastDirection
    direction=up
    isAlive=true
}

class snakeBody{
    pos={
        x:[],
        y:[]
    }
    posArray=[]
}

let head=new snakeHead
let body=new snakeBody
let food={x:randomNumber(0,board.x),y:randomNumber(0,board.y)}

document.addEventListener("keypress",(keyevent)=>{
    console.log(keyevent.key)
    if(keyevent.key==="d" && (head.lastDirection===1 || head.lastDirection===3)){
        head.direction=0
    }
    else if(keyevent.key==="w" && (head.lastDirection===2 || head.lastDirection===0)){
        head.direction=1
    }
    else if(keyevent.key==="a" && (head.lastDirection===1 || head.lastDirection===3)){
        head.direction=2
    }
    else if(keyevent.key==="s" && (head.lastDirection===2 || head.lastDirection===0)){
        head.direction=3
    }
})


console.log(head)


function randomNumber(min,max){
    return Math.floor(min+Math.random()*(max-min))
}


function turnRight(){
    head.direction--
    if(head.direction<0)
    head.direction=3
    head.direction%=4
    renderSnake()
}

function turnLeft(){
    head.direction++
    head.direction%=4
    renderSnake()
}


function bodyExists(x,y){
    return JSON.stringify(body.posArray).includes(`{"px":${x},"py":${y}}`)
}


function moveSnake(){
    head.isFed=false


    let tempPos={
        x: head.pos.x,
        y: head.pos.y
    }

    if(head.direction===up){
        if(head.pos.y===board.y || bodyExists(head.pos.x,head.pos.y+1)){
            head.isAlive=false
        }
        else{
            head.pos.y++
            head.lastDirection===up
        }
    } else if(head.direction===right) {
        if(head.pos.x===board.x || bodyExists(head.pos.x+1,head.pos.y)){
            head.isAlive=false
        }
        else{
            head.pos.x++
            head.lastDirection===right
        }
    } else if(head.direction===left) {
        if(head.pos.x===0 || bodyExists(head.pos.x-1,head.pos.y)){
            head.isAlive=false
        }
        else{
            head.pos.x--
            head.lastDirection===left
        }
    } else{
        if(head.pos.y===0 || bodyExists(head.pos.x,head.pos.y-1)){
            head.isAlive=false
        }
        else{
            head.pos.y--
            head.lastDirection===down
        }
    }


    if(head.score>0){
        if(head.isAlive===true){
            for(let i=body.pos.x.length-1;i>0;i--){
                body.pos.x[i]=body.pos.x[i-1]
                body.pos.y[i]=body.pos.y[i-1]
                body.posArray[i]={px: body.pos.x[i-1], py: body.pos.y[i-1]}
            }
            body.pos.x[0]=tempPos.x
            body.pos.y[0]=tempPos.y
            body.posArray[0]={px: tempPos.x, py: tempPos.y}
        }
    }


    if(head.pos.y===food.y && head.pos.x===food.x){
        if(head.score===0){
            body.pos.x[0]=head.pos.x
            body.pos.y[0]=head.pos.y
            body.posArray[0]={px: head.pos.x, py: head.pos.y}
        }else{
            body.pos.x[body.pos.x.length]=body.pos.x[body.pos.x.length-1]
            body.pos.y[body.pos.y.length]=body.pos.y[body.pos.y.length-1]
            body.posArray[body.pos.y.length-1]={px: body.pos.x[body.pos.x.length-2], py: body.pos.y[body.pos.y.length-2]}
        }
        food.x=randomNumber(0,board.x)
        food.y=randomNumber(0,board.y)
        while(bodyExists(food.x,food.y)){
            food.x=randomNumber(0,board.x)
            food.y=randomNumber(0,board.y)
        }
        head.isFed=true
        head.score++
    }
}


function directionToArrow(){
    if(head.direction===0){
        return "➡️"
    }else if(head.direction===1){
        return "⬆️"
    }else if(head.direction===2){
        return "⬅️"
    }else{
        return "⬇️"
    }
}


function snekStatus(){
    if(head.isFed===false && head.isAlive===true){
        return "normal"
    }
    else if(head.isFed===true && head.isAlive===true){
        return "fed"
    }
    else if(head.isFed===false && head.isAlive===false){
        return "dead"
    }
}


function renderSnake(){
    let game=""
    for(let y=board.y;y>=0;y--){
        for(let x=0;x<=board.x;x++){
            if(head.pos.x===x && head.pos.y===y){
                if(snekStatus()==="normal"){
                    game+="😐"
                }
                else if(snekStatus()==="fed"){
                    game+="😋"
                }
                else if(snekStatus()==="dead"){
                    game+="😭"
                }
            }
            else if(food.x===x && food.y===y){
                game+="🍬"
            }
            else if(bodyExists(x,y)){
                game+="🟢"
            }
            else{
                game+="⚫"
            }
        }
        game+="\n"
    }
    game+=`Direction = ${directionToArrow()}\n X: ${head.pos.x}\n Y: ${head.pos.y}`
    gametable.innerText=game
}


function progressGame(){
    if(head.isAlive===true){
        moveSnake()
    }
    renderSnake()
}

setInterval(() => {
    progressGame()
}, 200);
