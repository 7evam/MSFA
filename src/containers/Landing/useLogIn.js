import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';

function useLogIn() {
  const { makeRequest, isLoading } = useApi();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [registerValues, setRegisterValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [entryModeLogIn, setEntryModeLogIn] = useState(true);

  const handleLogIn = async () => {
    if (values.email.length < 6) {
      toast.error('Please input a valid email');
      return;
    }
    if (values.password.length < 8) {
      toast.error('Please create a password with at least 8 characters');
      return;
    }
    try {
      const res = await makeRequest({
        method: 'post',
        route: '/users/login',
        data: {
          email: values.email,
          password: values.password,
        },
      });
      if (res.statusCode === 200) {
        const userInfo = res.body;
        const currentOrg = userInfo.organizations.find((org) => org.current === 1);
        dispatch({
          type: 'LOGIN',
          payload: {
            currentOrg,
            name: userInfo.name,
            email: userInfo.email,
            organizations: userInfo.organizations,
            userToken: userInfo.userToken,
          },
        });
        dispatch({
          type: 'SET_SELECTED_YEAR',
          payload: {
            selectedYear: Math.min(...Object.keys(currentOrg.activeYears)),
          },
        });
        history.push('/');
      } else if (res.message) {
        throw res.message;
      } else {
        console.error(res);
        throw 'Malformed response';
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async () => {
    if (registerValues.email.length < 6) {
      toast.error('Please input a valid email');
    }
    if (registerValues.password.length < 8) {
      toast.error('Please create a password with at least 8 characters');
    }
    if (registerValues.password !== registerValues.confirmPassword) {
      toast.error('Passwords do not match');
    }
    try {
      const res = await makeRequest({
        method: 'post',
        route: '/users',
        data: {
          email: registerValues.email,
          password: registerValues.password,
        },
      });
      if (res.statusCode === 200) {
        toast.success('Your password has been created, you may now log in');
        // const userInfo = JSON.parse(res.body);
        // dispatch({
        //   type: "LOGIN",
        //   payload: {
        //     name: userInfo.name,
        //     email: userInfo.email,
        //     organizations: userInfo.organizations,
        //     userToken: userInfo.userToken
        //   }
        // });
        // history.push("/");
      } else if (res.message) {
        toast.error(res.message);
        throw res.message;
      } else {
        console.error(res);
        throw 'Malformed response';
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e, type) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e, type) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value,
    });
  };

  const goToAbout = () => {
    history.push('/about');
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
    setEntryModeLogIn,
    goToAbout,
  };
}

export default useLogIn;
