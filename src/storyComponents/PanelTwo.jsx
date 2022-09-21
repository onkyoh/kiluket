import React from 'react'

const PanelTwo = ({setStoryIdx, storyIdx}) => {

  const handleIdx = () => {
    setStoryIdx(storyIdx + 1)
  }

  return (
    <div>
        <p>
          The surge of freed lights brought about an era of peace and prosperity and the 'thing' that freed the lights was heralded as the 'kiluket' or he who brings light.
        </p>
        <div className='light_box'>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <button onClick={handleIdx}>Continue</button>
    </div>
  )
}

export default PanelTwo 