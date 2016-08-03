var questions = [];
questions.push(new GameQuestion('Does Trent live in Bothell?',
['yes', 'y']));
questions.push(new GameQuestion('Does Trent skateboard as his secondary form of transportation?',
['yes', 'y']));
questions.push(new GameQuestion('Is Trent\'s favorite music artists Owl City?',
['yes', 'y']));
questions.push(new GameQuestion('What is the best flavor of Xing tea?',
['raspberry', 'mango']));
questions.push(new GameQuestion('Do dogs enjoy human pain like cats do?',
['no', 'n']));
questions.push(new GameQuestion('Is Trent\'s favorite color is neon green.',
['yes', 'y']));
questions.push(new GameQuestion('Name a game Trent has played for more than 1,000 hours.',
['runescape', 'tera', 'pokemon', 'trove', 'minecraft', 'counterstrike', 'csgo', 'league of legends', 'league']));
questions.push(new GameQuestion('What would you do if the green left the grass on the other side?',
['i would make like a tree and leave', 'make like a tree and leave']));

var guessTheNumber = new GameQuestion('Guess a number between 1-100.', [42]);
guessTheNumber.verifyAnswer = function() {
  this.specialResult = new Date();
  while(true) {
    var response = parseInt(prompt(this.question));
    if (response) {
      if (response === this.answers[0]) {
        alert('Congratulations ' + username + '! That is correct.');
        this.specialResult = 'Number guessed in: ' + ((new Date().getTime() - this.specialResult.getTime()) / 1000) + ' seconds.';
        break;
      } else {
        alert('Sorry ' + username + '. That is too ' + ((response > this.answers[0]) ? 'high.' : 'low.'));
      }
    } else {
      alert('Please enter a NUMBER between 1-100.');
      continue;
    }
  }
};
questions.push(guessTheNumber);

var guessTheSong = new GameQuestion('Guess one of Trent\'s favorite Owl City songs.', ['the saltwater room', 'honey and the bee', 'fireflies']);
guessTheSong.verifyAnswer = function() {
  this.specialResult = new Date();
  while(true) {
    var response = prompt(this.question).toLowerCase();
    if (response) {
      if (this.answers.indexOf(response) >= 0) {
        alert('Congratulations ' + username + '! That is correct.');
        this.specialResult = 'Song guessed in: ' + ((new Date().getTime() - this.specialResult.getTime()) / 1000).toPrecision(4) + ' seconds.';
        break;
      } else {
        alert('Sorry. Guess again! HINT: One of the songs is the most popular one he released.');
      }
    } else {
      console.log('Answer was null. Re-asking.');
      continue;
    }
  }
};
questions.push(guessTheSong);

var username;

window.onload = function() {
  document.getElementById('startButton').addEventListener('click', guessingGame);
  for (var i = 0;i < questions.length;i++) {
    createParagraph('questionDisp', (i + 1) + ': ' + questions[i].question);
  }
};

function guessingGame() {
  resetResults();

  while(!username)
    username = prompt('What is your name?');

  username = username.charAt(0).toUpperCase() + username.slice(1);

  alert('Welcome to the game ' + username + '!');
  alert('You will now be asked a series of questions about Trent.');

  for (var i = 0;i < questions.length;i++) {
    questions[i].verifyAnswer();
  }

  displayResults();
}

function GameQuestion(question, answers) {
  this.question = question;
  this.answers = answers;
  this.result = 'null';
  this.specialResult = 'null';

  this.verifyAnswer = function() {
    var validated = null;
    while(!validated) {
      var response = prompt(this.question);

      validated = this.validResponse(response);
      if (validated) {
        if (validated === 'Correct') {
          alert('Congratulations ' + username + '! That is correct.');
          this.result = 'Correct';
          break;
        } else {
          alert('Sorry ' + username + '. That is incorrect.');
          this.result = 'Incorrect';
          break;
        }
      } else {
        console.log('Answer was null. Re-asking.');
        continue;
      }
    }
  };

  this.validResponse = function(response) {
    if (response) {
      if (this.answers.indexOf(response.toLowerCase()) >= 0) {
        return 'Correct';
      }
      return 'Incorrect';
    }
    return null;
  };
}

function createParagraph(parentId, text) {
  var textNode = document.createTextNode(text);
  var p = document.createElement('P');
  p.appendChild(textNode);
  document.getElementById(parentId).appendChild(p);
}

function resetResults() {
  var resultsNode = document.getElementById('resultsDisp');
  while(resultsNode.hasChildNodes())
    resultsNode.removeChild(resultsNode.lastChild);
}

function displayResults() {
  createParagraph('resultsDisp', username + '\'s answers:');
  var total = questions.length;
  var correct = 0;
  for (var i = 0;i < questions.length;i++) {
    if (questions[i].result === 'Correct')
      correct++;

    if (questions[i].specialResult === 'null') {
      createParagraph('resultsDisp', 'Question ' + (i + 1) + ': ' + questions[i].result);
      total--;
    } else {
      createParagraph('resultsDisp', 'Question ' + (i + 1) + ': ' + questions[i].specialResult);
    }
  }
  createParagraph('resultsDisp', 'You got ' + correct + ' of the questions correct. That\'s ' + ((correct / total) * 100).toPrecision(3) + '%!');
}
