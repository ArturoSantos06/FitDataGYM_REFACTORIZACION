import { useState } from 'react';

export default function useMenuMovil() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return {
    mobileNavOpen,
    toggleMobileNav: () => setMobileNavOpen((prev) => !prev),
    handleNavClick,
  };
}
