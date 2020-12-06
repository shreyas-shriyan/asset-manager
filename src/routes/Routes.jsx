import React from 'react'
import { Switch, Route } from "react-router-dom"
import Listing from '../components/ListingPage/Listing'
import Navbar from "../components/Navbar"

export default function Routes() {
    return (
        <div>
            <Navbar></Navbar>
            <Switch>
                <Route path="/" exact render={(props) => <Listing {...props}></Listing>}></Route>
                <Route><h1>Page Not Found</h1></Route>
            </Switch>
        </div>
    )
}
