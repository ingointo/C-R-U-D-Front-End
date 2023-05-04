import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState({ Medicine: '', Price: '' });
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:3000/medicines/' + id)
      .then(res => {
        setData(res.data);
        console.log(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event){
    event.preventDefault()
    axios.put('http://localhost:3000/medicines/' + id, data)
    .then(res => {
        alert('Data successfully updated')
        navigate('/')
    })
  }
  return (
    <div clMedicine='d-flex w-100 vh-100 justify-content-center align-items-center p-5'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>ID:</label>
            <input
              type='text' 
              disabled
              name='name'
              value={data.id}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='name'>Medicine Name:</label>
            <input
              type='text'
              name='name'
              value={data.Medicine}
              onChange={e=> setData({...data, name: e.target.value})}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='email'>Medicine Price</label>
            <input
              type='text'
              name='email'
              value={data.Price}
              onChange={e=> setData({...data, email: e.target.value})}
              className='form-control'
            />
          </div>
          <br />
          <button className='btn btn-info'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
