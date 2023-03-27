// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
        
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();

        if (file) {
          const fileReader = new FileReader();
          fileReader.readAsText(file);
          fileReader.onload = function (event) {
            const csvOutput = event.target.result;
            const csvData = csvOutput.split(/\r?\n/).map((row) => row.split(','));
            // Post the csv data to the Django backend
            fetch('http://127.0.0.1:8000/', {
              mode: 'cors',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ csv_data: csvData }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('There was a problem with the file upload:', error);
              });
          };
    
        }


    };

    const handleFetch = (e) => {
      e.preventDefault();
      fetch(`http://127.0.0.1:8000/results?start_date=${startDate}&end_date=${endDate}`)
        .then((response) => response.json())
        .then((data) => setData(data.results))
        .catch((error) => console.error('There was a problem fetching the data:', error));
    };


  return (
    <div className="App">

      <h2>Upload CSV</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileInput}/>
          <button type="submit">Upload</button>
        </div>
      </form>

      <form onSubmit={handleFetch}>
        <div>
          <h2>Start Date</h2>
          <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <h2>End Date</h2>
          <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <button type="submit">Fetch data and Generate the report</button>
        </div>
    </form>
    
    {data.length > 0 && (
        <table>
          <thead>
            <tr> 
              <th>Image Name</th>
              <th>Detections</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.image_name}</td>
                <td>{row.objects_detected}</td>
                <td>
                  <img src={process.env.PUBLIC_URL + `/images/${row.image_name}`} alt={row.image_name} style={{ width: '300px', height: 'auto' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}  
    </div>
  );
}

export default App;
