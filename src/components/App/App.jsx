import React from 'react';
import './App.scss';
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import TopAlbums from "../TopAlbums/TopAlbums";
import NotFound from "../NotFound/NotFound"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faSearch, faAngleUp, faBars,faStar } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux';
import store from '../../store'
import Header from "../Header/Header"

library.add(faAngleDown, faSearch, faAngleUp, faBars,faStar);

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div style={{ height: '100%' }}>
                    <Header/>
                    <Switch>
                        <Redirect exact from="/" to="/top100" />
                        <Route path={'/top100'} component={TopAlbums} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;