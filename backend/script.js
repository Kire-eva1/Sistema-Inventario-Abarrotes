const API_URL = "http://localhost:3000";

let authToken = localStorage.getItem("authToken");

// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            authToken = data.token;

            localStorage.setItem("authToken", authToken);

            document.getElementById("loginSection").style.display = "none";

            document.getElementById("productsSection").style.display = "block";

            cargarProductos();

            cargarCategorias();

            cargarProveedores();

        } else {

            alert(data.error);

        }

    } catch (error) {

        console.error(error);

        alert("Error de conexión");

    }

});

// ================= HEADERS =================

function getHeaders() {

    return {
        "Content-Type": "application/json",
        "Authorization": authToken
    };

}

// ================= CARGAR PRODUCTOS =================

async function cargarProductos() {

    try {

        const response = await fetch(`${API_URL}/productos`, {
            headers: getHeaders()
        });

        const productos = await response.json();

        const tbody = document.getElementById("productsTableBody");

        tbody.innerHTML = "";

        productos.forEach(producto => {

            const fila = `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre || ""}</td>
                    <td>${producto.categoria || ""}</td>
                    <td>${producto.proveedor || ""}</td>
                    <td>${producto.stock_actual || 0}</td>
                    <td>$${producto.precio_venta || 0}</td>
                    <td>${producto.fecha_vencimiento || ""}</td>
                    <td>
                        <button onclick="editarProducto(${producto.id})">
                            Editar
                        </button>

                        <button onclick="eliminarProducto(${producto.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;

            tbody.innerHTML += fila;

        });

    } catch (error) {

        console.error(error);

    }

}

// ================= CARGAR CATEGORIAS =================

async function cargarCategorias() {

    try {

        const response = await fetch(`${API_URL}/categorias`);

        const categorias = await response.json();

        const select = document.getElementById("productCategory");

        select.innerHTML = "";

        categorias.forEach(categoria => {

            select.innerHTML += `
                <option value="${categoria.id}">
                    ${categoria.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ================= CARGAR PROVEEDORES =================

async function cargarProveedores() {

    try {

        const response = await fetch(`${API_URL}/proveedores`);

        const proveedores = await response.json();

        const select = document.getElementById("productSupplier");

        select.innerHTML = "";

        proveedores.forEach(proveedor => {

            select.innerHTML += `
                <option value="${proveedor.id}">
                    ${proveedor.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ================= GUARDAR PRODUCTO =================

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const producto = {

        nombre: document.getElementById("productName").value,

        categoria_id: document.getElementById("productCategory").value,

        proveedor_id: document.getElementById("productSupplier").value,

        codigo_barras: "",

        sku: document.getElementById("productSku").value,

        precio_costo: parseFloat(document.getElementById("productCostPrice").value) || 0,

        precio_venta: parseFloat(document.getElementById("productSalePrice").value) || 0,

        stock_minimo: parseInt(document.getElementById("productMinStock").value) || 0,

        cantidad: 0,

        stock_actual: 0,

        descripcion: "",

        marca: "",

        numero_documento: "",

        fecha_elaboracion: document.getElementById("productManufactureDate").value || null,

        fecha_vencimiento: document.getElementById("productExpirationDate").value || null

    };

    try {

        const response = await fetch(`${API_URL}/productos`, {

            method: "POST",

            headers: getHeaders(),

            body: JSON.stringify(producto)

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            cargarProductos();

            productForm.reset();

        } else {

            alert(data.error);

        }

    } catch (error) {

        console.error(error);

        alert("Error al guardar");

    }

});

// ================= ELIMINAR PRODUCTO =================

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar producto?")) return;

    try {

        const response = await fetch(`${API_URL}/productos/${id}`, {

            method: "DELETE",

            headers: getHeaders()

        });

        const data = await response.json();

        alert(data.message);

        cargarProductos();

    } catch (error) {

        console.error(error);

    }

}

// ================= EDITAR PRODUCTO =================

async function editarProducto(id) {

    try {

        const response = await fetch(`${API_URL}/productos/${id}`, {

            headers: getHeaders()

        });

        const producto = await response.json();

        document.getElementById("productId").value = producto.id;

        document.getElementById("productName").value = producto.nombre;

        document.getElementById("productCategory").value = producto.categoria_id;

        document.getElementById("productSupplier").value = producto.proveedor_id;

        document.getElementById("productSku").value = producto.sku;

        document.getElementById("productCostPrice").value = producto.precio_costo;

        document.getElementById("productSalePrice").value = producto.precio_venta;

        document.getElementById("productMinStock").value = producto.stock_minimo;

        document.getElementById("productManufactureDate").value = producto.fecha_elaboracion;

        document.getElementById("productExpirationDate").value = producto.fecha_vencimiento;

        document.getElementById("productFormContainer").style.display = "block";

    } catch (error) {

        console.error(error);

    }

}

// ================= LOGOUT =================

const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", () => {

    localStorage.removeItem("authToken");

    location.reload();

});

// ================= AUTO LOGIN =================

window.onload = () => {

    if (authToken) {

        document.getElementById("loginSection").style.display = "none";

        document.getElementById("productsSection").style.display = "block";

        cargarProductos();

        cargarCategorias();

        cargarProveedores();

    }

};