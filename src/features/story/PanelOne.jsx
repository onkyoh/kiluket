const PanelOne = ({setStoryIdx, storyIdx}) => {

  const handleIdx = () => {
    setStoryIdx(storyIdx + 1)
  }

  return (
    <div className='dark-panels'>
        <p>
          They were an entity surrounded by mystery, yet their arrival did not elicit fear nor worry. 
          With means unknown to all else, they quickly began freeing lights from the strangles of the shadows.
        </p>
        <div id='kiluket'></div>
        <button onClick={handleIdx}>Continue</button>
    </div>
  )
}

export default PanelOne 