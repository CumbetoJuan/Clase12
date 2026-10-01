import { useState } from "react";

export default function Contact() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setEnviado(false);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(false);

    const nuevosErrores = {};
    const nombre = formulario.nombre.normalize("NFC").trim();

    if (!nombre) {
      nuevosErrores.nombre = "Ingresá tu nombre.";
    } else if (!/^[\p{L} ]+$/u.test(nombre)) {
      nuevosErrores.nombre = "El nombre solo puede contener letras y espacios.";
    } else if (nombre.replace(/ /g, "").length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 letras.";
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = "Ingresá tu email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())) {
      nuevosErrores.email = "Ingresá un email válido, por ejemplo: juan@gmail.com.";
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = "Ingresá un mensaje.";
    } else if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Confirmación local de la práctica: no se envía a un servidor.
    setEnviado(true);
    setFormulario({ nombre: "", email: "", mensaje: "" });
  }

  return (
    <section className="page-section contact-page">
      <div className="contact-layout">
        <div className="contact-copy">
          <div className="page-header">
            <p className="eyebrow">Hablemos</p>
            <h1>Contacto</h1>
            <p>Consultanos por nuestras zapatillas.</p>
          </div>
          <div className="contact-note">
            <span aria-hidden="true">💬</span>
            <strong>Dejanos tu consulta.</strong>
            <p>Completá tus datos y contanos qué zapatillas te interesan.</p>
          </div>
        </div>

        <div>
          <form className="contact-form" onSubmit={manejarEnvio} noValidate>
            <div className="form-field">
              <label className="field-label" htmlFor="contacto-nombre">Nombre</label>
              <input
                className="form-input"
                id="contacto-nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                value={formulario.nombre}
                onChange={manejarCambio}
                aria-required="true"
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "ayuda-nombre error-nombre" : "ayuda-nombre"}
                placeholder="Tu nombre"
              />
              <p id="ayuda-nombre" className="field-hint">Mínimo 3 letras. Sin números ni símbolos.</p>
              {errores.nombre && (
                <p id="error-nombre" role="alert" className="field-error">
                  {errores.nombre}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="contacto-email">Email</label>
              <input
                className="form-input"
                id="contacto-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formulario.email}
                onChange={manejarCambio}
                aria-required="true"
                aria-invalid={Boolean(errores.email)}
                aria-describedby={errores.email ? "error-email" : undefined}
                placeholder="tu@email.com"
              />
              {errores.email && (
                <p id="error-email" role="alert" className="field-error">
                  {errores.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="contacto-mensaje">Mensaje</label>
              <textarea
                className="form-input"
                id="contacto-mensaje"
                name="mensaje"
                rows={5}
                value={formulario.mensaje}
                onChange={manejarCambio}
                aria-required="true"
                aria-invalid={Boolean(errores.mensaje)}
                aria-describedby={errores.mensaje ? "ayuda-mensaje error-mensaje" : "ayuda-mensaje"}
                placeholder="Escribí tu consulta..."
              />
              <p id="ayuda-mensaje" className="field-hint">Mínimo 10 caracteres.</p>
              {errores.mensaje && (
                <p id="error-mensaje" role="alert" className="field-error">
                  {errores.mensaje}
                </p>
              )}
            </div>

            <button type="submit" className="button button-dark button-full">Enviar consulta</button>
          </form>

          {enviado && (
            <p role="status" className="form-success">
              Formulario validado correctamente.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
