import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ cantidad, children }) {
  return (
    <div className="app-layout">
      <NavBar cantidad={cantidad} />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}
