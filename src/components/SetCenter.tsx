import Leaflet from "leaflet"
import { useEffect } from "react"
import { useMap, Marker } from "react-leaflet"
import verifyMoved from '../utils/verifyMoved'


interface IProps {
    updatedLocation: [number, number]
    setUpdatedLocation: (coords: [number, number]) => void
    previousLocation: [number, number] | undefined
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
        iconSize: [100, 100]
    })

    const setViewOptions = {
        animate: true,
        easeLinearity: 1,
        duration: 0.1
    }

    const success = (position: IPosition) => {
        let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
        if (location[0] === updatedLocation[0] && location[1] === updatedLocation[1]) {
            return
        }
        if (updatedLocation[0] === 0 && updatedLocation[1] === 0) {
            return
        }
        if (previousLocation) {
            const newPrevious = verifyMoved([...previousLocation], [...location])
            if (newPrevious) {
             setPreviousLocation([...location])
            }
        }
       map.setView(location, 19, setViewOptions)
       setUpdatedLocation([...location])
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

    //so we can simulate travelling with keyclick

    const moveCenter = (direction: string) => {
        let location: [number, number] = [...updatedLocation]
          if (direction === 'left') {
            location[1] -= 0.0002
          }
          if (direction === 'up') {
            location[0] += 0.0002
          }
          if (direction === 'right') {
            location[1] += 0.0002
          } 
          if (direction === 'down') {
            location[0] -= 0.0002
          }
          const position: IPosition = {
              coords: {
                  latitude: location[0],
                  longitude: location[1]
              }
          }
          success(position)
      }
      
    const keyDownHandler = (e: { keyCode: number }) => {
        switch (e.keyCode) {
          case 37: moveCenter('left'); break;
          case 38: moveCenter('up'); break;
          case 39: moveCenter('right'); break;
          case 40: moveCenter('down'); break;
        default: return;
        }
      };
    
      
    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
          window.removeEventListener('keydown', keyDownHandler);
        };
      }, [updatedLocation]);

    return (
        <Marker icon={icon} position={markerLocation} keyboard={false}/>
    )
}

export default SetCenter