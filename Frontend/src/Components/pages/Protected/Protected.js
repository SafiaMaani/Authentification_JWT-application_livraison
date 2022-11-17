// import React from 'react'
// import {Navigate, Outlet} from 'react-router-dom'

// function Protected({roles}) {
//   const role = localStorage.getItem('role') || null

//   if(!role){
//     return <Navigate to="/login" />
//   } 
//   if(!roles.includes(role)){
//     return (
//       <div>
//         <h1>Unauthorizes :(</h1>
//       </div>
//     )
//   }

//   return <Outlet />

// }

// export default Protected