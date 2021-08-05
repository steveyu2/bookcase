import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Link from '@components/Link';

import styles from './style.module.scss';

const Book = () => {
  return (
    <Router>
      <div className={styles.root}>
        <Switch>
          <Route exact path="/">
            <div>
              <div>{'Book Home'}</div>
              <Link to="/test">goto Book test</Link>
            </div>
          </Route>
          <Route path="/test">
            <div>
              <div>{'Book Test'}</div>
              <Link to="/">goto Book Home</Link>
            </div>
          </Route>
          <Route path="*">
            <div>{'Book 404'}</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Book;
