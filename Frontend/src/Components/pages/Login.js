import { React, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormInput from '../forms/FormInput';
import login from '../../Assets/SVG/login.svg'
import axios from 'axios';
import Toaster from 'toastr'
import 'toastr/build/toastr.css'

function Login() {
    const navigate = useNavigate()
    
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs  = [
        {
          id: 1,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "",
          label: "Email",
          pattern: ".+\@.+\..+",
          required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "",
            label: "Password",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
          },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:1000/api/auth/login", values)
        .then((success) => {
            setLogged(true);
            setError(null)
            setSuccess(success.data.message)
            const role = success.data.user._roles.role
            localStorage.setItem('role', role)
            Toaster.success(success.data.message, 'Success', {
                positionClass: "toast-bottom-left"
            })
            navigate('/profile/'+role)
        })
        .catch((error) => {
            setError(error.response.data.message)
            setLogged(false)
            setSuccess(null)
            if (error.response.data.message) {
                Toaster.warning(error.response.data.message, 'warning!', {
                  positionClass: "toast-bottom-left"
                })
              }
        })
    } 

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

  return (
      <div className="relative flex flex-row justify-center min-h-screen overflow-hidden">
          <div className='w-1/2 flex justify-center'>
            <img src={login} className='h-screen w-2/3' alt='this is an something'/>
          </div>
          <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                 Login
              </h1>
              <form className="mt-6" onSubmit={handleSubmit}>
                                
                {inputs.map((input) => (
                    <FormInput 
                        key={input.id}
                        {...input}
                        onChange={handleChange}
                    />
                ))}
                  
                    <Link to={'/forgetpassword'} className="text-xs text-purple-600 hover:underline">Forget Password?</Link>  
                  <div className="mt-6">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                          Login
                      </button>
                  </div>
              </form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                  {" "}
                  Don't have an account?{" "}
                  <Link to={'/register'} className="font-medium text-purple-600 hover:underline">Sign up</Link>  
              </p>
          </div>
      </div>
  );
}
export default Login