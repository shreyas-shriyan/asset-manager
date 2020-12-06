import React from 'react'
import { useHistory } from "react-router-dom"

export default function Navbar() {
    let history = useHistory()
    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10%", boxShadow: "0px 1px #888888", alignItems: "center" }}>
            <h3 onClick={() => history.push("/")}>Asset Manager</h3>
            <svg style={{ height: "30px", width: "30px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
    )
}
