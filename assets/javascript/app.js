// document.ready
$(function() {

	// global variables
	var current = 0;
	var questionNumber = 1;
	var answerChoice;
	var answersRight = 0;
	var gameStarted = false;

	// question and answer array
	var quiz = [{
		question: "What is the brightest star at night?",
		choices: ["North star", "sirius", "arcturus"],
		answer: 'b'
	}, {
		question: "What animal first reached Earth orbits alive?",
		choices: ["cockroach", "ape", "dog"],
		answer: 'c'
	}, {
		question: "How many planets have rings in our solar system?",
		choices: ["3", "4", "1"],
		answer: 'b'
	}, {
		question: "What is the largest planet of our solar system called?",
		choices: ["jupiter", "saturn", "uranus"],
		answer: 'a'
	}, {
		question: "About how long is a day on saturn?",
		choices: ["24 hours", "4 hours and 57 minutes", "10 hours and 47 minutes"],
		answer: 'c'
	}, {
		question: "How much would a 150 lbs person weigh on Mars?",
		choices: ["57 lbs", "102 lbs", "174 lbs"],
		answer: 'a'
	}, {
		question: "What is the Great Red Spot?",
		choices: ["storm on Saturn", "storm on Jupiter", "smudge on Hubble telescope"],
		answer: 'b'
	}, {
		question: "What is the highest mesasured wind speed on Neptune?",
		choices: ["350mph", "420 mph", "1500 mph"],
		answer: 'c'
	}, {
		question: "Which of these phenomenia occurs on Mars?",
		choices: ["hurricanes", "dust storms", "tidal warms"],
		answer: 'b'
	}, {
		question: "How many planets do we have in our solar system?",
		choices: ["8", "9", "7"],
		answer: 'a'
	}];

	window.onload = function() {
		$("#timer").text(10);

		// click events
		$("#start").click(startGame);
		$("#quit").click(function() {

			// resets to opening display
			$(document).off("keyup");
			timer.stopTimer();
			current = 0;
	 		questionNumber = 1;
			answerChoice;
			answersRight = 0;
			$(".questionHeader").text("");
			$("#question").text("Click START to begin!");
			$(".choices").hide();
			$("#score").hide();
			gameStarted = false;
		});

		//hide answerChoices
		$(".choices").hide();
	};

	// variables that holds setInterval to run the timer
	var intervalId;

	// prevents timer from being sped up unnecessarily
	var timerRunning = false;

	// create timer object
	var timer = {

		seconds: 10,

		// function that starts a timer
		startTimer: function() {

			if (!timerRunning) {

				intervalId = setInterval(timer.countdown, 1000);
				timerRunning = true;
			}
		},

		// function that counts down the seconds
		countdown: function() {

			// decrease timer by 1 second
			var currentTime = timer.seconds--;
			$("#timer").text(currentTime);

			// when time is up
			if (currentTime === 0 && timerRunning) {

				timer.timesUp();
			}
		}, 

		// function that stops the timer
		stopTimer: function() {
			
			clearInterval(intervalId);
			timerRunning = false;
			$("#timer").text(10);
			timer.seconds = 10;
		},

		// function that pauses the timer
		pauseTimer: function() {
			timerRunning = false;
		},

		// function that resets the timer
		resetTimer: function() {
			timer.seconds = 10;
			$("#timer").text(10);
			timerRunning = true;
		},

		// function that runs when the timer reaches 0
		timesUp: function() {
			wrongAnswerShowRightAnswerPauseTimer();
		}

	}

	// function that runs when the start button is clicked
	function startGame() {
		if (gameStarted) {
			return;
		}
		current = 0;
		answersRight = 0;
		questionNumber = 1;
		$("#score").text(answersRight + "/10");
		$(".choices").show();
		displayQuestion();
		$("#timer").show();
		$("#score").show();
		timer.startTimer();
		gameStarted = true;
	}

	// function that displays the questions
	function displayQuestion() {

		var quizQuestion = quiz[current].question;
		var quizChoices = quiz[current].choices;
		$(".choices").show();
		$(".questionHeader").text("Question " + questionNumber);
		$("#question").text(quizQuestion);
		$("#a").text(quizChoices[0]);
		$("#b").text(quizChoices[1]);
		$("#c").text(quizChoices[2]);
		$(document).on("keyup", addKeyBind);
		
	}

	// function that runs when the user presses "A", "B", "C"
	function addKeyBind(event) {

		answerChoice = event.which;

		// takes ASCII value and matches it to the created case to execute the letter
		switch (answerChoice) {
			case 97:
			answerChoice = 97;
			break;
			case 98:
			answerChoice = 98;
			break;
			case 99:
			answerChoice = 99;
			break;
			case 100:
			answerChoice = 100;
			break;
			case 65:
			answerChoice = 97;
			break;
			case 66:
			answerChoice = 98;
			break;
			case 67:
			answerChoice = 99;
			break;
			case 68:
			answerChoice = 100;
			break;
			default:
			return;
		}

		checkAnswer();
	};

		// function that checks if what was pressed is the right answer
		function checkAnswer() {

			// disables any key pressing
			$(document).off("keyup");

			var correctAnswer = quiz[current].answer.charCodeAt(0);
			if (answerChoice === correctAnswer) {
				answersRight++;
				rightAnswerCongratulateUserPauseTimer();
			} else {
				wrongAnswerShowRightAnswerPauseTimer();
			}
		}

		// how to go to the next question
		function nextQuestion() {

			// no more questions after index at 9
			if (current === 9) {
				endGame();
				return;
			}

			timer.resetTimer();
			$("#timer").show();
			current++;
			questionNumber++;
			displayQuestion();
		}

		// function that runs when the user chooses the wrong answer
		function wrongAnswerShowRightAnswerPauseTimer() {
			
			$("#timer").hide();
			$("#score").text(answersRight + "/10");
			$("#question").text("Incorrect! The correct answer is " +
				quiz[current].answer.toUpperCase() + ".");
			setTimeout(nextQuestion, 1000 * 3.25);
		}

		// function that runs when the user chooses the right answer
		function rightAnswerCongratulateUserPauseTimer() {
			
			$("#timer").hide();
			$("#score").text(answersRight + "/10");
			$(".choices").hide();
			$("#question").text("Correct!");
			setTimeout(nextQuestion, 1000 * 3);
		}

		// function that runs when all 10 questions have been answered
		function endGame() {
			timer.stopTimer();
			$(".questionHeader").text("");
			$("#question").text("Game over. Click START to play again!");
			$(".choices").hide();
			gameStarted = false;
		}
	});