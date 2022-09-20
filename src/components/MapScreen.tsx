import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer} from 'react-leaflet'
import Leaflet from "leaflet"
import SetCenter from './SetCenter'
import Inventory from '../navComponents/Inventory'
import Quests from '../navComponents/Quests'
import verifyMoved from '../utils/verifyMoved'
import XpBar from './XpBar'
import quests from '../icons/quests.png'
import inventory from '../icons/inventory.png'

interface shadow {
  id: number
  position: [number, number]
}

interface ILights {
  type: string
  id: string
} 

interface IProps {
    inGame: boolean
    setInGame: (inGame: boolean) => void
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    userXp: number
}

const MapScreen = ({setInGame, inGame, setLightStorage, lightStorage, userXp}: IProps) => {

  const [updatedLocation, setUpdatedLocation] = useState<[number, number]>([0, 0])

  const [previousLocation, setPreviousLocation] = useState<[number, number]>()
  
  const [shadows, setShadows] = useState<any[]>([])

  const shadowIcon = Leaflet.divIcon({
    className: 'shadow',
    iconSize: [30, 30],
  })

  const amountOfShadows = () => {
    let shadowNumber = Math.round(Math.random() * 7)
    return shadowNumber
  }

  const populateShadows = (currentPos: [number, number] | undefined) => {
    if (!currentPos) {
      return
    }
    let tempShadows: shadow[] = [...shadows]

    const shadowDensity = amountOfShadows()

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

  useEffect(() => {
      populateShadows([...updatedLocation])
  }, [previousLocation])

  const shadowClicked = (id: number) => {
    setInGame(true)
  }

  const success = (position: { coords: { latitude: number; longitude: number } }) => {
    let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
    if (!previousLocation) {
      setPreviousLocation([...location])
    }  else {
      const movedEnough = verifyMoved([...previousLocation], [...location])
      if (movedEnough) {
        populateShadows([...location])
      }
    }
    setUpdatedLocation([...location])
}

const failure = (err: {message: string}) => {
  console.log(err.message)
}

useEffect(() => {
  navigator.geolocation.getCurrentPosition(success, failure)
}, [])

useEffect(() => {
    console.log(updatedLocation)
}, [updatedLocation])

useEffect(() => {
  if (!inGame) {
    populateShadows(updatedLocation)
  }
}, [inGame])

const [nav, setNav] = useState('none')

let popupShown;

const handleNav = (popup: string) => {
  setNav(popup)
}

switch (nav) {
  case 'none':
  popupShown = null;
  break;
  case 'inv':
  popupShown = <Inventory setNav={setNav} lightStorage={lightStorage} setLightStorage={setLightStorage}/>
  break;
  case 'quests':
  popupShown = <Quests setNav={setNav} lightStorage={lightStorage} setLightStorage={setLightStorage}/>
  break;           
}

  return (
    <>
        {updatedLocation[0] !== 0 ?
            <>
                <MapContainer className="map" center={updatedLocation} zoom={19} dragging={false} zoomControl={false} doubleClickZoom={false} attributionControl={false} touchZoom={false} keyboard={false}>
                    <TileLayer
                        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
                        maxZoom={19}
                        minZoom={19}
                    />
                    {shadows.length > 0 && shadows.map((shadow: shadow) => (
                        <Marker key={shadow.id} icon={shadowIcon} position={shadow.position} keyboard={false} eventHandlers={{
                        click: () => shadowClicked(shadow.id),
                        }}>
                        </Marker>
                    ))}
                    <SetCenter updatedLocation={updatedLocation} setUpdatedLocation={setUpdatedLocation} previousLocation={previousLocation} setPreviousLocation={setPreviousLocation} inGame={inGame}/>
                </MapContainer>
                <XpBar userXp={userXp}/>
                {popupShown}
                <div className='nav'>
                  <img onClick={() => handleNav('inv')} src={inventory} alt='inventory'/>
                  <img onClick={() => handleNav('quests')} src={quests} alt='quests'/>
                </div>
                
            </>
            :
            <div>...getting location</div>
        }
    </>
  )
}

export default MapScreen
