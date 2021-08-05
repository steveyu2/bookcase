import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Link from '@components/Link';

import styles from './style.module.scss';

const App = () => {
  return (
    <Router>
      <div className={styles.root}>
        <Switch>
          <Route exact path="/">
            <div>
              <div>{'App Home'}</div>
              <Link to="/test">goto test</Link>
            </div>
          </Route>
          <Route path="/test">
            <div>
              <div>{'App Test'}</div>
              <Link to="/">goto Home</Link>
            </div>
          </Route>
          <Route path="*">
            <div>{'App 404'}</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
