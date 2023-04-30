import {useEffect, useRef} from 'react'

import eyes from '../../icons/eyes.png'
import tap from '../../icons/tap.png'

import { COLORS} from './utils/constants'
import { ILights } from '../../types'

import useButtons from './hooks/useButtons'
import useScore from './hooks/useScore'


interface IProps {
    setInGame: (inGame: boolean) => void
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    userXp: number
    setUserXp: (xp: number) => void
}

const Battle = ({
  setInGame, 
  setLightStorage, 
  lightStorage, 
  setUserXp, 
  userXp}: IProps) => {

  const leftRef = useRef<HTMLButtonElement>(null)
  const upRef = useRef<HTMLButtonElement>(null)
  const rightRef = useRef<HTMLButtonElement>(null)
  const downRef = useRef<HTMLButtonElement>(null)

  const {isPlaying, gamePattern, userInput, clickButton} = useButtons([leftRef, upRef, rightRef, downRef])

  const {xpGained, freed, madeIt, currentType, conductRoll} = useScore({gamePattern, userInput, setLightStorage, lightStorage, setUserXp, userXp})


  useEffect(() => {
    if (userInput) {
      conductRoll()
      //runs if input was detected after play period
    }
    if (!isPlaying && gamePattern && !userInput) {
      setInGame(false)
      //runs if no input was detected after play period
    }
  }, [isPlaying])


  return (
    <div className='play-screen'>
      <div className='play-room'>
        {!isPlaying && !madeIt ? 
          <div className='play-instructions'>
            <p>Memorize the shadows movements.</p>
            <img src={eyes} alt="eyes" />
          </div>
          :
          <div className='play-instructions'>
            <p>Repeat the shadows movements.</p>
            <img src={tap} alt="tap" />
          </div>
         
        }
        <div className='grid-layout'>
            <button id='up' ref={upRef} style={COLORS.DEFAULT} onClick={() => clickButton('up')}></button>
            <button id='left' ref={leftRef} style={COLORS.DEFAULT} onClick={() => clickButton('left')}></button>
            <button id='right' ref={rightRef} style={COLORS.DEFAULT} onClick={() => clickButton('right')}></button>
            <button id='down' ref={downRef} style={COLORS.DEFAULT} onClick={() => clickButton('down')}></button>
        </div>
      </div>
      {userInput && !isPlaying &&
        <div className='freed-light'>
          {freed ? <p>You freed a light! <br /><span>+ {xpGained}xp</span></p> : <p>You failed in freeing the light.</p>}
          {freed && 
            <div className='light-container'>
              <div className={`lights ${currentType}`}></div>
            </div>
          }
          <button onClick={() => setInGame(false)}>Continue</button>
        </div>
      }
    </div>
  )
}



export default Battle