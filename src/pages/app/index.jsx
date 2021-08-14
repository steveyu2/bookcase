import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Link from '@components/Link';
import { ENV } from '@common';

import styles from './style.module.scss';

const App = () => {
  console.log('ENV', ENV, styles);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className={styles.root}>
            <div>{'App Home'}</div>
            <Link to="/test">goto test</Link>
            <div>
              <Link to="/book">goto book</Link>
            </div>
          </div>
        </Route>
        <Route path="/test">
          <div className={styles.root}>
            <div>{'App Test'}</div>
            <Link to="/">goto Home</Link>
          </div>
        </Route>
        <Route path="*">
          <div className={styles.root}>{'App 404'}</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
