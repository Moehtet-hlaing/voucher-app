import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({name, icon,url}) => {
  return (
    <Link to={url} className=' bg-blue-600 text-white p-5 flex flex-col items-center gap-3 rounded-lg '>
        {icon}
        {name}
    </Link>
  )
}

export default ModuleBtn