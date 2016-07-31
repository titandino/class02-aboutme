var questions = [["Does Trent live in Bothell?",
                    "yes", "y"],
                 ["What is the best flavor of Xing tea?",
                    "raspberry", "mango"],
                 ["Do dogs enjoy human pain like cats do?",
                    "no", "n"],
                 ["Trent's favorite color is neon green.",
                    "yes", "y"],
                 ["Name a game Trent has played for more than 1000 hours.",
                    "runescape", "tera", "pokemon", "trove", "minecraft", "counterstrike", "csgo", "league of legends", "league"],
                 ["What would you do if the green left the grass on the other side?",
                    "i would make like a tree and leave"]];

var username;

window.onload = function() {
  document.getElementById("startButton").addEventListener("click", guessingGame);
  for (var i = 0;i < questions.length;i++)
    document.getElementById("questionDisp").innerHTML += questions[i][0]+"<br>";
}

function guessingGame() {
  document.getElementById("resultsDisp").innerHTML = "";

  while(!username)
    username = prompt("What is your name?");

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

function displayResults() {
  var res = document.getElementById("resultsDisp");
  res.innerHTML = "Results for "+username+":<br>";
  for (var i = 0;i < questions.length;i++)
    res.innerHTML += "Question "+(i+1)+": "+questions[i].pop()+"<br>";
}
