import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "notes",
      openDrawer: false,
      searchText: "",
      notes: [
        {
          title: "Welcome to Notes!",
          content: `So what can you do with this notes app?
            Well a lot 😜. You can take notes, archive or trash notes when you feel like, pin notes (like this one), perform deep search on notes, set reminders and receive push notification.
            Other great features are coming in the next release, stay tuned!
            🔥🔥🔥`,
          pinned: true,
          color: "#A7FEEB",
        },
        {
          title: "Taking notes has never felt better!!!",
          content: `You're gonna enjoy this app, Trust me :)`,
          pinned: true,
          color: "",
        },
      ],
      search: [],
      editMode: false,
      trashMode: false,
      archiveMode: false,
      trash: [],
      archive: [],
    };
  }

  UNSAFE_componentWillMount() {
    localStorage.getItem("notes" || "trash" || "archive") &&
      this.setState({
        ...this.state,
        notes: JSON.parse(localStorage.getItem("notes")),
        trash: JSON.parse(localStorage.getItem("trash")),
        archive: JSON.parse(localStorage.getItem("archive")),
      });
  }

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
        />
        <Main
          handleDrawerClose={this.handleDrawerClose}
          open={this.state.openDrawer}
          route={this.state.route}
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
        />
      </div>
    );
  }
}

export default App;
