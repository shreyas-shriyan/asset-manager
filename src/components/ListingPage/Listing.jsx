import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListingCard from "./ListingCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSearchResults, onDrop, saveOrder, cancelOrder } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export default function Listing() {

    const data = useSelector(state => state.searchResults)

    const saveDialog = useSelector(state => state.saveDialog);

    const [open, setOpen] = React.useState(false)

    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSearchResults())
    }, [])

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = [...data]

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(onDrop(items));
    }

    const handleOpen = () => {
        console.log("handleOpen");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Grid container sm={3} style={{ margin: "30px auto" }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {data.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <ListingCard
                                            data={item}
                                            provided={provided}
                                            handleDelete={handleOpen}
                                        >
                                        </ListingCard>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>

            {saveDialog &&
                <div style={{ position: "fixed", bottom: "30px", width: "100%" }}>
                    <div style={{ margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "20vw", backgroundColor: "orange", padding: "10px", borderRadius: "10px" }}>
                        <div>Save order?</div>
                        <Button variant="contained" onClick={() => dispatch(saveOrder())} color="primary">Yes</Button>
                        <Button variant="contained" onClick={() => dispatch(cancelOrder())} color="primary">No</Button>
                    </div>
                </div>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ width: "400px", position: "fixed", top: "40vh", margin: "auto" }}
            >
                <div style={{ backgroundColor: "white", }}>
                    <div style={{ padding: "5px", borderBottom: "1px solid black" }}>Delete Image</div>
                    <div style={{ margin: "10px" }}>Are you sure you want to delete?</div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px", paddingBottom: "10px" }}>
                        <Button variant="contained" onClick={handleClose} color="primary">Cancel</Button>
                        <Button variant="contained" onClick={deleteImage} color="primary">Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
