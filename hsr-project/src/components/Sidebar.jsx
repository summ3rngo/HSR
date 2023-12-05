import React from 'react'
import '../style.css'
import { Link, useLocation } from "react-router-dom";
import { FilePerson} from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCube, faRing, faUserGroup, faRankingStar, faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";

const SideBar = (props) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        props.setIsCollapsed(!props.isCollapsed);
    }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className={`sidebar ${props.isCollapsed ? 'collapsed' : ''} min-vh-100 no-gutters`}>
                <div className='nav-header'>
                    <button type='button' onClick={toggleSidebar} className='toggle-button'> <FontAwesomeIcon icon={props.isCollapsed ? faAngleDoubleLeft : faAngleDoubleRight} className='sidebar-icons' /></button>
                </div>
                <ul className='nav nav-pills flex-column mb-auto no-gutters'>
                <li className={isActive('/') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FontAwesomeIcon icon={faHouse} className='sidebar-icons icons'/><Link to="/" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">Home</span>}
                        </Link></span>
                    </li>
                    <li className={isActive('/characters') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FontAwesomeIcon icon={faUserGroup} className='sidebar-icons icons'/><Link to="/characters" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">Characters</span>}
                        </Link></span>
                    </li>
                    <li className={isActive('/tierlist') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FontAwesomeIcon icon={faRankingStar} className='sidebar-icons icons'/><Link to="/tierlist" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">Tier List</span>} </Link></span>
                    </li>
                    <li className={isActive('/light-cones') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FontAwesomeIcon icon={faCube} className='sidebar-icons icons'/><Link to="/light-cones" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">Light Cones</span>}</Link></span>
                    </li>
                    <li className={isActive('/relics') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FontAwesomeIcon icon={faRing} className='sidebar-icons icons'/><Link to="/relics" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">Relics</span>}</Link></span>
                    </li>
                    <li className={isActive('/my-characters') ? 'nav-item active' : 'nav-item'}>
                        <span className='icon-link'><FilePerson className='sidebar-icons icons'/><Link to="/my-characters" className='nav-link'> 
                        {!props.isCollapsed && <span className="text-label">My Collection</span>}</Link></span>
                    </li>

                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar