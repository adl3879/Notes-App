import React from "react";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import Search from "./Search";
import Settings from "./Settings";
import Trash from "./Trash";
import NoteCollapse from "./NoteCollapse";
import Archive from "./Archive";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function Main(props) {
  return (
    <div>
      <main>
        <Toolbar />
        <Container
          style={{
            maxWidth: 800,
            minWidth: 100,
            margin: "0 auto",
            padding: "0 12px",
          }}
        >
          {props.route === "search" ? (
            <Search searchList={props.search} />
          ) : props.route === "settings" ? (
            <Settings />
          ) : props.route === "notes" ? (
            <NoteCollapse
              notes={props.notes}
              handleNotes={props.handleNotes}
              handleNoteRemove={props.handleNoteRemove}
              handleEdit={props.handleEdit}
              edit={props.edit}
              handleNoteEdit={props.handleNoteEdit}
              openDrawer={props.open}
              trash={props.trash}
              archive={props.archive}
              route={props.route}
            />
          ) : props.route === "trash" ? (
            <div>
              <Trash
                trash={props.trash}
                openDrawer={props.open}
                handleTrashPop={props.handleTrashPop}
                handleTrashDelete={props.handleTrashDelete}
                handleTrashRestore={props.handleTrashRestore}
              />
            </div>
          ) : props.route === "archive" ? (
            <Archive
              archive={props.archive}
              openDrawer={props.open}
              handleArchivePop={props.handleArchivePop}
              handleArchiveDelete={props.handleArchiveDelete}
              handleArchiveRestore={props.handleArchiveRestore}
              handleNoteRemove={props.handleNoteRemove}
              trash={props.trash}
              handleArchiveEdit={props.handleArchiveEdit}
            />
          ) : props.route === "reminder" ? (
            <div>
              <h2>later...</h2>
            </div>
          ) : props.route === "signUp" ? (
            <SignUp
              onRouteChange={props.onRouteChange}
              isSignedIn={props.isSignedIn}
              setDisplay={props.setDisplay}
            />
          ) : (
            <SignIn
              onRouteChange={props.onRouteChange}
              isSignedIn={props.isSignedIn}
              setDisplay={props.setDisplay}
              getNotes={props.getNotes}
            />
          )}
        </Container>
      </main>
    </div>
  );
}

export default Main;
