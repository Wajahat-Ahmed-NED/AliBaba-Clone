import React, { createContext , useContext, useReducer } from "react";
//prepares the data layyer
export const StateContext = createContext();
//WRAP OUR APP AND PROVIDE THE DATA LAYER
export const StateProvider = ({ reducer , initialState , children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
// PULL INFORMATION FROM THE DATA lAYER
export const useStateValue = () => useContext(StateContext);