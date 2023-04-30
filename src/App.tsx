import './styles/App.css';
import Layout from './components/Layout/Layout'
import {useState, createContext} from 'react'

export const LocationContext = createContext({} as [number, number] | undefined);

function App() {

  const [locationContext, setLocationContext] = useState<undefined | [number, number]>()

  navigator.geolocation.getCurrentPosition((position: { coords: { latitude: number; longitude: number } }) => {
    let  location: [number, number] = [position.coords.latitude, position.coords.longitude]
    if (location) {
      setLocationContext([...location])
    }
  });

  return (
    <div className='app'>
      <LocationContext.Provider value={locationContext}>
        <Layout/>
      </LocationContext.Provider>
    </div>
  );
}

export default App;
