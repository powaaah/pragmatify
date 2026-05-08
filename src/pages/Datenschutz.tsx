export default function Datenschutz() {
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
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-2">Datenschutzerklärung</h1>
        <p className="text-[var(--text-muted)] text-sm font-mono mb-8">DSGVO-konform | Stand: {new Date().toLocaleDateString('de-DE')}</p>

        <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          {/* Präambel */}
          <section>
            <p className="font-body">
              Der Schutz Ihrer Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Verarbeitung personenbezogener
              Daten auf pragmatify.de gemäß Datenschutz-Grundverordnung (DSGVO) und dem Telemediengesetz (TMG).
            </p>
          </section>

          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">1. Verantwortlicher für die Datenverarbeitung</h2>
            <p className="whitespace-pre-wrap font-body">
              Stefan Trache
              <br />
              Rudolf-Renner-Str. 50
              <br />
              01159 Dresden
              <br />
              Deutschland
              <br />
              <br />
              <strong>Email:</strong> <a href="mailto:stefan.trache@web.de" className="text-cyan-500 hover:text-cyan-400">stefan.trache@web.de</a>
            </p>
          </section>

          {/* 2. Art und Umfang der Datenverarbeitung */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">
              2. Welche Daten erfassen wir und wie verwenden wir diese?
            </h2>

            <div className="space-y-6">
              {/* 2.1 Hosting */}
              <div>
                <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">2.1 Hosting und Server-Logdaten</h3>
                <p className="font-body mb-3">
                  Diese Website wird auf einem VPS-Server betrieben. Der Hoster speichert automatisch Informationen in sogenannten
                  Server-Log-Dateien:
                </p>
                <ul className="list-disc list-inside space-y-1 font-body ml-2">
                  <li>IP-Adresse des Zugriffs</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Angeforderter Inhalt (URL)</li>
                  <li>HTTP-Status-Code</li>
                  <li>Referrer (von welcher Seite Sie kamen)</li>
                  <li>Benutzer-Agent (Browsertyp, Betriebssystem)</li>
                </ul>
                <p className="font-body mt-3">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f) DSGVO (berechtigtes Interesse an Sicherheit und technischer
                  Verwaltung des Servers). Log-Dateien werden in der Regel nach 7 Tagen gelöscht.
                </p>
              </div>

              {/* 2.2 Cookies */}
              <div>
                <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">2.2 Cookies und lokale Speicherung</h3>
                <p className="font-body mb-3">
                  Pragmatify verwendet Cookies für folgende Zwecke:
                </p>
                <ul className="list-disc list-inside space-y-1 font-body ml-2">
                  <li><strong>Theme-Preference:</strong> Speichert Ihre Farbschema-Wahl (Hell/Dunkel) — technisch notwendig</li>
                  <li><strong>Cookie-Consent:</strong> Speichert Ihre Zustimmung zur Cookie-Nutzung — gesetzlich erforderlich</li>
                </ul>
                <p className="font-body mt-3">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a) DSGVO (Ihre Zustimmung) und Art. 6 Abs. 1 lit. f) DSGVO
                  (technische Notwendigkeit). Sie können Cookies in Ihren Browser-Einstellungen deaktivieren.
                </p>
              </div>

              {/* 2.3 Analyse und Tracking */}
              <div>
                <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">2.3 Web-Analytics (optional)</h3>
                <p className="font-body mb-3">
                  Diese Website kann anonymisierte Zugriffsdaten für Analyse- und Optimierungszwecke verwenden. Dies erfolgt nur, wenn
                  Sie Ihre Zustimmung in unserem Cookie-Banner geben.
                </p>
                <p className="font-body">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a) DSGVO (Ihre ausdrückliche Zustimmung). Sie können Ihre
                  Zustimmung jederzeit widerrufen, indem Sie Ihre Cookie-Einstellungen ändern.
                </p>
              </div>

              {/* 2.4 Kontaktdaten */}
              <div>
                <h3 className="font-display font-medium text-[var(--text-primary)] mb-2">2.4 Kontaktinformationen</h3>
                <p className="font-body">
                  Falls Sie uns per Email kontaktieren, speichern wir Ihre Email-Adresse und Nachricht ausschließlich zur Bearbeitung
                  Ihrer Anfrage. Eine Weitergabe an Dritte erfolgt nicht.
                </p>
                <p className="font-body mt-2">
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b) DSGVO (Erfüllung eines Vertrags bzw. Vertragsanbahnung).
                </p>
              </div>
            </div>
          </section>

          {/* 3. Empfänger der Daten */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">3. Empfänger von Daten</h2>
            <p className="font-body mb-3">
              Ihre Daten werden grundsätzlich nicht an Dritte weitergegeben. Ausnahmen:
            </p>
            <ul className="list-disc list-inside space-y-1 font-body ml-2">
              <li><strong>Hosting-Provider:</strong> Die Betreiber des VPS-Servers (zur technischen Bereitstellung)</li>
              <li><strong>Analytics-Tools (falls aktiviert):</strong> Anonymisierte Daten an den Analytics-Anbieter</li>
              <li><strong>Gesetzliche Anforderungen:</strong> Offenlegung an Behörden nur bei gesetzlicher Verpflichtung</li>
            </ul>
          </section>

          {/* 4. Datenspeicherung */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">4. Speicherdauer</h2>
            <ul className="space-y-2 font-body">
              <li><strong>Server-Logdaten:</strong> 7 Tage</li>
              <li><strong>Cookies:</strong> Bis zum Löschen Ihres Browser-Cache oder manuelle Löschung</li>
              <li><strong>Kontaktanfragen:</strong> Bis zur Abwicklung, max. 6 Monate, sofern keine rechtlichen Anforderungen bestehen</li>
            </ul>
          </section>

          {/* 5. Ihre Rechte */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">5. Ihre Rechte als betroffene Person</h2>
            <p className="font-body mb-3">Gemäß DSGVO haben Sie folgende Rechte:</p>
            <ul className="space-y-2 font-body ml-2">
              <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Einsicht in Ihre gespeicherten Daten</li>
              <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Korrektur unrichtiger Daten</li>
              <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Löschung Ihrer Daten („Recht auf Vergessenwerden")</li>
              <li><strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Einschränkung der Verarbeitung</li>
              <li><strong>Datenportabilität (Art. 20 DSGVO):</strong> Ihre Daten in strukturierter Form erhalten</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Widerspruch gegen Verarbeitung</li>
            </ul>
            <p className="font-body mt-4">
              Um diese Rechte geltend zu machen, kontaktieren Sie bitte: <a href="mailto:stefan.trache@web.de" className="text-cyan-500 hover:text-cyan-400">stefan.trache@web.de</a>
            </p>
            <p className="font-body mt-3">
              <strong>Recht auf Beschwerde:</strong> Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren. Die zuständige Behörde für Sachsen ist:{' '}
              <a href="https://www.datenschutz.sachsen.de/" className="text-cyan-500 hover:text-cyan-400" target="_blank" rel="noreferrer">
                Der Sächsische Datenschutzbeauftragte
              </a>
            </p>
          </section>

          {/* 6. Externe Links */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">6. Externe Links und Datenquellen</h2>
            <p className="font-body">
              Diese Website verlinkt zu externen Datenquellen (FRED, World Bank, Census Bureau, etc.). Diese externe Websites haben ihre
              eigenen Datenschutzrichtlinien. Der Betreiber dieser Website ist nicht verantwortlich für deren Datenschutzpraktiken.
            </p>
          </section>

          {/* 7. Datensicherheit */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">7. Datensicherheit</h2>
            <p className="font-body">
              Diese Website verwendet HTTPS-Verschlüsselung (SSL/TLS) für alle Verbindungen. Ihre Daten werden verschlüsselt übertragen
              und auf dem Server sicher gespeichert. Allerdings gibt es keine 100%ige Sicherheitsgarantie im Internet.
            </p>
          </section>

          {/* 8. Änderungen */}
          <section>
            <h2 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">8. Änderungen dieser Datenschutzerklärung</h2>
            <p className="font-body">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die gesetzlichen oder technischen Anforderungen
              ändern. Aktuelle Version finden Sie immer unter diesem Link.
            </p>
          </section>

          {/* Footer */}
          <section className="border-t border-[var(--border)] pt-6 mt-8">
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex flex-wrap gap-4 text-sm mt-6">
              <a href="/" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                Zurück zur Startseite
              </a>
              <a href="/impressum" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                Impressum
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
