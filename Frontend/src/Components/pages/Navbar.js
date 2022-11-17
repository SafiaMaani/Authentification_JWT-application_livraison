// import { useState } from "react";
import {Link} from 'react-router-dom'

function NavBar() {
    // const [navbar, setNavbar] = useState(false);
    return (
        <nav className="w-full bg-purple-500 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to='/'><h2 className="text-2xl font-bold text-white">MARHABA</h2></Link>
                    </div>
                </div>
                <div>
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        <li className="text-white hover:text-indigo-200">
                            <Link to={'/'}>Home</Link> 
                        </li>
                        <li className="text-white hover:text-indigo-200">
                            <Link to={'/'}>Products</Link> 
                        </li>
                        <li className="text-white hover:text-indigo-200">
                            <Link to={'/'}>About US</Link> 
                        </li>
                        <li className="text-white hover:text-indigo-200">
                            <Link to={'/'}>Contact US</Link> 
                        </li>
                    </ul>
                </div>
                <div className="hidden space-x-2 md:inline-block">                 
                            <Link to={'/login'} className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Sign in</Link>    
                            <Link to={'/register'} className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">Sign up</Link>
                </div>

            </div>
        </nav>
    );
}
export default NavBar