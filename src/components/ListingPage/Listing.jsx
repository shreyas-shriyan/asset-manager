import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListingCard from "./ListingCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSearchResults, onDrop, saveOrder, cancelOrder, deleteImage } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import styles from "./listing.module.css"


export default function Listing() {

    const data = useSelector(state => state.searchResults)

    const saveDialog = useSelector(state => state.saveDialog);

    const [open, setOpen] = useState(false)

    const [deleteId, setDeleteId] = useState("")

    const dispatch = useDispatch()
    let history = useHistory()

    useEffect(() => {
        dispatch(getSearchResults())
    }, [])

    // after dropping card
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = [...data]

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(onDrop(items));
    }

    const handleOpen = (id) => {
        setOpen(true);
        setDeleteId(id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        dispatch(deleteImage(deleteId))
    };

    return (
        <div>
            <div className={styles.addButtonContainer} >
                <Button variant="contained" color="primary" onClick={() => history.push("/addImage")} >Add Image</Button>
            </div>

            {/* context for drag and drop */}

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

            {/* rearrangement confirmation */}
            {saveDialog &&
                <div style={{ position: "fixed", bottom: "30px", width: "100%" }}>
                    <div className={styles.savePopup}>
                        <div>Save order?</div>
                        <Button variant="contained" onClick={() => dispatch(saveOrder())} color="primary">Yes</Button>
                        <Button variant="contained" onClick={() => dispatch(cancelOrder())} color="primary">No</Button>
                    </div>
                </div>
            }

            {/* deletion modal */}
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
                        <Button variant="contained" onClick={handleDelete} color="primary">Confirm</Button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
