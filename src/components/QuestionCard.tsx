// define types
type Question = {
    id : number
    question : string
    type : "FIB" | "MCQs"
    choices ?: string[]
    correctAnswer : string
  }

// FC
const QuestionCard = ({curQuestion, selectedAns ,setSelectedAns} : {curQuestion: Question, selectedAns: string, setSelectedAns: (ans: string)=> void}) => {

    // derived variables
    const {question, choices, type}  = curQuestion;
    let liStyling = "border rounded-2xl bg-bg p-3 cursor-pointer";
    let getUserInput = ()=> {
        if (type === "FIB") {
            return (
                <input type="text"
                className="border rounded-md p-4 text-xl"
                 value={selectedAns} onChange={(e)=> setSelectedAns(e.target.value)}/>
            )
        }

        return  choices?.map((choice:string) =>   (
            <li key={choice} onClick={()=>setSelectedAns(choice)} className={selectedAns === choice ? (liStyling + ' selected-ans') : (liStyling)}>
              {choice}
            </li>
          ))
    }


    
  return (
       <div className='question p-2 flex flex-col gap-8'>
        <h2 className='text-xl text-semibold'>{question}</h2>
        <ul className='flex flex-col gap-4'>
          {getUserInput()}
        </ul>
      </div>

  )
}

export default QuestionCard