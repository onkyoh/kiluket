import { useEffect, useState } from 'react'
import { SIZES, COLORS } from '../utils/constants'
import { ILights } from '../../../types'

interface IParams {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
}

const useQuest = ({lightStorage, setLightStorage}: IParams) => {
    const [completedLights, setCompletedLights] = useState(Array(25).fill(false))

    const [error, setError] = useState('')

    const [showInfo, setShowInfo] = useState(false)

    const toggleQuestInfo = () => {
      setShowInfo(!showInfo)
    }

    const handIn = () => {
      let tempCompleted = [...completedLights]
      let tempStorage = [...lightStorage]
      let colorIdx = 0
      let sizeIdx = 0
      let arraysChanged = false

      tempCompleted.forEach((completed, i) => {

        const type = SIZES[sizeIdx] + ' ' + COLORS[colorIdx]
   
        const storageIdx = lightStorage.findIndex(light => light.type === type)
        if (storageIdx > -1 && !completed) {
          tempStorage.splice(storageIdx, 1)
          tempCompleted[i] = true
          arraysChanged = true
        }

        colorIdx += 1
        if (colorIdx === 5) {
          colorIdx = 0
          sizeIdx += 1
        }
      }) 
      if (arraysChanged) {
        setCompletedLights([...tempCompleted])
        localStorage.setItem('completedLights', JSON.stringify([...tempCompleted]))
        setLightStorage([...tempStorage])
        localStorage.setItem('lightStorage', JSON.stringify([...tempStorage]))
      } else {
        setError('You do not currently have unique lights to hand in.')
      }
    }

    useEffect(() => {
      let currentCompleted = localStorage.getItem('completedLights')
      if (currentCompleted) {
        setCompletedLights(JSON.parse(currentCompleted))
      }
    }, [])
    
  return {
    completedLights, 
    error, 
    showInfo, 
    toggleQuestInfo, 
    handIn
  }
}

export default useQuest