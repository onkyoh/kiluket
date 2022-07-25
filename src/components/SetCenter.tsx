import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"

const SetCenter = () => {
    const map = useMap()

    const options = {
        enableHighAccuracy: true
    }
  
    useEffect(() => {
      let location: [number, number] = [50, 50]
      navigator.geolocation.getCurrentPosition(
        (position) => {
            location = [position.coords.latitude, position.coords.longitude]
            map.setView(location, 21)
        },
        () => {console.log('error')},
        options
      )
    }, [])

    const success = (position: { coords: { latitude: number; longitude: number } }) => {
       let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
       map.setView(location, 21)
       console.log('updated position')
    }

    const error = (error: {message: string}) => {
        console.log(error.message)
    }

    navigator.geolocation.watchPosition(success, error, options);


  return (
    <div>SetCenter</div>
  )
}

export default SetCenter