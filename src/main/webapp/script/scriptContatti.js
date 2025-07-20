document.getElementById("contactForm").addEventListener("submit", function(e) {
    // Blocca l'invio
    e.preventDefault();

    // Prendi i valori
    let nome = document.getElementById("nome").value.trim();
    let cognome = document.getElementById("cognome").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();
    let messaggio = document.getElementById("messaggio").value.trim();

    // Controlla che nessun campo sia vuoto
    if (!nome || !cognome || !telefono || !email || !messaggio) {
      alert("Compila tutti i campi!");
      return;
    }

    // Controllo email base
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("Inserisci una email valida.");
      return;
    }

    // Controllo telefono semplice (solo numeri)
    const telPattern = /^[0-9\s\+\-]{6,20}$/;
    if (!telPattern.test(telefono)) {
      alert("Inserisci un numero di telefono valido.");
      return;
    }

    // Se tutto è valido, puoi procedere con l'invio (es. via AJAX o mostrare conferma)
    alert("Messaggio inviato con successo!");
    // this.submit(); ← Se vuoi davvero inviarlo a un server
  });