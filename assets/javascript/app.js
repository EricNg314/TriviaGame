//========== Initialization Part 1 ===================================================//

//Create array for question objects.
//Create variable object to hold if answer is correct/incorrect/outOfTIme


//========= Initialization Part 2 ====================================================//

//Initial page should be cover with instructions.
//If start is clicked, then reset game etc.

//output to question page.
//If start is clicked, then apply reset game etc.
//Apply class "d-none" to id "jumbotronID".
//Remove class "d-none" from id "gameBoxID".


//========== Clicking Event to Question ===================================================//

//Start Delay Timer
//Display question, image, choices and timer.
//Click event to check answer.



//========== Clicking Event to Question(Choice Clicked) ===================================================//

//Timer pause.
//Create a delay timer for 4seconds to move on after the correct/incorrect.
//If correct then add 1 to wins and state "correct"
//If incorrect then add 1 to loss, state "incorrect", and what was correct answer.
//If timer is out, then add 1 to unanswered.

//Move to next question.
//Timer Reset
//Check if last question, if true then go to "Scoreboard"
////Apply class "d-none" to id "gameBoxID".
////Remove class "d-none" from id "scoreBoxID".

//ELSE Go to next question and back to "Clicking Event to Question"


//========== Event to Scoreboard ===================================================//  

//Show number of correct (wins)
//Show number of incorrect (loss)
//Show number of unanswered

//Click to restart.
//Remove class "d-none" from id "gameBoxID".
//Apply class "d-none" to id "scoreBoxID".


//========================================================================================//


//create a function to start game (or resetGame).
//create a function to output display for questions, answers, and scores.

//create a function to start timer.
//create a function to stop timer.
//create a function to reset timer.




$(document).ready(function () {

    //========== Initialization Part 1 ===================================================//
    var questionArr = [{
        question: "The answer is 1",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 0
    }, {
        question: "The answer is 2",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 1
    }, {
        question: "The answer is 3",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 2
    }, {
        question: "The answer is 4",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 3
    }, {
        question: "The answer is 1",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 0
    }, {
        question: "The answer is 2",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 1
    }, {
        question: "The answer is 3",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 2
    }, {
        question: "The answer is 4",
        image: "",
        choices: ["1", "2", "3", "4"],
        answer: 3
    }]

    var currQuestion = 0;
    var corrAnswer = 0;
    var incorrAnswer = 0;
    var noAnswer = 0;

    //creating basic timer and setting to 15 seconds.
    var timerInterval;
    var clockRunning = false;
    var clockTimer = {
        time: 15,
        reset: function () {
            clockTimer["time"] = 15;
        },
        start: function () {
            if (!clockRunning) {
                timerInterval = setInterval(clockTimer.timerDisplay, 1000);
                clockRunning = true;
            }
        },
        stop: function () {
            clearInterval(timerInterval);
            clockRunning = false;
        },
        timerDisplay: function () {
            clockTimer["time"]--;
            // console.log(clockTimer.time)
            $("#timerClock").text(clockTimer.time + " seconds.");
        }

    }

    $("#startGame").on("click", function () {
        $("#jumbotronID").addClass('d-none') //Hiding main page jumbotron.
        $("#gameBoxID").removeClass('d-none'); //Unhiding question box

        resetGame();
        applyQuestion();

    });

    function resetGame() {
        $("#correct").empty();
        $("#incorrect").empty();
        $("#unanswered").empty();
        currQuestion = 0;
        corrAnswer = 0;
        incorrAnswer = 0;
        noAnswer = 0;
    }


    function applyQuestion() {
        $("#answerMsg").text("Select an answer below:");
        $("#question").empty();
        $("#questionImg").empty();
        clockTimer.start();

        var dispQuestNumb = currQuestion + 1
        $("#questionNumb").text("Question " + dispQuestNumb + " out of " + questionArr.length);
        $("#question").text(questionArr[currQuestion]["question"]);
        $("#answer-1").text(questionArr[currQuestion]["choices"][0]);
        $("#answer-2").text(questionArr[currQuestion]["choices"][1]);
        $("#answer-3").text(questionArr[currQuestion]["choices"][2]);
        $("#answer-4").text(questionArr[currQuestion]["choices"][3]);

    }




});