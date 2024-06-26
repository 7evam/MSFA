import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// this is a hook that exports a function that can eventually
// be configured to call any api with any data or any headers
// while giving a real time update on loading status

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  const { userToken } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const roflApi = axios.create({
    baseURL: process.env.ROFL_API_BASE_URL,
  });

  if (userToken) {
    roflApi.defaults.headers.common.userToken = userToken;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const makeRequest = async ({
    method, route, data = null, continueLoading = false, suppressIsLoading = false, abort = null,
  }) => {
    if (!suppressIsLoading) setIsLoading(true);
    try {
      return roflApi[method](route, data, { signal: abort })
        .then((res) => {
          if (res.data?.statusCode) {
            return res.data;
          }
          return {
            statusCode: res.status,
            body: res.data,
          };
        })
        .catch((e) => {
          const errorMessage = e.response?.data?.message ? e.response.data.message : e.response?.data ? e.response.data : 'Your request could not be completed';
          /**
          * @TODO replace logout on 401
          * with refresh token process
          */
          if (typeof errorMessage === 'string' && errorMessage.includes('Unauthorized')) {
            dispatch({
              type: 'LOGOUT',
            });
            navigate('/login');
          } else {
            toast.error(errorMessage);
          }
          throw e;
        })
        .finally(() => {
          if (!continueLoading) {
            setIsLoading(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return { makeRequest, isLoading, stopLoading };
}
