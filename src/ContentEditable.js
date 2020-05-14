import React from "react";

function ContentEditable({ children }) {
  return (
    <div contenteditable="true" style={{ outline: "none" }}>
      {children}
    </div>
  );
}

///what is this?

export default ContentEditable;
