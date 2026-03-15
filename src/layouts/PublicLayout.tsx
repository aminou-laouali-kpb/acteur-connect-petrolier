import { Outlet, Link, useLocation } from 'react-router-dom';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/opportunites', label: 'Opportunités' },
  { href: '/annuaire', label: 'Annuaire' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5">
        <div className="container flex items-center justify-between">
          <span>République du Niger — Ministère du Pétrole</span>
          <RoleSwitcher />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">CL</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-sm leading-tight">Contenu Local</p>
              <p className="text-xs text-muted-foreground">Plateforme Nationale</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex bg-gold hover:bg-gold/90 text-gold-foreground">
              <Link to="/connexion">Espace entreprise</Link>
            </Button>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md',
                    location.pathname === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2 bg-gold hover:bg-gold/90 text-gold-foreground">
                <Link to="/connexion">Espace entreprise</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold mb-4">Contenu Local</h3>
              <p className="text-sm text-primary-foreground/70">
                Plateforme nationale des acteurs et des opportunités du contenu local pétrolier au Niger.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link></li>
                <li><Link to="/opportunites" className="hover:text-primary-foreground transition-colors">Opportunités</Link></li>
                <li><Link to="/annuaire" className="hover:text-primary-foreground transition-colors">Annuaire</Link></li>
                <li><Link to="/a-propos" className="hover:text-primary-foreground transition-colors">À propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">Assistance</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
                <li>support@contenulocal.ne</li>
                <li>+227 20 72 00 00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">Informations légales</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>Mentions légales</li>
                <li>Politique de confidentialité</li>
                <li>Conditions d'utilisation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
            <p>© 2026 Ministère du Pétrole — République du Niger. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
