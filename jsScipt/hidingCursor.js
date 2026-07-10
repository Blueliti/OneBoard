function hidingCursor() {
  if (!selectionDone) {
    document.getElementById("cursorNone").style.cursor = "none";
    document.getElementById("pencilCursor").style.visibility = "visible";
  }
  else {
    document.getElementById("cursorNone").style.cursor = "default";
    document.getElementById("pencilCursor").style.visibility = "hidden";
  }
}