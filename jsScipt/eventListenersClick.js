// PHASE 1 : on appuie sur le bouton de la souris -> on DÉMARRE la sélection.
// NB : on écoute "mousedown" (pas "click") : "click" ne se déclenche qu'APRÈS
// avoir relâché au même endroit, donc il ne peut pas servir à démarrer un glissé.
function setupMouseDown(ctx) {
  document.addEventListener("mousedown", (e) => {
    // 0) si on clique SUR une des toolbars, on ne démarre PAS une nouvelle sélection
    //    (sinon chaque clic sur un bouton effacerait la sélection en cours).
    if (e.target.closest("#selToolbars")) return;

    // 1) on mémorise le point de départ = le coin d'ancrage du rectangle.
    //    e.clientX / e.clientY = position de la souris dans la fenêtre (en px).
    startX = e.clientX;
    startY = e.clientY;

    // 2) on entre en mode "drag" : c'est le drapeau que mousemove va lire
    //    pour savoir s'il doit redimensionner la sélection ou non.
    isDragging = true;
    selectionDone = false;

    // 3) on affiche la boîte de sélection, posée sur le point de départ,
    //    avec une taille nulle (elle va grandir pendant le mousemove).
    selection.style.display = "block";
    selection.style.left = startX + "px";
    selection.style.top = startY + "px";
    selection.style.width = "0px";
    selection.style.height = "0px";
    hidingCursor();
  });
}
