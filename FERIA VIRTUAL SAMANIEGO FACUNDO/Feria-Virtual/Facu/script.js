document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Tu formulario fue enviado correctamente");

        formulario.reset();
    });
});




const preguntasOriginales = [
    {
        pregunta: "1. ¿Qué significa IA?",
        imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
        opciones: ["Internet Avanzado", "Inteligencia Artificial", "Información Automática"],
        correcta: 1,
        explicacion: "IA significa Inteligencia Artificial."
    },
    {
        pregunta: "2. ¿Cómo ayuda la IA en la escuela?",
        imagen: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
        opciones: ["Ayuda a estudiar", "Elimina todas las tareas", "Reemplaza todos los libros"],
        correcta: 0,
        explicacion: "Puede explicar temas y ayudar a aprender."
    },
    {
        pregunta: "3. ¿La IA puede equivocarse?",
        imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        opciones: ["Nunca", "Sí, puede equivocarse", "Solo sin Internet"],
        correcta: 1,
        explicacion: "Puede generar información incorrecta."
    },
    {
        pregunta: "4. ¿Cuál puede utilizar IA?",
        imagen: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
        opciones: ["Un lápiz", "Una regla", "Un robot inteligente"],
        correcta: 2,
        explicacion: "Algunos robots usan IA para realizar tareas."
    },
    {
        pregunta: "5. ¿Para qué se usa la IA en medicina?",
        imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        opciones: ["Analizar imágenes médicas", "Reemplazar a todos los médicos", "Evitar todas las enfermedades"],
        correcta: 0,
        explicacion: "Puede ayudar a analizar imágenes médicas."
    },
    {
        pregunta: "6. ¿Qué utiliza la IA para aprender patrones?",
        imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        opciones: ["La suerte", "Los datos", "Los colores solamente"],
        correcta: 1,
        explicacion: "Muchos sistemas de IA aprenden analizando datos."
    },
    {
        pregunta: "7. ¿Qué puede crear la IA generativa?",
        imagen: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
        opciones: ["Solo objetos físicos", "Solo números", "Textos e imágenes"],
        correcta: 2,
        explicacion: "Puede generar textos, imágenes y otros contenidos."
    },
    {
        pregunta: "8. ¿Cómo se usa la IA en videojuegos?",
        imagen: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80",
        opciones: ["Para mejorar personajes y sistemas", "Para eliminar todos los controles", "Para impedir que se juegue"],
        correcta: 0,
        explicacion: "Puede controlar comportamientos de personajes."
    },
    {
        pregunta: "9. ¿Cuál es un riesgo de la IA?",
        imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        opciones: ["Que siempre tenga razón", "Que genere información falsa", "Que nunca procese datos"],
        correcta: 1,
        explicacion: "Hay que verificar la información que proporciona."
    },
    {
        pregunta: "10. ¿Cómo debemos usar la IA?",
        imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        opciones: ["Creer todo lo que dice", "Dejar que decida todo", "Usarla como ayuda y pensar"],
        correcta: 2,
        explicacion: "Es una herramienta de ayuda, no reemplaza nuestro pensamiento."
    }
];

let preguntas = [];
let indice = 0;
let puntos = 0;
let respondida = false;

const pregunta = document.getElementById("pregunta");
const imagen = document.getElementById("imagen-pregunta");
const opciones = document.getElementById("opciones");
const resultado = document.getElementById("resultado");
const puntaje = document.getElementById("puntaje");
const numeroPregunta = document.getElementById("numero-pregunta");
const siguiente = document.getElementById("siguiente");
const reiniciar = document.getElementById("reiniciar");

// Mezcla las preguntas al azar.
function mezclarPreguntas(lista) {
    const mezcla = [...lista];

    for (let i = mezcla.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezcla[i], mezcla[j]] = [mezcla[j], mezcla[i]];
    }

    return mezcla;
}

function mostrarPregunta() {
    respondida = false;
    const actual = preguntas[indice];

    numeroPregunta.textContent =
        `Pregunta ${indice + 1} de ${preguntas.length}`;

    pregunta.textContent = actual.pregunta;
    imagen.src = actual.imagen;
    imagen.alt = actual.pregunta;

    opciones.innerHTML = "";
    resultado.textContent = "";
    siguiente.hidden = true;
    reiniciar.hidden = true;

    actual.opciones.forEach((opcion, i) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.type = "button";

        boton.addEventListener("click", () => {
            comprobarRespuesta(i);
        });

        opciones.appendChild(boton);
    });

    puntaje.textContent = `Puntos: ${puntos}`;
}

function comprobarRespuesta(seleccion) {
    if (respondida) return;
    respondida = true;

    const actual = preguntas[indice];

    opciones.querySelectorAll("button").forEach(boton => {
        boton.disabled = true;
    });

    if (seleccion === actual.correcta) {
        puntos++;
        resultado.textContent = "¡Correcto!  " + actual.explicacion;
    } else {
        resultado.textContent = "¡Casi!  " + actual.explicacion;
    }

    puntaje.textContent = `Puntos: ${puntos}`;

    if (indice < preguntas.length - 1) {
        siguiente.hidden = false;
    } else {
        mostrarFinal();
    }
}

function mostrarFinal() {
    numeroPregunta.textContent = "¡Juego terminado!";
    pregunta.textContent = " Tu resultado final";

    imagen.src =
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80";
    imagen.alt = "Celebración por terminar el juego";

    opciones.innerHTML = "";
    resultado.textContent =
        `Obtuviste ${puntos} de 10 puntos. ` +
        (puntos === 10
            ? "¡Excelente! ¡Sabés muchísimo sobre IA!"
            : puntos >= 6
                ? "¡Muy bien! Seguí aprendiendo."
                : "¡Buen intento! Podés jugar de nuevo.");

    siguiente.hidden = true;
    reiniciar.hidden = false;
}

siguiente.addEventListener("click", () => {
    indice++;
    mostrarPregunta();
});

reiniciar.addEventListener("click", iniciarJuego);

function iniciarJuego() {
    preguntas = mezclarPreguntas(preguntasOriginales);
    indice = 0;
    puntos = 0;
    mostrarPregunta();
}

iniciarJuego();
