// Affiche les boutons de la sélection (vrai DOM) et les réagence autour d'elle.
let selBars = null;   // références mises en cache après le 1er chargement

function displayToolbars(ctx) {
  if (!selectionDone) return;

  // déjà chargé -> on réaffiche et on recalcule le placement
  if (selBars) {
    selBars.root.style.display = "block";
    layoutToolbars();
    return;
  }

  fetch("selectionToolbars.html")
    .then((response) => response.text())
    .then((html) => {
      const root = document.createElement("div");
      root.innerHTML = html;
      document.body.appendChild(root);

      // on mémorise tous les éléments dont layoutToolbars a besoin
      const $ = (id) => root.querySelector("#" + id);
      selBars = {
        root,
        topBar: $("topBar"),
        leftBar: $("leftBar"),
        rightBar: $("rightBar"),
        bottomBar: $("bottomBar"),
        close: $("sel-close"),
        layers: $("sel-layers"),
        // les boutons dans leur ordre d'origine (sert au "reset")
        h: ["sel-close", "sel-undo", "sel-redo", "sel-lock", "sel-plus", "sel-layers"].map($),
        v: ["sel-board", "sel-pencil", "sel-grid", "sel-perspective", "sel-palette", "sel-infos"].map($),
      };
      layoutToolbars();
    });
}

// Décide où va chaque bouton selon la taille de la sélection, puis place les barres.
function layoutToolbars() {
  const rect = selection.getBoundingClientRect(); // sélection en position:fixed -> mêmes coords
  const gap = 8;      // espace entre une barre et la sélection
  const SLOT = 52;    // place occupée par un bouton (44px + marge)
  const THICK = 52;   // épaisseur d'une barre à une seule rangée/colonne

  // 1) RESET : chaque bouton rentre dans sa barre d'origine, dans le bon ordre.
  //    appendChild DÉPLACE l'élément (il quitte l'ancienne barre) -> idempotent.
  selBars.h.forEach((b) => selBars.topBar.appendChild(b));
  selBars.v.forEach((b) => selBars.leftBar.appendChild(b));

  // 2) OVERFLOW HORIZONTAL : si la barre du haut est plus large que la sélection,
  //    close + layers partent dans la barre de DROITE.
  if (rect.width < selBars.h.length * SLOT) {
    selBars.rightBar.appendChild(selBars.close);
    selBars.rightBar.appendChild(selBars.layers);
  }

  // 3) OVERFLOW VERTICAL : combien de boutons tiennent dans la hauteur ?
  //    les suivants descendent dans la barre du BAS.
  const fit = Math.max(1, Math.floor(rect.height / SLOT));
  if (fit < selBars.v.length) {
    for (let i = fit; i < selBars.v.length; i++) {
      selBars.bottomBar.appendChild(selBars.v[i]);
    }
  }

  // 4) PLACEMENT des 4 barres autour de la sélection.
  place(selBars.topBar, rect.left, rect.top - THICK - gap);          // au-dessus
  place(selBars.leftBar, rect.left - THICK - gap, rect.top);         // à gauche
  place(selBars.rightBar, rect.right + gap, rect.top);               // à droite (overflow)
  place(selBars.bottomBar, rect.left, rect.bottom + gap);            // en bas (overflow)
}

function place(el, left, top) {
  el.style.left = left + "px";
  el.style.top = top + "px";
}
