import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import PlayerPage from './player/PlayerPage';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   //todo, change bot to receive params or implement cli to request
// });

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div>okay</div>
            </Route>
            <Route path="/:guildId" component={PlayerPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
