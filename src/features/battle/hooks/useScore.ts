import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ILights } from '../../../types'

interface IParams {
    gamePattern: number[] | undefined
    userInput: string
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    userXp: number
    setUserXp: (xp: number) => void
}

const useScore = ({gamePattern, userInput, setLightStorage, lightStorage, setUserXp, userXp}: IParams) => {

    const [currentType, setCurrentType] = useState('')

    const [freed, setFreed] = useState<boolean>(false)
  
    const [xpGained, setXpGained] = useState(0)
  
    const [madeIt, setMadeIt] = useState(false)
  
    const getScore = () => {
        if (!gamePattern) {
          return
        }
        let userAnswer = userInput.split('')
        userAnswer.splice(gamePattern.length, userAnswer.length)
        let score: number = 0
        userAnswer.forEach((answer: string, i: number) => {
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
    
      const conductRoll = () => {
        let score = getScore()
        setMadeIt(true)
        if (!score || score === 0 || !gamePattern) {
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
          const xpGain: number = colorXp * (gamePattern.length-2)
          setXpGained(xpGain)
          setLightStorage([...lightStorage, newLight])
          localStorage.setItem('lightStorage', JSON.stringify([...lightStorage, newLight]))
          setUserXp(userXp + xpGain)
          localStorage.setItem('userXp', JSON.stringify(userXp + xpGain))
          setFreed(true)
        }
      }

  return {
    xpGained, freed, madeIt, currentType, conductRoll
  }
}

export default useScore