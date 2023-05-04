import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/medicines').then(res => {
     
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }, []);

  function handleDelete(id) {
    const conf = window.confirm('Do you want to delete');
    if (conf) {
      axios
        .delete('http://localhost:3000/medicines/' + id)
        .then(res => {
          setRecords(prevRecords =>
            prevRecords.filter(record => record.id !== id)
          );
        })
        .catch(err => console.log(err));
    }
  }
  /*============= Search filter query================ */
  const filteredRecords = records.filter(record => {
    console.log(record)
    return record.Medicine.toLowerCase().includes(searchQuery.toLowerCase());
});

  return (
    <div>
      <Navbar />
      <div className='container mt-5'>
        <div className='text-end'>
          <Link to='/create' className='btn btn-primary'>
            Add +
          </Link>
        </div>
        <div className='mb-3 mt-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <table className='table' id='productsTable'>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.Medicine}</td>
                <td>{d.Price}</td>
                <td>
                  <Link
                    to={`/update/${d.id}`}
                    className='btn btn-sm btn-success'
                  >
                    Update
                  </Link>
                  <button
                    onClick={e => handleDelete(d.id)}
                    className='btn btn-sm btn-danger ms-1'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
