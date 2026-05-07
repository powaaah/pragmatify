import { useEffect, useState } from 'react'

const KEY = 'pragmatify-cookie-consent-v1'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const v = localStorage.getItem(KEY)
    if (!v) setVisible(true)
  }, [])

  function choose(mode: 'all' | 'essential') {
    localStorage.setItem(KEY, mode)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-xl">
        <p className="text-sm text-[var(--text-primary)] mb-2 font-medium">Cookie-Einstellungen</p>
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          Wir nutzen essentielle Cookies für den Betrieb und optionale Cookies für Statistik/UX-Verbesserung.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => choose('all')} className="px-3 py-2 rounded-lg bg-cyan-500 text-white text-xs">Alle akzeptieren</button>
          <button onClick={() => choose('essential')} className="px-3 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-primary)]">Nur essentielle</button>
        </div>
      </div>
    </div>
  )
}
