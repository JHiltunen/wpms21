import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../utils/http';
import {appID, baseUrl} from '../utils/variables';

const useMedia = (ownFiles) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
      // console.log('useMedia useEffect', mediaArray);
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      let mediaWithoutThumbnail = await useTag().getFilesByTag(appID);

      if (ownFiles) {
        mediaWithoutThumbnail = mediaWithoutThumbnail.filter(
          (item) => item.user_id === user.user_id
        );
      }

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

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token,
        },
        data: formData,
      };
      const result = await axios(baseUrl + 'media', options);
      return result.data;
    } catch (e) {
      console.log('uploadMedia error', e.message);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyMedia = async (data, token, id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('modifyMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e.message);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    mediaArray,
    loading,
    loadSingleMedia,
    loadMedia,
    uploadMedia,
    modifyMedia,
    deleteMedia,
  };
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

  const getUserInfo = async (userid, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/' + userid, options);
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
  return {checkToken, getUserInfo, register, checkUsernameAvailable};
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

  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({file_id, tag}),
    };

    try {
      const tagInfo = await doFetch(baseUrl + 'tags', options);
      return tagInfo;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {getFilesByTag, addTag};
};

const useFavourites = () => {
  const addFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token, 'Content-type': 'application/json'},
      body: JSON.stringify({
        file_id: fileId,
      }),
    };

    try {
      const addFavourite = await doFetch(baseUrl + 'favourites', options);
      console.log('Body: ', options.body);
      return addFavourite;
    } catch (e) {
      console.log('addFavourite error', e.message);
    }
  };

  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {'x-access-token': token},
    };
    try {
      const deleteFavourite = await doFetch(
        baseUrl + 'favourites/file/' + fileId,
        options
      );
      return deleteFavourite;
    } catch (error) {
      console.log('deleteFavourite error', error);
    }
  };

  const getFavouritesByFileId = async (fileId) => {
    const options = {
      method: 'GET',
    };
    try {
      const favouritesByFileId = await doFetch(
        baseUrl + 'favourites/file/' + fileId,
        options
      );
      return favouritesByFileId;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const getMyFavourites = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const myFavourites = await doFetch(baseUrl + 'favourites', options);
      return myFavourites;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  return {
    addFavourite,
    deleteFavourite,
    getFavouritesByFileId,
    getMyFavourites,
  };
};

export {useMedia, useLogin, useUser, useTag, useFavourites};
