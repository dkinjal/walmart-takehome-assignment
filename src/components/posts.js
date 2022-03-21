import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { Container } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@material-ui/core/colors";
import CustomDialog from "./CustomDialog";

export default function Posts({postDetails, userDetails,UserAllDetails, UserPosts, setUserPosts}) {
  const [Comments, setComments] = useState([]);
  const [TempComment, setTempComment] = useState();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const [postBody, setPostBody] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };

// =============================POSTS APIS====================================================
    async function updatePost(e) {
    e.preventDefault();
    setOpen(true);
    }

const onSave = (e) => {
    e.preventDefault();
    console.log(postDetails.id)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postDetails.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: UserAllDetails.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let index=-1;
        for(let i=0; i< UserPosts.length; i++){
            if(UserPosts[i].id===postDetails.id){
                index=i;
            }
        }
        setUserPosts([
          ...UserPosts.slice(0, index),
          {
            ...UserPosts[index],
            id: postDetails.id,
            title: postTitle,
            body: postBody,
          },
          ...UserPosts.slice(index + 1),
        ]);
        console.log(UserPosts)
        handleClose();
    });
};

function deletePost(e) {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${postDetails.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setUserPosts(UserPosts.filter((item) => item.id !== postDetails.id));
    });
}

// =============================COMMENT APIS==============================================

  async function getComments() {
    // console.log(postDetails)
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postDetails.id}`
    )
      .then((response) => response.json())
      .then((json) => {setComments(json)
        console.log(json)
    });
  }

  async function addComment() {
    console.log(UserAllDetails);
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name: UserAllDetails.name,
        body: TempComment,
        // postId: postDetails.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setComments([...Comments, 
            {
                name: json.name,
                body: json.body,
                postId: json.id, 
            }])
      });
  }

  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ width: 505 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }}></Avatar>
        }
        title={postDetails.title}
      />

      <CardContent>
        <Typography variant="body" >
          {postDetails.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={updatePost}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={deletePost}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
        >
          Comments
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container>
          <TextField
            label="Add Comment"
            onChange={(e) => setTempComment(e.target.value)}
          >
            Add Comment
          </TextField>
          <IconButton onClick={addComment}>
            <AddIcon />
          </IconButton>
          {Comments.map((details) => (
            <CardContent>
              <Typography variant="h6" >{details.name}</Typography>
              <Typography body>{details.body}</Typography>
            </CardContent>
          ))}
        </Container>
      </Collapse>
      <CustomDialog
        open={open}
        onClose={handleClose}
        postDetails={postDetails}
        onUpdate={onSave}
        setPostTitle={setPostTitle}
        setPostBody={setPostBody}
      />
    </Card>
  );
}
