import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const mediaWithoutThumbnail = await doFetch(baseUrl + 'media');
      const allFiles = mediaWithoutThumbnail.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(allFiles);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const file = await doFetch(baseUrl + 'media/' + id);
      return file;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('login error', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const userNameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return userNameInfo.available;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      const json = await response.json();
      return json;
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return false;
    }
  };
  return {checkToken, register, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const file = await doFetch(baseUrl + 'tags/' + tag);
      return file;
    } catch (e) {
      console.log('getFilesByTag', e.message);
      return {};
    }
  };

  return {getFilesByTag};
};

export {useMedia, useLogin, useUser, useTag};
