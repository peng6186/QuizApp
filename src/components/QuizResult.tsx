import { useEffect, useState } from "react"

// define types
type Props = {
    correctCount: number, totalQuiz: number, handleTryOver: ()=>void
}

type Record = {
  id: number,
  name: string,
  corAns: number
}

// FC
const QuizResult = ({correctCount, totalQuiz, handleTryOver}: Props) => {
  const [userInput, setUserInput] = useState("")
  const [records, setRecords] = useState<Record[] | null>(null)
  const [showRecords, setShowRecords] = useState(false)

  const handleSave = () => {
    const  record: Record = {
      id: !records ? 1 :records.length  + 1, 
      name: userInput,
      corAns: correctCount,
    };

    const newRecords = records ? [...records, record] : [record]
    setRecords(newRecords.sort((a, b)=> b.corAns - a.corAns));
    localStorage.setItem("records", JSON.stringify(newRecords))

    setUserInput("")
    setShowRecords(true)
  }

  const handleTryAgain = ()=> {
    setShowRecords(false)
    handleTryOver()
  }

  useEffect(()=> {
    const records = localStorage.getItem("records");
    console.log(records);
    if (records) {
      setRecords(JSON.parse(records))
    }
  }, [])


  return (
  <div className='flex flex-col gap-10 py-2'>
    <div className='result'>

    <h3 className='font-bold text-2xl text-center mb-2'>Result</h3>
    <p>Total Questions: <span>{totalQuiz}</span></p>
    <p>Correct Answers: <span>{correctCount}</span></p>
    <p>Wrong Answers: <span>{totalQuiz - correctCount}</span></p>
    <div className='flex justify-center'>
      <button onClick={handleTryAgain}
      className='border rounded-lg py-2 px-8 mt-2 bg-gradient-to-t from-primary from-1% to-accent text-slate-50'>
        Try Again
      </button>
    </div>
    </div>
    {
      !showRecords ? (
        <div className="ranking flex flex-col gap-2">
        <h3 className="text-center text font-semibold">Enter you name below <br /> to save your score</h3>
        <input type="text" placeholder="Put Your Name"
        value={userInput}
        onChange={(e)=> setUserInput(e.target.value)}
        className="border p-2 w-1/2 m-auto"/>
        <div className="flex justify-center items-center mt-2">
          <button 
          onClick={handleSave}
          className="border w-1/3 rounded-md py-2 px-4 bg-gradient-to-t from-primary to-accent text-slate-200">Save</button>
        </div>
      </div>
      ): (
        <table className="table-auto text-center border">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>correct Number</th>
            </tr>
          </thead>
          <tbody>
            {
              records?.map((record:Record, idx) => (
                <tr key={record.id}>
                  <td>{idx + 1}</td>
                  <td>{record.name}</td>
                  <td>{record.corAns}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
    }

  </div>
  )
}

export default QuizResult