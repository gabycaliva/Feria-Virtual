const formularioContacto = document.getElementById("formularioContacto");

if (formularioContacto) {
    const respuestaFormulario = document.getElementById("respuestaFormulario");

    formularioContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = formularioContacto.elements.nombre.value.trim();
        const mensaje = formularioContacto.elements.mensaje.value.trim();

        if (nombre === "" || mensaje === "") {
            respuestaFormulario.textContent = "Completá tu nombre y tu mensaje antes de enviar.";
        } else {
            respuestaFormulario.textContent = "¡Gracias, " + nombre + "! Tu mensaje quedó listo. Este formulario de práctica no envía datos.";
            formularioContacto.reset();
        }
    });
}

const preguntaJuego = document.getElementById("preguntaJuego");
const opcionesJuego = document.getElementById("opcionesJuego");
const resultadoJuego = document.getElementById("resultadoJuego");
const puntajeJuego = document.getElementById("puntajeJuego");
const botonSiguiente = document.getElementById("siguientePregunta");

if (preguntaJuego && opcionesJuego && resultadoJuego && puntajeJuego && botonSiguiente) {
    const preguntas = [
        {
            situacion: "Querés jugar en una computadora a un videojuego creado para una consola antigua. ¿Qué usarías?",
            opciones: ["Un emulador", "Una máquina virtual"],
            correcta: "Un emulador",
            explicacion: "¡Bien! El emulador imita el funcionamiento de la consola."
        },
        {
            situacion: "Querés probar Linux dentro de una computadora que ya usa Windows. ¿Qué usarías?",
            opciones: ["Un emulador", "Una máquina virtual"],
            correcta: "Una máquina virtual",
            explicacion: "¡Correcto! La máquina virtual crea una computadora dentro de otra."
        },
        {
            situacion: "Querés abrir en la computadora una aplicación hecha para Android. ¿Qué usarías?",
            opciones: ["Un emulador", "Una máquina virtual"],
            correcta: "Un emulador",
            explicacion: "¡Exacto! El emulador reproduce el entorno de otro dispositivo."
        },
        {
            situacion: "Necesitás un entorno separado para probar otro sistema operativo sin cambiar el principal. ¿Qué usarías?",
            opciones: ["Un emulador", "Una máquina virtual"],
            correcta: "Una máquina virtual",
            explicacion: "¡Muy bien! Una máquina virtual permite probar otro sistema en un entorno separado."
        }
    ];

    let indicePregunta = 0;
    let puntos = 0;

    function mostrarPregunta() {
        const pregunta = preguntas[indicePregunta];
        preguntaJuego.textContent = pregunta.situacion;
        resultadoJuego.textContent = "";
        puntajeJuego.textContent = "Pregunta " + (indicePregunta + 1) + " de " + preguntas.length + " · Puntaje: " + puntos;
        opcionesJuego.replaceChildren();
        botonSiguiente.disabled = true;
        botonSiguiente.textContent = "Siguiente pregunta";

        pregunta.opciones.forEach(function (opcion) {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.textContent = opcion;
            boton.addEventListener("click", function () {
                const botones = opcionesJuego.querySelectorAll("button");
                botones.forEach(function (elemento) { elemento.disabled = true; });

                if (opcion === pregunta.correcta) {
                    puntos += 1;
                    resultadoJuego.textContent = pregunta.explicacion;
                } else {
                    resultadoJuego.textContent = "Casi. La respuesta correcta es: " + pregunta.correcta + ". " + pregunta.explicacion;
                }

                puntajeJuego.textContent = "Pregunta " + (indicePregunta + 1) + " de " + preguntas.length + " · Puntaje: " + puntos;
                botonSiguiente.disabled = false;
            });
            opcionesJuego.appendChild(boton);
        });
    }

    botonSiguiente.addEventListener("click", function () {
        indicePregunta += 1;

        if (indicePregunta < preguntas.length) {
            mostrarPregunta();
        } else if (indicePregunta === preguntas.length) {
            preguntaJuego.textContent = "¡Terminaste el reto!";
            opcionesJuego.replaceChildren();
            resultadoJuego.textContent = "Obtuviste " + puntos + " de " + preguntas.length + " respuestas correctas. ¡Gracias por aprender jugando!";
            puntajeJuego.textContent = "Reto completo";
            botonSiguiente.textContent = "Jugar de nuevo";
        } else {
            indicePregunta = 0;
            puntos = 0;
            mostrarPregunta();
        }
    });

    mostrarPregunta();
}

