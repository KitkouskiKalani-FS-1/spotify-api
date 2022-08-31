import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import { BsSpotify } from 'react-icons/bs';

function Dashboard({code}) {
  const [info, setInfo] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState("");
  const [resultAlbums, setResultAlbums] = useState([]);
  const [resultPlaylists, setResultPlaylists] = useState([]);
  const [resultArtists, setResultArtists] = useState([]);

  let ignore = false;
//   const searchSpotify =() =>{
    
//     if(!accessToken){
//         console.log("No valid access token stored")
//         //call refresh token
//     }
//     else{
//         axios.post('http://localhost:3001/spotify/v1/search', {
//         searchInput,
//         accessToken
//         }).then(data =>{
//             console.log(data)
//             setResultAlbums(data.data.albums.items.map(album=>{
//                 console.log(album)
//                 setResultAlbums([...resultAlbums, album])
//             }))
//             // setResultAlbums([data.data.albums])
//             console.log(resultAlbums)
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }
//   }

  useEffect(()=>{
    if (!searchInput) return
    if (!accessToken) return

    let cancel = false
    axios.post('http://localhost:3001/spotify/v1/search', {
        searchInput,
        accessToken
        }).then(data =>{
            if (cancel) return
            setResultAlbums(data.data.albums.items.map(album=>{
                return album
            }))
            setResultPlaylists(data.data.playlists.items.map(playlist=>{
                return playlist
            }))
            setResultArtists(data.data.artists.items.map(artist=>{
                return artist
            }))
            console.log(resultAlbums)
            console.log(resultPlaylists)
        }).catch((err)=>{
            console.log(err)
        })
  }, [searchInput, accessToken])
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
      <Container 
        className="d-flex flex-column py-2"
        style={{height:"150vh"}}>
        <Row>
        <Navbar className="flex" style={styles.nav}>
                <Col className="col-1">
                    <BsSpotify style={styles.icon}/>
                </Col>
                <Col style={{marginLeft:"20px"}} className="col-10">
                    <InputGroup>
                        <FormControl
                            
                            placeholder="Search Spotify"
                            type="input"
                            onChange={e => setSearchInput(e.target.value)}
                        />

                    </InputGroup>
                </Col>
            </Navbar>
        </Row>
        
        <Row className="listing py-2">
        <Col>
            <div style={{textAlign: "center"}}>Albums</div>
        </Col>
        {resultAlbums.map(album =>{
            return(
            <Col>
                <a target="_blank" href={album.external_urls.spotify}>
                <Card className="bg-dark text-white">
                <Card.Img src={album.images[0].url} alt="Spotify background image" />
                <Card.ImgOverlay>
                <Card.Title>{album.name}</Card.Title>
                </Card.ImgOverlay>
                </Card>
                </a>
            </Col>
            )
        })}
        </Row>

        {/*  */}

        <Row className="listing py-2">
        <Col>
            <div style={{textAlign: "center"}}>Playlists</div>
        </Col>
        {resultPlaylists.map(playlist =>{
            return(
            <Col>
                <a href="#">
                <Card className="bg-dark text-white">
                <Card.Img src={playlist.images[0].url} alt="Spotify background image" />
                <Card.ImgOverlay>
                <Card.Title>{playlist.name}</Card.Title>
                </Card.ImgOverlay>
                </Card>
                </a>
            </Col>
            )
        })}
        </Row>

        {/*  */}

        <Row className="listing py-2">
        <Col>
            <div style={{textAlign: "center"}}>Artists</div>
        </Col>
        {resultArtists.map(artist =>{
            return(
            <Col>
                <a href="#">
                    <Card className="bg-dark text-white">
                    <Card.Img src={artist.images[0].url} alt="Spotify background image" />
                    <Card.ImgOverlay>
                    <Card.Title>{artist.name}</Card.Title>
                    </Card.ImgOverlay>
                    </Card>
                </a>
            </Col>
            )
        })}
        </Row>
      </Container>
    </div>
  );
}

const   styles={
    nav:{
        justifyContent:"left",
        backgroundColor:"#1DB954",
        borderRadius:"10px",
        height:50
    },
    login:{
        backgroundColor:"#1DB954",
        width:"100%",
        borderRadius:"30px",
        marginTop:"40px",
        margin:"0 auto"

    },
    icon:{
        marginLeft:"5px",
        height:"40px",
        width:"40px",
    },
    lgIcon:{
        color:"#1DB954",
    }
}

export default Dashboard;
