// ========================= Words and Essential Variables =========================

var randomWords = "counselor crafting firewood riflery cabin cots flag pier swimming theater susie vegetables volleyball gary katie camp nasa reagan space beth love conspiracy government henry gail andy coop mckinley lake summer tradition teenager";

var wordBank = randomWords.split(' ');

var randSelect = Math.floor(Math.random() * (wordBank.length-1));

var answerWin = wordBank[randSelect];

var selectedLetters = {};

var shownLetters = 0;

var gamePieces = ['.postUp','.floor','.postRight','.rope','.head','.body','.leftArm','.rightArm','.leftLeg','.rightLeg'];

var winner = '<div class="endGame">'+
  '<h1>You Win! On to the talent show!</h1>' +
  '<button type="button" class="btn btn-primary">Has anybody seen Coop?</button>'+
  '</div>';


var loser = '<div class="endGame">' +
    '<h1>You Lose.</h1>' +
    '<button type="button" class="btn btn-danger">Campfirewood is burning.</button>' +
  '</div>';

var gameHasEnded = false;


// ========================= Game Operation =========================


//Append letters to gameLetters div
var safeLetters = answerWin.split('').map(function(chars){
    return "<h3>"+chars+"</h3>";
});
$('.gameLetters').append(safeLetters);


//Post-game reload
function reloadEvent(){
   $('.endGame button').click(function(){
     location.reload(true);
  });
}

//Window kepress event
if (!gameHasEnded) {
$(window).keypress(function(e) {
  var key = String.fromCharCode(e.which);
    if (e.which < 97 || e.which > 122) {
      //a-z will be the only matches, else alert
        return alert("Charcter was typed. It was: " + key + " ...please type a lower-case letter");
    }



    //if the key pressed is valid...
    if (/[a-z]/.test(key)) {

      //check if key was already pressed
      if (selectedLetters.hasOwnProperty(key)) {
        return alert("You've already chosen that letter, try another");
      }
      else{

        //add to dictionary
        selectedLetters[key] = key;

        //if not pressed, add charGuessed class
          $('.letters').each(function(x){
            if ($(this).html().toLowerCase() === key) {
              $(this).addClass('charGuessed');
            }

          });
      }

        //Case that letter is contained in safeWord
        var inWord = false;
        $('.gameLetters h3').each(function(x){
          if ($(this).html() === key) {
            shownLetters++;
            inWord = true;
            $(this).css('color','darkorange');
          }
        });

        //Show the amount of correct letters
        $('#correct').html('Correct: '+shownLetters);

        //When not contained in safeWord
        if (inWord === false) {
          //reveal game piece and shift out of gamePieces array
          $(gamePieces[0]).removeClass('vanish');
          gamePieces.shift();

          //Show remaining chances
          $('#chances').html('Chances Remaining: '+gamePieces.length);

          //Show incorrect number of choices
          $('#incorrect').html('Incorrect: '+ (10-gamePieces.length));

          //If the array is empty, signal game over
          if (gamePieces.length === 0) {
            gameHasEnded = true;
            $('body').contents().fadeOut(2000);
            $('body').append(loser).fadeIn(4000);
          }
          reloadEvent();
        }

        //Action upon victory
        if (shownLetters === safeWord.length) {
          gameHasEnded = true;
          $('body').contents().fadeOut(2000);
          $('body').append(winner).fadeIn(4000);
          reloadEvent();
        }



    } //valid keypres

}); //window event
}