import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button"
import { useHistory } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import ImageUploader from "react-images-upload";

export default function AddPage(props) {
    let history = useHistory()
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [tags, setTags] = useState("")
    let [picture, setPicture] = useState([])

    //on submit
    const handleSubmit = () => {
        if (title && picture[0]) {
            let data = {
                "id": "",
                "isActive": false,
                "dateCreated": 1606222202,
                "dateModified": 1606222202,
                "title": `${title}`,
                "description": `${description}`,
                "imageURL": "http://lorempixel.com/640/480/transport",
                "uploadedBy": "Leslie Brown",
                "comments": []
            }

            var config = {
                method: 'post',
                url: 'https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/assets/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    alert("post success");
                    history.push("/")
                })
                .catch(function (error) {
                    alert(error);
                });
        }

        else {
            if (!title) {
                alert("title is required")
            }
            else if (!picture[0]) {
                alert("New image is required")
            }
        }
    }

    return (
        <div style={{ margin: "10px 10%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid black" }} >
                <h3>Add Image</h3>
                <Button variant="contained" color="primary" onClick={() => history.push("/")} >Back</Button>
            </div>

            <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required ></input>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginTop: "20px", height: "100px" }} placeholder="Description" ></textarea>
                    <input style={{ marginTop: "20px" }} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tags (optional)"></input>
                </div>
                <div style={{ width: "40%" }}>
                    <div style={{ height: `${picture[0] ? "" : "200px"}`, width: "300px", border: "1px solid black", margin: "auto" }}>
                        <img src={(picture[0] && URL.createObjectURL(picture[0]))} style={{ width: "100%" }} alt="addimage" ></img>
                    </div>

                    {/* image upload component */}
                    <ImageUploader
                        {...props}
                        withIcon={false}
                        singleImage={true}
                        onChange={(item) => setPicture(item)}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                        <DeleteIcon onClick={() => setPicture([])} style={{ color: "red", marginLeft: "5px" }}></DeleteIcon>
                        <div style={{ marginLeft: "10px" }}>Click to remove image</div>
                    </div>
                </div>
            </div>

            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </div >
    )
}
