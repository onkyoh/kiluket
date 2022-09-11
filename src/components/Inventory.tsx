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
        backgroundColor: 'lightgray'
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

    const deleteLights = () => {
        let currentLights = [...lightStorage]
        let newLights = currentLights.filter(light => !selectedLights.includes(light))
        setLightStorage([...newLights])
        setSelectedLights([])
    }

    useEffect(() => {
        console.log(lightStorage)
    }, [])

  return (
    <div className='nav_directory'>
        <button onClick={backToMap}>Back</button>
        <button onClick={deleteLights} disabled={selectedLights.length < 1 && false}>Delete</button>
        <div className='lights_grid'>
            {lightStorage.map((light: ILights) => (
                <div key={light.id} onClick={() => select(light.id)} style={selectedLights.findIndex(selected => selected.id === light.id) > -1 ? {...selected} : {}}>
                    <div>{light.type}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Inventory