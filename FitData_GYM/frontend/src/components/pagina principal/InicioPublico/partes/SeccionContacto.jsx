import { memo } from 'react';
import useFormularioContacto from '../hooks/useFormularioContacto';

function SeccionContacto() {
  const { formData, sending, message, handleChange, handleSubmit } = useFormularioContacto();

  return (
    <section id="contact" className="py-24 bg-gray-800 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide uppercase">Contáctanos</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        </div>

        <div className="w-full h-80 bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-12 border border-gray-700 hover:grayscale-0 transition-all duration-500">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación FitData GYM"
            src="https://maps.google.com/maps?q=Av.+Resurgimiento+611,+Bosques+de+Campeche,+San+Francisco+de+Campeche&t=&z=15&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-bold ${
              message.includes('exitosamente')
                ? 'bg-green-500/20 border border-green-500 text-green-400'
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Tu Mensaje *"
              required
              className="w-full h-full min-h-[200px] bg-gray-800 border border-white rounded-lg p-4 text-white placeholder-white  focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            ></textarea>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre(s) *"
                required
                className="w-full bg-gray-800 border border-white rounded-lg p-4 text-white placeholder-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Apellidos"
                className="w-full bg-gray-800 border border-white rounded-lg p-4 text-white placeholder-white  focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono Móvil"
                className="w-full bg-gray-800 border border-white rounded-lg p-4 text-white placeholder-white  focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico *"
                required
                className="w-full bg-gray-800 border border-white rounded-lg p-4 text-white placeholder-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black tracking-widest uppercase py-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default memo(SeccionContacto);
