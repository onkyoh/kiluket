import React, {useState, useEffect} from 'react'
import PanelZero from './PanelZero'
import PanelOne from './PanelOne'
import PanelTwo from './PanelTwo'
import PanelThree from './PanelThree'

const Story = ({setUserXp}) => {

    const [storyIdx, setStoryIdx] = useState(0)

    let currentPanel

    switch (storyIdx) {
        case 0:
            currentPanel = <PanelZero setStoryIdx={setStoryIdx} storyIdx={storyIdx}/>
            break;
        case 1:
            currentPanel = <PanelOne setStoryIdx={setStoryIdx} storyIdx={storyIdx}/>
            break;
        case 2:
            currentPanel = <PanelTwo setStoryIdx={setStoryIdx} storyIdx={storyIdx}/>
            break;
        case 3:
            currentPanel = <PanelThree setStoryIdx={setStoryIdx} storyIdx={storyIdx} setUserXp={setUserXp}/>
            break;
    }

  return (
    <div className='story'>
        {currentPanel}
    </div>
  )
}

export default Story