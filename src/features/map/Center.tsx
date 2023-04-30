import Leaflet from "leaflet"
import { useEffect } from "react"
import { useMap, Marker } from "react-leaflet"

interface IProps {
    location: [number, number]
}

const Center = ({location}: IProps) => {
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
        map.setView(location, 19, setViewOptions)
    }, [location])

    return (
        <Marker icon={icon} position={location} keyboard={false}/>
    )
}

export default Center