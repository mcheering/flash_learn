import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import LearningContainer from './components/LearningContainer/LearningContainer';



const App = () => {
      const [currentId, setCurrentId] = useState(0);
      return (
            <Router>
                  <Container maxWidth="xl">
                        <Navbar />
                        <Switch>
                              <Route exact path="/" component={Home} />
                              <Route exact path="/auth" component={Auth} />
                              <Route exact path="/learn/:topic">
                                    <LearningContainer currentId={currentId} setCurrentId={setCurrentId} />
                              </Route>
                        </Switch>
                  </Container>
            </Router>

      );
};

export default App;