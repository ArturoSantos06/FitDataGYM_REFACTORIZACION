import { useState } from 'react';
import QRCode from 'react-qr-code';
import { formatDate } from './membresiaFechas';

export default function TarjetaMembresia({
  membership,
  membershipType,
  userName,
  userId,
  qrCode,
  vigente,
  qrRef
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardRatio, setCardRatio] = useState(1.58);
  const [failedImage, setFailedImage] = useState(null);
  const image = membership.tipo?.image;
  const showImage = Boolean(image) && failedImage !== image;

  return (
    <div
      className="relative w-full max-w-2xl mx-auto cursor-pointer group"
      style={{ perspective: '1000px', aspectRatio: cardRatio }}
      onClick={() => setIsFlipped((flipped) => !flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-slate-900">
            {showImage ? (
              <img
                src={image}
                alt={membershipType}
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={(event) => {
                  const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
                  if (ratio > 0) setCardRatio(ratio);
                }}
                onError={() => setFailedImage(image)}
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-purple-900/20 to-blue-900/20" />
            )}

            {!isFlipped && (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10 pb-6">
                <div className="px-4 py-1.5 rounded-full border border-slate-600/50 bg-slate-800/80 backdrop-blur-md shadow-lg">
                  <p className="text-[10px] text-slate-200 font-bold tracking-widest uppercase">
                    Toca para ver QR
                  </p>
                </div>
              </div>
            )}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-linear-to-b from-purple-500 to-blue-500" />
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1e293b',
            borderColor: 'rgba(168, 85, 247, 0.4)'
          }}
        >
          <div
            className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between"
            style={{ background: 'linear-gradient(to bottom right, #0f172a, #1e293b)' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Miembro</p>
                <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{userName}</h3>
                <p className="text-[10px] sm:text-xs text-purple-400 font-mono">ID: {userId}</p>
              </div>
              <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${vigente ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {vigente ? 'ACTIVA' : 'VENCIDA'}
              </div>
            </div>

            <div className="flex items-end justify-between mt-2 sm:mt-4 gap-2 sm:gap-3">
              <div className="space-y-1 sm:space-y-2 shrink min-w-0">
                <div>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wide">Plan</p>
                  <p className="text-sm sm:text-base text-blue-300 font-semibold truncate">{membershipType}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-wide">Vencimiento</p>
                  <p className="text-sm sm:text-base text-white font-semibold">{formatDate(membership.end_date)}</p>
                </div>
              </div>

              <div ref={qrRef} className="bg-white p-1.5 sm:p-2 rounded-xl shadow-lg flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                <QRCode
                  size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={qrCode}
                  viewBox="0 0 256 256"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
            </div>

            <div className="mt-1.5 sm:mt-3 text-center">
              <p className="text-[8px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">Código manual:</p>
              <p className="text-xs sm:text-lg font-bold text-purple-400 tracking-wider font-mono">{qrCode}</p>
              <p className="text-[7px] sm:text-[10px] text-slate-600 mt-0 sm:mt-1">Este código es personal e intransferible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
