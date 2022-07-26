import Leaflet from "leaflet"
import { useEffect } from "react"
import { useMap, Marker } from "react-leaflet"
import verifyMoved from '../utils/verifyMoved'


interface IProps {
    updatedLocation: [number, number]
    setUpdatedLocation: (coords: [number, number]) => void
    setPreviousLocation: (coords: [number, number]) => void
}

const SetCenter = ({updatedLocation, setUpdatedLocation, setPreviousLocation}: IProps) => {
    const map = useMap()

    const icon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [100, 100]
    })

    const setViewOptions = {
        animate: true,
        easeLinearity: 1,
        duration: 0.1
    }

    const success = (position: { coords: { latitude: number; longitude: number } }) => {
        let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
        if (location[0] === updatedLocation[0] && location[1] === updatedLocation[1]) {
            console.log('same location')
            return
        }
        if (updatedLocation[0] === 0 && updatedLocation[1] === 0) {
            console.log('took initial location')
            return
        }
       map.setView(location, 19, setViewOptions)
       const newPrevious = verifyMoved(updatedLocation, location)
       if (newPrevious) {
        setPreviousLocation([...updatedLocation])
       }
       setUpdatedLocation([...location])
       console.log('diff location')

    }

    const error = (error: {message: string}) => {
        console.log(error.message)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        })
      }, [map])

    navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true
    });
    

    return (
        <Marker icon={icon} position={updatedLocation} keyboard={false}/>
    )
}

export default SetCenter