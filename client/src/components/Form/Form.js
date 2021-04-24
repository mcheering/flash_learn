import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createCard, updateCard } from '../../actions/createCards';



const Form = ({ currentId, setCurrentId }) => {
      const [cardData, setCardData] = useState({
            topic: '', term: '', definition: '', selectedFile: ''
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
            setCardData({ topic: '', term: '', definition: '', selectedFile: '' });
      };

      const handleSubmit = (event) => {
            event.preventDefault();
            if (currentId === 0) {
                  createCard({ ...cardData, name: user?.result?.name, cardUserId: user?.result?._id })(dispatch);
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
                              onChange={(event) => setCardData({ ...cardData, topic: event.target.value.trim() })} />
                        <TextField
                              name="term"
                              variant="outlined"
                              label="Term"
                              fullWidth
                              value={cardData.term}
                              onChange={(event) => setCardData({ ...cardData, term: event.target.value })} />
                        <TextField
                              name="definition"
                              variant="outlined"
                              label="Definition"
                              fullWidth
                              value={cardData.definition}
                              onChange={(event) => setCardData({ ...cardData, definition: event.target.value })} />
                        <div className={classes.fileInput}>
                              <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => setCardData({ ...cardData, selectedFile: base64 })}
                              />
                              <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                              <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                        </div>
                  </form>
            </Paper>
      )
}

export default Form