
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x_cor = 50;
var y_cor = 50;
var rad  = 50;
var score = 0;
var time = 60; //  game last for 1 min 
draw_circle();

function clear_screen()
{
    ctx.clearRect(0, 0, c.width, c.height);
}
function draw_circle()
{
    clear_screen();
    x_cor = 50 + Math.random()*350;
    y_cor = 50 + Math.random()*350;

    ctx.beginPath();
    for(let i = 0 ; i < rad / 5 ; i ++)
    ctx.arc(x_cor, y_cor, i*5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}


c.addEventListener('click', logKey);
function logKey(e) {
    
    var x  = (e.offsetX);
    var y  = (e.offsetY);

    var dist = distance(x , y , x_cor , y_cor);
    console.log(dist);
    console.log(x , y , x_cor , y_cor);
    
    if(dist <= rad)
    {
        console.log("correct");
        score += rad - dist;
        // goto next level
        draw_circle();
    }
    else{
        game_over(true);

    }
    document.getElementById("score").innerHTML = "SCORE : "+parseFloat(score).toFixed(2);
        
}

function distance(x, y ,x1 , y1)
{
    return ((x - x1)**2 + (y-y1)**2)**0.5;
}
function game_over(check)
{
    var count = localStorage.getItem("count");

    if (count == null)
    {
        count = 0;
    }           
    count = parseInt(count) + 1;
    

    if(check == false)
    {
        var name = prompt("GOOD WORK\n\nEnter your name : ");
    }
    else{
        var name = prompt("GAME OVER\n\nEnter your name : ");
    }
    
    localStorage.setItem("Name"+count,name);
    localStorage.setItem("Score"+count,score);
    localStorage.setItem("count" ,count);
    
    window.location.href = "leaderboard.html";
}
setTimeout(() => {
    game_over(false);
  }, time*1000)