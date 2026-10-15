
var urlAdministrador = "https://script.google.com/macros/s/AKfycbxvHvgnuGisMhgLBQCSAKKdeNVpXyJp2T5fwHrzxb1dbNtQigLFGGR0mk_BdATC-vHP/exec";

document.getElementById("formProducto").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombreProducto").value.trim();
    var stockTexto = document.getElementById("stockProducto").value;
    var precioTexto = document.getElementById("precioProducto").value;

    var stock = Number(stockTexto);
    var precio = Number(precioTexto);

    var mensaje = document.getElementById("mensajeProducto");

    // Validar los datos
    if (
        nombre === "" ||
        stockTexto === "" ||
        precioTexto === "" ||
        !Number.isInteger(stock) ||
        stock < 0 ||
        !Number.isFinite(precio) ||
        precio < 0
    ) {
        mensaje.textContent = "Verifica los datos del producto.";
        return;
    }

    mensaje.textContent = "Enviando producto...";

    fetch(urlAdministrador, {
        method: "POST",
        body: JSON.stringify({
            accion: "agregar",
            nombre: nombre,
            stock: stock,
            precio: precio
        })
    })
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error en la solicitud al servidor.");
        }

        return respuesta.json();
    })
    .then(function(resultado) {
        if (resultado.success !== true) {
            throw new Error(
                resultado.mensaje || "No se pudo guardar el producto."
            );
        }

        mensaje.textContent = "¡Producto guardado correctamente!";

        document.getElementById("formProducto").reset();

        // Actualizar el inventario
        setTimeout(function() {
            location.reload();
        }, 1000);
    })
    .catch(function(error) {
        mensaje.textContent =
            "Error al guardar: " + error.message;

        console.error(error);
    });
});
