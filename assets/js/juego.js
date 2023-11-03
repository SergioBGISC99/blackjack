/*
C = Treboles
D = Diamantes
H = Corazones
S = Picas
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador1 = 0,
  puntosJugador2 = 0;

//Referencias HTML
const btnJugar = document.querySelector("#btn-new-game");
const btnPedir = document.querySelector("#btn-request");
const btnDetener = document.querySelector("#btn-stop-game");
const puntosHTML = document.querySelectorAll("small");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasRival = document.querySelector("#computadora-cartas");

// Esta función crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

// Asignar valor a carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de jugador 2
const turnoJugador2 = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosJugador2 += valorCarta(carta);
    puntosHTML[1].innerText = puntosJugador2;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasRival.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosJugador2 < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosJugador2 === puntosMinimos) alert("Empate 😢");
    else if (puntosMinimos > 21) alert("Gana el jugador 2 😖");
    else if (puntosJugador2 > 21) alert("Has ganado 🥳");
    else alert("Gana el jugador 2 😖");
  }, 100);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador1 += valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador1;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador1 > 21) {
    console.warn("Has perdido");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoJugador2(puntosJugador1);
  } else if (puntosJugador1 === 21) {
    console.warn("¿21? Genial");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoJugador2(puntosJugador1);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoJugador2(puntosJugador1);
});
