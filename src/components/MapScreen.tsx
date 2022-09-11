import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer} from 'react-leaflet'
import Leaflet from "leaflet"
import SetCenter from './SetCenter'
import Inventory from './Inventory'

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
}

const MapScreen = ({setInGame, inGame, setLightStorage, lightStorage}: IProps) => {

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
    console.log(id)
    setInGame(true)
  }

  const success = (position: { coords: { latitude: number; longitude: number } }) => {
    let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
    setPreviousLocation([...location])
    setUpdatedLocation([...location])
    populateShadows([...location])
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
  console.log('tried to nav to', popup)
  setNav(popup)
}

switch (nav) {
  case 'none':
  popupShown = null;
  break;
  case 'inv':
  popupShown = <Inventory setNav={setNav} lightStorage={lightStorage} setLightStorage={setLightStorage}/>
  break;     
}

  return (
    <>
        {updatedLocation[0] !== 0 ?
            <>
                <MapContainer className="map" center={updatedLocation} zoom={19} dragging={false} zoomControl={false} doubleClickZoom={false} attributionControl={false} touchZoom={false} keyboard={false}>
                    <TileLayer
                        attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=TEwC0gi2f3HbyX3sTW2LZNx9of0KLaJzin0ad6WCTU5MnKDRzORanl3GSxeTMAzy'
                        maxZoom={19}
                        minZoom={19}
                        accessToken={'TEwC0gi2f3HbyX3sTW2LZNx9of0KLaJzin0ad6WCTU5MnKDRzORanl3GSxeTMAzy'}
                    />
                    {shadows.length > 0 && shadows.map((shadow: shadow) => (
                        <Marker key={shadow.id} icon={shadowIcon} position={shadow.position} keyboard={false} eventHandlers={{
                        click: () => shadowClicked(shadow.id),
                        }}>
                        </Marker>
                    ))}
                    <SetCenter updatedLocation={updatedLocation} setUpdatedLocation={setUpdatedLocation} previousLocation={previousLocation} setPreviousLocation={setPreviousLocation} inGame={inGame}/>
                </MapContainer>
                {popupShown}
                <div className='nav'>
                  <button onClick={() => handleNav('inv')}>I</button>
                  <button onClick={() => handleNav('quests')}>Q</button>
                  <button onClick={() => handleNav('completed')}>C</button>
                  <button>L</button>
                </div>
                
            </>
            :
            <div>...getting location</div>
        }
    </>
  )
}

export default MapScreen
