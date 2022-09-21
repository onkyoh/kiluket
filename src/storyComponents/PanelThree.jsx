import React from 'react'

const PanelThree = ({setStoryIdx, storyIdx, setUserXp}) => {

  const handleStartGame = () => {
    setUserXp(317)
    localStorage.setItem('userXp', JSON.stringify(317))
  }

  return (
    <div className='dark_panels'>
        <p>
          Then the 'kiluket' vanished. 
          Almost immediately, lights were once again being consumed by the shadows, and slowly the chaos and darkness of old times enshrouded the world. Until...
        </p>
        <div className='shadow_box'>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <button onClick={handleStartGame}>Arrive</button>
    </div>
  )
}

export default PanelThree 