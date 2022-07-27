import { string } from "prop-types";
import React, { createContext } from "react";
import IMovies from "../models/IMovies";

let contextObj ={
    movieDetails : Object(null),
    updateMovieDetails : (movie:IMovies) => {},
    favMovieRemoved : '',
    updatefavMovieRemoved : (movieName:string) => {}
}

const DetailsContext = createContext( contextObj);

export default DetailsContext;