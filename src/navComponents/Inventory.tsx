import React, {useEffect, useState} from 'react'


interface ILights {
    type: string
    id: string
  } 
   
interface IProps {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    setNav: (location: string) => void
}

const Inventory = ({setNav, lightStorage, setLightStorage}: IProps) => {

    const [selectedLights, setSelectedLights] = useState<ILights[]>([])

    const backToMap = () => {
        setNav('none')
    }

    const selected = {
        filter: 'brightness(0)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '1em'
    }

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

    const [showDelete, setShowDelete] = useState(false)

    const handleConfirmation = () => {
        // show/hide confirmation screen to delete selected lights
        setShowDelete(!showDelete)
    }

  return (
    <div className='nav_directory inventory'>
        <button onClick={backToMap} className='leave_button'>Back</button>
        <button className='delete_button' onClick={handleConfirmation} disabled={selectedLights.length < 1 && true}>Delete</button>
        <div className='lights_grid'>
            {lightStorage.map((light: ILights) => (
                <div key={light.id} className='lights_container' onClick={() => select(light.id)} style={selectedLights.findIndex(selected => selected.id === light.id) > -1 ? {...selected} : {}}>
                    <div className={`lights ${light.type}`}></div>
                </div>
            ))}
        </div>
        {showDelete && <div className='delete_modal'>
            <h4>Are you sure you wish to release these lights?</h4>
            <p>You cannot undo this action after confirmation.</p>
            <button onClick={deleteConfirmed}>Confirm</button>
            <button onClick={handleConfirmation}>Cancel</button>
        </div>
        }
    </div>
  )
}

export default Inventory