import React from 'react'
import Image from './Image'
import './tooltipStyle.css'

const SidebarItem = ({ icon, name, active, handleClick }) => {
  return (
    <div className={`sidebar-item ${active ? 'active' : null} tooltip`} onClick={() => handleClick()}>
      <Image src={icon} alt={name} />
      <span class="tooltiptext">{name}</span>
    </div>
  )
}

export default SidebarItem
