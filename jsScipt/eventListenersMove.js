// PHASE 2 : la souris bouge -> on redimensionne la sélection en temps réel.
function setupMouseMove(ctx) {
  document.addEventListener("mousemove", (e) => {
    // (a) le crayon suit toujours la souris, qu'on soit en train de draguer ou non.
    pencilCursor.style.left = e.clientX + "px";
    pencilCursor.style.top = e.clientY + "px";

    // (b) si on n'a PAS le bouton enfoncé, on s'arrête là : pas de sélection à dessiner.
    if (!isDragging) return;

    // (c) on calcule le rectangle entre le point de départ (startX,startY)
    //     et la position actuelle (e.clientX,e.clientY).
    //
    //     Math.min -> le coin haut-gauche est TOUJOURS le plus petit x et le plus petit y,
    //                 ce qui permet de draguer dans N'IMPORTE QUELLE direction
    //                 (vers la droite/bas, mais aussi vers la gauche/haut).
    //     Math.abs -> la largeur/hauteur est la distance (toujours positive) entre les deux points.
    const x = (e.clientX, startX);
    const y = (e.clientY, startY);
    const width = Math.abs(e.clientX - startX);
    const height = Math.abs(e.clientY - startY);

    // (d) on applique ces valeurs à la boîte -> elle "grandit" à l'écran.
    selection.style.left = x + "px";
    selection.style.top = y + "px";
    selection.style.width = width + "px";
    selection.style.height = height + "px";
  });
}
