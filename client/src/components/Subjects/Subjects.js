import React from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Subject from './Subject/Subject'

const Subjects = () => {
      const currentState = useSelector((state) => state.createCards)
      const classes = useStyles();
      console.log("current subject", currentState.subjects)


      return (
            !currentState.subjects.length ? <CircularProgress /> : (
                  <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                        {currentState.subjects.map((subject) => (
                              <Grid className={classes.card} key={subject} item xs={12} sm={6} md={6}>
                                    <Subject subject={subject} />
                              </Grid>
                        ))}
                  </Grid>

            )
      );
}

export default Subjects;