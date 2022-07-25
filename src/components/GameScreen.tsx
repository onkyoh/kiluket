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
      <MapContainer className="map" center={initialLocation} zoom={21}>
          <TileLayer
              attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=323de4ff1d9b4e2cbca29a784ef077d5'
              maxZoom={22}
          />
          <SetCenter />
      </MapContainer>
      }
    </>
  )
}

export default GameScreen