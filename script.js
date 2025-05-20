const imagenes = [
    "./ex.png",      // Imagen de la portada y parte externa
    "./interior.png" // Imagen del contenido interno
];

let imagenCompleta;
let indiceActual = 0;
let anchoParte;

// Orden correcto basado en tu solicitud
const ordenTriptico = [2,3,4,5,0,1];  

function cargarImagen() {
    imagenCompleta = new Image();

    // Secciones 1, 2 y 3 provienen de ex.png, mientras que 4, 5 y 6 provienen de interior.png
    if (indiceActual >= 0 && indiceActual <= 2) {
        imagenCompleta.src = imagenes[0]; // Portada (Título, ¿Cómo nació la idea?, ¡Conócenos!)
    } else {
        imagenCompleta.src = imagenes[1]; // Interior (¿Por qué elegirnos?, Agradecimientos, Problemática)
    }

    imagenCompleta.onload = dividirImagen;
}

function dividirImagen() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    anchoParte = imagenCompleta.width / 3;
    canvas.width = anchoParte;
    canvas.height = imagenCompleta.height;

    mostrarSeccion();
}

function mostrarSeccion() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajustar la posición para que las secciones aparezcan en el orden correcto
    let posicion = ordenTriptico[indiceActual] % 3; 
    ctx.drawImage(imagenCompleta, -(posicion * anchoParte), 0);
}

function cambiarSeccion(direccion) {
    indiceActual = (indiceActual - direccion + 6) % 6; // Cambio la dirección de navegación
    cargarImagen();
}


cargarImagen();

function mostrarMenu() {
    document.getElementById("menu-lateral").classList.add("active");
}

// Cierra el menú al hacer clic fuera del área del menú
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu-lateral");
    const icono = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && event.target !== icono) {
        menu.classList.remove("active");
    }
});


