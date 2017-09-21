var music = new Audio("assets/audio/Elevator-music.mp3");

$(document).ready(function() {

    var intervalId;
    var clockRunning = true;
    var endCardBoolean = false;

    var timer = {
        time: 30,
        reset: function() {
            music.playbackRate = 1;
            clearInterval(intervalId);
            timer.time = 30;
            $("#timeRemaining").css("color", "black");
            $("#timeRemaining").html("<p>Time Remaining: " + timer.time + "</p>");
        },
        start: function() {
            if (clockRunning) {
                intervalId = setInterval(timer.count, 1000);
            }
        },
        stopTime: function() {
            clearInterval(intervalId);
            clockRunning = false;
        },
        count: function() {
            timer.time--;
            $("#timeRemaining").html("<p>Time Remaining: " + timer.time + "</p>");
            if (timer.time <= 15) {
                music.playbackRate += .05;
            }
            if (timer.time === 10) {
                $("#timeRemaining").css("color", "red");
            }
            if (timer.time === 0) {
                timesUp();
            }
        },
        endCardReset: function() {
            clearInterval(intervalId);
            intervalId = setInterval(timer.count, 1000);
            timer.time = 5;
            timer.time--;
            if (timer.time === 0) {
                timer.time = 30;
                timer.reset();
                reset();
                question();
            }
        }
    }

    var questionArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    
    var questions = {
        one: {
            question: "What is the name of the Spanish islands that lie off the Northwest coast of Africa?",
            answer: ["The Canary Islands", "Ibiza", "Galapagos Islands", "Corsica"],
            correctAns: "The Canary Islands"
        },
        two: {
            question: "In which country is the Nobel Peace Prize awarded?",
            answer: ["Norway", "Sweden", "Switzerland", "Finland"],
            correctAns: "Norway"
        },
        three: {
            question: "Which psychologist investigated obedience using electric shocks?",
            answer: ["Stanley Milgram", "Ivan Pavlov", "B.F. Skinner", "Sigmund Freud"],
            correctAns: "Stanley Milgram"
        },
        four: {
            question: "The Yangtze River is entirely located in which country?",
            answer: ["China", "Malaysia", "Korea", "Burma"],
            correctAns: "China"
        },
        five: {
            question: "Who was the first person selected as Time Magazine's Man of the Year?",
            answer: ["Charles Lindbergh", "Calvin Coolidge", "Franklin Roosevelt", "Theodore Roosevelt"],
            correctAns: "Charles Lindbergh"
        },
        six: {
            question: "Which American inventor is generally given credit for the invention of the lightning rod?",
            answer: ["Benjamin Franklin", "Thomas Edison", "Nikola Tesla", "Thomas Jefferson"],
            correctAns: "Benjamin Franklin"
        },
        seven: {
            question: "What is the name of the deepest known location in the Earth's oceans?",
            answer: ["Challenger Deep", "Uranus", "Tonga Trench", "Aleutian Trench"],
            correctAns: "Challenger Deep"
        },
        eight: {
            question: "Who was the first US President to declare war?",
            answer: ["James Madison", "George Washington", "Thomas Jefferson", "Barack Obama"],
            correctAns: "James Madison"
        },
        nine: {
            question: "In what year was the first modern Olympic Games held?",
            answer: ["1896", "1900", "1904", "1908"],
            correctAns: "1896"
        },
        ten: {
            question: "What is the national language of India?",
            answer: ["Hindi", "Urdu", "Punjabi", "English"],
            correctAns: "Hindi"
        }
    }

    var numCorrect = 0;
    var numWrong = 0;
    var numSkipped = 0;
    var numAnswered = 0;

    var chosenQuestion;
    var chosenAnswer;
    var correctAnswer;

    function reset() {

        questionArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
        questions = {
            one: {
                question: "What is the name of the Spanish islands that lie off the Northwest coast of Africa?",
                answer: ["The Canary Islands", "Ibiza", "Galapagos Islands", "Corsica"],
                correctAns: "The Canary Islands"
            },
            two: {
                question: "In which country is the Nobel Peace Prize awarded?",
                answer: ["Norway", "Sweden", "Switzerland", "Finland"],
                correctAns: "Norway"
            },
            three: {
                question: "Which psychologist investigated obedience using electric shocks?",
                answer: ["Stanley Milgram", "Ivan Pavlov", "B.F. Skinner", "Sigmund Freud"],
                correctAns: "Stanley Milgram"
            },
            four: {
                question: "The Yangtze River is entirely located in which country?",
                answer: ["China", "Malaysia", "Korea", "Burma"],
                correctAns: "China"
            },
            five: {
                question: "Who was the first person selected as Time Magazine's Man of the Year?",
                answer: ["Charles Lindbergh", "Calvin Coolidge", "Franklin Roosevelt", "Theodore Roosevelt"],
                correctAns: "Charles Lindbergh"
            },
            six: {
                question: "Which American inventor is generally given credit for the invention of the lightning rod?",
                answer: ["Benjamin Franklin", "Thomas Edison", "Nikola Tesla", "Thomas Jefferson"],
                correctAns: "Benjamin Franklin"
            },
            seven: {
                question: "What is the name of the deepest known location in the Earth's oceans?",
                answer: ["Challenger Deep", "Uranus", "Tonga Trench", "Aleutian Trench"],
                correctAns: "Challenger Deep"
            },
            eight: {
                question: "Who was the first US President to declare war?",
                answer: ["James Madison", "George Washington", "Thomas Jefferson", "Barack Obama"],
                correctAns: "James Madison"
            },
            nine: {
                question: "In what year was the first modern Olympic Games held?",
                answer: ["1896", "1900", "1904", "1908"],
                correctAns: "1896"
            },
            ten: {
                question: "What is the national language of India?",
                answer: ["Hindi", "Urdu", "Punjabi", "English"],
                correctAns: "Hindi"
            }
        }

        numCorrect = 0;
        numWrong = 0;
        numSkipped = 0;
        numAnswered = 0;
        clockRunning = true;
    }

    function question() {
        $("#wins").empty();
        $("#losses").empty();
        $("#skipped").empty();
        $("#timeRemaining").html("<p>Time Remaining: " + timer.time + "</p>");
        
        music.play();

        timer.start();

        var rand = Math.floor(Math.random() * questionArray.length);
        var arrNum = questionArray[rand];
        answer = questions[arrNum].correctAns;
        console.log(answer);
        questionArray.splice(rand, 1);
        chosenQuestion = questions[arrNum].question;
        $("#question").html("<h2>" + chosenQuestion + "</h2>");

        var randAnswer = Math.floor(Math.random() * 4);
        chosenAnswer = questions[arrNum].answer[randAnswer];
        questions[arrNum].answer.splice(randAnswer, 1);
        $("#answer1").html("<p>" + chosenAnswer + "</p>");

        randAnswer = Math.floor(Math.random() * 3);
        chosenAnswer = questions[arrNum].answer[randAnswer];
        questions[arrNum].answer.splice(randAnswer, 1);
        $("#answer2").html("<p>" + chosenAnswer + "</p>");

        randAnswer = Math.floor(Math.random() * 2);
        chosenAnswer = questions[arrNum].answer[randAnswer];
        questions[arrNum].answer.splice(randAnswer, 1);
        $("#answer3").html("<p>" + chosenAnswer + "</p>");

        randAnswer = Math.floor(Math.random() * 1);
        chosenAnswer = questions[arrNum].answer[randAnswer];
        questions[arrNum].answer.splice(randAnswer, 1);
        $("#answer4").html("<p>" + chosenAnswer + "</p>");

    }

    $(".answers").on("click", function() {
        var chosen = $(this).text();
        if (chosen === answer) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });

    function correctAnswer() {
        numCorrect++;
        numAnswered++;
        if (questionArray.length === 0) {
            endCard();
        } else {
            timer.reset();
            question();
        }
    }

    function wrongAnswer() {
        numWrong++;
        numAnswered++;
        if (questionArray.length === 0) {
            endCard();
        } else {
            timer.reset();
            question();
        }
    }

    function timesUp() {
        if (!endCardBoolean) {
            numSkipped++;
            numAnswered++;
        }
        if (questionArray.length === 0) {
            endCard();
        } else {
            timer.reset();
            question();
        }
    }

    function endCard() {
        endCardBoolean = true;
        timer.stopTime();
        timer.endCardReset();
        music.pause();
		music.currentTime = 0;
        $(".answers").empty();
        $("#question").html("<h1>End of game</h1>");
        $("#wins").html("<h1>Correct: " + numCorrect + "</h1>");
        $("#losses").html("<h1>Wrong: " + numWrong + "</h1>");
        $("#skipped").html("<h1>Skipped: " + numSkipped + "</h1>");
        reset();
    }

    $("#startGame").on("click", function() {
        $("#remove-button").remove();
        music.play();
        question();
    });

});