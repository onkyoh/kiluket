import Leaflet from "leaflet"
import { useEffect } from "react"
import { useMap, Marker } from "react-leaflet"
import verifyMoved from '../utils/verifyMoved'


interface IProps {
    updatedLocation: [number, number]
    setUpdatedLocation: (coords: [number, number]) => void
    previousLocation: [number, number]
    setPreviousLocation: (coords: [number, number]) => void
}

interface IPosition {
    coords: {
        latitude: number
        longitude: number
    }
}

const SetCenter = ({updatedLocation, setUpdatedLocation, previousLocation, setPreviousLocation}: IProps) => {
    const map = useMap()
    const markerLocation = updatedLocation

    const icon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [40, 40]
    })

    const setViewOptions = {
        animate: true,
        easeLinearity: 1,
        duration: 0.1
    }

    const success = (position: IPosition) => {
        let location: [number, number] = [position.coords.latitude, position.coords.longitude]
        if (location[0] === updatedLocation[0] && location[1] === updatedLocation[1]) {
            return
        }
        if (updatedLocation[0] === 0 || updatedLocation[1] === 0) {
            return
        }
        if (previousLocation[0] === 0) {
            return
        }
        const movedEnough = verifyMoved([...previousLocation], [...location])
        if (movedEnough) {
          setPreviousLocation([...location])
        }
        setUpdatedLocation([...location])
        map.setView(location, 19, setViewOptions)
    }

    const error = (error: {message: string}) => {
        console.log(error.message)
    }

    navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true
    });

    return (
        <Marker icon={icon} position={markerLocation} keyboard={false}/>
    )
}

export default SetCenter