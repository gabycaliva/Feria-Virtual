
const preguntas = [
    {
        tipo: "teorica",
        nombre: "Una red informatica",
        pregunta: "¿Qué es el Internet?",
        opciones: [
            "Una red informatica",
            "Wi-Fi",
            "Una app de Google",
            "Un programa"
        ]
    },
    {
        tipo: "teorica",
        nombre: "La parte de internet que se encuentra en buscadores como Google",
        pregunta: "¿Qué es la Surface web?",
        opciones: [
            "La parte oculta de internet donde se usan buscadores especiales",
            "La parte de internet que se encuentra en buscadores como Google",
            "Una red privada para hackers",
            "Un tipo de Wi-Fi"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Es el conjunto de contenidos de internet que no están indexados por los motores de búsqueda convencionales",
        pregunta: "¿Qué es la Deep web?",
        opciones: [
            "La parte ilegal de internet",
            "Una página para buscar juegos",
            "Un programa para crear juegos",
            "Es el conjunto de contenidos de internet que no están indexados por los motores de búsqueda convencionales"
        ]
    
    },
    {
        tipo: "teorica",
        nombre: "Todas son correctas",
        pregunta: "¿Cuáles son las caracteristicas de la Deep web?",
        opciones: [
            "Todas son correctas",
            "Representa aproximadamente el 90 % de todo el contenido de internet.",
            "Lo usamos cotidianamente",
            "Es completamente legal"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Que te roben informacion personal o te instalen virus",
        pregunta: "¿Cuáles son los riesgos de navegar por Internet?",
        opciones: [
            "Que te roben informacion personal o te instalen virus",
            "Que se te gaste la bateria",
            "Que el Wi-Fi ande más lento",
            "Que te roben contactos si no tenes internet"
        ]
    },
    {
         tipo: "teorica",
        nombre: "Usar contraseñas seguras, no hacer clic en links sospechosos y activar la verificación en 2 pasos",
        pregunta: "¿Cómo navegar de forma segura?",
        opciones: [
            "Usar contraseñas seguras, no hacer clic en links sospechosos y activar la verificación en 2 pasos",
            "usar la misma contraseña para todo",
            "Pasar tus datos personales",
            "Entrar a páginas desconocidas"
        ]
        
    },
    {
        tipo: "teorica",
        nombre: "Es la parte anónima y oculta de internet a la que se entra con el navegador Tor",
        pregunta: "¿Qué es la Dark web?",
        opciones: [
            "Es la parte anónima y oculta de internet a la que se entra con el navegador Tor",
            "La parte de internet que aparece en Google",
            "Tu cuenta de Gmail es un tipo de Dark web",
            "Una aplicacion"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Es el conjunto de contenidos de internet que no están indexados por los motores de búsqueda convencionales",
        pregunta: "¿Cuál de estos ejemplo es de Deep web?",
        opciones: [
            "La cuenta de Gmail",
            "YouTube",
            "Google",
            "Una página de noticias públicas"
        ]
    },
    {
         tipo: "teorica",
        nombre: "Todas son correctas",
        pregunta: "¿Qué hacer si estas conectado a un Wi-Fi público?",
        opciones: [
            "No entrar a cuentas personales",
            "Advanced Transfer Express",
            "Automated Thermal Exchange",
            "Active Transistor Xtreme"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Porque Google no puede entrar a las páginas que piden contraseñas o permisos",
        pregunta: "¿Por qué la Deep web no aparece en google?",
        opciones: [
            "Porque Google no puede entrar a las páginas que piden contraseñas o permisos",
            "Porque la Deep web hay que instalarla",
            "Depende del país",
            "Prque la Deep web es ilegal"
        ]
    }
];

let indice = 0;
let puntaje = 0;
let aciertos = 0;
let respondida = false;

const imagen = document.getElementById("imagen-componente");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");


function mezclar(mezcla) {
    const copia = [...mezcla];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


function mostrarPregunta() {
    respondida = false;

    const actual = preguntas[indice];

    document.getElementById("numero-pregunta").textContent =
        indice + 1;

    document.getElementById("puntaje").textContent = puntaje;

    document.getElementById("barra-progreso").style.width =
        ((indice + 1) / preguntas.length * 100) + "%";

    const contenedorImagen = document.getElementById("contenedor-imagen");
    const preguntaTeorica = document.getElementById("pregunta-teorica");

    if (actual.tipo === "teorica") {
        contenedorImagen.classList.add("oculto");
        preguntaTeorica.classList.remove("oculto");
        preguntaTeorica.textContent = actual.pregunta;
    } else {
        contenedorImagen.classList.remove("oculto");
        preguntaTeorica.classList.add("oculto");

        imagen.onerror = () => {
            imagen.onerror = null;
            imagen.src =
                "https://placehold.co/500x300/e2e8f0/1e293b?text=Imagen+no+disponible";
        };

        imagen.src = actual.imagen;
        imagen.alt = "Componente de hardware";
    }

    if (actual.tipo !== "teorica") {
        document.getElementById("pregunta").textContent =
            "¿Qué componente aparece en la imagen?";
    } else {
        document.getElementById("pregunta").textContent =
            "Pregunta teórica";
    }

    mensaje.textContent = "";
    opciones.innerHTML = "";

    mezclar(actual.opciones).forEach(nombre => {
        const boton = document.createElement("button");

        boton.className = "opcion";
        boton.textContent = nombre;

        boton.addEventListener("click", () => {
            comprobarRespuesta(nombre, boton);
        });

        opciones.appendChild(boton);
    });
}


function comprobarRespuesta(respuesta, botonElegido) {
    if (respondida) return;

    respondida = true;

    const correcta = preguntas[indice].nombre;
    const botones = opciones.querySelectorAll("button");

    botones.forEach(boton => {
        boton.disabled = true;

        if (boton.textContent === correcta) {
            boton.classList.add("correcta");
        }
    });

    if (respuesta === correcta) {
        puntaje += 10;
        aciertos++;

        mensaje.textContent = "✅ ¡Correcto! +10 puntos";
        mensaje.style.color = "#4ade80";
    } else {
        puntaje -= 10;
        botonElegido.classList.add("incorrecta");

        mensaje.textContent =
            "❌ Incorrecto. -10 puntos. Era: " + correcta;

        mensaje.style.color = "#f87171";
    }

    document.getElementById("puntaje").textContent = puntaje;

    
    setTimeout(() => {
        indice++;

        if (indice < preguntas.length) {
            mostrarPregunta();
        } else {
            finalizarJuego();
        }
    }, 1300);
}



function finalizarJuego() {
    document.getElementById("juego").classList.add("oculto");
    document.getElementById("resultado").classList.remove("oculto");

    document.getElementById("puntaje-final").textContent =
        puntaje + " puntos";

    const estado = puntaje >= 60 ? "¡APROBADO!" : "DESAPROBADO";
    const color = puntaje >= 60 ? "#4ade80" : "#f87171";

    document.getElementById("resumen").innerHTML =
        "<strong style='font-size: 28px; color: " + color + ";'>" +
        estado + "</strong><br><br>" +
        "Respuestas correctas: " + aciertos + " de 10<br>" +
        "Respuestas incorrectas: " + (10 - aciertos);
}



function reiniciarJuego() {
    indice = 0;
    puntaje = 0;
    aciertos = 0;
    respondida = false;

    document.getElementById("juego").classList.remove("oculto");
    document.getElementById("resultado").classList.add("oculto");

    mostrarPregunta();
}


document.getElementById("reiniciar").addEventListener(
    "click",
    reiniciarJuego
);


mostrarPregunta();
