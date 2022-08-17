import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import axios from "axios"

function Dashboard({code}) {
  const [info, setInfo] = useState(null)
  const [accessToken, setAccessToken] = useState()
  const [refreashToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState("");


  let ignore = false;
  useEffect(()=>{
    if(!ignore){
        axios.post('http://localhost:3001/spotify/v1/auth', {
        code
        }).then(res =>{
            console.log(res.data)
        }).catch(()=>{
            window.location ='/'
        })
    }
    return()=>{
    ignore = true;
    }
    
  }, [code])

  
  return (
    <div className="App">
      <Container>
        <div>{code}</div>
        <InputGroup>
          <FormControl
            placeholder="Search Spotify"
            type="input"
            onKeyPress={e => {
              if(e.key=="Enter"){
                console.log("Search Spotify")
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />

        </InputGroup>
      </Container>
    </div>
  );
}

export default Dashboard;
