import { useState, useEffect, useRef } from "react" 
const Timer = ({totalDuration, onTimeUp}: {totalDuration: number, onTimeUp: ()=> void}) => {
    // states
    const [counter, setCounter] = useState(0)
    // const [progress, setProgress] = useState(0)
    const intervalRef = useRef<number>(0)
    // derived vars
    let progress = counter / totalDuration * 100
    console.log("progress: ", progress);
        
    // sideEffect
    useEffect(() => {

     if (counter === totalDuration) {
        clearInterval(intervalRef.current)

        setTimeout(()=>{
            setCounter(0)
            progress = 0
            onTimeUp()}, 1000)
     }


      intervalRef.current = setInterval(()=> {
        setCounter(prev => prev + 1)
      }, 1000)
      
    
      return () => clearInterval(intervalRef.current)
      
    }, [counter])
    

  return (
    <div className="absolute top-0 left-0 w-full border-b-2 border-b-disabled">
        <div className={`progress h-1 bg-rose-500  duration-1000 ease-linear`}
        style={{width:`${progress}%`, backgroundColor: `${progress < 40? 'lightgreen': (progress < 70 ? 'orange': 'red')}`}}
        >
        </div>
    </div>
  )
}

export default Timer