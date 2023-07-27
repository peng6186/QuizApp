import { useEffect, useState } from "react"
import Quiz from "./components/Quiz"
import loader from "./assets/loader.svg"
function App() {
  
  const [quiz, setQuiz] = useState(null)
  const [isLoding, setisLoding] = useState(true)

  useEffect(()=> {
    fetch("https://64c2bf01eb7fd5d6ebd04b13.mockapi.io/questions")
    .then(resp => resp.json()).then(data => {
        setQuiz(data);
        setisLoding(false)
    })
    .catch(err => console.log(err));
  }, [])


  if (isLoding) {
    return  (
    <div className="mt-32 w-full flex flex-col justify-center items-center">
    <img src={loader} alt="loader"  className="w-32 h-32 object-contain"/>
    <h1 className="font-bold text-2xl text-white mt-2"> "It is Loading ..."</h1>
  </div>)
  }

  return (
    <>
    {quiz && <Quiz quiz={quiz}/>}
    </>
  )

   
   
  
}

export default App
