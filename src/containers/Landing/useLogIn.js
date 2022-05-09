import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function useLogIn() {
  const { makeRequest, isLoading } = useApi();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [registerValues, setRegisterValues] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [entryModeLogIn, setEntryModeLogIn] = useState(true)

  const handleLogIn = async () => {
    try {
      var res = await makeRequest({
        method: "post",
        route: "/users/login",
        data: {
          email: values.email,
          password: values.password
        }
      });
      if (res.statusCode === 200) {
        console.log(res);
        const userInfo = JSON.parse(res.body);
        console.log('here is user info')
        console.log(userInfo)
        dispatch({
          type: "LOGIN",
          payload: {
            name: userInfo.name,
            email: userInfo.email,
            organizations: userInfo.organizations,
            userToken: userInfo.userToken
          }
        });
        history.push("/");
      } else if (res.message) {
        throw res.message;
      } else {
        console.error(res);
        throw "Malformed response";
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async () => {
    if(registerValues.password.length < 8){
      toast.error('Please create a password with at least 8 characters')
    }
    if(registerValues.password !== registerValues.confirmPassword){
      toast.error('Passwords do not match')
    }
    try {
      var res = await makeRequest({
        method: "post",
        route: "/users",
        data: {
          email: registerValues.email,
          password: registerValues.password
        }
      });
      if (res.statusCode === 200) {
        const userInfo = JSON.parse(res.body);
        dispatch({
          type: "LOGIN",
          payload: {
            name: userInfo.name,
            email: userInfo.email,
            organizations: userInfo.organizations,
            userToken: userInfo.userToken
          }
        });
        history.push("/");
      } else if (res.message) {
        toast.error(res.message)
        throw res.message;
      } else {
        console.error(res);
        throw "Malformed response";
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleChange = (e, type) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e, type) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value
    });
  };

  return {
    handleLogIn,
      handleChange,
      values,
      registerValues,
      handleRegisterChange,
      handleRegister,
      isLoading,
      entryModeLogIn,
      setEntryModeLogIn
  };
}

export default useLogIn;
