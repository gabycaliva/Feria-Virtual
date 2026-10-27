document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    if (!formulario){
        alert("no se encontró el formulario");
        return;
    }

    formulario.addEventListener("submit", function(event){
    event.preventDefault();
    alert("Tu formulario fue enviado corectamente");
    formulario.reset ();
    });
});


