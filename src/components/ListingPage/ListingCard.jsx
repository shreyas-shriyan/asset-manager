import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from "react-router-dom"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        justifyContent: "center"
    }
}));

export default function ListingCard(props) {

    let { data, provided, handleDelete } = props;
    let history = useHistory();
    const classes = useStyles();

    return (
        <Grid item sm={12} ref={provided.innerRef} {...provided.draggableProps}
            style={{ padding: "7px", ...provided.draggableProps.style }}>
            <Paper className={classes.paper}>
                <img {...provided.dragHandleProps} style={{ width: "100%" }} src={data.imageURL} alt="card"></img>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", alignItems: "center" }}>
                    <Link to={`/details/${data.id}`}>{data.title}</Link>
                    <div style={{ display: "flex" }}>
                        <EditIcon onClick={() => history.push(`/edit/${data.id}`)}></EditIcon>
                        <DeleteIcon onClick={() => handleDelete(data.id)} style={{ color: "red", marginLeft: "5px" }}></DeleteIcon>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
