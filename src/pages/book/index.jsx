import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Link from '@components/Link';

import styles from './style.module';

const Book = () => {
  return (
    <Router>
      <div className={styles.root}>
        <Switch>
          <Route exact path="/book">
            <div>
              <div>{'Book Home'}</div>
              <Link to="/book/test">goto Book test</Link>
            </div>
          </Route>
          <Route path="/book/test">
            <div>
              <div>{'Book Test'}</div>
              <Link to="/book">goto Book Home</Link>
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
