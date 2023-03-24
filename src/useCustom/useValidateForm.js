export const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Please type your username';
    }
    // else if (values.username.length < 7) {
    //   errors.username = 'Must be 5 characters or more';
    // }
  
    if (!values.password) {
      errors.password = 'Plaese type your password';
    }
    // else if (values.password.length < 10) {
    //   errors.password = 'Must be 10 characters or more';
    // }
  
    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }
  
    return errors;
  };