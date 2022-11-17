import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import profile from '../../../Assets/SVG/profile.svg'
import axios from 'axios'

function Profile() {
  const navigate = useNavigate()
  const roles = ["manager", "client",  "livreur"]

  if(!localStorage.getItem('role')){
    navigate('/notfound')
  }

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  
    axios.get("http://localhost:1000/api/user/manager/me/", roles)
    .then((success) => {
      setError(null)
      setSuccess(success.data.message)
      console.log("marhba biiiiiiiiiiiiik");
    })
    .catch((error) => {
      setError(error.response.data.message)
      setSuccess(null)
      console.log("chkoun nta a chrif", error.response);
      // navigate('/login')
    })
  

  return (
    <div>
      <div className='w-1/2 flex justify-center'>
        <img src={profile} className='h-screen w-2/3' alt='this is an something'/>
      </div>
    </div>
  )
}

export default Profile