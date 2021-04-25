import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Card, CardContent, Button, Typography, CircularProgress, Paper, TextField, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCardForTopic } from '../../actions/createCards';
import { useParams } from 'react-router-dom';
import { deleteCard, updateCard, createCard } from '../../actions/createCards';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

const LearningContainer = ({ currentId, setCurrentId }) => {
      const dispatch = useDispatch();
      const classes = useStyles();
      const currentState = useSelector((state) => state.createCards)
      const [currentCardIndex, setCurrentCardIndex] = useState(0)
      const [cardData, setCardData] = useState({
            topic: '', term: '', definition: ''
      })

      const card = useSelector((currentState) => (currentId ? currentState.createCards.cards.find((card) => card._id === currentId) : null));

      const user = JSON.parse(localStorage.getItem('profile'));


      const deleteAndChangeIndex = () => {
            if (currentCardIndex === currentState.cards.length - 1) {

                  deleteCard(currentState.cards[currentCardIndex]._id)(dispatch)
                  decrementIndex()
            } else if (currentCardIndex === 0) {
                  deleteCard(currentState.cards[currentCardIndex]._id)(dispatch)
                  setCurrentCardIndex(0)
            } else {
                  deleteCard(currentState.cards[currentCardIndex]._id)(dispatch)
            }

      }

      useEffect(() => {
            if (card) setCardData(card);
      }, [card]);

      const clear = () => {
            setCurrentId(0);
            setCardData({ topic: '', term: '', definition: '' });
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

      const { topic } = useParams();
      useEffect(() => {
            getCardForTopic(topic)(dispatch)
      }, [topic, dispatch]);

      const incrementIndex = () => {
            setCurrentCardIndex(currentCardIndex + 1)
            setFlipState(true)
      }

      const decrementIndex = () => {
            setCurrentCardIndex(currentCardIndex - 1)
            setFlipState(true)
      }

      const [flipState, setFlipState] = useState(true)

      const flip = () => {
            if (flipState) {
                  setFlipState(false)

            } else {
                  setFlipState(true)
            }
      }

      return (
            !currentState.cards.length ? <CircularProgress /> : (
                  <Container className={classes.mainContainer}>

                        <Paper className={classes.paper}>
                              <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Card</Typography>
                                    <TextField
                                          name="topic"
                                          variant="outlined"
                                          label="Topic"
                                          fullWidth
                                          value={cardData.topic}
                                          className={classes.textfield}
                                          onChange={(event) => setCardData({ ...cardData, topic: event.target.value.trim() })} />
                                    <TextField
                                          name="term"
                                          variant="outlined"
                                          label="Term"
                                          fullWidth
                                          value={cardData.term}
                                          className={classes.textfield}
                                          onChange={(event) => setCardData({ ...cardData, term: event.target.value })} />
                                    <TextField
                                          name="definition"
                                          variant="outlined"
                                          label="Definition"
                                          fullWidth
                                          value={cardData.definition}
                                          className={classes.textfield}
                                          onChange={(event) => setCardData({ ...cardData, definition: event.target.value })} />
                                    <div>
                                          <Button className={classes.submitbutton} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
                                          <Button className={classes.clearbutton} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>

                                    </div>
                              </form>
                        </Paper>


                        <Card className={classes.card}>
                              <div>
                                    <Typography style={{ float: 'left', alignSelf: "flex-start", margin: '0.5rem' }}>{`${currentCardIndex + 1}/${currentState.cards.length}`}</Typography>
                                    <Button style={{ float: 'right', alignSelf: "flex-start" }} onClick={() => setCurrentId(currentState.cards[currentCardIndex]._id)}><EditRoundedIcon /></Button>
                              </div>

                              <br />
                              <div style={{ display: "flex", justifyContent: "space-between", margin: "0.5 rem 1rem", width: '100%' }}>

                                    {currentCardIndex > 0 ?
                                          <Button disabled={false} onClick={() => decrementIndex()}> <NavigateBeforeRoundedIcon /> </Button> : <Button disabled={true} onClick={() => decrementIndex()}> <NavigateBeforeRoundedIcon /> </Button>}

                                    <div style={{ disiplay: 'flex', flexDirection: 'column', margin: '0.5 2rem' }}>
                                          <CardContent variant="h6">
                                                {(flipState) ?
                                                      <Typography style={{ margin: 'auto', textAlign: 'center' }} variant="h6">{currentState.cards[currentCardIndex].term}</Typography> :
                                                      <Typography style={{ margin: 'auto', textAlign: 'center' }} variant="h6">{currentState.cards[currentCardIndex].definition}</Typography>}
                                          </CardContent>
                                          <div style={{ textAlign: "center", marginBottom: '0.8rem' }}>
                                                <Button className={classes.flipbutton} onClick={() => flip()}><CachedRoundedIcon /></Button>
                                          </div>


                                    </div>


                                    {currentCardIndex < currentState.cards.length - 1 ?
                                          <Button disabled={false} onClick={() => incrementIndex()}> <NavigateNextRoundedIcon /> </Button> : <Button disabled={true} onClick={() => incrementIndex()}> < NavigateNextRoundedIcon /> </Button>}
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                                    <Button><HighlightOffRoundedIcon /></Button>
                                    <Button><CheckCircleOutlineRoundedIcon /></Button>
                                    <Button onClick={() => deleteAndChangeIndex()}><DeleteForeverRoundedIcon /></Button>
                              </div>


                        </Card >

                  </Container >


            )

      )
}

export default LearningContainer;