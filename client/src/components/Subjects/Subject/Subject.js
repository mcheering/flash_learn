
import React from 'react';
import { Card, Typography, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import useStyles from './styles';

const Subject = ({ subject }) => {
      const dispatch = useDispatch();
      const classes = useStyles();

      return (
            <Button className={classes.btnStyle} component={Link} style={{ flexGrow: 1, float: 'right' }} to={`/learn/${subject}`} >
                  <Typography className={classes.title} gutterBottom component="h2">
                        <div className="subjectActionContainer">
                              {subject}
                        </div>

                  </Typography>

            </Button >



      );
};

export default Subject;