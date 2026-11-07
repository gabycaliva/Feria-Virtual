const preguntas = [
    {
        tipo: "teorica",
        nombre: "Microsoft",
        pregunta: "¿Qué empresa desarrolló el sistema operativo Windows?",
        opciones: [
            "Microsoft",
            "Linux Foundation",
            "Google",
            "Apple"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Interface Manager",
        pregunta: "¿Cuál era el nombre original que Bill Gates tenía para el proyecto antes de llamarlo Windows?",
        opciones: [
            "Interface Manager",
            "Windows XP",
            "MicroSoft System",
            "Bliss"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Charles O'Rear",
        pregunta: "¿Quién tomó la famosa fotografía 'Bliss' que venía por defecto como fondo de pantalla en Windows XP?",
        opciones: [
            "Charles O'Rear",
            "Bill Gates",
            "Rowland Hanson",
            "Linus Torvalds"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Permite a los fabricantes de hardware crear sus propios controladores",
        pregunta: "¿Qué permite la característica de 'Arquitectura de Controladores Abierta' en Windows?",
        opciones: [
            "Permite a los fabricantes de hardware crear sus propios controladores",
            "Hacer que el sistema operativo sea totalmente gratuito",
            "Cambiar el pingüino de mascota",
            "Modificar el código fuente principal del kernel"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Un sistema operativo completamente gratuito y de código abierto",
        pregunta: "¿Qué es principalmente Linux frente a Windows?",
        opciones: [
            "Un sistema operativo completamente gratuito y de código abierto",
            "Un programa exclusivo de Microsoft para servidores",
            "Una aplicación de pago para celulares Android",
            "Una versión antigua de Windows"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Versiones armadas por distintas comunidades, empresas o programadores",
        pregunta: "¿Qué son las distribuciones o 'distros' de Linux (como Ubuntu o Fedora)?",
        opciones: [
            "Versiones armadas por distintas comunidades, empresas o programadores",
            "Un único sistema operativo cerrado elaborado por una sola empresa",
            "Herramientas exclusivas de pago para computadoras de escritorio",
            "Controladores de hardware de Windows"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Significa que el código del sistema operativo (o kernel) es público",
        pregunta: "¿Qué implica que Linux sea de 'Código abierto (Open Source)'?",
        opciones: [
            "Significa que el código del sistema operativo (o kernel) es público",
            "Que no se puede modificar bajo ninguna circunstancia",
            "Que solo los creadores originales pueden ver cómo está hecho por dentro",
            "Que viene precargado obligatoriamente con licencias costosas"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Tux",
        pregunta: "¿Cómo se llama la mascota oficial de Linux?",
        opciones: [
            "Tux",
            "Bliss",
            "Interface Manager",
            "BitLocker"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Android, SmartTVs y los servidores de grandes empresas como Google o Netflix",
        pregunta: "¿Dónde se utiliza Linux en la vida cotidiana sin que nos demos cuenta?",
        opciones: [
            "Android, SmartTVs y los servidores de grandes empresas como Google o Netflix",
            "Únicamente en computadoras viejas que ya no funcionan",
            "Solamente en la interfaz visual de Windows XP",
            "En las licencias de pago de Microsoft Office"
        ]
    },
    {
        tipo: "teorica",
        nombre: "Facilita la detección y configuración automática de nuevos dispositivos de hardware al conectarlos",
        pregunta: "¿Qué función cumple la compatibilidad Plug and Play (PnP) en Windows?",
        opciones: [
            "Facilita la detección y configuración automática de nuevos dispositivos de hardware al conectarlos",
            "Permite modificar el núcleo del sistema operativo libremente",
            "Cambia el fondo de pantalla automáticamente por una fotografía real",
            "Evita que se requiera reiniciar la computadora constantemente"
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