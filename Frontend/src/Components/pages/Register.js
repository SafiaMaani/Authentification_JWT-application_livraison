import { React, useState } from 'react';

import { Link } from 'react-router-dom';
import FormInput from '../forms/FormInput';
import registerImg from '../../Assets/SVG/register.svg';
import axios from 'axios'
import Toaster from 'toastr'
import 'toastr/build/toastr.css'

function Register() {

  const [register, setRegister] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: "client"
    });

  const inputs  = [
        {
          id: 1,
          name: "first_name",
          type: "text",
          placeholder: "First Name",
          errorMessage: "",
          label: "Fisrt Name",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 2,
          name: "last_name",
          type: "text",
          placeholder: "Last Name",
          errorMessage: "",
          label: "Last Name",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 3,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "",
          label: "Email",
          pattern: ".+\@.+\..+",
          required: true,
        },
        {
          id: 4,
          name:"password",
          type: "text",
          placeholder: "Password",
          errorMessage: "",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          id: 5,
          name:"passwordConfirmation",
          type: "text",
          placeholder: "Confirm password",
          errorMessage: "",
          label: "Confirm password",
          pattern: values.password,
          required: true,
        },
    ]
    

    const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.post("http://localhost:1000/api/auth/register", values)
      .then((success) => {
        setRegister(true);
        setError(null);
        setSuccess(success.data.message)
        console.log(success);
        Toaster.success(success.data.message, 'Success', {
          positionClass: "toast-bottom-left"
        })
      })
      .catch((error) => {
        setRegister(false);
        setError(error.response.data.message);
        setSuccess(null)
        console.log(error);
        if (error.response.data.message) {
          Toaster.warning(error.response.data.message, 'warning!', {
            positionClass: "toast-bottom-left"
          })
        }

      });
    }
    
    
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <section className="relative flex flex-row justify-center min-h-screen overflow-hidden">
            <div className='w-1/2 flex justify-center'>
             <img src={registerImg} className='h-screen w-2/3' alt='this is an something'/>
            </div>
            <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Register
                </h1>

                <form className="mt-6" onSubmit={handleSubmit}>
                    
                    {inputs.map((input) => (
                        <FormInput 
                            key={input.id}
                            {...input}
                            onChange={handleChange}
                        />
                    ))}
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    You have an account?{" "}
                    <Link to={'/login'} className="font-medium text-purple-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </section>
    );
}
export default Register
