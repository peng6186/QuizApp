import { useState } from 'react'
import Timer from './Timer'
import QuizResult  from './QuizResult'
import QuestionCard from './QuestionCard'

// define types
type Question = {
  id : number
  question : string
  type : "FIB" | "MCQs"
  choices ?: string[]
  correctAnswer : string
}

// FC
const Quiz = ({quiz: questions} : {quiz: Question[] | null}) => {
  // states we need to store
  const [curQuestionID, setCurQuestionID] = useState(1)
  const [selectedAns, setSelectedAns] = useState<string>("")
  const [correctCount, setCorrectCount] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showTimer, setShowTimer] = useState(true)
  
  // event handler
  const handleNext = ()=> {
    setShowTimer(false)
    selectedAns === correctAnswer && setCorrectCount(correctCount + 1)
    setSelectedAns("")
    if (!isLastOne) {
      setCurQuestionID(curQuestionID + 1)
      setTimeout(()=> setShowTimer(true), 100)
    } else {
      setShowResult(true)
      setShowTimer(false)
    }
  }

  const handleTryOver = ()=> {
    setCurQuestionID(1)
    setShowResult(false)
    setSelectedAns("")
    setCorrectCount(0)
  }

  const handleTimeUp =() => {
    handleNext()
  }

  // derived variables
  const isLastOne = (curQuestionID === questions?.length)
  const curQuestion = questions?.find(question => question.id === curQuestionID) as Question
  const {correctAnswer}  = curQuestion;
    
  

  //  return JSX
  return (
    
    <div className='container border w-[32rem] min-h-min rounded-md bg-bg flex flex-col py-2 px-8 mt-60 relative'>
      {showTimer && <Timer totalDuration={8} onTimeUp={handleTimeUp}/>}
      {showResult ? <QuizResult correctCount={correctCount} totalQuiz={questions?.length as number} handleTryOver={handleTryOver}/> : (
      <>      
        <div className='info flex justify-start items-center'>
          <span className='text-3xl text-semibold text-primary'>{curQuestionID}</span>
          <span className='text-1xl text-normal text-disabled'>/{questions?.length}</span>
        </div>
        <QuestionCard curQuestion={curQuestion} selectedAns={selectedAns} setSelectedAns={setSelectedAns}/>
        <div className='next-btn m-3 flex justify-end'>
          <button onClick={handleNext}
          disabled={!selectedAns}
          className='border py-2 px-8 rounded-lg disabled:bg-[#e7e8e9]  text-slate-900 font-semibold disabled:text-slate-500  disabled:cursor-not-allowed'>
            {isLastOne ? 'Submit': 'Next'}
          </button>
        </div>
      </>)}
    </div>
  )
}

export default Quiz 