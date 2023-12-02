import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const Root = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
  return (
    <div className='container-fluid gx-0'>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

        <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
            <Outlet />
        </div>
    </div>
  )
}

export default Root