// ==== scriptPrev.js: Form Wizard Logic with Inline Comments ==== 

// Mappa dei costi base per ogni destinazione
const costMap = {
  'Parigi': 300,   // Costo base per Parigi
  'Roma':   100,   // Costo base per Roma
  'Madrid': 200,   // Costo base per Madrid
  'Bangkok':250    // Costo base per Bangkok
};

// Indice dell'attuale step (parte da 0 = primo step)
let currentStep = 0;

// HTMLCollection di tutti i contenitori "step"
const steps = document.getElementsByClassName('step');

// Elemento della progress bar da aggiornare
const progressBar = document.getElementById('progressBar');

/**
 * showStep(n): mostra il passo n nascosto e aggiorna progress bar
 * @param {number} n - indice dello step da visualizzare
 */
function showStep(n) {
  // Attiva solo lo step corrente, nasconde gli altri
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.toggle('active', i === n);
  }
  
  // Calcola percentuale di avanzamento
  const percent = (n / (steps.length - 1)) * 100;
  progressBar.style.width = percent + '%';

  // Nascondi "Precedente" se siamo al primo step
  document.getElementById('prevBtn').style.display = (n === 0) ? 'none' : 'inline-block';

  // Cambia testo bottone in "Fine" se ultimo step, altrimenti "Avanti"
  document.getElementById('nextBtn').innerText =
    (n === steps.length - 1) ? 'Fine' : 'Avanti';
}

/**
 * validateStep(): controlla validità HTML5 di tutti i campi dello step corrente
 * @returns {boolean} - true se tutti i campi validi, false altrimenti
 */
function validateStep() {
  // Seleziona input e select visibili nello step corrente
  const inputs = steps[currentStep].querySelectorAll('input, select');
  
  for (let inp of inputs) {
    // Se un campo non è valido, mostra il messaggio e interrompi
    if (!inp.checkValidity()) {
      inp.reportValidity();
      return false;
    }
  }
  return true;
}

/**
 * nextPrev(dir): naviga avanti o indietro tra gli step
 * @param {number} dir - +1 per avanti, -1 per indietro
 */
function nextPrev(dir) {
  // Se dir = +1 e validazione fallita, blocca
  if (dir === 1 && !validateStep()) return;

  // Aggiorna l'indice dello step
  currentStep += dir;

  // Se siamo appena arrivati all'ultimo step, compila riepilogo
  if (currentStep === steps.length - 1) {
    fillSummary();
  }

  // Se superiamo l'ultimo step, invia il form
  if (currentStep >= steps.length) {
    document.getElementById('wizardForm').submit();
    return;
  }

  // Mostra il passo aggiornato
  showStep(currentStep);
}

/**
 * fillSummary(): legge i dati del primo step e calcola costo totale
 */
function fillSummary() {
  // Estrai valori dal DOM
  const dest = document.getElementById('destination').value;
  const dur  = Number(document.getElementById('duration').value);
  const part = Number(document.getElementById('participants').value);

  // Mostra i valori nel riepilogo finale
  document.getElementById('sum-dest').innerText        = dest;
  document.getElementById('sum-duration').innerText    = dur + ' giorni';
  document.getElementById('sum-participants').innerText = part;

  // Calcola costo: base * durata * partecipanti
  const baseCost = costMap[dest] || 0;
  const total    = baseCost * dur * part;

  // Mostra il totale
  document.getElementById('sum-total').innerText = total;
}

// Inizializza mostrando il primo step al caricamento
showStep(currentStep);
