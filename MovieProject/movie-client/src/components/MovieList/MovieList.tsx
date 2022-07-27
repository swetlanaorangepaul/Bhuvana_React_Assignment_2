import React , {Component, useEffect} from "react";
import { LoadingStatusTypes } from "../../models/LoadingStatusTypes";
import LoadingIndicator from "../common/LoadingIndicator";
import {Alert,Row,Col, ToastContainer, Toast} from 'react-bootstrap';
import MovieListItem from './MovieListItem';
import {fetchMovieForType}  from '../../services/movies';
import IMovies from "../../models/IMovies";
import SearchContext from "../../context/SearchContext"
import DetailsContext from "../../context/DetailsContext";
import { RouteComponentProps } from "react-router-dom";
import ToastContext from "../../context/ToastContext";

type Props ={
    type : string
    favRemoved: string,
    respState:String,
    tMessage:string,
    showState:boolean

};

type State={
    status: LoadingStatusTypes,
    movies?: IMovies[],
    error?: Error
    favRemoved: string
};
class MovieList extends Component<{type: string,favRemoved:string,respState:string,tMessage:string,showState:boolean} & RouteComponentProps , State>{

    state: State ={
        status: 'LOADING',
        favRemoved: ''
    };
    //  new= () =>useEffect(
    //     () => {
    //         const updt =  () => {
    //             try{
                   
    //                console.log("Context updated from List Item ");
    //             }catch(error){
    //                 alert(" Error while getting Restaurant Details");
    //             }
    //         };
    //         updt();
    //     }
    // ,[this.props.favRemoved]
    // );

    componentDidUpdate(prevProps: { favRemoved: string; }, prevState: any){
        // console.log("componentDidUpdate Context updated from List Item " + prevProps.favRemoved + "--- " + this.props.favRemoved);
        if (prevProps.favRemoved !== this.props.favRemoved){
            this.getMovies();
        }
        // this.getMovies();

    }
    render() : React.ReactNode{
        return (
            <ToastContext.Consumer>{({
                responseState,updateResponseState,
                toastMessage,updateToastMessage,
                show,updateShow }) =>(
                    <SearchContext.Consumer>
                {({searchMovieName,updateSearchValueFun}) => (
                    <DetailsContext.Consumer>
                        {({movieDetails,updateMovieDetails,favMovieRemoved,updatefavMovieRemoved}) => {
                            const { status,movies,error} = this.state;
                             let el ;
                            //  console.log("after componentDidUpdate Context rerendered "+ movies?.length);
                             switch(status){
                                case 'LOADING':
                                        el = (
                                            <LoadingIndicator 
                                            size="large"
                                            message="We are fetching the list of restaurants.. "
                                            />
                                        );
                                        break;
                                    case 'LOADED':
                                        let filteredMovies=this.filterSearchedMovies(movies as IMovies[],searchMovieName);
                                        // console.log(`LOADED ${movies?.length} ${filteredMovies.length}`);
                                        el =(
                                            <>
                                            <Row xs={2} md={4} lg={6}>
                                                 { 
                                                    filteredMovies?.map(
                                                        (movie,index) => (
                                                            <Col key ={`${index}-${movie}`}  className="d-flex my-3">
                                                                <>
                                                                {/* {console.log(`Revord ${index} - ${movie?.title} `)} */}
                                                                <MovieListItem 
                                                                   {...this.props} movie={movie}/> </>
                                                            </Col>
                                                        )

                                                    )
                                                } 
                                            </Row>
                                            {
                                                responseState !== 'initial' && (
                                                    <ToastContainer className="p-3" position="top-end">
                                                    <Toast
                                                        bg={responseState == 'success' ? 'success' : (responseState == 'primary' ? 'primary' :(responseState == 'warning' ? 'warning' :'danger'))}
                                                        show={show}
                                                        autohide
                                                        delay={5000}
                                                        onClose= { () =>  updateShow(false)} >
                                                        <Toast.Header closeButton={false}>
                                                        {responseState == 'Error' ? 'Error' : 'Success'}
                                                        </Toast.Header>
                                                        <Toast.Body>{toastMessage}</Toast.Body>
                                                    </Toast>
                                                </ToastContainer>
                                                )
                                            }
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
                            //  el = (
                            //     <h2></h2>
                            //  );
                             return el;
                        }
                        }
                    </DetailsContext.Consumer>
                )}
            </SearchContext.Consumer>

            )}

            </ToastContext.Consumer>
            
        )
    }
    getMovies = async () => {
        const {movies} = this.state;
        const {type} = this.props;
        try{
            const data =  await fetchMovieForType(type);
            console.log("getMovies " + type + " Count "+ data.length);
            this.setState({
                movies: data,
                status: 'LOADED'
            });
            
        }catch(error){
            alert(" Error while getting Image Urls");
        }
    }

    filterSearchedMovies = ( data : IMovies[], searchValue :string): IMovies[] => {
        const searchedData = data.filter( movie => (movie.title.toUpperCase().includes(searchValue.toUpperCase()))) ;
        // console.log("filterSearchedMovies " + searchValue + " Length:" + searchedData.length);
        return searchedData;
    }

    componentDidMount() {
        this.getMovies();
    }
    
}

export default MovieList;