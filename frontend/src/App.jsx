import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [wdata, setWdata] = useState({});
  const[err,setErr]= useState('');

  const capital_letter = (str) => {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWdata({});
    setErr('');

    fetch(
      `${process.env.REACT_APP_API_URL}/api/weather/?city=${city}`
    ).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        setWdata(data);
      }else{
        setErr(data?.error);
      }
    }).catch(e => console.log(e));

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className='text-center mb-5 mt-5'>Weather App</h1>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <form className="row" onSubmit={onSubmit}>
          <div className="col-8">
            <label htmlFor="city" className="visually-hidden">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              name="city"
              id="city"
              placeholder="Enter Location"
              required
            />
          </div>
          <div className="col-4">
            {loading ? (
              <button className="btn btn-success" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button type="submit" className="btn btn-outline-success mb-3">
                Search
              </button>
            )}
          </div>
        </form>
        {err && <h4 className="text-danger">{err}</h4>}
        {wdata?.weather && (
          <div className="card shadow-0 border">
            <div className="card-body p-4">
              <h4 className="mb-4 sfw-normal">{wdata?.name}</h4>
              <p>
                Current temperature:{' '}
                <strong>
                  {Math.round((wdata?.main?.temp - 273.15) * 100) / 100}°C
                </strong>
              </p>
              <p>
                Humidity: <strong>{wdata?.main?.humidity}%</strong>
              </p>
              <p>
                Max:{' '}
                <strong>
                  {Math.round((wdata?.main?.temp_max - 273.15) * 100) / 100}°C
                </strong>
                , Min:{' '}
                <strong>
                  {Math.round((wdata?.main?.temp_min - 273.15) * 100) / 100}°C
                </strong>
              </p>
              {wdata?.weather?.map((data, index) => (
                <div className="d-flex flex-row align-items-center" key={index}>
                  <p className="mb-0 me-4">{capital_letter(data?.description)}</p>
                  <img
                    src={`https://openweathermap.org/img/w/${data?.icon}.png`}
                    alt={data?.main}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
