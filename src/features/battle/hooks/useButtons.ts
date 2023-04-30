import React, { useState, useEffect } from 'react'
import { COLORS, DIFFICULTY } from '../utils/constants'
import { generatePattern } from '../utils/generatePattern'

const useButtons = (
    buttonRefs: React.RefObject<HTMLButtonElement>[]
) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [gamePattern, setGamePattern] = useState<number[]>()

    const newgame = () => {
        setUserInput('')
        let pattern = generatePattern()
        setGamePattern([...pattern])
        readPattern(pattern)
      }

    useEffect(() => {
        // starts pattern generation second after load
        setTimeout(() => {
            newgame()
        }, 1000)
    }, [])

    const clickChange = (ref: React.RefObject<HTMLButtonElement>) => {
        let current = ref.current
        if (!current) return
        //color shown depends on if users input or not
        if (!isPlaying) {
          current.style.border = COLORS.PATTERN.border
          current.style.backgroundColor = COLORS.PATTERN.backgroundColor
          current.style.boxShadow = COLORS.PATTERN.boxShadow
        }
        else {
          current.style.border = COLORS.CLICK.border
          current.style.backgroundColor = COLORS.CLICK.backgroundColor
          current.style.boxShadow = COLORS.CLICK.boxShadow
        } 
       
        setTimeout(() => {
        if (!current) return
          current.style.border = COLORS.DEFAULT.border
          current.style.backgroundColor = COLORS.DEFAULT.backgroundColor
          current.style.boxShadow = COLORS.DEFAULT.boxShadow
        }, DIFFICULTY)
      }
    
      const clickButton = (direction: string) => {
        if (!isPlaying || gamePattern?.length === userInput.length) {
          return
        }
        let input = userInput
          if (direction === 'left') {
            input += 1
            clickChange(buttonRefs[0])
          }
          if (direction === 'up') {
            input += 2
            clickChange(buttonRefs[1])
          }
          if (direction === 'right') {
            input += 3
            clickChange(buttonRefs[2])
          } 
          if (direction === 'down') {
            input += 4 
            clickChange(buttonRefs[3])
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

      useEffect(() => {
        if (isPlaying) {
          window.addEventListener('keydown', keyDownHandler);
          return () => {
            window.removeEventListener('keydown', keyDownHandler);
          };
        }
      }, [keyDownHandler]);
    
      const readPattern = (pattern: number[]) => {
        pattern.forEach((letter, i) =>  {
          setTimeout(() => {
            switch (letter) {
              case 1:
                clickChange(buttonRefs[0])
                break;
              case 2:
                clickChange(buttonRefs[1])
                break;
              case 3:
                clickChange(buttonRefs[2])
                break;
              case 4:
                clickChange(buttonRefs[3])
                break;
              default:
                break;
              }
          }, DIFFICULTY * i)
        })
    
        setTimeout(() => {
          setIsPlaying(true)
          setTimeout(() => {
            setIsPlaying(false)
          }, DIFFICULTY * (10))
        }, DIFFICULTY * (pattern.length + 1))
        
      }

  return {
    isPlaying,
    gamePattern,
    userInput,
    clickButton
  }
}

export default useButtons