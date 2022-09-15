import React, {useEffect, useState} from 'react'

interface ILights {
    type: string
    id: string
  } 
   
interface IProps {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    setNav: (location: string) => void
}

const Quests = ({setNav, lightStorage, setLightStorage}: IProps) => {

    const backToMap = () => {
        setNav('none')
    }

    // const [completedLights, setCompletedLights] = useState(Array(5).fill(Array(5).fill(false)))
    const [completedLights, setCompletedLights] = useState(Array(25).fill(false))

    const colors = ['green', 'blue', 'purple', 'red', 'yellow']

    const sizes = ['three', 'four', 'five', 'six', 'seven']

    const finished = {
      boxShadow: `5px 5px 15px 5px #FF8080,
       -9px 5px 15px 5px #FFE488,
       -7px -5px 15px 5px #8CFF85,
       12px -5px 15px 5px #80C7FF,
       12px 10px 15px 7px #E488FF,
       -10px 10px 15px 7px #FF616B,
       -10px -7px 27px 1px #8E5CFF,
       5px 5px 5px 5px rgba(0,0,0,0)`
    }

    const unfinished = {
      boxShadow: '0px 0px 10px black'
    }

    const incomplete = {
      filter: 'brightness(0)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }

    const [handingIn, setHandingIn] = useState(false)

    const [error, setError] = useState('')

    const toggleHandingIn = () => {
      setHandingIn(!handingIn)
    }

    const handInLight = (sizeIdx: number, colorIdx: number) => {
      const idx = 5 * sizeIdx + colorIdx
      if (completedLights[idx] || completedLights.indexOf(false) < sizeIdx*5 || !handingIn) {
        // disables click if light handed in or if there is an incomplete light in the row before
        return
      }
      const type = sizes[sizeIdx] + ' ' + colors[colorIdx]
      const storageIdx = lightStorage.findIndex(light => light.type === type)
      if (storageIdx > -1) {
        //removing light from light storage
        let tempStorage = [...lightStorage]
        tempStorage.splice(storageIdx, 1)
        setLightStorage([...tempStorage])
        //adding light to completed lights
        let tempCompleted = [...completedLights]
        tempCompleted[idx] = true
        setCompletedLights([...tempCompleted])
      } else {
        setError('You have not caught that light yet.')
        return
      }
      setError('')
    }

    const errorText = {
      color: 'red',
    }

    const completedText = {
      color: 'black',
    }

    const questComplete = 'Congragulations you have freed every light and completed your quest!'

  return (
    <div className='nav_directory quests'>
        <button onClick={toggleHandingIn}>Begin Handing In</button>
        <button onClick={backToMap}>Back</button>
        <span style={completedLights.indexOf(false) < 0 ? {textAlign: 'center', ...completedText} : {textAlign: 'center', ...errorText}}>{completedLights.indexOf(false) < 0 ? questComplete : error}</span>
        {sizes.map((size, sizeIdx: number) => (
          <div className={completedLights.indexOf(false) > sizeIdx*5-1 || completedLights.indexOf(false) < 0 ? 'size_container' : 'size_container locked'} 
          style={completedLights.indexOf(false) > sizeIdx*5+4 || completedLights.indexOf(false) < 0 ? {...finished} : {...unfinished}}>
          {colors.map((color, colorIdx: number) => (
            <div className='color_container'  onClick={() => handInLight(sizeIdx, colorIdx)} style={completedLights[5*sizeIdx+colorIdx] ? {} : {...incomplete}}>
              <div className={`lights ${colors[colorIdx]} ${sizes[sizeIdx]}`}></div>
            </div>
          ))}
          </div>
        ))}
    </div>
  )
}

export default Quests