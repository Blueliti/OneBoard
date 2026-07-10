function hidingCursor(e) {
    if (selectionDone) {
        document.getElementById("cursor").style.cursor = "default";
        document.getElementById("pencilCursor").style.visibility = "hidden";
    }
    else {
        document.getElementById("cursor").style.cursor = "none";
        document.getElementById("pencilCursor").style.visibility = "visible";
    }      
}