function mouseUp(e) {
    isDragging = false;
    selectionDone = true;
    hidingCursor();
    toolBarAll.style.visibility = "visible";

    const rect = selection.getBoundingClientRect();
    toolBarVertical.style.left = rect.left - toolBarVertical.offsetWidth - 0 + "px"; // 10px à gauche de la sélection
    toolBarVertical.style.top = rect.top - 40 + "px";
    toolBarHorizontal.style.left = rect.left - toolBarHorizontal.offsetWidth + 500 + "px"; // 10px à gauche de la sélection
    toolBarHorizontal.style.top = rect.top - 80 + "px";
    
}