function NavTabButton({ tab, isActive, isMobile = false, onSelect }) {
  const Icon = tab.icon;

  const desktopClasses = isActive
    ? 'bg-slate-800 text-white border-b-2 border-cyan-400 shadow-[0_4px_12px_-2px_rgba(34,211,238,0.3)] -translate-y-px'
    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-b-2 border-transparent';

  const mobileClasses = isActive ? 'text-blue-400' : 'text-slate-500';

  return (
    <button
      type="button"
      onClick={() => onSelect(tab.id)}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Ir a ${tab.label}`}
      className={isMobile
        ? `flex flex-col items-center justify-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset ${mobileClasses}`
        : `rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${desktopClasses}`}
    >
      {isMobile ? (
        <>
          <span
            className={`flex h-6 w-6 items-center justify-center transition-all ${isActive
              ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
              : ''}`}
          >
            <Icon size={24} aria-hidden="true" />
          </span>
          <span className="w-full truncate px-1 text-center text-[9px] font-medium">
            {tab.label}
          </span>
        </>
      ) : (
        tab.label
      )}
    </button>
  );
}

export default NavTabButton;
