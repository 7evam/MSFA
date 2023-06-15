import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';

function useResetPassword(props) {
  const { makeRequest, isLoading } = useApi();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [readyToRender, setReadyToRender] = useState(false);
  const [resetCode, setResetCode] = useState(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const checkResetCode = async () => {
      const resetCodeFromParams = params.resetCode;
      if (!resetCodeFromParams) {
        setResetCode(null);
        return;
      }
      let res;
      try {
        res = await makeRequest({
          method: 'get',
          route: `/users/resetCode/${resetCodeFromParams}`,
        });
      } catch (e) {
        setReadyToRender(true);
      }
      setValues({
        ...values,
        email: res.body.email,
        name: res.body.name,
      });
      setResetCode(resetCodeFromParams);
      setReadyToRender(true);
    };
    checkResetCode();
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = async () => {
    if (values.email.length < 6) {
      toast.error('Email not valid');
      return;
    }
    if (values.password.length < 8) {
      toast.error('Please create a password with at least 8 characters');
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await makeRequest({
        method: 'post',
        route: '/users/resetPassword',
        data: {
          email: values.email,
          password: values.password,
        },
      });
      if (res.statusCode === 200) {
        toast.success('Your password has been reset, you may now log in with your new password');
        navigate('/');
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

  const goToAbout = () => {
    navigate('/about');
  };

  return {
    setValues,
    isLoading,
    readyToRender,
    handleReset,
    values,
    isLoading,
    handleChange,
    resetCode,
    goToAbout,
  };
}

export default useResetPassword;
