
import React from 'react';
import { Typography, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom'

import useStyles from './styles';

const Subject = ({ subject }) => {
      const classes = useStyles();

      return (
            <Button className={classes.btnStyle} component={Link} style={{ flexGrow: 1, float: 'right' }} to={`/learn/${subject}`} >
                  <Button className={classes.subject} color="primary" variant="contained"  item xs={12} sm={12} md={12}>

                        <Typography className={classes.title} gutterBottom component="h2">{subject}</Typography>

                  </Button>



            </Button >



      );
};

export default Subject;