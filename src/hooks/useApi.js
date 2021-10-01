import React, { useState } from "react";
import {useSelector} from 'react-redux'
import axios from 'axios'

// this is a hook that exports a function that can eventually 
// be configured to call any api with any data or any headers
// while giving a real time update on loading status

export default function useApi() {
   const [isLoading, setIsLoading] = useState(false);

   const {userToken} = useSelector(state => ({
        ...state.authReducer
    }));

   const roflApi = axios.create({
        baseURL: process.env.ROFL_API_BASE_URL,
    });
    
    if(userToken){
        roflApi.defaults.headers.common['userToken'] = userToken
    }

    const makeRequest = async ({method, route, data = null, continueLoading = false, suppressIsLoading = false}) => {
        if(!suppressIsLoading) setIsLoading(true)
        console.log('in  use  Api')
        try {
            return roflApi[method](route, data)
                .then(res => {
                    return res.data
                })
                .catch((e) => {
                    /**
                     * @TODO add logout on 401
                     */ 
                    throw e;
                })
                .finally(() => {
                    if(!continueLoading){
                        setIsLoading(false);
                    }
                });
        } catch(err) { 
            return err
        }
    }

    const stopLoading = () => {
        setIsLoading(false)
    }

   return { makeRequest, isLoading, stopLoading };
}