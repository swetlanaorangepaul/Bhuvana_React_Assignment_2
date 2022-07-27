import React, { useContext, useEffect, useState } from "react";
import IMovies from "../../models/IMovies"; 
import {Card } from 'react-bootstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faHeart} from  '@fortawesome/free-solid-svg-icons';
import { Link, Redirect, Route, RouteComponentProps } from "react-router-dom";
import MovieDetails from "../Movie-Details/MovieDetails";
import DetailsContext from "../../context/DetailsContext";
import SearchContext from "../../context/SearchContext";
import { addMovieToFavorite,removeFromFavorite} from "../../services/movies";
import ToastContext from "../../context/ToastContext";

type Props ={
    movie: IMovies,
    type: string 
};

const MovieListItem = ({movie,match,type,history} : RouteComponentProps & Props ) => {
    const {
        id,
        title,
        storyline,
        ratings,
        contentRating,
        poster
    } = movie;

    const [ showDetails ,setShowDetails] = useState<boolean>(false);
    const [ refreshRemoved ,setrefreshRemoved] = useState<boolean>(false);
    const [ refreshToastA ,setRefreshToastA] = useState<boolean>(false);
    const [ refreshToastB ,setRefreshToastB] = useState<boolean>(false);

    const {searchMovieName,updateSearchValueFun} = useContext(SearchContext);
    const {movieDetails,updateMovieDetails,favMovieRemoved,updatefavMovieRemoved} = useContext(DetailsContext);

    const {responseState,updateResponseState,toastMessage,updateToastMessage,show,updateShow} = useContext(ToastContext);


    // let initialRender=true;
    // useEffect(() => {
    //     if(initialRender){
    //         initialRender=false;
    //     } else{
    //         updatefavMovieRemoved(movie.title);
    //         console.log("Context updated " + favMovieRemoved);
    //     }
    // }, [refreshRemoved]);

     useEffect(
        () => {
            const updt =  () => {
                try{
                    if (refreshRemoved){
                        updatefavMovieRemoved(movie.title);
                        setrefreshRemoved(false);

                        updateResponseState('primary');
                        updateToastMessage(`Movie ${movie.title} has been removed successfully`);
                        updateShow(true);
                    }   

                    if (refreshToastA){
                        updateResponseState('success');
                        updateToastMessage(`Movie ${movie.title} has been added successfully`);
                        updateShow(true);
                        setRefreshToastA(false);
                    }

                    if (refreshToastB){
                        updateResponseState('warning');
                        updateToastMessage(`Movie ${movie.title} has been already added`);
                        updateShow(true);
                        setRefreshToastA(false);
                    }
                   
                   console.log("UseEffect. Context:" + favMovieRemoved + " , refreshRemoved "+ refreshRemoved);
                }catch(error){
                    alert(" Error while getting Restaurant Details");
                }
            };
            updt();
        }
    ,[refreshRemoved,refreshToastA,refreshToastB]
    );
    const addToFavouritesList =async (event: any) => {
        event.preventDefault();

        const result: boolean = await addMovieToFavorite (movie);
        if ( result) {
            console.info( movie.title + " is added ");
            setRefreshToastA(true);
        }else{
            console.info( movie.title + " is already added ");
            setRefreshToastB(true);
        }

    }

    const removeFavouritesList =async (event: any) => {

        const movieId:string = movie.id == undefined? "1": movie.id;
        try{
            const movieDeleted = await removeFromFavorite ("favourit",movieId);
            if ( movieDeleted) {
                console.log("********************");
                console.info( movie.title + " is removed ");
                // updatefavMovieRemoved(movie.title);
                setrefreshRemoved(true);
                console.info(" refreshRemoved " + refreshRemoved);
                console.info(" Context favMovieRemoved " + favMovieRemoved);
                console.log("********************");
            }

            
        }catch(error){
            console.log(error);
        }
    }
    const routedetails = ( ) =>{
        // event.prevent.default();
        setShowDetails(true);
        console.log("routedetails link clicked ");
        updateMovieDetails(movie);
        console.log("routedetails updateMovieDetails " + movie.title);
        console.log("state updateMovieDetails " + movieDetails.title);

    }
    return (<>
{/* 
        {
            refreshRemoved && (
                <>

                    <Redirect to = './favourit' /></>
            )
        } */}

        {
            showDetails &&  (
                <Route
                            path={match.path}
                            render={( props : RouteComponentProps ) => <MovieDetails {...props} movieProp={movie} />}
                            exact
                        />
            )
        }

        {
            !showDetails &&  (
                <Card style={{ width: '20rem',height: '23rem' }}>
            {/* <Link to={`/moviesDetails`}> */}
                <Link to ={
                    {
                        pathname:"/moviesDetails",
                        state: {
                            clickedMovie: movie}
                    }
                }>
                <Card.Img 
                style={{ width: '20rem',height: '18rem' }}
                className="w-100"
                variant="top" src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`} 
                onClick={routedetails}/>
            </Link>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div className="text-md">
                        {title}
                    </div>
                </Card.Title>
                {
                    type !== 'favourit' && (
                        <Link to={match.url}
                        onClick={addToFavouritesList}>
                    <Card.Text className="text-sm d-flex justify-content-center">
                    <span className="me-2">Add to Favorites</span>
                    <span><FontAwesomeIcon icon={faHeart} className="me-2" style={{ color: 'red'}}/></span>
                </Card.Text> 
                </Link>
                    )
                }

                {
                    type == 'favourit' && (
                        <Link to={match.path}
                        onClick={removeFavouritesList}>
                    <Card.Text className="text-sm d-flex justify-content-center">
                    <span className="me-2">Remove Favorites</span>
                    <span><FontAwesomeIcon icon={faHeart} className="me-2" style={{ color: 'red'}}/></span>
                </Card.Text> 
                </Link>
                    )
                }
            </Card.Body>
        </Card>
            )
        }
        
    </>);


}

export default MovieListItem;