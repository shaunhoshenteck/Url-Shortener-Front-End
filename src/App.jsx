import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Result from './components/Result';
import Edit from './components/Edit';
import UrlsList from './components/UrlsList';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/result" component={Result} />
                    <Route exact path="/url/edit/:urlCode">
                        <Edit />
                    </Route>
                    <Route exact path="/list" component={UrlsList}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
