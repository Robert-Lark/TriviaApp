import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";

{
  /* 
UI where the user is given a 
quote and a selection of buttons with characters names.
When they select the correct name - a correct sign comes up
otherwise try again. 

api => https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple
  quote
  quote attributed to 
  other characters 

  map the other characters to buttons and mix
  the correct character in with them. 

  
*/
}
const initialState = [
  {
    category: "Entertainment: Film",
    correct_answer: "Chicago",
    difficulty: "medium",
    incorrect_answers: [("Dreamgirls", "Cabaret", "All That Jazz")],
    question:
      "Velma Kelly and Roxie Hart are the protagonists of which Oscar winning movie?",
    type: "multiple",
  },
];
let questionNumber = 0;
function App() {
  const [questions, setQuestions] = useState(initialState);
  const [points, setPoints] = useState(0);

  let currentQuestion = questions[questionNumber];

  let answers = [
    currentQuestion?.correct_answer,
    currentQuestion?.incorrect_answers[0],
    currentQuestion?.incorrect_answers[1],
    currentQuestion?.incorrect_answers[2],
  ];
  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const suffledAnswers = shuffleArray(answers);

  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
      )
      .then(function (response) {
        setQuestions(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h2>Trivia!</h2>
      <h4>Question: {currentQuestion?.question ? currentQuestion?.question : <p>GAME OVER</p>}</h4>
      <div className="buttonContainer">
        {suffledAnswers.map((answer) => {
          return (
            <button
              style={{width: "100px", height: "150px", margin: "20px"}}
              onClick={() => {
                if (answer == questions[questionNumber].correct_answer) {
                  if (questionNumber == questions.length - 1) {
                    if ({points} < 0) {
                      alert(`Go back to School`);  
                    } 
                  } else {
                    alert(`CORRECT`);
                    setPoints(points + 1);
                    if (questionNumber < questions.length - 1) {
                      questionNumber = questionNumber + 1;
                    }
                  }
                } else {
                  alert(
                    `INCORRECT The Correct Answer Was: ${questions[questionNumber].correct_answer}`
                  );
                  setPoints(points - 1);
                  questionNumber = questionNumber + 1;
                }
              }}
            >
              <p>{answer}</p>
            </button>
          );
        })}
      </div>
      <div className="counter">
        <h1>Your Score: {points}</h1>
      </div>
    </div>
  );
}

export default App;
