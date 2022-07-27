import axios from 'axios';
import IMovieItem from '../models/IMovies';

// JSON Server:
//   http://localhost:3002/movies-coming
//   http://localhost:3002/movies-in-theaters
//   http://localhost:3002/top-rated-india
//   http://localhost:3002/top-rated-movies
//   http://localhost:3002/favourit

const fetchMovieForType = (type : string) => {
  return axios.get<IMovieItem[]>(`${process.env.REACT_APP_API_BASE_URL}/${type}`)
    .then(response => response.data)  
};

const addMovieToFavorite =async ( newFavMov: IMovieItem):Promise<boolean> => {
  let movieAdded =false;
  let favMovies:IMovieItem[] ;
  let favMoviesFil:IMovieItem[] ;
  try{
    favMovies = await fetchMovieForType ("favourit");
    favMoviesFil= favMovies.filter( movie => ( movie.title === newFavMov.title))
    if (favMoviesFil.length > 0){
      console.log("Movie already in favourite list");
    }else{
      console.log("Movie NOT in favourite list");
      try{
        const favMovieAdded = await addMovie("favourit",newFavMov);
        movieAdded=true;
        console.log("Movie ADDED to favourite list" + favMovieAdded.title);
      }catch(error){
        console.log(error);
      }
    }
  }catch(error){
    console.log(error);
  }
  return movieAdded;
}
const addMovie = (type : string, movieItem : Omit<IMovieItem, 'id'>) => {
  return axios.post<IMovieItem>(`${process.env.REACT_APP_API_BASE_URL}/${type}`,
  movieItem,
    {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)  
};

const removeFromFavorite = (type : string, movieItemId : string) => {
  return axios.delete<IMovieItem>(`${process.env.REACT_APP_API_BASE_URL}/${type}/${movieItemId}`,
    {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)  
};

export  {
    fetchMovieForType,
    addMovieToFavorite,
    removeFromFavorite
};