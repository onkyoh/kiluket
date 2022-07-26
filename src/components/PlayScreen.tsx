import React, {useState, useEffect, useRef} from 'react'
import eyes from '../icons/eyes.png'
import tap from '../icons/tap.png'

const { v4: uuidv4 } = require('uuid');

interface ILights {
  type: string
  id: string
} 

interface IProps {
    setInGame: (inGame: boolean) => void
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    userXp: number
    setUserXp: (xp: number) => void
}

const PlayScreen = ({setInGame, setLightStorage, lightStorage, setUserXp, userXp}: IProps) => {

  const leavePlay = () => {
      setInGame(false)
  }

  const [userInput, setUserInput] = useState('')

  const defaultColor = {
    border: '1px solid white',
    backgroundColor: 'white',
    boxShadow: 'inset 0px 0px 8px 2px rgba(15,15,15,0.5)'
  }

  const clickColor = {
    border: '1px solid rgb(241, 226, 14)',
    backgroundColor: 'rgba(241, 226, 14, 0.3)',
    boxShadow: '0px 0px 16px 16px rgba(241, 226, 14, 0.5)'
  }

  const patternColor = {
    border: '1px solid rgba(15, 15, 15, 1)',
    backgroundColor: 'rgba(15, 15, 15, 0.9)',
    boxShadow: '0px 0px 16px 8px rgba(15, 15, 15, 0.9)'
  }

  const currentDifficulty = 300

  const [isPlaying, setIsPLaying] = useState(false)

  const [gamePattern, setGamePattern] = useState<number[]>()

  const [currentType, setCurrentType] = useState('')

  const [freed, setFreed] = useState<boolean>(false)

  const [xpPlus, setXpPlus] = useState(0)

  const [madeIt, setMadeIt] = useState(false)

  const leftRef = useRef<HTMLButtonElement>(null!)
  const upRef = useRef<HTMLButtonElement>(null!)
  const rightRef = useRef<HTMLButtonElement>(null!)
  const downRef = useRef<HTMLButtonElement>(null!)

  const clickChange = (ref: React.RefObject<HTMLButtonElement>) => {
    let current = ref.current! as HTMLButtonElement
    //color shown depends on if users input or not
    if (!isPlaying) {
      current.style.border = patternColor.border
      current.style.backgroundColor = patternColor.backgroundColor
      current.style.boxShadow = patternColor.boxShadow
    }
    else {
      current.style.border = clickColor.border
      current.style.backgroundColor = clickColor.backgroundColor
      current.style.boxShadow = clickColor.boxShadow
    } 
   
    setTimeout(() => {
      current.style.border = defaultColor.border
      current.style.backgroundColor = defaultColor.backgroundColor
      current.style.boxShadow = defaultColor.boxShadow
    }, currentDifficulty)
  }

  const clickButton = (direction: string) => {
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
  }
  
const keyDownHandler = (e: { keyCode: number }) => {
    switch (e.keyCode) {
      case 37: clickButton('left'); break;
      case 38: clickButton('up'); break;
      case 39: clickButton('right'); break;
      case 40: clickButton('down'); break;
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
      }, currentDifficulty * (10))
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
    return score
  }

  const getSize = (length: number) => {
    const idx = length - 3
    const sizes = ['three', 'four', 'five', 'six', 'seven']
    return sizes[idx]
  }

  const conductRoll = (score: number) => {
    setMadeIt(true)
    if (score === 0 || !gamePattern) {
      return
    }

    const lottery = Math.random() * 50
    const totalRoll = lottery + (score/2)

    let color;
    let colorXp;

    if (totalRoll > 30) {
      color = 'green'
      colorXp = 10
    }
    if (totalRoll > 60) {
      color = 'blue'
      colorXp = 25
    }
    if (totalRoll > 80) {
      color = 'purple'
      colorXp = 45
    }
    if (totalRoll > 90) {
      color = 'red'
      colorXp = 75
    }
    if (totalRoll > 95) {
      color = 'yellow'
      colorXp = 100
    }
    if (color && colorXp) {
      //light added here
      const size = getSize(gamePattern.length)
      const type = size + ' ' + color
      const newLight = {type: type, id: uuidv4()}
      setCurrentType(type)
      const xpGain: number = colorXp * gamePattern.length-2
      setXpPlus(xpGain)
      setLightStorage([...lightStorage, newLight])
      localStorage.setItem('lightStorage', JSON.stringify([...lightStorage, newLight]))
      setUserXp(userXp + xpGain)
      localStorage.setItem('userXp', JSON.stringify(userXp + xpGain))
      setFreed(true)
    }

  }

  const newgame = () => {
    setUserInput('')
    let pattern = generatePattern()
    setGamePattern([...pattern])
    readPattern(pattern)
  }

  useEffect(() => {
    if (userInput) {
      conductRoll(getScore()!)
      //runs if input was detected after play period
    }
    if (!isPlaying && gamePattern && !userInput) {
      leavePlay()
      //runs if no input was detected after play period
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
    // starts pattern generation second after load
    setTimeout(() => {
      newgame()
    }, 1000)
  }, [])


  return (
    <div className='play_screen'>
      <div className='play_room'>
        {!isPlaying && !madeIt ? 
          <div className='play_instructions'>
            <p>Memorize the shadows movements.</p>
            <img src={eyes} alt="eyes" />
          </div>
          :
          <div className='play_instructions'>
            <p>Repeat the shadows movements.</p>
            <img src={tap} alt="tap" />
          </div>
         
        }
        <div className='grid_layout'>
            <button id='up' ref={upRef} style={defaultColor} onClick={() => clickButton('up')}></button>
            <button id='left' ref={leftRef} style={defaultColor} onClick={() => clickButton('left')}></button>
            <button id='right' ref={rightRef} style={defaultColor} onClick={() => clickButton('right')}></button>
            <button id='down' ref={downRef} style={defaultColor} onClick={() => clickButton('down')}></button>
        </div>
      </div>
      {userInput && !isPlaying &&
        <div className='freed_light'>
          {freed ? <p>You freed a light! <br /><span>+ {xpPlus}xp</span></p> : <p>You failed in freeing the light.</p>}
          {freed && 
            <div className='light_container'>
              <div className={`lights ${currentType}`}></div>
            </div>
          }
          <button onClick={leavePlay}>Continue</button>
        </div>
      }
    </div>
  )
}



export default PlayScreen