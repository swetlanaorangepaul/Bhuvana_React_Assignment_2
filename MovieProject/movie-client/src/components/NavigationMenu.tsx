import React, { createRef, useContext } from "react";
import { Navbar,Nav, Container, FormControl, Form, Button } from "react-bootstrap";
import { faFilm, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import MovieContext from "../context/SearchContext";


const NavigationMenu = () => {
    const inputRef = createRef<HTMLInputElement>();
    const {searchMovieName,updateSearchValueFun} = useContext(MovieContext);

    const updateSearchValueFunLocal= (event: React.ChangeEvent<HTMLInputElement>) =>{
        updateSearchValueFun(event.target.value);
    
    }
    return (
        <><Navbar bg="light" variant ="light" expand="lg" >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to={"/" } as={NavLink}>
                            <FontAwesomeIcon
                                icon={faFilm}
                                className="me-4" />
                            <span className="navigationBar">Movies in Theaters</span>
                            <span className="navigationBarLine"></span>
                        </Nav.Link>
                        <Nav.Link to="/movies-coming" as={NavLink}><span className="navigationBar">Comming Soon</span></Nav.Link>
                        <Nav.Link to="/top-rated-india" as={NavLink}><span className="navigationBar">Top Rated Indian</span></Nav.Link>
                        <Nav.Link to="/top-rated-movies" as={NavLink}><span className="navigationBar">Top Rated Movies</span></Nav.Link>
                        <Nav.Link to="/favourit" as={NavLink}><span className="navigationBar">Favorites</span></Nav.Link>
                    </Nav>
              <input
                type="search"
                placeholder="Search Movie"
                className="searchInput me-2"
                aria-label="Search"
                onChange={updateSearchValueFunLocal}
                ref={inputRef}
              />
                </Navbar.Collapse>
            </Container>
        </Navbar><hr style={{ marginTop: '0'}}/></>
    );
};


export default NavigationMenu;