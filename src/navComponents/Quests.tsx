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

    const [completedLights, setCompletedLights] = useState(Array(5).fill(Array(5).fill(0)))

    const colors = ['green', 'blue', 'purple', 'red', 'yellow']

    const sizes = ['three', 'four', 'five', 'six', 'seven']

    useEffect(() => {
      //need grab the data for their completed lights
      console.log(completedLights)
    }, [])

  return (
    <div className='nav_directory quests'>
        <button onClick={backToMap}>Back</button>
        {sizes.map((size, sizeIdx) => (
          <div className='size_container'>
          {colors.map((color, colorIdx) => (
            <div className='color_container'>
              <div className={`quest_light ${colors[colorIdx]} ${sizes[sizeIdx]}`}></div>
            </div>
          ))}
          </div>
        ))}
    </div>
  )
}

export default Quests