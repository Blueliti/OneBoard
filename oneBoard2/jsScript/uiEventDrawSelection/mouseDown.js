function mouseDown(e) {
 startX = e.clientX;
 startY = e.clientY;
 isDragging = true;
 selectionDone = false;
 hidingCursor();
 toolBarAll.style.visibility = "hidden";
}