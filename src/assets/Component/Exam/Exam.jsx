import  { useState, useRef } from 'react'
import './Exam.css'
import data from "../../data.js";

const Exam = () => {

  const [index, setIndex] = useState(0)
  const [questions, setQuestions] = useState(data[index])
  const [lockOption, setLockOption] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)

  const options_array = [option1, option2, option3, option4]

  const checkAnswer = (e, ans) => {

    if (lockOption === false) {

      if (ans === questions.ans) {
        e.target.classList.add("correct")
        setLockOption(true)
        setScore(score + 1)

      } else {

        e.target.classList.add("wrong")
        setLockOption(true)

        options_array[questions.ans - 1].current.classList.add("correct")
      }
    }
  }

  const nextQuestion = () => {

    if (index === data.length - 1) {
      setShowResult(true)
      return
    }

    setIndex(index + 1)
    setQuestions(data[index + 1])
    setLockOption(false)

    options_array.forEach((option) => {
      option.current.classList.remove("correct")
      option.current.classList.remove("wrong")
    })
  }

  const restart = () => {

    setIndex(0)
    setQuestions(data[0])
    setLockOption(false)
    setScore(0)
    setShowResult(false)

    options_array.forEach((option) => {
      option.current.classList.remove("correct")
      option.current.classList.remove("wrong")
    })
  }

  return (
    <div className="container">

      <h1>EXAM APP</h1>
      <hr />

      {showResult ? (
        <>
          <h2>Result</h2>

          <p>
            Your Score is {score} out of {data.length}
          </p>

          <button onClick={restart}>Restart</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {questions.question}
          </h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {questions.option1}
            </li>

            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {questions.option2}
            </li>

            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {questions.option3}
            </li>

            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {questions.option4}
            </li>
          </ul>

          <button onClick={nextQuestion}>Next</button>

          <div className="INDEX">
            {index + 1} of {data.length}
          </div>
        </>
      )}

    </div>
  )
}

export default Exam