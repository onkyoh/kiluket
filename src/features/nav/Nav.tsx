import { useState } from 'react'

import Inventory from './Inventory';
import Quests from './Quests';

import inventory from '../../icons/inventory.png'
import quests from '../../icons/quests.png'

import { ILights } from '../../types';

interface IProps {
    lightStorage: ILights[]
    setLightStorage: (lightStorage: ILights[]) => void
}

const Nav = ({lightStorage, setLightStorage}: IProps) => {
    
const [nav, setNav] = useState('none')

const handleNav = (popup: string) => {
  if (popup === nav) {
    setNav('none')
    return
  }
  setNav(popup)
}

let popupShown;

switch (nav) {
  case 'none':
  popupShown = null;
  break;
  case 'inv':
  popupShown = <Inventory setNav={setNav} lightStorage={lightStorage} setLightStorage={setLightStorage}/>
  break;
  case 'quests':
  popupShown = <Quests setNav={setNav} lightStorage={lightStorage} setLightStorage={setLightStorage}/>
  break;           
}

  return (
    <>
        {nav !== 'none' && <div className='popup'>
          {popupShown}
        </div>
        }

        <div className='nav-buttons'>
          <button><img onClick={() => handleNav('inv')} src={inventory} alt='inventory'/></button>
          <button><img onClick={() => handleNav('quests')} src={quests} alt='quests'/></button>
        </div>
    </>
  )
}

export default Nav