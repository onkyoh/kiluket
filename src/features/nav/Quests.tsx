import { ILights } from '../../types'
import useQuest from './hooks/useQuest'
import { 
  COLORS, 
  COMPLETED_TEXT, 
  ERROR_TEXT, 
  FINISHED_SHADOWS, 
  INCOMPLETE_SHADOWS, 
  QUEST_COMPLETE_TEXT, 
  SIZES, 
  UNFINISHED_SHADOWS
} from './utils/constants'

interface IProps {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
    setNav: (location: string) => void
}

const Quests = ({setNav, lightStorage, setLightStorage}: IProps) => {

    const {completedLights, error, showInfo, toggleQuestInfo, handIn} = useQuest({lightStorage, setLightStorage}) 

    const backToMap = () => {
      setNav('none')
  }

  return (
    <div className='quests'>

      <div className='popup-buttons'>
        <button onClick={backToMap}>Back</button>
        <button onClick={handIn}>Hand In</button>
        <button onClick={toggleQuestInfo} id='info'>i</button>
      </div>

        <span style={completedLights.indexOf(false) < 0 ? {...COMPLETED_TEXT} : {...ERROR_TEXT}}>{completedLights.indexOf(false) < 0 ? QUEST_COMPLETE_TEXT : error}</span>
        
          {SIZES.map((size, sizeIdx: number) => (
            <div  key={sizeIdx} className='size-container' style={completedLights[sizeIdx*5+0] && completedLights[sizeIdx*5+1]
            && completedLights[sizeIdx*5+2] && completedLights[sizeIdx*5+3] && completedLights[sizeIdx*5+4] ? {...FINISHED_SHADOWS} : {...UNFINISHED_SHADOWS}}>
            {COLORS.map((color, colorIdx: number) => (
              <div className='color-container' key={colorIdx} style={completedLights[5*sizeIdx+colorIdx] ? {} : {...INCOMPLETE_SHADOWS}}>
                <div className={`lights ${COLORS[colorIdx]} ${SIZES[sizeIdx]}`}></div>
              </div>
            ))}
            </div>
          ))}
          
        {showInfo && 
        <dialog open>
          <p>
            As the 'Kiluket' it is your task to free lights strangled by the shadows and let them shine freely.
            Upon freeing a unique type of light, hand it in. Once all types have been freed you will have completed your quest.
          </p>
          <button onClick={toggleQuestInfo}>Understood!</button>
        </dialog>
        }
    </div>
  )
}

export default Quests