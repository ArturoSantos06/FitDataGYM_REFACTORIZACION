export default function EncabezadoAcceso({ titulo, subtitulo }) {
  return (
    <div className="mb-8 text-center">
      <img
        src="/fitdata-logo.png"
        alt="Logotipo de FitData"
        className="mx-auto mb-4 h-20 opacity-90"
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{titulo}</h1>
      {subtitulo && <p className="text-slate-400">{subtitulo}</p>}
    </div>
  );
}
