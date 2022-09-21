import Leaflet from "leaflet"
import { useEffect } from "react"
import { useMap, Marker } from "react-leaflet"

interface IProps {
    updatedLocation: [number, number]
}

const SetCenter = ({updatedLocation}: IProps) => {
    const map = useMap()

    const icon = Leaflet.divIcon({
        className: 'icon',
        iconSize: [40, 40]
    })

    const setViewOptions = {
        animate: true,
        easeLinearity: 1,
        duration: 0.1
    }

    useEffect(() => {
        map.setView(updatedLocation, 19, setViewOptions)
    }, [updatedLocation])

    return (
        <Marker icon={icon} position={updatedLocation} keyboard={false}/>
    )
}

export default SetCenter