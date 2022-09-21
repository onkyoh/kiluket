import React from 'react'

const PanelZero = ({setStoryIdx, storyIdx}) => {

  const handleIdx = () => {
    setStoryIdx(storyIdx + 1)
  }

  return (
    <div className='dark_panels'>
        <p>In the beginning there was only chaos and darkness. Ominous beings known as shadows filled every corner of the world. Until... they arrived...</p>
        <div className='shadow_box'>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <button onClick={handleIdx}>Continue</button>
    </div>
  )
}

export default PanelZero 