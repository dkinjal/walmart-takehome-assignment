import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core";

const CustomDialog = ({
  open,
  onClose,
  postDetails,
  onUpdate,
  setPostTitle,
  setPostBody,
}) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth={true}>
      <DialogTitle>Update Post</DialogTitle>
      <Grid container direction="column">
        <Grid item>
          <Container>
            <TextField
              label="Title"
              fullWidth
              defaultValue={postDetails.title}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </Container>
        </Grid>
        <br />
        <Grid item>
          <Container>
            <TextField
              fullWidth
              label="Comment"
              defaultValue={postDetails.body}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </Container>
        </Grid>
        <br />
        <Container>
          <Grid item container direction="row">
            <Grid item md={6}>
              <Button onClick={onClose}>Cancel</Button>
            </Grid>
            <Grid item md={6}>
              <Button onClick={onUpdate}>Save</Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Dialog>
  );
};

export default CustomDialog;
