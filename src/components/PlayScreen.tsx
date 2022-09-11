import React, {useState, useEffect, useRef} from 'react'
const { v4: uuidv4 } = require('uuid');

interface ILights {
  type: string
  id: string
} 

interface IProps {
    setInGame: (inGame: boolean) => void
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
}

const PlayScreen = ({setInGame, setLightStorage, lightStorage}: IProps) => {

    const leavePlay = () => {
        setInGame(false)
    }

    const [userInput, setUserInput] = useState('')

  const defaultColor = {
    backgroundColor: 'white'
  }

  const clickColor = {
    backgroundColor: 'rgb(26, 238, 72)'
  }

  const patternColor = {
    backgroundColor: 'yellow'
  }

  const currentDifficulty = 300

  const [isPlaying, setIsPLaying] = useState(false)

  const [gamePattern, setGamePattern] = useState<number[]>()

  const [score, setScore] = useState<number>()

  const leftRef = useRef<HTMLButtonElement>(null!)
  const upRef = useRef<HTMLButtonElement>(null!)
  const rightRef = useRef<HTMLButtonElement>(null!)
  const downRef = useRef<HTMLButtonElement>(null!)

  const clickChange = (ref: React.RefObject<HTMLButtonElement>) => {
    let current = ref.current!
    //color shown depends on if users input or not
    if (!isPlaying) {
      current.style.backgroundColor = patternColor.backgroundColor
    }
    else {
      current.style.backgroundColor = clickColor.backgroundColor
    } 
   
    setTimeout(() => {
      current.style.backgroundColor = defaultColor.backgroundColor
    }, currentDifficulty)
  }

  const moveCenter = (direction: string) => {
    if (!isPlaying || gamePattern?.length === userInput.length) {
      return
    }
    let input = userInput
      if (direction === 'left') {
        input += 1
        clickChange(leftRef)
      }
      if (direction === 'up') {
        input += 2
        clickChange(upRef)
      }
      if (direction === 'right') {
        input += 3
        clickChange(rightRef)
      } 
      if (direction === 'down') {
        input += 4 
        clickChange(downRef)
      }
      setUserInput(input)
    console.log(input)
  }
  
const keyDownHandler = (e: { keyCode: number }) => {
    switch (e.keyCode) {
      case 37: moveCenter('left'); break;
      case 38: moveCenter('up'); break;
      case 39: moveCenter('right'); break;
      case 40: moveCenter('down'); break;
    default: return;
    }
  };

  const getPatternLength = () => {
    let increasingLength = true
    let patternLength = 3
      while (increasingLength) {
        let roll = Math.random()
        if (roll < 0.5 && patternLength < 7) {
          patternLength += 1
        } else {
          increasingLength = false
        }
      }
    return patternLength
}

  const generatePattern = () => {
    let generatedPattern: number[] = []
    const patternLength = getPatternLength()
    
    for (let i = 0; i < patternLength; i++) {
      const checkNumber = () => {
        generatedPattern[i] = Math.ceil(Math.random() * 4)
        if (generatedPattern[i-1] === generatedPattern[i]) {
          checkNumber()
        }
      }
      checkNumber()
    }
    return generatedPattern
  }

  const readPattern = (pattern: number[]) => {
    console.log(pattern)
    pattern.forEach((letter, i) =>  {
      setTimeout(() => {
        switch (letter) {
          case 1:
            clickChange(leftRef)
            break;
          case 2:
            clickChange(upRef)
            break;
          case 3:
            clickChange(rightRef)
            break;
          case 4:
            clickChange(downRef)
            break;
          default:
            break;
          }
      }, currentDifficulty * i)
    })
    setTimeout(() => {
      setIsPLaying(true)
      setTimeout(() => {
        setIsPLaying(false)
      }, currentDifficulty * (pattern.length + 1))
    }, currentDifficulty * (pattern.length + 1))
    
  }

  const getScore = () => {
    if (!gamePattern) {
      return
    }
    let userAnswer = userInput.split('')
    userAnswer.splice(gamePattern.length, userAnswer.length)
    let score: number = 0
    userAnswer.forEach((answer, i) => {
      if (gamePattern[i] === parseInt(answer)) {
        score += 1
      }
    })
    score = parseInt((score / gamePattern.length * 100).toFixed(2))
    setScore(score)
    return score
  }

  const getSize = (length: number) => {
    const idx = length - 3
    const sizes = ['three', 'four', 'five', 'six', 'seven']
    return sizes[idx]
  }

  const conductRoll = (score: number) => {
    if (score === 0 || !gamePattern) {
      return
    }
    const lottery = Math.random() * 50
    const totalRoll = lottery + (score/2)

    let color;

    if (totalRoll > 30) {
      color = 'green'
    }
    if (totalRoll > 60) {
      color = 'blue'
    }
    if (totalRoll > 80) {
      color = 'purple'
    }
    if (totalRoll > 90 && gamePattern.length > 3) {
      color = 'red'
    }
    if (totalRoll > 95 && gamePattern.length > 5) {
      color = 'yellow'
    }
    if (color) {
      const size = getSize(gamePattern.length)
      const newLight = {type: size + ' ' + color, id: uuidv4()}
      setLightStorage([...lightStorage, newLight])
    }
  }

  const gameReady = () => {
    conductRoll(getScore()!)
  }

  const newgame = () => {
    setUserInput('')
    let pattern = generatePattern()
    setGamePattern([...pattern])
    readPattern(pattern)
    setScore(0)
  }

  useEffect(() => {
    if (userInput) {
      gameReady()
    }
  }, [isPlaying])

useEffect(() => {
  if (isPlaying) {
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }
  }, [keyDownHandler]);

  useEffect(() => {
    setTimeout(() => {
      newgame()
    }, 1000)
  }, [])

  return (
    <div className='play_screen'>
        <button onClick={leavePlay}>Leave</button>
        <div className='grid_layout'>
            <button id='up' ref={upRef} style={defaultColor} onClick={() => moveCenter('up')}></button>
            <button id='left' ref={leftRef} style={defaultColor} onClick={() => moveCenter('left')}></button>
            <button id='right' ref={rightRef} style={defaultColor} onClick={() => moveCenter('right')}></button>
            <button id='down' ref={downRef} style={defaultColor} onClick={() => moveCenter('down')}></button>
        </div>
        {userInput && !isPlaying &&
        <div>
          <p>You freed a light!</p>
          <button onClick={leavePlay}>Continue</button>
        </div>
        }
    </div>
  )
}



export default PlayScreen