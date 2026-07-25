import { Download } from 'lucide-react';
import { formatDate } from './membresiaFechas';

function drawText(ctx, text, y, font, color = '#000000') {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, 400, y);
}

async function downloadMembershipCard({ qrRef, userName, membershipType, endDate, userId }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  canvas.width = 800;
  canvas.height = 1200;
  context.textAlign = 'center';
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#000000';
  context.lineWidth = 6;
  context.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  const qrSvg = qrRef.current?.querySelector('svg');
  if (qrSvg) {
    const svgData = new XMLSerializer().serializeToString(qrSvg);
    const image = new Image();
    const url = URL.createObjectURL(new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' }));

    await new Promise((resolve, reject) => {
      image.onload = () => {
        context.drawImage(image, 150, 80, 500, 500);
        URL.revokeObjectURL(url);
        resolve();
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('No se pudo preparar el código QR'));
      };
      image.src = url;
    });
  }

  const lineY = 650;
  context.strokeStyle = '#000000';
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(50, lineY);
  context.lineTo(canvas.width - 50, lineY);
  context.stroke();

  const background = context.createLinearGradient(0, lineY + 20, 0, canvas.height - 50);
  background.addColorStop(0, '#f0f9ff');
  background.addColorStop(1, '#faf5ff');
  context.fillStyle = background;
  context.fillRect(50, lineY + 20, canvas.width - 100, canvas.height - lineY - 70);

  drawText(context, 'ACCESO', lineY + 100, 'bold 48px Arial, sans-serif');
  const textGradient = context.createLinearGradient(200, 0, canvas.width - 200, 0);
  textGradient.addColorStop(0, '#06b6d4');
  textGradient.addColorStop(0.5, '#3b82f6');
  textGradient.addColorStop(1, '#a855f7');
  context.fillStyle = textGradient;
  context.font = 'bold 56px Arial, sans-serif';
  context.fillText('FITDATA GYM', 400, lineY + 170);
  drawText(context, userName, lineY + 280, 'bold 52px Arial, sans-serif');

  context.strokeStyle = '#94a3b8';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(300, lineY + 310);
  context.lineTo(500, lineY + 310);
  context.stroke();

  drawText(context, `Plan: ${membershipType}`, lineY + 370, '28px Arial, sans-serif', '#64748b');
  drawText(context, `Vence: ${formatDate(endDate)}`, lineY + 410, '28px Arial, sans-serif', '#64748b');
  drawText(context, `ID: ${userId}`, lineY + 450, '28px Arial, sans-serif', '#64748b');

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Acceso-FitData-${userName.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export default function DescargaMembresia(props) {
  const handleDownload = async () => {
    try {
      await downloadMembershipCard(props);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl flex justify-center">
      <button
        onClick={handleDownload}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:scale-105 transform"
      >
        <Download size={24} className="group-hover:animate-bounce" />
        <span className="tracking-wide">Descargar Membresía con QR</span>
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </button>
    </div>
  );
}
