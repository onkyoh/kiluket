import Leaflet from "leaflet"
import { useEffect, useState} from "react"
import { useMap, Marker } from "react-leaflet"

const SetCenter = () => {
    const map = useMap()
    const [usersLocation, setUsersLocation] = useState<[number, number]>([0, 0])

    const icon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [100, 100]
    })


    const success = (position: { coords: { latitude: number; longitude: number } }) => {
       let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
       map.setView(location, 19)
       setUsersLocation([...location])
       console.log('updated position')
    }

    const error = (error: {message: string}) => {
        console.log(error.message)
    }

    const options = {
        enableHighAccuracy: true
    }

    useEffect(() => {
        let location: [number, number] = [50, 50]
        navigator.geolocation.getCurrentPosition(
          (position) => {
              location = [position.coords.latitude, position.coords.longitude]
              map.setView(location, 19)
              setUsersLocation([...location])
          },
          () => {console.log('error')},
          options
        )
      }, [map, options])

    navigator.geolocation.watchPosition(success, error, options);
    

    return (
        <Marker icon={icon} position={usersLocation}/>
    )
}

export default SetCenter