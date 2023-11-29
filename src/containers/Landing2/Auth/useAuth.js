import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';

function useAuth() {
  const { makeRequest, isLoading } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
    resetEmail: '',
  });

  const [registerValues, setRegisterValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    resetEmail: '',
  });

  const [display, setDisplay] = useState('login');

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

        // TODO this ccurrently sets default year on logiin to lastest year, it should
        // be most recently used year which is saved in database
        dispatch({
          type: 'SET_SELECTED_YEAR',
          payload: {
            selectedYear: Math.max(...Object.keys(currentOrg.activeYears)),
          },
        });

        navigate('/squad');
        navigate(0);
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
        toast.success('Your account has been successfully created');
        const userInfo = JSON.parse(res.body);
        const currentOrg = userInfo.organizations[0];
        dispatch({
          type: 'LOGIN',
          payload: {
            currentOrg: userInfo.organizations[0],
            name: userInfo.name,
            email: userInfo.email,
            organizations: userInfo.organizations,
            userToken: userInfo.userToken,
          },
        });
        // TODO this ccurrently sets default year on logiin to lastest year, it should
        // be most recently used year which is saved in database
        dispatch({
          type: 'SET_SELECTED_YEAR',
          payload: {
            selectedYear: Math.max(...Object.keys(currentOrg.activeYears)),
          },
        });

        navigate('/squad');
        navigate(0);
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
    navigate('/about');
    navigate(0);
  };

  const handleReset = async () => {
    try {
      const res = await makeRequest({
        method: 'post',
        route: '/users/reset',
        data: {
          email: values.resetEmail,
        },
      });
      if (res.statusCode === 200) {
        toast.success('A reset link has been sent to your email');
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

  return {
    handleLogIn,
    handleChange,
    values,
    registerValues,
    handleRegisterChange,
    handleRegister,
    display,
    setDisplay,
    goToAbout,
    handleReset,
    setValues,
    isLoading,
  };
}

export default useAuth;
