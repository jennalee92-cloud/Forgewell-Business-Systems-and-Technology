import { useState } from 'react'

const currentYear = new Date().getFullYear()

type SiteChromeProps = {
  homePage?: boolean
}

export function SiteHeader({ homePage = false }: SiteChromeProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const home = homePage ? '' : '/'
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href={`${home}#top`} aria-label="Forgewell home" onClick={closeMenu}>
        <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M5 5h30v7H13v7h17v7H13v9H5z" />
          <path className="brand-mark-cut" d="M22 26h13v9H22z" />
        </svg>
        <span className="brand-word">Forgewell<span>Business Systems + Technology</span></span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close' : 'Menu'}
        <span className={`menu-glyph${menuOpen ? ' is-open' : ''}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="primary-nav" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
        <a href="/services" onClick={closeMenu}>Services</a>
        <a href={`${home}#what-we-build`} onClick={closeMenu}>What we build</a>
        <a href={`${home}#how-we-work`} onClick={closeMenu}>How we work</a>
        <a href={`${home}#about`} onClick={closeMenu}>About</a>
        <a className="nav-cta" href={`${home}#assessment`} onClick={closeMenu}>Tell us what you need <span aria-hidden="true">&rarr;</span></a>
      </nav>
    </header>
  )
}

export function SiteFooter({ homePage = false }: SiteChromeProps) {
  const home = homePage ? '' : '/'

  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href={`${home}#top`} aria-label="Forgewell home">
        <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M5 5h30v7H13v7h17v7H13v9H5z" />
          <path className="brand-mark-cut" d="M22 26h13v9H22z" />
        </svg>
        <span className="brand-word">Forgewell<span>Business Systems + Technology</span></span>
      </a>
      <p>We Build Better Businesses.</p>
      <nav aria-label="Footer navigation">
        <a href="/services">Services</a>
        <a href={`${home}#what-we-build`}>What we build</a>
        <a href={`${home}#how-we-work`}>How we work</a>
        <a href={`${home}#assessment`}>Tell us what you need</a>
        <a href="mailto:forgewellbst@gmail.com">forgewellbst@gmail.com</a>
      </nav>
      <small>© {currentYear} Forgewell. Built with purpose.</small>
    </footer>
  )
}