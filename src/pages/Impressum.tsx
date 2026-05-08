export default function Impressum() {
  return (
    <div className="min-h-screen app-shell">
      <header className="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="font-display font-bold text-lg tracking-tight text-cyan-500">
            PRAGMATIFY
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-8">Impressum</h1>

        <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          {/* Angaben gemäß TMG */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Anbieter</h2>
            <p className="whitespace-pre-wrap font-body">
              Stefan Trache
              <br />
              Rudolf-Renner-Str. 50
              <br />
              01159 Dresden
              <br />
              Deutschland
            </p>
          </section>

          {/* Kontaktinformationen */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Kontakt</h2>
            <p className="font-body">
              <strong>Email:</strong> <a href="mailto:stefan.trache@web.de" className="text-cyan-500 hover:text-cyan-400 transition-colors">stefan.trache@web.de</a>
            </p>
          </section>

          {/* Haftungshinweis */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Haftungshinweis</h2>
            <p className="font-body">
              Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der
              Informationen auf dieser Website. Haftungsansprüche gegen den Autor wegen Schäden materieller oder ideeller Art, die durch
              die Nutzung oder Nichtnutzung der angebotenen Informationen verursacht werden, sind grundsätzlich ausgeschlossen.
            </p>
          </section>

          {/* Externe Links */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Externe Links</h2>
            <p className="font-body">
              Diese Website enthält Links zu externen Websites Dritter. Die Inhalte dieser externen Websites liegen außerhalb des
              Verantwortungsbereichs des Autors. Der Autor erklärt daher, dass er für diese Inhalte keine Verantwortung übernimmt und
              diese Inhalte nicht zu seinen eigenen macht. Dies gilt für alle Links zu Websites Dritter sowie für alle Inhalte der
              Seiten, zu denen Banner, Buttons, Beiträge oder sonstige Verlinkungen führen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Urheberrecht</h2>
            <p className="font-body">
              Alle Inhalte dieser Website, insbesondere Texte, Grafiken, Logos, Bilder, Audio- und Videoclips sowie deren Anordnung,
              sind urheberrechtlich geschützt. Die Nutzung der Inhalte ist nur für persönliche, private und nicht kommerzielle Zwecke
              gestattet. Eine Vervielfältigung, Bearbeitung, Verbreitung oder Veröffentlichung der Inhalte oder Teile davon bedarf der
              schriftlichen Zustimmung des Autors.
            </p>
          </section>

          {/* Datenschutz */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Datenschutz</h2>
            <p className="font-body">
              Die Nutzung dieser Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf diesen Seiten
              personenbezogene Daten erhoben werden, erfolgt dies – soweit möglich – stets auf freiwilliger Basis. Diese Daten werden
              ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p className="font-body mt-4">
              Weitere Informationen zum Datenschutz finden Sie in unserer <a href="/datenschutz" className="text-cyan-500 hover:text-cyan-400 transition-colors">Datenschutzerklärung</a>.
            </p>
          </section>

          {/* Haftungsausschluss für Wirtschaftsdaten */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Disclaimer – Wirtschaftsdaten</h2>
            <p className="font-body">
              Die auf dieser Website angezeigten Wirtschaftsdaten, Indikatoren und Prognosen stammen aus öffentlichen Datenquellen (wie
              FRED, World Bank, U.S. Census Bureau und anderen) und werden ohne Gewähr präsentiert. Der Autor übernimmt keine
              Haftung für:
            </p>
            <ul className="list-disc list-inside space-y-2 font-body mt-3 ml-2">
              <li>Fehler oder Verzögerungen in der Datenaktualisierung</li>
              <li>Fehlinterpretationen oder falsche Berechnungen von Kennzahlen</li>
              <li>Schäden, die durch Investitionsentscheidungen auf Grundlage dieser Daten entstehen</li>
            </ul>
            <p className="font-body mt-4">
              <strong>Diese Website ersetzt keine professionelle Finanzberatung.</strong> Vor wichtigen Investitionsentscheidungen konsultieren Sie einen
              unabhängigen Finanzberater.
            </p>
          </section>

          {/* Rechtslage */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">Anwendbares Recht</h2>
            <p className="font-body">
              Dieses Impressum unterliegt den Gesetzen der Bundesrepublik Deutschland. Gerichtsstand ist Dresden.
            </p>
          </section>

          {/* Letzte Aktualisierung */}
          <section>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

          {/* Footer Links */}
          <div className="border-t border-[var(--border)] pt-6 mt-8 flex flex-wrap gap-4 text-sm">
            <a href="/" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              Zurück zur Startseite
            </a>
            <a href="/datenschutz" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              Datenschutzerklärung
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
