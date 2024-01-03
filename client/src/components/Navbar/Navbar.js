import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import logo_with_jil_written_in_it from "../../images/logo_with_jil_written_in_it.jpg";
import write_text_memories from "../../images/write_text_memories.jpg";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./Styles";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("user");
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    // JWT...
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={write_text_memories} alt="icon" height="45px" width="150" />
        <img
          className={classes.image}
          src={logo_with_jil_written_in_it}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name || ""}
              src={user?.result?.imageUrl || ""}
            >
              {user?.result?.name ? user.result.name.charAt(0) : ""}
            </Avatar>
            <Typography className={classes.userName} varient="h6">
              {user?.result?.name || ""}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
