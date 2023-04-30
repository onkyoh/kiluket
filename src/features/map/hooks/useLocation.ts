import { useEffect, useState } from 'react'
import {useGeolocated} from 'react-geolocated'

const useLocation = (populateShadows: (coords: [number, number] | undefined) => void) => {
  const {coords} = useGeolocated({
    watchPosition: true,
  })

  const [location, setLocation] = useState<[number, number]>([0, 0])
  const [lastPop, setLastPop] = useState<[number, number] | undefined>()

  const checkMovement = () => {
    const EARTH_RADIUS = 6371000; // in meters
    const DISTANCE_THRESHOLD = 20; // in meters

    const deg2rad = (deg: number) => {
      return deg * (Math.PI / 180);
    };

    if (lastPop) {
      const [lat1, lon1] = lastPop;
      const [lat2, lon2] = location;
  
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = EARTH_RADIUS * c;
  
      if (distance > DISTANCE_THRESHOLD) {
        setLastPop(location);
        populateShadows(location);
      }
    }
  };

  useEffect(() => {
    if (coords) {
      setLocation([coords.latitude, coords.longitude])
      if (!lastPop) {
        setLastPop([coords.latitude, coords.longitude]);
      }
    }
    checkMovement()
  }, [coords])

  return location
}

export default useLocation