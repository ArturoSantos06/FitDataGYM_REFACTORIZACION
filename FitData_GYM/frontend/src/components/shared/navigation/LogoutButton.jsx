import { LogOut } from 'lucide-react';

const LOGOUT_LABEL = 'Salir';

function LogoutButton({ onLogout, isMobile = false }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      aria-label={LOGOUT_LABEL}
      className={isMobile
        ? 'flex flex-col items-center justify-center gap-1 text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset'
        : 'rounded-md bg-red-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-transform hover:bg-red-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'}
    >
      {isMobile ? (
        <>
          <span className="flex h-6 w-6 items-center justify-center">
            <LogOut size={24} aria-hidden="true" />
          </span>
          <span className="text-[10px] font-medium">{LOGOUT_LABEL}</span>
        </>
      ) : (
        LOGOUT_LABEL
      )}
    </button>
  );
}

export default LogoutButton;
