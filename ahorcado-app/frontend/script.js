import { app, db } from '../firebase/firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const palabras = ["ahorcado","javascript","programacion","computadora","teclado","monitor",
"servidor","cliente","codigo","software","hardware","pantalla","usuario",
"archivo","sistema","procesador","memoria","navegador","logica","estructura",
"desarrollo","variable","funcion","objeto","clase","metodo","interfaz","evento",
"conexion","modulo","biblioteca","version","control","archivo","sintaxis",
"debug","compilador","terminal","plataforma","entorno","aplicacion","seguridad",
"clave","almacenamiento"];

let palabra = "", palabraAdivinada = [], intentosRestantes = 6;
const letrasAdivinadas = new Set();

const ahorcadoDiv = document.getElementById("ahorcado");
const mensajeDiv = document.getElementById("mensaje");
const letrasDiv = document.getElementById("letras");
const intentosDiv = document.getElementById("intentos");
const botonReiniciar = document.getElementById("reiniciar");

function iniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
  palabraAdivinada = Array(palabra.length).fill("_");
  intentosRestantes = 6;
  letrasAdivinadas.clear();
  mensajeDiv.textContent = "";
  mostrarPalabra();
  mostrarLetras();
  actualizarIntentos();
}

function mostrarPalabra() {
  ahorcadoDiv.textContent = palabraAdivinada.join(" ");
}

function mostrarLetras() {
  letrasDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.className = "letra";
    btn.disabled = letrasAdivinadas.has(letra);
    btn.addEventListener("click", () => seleccionarLetra(letra));
    letrasDiv.appendChild(btn);
  }
}

async function guardarResultado(resultado) {
  try {
    await addDoc(collection(db, "partidas"), {
      resultado,
      palabra,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al guardar resultado:", error);
  }
}

function seleccionarLetra(letra) {
  letrasAdivinadas.add(letra);
  if (palabra.includes(letra)) {
    mensajeDiv.textContent = `¡Letra '${letra}' encontrada!`;
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) palabraAdivinada[i] = letra;
    }
    mostrarPalabra();
    if (!palabraAdivinada.includes("_")) {
      mensajeDiv.textContent = "¡Felicidades! Has ganado.";
      guardarResultado("victoria");
      deshabilitarLetras();
    }
  } else {
    mensajeDiv.textContent = `Letra '${letra}' no encontrada.`;
    intentosRestantes--;
    actualizarIntentos();
    if (intentosRestantes === 0) {
      mensajeDiv.textContent = `Has perdido. La palabra era: ${palabra}`;
      guardarResultado("derrota");
      deshabilitarLetras();
    }
  }
  mostrarLetras();
}

function deshabilitarLetras() {
  document.querySelectorAll(".letra").forEach(btn => btn.disabled = true);
}

function actualizarIntentos() {
  intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
}

botonReiniciar.addEventListener("click", iniciarJuego);
iniciarJuego();