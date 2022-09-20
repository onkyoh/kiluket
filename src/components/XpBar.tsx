import React, {useEffect, useState, useCallback} from 'react'

interface IProps {
  userXp: number
}

const XpBar = ({userXp}: IProps) => {

  const [level, setLevel] = useState(0)

  const calcLevel = (xp: number) => {
    const currentLevel = Math.floor(Math.pow(userXp, 0.8)/100)
    return currentLevel
  }

  useEffect(() => {
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
        <span>{Math.ceil(userXp - Math.pow(((level)*100), 1/0.8))} </span>
        /
        <span> {Math.ceil(Math.pow(((level+1)*100), 1/0.8) - Math.pow(((level)*100), 1/0.8))}</span>
      </div>
    </div>
  )
}

export default XpBar