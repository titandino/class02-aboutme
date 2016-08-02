var questions = [["Does Trent live in Bothell?",
                    "yes", "y"],
                 ["What is the best flavor of Xing tea?",
                    "raspberry", "mango"],
                 ["Do dogs enjoy human pain like cats do?",
                    "no", "n"],
                 ["Is Trent's favorite color is neon green.",
                    "yes", "y"],
                 ["Name a game Trent has played for more than 1,000 hours.",
                    "runescape", "tera", "pokemon", "trove", "minecraft", "counterstrike", "csgo", "league of legends", "league"],
                 ["What would you do if the green left the grass on the other side?",
                    "i would make like a tree and leave", "make like a tree and leave"]];

var username;

window.onload = function() {
  document.getElementById("startButton").addEventListener("click", guessingGame);
  for (var i = 0;i < questions.length;i++) {
    createParagraph("questionDisp", (i+1)+": "+questions[i][0]);
  }
}

function guessingGame() {
  resetResults();

  while(!username)
    username = prompt("What is your name?");

  username = username.charAt(0).toUpperCase()+username.slice(1);

  alert("Welcome to the game "+username+"!");
  alert("You will now be asked a series of questions to respond yes or no to.");

  for (var i = 0;i < questions.length;) {
    var response = prompt(questions[i][0]);

    var validated = validResponse(response, i);
    if (validated) {
      if (validated === "Correct") {
        alert("Congratulations "+username+"! That is correct.");
        questions[i].push("Correct");
      } else {
        alert("Sorry "+username+". That is incorrect.");
        questions[i].push("Incorrect");
      }
      i++;
    } else {
      console.log("Answer was null. Re-asking.");
      continue;
    }
  }

  displayResults();
}

function validResponse(response, index) {
  if (response) {
    var answers = questions[index].slice(1);
    if (answers.indexOf(response.toLowerCase()) >= 0) {
        return "Correct";
    }
    return "Incorrect";
  }
  return null;
}

function createParagraph(parentId, text) {
  var textNode = document.createTextNode(text);
  var p = document.createElement("P");
  p.appendChild(textNode);
  document.getElementById(parentId).appendChild(p);
}

function resetResults() {
  var resultsNode = document.getElementById("resultsDisp");
  while(resultsNode.hasChildNodes())
    resultsNode.removeChild(resultsNode.lastChild);
}

function displayResults() {
  createParagraph("resultsDisp", username+"'s answers:");
  var total = questions.length;
  var correct = 0;
	for (var i = 0;i < total;i++) {
    var result = questions[i].pop();
    if (result === "Correct")
      correct++;
    createParagraph("resultsDisp", "Question "+(i+1)+": "+result);
	}
  createParagraph("resultsDisp", "You got "+correct+" of the questions correct. That's "+((correct/total)*100).toPrecision(3)+"%!");
}
