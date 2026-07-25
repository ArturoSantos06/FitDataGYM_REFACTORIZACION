import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import OcupacionGym from './OcupacionGym';
import DescargaMembresia from './membresia/DescargaMembresia';
import TarjetaMembresia from './membresia/TarjetaMembresia';
import VigenciaMembresia from './membresia/VigenciaMembresia';
import useMembresiaData from './membresia/useMembresiaData';
import {
  isDayPassMembership,
  isMembershipValid
} from './membresia/membresiaFechas';

function EmptyMembership() {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 rounded-xl p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle size={18} />
        <span className="font-bold">No tienes membresía activa</span>
      </div>
      <p className="text-slate-300">Visita la tienda o recepción para adquirir una.</p>
    </div>
  );
}

function getMembershipViewData(membership, user, member) {
  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : (user?.nombre || user?.username || 'Miembro');
  const userId = user?.id || membership.user || 'FIT-0000';
  const membershipType = membership.tipo?.name || membership.membership_name || 'Full Data Anual';
  const qrCode = member?.qr_code || member?.qrCode || `FD-USER${userId}`;
  const isDayPass = isDayPassMembership(membershipType, membership.tipo?.duration_days);

  return { userName, userId, membershipType, qrCode, isDayPass };
}

export default function Membresia() {
  const { membership, user, member, loading, currentTime } = useMembresiaData();
  const qrRef = useRef(null);

  if (loading) return <div className="text-slate-400 text-center">Cargando membresía...</div>;
  if (!membership) return <EmptyMembership />;

  const viewData = getMembershipViewData(membership, user, member);
  const vigente = isMembershipValid(membership, viewData.isDayPass, currentTime);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <TarjetaMembresia
        membership={membership}
        membershipType={viewData.membershipType}
        userName={viewData.userName}
        userId={viewData.userId}
        qrCode={viewData.qrCode}
        vigente={vigente}
        qrRef={qrRef}
      />

      <VigenciaMembresia
        membership={membership}
        isDayPass={viewData.isDayPass}
        currentTime={currentTime}
      />

      <OcupacionGym />

      <DescargaMembresia
        qrRef={qrRef}
        userName={viewData.userName}
        membershipType={viewData.membershipType}
        endDate={membership.end_date}
        userId={viewData.userId}
      />
    </div>
  );
}
