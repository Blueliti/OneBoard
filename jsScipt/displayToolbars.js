// Affiche toolbarAll.html une fois la sélection terminée, et cale les deux barres
// autour de la sélection : verticale à GAUCHE (hauteur = sélection),
// horizontale en HAUT (largeur = sélection).
function displayToolbars(ctx) {
  if (!selectionDone) return;

  let container = document.getElementById("toolbarsContainer");

  // déjà chargé ? on se contente de le réafficher et de le repositionner.
  if (container) {
    container.style.display = "block";
    positionToolbars(container);
    return;
  }

  fetch("toolbarAll.html")
    .then((response) => response.text())
    .then((html) => {
      container = document.createElement("div");
      container.id = "toolbarsContainer";
      container.innerHTML = html;              // injecte le <style> + les 2 <iframe> de toolbarAll
      document.body.appendChild(container);
      positionToolbars(container);             // on cale les barres sur la sélection
    });
}

// Place et dimensionne les deux barres par rapport à la sélection.
function positionToolbars(container) {
  const rect = selection.getBoundingClientRect(); // left/top/width/height de la sélection (repère fenêtre)
  const gap = 8;                                   // petit espace entre la barre et la sélection

  const vFrame = container.querySelector("#verticalFrame");
  const hFrame = container.querySelector("#horizontalFrame");
  if (!vFrame || !hFrame) return;

  // "épaisseur" fixe de chaque barre (les tailles définies dans toolbarAll)
  const vThickness = 140; // largeur de la barre verticale
  const hThickness = 70;  // hauteur de la barre horizontale

  // position:fixed -> on raisonne dans le même repère que rect (la fenêtre).
  // On remet margin:0 car toolbarAll met un margin-top sur l'horizontale.

  // --- BARRE VERTICALE : à gauche de la sélection, MÊME HAUTEUR ---
  vFrame.style.position = "fixed";
  vFrame.style.margin = "0";
  vFrame.style.top = rect.top + "px";
  vFrame.style.left = (rect.left - vThickness - gap) + "px";
  vFrame.style.width = vThickness + "px";
  vFrame.style.height = rect.height + "px";       // <-- s'adapte à la hauteur de la sélection

  // --- BARRE HORIZONTALE : au-dessus de la sélection, MÊME LARGEUR ---
  hFrame.style.position = "fixed";
  hFrame.style.margin = "0";
  hFrame.style.left = rect.left + "px";
  hFrame.style.top = (rect.top - hThickness - gap) + "px";
  hFrame.style.width = rect.width + "px";         // <-- s'adapte à la largeur de la sélection
  hFrame.style.height = hThickness + "px";
}
