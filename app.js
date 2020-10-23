/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable strict */
const store = {
  questions: [
    {
      question: 'What does Hakuna Matata mean?',
      answers: [
        'No Problem',
        'Your Uncle is a Dick',
        'No Worries',
        'Who Farted?'
      ],
      correctAnswer: 'No Worries'
    },
    {
      question: 'Who serves as Pinocchio’s conscience?',
      answers: [
        'Rick James',
        'Rye Whiskey',
        'Jeffery Dahmer',
        'Jiminy Cricket'
      ],
      correctAnswer: 'Jiminy Cricket'
    },
    {
      question: 'How old is Crush in Finding Nemo?',
      answers: [
        100,
        150,
        30,
        85
      ],
      correctAnswer: 150
    },
    {
      question: 'Pongo and Perdita originally had how many puppies in 101 Dalmatians?',
      answers: [
        101,
        50,
        25,
        15
      ],
      correctAnswer: '15'
    },
    {
      questionNumber: 5,
      question: 'In Monster\’s, Inc., there’s nothing more toxic or deadly than what?',
      answers: [
        'A Human Child',
        'A Wet Fart',
        'Yesterday\'s Fish Dinner',
        'Your Dirtiest Kid\'s Locker'
      ],
      correctAnswer: '15'
    }
  ],
  questionNumber: 0,
  quizStarted: false,
  score: 0,
  incorrect: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

const grabStart = () => {
  return `<div>
<h2>Welcome to your super easy quiz, julie!<h2>
  <p>Let's get started!<p>
  <p>Press the button below to begin</p>
  <div><button id="js-beginQuiz">Start Quiz!</button></div>
</div>`
}

//console.log(grabStart);

const grabQuestion = () => {
  return `<div>
  <h2> Question ${store.questionNumber +1} of ${store.questions.length}</h2>
  <p>${store.questions[store.questionNumber].question}</p>
  <form>
  <input type="radio" id="answer1" value="${store.questions[store.questionNumber].answers[0]}" name="answer"></input>
  <label>${store.questions[store.questionNumber].answers[0]}</label>
  <input type="radio" id="answer2" value="${store.questions[store.questionNumber].answers[1]}" name="answer"></input>
  <label>${store.questions[store.questionNumber].answers[1]}</label>
  <input type="radio" id="answer3" value="${store.questions[store.questionNumber].answers[2]}" name="answer"></input>
  <label>${store.questions[store.questionNumber].answers[2]}</label>
  <input type="radio" id="answer4" value="${store.questions[store.questionNumber].answers[3]}" name="answer"></input>
  <label>${store.questions[store.questionNumber].answers[3]}</label>
    <button id="js-submit">Submit Answer</button>
  </form>
  <h3>Current Score</h3>
    <span>${store.score} Correct / ${store.incorrect} Incorrect</span></div>`
}

//console.log(grabQuestion);

const grabAnswer = () => {
  return `<div>
<h2>${store.response}</h3>
<button type="submit">Next Question</button>
<h3>Current Score</h3>
<span>${store.score} Correct / ${store.incorrect} Incorrect</span></div>`
}

//console.log(grabAnswer)

const grabResult = () => {
  return `<div>
  <h2>That's all folk!</h2>
  <p>Ah shit...That's not Disney.</p>
  <p>Well, good job anyway.</p>
  <span>${store.score} Correct / ${store.incorrect} Incorrect</span></div>
  <button type="submit" class="try-again-button">Try Again!</button></div>`
}

//console.log(grabResult)

/********** RENDER FUNCTION(S) **********/

const renderStart = () => {
  $('main').html(grabStart)
}


const renderQuestion = () => {
  $('main').html(grabQuestion)
}

const renderAnswer = () => {
  $('main').html(grabAnswer)
}

const renderResult = () => {
  $('main').html(grabResult)
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

const begin = () => {
  if(!store.quizStarted) {
    renderStart()
  }
}

const startQuiz = () => {
  $('main').on('click', '#js-beginQuiz', event => {
    event.preventDefault();
    store.quizStarted = true;
    renderQuestion()
  })
}

/* TALK TO ELIJAH ABOUT LINE 176 */

const questionLoop = () => {
  $('main').on('click', '#js-submit', event => {
    event.preventDefault();
    if ($('input[name="answer"]:checked').val() === store.questions[store.questionNumber].correctAnswer) {
      store.score += 1
      response = 'Good job! You must have seen this one before!';
    } else {
      store.incorrect += 1;
      store.response =  `The correct answer is ${store.questions[store.questionNumber].correctAnswer}. How did you get this wrong?`
    }
    if (store.questionNumber + 1 === store.questions.length) {
      store.quizStarted = false
    }
  })
}



function errorMessage() {
  $('main').on('click', 'js-submit', function (event) {
    if ($(event.this).text() === 'Submit Question!') {
      if (!$('input[name="answer"]:checked').val()) {
        alert('You must pick an answer');
      }
    }
  });
}

const retakeQuiz = () => {
  $('main').on('click', '#js-restartQuiz', event => {
    event.preventDefault()
    store.questionNumber= 0
    store.score= 0
    store.incorrect= 0
    renderQuestions()
  })
}

const main = () => {
  begin()
  startQuiz()
  questionLoop()
  errorMessage()
  retakeQuiz()
}

$(main)