
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
];


