import { useEffect, useState } from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import SetCenter from './SetCenter'

const GameScreen = () => {

  const [initialLocation, setInitialLocation] = useState<undefined | [number, number]>()

  const options = {
    enableHighAccuracy: true
  }

  useEffect(() => {
    let location: [number, number] = [0, 0]
    navigator.geolocation.getCurrentPosition(
      (position) => {
      location = [position.coords.latitude, position.coords.longitude]
      setInitialLocation([...location])
      },
      () => {console.log('error')},
      options
    )
  }, [])

  return (
    <>
    {initialLocation &&
      <MapContainer className="map" center={initialLocation} zoom={19} dragging={false} zoomControl={false} attributionControl={false}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              maxZoom={19}
              minZoom={19}
          />
          <SetCenter />
      </MapContainer>
      }
    </>
  )
}

export default GameScreen

