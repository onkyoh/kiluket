import Leaflet from "leaflet"
import { useState, useEffect } from "react"
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

    const [dumby, setDumby] = useState(false)

    const icon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [40, 40]
    })

    const dumbyIcon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [100, 100]
    })

    const setViewOptions = {
        animate: true,
        easeLinearity: 1,
        duration: 0.1
    }

    const verifyMoved = (previous: [number, number], current: [number, number]) => {
        let verification = false
        setDumby(!dumby)
        //difference between current and previous location
        let xChange = previous[1] - current[1]
        let yChange = previous[0] - current[0]
        //getting absolute value of difference
        if (xChange < 0) {
            xChange *= -1
        }
        if (yChange < 0) {
            xChange *= -1
        }
        //finding hyptoneuse^2 of distance travelled
        let inRadius = Math.pow(xChange, 2) + Math.pow(yChange, 2)
        //comparing hypotoneuse^2 to radius^2 
        if (inRadius > Math.pow(0.0003, 2)) {
            verification = true
        }
        return verification
    }

    const success = (position: IPosition) => {
        let location: [number, number] = [position.coords.latitude, position.coords.longitude]
        if (location[0] === updatedLocation[0] && location[1] === updatedLocation[1]) {
            return
        }
        if (updatedLocation[0] === 0 || updatedLocation[1] === 0) {
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        })
      }, [map])

    navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true
    });

    return (
        <Marker icon={dumby ? dumbyIcon : icon} position={markerLocation} keyboard={false}/>
    )
}

export default SetCenter