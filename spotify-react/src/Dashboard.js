import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import axios from "axios";

function Dashboard({code}) {
  const [info, setInfo] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let ignore = false;
  const searchSpotify =() =>{
    
    if(!accessToken){
        console.log("No valid access token stored")
        //call refresh token
    }
    else{
        axios.post('http://localhost:3001/spotify/v1/search', {
        searchInput
        }).then(data =>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  }
  useEffect(()=>{
    if(!ignore){
        axios.post('http://localhost:3001/spotify/v1/auth', {
        code
        }).then(res =>{
            setAccessToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            setExpiresIn(res.data.expires_in)
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
        <InputGroup>
          <FormControl
            placeholder="Search Spotify"
            type="input"
            onKeyPress={e => {
              if(e.key=="Enter"){
                searchSpotify()
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
