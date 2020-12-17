import React from 'react';
import { HashRouter as Router , Route , Switch } from 'react-router-dom';
import Login from './page/login';
import home from './page/home';
import signup from './page/signup';

function App() {
  return (
      	<Router >
			<div>
				<Switch>
					<Route exact path="/" component={home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={signup} />
				</Switch>
			</div>
		</Router>
  );
}

export default App;
