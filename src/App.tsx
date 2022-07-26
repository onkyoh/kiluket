import './styles/App.css';
import GameScreen from './components/GameScreen'
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 1);
  }, 0);
  }, [])

  return (
    <div className='app'>
      <GameScreen/>
    </div>
  );
}

export default App;
