import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router"
import styles from "./details.module.css"
import Comment from "./Comment"

export default function Details(props) {

    let [data, setData] = useState({})
    let date = new Date(data.dateModified)
    let history = useHistory();

    /* get item details */
    useEffect(() => {
        fetch(`https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/assets/${props.match.params.id}`)
            .then((res) => res.json())
            .then((res) => setData(res))
    }, [])

    return (
        <div style={{ margin: "20px 10%" }}>
            <div className={styles.flex} style={{ justifyContent: "space-between", borderBottom: "1px solid black" }} >
                <h3>{data.title}</h3>
                <Button variant="contained" color="primary" onClick={() => history.push("/")} >Back</Button>
            </div>

            <div style={{ justifyContent: "space-between", marginTop: "30px", paddingBottom: "30px", display: "flex", borderBottom: "1px solid black" }}>
                <img className={styles.img} src={data.imageURL} alt="card"></img>
                <div style={{ marginLeft: "30px" }}>
                    <div style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
                    <div style={{ marginTop: "30px", textAlign: "left" }}>{`Uploaded on : 22-05-1970`}</div>
                </div>
            </div>

            <div>
                {data.comments && data.comments.map((item) => <Comment key={item.id} data={item}></Comment>)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "80%", margin: "10px 10%" }}>
                <textarea placeholder="Post your comment" style={{ height: "100px", width: "100%" }}></textarea>
                <Button style={{ width: "200px", marginTop: "20px", alignSelf: "flex-end" }} variant="contained" color="primary">Post Comment</Button>
            </div>
        </div >
    )
}
