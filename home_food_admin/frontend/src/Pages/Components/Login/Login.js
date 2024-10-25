import React, { useState } from 'react';

import AuthForm from './AuthForm';

const LOGIN_URL = './auth/login';


function Login() {
const [open,setOpen]=useState(true);

 
  return (
  <AuthForm/>
  );
};
export default Login;