import { useContext } from 'react'

import { MapContainer, Marker, TileLayer} from 'react-leaflet'
import Leaflet from "leaflet"
import Center from './Center'
import XpBar from './XpBar'
import Nav from '../nav/Nav'

import useShadows from './hooks/useShadows'
import useLocation from './hooks/useLocation'

import { LocationContext } from '../../App'

import { ILights, IShadow } from '../../types'

interface IProps {
    inGame: boolean
    setInGame: (inGame: boolean) => void
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    userXp: number
}

const Map = ({setInGame, setLightStorage, lightStorage, userXp}: IProps) => {

  const prefetchedLocation = useContext(LocationContext)

  const shadowIcon = Leaflet.divIcon({
    className: 'shadow',
    iconSize: [30, 30],
  })

  const {shadows, populateShadows} = useShadows()

  const location = useLocation(populateShadows)

  const shadowClicked = () => {
    setInGame(true)
  }

  return (
    <>
        {prefetchedLocation && location[0] !== 0 ?
            <>
                <MapContainer className="map" center={location} zoom={19} dragging={false} zoomControl={false} doubleClickZoom={false} attributionControl={false} touchZoom={false} keyboard={false}>
                    <TileLayer
                        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
                        maxZoom={19}
                        minZoom={19}
                    />
                    {shadows.length > 0 && shadows.map((shadow: IShadow) => (
                        <Marker key={shadow.id} icon={shadowIcon} position={shadow.position} keyboard={false} eventHandlers={{
                        click: () => shadowClicked(),
                        }}>
                        </Marker>
                    ))}
                    <Center location={location}/>
                </MapContainer>
                <XpBar userXp={userXp}/>
                <Nav lightStorage={lightStorage} setLightStorage={setLightStorage}/>          
            </>
            :
            <div className='searching'>
              <span>...searching</span>
              <div id='compass'>
                <div id='dial'>
                  <div id='markings'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div id='needle'>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
        }
    </>
  )
}

export default Map
