// define types
type Props = {
    correctCount: number, totalQuiz: number, handleTryOver: ()=>void
}

// FC
const QuizResult = ({correctCount, totalQuiz, handleTryOver}: Props) => {
  return (
    <div className='flex flex-col gap-5 py-2'>
    <div className='result'>

    <h3 className='font-bold text-2xl text-center mb-2'>Result</h3>
    <p>Total Questions: <span>{totalQuiz}</span></p>
    <p>Correct Answers: <span>{correctCount}</span></p>
    <p>Wrong Answers: <span>{totalQuiz - correctCount}</span></p>
    <div className='flex justify-center'>
      <button onClick={handleTryOver}
      className='border rounded-lg py-2 px-8 mt-2 bg-gradient-to-t from-primary from-1% to-accent text-slate-50'>
        Try Again
      </button>
    </div>
    </div>
    <div className="ranking">
    </div>
  </div>
  )
}

export default QuizResult