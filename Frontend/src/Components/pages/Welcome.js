import React from 'react'
import { Link } from 'react-router-dom'
import welcome from '../../Assets/SVG/welcome.svg'

function Welcome() {
  return (
    <div className='flex'>
    <div className='w-1/2 flex justify-center'>
      <img src={welcome} className='h-screen w-2/3' alt='this is an something'/>
    </div>
    <div className="w-1/2 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        WELCOME TO MARHABA APPLICATION  <br/>
        <Link to={'register'} className='text-indigo-700'>Create an account</Link>
        <p>You already have an account! <Link to={'login'} className='text-indigo-700'>SIGN IN</Link></p>
      </div>
    </div>
  </div>
  )
}

export default Welcome