
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Tu formulario fue enviado correctamente");

        formulario.reset();
    });
});
const preguntas = [
    {
        imagen: "imagenes/imagen.adware.jpg",
        pregunta: "¿Qué amenaza muestra publicidad no deseada?",
        opciones: ["Gusano", "Adware", "Troyano"],
        correcta: "Adware"
    },
    {
        imagen: "imagenes/imagen.gusanos.jfif",
        pregunta: "¿Qué malware puede propagarse entre equipos?",
        opciones: ["Gusano", "Adware", "Troyano"],
        correcta: "Gusano"
    },
    {
        imagen: "imagenes/imagen.phishing.png",
        pregunta: "¿Qué es el phishing?",
        opciones: [
            "Un engaño para robar información",
            "Un videojuego",
            "Un programa para dibujar"
        ],
        correcta: "Un engaño para robar información"
    },
    {
        imagen: "imagenes/imagen.spyware.jfif",
        pregunta: "¿Qué hace el spyware?",
        opciones: [
            "Espía la actividad del usuario",
            "Mejora internet",
            "Protege todos los archivos"
        ],
        correcta: "Espía la actividad del usuario"
    },
    {
        imagen: "imagenes/imagen.troyano.jfif",
        pregunta: "¿Qué es un troyano informático?",
        opciones: [
            "Un programa que se disfraza de algo confiable",
            "Un juego",
            "Una computadora"
        ],
        correcta: "Un programa que se disfraza de algo confiable"
    }
    let indice = 0;
let puntos = 0;
let respondida = false;


const imagen = document.getElementById("imagen");
const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const resultado = document.getElementById("resultado");
const siguiente = document.getElementById("siguiente");
const puntaje = document.getElementById("puntaje");
const progreso = document.getElementById("progreso");

const final = document.getElementById("final");
const mensajeFinal = document.getElementById("mensaje-final");
const detalleFinal = document.getElementById("detalle-final");
const reiniciar = document.getElementById("reiniciar");


function mostrarPregunta() {
    const actual = preguntas[indice];

    respondida = false;

    progreso.textContent =
        "Pregunta " + (indice + 1) + " de " + preguntas.length;

    puntaje.textContent = "Puntos: " + puntos;
    puntaje.className = "";

    imagen.src = actual.imagen;
    imagen.alt = actual.pregunta;

    pregunta.textContent = actual.pregunta;
    opciones.innerHTML = "";
    resultado.textContent = "";
    resultado.style.color = "";

    siguiente.disabled = true;
    siguiente.textContent = "Siguiente pregunta";
];
    siguiente.disabled = true;
    siguiente.textContent = "Siguiente pregunta";

    imagen.style.display = "block";
    pregunta.style.display = "block";
    opciones.style.display = "flex";
    resultado.style.display = "block";
    siguiente.style.display = "inline-block";

    final.classList.add("oculto");


    const alternativas = [...actual.opciones];

    alternativas.sort(() => Math.random() - 0.5);

    alternativas.forEach(function(opcion) {
        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.type = "button";

        boton.addEventListener("click", function() {
            comprobarRespuesta(opcion, boton);
        });

        opciones.appendChild(boton);
    });
}
function comprobarRespuesta(opcionElegida, botonElegido) {
    if (respondida) {
        return;
    }

    respondida = true;

    const actual = preguntas[indice];
    const botones = opciones.querySelectorAll("button");

    botones.forEach(function(boton) {
        boton.disabled = true;

        if (boton.textContent === actual.correcta) {
            boton.classList.add("correcta");
        }
    });

    if (opcionElegida === actual.correcta) {
        puntos++;

        resultado.textContent =
            "¡Correcto! " + actual.explicacion;

        resultado.style.color = "green";
    } else {
        botonElegido.classList.add("incorrecta");

        resultado.textContent =
            "Incorrecto. La respuesta correcta es: " +
            actual.correcta + ". " + actual.explicacion;

        resultado.style.color = "red";
    }

    puntaje.textContent = "Puntos: " + puntos;
    siguiente.disabled = false;

    if (indice === preguntas.length - 1) {
        siguiente.textContent = "Ver resultado final";
    }
}

function terminarJuego() {
    imagen.style.display = "none";
    pregunta.style.display = "none";
    opciones.style.display = "none";
    resultado.style.display = "none";
    siguiente.style.display = "none";

    final.classList.remove("oculto");

    progreso.textContent = "Juego terminado";

    puntaje.textContent =
        "Puntos: " + puntos + " de " + preguntas.length;

    if (puntos >= 3) {
        mensajeFinal.textContent = "¡APROBADO!";
        mensajeFinal.className = "aprobado";

        detalleFinal.textContent =
            "¡Muy bien! Obtuviste " + puntos + " de 5 puntos.";

        detalleFinal.className = "aprobado";
        puntaje.className = "aprobado";
    } else {
        mensajeFinal.textContent =
            "DESAPROBADO. ¡Intentá otra vez!";

        mensajeFinal.className = "desaprobado";

        detalleFinal.textContent =
            "Obtuviste " + puntos + " de 5 puntos. ¡Seguí practicando!";

        detalleFinal.className = "desaprobado";
        puntaje.className = "desaprobado";
    }
}
siguiente.addEventListener("click", function() {
    if (!respondida) {
        return;
    }

    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        terminarJuego();
    }
});

// Reiniciar el juego.
reiniciar.addEventListener("click", function() {
    indice = 0;
    puntos = 0;
    respondida = false;

    mostrarPregunta();
});

mostrarPregunta();

