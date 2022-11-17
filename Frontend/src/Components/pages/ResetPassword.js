import { React, useState } from 'react'
import {useParams} from 'react-router-dom'
import FormInput from '../forms/FormInput';
import resetImg from '../../Assets/SVG/resetPassword.svg'
import axios from 'axios'
import Toaster from 'toastr'
import 'toastr/build/toastr.css'

function ResetPassword() {

    const [reset, setReset] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        password: "",
        passwordConfirmation: ""
    });

    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Nouveau Password",
            errorMessage: "",
            label: "Email",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 2,
            name: "passwordConfirmation",
            type: "password",
            placeholder: "Nouveau Password Confirmation",
            errorMessage: "",
            label: "Email",
            // pattern: values.password,
            required: true,
        }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`http://localhost:1000/api/auth/resetpassword/${token}`, values)
        .then((success) => {
            setReset(true);
            setError(null);
            setSuccess(success.data.message)
            console.log(success.data)
            Toaster.success(success.data.message, 'Success', {
                positionClass: "toast-bottom-left"
            })
        })
        .catch((error) => {
            setError(error.response.data.message);
            setReset(false);
            setSuccess(null)
            if (error.response.data.message) {
                Toaster.warning(error.response.data.message, 'warning!', {
                positionClass: "toast-bottom-left"
                })
            }
        });
    }
    let {token} = useParams()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
  return (
    <div className="relative flex flex-row justify-center min-h-screen overflow-hidden">
        <div className='w-1/2 flex justify-center'>
         <img src={resetImg} className='h-screen w-2/3'  alt='this is an something'/>
        </div>
        <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Reset Password
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
                        Reset password
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default ResetPassword