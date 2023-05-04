import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Add() {
    const [inputData, setInputData] = useState({id:'', Medicine: '', Price: '' })
    const navigate = useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:3000/medicines', inputData)
        .then(res => {
            alert('Data added successfully')
            navigate('/')
        }).catch(err => console.log(err.message))
    }
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center p-5'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>ID:</label>
                        <input type='text'disabled name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, id: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='name'>Medicine Name:</label>
                        <input type='text' name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, Medicine: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='name'>Medicine Price:</label>
                        <input type='text' name='name' className='form-control'
                            onChange={e => setInputData({ ...inputData, Price: e.target.value })} />
                    </div><br />
                    <button className='btn btn-info'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Add