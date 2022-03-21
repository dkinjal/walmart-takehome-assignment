import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Container from "@material-ui/core/Container";
import Card from "@mui/material/Card";
import Grid from "@material-ui/core/Grid";
import Accordion from "@mui/material/Accordion";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";
import { CardContent, IconButton, Typography } from "@material-ui/core";
import profile from "../images/images.png";
import { TextField } from "@material-ui/core";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Posts from "./posts";


export default function Details() {
  const [UserDetails, setUserDetails] = useState([]);
  const [PostTitle, setPostTitle] = useState(null);
  const [PostBody, setPostBody] = useState(null);
  const [UserPhotos, setUserPhotos] = useState([]);
  const [UserAlbums, setUserAlbums] = useState([]);
  const [UserPosts, setUserPosts] = useState([]);
  const [SearchKey, setSearchKey] = useState("");
  const location = useLocation();
  const { user } = location.state;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // ========================USER API===================================================

  async function getUserDetails() {
    fetch(`https://jsonplaceholder.typicode.com/users/${user}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserDetails(json);
      });
  }
  //===============================POSTS API===================================================

  async function search(e) {
    e.preventDefault();
    if (SearchKey !== "") {
      fetch(`https://jsonplaceholder.typicode.com/posts/${SearchKey}`)
        .then((response) => response.json())
        .then((json) => {
          if (Object.keys(json).length === 0) {
            const temp = (
              <Typography variant="h3"> No comments with this ID</Typography>
            );
            alert("No posts for this ID");
          }
          console.log(json);
          console.log("<---- here ---->");
          const tempArr = [];
          tempArr.push(json);
          setUserPosts(tempArr);
          // setSearchResults(json)
          // setOpen(true)
        });
    } else {
      getUserPosts();
    }
  }

  async function createPost() {
    console.log(PostTitle);
    if (PostTitle === null || PostBody === null)
      alert("Title or Comment body cannot be null");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: PostTitle,
        body: PostBody,
        userId: user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(UserPosts);
        setUserPosts([
          {
            id: json.id,
            title: PostTitle,
            body: PostBody,
          },
          ...UserPosts,
        ]);
      });
    console.log(UserPosts);
  }

  async function getUserPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserPosts(json);
        // console.log(UserDetails)
      });
  }

  // ================================== ALBUM AND PHOTOS API====================================

  async function getUserAlbums() {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user}`)
      .then((response) => response.json())
      .then((json) => {
        setUserAlbums(json);
        // console.log(UserDetails)
      });
  }

  async function getUserPhotos() {
    console.log(user);
    fetch(`https://jsonplaceholder.typicode.com/albums/${user}/photos`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserPhotos(json);
        // console.log(UserDetails)
      });
  }

  useEffect(() => {
    getUserDetails();
    getUserPosts();
    getUserAlbums();
  }, []);

  return (
    <Container>
      <br />
      <Stack direction="column" spacing={3}>
{/* ====================USER DETAILS==================== */}

        <div>
          <Card sx={{ minWidth: 275, minHeight: 300, alignContent: "center" }}>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <img src={profile} alt="Profile" width="200" />
              </IconButton>
              <CardContent>
                <Typography variant="h2" component="div">
                  {" "}
                  {UserDetails.name}
                </Typography>
                <Typography variant="h6">
                  {UserDetails.email}
                  <br />
                  {UserDetails.phone}
                  <br />
                  {UserDetails.website}
                </Typography>
              </CardContent>
            </Stack>
          </Card>
        </div>

{/* ====================USER POSTS==================== */}

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4">USER POSTS</Typography>
          </AccordionSummary>

          <Container>
            <Grid alignItems="center" direction="column" justifyContent="center" container spacing={3}>
              <Card sx={{ width: 500, alignContent: "center", direction: "row" }}>
                <br />
                <Stack spacing={2} direction="row" alignItems={"center"}>
                  <br />
                  <TextField
                    onChange={(e) => setSearchKey(e.target.value)}
                    variant="outlined"
                    label="Search"
                  >
                    Search
                  </TextField>
                  <Button
                    onClick={search}
                    sx={{ maxHeight: 50, minWidth: 130 }}
                    variant="contained"
                  >
                    <SearchIcon />
                  </Button>
                </Stack>
                <br />
              </Card>
            </Grid>
            <br />
            <br />

            <Grid alignItems="center" direction="column" justifyContent="center" container spacing={3}>
              <Card sx={{ width: 500, height: 250 }}>
                <Container>
                  <Stack spacing={2} direction="row" alignItems={"center"}>
                    <Stack spacing={2} direction="column" alignItems={"center"}>
                      <br />
                      <TextField
                        variant="outlined"
                        label="Title"
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                      <TextField
                        label="Add Comment"
                        multiline
                        variant="outlined"
                        rows={4}
                        onChange={(e) => setPostBody(e.target.value)}
                      />
                    </Stack>
                    <Button
                      onClick={createPost}
                      sx={{ maxHeight: 50, minWidth: 130 }}
                      variant="contained"
                    >
                      Post
                    </Button>
                  </Stack>
                </Container>
              </Card>
            </Grid>

            <br />
            <br />

            <Grid alignItems="center" direction="column" justifyContent="center" container spacing={3}>
              {UserPosts &&
                UserPosts.map((details) => (
                  <Grid item md={12} sm={12} key={details.id}>
                    <Posts
                      postDetails={details}
                      userDetails={user}
                      UserAllDetails ={UserDetails}
                      UserPosts={UserPosts}
                      setUserPosts={setUserPosts}
                    />
                  </Grid>
                ))}
            </Grid>
            <br/>
          </Container>
        </Accordion>

{/* ====================USER PHOTOS==================== */}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">USER ALBUMS</Typography>
          </AccordionSummary>
          <br />
          <Container>
          
            {UserAlbums.map((details) => (
              <Accordion
                expanded={expanded === details.id}
                onClick={getUserPhotos}
                onChange={handleChange(details.id)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h5">{details.title}</Typography>
                </AccordionSummary>
                {UserPhotos && UserPhotos.length > 0 ? (
                  <ImageList cols={5}>
                    {UserPhotos.map((item) => (
                      <ImageListItem key={item.url}>
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          style={{
                            height: "230px",
                            width: "230px",
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </Accordion>
            ))}
          </Container>
        </Accordion>
      </Stack>
    </Container>
  );
}
