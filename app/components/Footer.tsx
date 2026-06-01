import { Cloud, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer id="recursos" className="py-12 border-t border-border bg-panel/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-azure" />
              <span className="font-semibold text-sm text-foreground">Cloud Computing</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Temas Selectos de Computación I<br />
              FES Acatlán — UNAM<br />
              Semestre 2026-2
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Recursos
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Microsoft Learn", href: "https://learn.microsoft.com" },
                { label: "Azure for Students", href: "https://azure.microsoft.com/free/students" },
                { label: "GitHub Student Pack", href: "https://education.github.com/pack" },
                { label: "Azure Documentation", href: "https://docs.microsoft.com/azure" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-azure transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Contacto
            </h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>Prof. Diego Romero Mora</li>
              <li>FES Acatlán, UNAM</li>
              <li>Naucalpan de Juárez, Edo. Méx.</li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Institucional
            </h4>
            <ul className="space-y-2">
              {[
                { label: "UNAM", href: "https://www.unam.mx" },
                { label: "FES Acatlán", href: "https://www.acatlan.unam.mx" },
                { label: "Lic. MAyC", href: "https://www.acatlan.unam.mx/index.php?id=61" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-unam-gold transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-text-secondary">
            © 2026 Universidad Nacional Autónoma de México. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] text-text-secondary">Sistema activo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
