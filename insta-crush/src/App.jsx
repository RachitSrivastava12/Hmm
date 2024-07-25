import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserForm from './components/UserForm';
import CrushPage from './components/CrushPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={UserForm} />
          <Route path="/crush/:name/:instagram" component={CrushPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
