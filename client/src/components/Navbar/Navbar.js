import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import logo from '../../images/logo_transparent_background.png';
import decode from 'jwt-decode';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';



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
                        <Button component={Link} to="/"  ><img component={Link} to="/" className={classes.image} src={logo} alt="logo" width="110px" /></Button>                        <div className={classes.toolbar}>
                              {user ? (
                                    <div className={classes.profile}>
                                          <Typography className={classes.userName}>{`Welcome, ${user?.result?.name}!`}</Typography>
                                          <Button className={classes.logout} onClick={logout}><ExitToAppRoundedIcon /></Button>
                                    </div>
                              ) : (
                                          <Button className={classes.logout} onClick={logout}><VpnKeyIcon /></Button>
                                    )}
                        </div>

                  </div>


            </AppBar>
      )

}

export default Navbar