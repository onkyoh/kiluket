import {useState} from 'react'
import { IShadow } from '../../../types'

const useShadows = () => {
    
    const [shadows, setShadows] = useState<IShadow[]>([])

    const populateShadows = (currentPos: [number, number] | undefined) => {
        if (!currentPos) {
          return
        }
        let tempShadows: IShadow[] = [...shadows]
    
        const shadowDensity = Math.round(Math.random() * 4 + 3)
    
        for (let i = 0; i < shadowDensity; i++) {
          const yTranslation = Math.random() * 0.0005 * (Math.round(Math.random()) * 2 - 1)
          const xTranslation = Math.random() * 0.0004 * (Math.round(Math.random()) * 2 - 1)
            tempShadows[i] = {
              id: Math.random() * 1000,
              position: [currentPos[0] + yTranslation, currentPos[1] + xTranslation]
            }
        }
        setShadows([...tempShadows])
      }

  return {
    shadows,
    populateShadows
  }
}

export default useShadows