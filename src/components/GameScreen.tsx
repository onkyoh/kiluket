import React, {useState} from 'react'
import PlayScreen from './PlayScreen'
import MapScreen from './MapScreen'

interface ILights {
  type: string
  id: string
} 

const GameScreen = () => {

  const [inGame, setInGame] = useState(false)

  const [lightStorage, setLightStorage] = useState<ILights[]>([])

  return (
    <>
      {inGame && <PlayScreen setInGame={setInGame} setLightStorage={setLightStorage} lightStorage={lightStorage}/>}
      <MapScreen setInGame={setInGame} inGame={inGame} setLightStorage={setLightStorage} lightStorage={lightStorage}/>
    </>
  )
}

export default GameScreen