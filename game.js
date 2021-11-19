var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keydown(function() {
  if (!started) {
    console.log("KeyPress!");
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});

$(".btn").on("click", function(event) {
  userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})

function nextSequence() {

  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  $("#" + buttonColours[randomNumber]).fadeOut(100).fadeIn(100);

  playSound(buttonColours[randomNumber]);

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
  level++;

  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === currentLevel + 1) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }
  else {
    console.log("Wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function startOver() {
  $("h1").text("Game Over, Press Any Key to Restart");

  level = 0;
  started = false;
}
