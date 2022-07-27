import React, { useCallback, useState } from 'react';
import { Route ,RouteComponentProps,Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavigationMenu from './NavigationMenu';
import IMovies from '../models/IMovies';
import MovieList from './MovieList/MovieList';
import SearchContext from "../context/SearchContext";
import MovieDetails from './Movie-Details/MovieDetails';
import DetailsContext from '../context/DetailsContext';
import ToastContext from '../context/ToastContext';

const App = () => {
  const [searchMovieName, setSearchMovieName] = useState<string>('');
  const updateSearchValueFun =useCallback( (newSearchValue: React.SetStateAction<string>) => {setSearchMovieName( newSearchValue )},[setSearchMovieName] );

  const [movieDetails, setMovieDetails] = useState<IMovies | null>(null);
  const updateMovieDetails =useCallback( (movie: React.SetStateAction<IMovies>) => {setMovieDetails( movie as IMovies)},[setMovieDetails] );

  const [favMovieRemoved, setfavMovieRemoved] = useState<string | ''>('');
  const updatefavMovieRemoved =useCallback( (movieName: React.SetStateAction<string>) => {setfavMovieRemoved( movieName)},[setfavMovieRemoved] );

  const [responseState, setresponseState] = useState<string | ''>('');
  const updateResponseState =useCallback( (str: React.SetStateAction<string>) => {setresponseState( str)},[setresponseState] );
  const [toastMessage, settoastMessage] = useState<string | ''>('');
  const updateToastMessage =useCallback( (str: React.SetStateAction<string>) => {settoastMessage( str)},[settoastMessage] );
  const [show, setshow] = useState<boolean>(false);
  const updateShow =useCallback( (str: React.SetStateAction<boolean>) => {setshow( str)},[setshow] );

    return(
        <>
          <ToastContext.Provider value={{responseState,updateResponseState,toastMessage,updateToastMessage,show,updateShow}}>
            <SearchContext.Provider value={{searchMovieName,updateSearchValueFun}}>
              <DetailsContext.Provider value={{movieDetails,updateMovieDetails,favMovieRemoved,updatefavMovieRemoved}}>
                <NavigationMenu />
                <Container>

                  <Route 
                                  path="/"
                                  render={( props : RouteComponentProps ) => <MovieList {...props} 
                                  type="movies-in-theaters"  favRemoved={favMovieRemoved}
                                  respState={responseState} tMessage={toastMessage} showState={show}/>}
                                  exact
                              />
                  <Route 
                                  path="/movies-coming"
                                  render={( props : RouteComponentProps ) => <MovieList {...props} 
                                  type="movies-coming"  favRemoved={favMovieRemoved}
                                  respState={responseState} tMessage={toastMessage} showState={show}/>}
                                  exact
                              />

                  <Route 
                                  path="/top-rated-india"
                                  render={( props : RouteComponentProps ) => <MovieList {...props} 
                                  type="top-rated-india"  favRemoved={favMovieRemoved}
                                  respState={responseState} tMessage={toastMessage} showState={show}/>}
                                  exact
                              />

                  <Route 
                                  path="/top-rated-movies"
                                  render={( props : RouteComponentProps ) => <MovieList {...props} 
                                  type="top-rated-movies"  favRemoved={favMovieRemoved}
                                  respState={responseState} tMessage={toastMessage} showState={show}/>}
                                  exact
                              />
                  <Route 
                                  path="/favourit"
                                  render={( props : RouteComponentProps ) => <MovieList {...props} 
                                  type="favourit" favRemoved={favMovieRemoved}
                                  respState={responseState} tMessage={toastMessage} showState={show}/>}
                                  exact
                              />

                  <DetailsContext.Consumer>{
                      ( {movieDetails,updateMovieDetails} ) => (
                        <Route
                                  path="/moviesDetails"
                                  render={( props : RouteComponentProps ) => <MovieDetails {...props} movieProp={movieDetails as IMovies} />}
                                  exact
                        />                      
                      )
                    }
                  </DetailsContext.Consumer>
                </Container>
              </DetailsContext.Provider>
            </SearchContext.Provider>
          </ToastContext.Provider>
        </>
    );
};

export default App;