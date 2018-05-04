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
        question: "Based on the graph above when are people more willing to buy?",
        image: "assets/images/PAndQ_Demand.gif",
        choices: ["Point: A", "Point: B", "Point: C", "Answer N/A in graph."],
        answer: 2
    }, {
        question: "Based on the graph above when are people more willing to sell?",
        image: "assets/images/PAndQ_Supply.gif",
        choices: ["Point: A", "Point: B", "Point: C", "Answer N/A in graph."],
        answer: 2
    }, {
        question: "When does equilibrium occur?",
        image: "assets/images/PAndQ_Equilibrium.gif",
        choices: ["When everyone is happy.", "When price is low and quantity is high.", "When supply and demand is high.", "When price and quantity match."],
        answer: 3
    }, {
        question: "What happens at P(1)?",
        image: "assets/images/PAndQ_ExcessSupply.gif",
        choices: ["Too much supply.", "High demand.", "Better equilibrium.", "Below equilibrium."],
        answer: 0
    }, {
        question: "What happens at P(1)?",
        image: "assets/images/PAndQ_ExcessDemand.gif",
        choices: ["Everyone wants a job.", "Suppliers are happy.", "Too much quantity.", "Everyone wants to buy."],
        answer: 3
    }, {
        question: "What is an example of a positive shift in demand for alcohol?",
        image: "assets/images/PAndQ_ShiftInDemand.gif",
        choices: ["Lots of rain for wheat farmers.", "Minimum wage decrease.", "Happy New Year occurs", "Monday night."],
        answer: 2
    }, {
        question: "What is an example of a positive shift in supply for alcohol?",
        image: "assets/images/PAndQ_ShiftInSupply.gif",
        choices: ["Lots of rain for wheat farmers.", "Minimum wage decrease.", "Happy New Year occurs", "Monday night."],
        answer: 0
    }];

    var errorCnt = 0;

    var currQuestion = 0;
    var corrAnswer = 0;
    var incorrAnswer = 0;
    var noAnswer = 0;
    var answered = false;

    //creating basic timer and setting to 15 seconds.
    var timerInterval;
    var clockRunning = false;
    var clockTimer = {
        time: 0,
        reset: function () {
            clockTimer["time"] = 30;
        },
        start: function () {
            if (!clockRunning) {
                timerInterval = setInterval(clockTimer.timerDisplay, 1000);
                clockRunning = true;
            }
        },
        stop: function () {
            if (clockRunning) {
                clearInterval(timerInterval);
                clockRunning = false;

            }
        },
        timerDisplay: function () {
            clockTimer["time"]--;
            // console.log(clockTimer.time)
            $("#timerClock").text(clockTimer.time + " seconds.");
            if (clockTimer["time"] < 1) {
                clearInterval(timerInterval);
                var noInput = -1; //noInput = -1, arrays start at 0.

                checkAnswer(noInput);
            }
        }

    }

    $("#startGame").on("click", function () {
        //=======Animation ending detection BEGIN========/
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));
        //=======Animation ending detection END========/

        //======Adding animation to element ========/
        $("#jumbotronID").addClass('animated slideOutRight').one(animationEnd, function () {
            $("#jumbotronID").removeClass('animated slideOutRight'); //Removing animation class to reset
        
            $("#jumbotronID").addClass('d-none') //Hiding main page jumbotron.
            $("#gameBoxID").removeClass('d-none'); //Unhiding question box
        });


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
        clockTimer["reset"]();

        var questionNumb = 0;
        questionNumb = currQuestion + 1;

        $("#questionNumb").text("Question " + questionNumb + " out of " + questionArr.length);
        $("#question").text(questionArr[currQuestion]["question"]);
        $("#questionImg").attr("src", questionArr[currQuestion]["image"]);
        $("#answer-1").text(questionArr[currQuestion]["choices"][0]);
        $("#answer-2").text(questionArr[currQuestion]["choices"][1]);
        $("#answer-3").text(questionArr[currQuestion]["choices"][2]);
        $("#answer-4").text(questionArr[currQuestion]["choices"][3]);

        clockTimer["start"]();

    }

    $(".answerChoice").on("click", function () {
        var userSelection = $(this).attr("value");
        clockTimer["stop"]();
        answered = true;
        checkAnswer(userSelection)
    });

    function checkAnswer(userChoice) {

        if (userChoice === -1) {
            noAnswer += 1;
            var realAnswer = questionArr[currQuestion]["answer"] //Applying as a new variable to be used in object.
            $("#question").text("You ran out of time the answer was: " +
                questionArr[currQuestion]["choices"][realAnswer]);

        } else if (userChoice - 1 === questionArr[currQuestion]["answer"]) {
            corrAnswer += 1;
            $("#question").text("You are correct, good job!")

        } else if (userChoice - 1 !== questionArr[currQuestion]["answer"]) {
            incorrAnswer += 1;
            var realAnswer = questionArr[currQuestion]["answer"]
            $("#question").text("Incorrect the answer was: " +
                questionArr[currQuestion]["choices"][realAnswer]);
        }

        clockTimer["stop"]();

        currQuestion += 1; //Adding 1 to complete current question.
        if (currQuestion === questionArr.length) {
            setTimeout(displayScore, 4000);
        } else {
            setTimeout(applyQuestion, 4000);
        }
    }

    function displayScore() {
        $("#gameBoxID").addClass('d-none') //Hiding main page jumbotron.
        $("#scoreBoxID").removeClass('d-none'); //Unhiding question box

        $("#correct").text("Correct: " + corrAnswer);
        $("#incorrect").text("Incorrect: " + incorrAnswer);
        $("#unanswered").text("Unaswered: " + noAnswer);
        $("#scoreBoardMsg").text("Thanks for playing, hope it was enlightening!")
    }

});