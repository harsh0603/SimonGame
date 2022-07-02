const buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


var start = false;
var level = 0;

$(".item").click(function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function () { 
    if(!start){
        $(".heading").text("level "+level);
          nextSequence();
          start = true;
    }
});








function checkAnswer(currentLevel){
     
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("succsess");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }


    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        // console.log("wrong");
          startOver();    
    }
}




function nextSequence(){
    userClickedPattern = [];

    level++;

    $(".heading").text("level "+level);

    var randomNumber = Math.floor((Math.random()*4));
   
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    
        
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        
        playSound(randomChosenColour);
      
    
    
    
}




function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");   //this to make the unselect buttons
    },100);
}



function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    start = false;
  }