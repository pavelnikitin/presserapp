import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CalculatePage from '../components/CalculatePage';
import App from '../components/App';





const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/calculate/:id" component={CalculatePage} />
        </Switch>

    </Router>

);

export default AppRouter;