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

    const [error, setError] = useState('')

    const errorText = {
      textAlign: 'center' as const, 
      color: 'red',
    }

    const completedText = {
      textAlign: 'center' as const,
      color: 'black',
    }

    const questComplete = 'Congratulations you have freed every light and completed your quest!'

    const [showInfo, setShowInfo] = useState(false)

    const toggleQuestInfo = () => {
      setShowInfo(!showInfo)
    }

    const handIn = () => {
      let tempCompleted = [...completedLights]
      let tempStorage = [...lightStorage]
      let colorIdx = 0
      let sizeIdx = 0
      let arraysChanged = false
      tempCompleted.forEach((completed, i) => {


        const type = sizes[sizeIdx] + ' ' + colors[colorIdx]
   
        const storageIdx = lightStorage.findIndex(light => light.type === type)
        if (storageIdx > -1 && !completed) {
          tempStorage.splice(storageIdx, 1)
          tempCompleted[i] = true
          arraysChanged = true
        }

        colorIdx += 1
        if (colorIdx === 5) {
          colorIdx = 0
          sizeIdx += 1
        }
      }) 
      if (arraysChanged) {
        setCompletedLights([...tempCompleted])
        localStorage.setItem('completedLights', JSON.stringify([...tempCompleted]))
        setLightStorage([...tempStorage])
        localStorage.setItem('lightStorage', JSON.stringify([...tempStorage]))
      } else {
        setError('You do not currently have unique lights to hand in.')
      }
    }

    useEffect(() => {
      let currentCompleted = localStorage.getItem('completedLights')
      if (currentCompleted) {
        setCompletedLights(JSON.parse(currentCompleted))
      }
    }, [])

  return (
    <div className='nav_directory quests'>
        <button onClick={backToMap} className='leave_button'>Back</button>
        <button onClick={toggleQuestInfo} id='info'>i</button>
        <button onClick={handIn}>Hand In</button>
        <span style={completedLights.indexOf(false) < 0 ? {...completedText} : {...errorText}}>{completedLights.indexOf(false) < 0 ? questComplete : error}</span>
        {sizes.map((size, sizeIdx: number) => (
          <div  key={sizeIdx} className='size_container' style={completedLights.indexOf(false) > sizeIdx*5+4 || completedLights.indexOf(false) < 0 ? {...finished} : {...unfinished}}>
          {colors.map((color, colorIdx: number) => (
            <div className='color_container' key={colorIdx} style={completedLights[5*sizeIdx+colorIdx] ? {} : {...incomplete}}>
              <div className={`lights ${colors[colorIdx]} ${sizes[sizeIdx]}`}></div>
            </div>
          ))}
          </div>
        ))}
        {showInfo && 
        <dialog open>
          <button onClick={toggleQuestInfo}>x</button>
          <p>
            As the 'Kiluket' it is your task to free lights strangled by the shadows and let them shine freely.
            Upon freeing a unique type of light hand it in. Once all types have been freed you will have completed your quest.
          </p>
        </dialog>
        }
    </div>
  )
}

export default Quests