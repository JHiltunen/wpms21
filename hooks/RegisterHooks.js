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
    // TODO: add check username functionality to API hooks and use it
    // add error to Input element if username is reserved
    const isAvailable = await checkUsernameAvailable(username);
    console.log('checkUsername available', isAvailable);
    if (!isAvailable) {
      setErrors((errors) => {
        return {...errors, username: 'Username already in use'};
      });
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
