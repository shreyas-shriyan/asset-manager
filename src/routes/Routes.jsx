import React from 'react'
import { Switch, Route } from "react-router-dom"
import Listing from '../components/ListingPage/Listing'
import Navbar from "../components/Navbar"
import Details from "../components/DetailsPage/Details"

export default function Routes() {
    return (
        <div>
            <Navbar></Navbar>
            <Switch>
                <Route path="/" exact render={(props) => <Listing {...props}></Listing>}></Route>
                <Route path="/details/:id" exact render={(props) => <Details {...props} ></Details>}></Route>
                <Route path="*" render={() => <h1>Page Not Found</h1>}></Route>
            </Switch>
        </div>
    )
}
