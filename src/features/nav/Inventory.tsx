import { ILights } from '../../types'
import useInventory from './hooks/useInventory'
import { SELECTED } from './utils/constants'
   
interface IProps {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    setNav: (location: string) => void
}

const Inventory = ({setNav, lightStorage, setLightStorage}: IProps) => {

    const {selectedLights, 
        showDelete, 
        select, 
        deleteConfirmed, 
        handleConfirmation
    } = useInventory({lightStorage, setLightStorage})

    const backToMap = () => {
        setNav('none')
    }

  return (
    <div className='inventory'>

        <div className='popup-buttons'>
            <button onClick={backToMap}>Back</button>
            <button onClick={handleConfirmation} disabled={selectedLights.length < 1 && true}>Delete</button>
        </div>

        <div className='lights-grid'>
            {lightStorage.map((light: ILights) => (
                <div key={light.id} className='lights-container' onClick={() => select(light.id)} style={selectedLights.findIndex(selected => selected.id === light.id) > -1 ? {...SELECTED} : {}}>
                    <div className={`lights ${light.type}`}></div>
                </div>
            ))}
        </div>

        {showDelete && <div className='delete-modal'>
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