import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer} from 'react-leaflet'
import Leaflet, { Handler } from "leaflet"
import SetCenter from './SetCenter'

interface shadow {
  id: number
  position: [number, number]
}

const GameScreen = () => {

  const [initialLocation, setInitialLocation] = useState<undefined | [number, number]>()
  const [updatedLocation, setUpdatedLocation] = useState<[number, number]>(initialLocation || [0, 0])
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

  const populateShadows = () => {
    let tempShadows: shadow[] = [...shadows]

    let shadowDensity = amountOfShadows()

    for (let i = 0; i < shadowDensity; i++) {
      const yTranslation = Math.random() * 0.0005 * (Math.round(Math.random()) * 2 - 1)
      const xTranslation = Math.random() * 0.0004 * (Math.round(Math.random()) * 2 - 1)
        tempShadows[i] = {
          id: Math.random() * 1000,
          position: [updatedLocation[0] + yTranslation, updatedLocation[1] + xTranslation]
        }
    }
    setShadows([...tempShadows])
    console.log(tempShadows)
  }

  useEffect(() => {
    let xChange: number = 0
    let yChange: number = 0
    if (previousLocation) {
      xChange = previousLocation[1] - updatedLocation[1]
      yChange = previousLocation[0] - updatedLocation[0]
      if ((xChange || yChange > 0.0003) || (xChange || yChange < -0.0003)) {
        populateShadows()
      }
    }
  }, [updatedLocation])

  const shadowClicked = (id: number) => {
    console.log(id)
  }

  const success = (position: { coords: { latitude: number; longitude: number } }) => {
    let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
    setInitialLocation([...location])
    setUpdatedLocation([...location])
    populateShadows()
    
}

const failure = (err: {message: string}) => {
  console.log(err.message)
}

navigator.geolocation.getCurrentPosition(success, failure)



  return (
    <>
    {initialLocation ?
      <>
        <MapContainer className="map" center={initialLocation} zoom={19} dragging={false} zoomControl={false} doubleClickZoom={false} attributionControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                maxZoom={19}
                minZoom={19}
            />
            {shadows.length > 0 && shadows.map((shadow: shadow) => (
                <Marker key={shadow.id} icon={shadowIcon} position={shadow.position} eventHandlers={{
                  click: () => shadowClicked(shadow.id),
                }}>
                </Marker>
            ))}
            <SetCenter updatedLocation={updatedLocation} setUpdatedLocation={setUpdatedLocation} setPreviousLocation={setPreviousLocation}/>
        </MapContainer>
      </>
      :
      <div>...getting location</div>
      }
    </>
  )
}

export default GameScreen

