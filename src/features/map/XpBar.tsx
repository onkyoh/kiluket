import {useMemo} from 'react'

interface IProps {
  userXp: number
}

const XpBar = ({userXp}: IProps) => {

  const level = useMemo(() => {
    const currentLevel = Math.floor(Math.pow(userXp, 0.8)/100)
    return currentLevel
  }, [userXp])


  const fillerBar = {
    width: `${Math.ceil(userXp - Math.pow(((level)*100), 1/0.8))/Math.ceil(Math.pow(((level+1)*100), 1/0.8) - Math.pow(((level)*100), 1/0.8)) * 100}%`,
  }

  return (
    <div className='xp-bar'>
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