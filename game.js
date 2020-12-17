var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var level = 0;

//detect keyboard press for the first time
var firstStarted = false;
$(document).on("keydown", function(){
  if (!firstStarted){
    nextSequence();
    firstStarted = true;
  }
})
//To know the pattern of the user's button choices and store the series of choices into an array
var userClickPattern = [];
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
})

//right until step 3 the codes built under this function is to INITIALIZE THE CORRESPONDING BUTTON BEFORE PRESSING
function nextSequence(){
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

//create a function that calls different sounds
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation of the buttion when being clicked
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

//check the answer
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
      console.log("success");
      if (gamePattern.length === userClickPattern.length){
        setTimeout(nextSequence,1000);
      }
    }
  else{
    wrongAnswer();
    startOver();
  }
}

//wrong answer
function wrongAnswer(){
  console.log("wrong");
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");}, 200);
}

//start over
function startOver(){
  level = 0;
  gamePattern = [];
  firstStarted = false;
}
