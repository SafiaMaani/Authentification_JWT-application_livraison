import React from 'react'
import notfound from '../../Assets/SVG/notfound.svg'

function NotFound() {
  return (
    <div>
      <div className='w-full flex justify-center'>
         <img src={notfound} className='h-screen w-2/3'  alt='this is an something'/>
        </div>
    </div>
  )
}

export default NotFound