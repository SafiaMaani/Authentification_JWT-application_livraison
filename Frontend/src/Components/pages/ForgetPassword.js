import { React, useState } from 'react'
import FormInput from '../forms/FormInput';
import forgottenImg from '../../Assets/SVG/forgotPassword.svg'
import axios from 'axios'
import Toaster from 'toastr'
import 'toastr/build/toastr.css'

function ForgetPassword() {

    const [forgotten, setForgotten] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [values, setValues] = useState({
        email: ""
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "",
            label: "Email",
            pattern: ".+\@.+\..+",
            required: true,
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:1000/api/auth/forgetpassword", values)
        .then((success) => {
          setForgotten(true);
          setError(null);
          setSuccess(success.data.message)
          Toaster.success(success.data.message, 'Success', {
            positionClass: "toast-bottom-left"
          })
        })
        .catch((error) => {
          setError(error.response.data.message);
          setForgotten(false);
          setSuccess(null)
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
    <div className="relative flex flex-row justify-center min-h-screen overflow-hidden">
        <div className='w-1/2 flex justify-center'>
         <img src={forgottenImg} className='h-screen w-2/3'  alt='this is an something'/>
        </div>
        <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Forgot Password
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
                        Send me an email
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default ForgetPassword