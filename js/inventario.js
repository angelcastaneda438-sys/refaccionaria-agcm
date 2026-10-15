var url = "https://script.google.com/macros/s/AKfycbyGqDClCo7Z50kxQKRzJgsxsux0_DZg-V_CGYDUumaE-eA7hYmmSaTER3bY1mbAoKEE/exec";

var productos = [];

fetch(url)
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("No se pudo consultar el inventario");
        }
        return respuesta.json();
    })
    .then(function(datos) {
        productos = datos;
        document.getElementById("mensaje").textContent =
            "Inventario cargado correctamente.";
        mostrarTodo();
    })
    .catch(function(error) {
        document.getElementById("mensaje").textContent =
            "Error al cargar el inventario. Revisa la conexión.";
        console.error(error);
    });

function mostrarTodo() {
    mostrarProductos(productos);
}

function mostrarBajoStock() {
    var filtrados = productos.filter(function(p) {
        return Number(p[1]) < 10;
    });
    mostrarProductos(filtrados);
}

function mostrarAltoStock() {
    var filtrados = productos.filter(function(p) {
        return Number(p[1]) > 20;
    });
    mostrarProductos(filtrados);
}

function obtenerPrecio(valor) {
    return Number(
        String(valor)
            .replace(/[$,\s]/g, "")
    );
}

function mostrarPrecioAlto() {
    var filtrados = productos.filter(function(p) {
        return obtenerPrecio(p[2]) > 1500;
    });
    mostrarProductos(filtrados);
}

function mostrarPrecioBajo() {
    var filtrados = productos.filter(function(p) {
        return obtenerPrecio(p[2]) < 1500;
    });
    mostrarProductos(filtrados);
}

function mostrarProductos(lista) {
    var contenedor = document.getElementById("productos");
    contenedor.replaceChildren();

    if (lista.length === 0) {
        contenedor.textContent = "No se encontraron productos.";
        return;
    }

    lista.forEach(function(producto) {
        var fila = document.createElement("p");

        fila.textContent =
            producto[0] +
            " | Stock: " + producto[1] +
            " | Precio: " +
            obtenerPrecio(producto[2]).toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN"
            });

        contenedor.appendChild(fila);
    });
}