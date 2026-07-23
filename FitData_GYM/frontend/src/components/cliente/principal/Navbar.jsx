import {
  Dumbbell,
  MessageSquare,
  QrCode,
  ShoppingBag,
  User,
} from 'lucide-react';
import NavbarBrand from '../../shared/navigation/NavbarBrand';
import NavTabButton from '../../shared/navigation/NavTabButton';
import LogoutButton from '../../shared/navigation/LogoutButton';

const CLIENT_TABS = [
  { id: 'inicio', label: 'Inicio', icon: QrCode },
  { id: 'plan', label: 'Mi Plan', icon: Dumbbell },
  { id: 'mensajes', label: 'Mensajes', icon: MessageSquare },
  { id: 'tienda', label: 'Tienda', icon: ShoppingBag },
  { id: 'perfil', label: 'Perfil', icon: User },
];

function Navbar({ activeTab, setActiveTab, onLogout }) {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 hidden h-20 items-center justify-center border-b border-slate-800 bg-slate-900 px-8 shadow-2xl md:flex">
        <div className="flex items-center gap-5">
          <NavbarBrand />

          <nav aria-label="Navegación principal" className="flex items-center gap-5">
            {CLIENT_TABS.map((tab) => (
              <NavTabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onSelect={setActiveTab}
              />
            ))}
          </nav>
        </div>

        <div className="border-l border-slate-800/50 pl-8">
          <LogoutButton onLogout={onLogout} />
        </div>
      </header>

      <nav
        aria-label="Navegación móvil"
        className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-slate-800 bg-slate-900/95 pb-safe backdrop-blur-lg md:hidden"
      >
        <div className="grid h-full grid-cols-6">
          {CLIENT_TABS.map((tab) => (
            <NavTabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              isMobile
              onSelect={setActiveTab}
            />
          ))}

          <LogoutButton onLogout={onLogout} isMobile />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
