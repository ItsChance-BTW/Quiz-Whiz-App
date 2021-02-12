import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../stylesheets/GameRound.css';

const GameRound: React.FC = (answer) => {
  const { question, incorrectAnswers, socket, username } = useContext(GlobalContext);

  const onSubmit = (text:string) => {
    const msg = {
      type: 'answer',
      data: {
        answer: text === answer,
        username,
      },
    };
    console.log(msg);
    socket.send(JSON.stringify(msg));
  };

  const answers:JSX.Element[] = [];
  const createAnswerElement = (answerText:string) => (
    <div className="gameBtn">
      <input type="button" value={answerText} onClick={() => onSubmit(answerText)} />
    </div>
  );
  incorrectAnswers.push(answer);
  const correctAndIncorrect = incorrectAnswers;
  while (correctAndIncorrect.length > 0) {
    const randomChoice = Math.floor(Math.random() * correctAndIncorrect.length);
    answers.push(createAnswerElement(correctAndIncorrect[randomChoice]));
    correctAndIncorrect.splice(randomChoice, 1);
  }

  return (
    <div className="gameRoundPage">
      <div className="gameContainer">
        <div className="gameQuestions">
          {question}
        </div>
        <div className="gameAnswers">
          {answers}
        </div>
      </div>
    </div>
  );
};

export default GameRound;
