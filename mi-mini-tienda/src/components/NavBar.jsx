import { Link, NavLink } from "react-router-dom";

export default function NavBar({ cantidad }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Mi tienda de zapatillas, Inicio">
          <span className="brand-icon" aria-hidden="true">👟</span>
          <span><strong>Mi tienda</strong><small>Zapatillas</small></span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end className="nav-link">Inicio</NavLink>
          <NavLink to="/productos" className="nav-link">Productos</NavLink>
          <NavLink to="/carrito" className="nav-link">
            Carrito <span className="cart-count">{cantidad}</span>
          </NavLink>
          <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
        </nav>
      </div>
    </header>
  );
}
