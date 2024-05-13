import React, { useEffect, useState } from 'react';
import { quizQuestions } from '../constants/quizQuestions';

import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, addCorrect, addAttempted, fetchQuizData } from '../app/slice/quizSlice';
import { useNavigate } from 'react-router-dom';
import { Loader, Timer, QuizNavbar } from '../Components/index'

const QuizPage = () => {
  const status = useSelector((state) => state.quiz.status);
  // const quizData = useSelector((state) => state.quiz.quizData);

  const currentIndex = useSelector((state) => state.quiz.index);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { index, question, options, correct } = quizQuestions[currentIndex - 1];

  const handleNextQuestion = () => {
    if(index === quizQuestions.length){
      navigate("/result");
    } else{
      dispatch(nextQuestion());
      setRemainingTime(15);
      setAnswered(false);
      setCorrectAnswer(false);
      clearInterval(timer);
    }
  };

  const [answered, setAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(15);

  // useEffect(() => {
  //   dispatch(fetchQuizData());
  // }, []);

  useEffect(() => {
    if (!answered && currentIndex <= quizQuestions.length) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            handleNextQuestion();
            return 15;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(interval);
      }
    }
  }, [answered, currentIndex]);

  const handleOptionClick = (selected) => {
    setAnswered(true);
    if (selected === correct) {
      setCorrectAnswer(true);
      dispatch(addCorrect());
    } else {
      setCorrectAnswer(false);
    }
    dispatch(addAttempted());
    setRemainingTime(4);
    const newInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(newInterval);
          handleNextQuestion();
          return 15;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newInterval)
  };

  const handleSkip = () => {
    handleNextQuestion();
    clearInterval(timer);
  };

  if(status === "loading"){
    return <Loader />
  }
  
  return (
    <div className='w-full min-h-screen bg-slate-50'>
      <QuizNavbar />
      <main className='w-full h-full mt-6 max-w-2xl mx-auto px-4 sm:px-6 md:px-8'>

        <Timer time={remainingTime} />

        <div className='flex flex-col gap-2 mt-2'>
          <div className='flex justify-between font-medium text-slate-400'>
            <p className='text-sm'>{index}/10</p>
            <p className='text-sm'>(10 Points)</p>
          </div>

          <p className='font-semibold text-center my-2'>
            {question}
          </p>

          <form className='flex flex-col gap-2.5 justify-start items-start w-full'>
            {options.map((option, i) => (
              <button
                disabled={answered}
                className={`w-full flex px-3 py-1 transition border-2
                ${(answered && correctAnswer && option === correct) ? 'justify-between items-center border-green-500 border-2 rounded-lg bg-gradient-to-b from-green-100 via-green-100 to-transparent' : ''}
                ${(answered && !correctAnswer) && option !== correct ? 'justify-between items-center border-red-500 border-2 rounded-lg bg-gradient-to-b from-red-100 via-red-100 to-transparent' : ''}
                ${(answered && !correctAnswer) && option === correct ? 'justify-between items-center border-green-500 border-2 rounded-lg bg-gradient-to-b from-green-100 via-green-100 to-transparent' : ''}
                `}
                key={i}
                type='button'
                onClick={() => handleOptionClick(option)}
              >
                <p>
                  <span className='font-bold'>{i + 1}.</span> {option}
                </p>
              </button>
            ))}
          </form>

          <button
            onClick={handleSkip}
            className='bg-gray-100 mx-auto text-sm px-5 py-2 rounded-full shadow-lg'
            disabled={answered}
          >
            Skip to Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default QuizPage