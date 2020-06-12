import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Avatar from "@material-ui/core/Avatar";

//MUI ICONs
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import TrashIcon from "@material-ui/icons/DeleteOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import RefreshIcon from "@material-ui/icons/Refresh";
import ClearIcon from "@material-ui/icons/Close";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import BellIcon from "@material-ui/icons/NotificationsOutlined";
import ExitIcon from "@material-ui/icons/Close";

//SCROLL
import ElevationScroll from "./ElevationScroll";

//AVATAR
import avatar from "../avatar-2.png";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  icons: {
    marginLeft: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  notes: {
    fontSize: 25,
    textTransform: "capitalize",
    color: "#4B4F51",
    fontFamily: "Times New Roman",
    marginLeft: 15,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: drawerWidth,
    },
    boxShadow: "1px 1px 20px 5px #DEDEDE",
  },
  listText: {
    textTransform: "capitalize",
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
  },
  iconSize: {
    fontSize: 31,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  input: {
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
    width: 500,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  typography: {
    fontSize: 20,
  },
  avatar: {
    textTransform: "uppercase",
    fontSize: 19,
  },
}));

function NavBar(props) {
  const classes = useStyles();

  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    let results = [];

    setSuggestions(results);
    props.onSearch(suggestions);
  };

  const clearSearch = () => {
    setSearch("");
    props.onSearch("");
  };

  const handleSearchRoute = () => {
    props.onRouteChange("notes");
  };

  let displayName = props.displayName.split("")[0];

  return (
    <div
      style={{
        position: "absolute",
        zIndex:
          props.edit || props.trashMode || props.archiveMode ? 0 : "initial",
        opacity:
          props.route === "signIn" || props.route === "signUp"
            ? 0.5
            : "initial",
      }}
    >
      {props.route !== "search" ? (
        <ClickAwayListener onClickAway={props.handleDrawerClose}>
          <div className={classes.root}>
            <CssBaseline />
            <ElevationScroll>
              <AppBar
                position="fixed"
                color="inherit"
                style={{ borderBottom: "1px solid #DADCE0" }}
              >
                <Toolbar>
                  <IconButton
                    style={{ color: "#4B4F51" }}
                    onClick={props.handleDrawerOpen}
                    edge="start"
                  >
                    <MenuIcon fontSize="inherit" style={{ fontSize: 27 }} />
                  </IconButton>
                  <Typography variant="h4" className={classes.notes}>
                    {props.route}
                  </Typography>
                  <div className={classes.icons}>
                    <IconButton
                      style={{ color: "#4B4F51" }}
                      onClick={() => props.onRouteChange("search")}
                    >
                      <SearchIcon fontSize="inherit" style={{ fontSize: 27 }} />
                    </IconButton>
                    <IconButton
                      style={{ color: "#4B4F51" }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <RefreshIcon
                        fontSize="inherit"
                        style={{ fontSize: 27 }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={(event) => {
                        if (props.isSignedIn) {
                          return null;
                        } else {
                          props.onRouteChange("signIn");
                        }
                      }}
                    >
                      {props.isSignedIn ? (
                        <div>
                          <Avatar className={classes.avatar}>
                            {displayName}
                          </Avatar>
                        </div>
                      ) : (
                        <img
                          src={avatar}
                          alt="avatar"
                          height="38"
                          width="38"
                          className="avatar-img"
                        />
                      )}
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
            </ElevationScroll>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={props.open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <Typography variant="h4" className={classes.notes}>
                  Notes
                </Typography>
                <IconButton
                  onClick={props.handleDrawerClose}
                  style={{ marginLeft: "auto" }}
                >
                  <ExitIcon />
                </IconButton>
              </div>
              <div
                role="presentation"
                onClick={props.handleDrawerClose}
                onKeyDown={props.handleDrawerClose}
              >
                <List>
                  <ListItem button onClick={() => props.onRouteChange("notes")}>
                    <ListItemIcon style={{ marginBottom: 13 }}>
                      <NoteIcon
                        fontSize="inherit"
                        className={classes.iconSize}
                      />
                    </ListItemIcon>
                    <Typography className={classes.listText}>Note</Typography>
                  </ListItem>
                  <ListItem
                    button
                    style={{ marginBottom: 8 }}
                    onClick={() => props.onRouteChange("reminder")}
                  >
                    <ListItemIcon>
                      <BellIcon
                        fontSize="inherit"
                        className={classes.iconSize}
                      />
                    </ListItemIcon>
                    <Typography className={classes.listText}>
                      Reminders
                    </Typography>
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem
                    button
                    style={{ marginBottom: 13, marginTop: 5 }}
                    onClick={() => props.onRouteChange("archive")}
                  >
                    <ListItemIcon>
                      <ArchiveIcon
                        fontSize="inherit"
                        className={classes.iconSize}
                      />
                    </ListItemIcon>
                    <Typography className={classes.listText}>Achive</Typography>
                  </ListItem>
                  <ListItem
                    button
                    style={{ marginBottom: 13 }}
                    onClick={() => props.onRouteChange("trash")}
                  >
                    <ListItemIcon>
                      <TrashIcon
                        fontSize="inherit"
                        className={classes.iconSize}
                      />
                    </ListItemIcon>
                    <Typography className={classes.listText}>Trash</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    style={{ marginTop: 13 }}
                    onClick={() => props.onRouteChange("settings")}
                  >
                    <ListItemIcon>
                      <SettingsIcon
                        fontSize="inherit"
                        className={classes.iconSize}
                      />
                    </ListItemIcon>
                    <Typography className={classes.listText}>
                      Settings
                    </Typography>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </div>
        </ClickAwayListener>
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <ElevationScroll>
            <AppBar
              position="fixed"
              color="inherit"
              style={{ borderBottom: "1px solid #DADCE0" }}
            >
              <Toolbar>
                <Paper
                  component="form"
                  className={classes.root}
                  style={{ borderRadius: 10 }}
                >
                  <IconButton
                    style={{ color: "#4B4F51" }}
                    onClick={handleSearchRoute}
                    edge="start"
                  >
                    <BackIcon fontSize="inherit" style={{ fontSize: 23 }} />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    value={search}
                  />
                  <IconButton
                    style={{ color: "#4B4F51" }}
                    onClick={clearSearch}
                    edge="start"
                    disabled={search ? false : true}
                  >
                    <ClearIcon fontSize="inherit" style={{ fontSize: 23 }} />
                  </IconButton>
                </Paper>
                <div className={classes.icons}>
                  <IconButton style={{ color: "#4B4F51" }}>
                    <RefreshIcon fontSize="inherit" style={{ fontSize: 27 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      props.onRouteChange("signIn");
                    }}
                  >
                    {props.isSignedIn ? (
                      <Avatar className={classes.avatar}>{displayName}</Avatar>
                    ) : (
                      <img
                        src={avatar}
                        alt="avatar"
                        height="38"
                        width="38"
                        className="avatar-img"
                      />
                    )}
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </div>
      )}
    </div>
  );
}

export default NavBar;
