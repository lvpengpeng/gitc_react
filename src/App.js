import React from 'react';
import {
    Router,
    Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();

import "./App.css"

import ActivityList from './pages/activity.list.page';
// import Activity from './pages/activity.page';
// import LoginPage from './pages/login.page';
// import SuccessDetails from './pages/successDetails.page';
// import Refund from './pages/refund.page';
// import Personal from './pages/personal.page';
// import Error from './pages/error.page';

const App = () => (
// props.match.params.activity_id  ？？？
    <Router history={history}>
        <div>
            <Route exact path="/" component={ActivityList}/>
            {/*<Route path="/activity/:activity_id/:stg_id" component={Activity}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/acts/:stage_id" component={ActivityList}/>
            <Route path="/acts" component={ActivityList}/>
            <Route path="/successDetails/:orderid" component={SuccessDetails}/>
            <Route path="/refund" component={Refund}/>
            <Route path="/personal/:stage_id" component={Personal}/>
            <Route path="/personal" component={Personal}/>
            <Route path="/error" component={Error}/>*/}
        </div>
    </Router>
);
export default App