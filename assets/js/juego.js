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
  console.log(deck);
  return deck;
};

crearDeck();

//Esta función me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

//Asignar valor a carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//Eventos
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
  } else if (puntosJugador1 === 21) {
    console.warn("¿21? Genial");
    btnPedir.disabled = true;
  }
});
