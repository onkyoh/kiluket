import React, {useState, useEffect} from 'react'
import PlayScreen from './PlayScreen'
import MapScreen from './MapScreen'
import Story from '../storyComponents/Story'

interface ILights {
  type: string
  id: string
} 

const GameScreen = () => {

  const [inGame, setInGame] = useState(false)

  const [lightStorage, setLightStorage] = useState<ILights[]>([])

  const [userXp, setUserXp] = useState(0)

  useEffect(() => {
    //grab users xp, lightstorage, and quests
    let currentXp = localStorage.getItem('userXp')
    if (currentXp) {
      setUserXp(parseInt(currentXp))
    }
    let lightStorage = localStorage.getItem('lightStorage')
    if (lightStorage) {
      setLightStorage(JSON.parse(lightStorage))
    }
  }, [])


  return (
      <>
        {userXp === 0 ?
          <Story setUserXp={setUserXp}/>
        :
          <>
            {inGame && <PlayScreen setInGame={setInGame} setLightStorage={setLightStorage} lightStorage={lightStorage} setUserXp={setUserXp} userXp={userXp}/>}
            <MapScreen setInGame={setInGame} inGame={inGame} setLightStorage={setLightStorage} lightStorage={lightStorage} userXp={userXp}/>
          </>
        } 
      </>
  )
}

export default GameScreen