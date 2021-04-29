import React, { useEffect, useState } from 'react';
import useStyles from './styles';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createCard, updateCard, aggregateSubjects } from '../../actions/createCards';



const Form = ({ currentId, setCurrentId }) => {
      const [cardData, setCardData] = useState({
            topic: '', term: '', definition: ''
      })

      const card = useSelector((state) => (currentId ? state.createCards.find((card) => card._id === currentId) : null));
      const classes = useStyles();
      const dispatch = useDispatch();
      const user = JSON.parse(localStorage.getItem('profile'));


      useEffect(() => {
            if (card) setCardData(card);
      }, [card]);

      const clear = () => {
            setCurrentId(0);
            setCardData({ topic: '', term: '', definition: '' });
      };



      const handleSubmit = (event) => {
            event.preventDefault()
            if (currentId === 0) {
                  createCard({ ...cardData, name: user?.result?.name, cardUserId: user?.result?._id })(dispatch);
                  aggregateSubjects()
                  clear();

            } else {
                  updateCard(currentId, { ...cardData, name: user?.result?.name, cardUserId: user?.result?._id })(dispatch);
                  clear();
            }


      }

      if (!user?.result?.name) {
            return (
                  <Paper className={classes.paper}>
                        <Typography variant="h6" align="center">
                              Login to create your own fash cards!
        </Typography>
                  </Paper>
            );
      }
      return (
            <Paper className={classes.paper}>
                  <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Card</Typography>
                        <TextField
                              name="topic"
                              variant="outlined"
                              label="Topic"
                              fullWidth
                              value={cardData.topic}
                              className={classes.textInput}
                              onChange={(event) => setCardData({ ...cardData, topic: event.target.value.trim() })} />
                        <TextField
                              name="term"
                              variant="outlined"
                              label="Term"
                              fullWidth
                              value={cardData.term}
                              className={classes.textInput}
                              onChange={(event) => setCardData({ ...cardData, term: event.target.value })} />
                        <TextField
                              name="definition"
                              variant="outlined"
                              label="Definition"
                              fullWidth
                              value={cardData.definition}
                              className={classes.textInput}
                              onChange={(event) => setCardData({ ...cardData, definition: event.target.value })} />
                        <div>
                              <Button className={classes.submitbutton} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
                              <Button className={classes.clearbutton} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>

                        </div>
                  </form>
            </Paper>
      )
}

export default Form