import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';

function useResetPassword(props) {
  const { makeRequest, isLoading } = useApi();
  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [readyToRender, setReadyToRender] = useState(false);
  const [resetCode, setResetCode] = useState(null);

  useEffect(() => {
    const checkResetCode = async () => {
      console.log('in nested function');
      console.log(props);
      const resetCodeFromParams = props.match.params.resetCode;
      console.log('from params');
      console.log(resetCodeFromParams);
      if (!resetCodeFromParams) {
        setResetCode(null);
        return;
      }
      const res = await makeRequest({
        method: 'get',
        route: `/users/resetCode/${resetCodeFromParams}`,
      });
      console.log('here is res');
      console.log(res);
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

  const goToAbout = () => {
    history.push('/about');
  };

  const handleReset = async () => {
    try {
      const res = await makeRequest({
        method: 'post',
        route: '/users/resetPassword',
        data: {
          email: values.resetEmail,
        },
      });
      console.log('here is res');
      console.log(res);
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
    setValues,
    isLoading,
    readyToRender,
    handleReset,
    values,
    isLoading,
    handleChange,
    goToAbout,
    resetCode,
  };
}

export default useResetPassword;
