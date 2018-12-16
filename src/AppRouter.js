import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TagSelect from './components/TagSelect';
import TagPlayer from './components/TagPlayer';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={TagSelect} />
        <Route path="/tag/:tag" component={TagPlayer} />
      </div>
    </Router>
  );
}

export default AppRouter;
