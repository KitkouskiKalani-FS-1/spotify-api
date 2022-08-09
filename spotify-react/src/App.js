import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const API_BASE = process.env.NODE_ENV ==='development'
  ? `http://localhost:3001`
  : process.env.REACT_APP_BASE_URL;

  useEffect(()=>{
    let ignore = false

    if(!ignore){
      getHome();
    }

    return()=>{
      ignore = true;
    }
  }, [])

  const getHome = async() =>{
    try{
      await fetch(`${API_BASE}/spotify`)
        .then(res => res.json())
        .then(data=>{
          setInfo(data)
          console.log(info.header)
        })
    } catch{
      setError(error|| "Unexpected Error")
    } finally{
      setLoading(false)
    }
  
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome</h2>
        {
          <h1>{info.header}</h1>
        }
      </header>
    </div>
  );
}

export default App;
