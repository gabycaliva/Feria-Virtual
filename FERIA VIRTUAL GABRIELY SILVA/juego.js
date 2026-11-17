
const preguntas = [
    {
        pista: "Se mueve principalmente en líneas rectas y se utiliza para manipular objetos.",
        opciones: ["SCARA", "Cartesiano", "Delta"],
        respuesta: "Cartesiano"
    },
    {
        pista: "Realiza movimientos rápidos y precisos. Se utiliza para ensamblar piezas.",
        opciones: ["Articulado", "SCARA", "Delta"],
        respuesta: "SCARA"
    },
    {
        pista: "Posee varias articulaciones y ejes de movimiento. Se utiliza para soldadura y manipulación.",
        opciones: ["Cartesiano", "Delta", "Articulado"],
        respuesta: "Articulado"
    },
    {
        pista: "Tiene una estructura paralela y se utiliza para clasificación y empaquetado.",
        opciones: ["Delta", "SCARA", "Cartesiano"],
        respuesta: "Delta"
    },
    {
        pista: "¿Qué tipo de robot se utiliza frecuentemente para el ensamblaje de piezas?",
        opciones: ["SCARA", "Delta", "Cartesiano"],
        respuesta: "SCARA"
    }
];

let preguntaActual = 0;
let vidas = 3;
let respondida = false;

const juego = document.createElement("section");
juego.id = "juegoRobotica";

juego.style.background = "white";
juego.style.margin = "25px auto";
juego.style.padding = "20px";
juego.style.borderRadius = "8px";
juego.style.boxShadow = "0 0 8px rgba(0,0,0,.15)";
juego.style.textAlign = "center";
juego.style.maxWidth = "900px";

document.querySelector("main").appendChild(juego);

function crearElemento(etiqueta, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;
    return elemento;
}

function crearBoton(texto, funcion) {
    const boton = crearElemento("button", texto);

    boton.style.background = "#1565c0";
    boton.style.color = "white";
    boton.style.padding = "12px 18px";
    boton.style.margin = "6px";
    boton.style.border = "none";
    boton.style.borderRadius = "6px";
    boton.style.cursor = "pointer";

    boton.addEventListener("click", funcion);

    return boton;
}

function mostrarPregunta() {
    juego.innerHTML = "";
    respondida = false;

    juego.appendChild(
        crearElemento("h2", "¡Poné a prueba tus conocimientos!")
    );

    juego.appendChild(
        crearElemento(
            "h3",
            "Pregunta " + (preguntaActual + 1) + " de " + preguntas.length
        )
    );

    juego.appendChild(
        crearElemento("p", "Vidas: " + "❤️ ".repeat(vidas))
    );

    juego.appendChild(
        crearElemento("p", preguntas[preguntaActual].pista)
    );

    const opciones = document.createElement("div");
    const resultado = crearElemento("p", "");

    resultado.id = "resultadoJuego";

    preguntas[preguntaActual].opciones.forEach(function(opcion) {
        const boton = crearBoton(opcion, function() {
            if (respondida) return;

            if (opcion === preguntas[preguntaActual].respuesta) {
                respondida = true;
                resultado.textContent = "¡Excelente!";
                resultado.style.color = "green";

                opciones.querySelectorAll("button").forEach(function(b) {
                    b.disabled = true;
                });

                juego.appendChild(
                    crearBoton("Siguiente", function() {
                        preguntaActual++;

                        if (preguntaActual < preguntas.length) {
                            mostrarPregunta();
                        } else {
                            mostrarVictoria();
                        }
                    })
                );
            } else {
                vidas--;

                juego.querySelector("p").textContent =
                    "Vidas: " + "❤️ ".repeat(vidas);

                boton.disabled = true;

                if (vidas === 0) {
                    mostrarDerrota();
                } else {
                    resultado.textContent = "Ups, intenta de nuevo";
                    resultado.style.color = "red";
                }
            }
        });

        opciones.appendChild(boton);
    });

    juego.appendChild(opciones);
    juego.appendChild(resultado);
}

function mostrarDerrota() {
    juego.innerHTML = "";

    juego.appendChild(
        crearElemento("h2", "Perdiste, suerte para la próxima")
    );

    juego.appendChild(
        crearBoton("Intentar de nuevo", reiniciarJuego)
    );
}

function mostrarVictoria() {
    juego.innerHTML = "";

    juego.appendChild(
        crearElemento("h2", "¡Excelente! Completaste las 5 preguntas")
    );

    juego.appendChild(
        crearBoton("Jugar de nuevo", reiniciarJuego)
    );
}

function reiniciarJuego() {
    preguntaActual = 0;
    vidas = 3;
    mostrarPregunta();
}

mostrarPregunta();
