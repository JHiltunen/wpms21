import {useState} from 'react';
import {useUser} from './ApiHooks';

const useSignUpForm = (callback) => {
  const {checkUsernameAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  // Display errors using <Input> error parameter
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    // console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const checkUsername = async (username) => {
    if (username.length < 3) {
      return;
    }
    try {
      // add error to Input element if username is reserved
      const isAvailable = await checkUsernameAvailable(username);
      console.log('checkUsername available', isAvailable);
      if (!isAvailable) {
        setErrors((errors) => {
          return {...errors, username: 'Username already exists'};
        });
      } else {
        setErrors((errors) => {
          return {...errors, username: null};
        });
        // setErrors({username: ''});
      }
    } catch (error) {
      console.log('username check failed', error);
    }
  };

  return {
    handleInputChange,
    inputs,
    errors,
    checkUsername,
  };
};

export default useSignUpForm;
