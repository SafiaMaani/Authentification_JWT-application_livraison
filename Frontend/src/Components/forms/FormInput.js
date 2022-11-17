import { React } from 'react';

function FormInput(props){
  const { label, errorMessage, onChange, ...inputProps } = props;

  return (
    <div>
      <div className="mb-2">
        <label
          className="block text-sm font-semibold text-gray-800"
        >   
        {/* {label}  */}
        </label>
        <input
        {...inputProps}
        onChange={onChange}
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <span className='text-red-700'>{errorMessage}</span>
      </div>
    </div>
  )
}
export default FormInput