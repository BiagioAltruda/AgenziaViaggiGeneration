// Funzione per cambiare il tema della pagina (light <-> dark)
function changeTheme() {
  
  // Ottiene l'attributo href del foglio di stile corrente (tema attivo)
  const currentTheme = document.getElementById("theme").getAttribute("href").toString();

  // Controlla se il tema corrente è quello "light"
  if (currentTheme.includes("light")) {
    // Se sì, passa al tema scuro
    document.getElementById("theme").setAttribute("href", "../styles/darkTheme.css");
  } else {
    // Altrimenti torna al tema chiaro
    document.getElementById("theme").setAttribute("href", "../styles/lightTheme.css");
  }
}