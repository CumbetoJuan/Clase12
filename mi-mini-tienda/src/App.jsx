import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import "./App.css";

export default function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find((item) => item.id === producto.id);

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id, cantidad = 1) {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      return;
    }

    setCarrito((carritoActual) =>
      carritoActual
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad - cantidad }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  }

  const cantidadTotal = carrito.reduce(
    (acumulado, producto) => acumulado + producto.cantidad,
    0
  );


  return (
    <BrowserRouter>
      <Layout cantidad={cantidadTotal}>
        <Routes>
          <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Products onAgregar={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={<Cart carrito={carrito} onQuitar={quitarDelCarrito} />}
          />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
