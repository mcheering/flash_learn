import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Card, CardContent, Button, Typography, CircularProgress, Paper, TextField, } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCardForTopic } from '../../actions/createCards';
import { useParams, Redirect } from 'react-router-dom';
import { deleteCard, updateCard, createCard } from '../../actions/createCards';

const LearningContainer = ({ currentId, setCurrentId }) => {
      const dispatch = useDispatch();
      const classes = useStyles();
      const currentState = useSelector((state) => state.createCards)
      const [currentCardIndex, setCurrentCardIndex] = useState(0)
      const [cardData, setCardData] = useState({
            topic: '', term: '', definition: ''
      })

      const card = useSelector((currentState) => (currentId ? currentState.createCards.cards.find((card) => card._id === currentId) : null));
      // const [wordsArray, setWordsArray] = useState([]);

      const user = JSON.parse(localStorage.getItem('profile'));


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

      console.log(`this is from learnign container ${topic}`)
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

      // useEffect(() => {
      //       setWordsArray(currentState.cards.map(word => {
      //             let words = {}


      //             words = word.term

      //             return words
      //       }))
      //       localStorage.setItem("wordsArray", wordsArray)
      // }, [wordsArray])

      // const incorrectWords = (word) => {
      //       let incorrectArr = []
      //       let arr = localStorage.getItem(JSON.stringify(wordsArray))
      //       const incorrectWord = arr.find(word)
      //       incorrectArr.push(incorrectWord)
      //       localStorage.setItem("incorrectArr", incorrectArr)

      // }

      return (
            !currentState.cards.length ? <CircularProgress /> : (
                  <div>
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
                                          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                                          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

                                    </div>
                              </form>
                        </Paper>


                        <Card className={classes.card}>
                              <Typography>{`${currentCardIndex + 1}/${currentState.cards.length}`}</Typography>
                              <CardContent>
                                    {(flipState) ?
                                          currentState.cards[currentCardIndex].term :
                                          currentState.cards[currentCardIndex].definition}
                              </CardContent>
                              <Button onClick={() => flip()}>Check</Button>
                              <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
                                    {currentCardIndex > 0 &&
                                          <Button onClick={() => decrementIndex()}> Previous </Button>}
                                    {currentCardIndex < currentState.cards.length - 1 &&
                                          <Button onClick={() => incrementIndex()}> Next </Button>}
                              </div>
                              <Button>Correct</Button>
                              <Button>Incorrect</Button>

                              <Button onClick={() => deleteCard(currentState.cards[currentCardIndex]._id)(dispatch)}>Delete</Button>

                              <Button onClick={() => setCurrentId(currentState.cards[currentCardIndex]._id)}>Edit</Button>

                        </Card >
                  </div>

            )

      )
}

export default LearningContainer;