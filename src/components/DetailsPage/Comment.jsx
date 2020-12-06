import React from 'react'
import styles from "./details.module.css"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Comment(props) {
    let { data } = props

    return (
        <div style={{ margin: "30px 10%" }}>
            <div className={styles.flex} style={{ justifyContent: "start" }} >
                <AccountCircleIcon style={{ height: "30px", width: "30px" }} ></AccountCircleIcon>
                <div style={{ marginLeft: "20px" }}>{data.name}</div>
            </div>
            <div style={{ textAlign: "justify", marginTop: "15px" }}>{data.comment}</div>
        </div>
    )
}
