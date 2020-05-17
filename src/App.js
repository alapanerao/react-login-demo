import React from 'react';
import Login from './screens/Login'
import Home from './screens/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
