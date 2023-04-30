import {useState, useEffect} from 'react'
import Battle from '../../features/battle/Battle'
import Map from '../../features/map/Map'
import Story from '../../features/story/Story'
import { ILights } from '../../types'

const Layout = () => {

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
            {inGame && 
            <Battle 
            setInGame={setInGame} 
            setLightStorage={setLightStorage} 
            lightStorage={lightStorage} 
            setUserXp={setUserXp} 
            userXp={userXp}/>}

            <Map 
            setInGame={setInGame} 
            inGame={inGame} 
            setLightStorage={setLightStorage} 
            lightStorage={lightStorage} 
            userXp={userXp}/>
          </>
        } 
      </>
  )
}

export default Layout