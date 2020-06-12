import React, { Component } from "react";
import axios from "axios";

import NavBar from "./components/NavBar";
import Main from "./components/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "notes",
      openDrawer: false,
      searchText: "",
      notes: [],
      trash: [],
      archive: [],
      search: [],
      editMode: false,
      trashMode: false,
      archiveMode: false,
      isSignedIn: false,
      display: "",
    };
  }

  UNSAFE_componentWillMount() {
    let notes = localStorage.getItem("notes");
    let trash = localStorage.getItem("trash");
    let archive = localStorage.getItem("archive");

    if (notes || trash || archive) {
      this.setState({
        ...this.state,
        notes: JSON.parse(notes),
        trash: JSON.parse(trash),
        archive: JSON.parse(archive),
      });
    } else {
      this.getNotes();
    }
  }

  getNotes = () => {
    this.setState({
      notes: [],
    });

    axios
      .get(`http://localhost:3000/api/notes/getall`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const notes = res.data;
        if (notes !== "Token is not valid") {
          for (let i = 0; i < notes.length; i++) {
            //feels inefficient but works fineee
            if (
              notes.length &&
              notes[i].userId === JSON.parse(localStorage.getItem("userId"))
            ) {
              this.setState({
                notes: [...this.state.notes, notes[i]],
              });
            }
          }
        } else {
          return null;
        }
      });
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("notes", JSON.stringify(nextState.notes));
    localStorage.setItem("trash", JSON.stringify(nextState.trash));
    localStorage.setItem("archive", JSON.stringify(nextState.archive));
  }

  handleDrawerOpen = () => {
    this.setState({
      openDrawer: true,
      editMode: false,
    });
  };

  handleEdit = (edit) => {
    this.setState({
      editMode: edit,
    });
  };

  handleArchivePop = (archive) => {
    this.setState({
      archiveMode: archive,
    });
  };

  handleTrashPop = (trash) => {
    this.setState({
      trashMode: trash,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      openDrawer: false,
    });
  };

  onRouteChange = (name) => {
    this.setState({
      route: name,
    });
  };

  handleNotes = (note) => {
    this.setState({
      ...this.state,
      notes: [note, ...this.state.notes],
    });
  };

  handleNoteRemove = (use, type, note) => {
    if (use === "notes") {
      let notes = [];
      notes = this.state.notes.filter((current) => {
        return current.content !== note.content;
      });
      this.setState({
        ...this.state,
        notes,
        trash:
          type === "trash" ? [note, ...this.state.trash] : this.state.trash,
        archive:
          type === "archive"
            ? [note, ...this.state.archive]
            : this.state.archive,
      });
    } else {
      let archive = [];
      archive = this.state.archive.filter((current) => {
        return current.content !== note.content;
      });
      this.setState({
        ...this.state,
        archive,
        trash:
          type === "trash" ? [note, ...this.state.trash] : this.state.trash,
      });
    }
  };

  //editing.....
  handleNoteEdit = (note, updatedNote) => {
    let index = this.state.notes.findIndex((current) => {
      return current === note;
    });

    let newNotes = this.state.notes.map((item) => {
      if (item === this.state.notes[index]) {
        item = updatedNote;
      }
      return item;
    });

    this.setState({
      ...this.state,
      notes: newNotes,
    });
  };

  handleArchiveEdit = (note, updatedNote) => {
    let index = this.state.archive.findIndex((current) => {
      return current === note;
    });

    let newArchive = this.state.archive.map((item) => {
      if (item === this.state.archive[index]) {
        item = updatedNote;
      }
      return item;
    });

    this.setState({
      ...this.state,
      archive: newArchive,
    });
  };

  handleTrashDelete = (note) => {
    let trash = [];
    trash = this.state.trash.filter((current) => {
      return current.content !== note.content;
    });
    this.setState({
      ...this.state,
      trash,
    });
  };

  handleTrashRestore = (note) => {
    let trash = [];
    trash = this.state.trash.filter((current) => {
      return current.content !== note.content;
    });
    this.setState({
      ...this.state,
      notes: [...this.state.notes, note],
      trash,
    });
  };

  handleArchiveRestore = (note) => {
    let archive = [];
    archive = this.state.archive.filter((current) => {
      return current.content !== note.content;
    });
    this.setState({
      ...this.state,
      notes: [...this.state.notes, note],
      archive,
    });
  };

  onSearch = (search) => {
    this.setState({
      search,
    });
  };

  signedIn = (bool) => {
    this.setState({
      isSignedIn: bool,
    });
  };

  setDisplay = (name) => {
    this.setState({
      display: name,
    });
  };

  render() {
    return (
      <div className="app">
        <NavBar
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          open={this.state.openDrawer}
          route={this.state.route}
          onRouteChange={this.onRouteChange}
          searchText={this.state.searchText}
          onSearch={this.onSearch}
          notes={this.state.notes}
          edit={this.state.editMode}
          handleEdit={this.handleEdit}
          trashMode={this.state.trashMode}
          archiveMode={this.state.archiveMode}
          isSignedIn={this.state.isSignedIn}
          displayName={this.state.display}
        />
        <Main
          handleDrawerClose={this.handleDrawerClose}
          open={this.state.openDrawer}
          route={this.state.route}
          onRouteChange={this.onRouteChange}
          handleNotes={this.handleNotes}
          handleNoteRemove={this.handleNoteRemove}
          notes={this.state.notes}
          handleEdit={this.handleEdit}
          edit={this.state.editMode}
          handleNoteEdit={this.handleNoteEdit}
          handleTrashPop={this.handleTrashPop}
          trash={this.state.trash}
          handleTrashDelete={this.handleTrashDelete}
          handleTrashRestore={this.handleTrashRestore}
          handleArchivePop={this.handleArchivePop}
          archive={this.state.archive}
          handleArchiveRestore={this.handleArchiveRestore}
          search={this.state.search}
          handleArchiveEdit={this.handleArchiveEdit}
          isSignedIn={this.signedIn}
          setDisplay={this.setDisplay}
          getNotes={this.getNotes}
          signedIn={this.state.isSignedIn}
        />
      </div>
    );
  }
}

export default App;
