import { useState } from 'react'
import { ILights } from '../../../types'

interface IParams {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
}

const useInventory = ({lightStorage, setLightStorage}: IParams) => {

    const [selectedLights, setSelectedLights] = useState<ILights[]>([])

    const [showDelete, setShowDelete] = useState(false)

    const select = (id: string) => {
        let tempSelected = [...selectedLights]
        const selectedIdx = selectedLights.findIndex(light => light.id === id)
        const lightIdx = lightStorage.findIndex(light => light.id === id)
        if (selectedIdx < 0) {
            tempSelected = [...selectedLights, lightStorage[lightIdx]]
        } else {
            tempSelected.splice(selectedIdx, 1)
        }
        setSelectedLights([...tempSelected])
    }

    const deleteConfirmed = () => {
        let currentLights = [...lightStorage]
        let newLights = currentLights.filter(light => !selectedLights.includes(light))
        setLightStorage([...newLights])
        localStorage.setItem('lightStorage', JSON.stringify([...newLights]))
        setSelectedLights([])
        setShowDelete(false)
    }

    const handleConfirmation = () => {
        // show/hide confirmation screen to delete selected lights
        setShowDelete(!showDelete)
    }

  return {
    selectedLights, 
    showDelete, 
    select, 
    deleteConfirmed, 
    handleConfirmation
  }
}

export default useInventory