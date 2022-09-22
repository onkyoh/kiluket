import './styles/App.css';
import GameScreen from './components/GameScreen'
import {useState} from 'react'


function App() {

  const [fullscreen, setFullscreen] = useState(false)

  const goFullScreen = () => {
    document.body.requestFullscreen()
    setFullscreen(true)
  }

  return (
    <div className='app'>
      {!fullscreen ?
      <button onClick={goFullScreen} id='fullscreen_button'>Click to allow fullscreen to continue</button>
      :
      <GameScreen/>
      }
    </div>
  );
}

export default App;
