import { useEffect, useState } from 'react';
import {httpClient} from "../../../util/Api";
import {message} from "antd";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [mangers, setManger] = useState(null);
  const [error, setError] = useState('');
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    console.log("aaaaa");
    fetchStart();
    httpClient
      .post('login', user)
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
          localStorage.setItem('token', data.token);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          console.log("adasd");
          fetchError(data.message);
        }
      })
      .catch(function (error) {
        message.error(error.response.data.message);
        fetchError();
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post('register', user)
      .then(({ data }) => {
        if (data.status) {
          fetchSuccess();
          localStorage.setItem('token', data.token);
          httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.message);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post('logout')
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common['Authorization'] = '';
          localStorage.removeItem('token');
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get('me')
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          setAuthUser(data);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common['Authorization'] = '';
        // fetchError(error.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    httpClient
      .get('me')
      .then(({ data }) => {
        if (data) {
          setAuthUser(data);
        }
        setLoadingUser(false);
      })
      .catch(function () {
        localStorage.removeItem('token');
        httpClient.defaults.headers.common['Authorization'] = '';
        setLoadingUser(false);
      });
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
