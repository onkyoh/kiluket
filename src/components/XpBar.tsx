import React, {useEffect, useState} from 'react'

interface IProps {
  userXp: number
}

const XpBar = ({userXp}: IProps) => {

  const [level, setLevel] = useState(0)

  const [prevLevel, setPrevLevel] = useState(-1)

  const calcLevel = (xp: number) => {
    const currentLevel = Math.floor(Math.pow(xp, 0.8)/100)
    return currentLevel
  }

  useEffect(() => {
    if (level !== prevLevel) {
      setPrevLevel(level)
    }
    setLevel(calcLevel(userXp))
  }, [userXp])

  const fillerBar = {
    width: `${Math.ceil(userXp - Math.pow(((level)*100), 1/0.8))/Math.ceil(Math.pow(((level+1)*100), 1/0.8) - Math.pow(((level)*100), 1/0.8)) * 100}%`,
  }


  return (
    <div className='xp_bar'>
      <span className='level'>Lv.{level}</span>
      <div className='bar'>
        <div style={fillerBar}></div>
      </div>
      <div className='progress'>
        {userXp === 317 ? <span>0</span> : <span>{Math.ceil(userXp - Math.pow(((level)*100), 1/0.8))}</span>}
        /
        <span> {Math.ceil(Math.pow(((level+1)*100), 1/0.8) - Math.pow(((level)*100), 1/0.8))}</span>
      </div>
    </div>
  )
}

export default XpBar