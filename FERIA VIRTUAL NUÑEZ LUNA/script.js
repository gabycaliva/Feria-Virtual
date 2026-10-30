
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
        pregunta: "¿Qué amenaza puede propagarse entre equipos?",
        opciones: ["Gusano", "Spyware", "Adware"],
        correcta: "Gusano"
    },
    {
        imagen: "imagenes/imagen.phishing.png",
        pregunta: "¿Qué es el phishing?",
        opciones: [
            "Un engaño para robar información",
            "Un juego",
            "Una página de noticias"
        ],
        correcta: "Un engaño para robar información"
    },
    {
        imagen: "imagenes/imagen.spyware.jfif",
        pregunta: "¿Qué puede hacer el spyware?",
        opciones: [
            "Espiar la actividad del usuario",
            "Mejorar la computadora",
            "Crear documentos"
        ],
        correcta: "Espiar la actividad del usuario"
    },
    {
        imagen: "imagenes/imagen.troyano.jfif",
        pregunta: "¿Qué característica tiene un troyano?",
        opciones: [
            "Se disfraza de un programa confiable",
            "Es una página web",
            "Es un componente físico"
        ],
        correcta: "Se disfraza de un programa confiable"
    },
    {
        imagen: "imagenes/imagen.adware.jpg",
        pregunta: "¿Qué deberías hacer si aparecen anuncios sospechosos constantemente?",
        opciones: [
            "Ignorar todos los riesgos",
            "Revisar si hay programas no deseados",
            "Compartir tus contraseñas"
        ],
        correcta: "Revisar si hay programas no deseados"
    },
    {
        imagen: "imagenes/imagen.gusanos.jfif",
        pregunta: "¿Cómo puede propagarse un gusano informático?",
        opciones: [
            "A través de redes o equipos",
            "Solo mediante papel",
            "Por una pantalla apagada"
        ],
        correcta: "A través de redes o equipos"
    },
    {
        imagen: "imagenes/imagen.phishing.png",
        pregunta: "¿Qué conviene hacer ante un correo sospechoso?",
        opciones: [
            "Abrir todos sus enlaces",
            "Enviar datos personales",
            "Verificar quién lo envió"
        ],
        correcta: "Verificar quién lo envió"
    },
    {
        imagen: "imagenes/imagen.spyware.jfif",
        pregunta: "¿Cómo podés reducir el riesgo de spyware?",
        opciones: [
            "Instalando archivos desconocidos",
            "Descargando programas de fuentes confiables",
            "Compartiendo tus datos"
        ],
        correcta: "Descargando programas de fuentes confiables"
    },
    {
        imagen: "imagenes/imagen.troyano.jfif",
        pregunta: "¿Cómo podés evitar un troyano?",
        opciones: [
            "Abriendo cualquier archivo",
            "Desactivando la seguridad",
            "Evitando programas y archivos sospechosos"
        ],
        correcta: "Evitando programas y archivos sospechosos"
    }
];

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
    imagen.style.display = "block";

    pregunta.textContent = actual.pregunta;
    pregunta.style.display = "block";

    opciones.innerHTML = "";
    opciones.style.display = "flex";

    resultado.textContent = "";
    resultado.style.display = "block";

    siguiente.disabled = true;
    siguiente.textContent = "Siguiente pregunta";
    siguiente.style.display = "inline-block";

    final.classList.add("oculto");

    const alternativas = [...actual.opciones];

    alternativas.sort(() => Math.random() - 0.5);

    alternativas.forEach(function(opcion) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.textContent = opcion;

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
        resultado.textContent = "¡Correcto! Sumaste un punto.";
        resultado.style.color = "green";
    } else {
        botonElegido.classList.add("incorrecta");

        resultado.textContent =
            "Incorrecto. La respuesta correcta era: " +
            actual.correcta + ".";

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
    puntaje.textContent = "Puntos: " + puntos + " de 10";

    if (puntos >= 6) {
        mensajeFinal.textContent = "¡APROBADO!";
        mensajeFinal.className = "aprobado";

        detalleFinal.textContent =
            "¡Felicitaciones! Obtuviste " + puntos + " de 10 puntos.";

        detalleFinal.className = "aprobado";
        puntaje.className = "aprobado";
    } else {
        mensajeFinal.textContent = "DESAPROBADO. ¡Intentá otra vez!";

        detalleFinal.textContent =
            "Obtuviste " + puntos + " de 10 puntos. ¡Seguí practicando!";

        mensajeFinal.className = "desaprobado";
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


reiniciar.addEventListener("click", function() {
    indice = 0;
    puntos = 0;
    respondida = false;

    mostrarPregunta();
});


mostrarPregunta();




const preguntasAntivirus = [
    {
        pregunta: "¿Qué es un antivirus?",
        opciones: [
            "Un programa que protege los dispositivos",
            "Un tipo de videojuego",
            "Una red social"
        ],
        correcta: "Un programa que protege los dispositivos"
    },
    {
        pregunta: "¿Cuál es la función principal de un antivirus?",
        opciones: [
            "Crear archivos",
            "Detectar y eliminar amenazas informáticas",
            "Aumentar el volumen del equipo"
        ],
        correcta: "Detectar y eliminar amenazas informáticas"
    },
    {
        pregunta: "¿Por qué es importante actualizar un antivirus?",
        opciones: [
            "Para reconocer nuevas amenazas",
            "Para cambiar el color de la pantalla",
            "Para borrar los programas"
        ],
        correcta: "Para reconocer nuevas amenazas"
    },
    {
        pregunta: "¿Qué puede detectar un antivirus?",
        opciones: [
            "Solamente imágenes",
            "Únicamente documentos",
            "Virus y otros programas maliciosos"
        ],
        correcta: "Virus y otros programas maliciosos"
    },
    {
        pregunta: "¿Qué es un análisis del antivirus?",
        opciones: [
            "Una revisión del dispositivo para buscar amenazas",
            "Una búsqueda de juegos",
            "Una actualización de la pantalla"
        ],
        correcta: "Una revisión del dispositivo para buscar amenazas"
    },
    {
        pregunta: "¿Qué debés hacer si el antivirus detecta una amenaza?",
        opciones: [
            "Ignorar la advertencia",
            "Seguir las recomendaciones del antivirus",
            "Compartir el archivo"
        ],
        correcta: "Seguir las recomendaciones del antivirus"
    },
    {
        pregunta: "¿Un antivirus puede proteger contra todos los ataques?",
        opciones: [
            "Sí, siempre",
            "No, la protección no es absoluta",
            "Sí, aunque esté desactualizado"
        ],
        correcta: "No, la protección no es absoluta"
    },
    {
        pregunta: "¿Qué es la cuarentena de un antivirus?",
        opciones: [
            "Un espacio donde se aíslan archivos sospechosos",
            "Una carpeta de fotografías",
            "Un programa para descargar música"
        ],
        correcta: "Un espacio donde se aíslan archivos sospechosos"
    },
    {
        pregunta: "¿Qué puede pasar si desactivás el antivirus?",
        opciones: [
            "El dispositivo queda más protegido",
            "Aumenta el riesgo de sufrir infecciones",
            "Se eliminan todos los virus automáticamente"
        ],
        correcta: "Aumenta el riesgo de sufrir infecciones"
    },
    {
        pregunta: "¿Cuál es un buen hábito de seguridad informática?",
        opciones: [
            "Descargar archivos de cualquier página",
            "Compartir contraseñas",
            "Mantener actualizado el antivirus"
        ],
        correcta: "Mantener actualizado el antivirus"
    }
];

let indiceAntivirus = 0;
let puntosAntivirus = 0;
let respondidaAntivirus = false;

const progresoAntivirus = document.getElementById("progreso-antivirus");
const puntajeAntivirus = document.getElementById("puntaje-antivirus");
const preguntaAntivirus = document.getElementById("pregunta-antivirus");
const opcionesAntivirus = document.getElementById("opciones-antivirus");
const resultadoAntivirus = document.getElementById("resultado-antivirus");
const siguienteAntivirus = document.getElementById("siguiente-antivirus");
const finalAntivirus = document.getElementById("final-antivirus");
const mensajeFinalAntivirus = document.getElementById("mensaje-final-antivirus");
const detalleFinalAntivirus = document.getElementById("detalle-final-antivirus");
const reiniciarAntivirus = document.getElementById("reiniciar-antivirus");

function mostrarPreguntaAntivirus() {
    const actual = preguntasAntivirus[indiceAntivirus];

    respondidaAntivirus = false;

    progresoAntivirus.textContent =
        "Pregunta " + (indiceAntivirus + 1) + " de 10";

    puntajeAntivirus.textContent = "Puntos: " + puntosAntivirus;
    puntajeAntivirus.className = "";

    preguntaAntivirus.textContent = actual.pregunta;

    opcionesAntivirus.innerHTML = "";
    resultadoAntivirus.textContent = "";
    siguienteAntivirus.disabled = true;
    siguienteAntivirus.textContent = "Siguiente pregunta";

    finalAntivirus.classList.add("oculto");

    const alternativas = [...actual.opciones];

    alternativas.sort(() => Math.random() - 0.5);

    alternativas.forEach(function(opcion) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.textContent = opcion;

        boton.addEventListener("click", function() {
            comprobarRespuestaAntivirus(opcion, boton);
        });

        opcionesAntivirus.appendChild(boton);
    });
}

function comprobarRespuestaAntivirus(opcionElegida, botonElegido) {
    if (respondidaAntivirus) {
        return;
    }

    respondidaAntivirus = true;

    const actual = preguntasAntivirus[indiceAntivirus];
    const botones = opcionesAntivirus.querySelectorAll("button");

    botones.forEach(function(boton) {
        boton.disabled = true;

        if (boton.textContent === actual.correcta) {
            boton.classList.add("correcta");
        }
    });

    if (opcionElegida === actual.correcta) {
        puntosAntivirus++;

        resultadoAntivirus.textContent =
            "¡Correcto! Sumaste un punto.";
        resultadoAntivirus.style.color = "green";
    } else {
        botonElegido.classList.add("incorrecta");

        resultadoAntivirus.textContent =
            "Incorrecto. La respuesta correcta era: " +
            actual.correcta;

        resultadoAntivirus.style.color = "red";
    }

    puntajeAntivirus.textContent = "Puntos: " + puntosAntivirus;

    siguienteAntivirus.disabled = false;

    if (indiceAntivirus === preguntasAntivirus.length - 1) {
        siguienteAntivirus.textContent = "Ver resultado final";
    }
}

function terminarJuegoAntivirus() {
    preguntaAntivirus.style.display = "none";
    opcionesAntivirus.style.display = "none";
    resultadoAntivirus.style.display = "none";
    siguienteAntivirus.style.display = "none";

    finalAntivirus.classList.remove("oculto");

    puntajeAntivirus.textContent =
        "Puntos: " + puntosAntivirus + " de 10";

    if (puntosAntivirus >= 6) {
        mensajeFinalAntivirus.textContent = "¡APROBADO!";
        detalleFinalAntivirus.textContent =
            "¡Felicitaciones! Obtuviste " +
            puntosAntivirus + " de 10 puntos.";

        mensajeFinalAntivirus.className = "aprobado";
        detalleFinalAntivirus.className = "aprobado";
        puntajeAntivirus.className = "aprobado";
    } else {
        mensajeFinalAntivirus.textContent =
            "DESAPROBADO. ¡Intentá otra vez!";

        detalleFinalAntivirus.textContent =
            "Obtuviste " + puntosAntivirus +
            " de 10 puntos. ¡Seguí practicando!";

        mensajeFinalAntivirus.className = "desaprobado";
        detalleFinalAntivirus.className = "desaprobado";
        puntajeAntivirus.className = "desaprobado";
    }
}

siguienteAntivirus.addEventListener("click", function() {
    if (!respondidaAntivirus) {
        return;
    }

    indiceAntivirus++;

    if (indiceAntivirus < preguntasAntivirus.length) {
        mostrarPreguntaAntivirus();
    } else {
        terminarJuegoAntivirus();
    }
});

reiniciarAntivirus.addEventListener("click", function() {
    indiceAntivirus = 0;
    puntosAntivirus = 0;

    preguntaAntivirus.style.display = "block";
    opcionesAntivirus.style.display = "block";
    resultadoAntivirus.style.display = "block";
    siguienteAntivirus.style.display = "inline-block";

    mostrarPreguntaAntivirus();
});

mostrarPreguntaAntivirus();
            
