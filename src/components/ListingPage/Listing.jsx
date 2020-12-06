import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListingCard from "./ListingCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSearchResults, onDrop, saveOrder, cancelOrder } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export default function Listing() {

    const data = useSelector(state => state.searchResults)

    const saveDialog = useSelector(state => state.saveDialog);

    const classes = useStyles();
    const dispatch = useDispatch()

    console.log(saveDialog)

    useEffect(() => {
        dispatch(getSearchResults())
    }, [])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = [...data]

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(onDrop(items));
    }

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
        </div>
    )
}
