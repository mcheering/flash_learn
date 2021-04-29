import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';
import Subjects from '../Subjects/Subjects';
import Form from '../Form/Form';
import { aggregateSubjects } from '../../actions/createCards';


const Home = () => {

      const [currentId, setCurrentId] = useState(0);


      const dispatch = useDispatch();

      useEffect(() => {
            aggregateSubjects()(dispatch)

      }, [currentId, dispatch]);
      return (
            <Grow in>
                  <Container>
                        <Grid container justify="space-between" alignItems="stretch" style={{ flexDirection: 'column' }} spacing={3}>
                              <Grid item xs={12} sm={12} style={{ margin: 'auto' }}>
                                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                              </Grid>
                              <Grid item xs={12} sm={12} style={{ margin: 'auto' }}>
                                    <Subjects aggregateSubjects={aggregateSubjects} />
                              </Grid>

                        </Grid>
                  </Container>
            </Grow>
      )
}

export default Home;