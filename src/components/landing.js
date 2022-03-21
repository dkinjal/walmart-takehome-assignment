import React, { useState, useEffect } from "react";
import {  Typography } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export default function Landing() {
  const [UserDetails, setUserDetails] = useState([]);

  async function getUserDetails() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserDetails(json);
        //console.log(UserDetails)
      });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          marginLeft: 100,
          marginTop: 40,
        }}
      >
        <Typography variant="h4">User List</Typography>
        <List>
          {UserDetails.map((details) => (
            <Tooltip
              title={`UserName : ${details.username}  Email : ${details.email}  `}
              arrow
            >
              <Link
                to="/details"
                state={{ user: details.id }}
                underline="none"
                style={{ textDecoration: "none", color: "purple" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={details.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
          ))}
        </List>
      </Box>
    </div>
  );
}
