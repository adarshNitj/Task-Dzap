import React from 'react'
import '../css/Button.css'

const Button = ({text}) => {
  return (
    <div className='button'>
       <button className='button_'>{text}</button>
    </div>
  )
}

export default Button