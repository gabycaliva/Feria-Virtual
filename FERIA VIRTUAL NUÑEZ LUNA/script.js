
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Tu formulario fue enviado correctamente");

        formulario.reset();
    });
});

