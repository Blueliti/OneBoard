function mouseMoove(e) {
    

    if (!isDragging){  // on ne bouge pas après un drag -> rien à faire
        pencilCursor.style.left = e.clientX + "px";
        pencilCursor.style.top = e.clientY + "px";
    }
    
    else {  // on bouge après un drag -> on redimensionne la sélection en temps réel.
        pencilCursor.style.left = e.clientX + "px";
        pencilCursor.style.top = e.clientY + "px";
        const y = Math.min(e.clientY, startY);
        const x = Math.min(e.clientX, startX);
        const width = Math.abs(e.clientX - startX);
        const height = Math.abs(e.clientY - startY);
        selection.style.left = x + "px";
        selection.style.top = y + "px";
        selection.style.width = width + "px";
        selection.style.height = height + "px";
    }
}