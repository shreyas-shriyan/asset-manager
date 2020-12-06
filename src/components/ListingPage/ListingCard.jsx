import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
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

    let { data, provided } = props;
    const classes = useStyles();

    return (
        <Grid item sm={12} ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps} style={{ padding: "7px", ...provided.draggableProps.style }}>
            <Paper className={classes.paper}>
                {console.log(data)}
                <img style={{ width: "100%" }} src={data.imageURL} alt="card"></img>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <div>{data.title}</div>
                    <div style={{ display: "flex" }}>
                        <EditIcon></EditIcon>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
