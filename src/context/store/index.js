import React,{useReducer} from 'react'
import {Loader} from '../reducers'


export const Store = React.createContext()

const dispatch = {};

export function StoreProvider(props){
    // * ALL REDUCER

    const [mapLoaderState,dispatchLoaderAction] = useReducer(Loader,dispatch);

    //  * VALUE OF ALL REDUCERS
    const loaderValue = {mapLoaderState,dispatchLoaderAction};

    //  * COMBINE ALL VALUES

    const value = {
        ...loaderValue
    };

    //* STORE
return <Store.Provider value={value}>{
    props.children}</Store.Provider>
}