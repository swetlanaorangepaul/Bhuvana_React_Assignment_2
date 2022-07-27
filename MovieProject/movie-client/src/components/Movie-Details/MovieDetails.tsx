import React , {Component, useEffect, useState} from "react";
import { LoadingStatusTypes } from "../../models/LoadingStatusTypes";
import LoadingIndicator from "../common/LoadingIndicator";
import {Alert,Row,Col,Badge} from 'react-bootstrap';
import IMovie from '../../models/IMovies';
import {Link, Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
type Props ={
    movieProp: IMovie;
};

const MovieDetails = ({match, movieProp,location} : RouteComponentProps &  Props) => {
    const [ status ,setStatus] = useState<LoadingStatusTypes>('LOADING');
    const [ movie ,setMovie] = useState<IMovie | null>(null);
    const [ error ,setError] = useState<Error | null>(null);


    let el;
    useEffect(
        () => {
            const getRestaurantById = async () => {
                try{
                    setMovie( movieProp as IMovie);
                    setStatus('LOADED');
                }catch(error){
                    alert(" Error while getting Restaurant Details");
                }
            };
            getRestaurantById();
        }
    ,[]
    );

    switch(status){
        case 'LOADING':
            el = (
                <LoadingIndicator 
                size="large"
                message="We are fetching the movie details.. "
                />
            );
            break;
        case 'LOADED':
            const {
                id,
                title,
                year,
                genres,
                ratings,
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            }= movie as IMovie;
            let totalRating = ratings.reduce(
                (previousValue, currentValue, index)=> previousValue+currentValue, 
                0);
            el =(
                <>
                <Row>
                    <Col xs={12} className="my-2">
                        <Link to={`/`}>
                            <h6>BackToHome</h6>
                        </Link> 
                        <hr />
                    </Col>
                    <Col xs={12} lg={3} className="my-2">
                        <img src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`} 
                        alt={title}
                        className="w-100"
                        />
                    </Col>
                    <Col xs={12} lg={9} className="my-2">
                        <div className="my-10">
                            <h2>{title}</h2>
                            <br/>
                        </div>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Imdb Rating</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <span className="">{imdbRating}</span>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6  my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Content Rating </span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <span className="">{imdbRating}</span>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs- my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Average Rating</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <span className="">{`${Math.round(totalRating/ratings.length)}`}</span>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Duration</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <span className="">{duration}</span>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Genres</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <div>
                                    {
                                        genres?.map(
                                            genre => (
                                                <Badge bg="primary me-2"
                                                key={genre}>{genre}</Badge>
                                            )
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Actors</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <div>
                                    {
                                        actors?.map(
                                            actor => (
                                                <span key={actor} className="">{`${actor} | `}</span>
                                            )
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Release Date</span>
                            </Col>
                            <Col xs={9} lg={6}>
                                <span className="">{releaseDate}</span>
                            </Col>
                        </Row>
                        <Row xs={12} className="fs-6 my-3">
                            <Col xs={3} lg={3} >
                                <span className="">Story Line</span>
                            </Col>
                            <Col xs={9} lg={9}>
                                <span className="lg-9">{storyline}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
                </> 
            );
            break;
        case 'ERROR_LOADING':
            el =(
                <Alert key={"danger"} variant="danger my-5">
                {error?.message}
                </Alert>
            );
            break;
        Default:
            break;

    }
    return el;    
}
  
export default MovieDetails;