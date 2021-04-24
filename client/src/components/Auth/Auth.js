import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, signup } from '../../actions/auth';


const initialState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
}


const Auth = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const classes = useStyles();
      const [showPassword, setShowPassword] = useState(false)
      const [signUp, changeSignUp] = useState(false)
      const [formData, setFormData] = useState(initialState);


      const handleShowPassword = () => setShowPassword(!showPassword);

      const switchMode = () => {
            setFormData(initialState)
            changeSignUp((signUp) => !signUp)
            setShowPassword(false)
      }

      const handleSubmit = (event) => {
            event.preventDefault();
            if (signUp) {
                  signup(formData, history)(dispatch)
            } else {
                  login(formData, history)(dispatch)
            }
      }



      const handleChange = (event) => {
            event.preventDefault();
            setFormData({ ...formData, [event.target.name]: event.target.value });
      }

      return (
            <Container component="main" maxWidth="xs">
                  <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                              <LockOutLinedIcon />
                        </Avatar>
                        <Typography variant="h5"> {signUp ? "Signup" : "Sign in"}</Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                              <Grid container spacing={3}>
                                    {signUp && (
                                          <>

                                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />


                                          </>
                                    )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    {signUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                              </Grid>
                              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {signUp ? "Sign Up" : "Login"}
                              </Button>
                              <Grid container justify="flex-end">
                                    <Grid item>
                                          <Button onClick={switchMode} >
                                                {signUp ? "Already have an account? SIgn In" : "Don't have an account?  Sign Up?"}
                                          </Button>
                                    </Grid>
                              </Grid>
                        </form>
                  </Paper>
            </Container>
      )
}

export default Auth;