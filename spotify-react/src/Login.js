import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsSpotify } from 'react-icons/bs';




export default function Login() {
  return (
    <Container
      className="flex container-fluid justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor:"black" }}>
        <Row>
        <Navbar className="flex" style={styles.nav}>
                <Col className="col-1">
                    <BsSpotify style={styles.icon}/>
                </Col>
            </Navbar>
        </Row>
        <Row style={{marginTop:"200px"}} className="justify-content-center">
            <Col className="col-1">
                <BsSpotify style={styles.lgIcon} size="lg"/> 
            </Col>
                
        </Row>
        <Row className="justify-content-center">
            <Col className="col-3">
                <div style={{fontSize:"24px", display:"inline-block", marginLeft:"75px"}}>Please, Sign In</div>
            </Col>
            
        </Row>
        <Row className="flex justify-content-center">
            <Col className="col-3">
                <a className="btn btn-success btn-lg" style={styles.login} href="http://localhost:3001/spotify/v1/login">
                    Sign In
                </a> 
            </Col>
            
        </Row>
    </Container>
  )
}
const styles = {
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