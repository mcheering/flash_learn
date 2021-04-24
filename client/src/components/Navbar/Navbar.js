import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import logo from '../../images/logo_transparent_background.png';
import decode from 'jwt-decode';



const Navbar = () => {
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
      const classes = useStyles();
      const dispatch = useDispatch();
      const history = useHistory();
      const location = useLocation();


      const logout = () => {
            dispatch({
                  type: 'LOGOUT'
            })
            history.push("/auth")

            setUser(null);
      }

      useEffect(() => {
            const token = user?.token

            if (token) {
                  const decodedToken = decode(token);

                  if (decodedToken.exp * 1000 < new Date().getTime()) logout();

            }

            setUser(JSON.parse(localStorage.getItem('profile')))
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location])


      return (
            <AppBar className={classes.appBar} position="static" color="inherit">
                  <div className={classes.brandContainer}>
                        <img component={Link} to="/" className={classes.image} src={logo} alt="logo" width="150px" />

                  </div>
                  <Toolbar className={classes.toolbar}>
                        {user ? (
                              <div className={classes.profile}>
                                    <Typography className={classes.userName} variant="h6">{`Welcome,  ${user?.result?.name}!`}</Typography>
                                    <Button component={Link} to="/" variant="contained" color="primary">Home</Button>
                                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                              </div>
                        ) : (
                                    <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                              )}
                  </Toolbar>

            </AppBar>
      )

}

export default Navbar