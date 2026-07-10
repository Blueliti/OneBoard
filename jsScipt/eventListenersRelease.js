// PHASE 3 : on relâche le bouton -> on TERMINE la sélection.
function setupMouseUp(ctx) {
  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;   // on ne relâche pas après un drag -> rien à faire
    isDragging = false;        // mousemove arrête de redimensionner

    // taille finale de la sélection
    const width = Math.abs(e.clientX - startX);
    const height = Math.abs(e.clientY - startY);

    // trop petit (un simple clic) -> on annule la sélection, pas de toolbar
    if (width < 10 || height < 10) {
      selection.style.display = "none";
      selectionDone = false;
      return;
    }

    // la sélection est validée.
    // ATTENTION : "selectionDone" sans "var" -> on met à jour la variable GLOBALE.
    // (avec "var" on créerait une variable locale qui masque la globale : le bug d'avant.)
    selectionDone = true;
    hidingCursor();

    // maintenant que la sélection est finie, on affiche + on cale les toolbars.
    displayToolbars();
  });
}
