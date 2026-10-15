// Usuarios de prueba para TECSELL

const usuarios = [
    {
        usuario: "admin",
        contrasena: "12345",
        pagina: "administrador/index.html"
    },
    {
        usuario: "almacenista",
        contrasena: "12345",
        pagina: "almacenista/index.html"
    },
    {
        usuario: "cliente",
        contrasena: "12345",
        pagina: "cliente/index.html"
    }
];

// Controlar el formulario de inicio de sesión

document.getElementById("formulario").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const usuarioIngresado = document
            .getElementById("usuario")
            .value
            .trim()
            .toLowerCase();

        const contrasenaIngresada = document
            .getElementById("contrasena")
            .value;

        const mensaje = document.getElementById("mensajeLogin");

        // Buscar las credenciales ingresadas

        const usuarioEncontrado = usuarios.find(function(usuario) {
            return usuario.usuario === usuarioIngresado &&
                   usuario.contrasena === contrasenaIngresada;
        });

        // Si los datos son correctos

        if (usuarioEncontrado) {

            mensaje.textContent = "Inicio de sesión correcto.";

            window.location.href = usuarioEncontrado.pagina;

        } else {

            mensaje.textContent = "Usuario o contraseña incorrectos.";
        }
    }
);