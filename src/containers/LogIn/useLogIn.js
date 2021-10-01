import React, {useState} from 'react';
import useApi from '../../hooks/useApi'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";


function useLogIn() {

    const {makeRequest, isLoading} =  useApi()
    const history = useHistory()
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleLogIn = async  () => {
        try{
            var res = await makeRequest({
                method: "post",
                route: "/users/login",
                data:  {
                    email: values.email,
                    password:  values.password
                }
              });
              if(res.statusCode === 200){
                  console.log(res)
                  const userInfo = JSON.parse(res.body)
                dispatch({
                    type: "LOGIN",
                    payload: {
                      firstName: userInfo.first_name,
                      lastName: userInfo.last_name,
                      email: userInfo.email,
                      organizations: userInfo.organizations,
                      userToken: userInfo.userToken
                    }
                  });
                  history.push('/')
              } else if(res.message) {
                  throw (res.message)
              } else {
                  console.error(res)
                  throw 'Malformed response'
              }
        } catch (e){
            console.error(e)
        }
        
    }

    const handleChange = (e, type) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

  return {
    handleLogIn,
    values,
    handleChange,
    isLoading
  }
}

export default useLogIn
