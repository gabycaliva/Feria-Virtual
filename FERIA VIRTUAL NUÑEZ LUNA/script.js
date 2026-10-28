
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
    
