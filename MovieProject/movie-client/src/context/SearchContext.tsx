import { string } from "prop-types";
import React, { createContext } from "react";

const contextObj ={
    searchMovieName : '',
    updateSearchValueFun : (newSearchValue:string) => {}
}

const SearchContext = createContext( contextObj);

export default SearchContext;