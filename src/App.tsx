import { useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './App.css'

gsap.registerPlugin(useGSAP)
const currentYear = new Date().getFullYear()

type ChallengeId = 'manual' | 'owner' | 'disconnected' | 'growth'
const challenges: { id: ChallengeId; title: string; detail: string; response: string }[] = [
  {
    id: 'manual',
    title: 'Too much manual work',
    detail: 'The same steps keep happening by hand.',
    response: 'Map the repeatable work, then decide what to simplify, systemize, or automate.',
  },
  {
    id: 'owner',
    title: 'Everything comes back to me',
    detail: 'Decisions and know-how are hard to hand off.',
    response: 'Make the hidden decisions visible with clear processes, ownership, and useful tools.',
  },
  {
    id: 'disconnected',
    title: 'Systems do not talk',
    detail: 'Information gets copied, lost, or chased down.',
    response: 'Trace how information moves today and connect the systems that should share it.',
  },
  {
    id: 'growth',
    title: 'Growth is creating friction',
    detail: 'More work is exposing weak spots in the operation.',
    response: 'Find the pressure points first, then build the structure the next stage needs.',
  },
]

const serviceRows = [
  {
    title: 'BUILD',
    audience: 'For new businesses and teams ready for a stronger digital presence',
    problem: 'A website no longer fits the business—or there is no clear digital foundation yet.',
    deliverables: 'Custom websites · redesigns · digital integrations · business setup guidance',
  },
  {
    title: 'AUTOMATE',
    audience: 'For teams repeating the same admin, handoffs, and data entry',
    problem: 'Work slows down as information moves manually between people and tools.',
    deliverables: 'Practical AI workflows · software connections · process automation',
  },
  {
    title: 'OPTIMIZE',
    audience: 'For businesses that need clearer operations and follow-through',
    problem: 'Important work depends on memory, unclear ownership, or undocumented steps.',
    deliverables: 'Project management · SOPs · workflow improvement · implementation · ongoing support',
  },
]

const inquiryServices = [
  'Build or redesign a website',
  'Automate a workflow',
  'Document a process or SOP',
  'Implement a project or business system',
  'Improve operations',
  'I am not sure yet',
]

const stages = [
  ['Starting', 'You have the idea. Let’s build the foundation.'],
  ['Operating', 'The business works. Now let’s make it work better.'],
  ['Growing', 'Growth is adding complexity. Let’s build for it.'],
  ['Scaling', 'The next level needs stronger operating infrastructure.'],
  ['Owner-dependent', 'You built the business. It should not need you for everything.'],
]

const process = [
  ['01', 'Discover', 'Understand the business, the people, and the work as it really happens.'],
  ['02', 'Diagnose', 'Find the constraint behind the visible symptoms.'],
  ['03', 'Design', 'Choose a solution that fits the goals, existing tools, and constraints.'],
  ['04', 'Build', 'Put the system, process, or technology into use.'],
  ['05', 'Empower', 'Make sure the business can own and operate what we build.'],
  ['06', 'Optimize', 'Improve it as the business and its needs change.'],
]

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedChallenges, setSelectedChallenges] = useState<ChallengeId[]>([])
  const [demoView, setDemoView] = useState<'manual' | 'structured'>('manual')
  const [inquiryDraft, setInquiryDraft] = useState('')

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })

      entrance
        .from('.hero-eyebrow', { y: 12, autoAlpha: 0, duration: 0.45 })
        .from('.hero-title', { y: 28, autoAlpha: 0, duration: 0.72 }, '-=0.12')
        .from('.hero-intro, .hero-actions, .hero-note', {
          y: 16,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.08,
        }, '-=0.2')
        .from('.hero-schematic', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.45')
      return () => entrance.revert()
    })
    return () => motion.revert()
  }, { scope: pageRef })

  const toggleChallenge = (id: ChallengeId) => {
    setSelectedChallenges((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const details = [
      ['Name', values.get('name')],
      ['Email', values.get('email')],
      ['Help needed', values.get('service')],
      ['Project details', values.get('project')],
      ['Business', values.get('business')],
      ['Current website', values.get('website')],
      ['Approximate investment range', values.get('budget')],
      ['Desired timeline', values.get('timeline')],
    ].filter(([, value]) => String(value ?? '').trim())

    const body = details.map(([label, value]) => `${label}: ${String(value).trim()}`).join('\n\n')
    const subject = `Forgewell project inquiry: ${String(values.get('service'))}`
    setInquiryDraft(`mailto:forgewellbst@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const selected = challenges.filter((challenge) => selectedChallenges.includes(challenge.id))
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" ref={pageRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Forgewell home" onClick={closeMenu}>
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
          <a href="#what-we-build" onClick={closeMenu}>What we build</a>
          <a href="#how-we-work" onClick={closeMenu}>How we work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#assessment" onClick={closeMenu}>Tell us what you need <span aria-hidden="true">&rarr;</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> Business systems + technology</p>
            <h1 className="hero-title" id="hero-title">Build the systems behind a <em>better business.</em></h1>
            <p className="hero-intro">Custom websites, practical automation, and better business systems for the work you need to get done.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#assessment">Tell us what you need <span aria-hidden="true">&rarr;</span></a>
              <a className="text-link" href="#what-we-build">Explore what we build <span aria-hidden="true">&darr;</span></a>
            </div>
            <p className="hero-note"><span className="note-dot" /> Built around your business. Designed to work without us.</p>
          </div>

          <figure className="hero-schematic" aria-labelledby="schematic-title">
            <figcaption className="schematic-head">
              <span id="schematic-title">A better way to work</span>
              <span className="schematic-index">FW / 01</span>
            </figcaption>
            <div className="schematic-canvas">
              <div className="schematic-axis axis-x" />
              <div className="schematic-axis axis-y" />
              <svg className="schematic-wires" viewBox="0 0 520 360" role="img" aria-labelledby="wire-title wire-description">
                <title id="wire-title">A business system taking shape</title>
                <desc id="wire-description">Separate inputs connect through a shared operating system to a clearer business workflow.</desc>
                <path className="wire wire-muted" pathLength="1" d="M58 86 C134 86 125 176 220 176" />
                <path className="wire wire-muted" pathLength="1" d="M58 272 C134 272 125 184 220 184" />
                <path className="wire wire-main" pathLength="1" d="M245 180 C322 180 302 94 414 94" />
                <path className="wire wire-main wire-low" pathLength="1" d="M245 180 C322 180 302 268 414 268" />
                <circle className="wire-node" cx="220" cy="180" r="5" />
                <circle className="wire-node wire-node-end" cx="414" cy="94" r="5" />
                <circle className="wire-node wire-node-end" cx="414" cy="268" r="5" />
              </svg>
              <div className="schematic-chip chip-input chip-one"><b>01</b><span>People + work</span></div>
              <div className="schematic-chip chip-input chip-two"><b>02</b><span>Tools + information</span></div>
              <div className="system-core"><span className="core-mark">F</span><span>Business<br />operating system</span><i>Connected</i></div>
              <div className="schematic-chip chip-output chip-three"><b>03</b><span>Clear process</span></div>
              <div className="schematic-chip chip-output chip-four"><b>04</b><span>Room to grow</span></div>
            </div>
            <div className="schematic-foot"><span>Less friction, by design.</span><a href="#business-forge">Explore the system <b aria-hidden="true">&darr;</b></a></div>
          </figure>
        </section>

        <section className="recognition section-wrap" aria-labelledby="recognition-title">
          <div className="section-marker"><span>01</span><span>THE REAL PROBLEM</span></div>
          <div className="recognition-grid">
            <h2 id="recognition-title">When the owner becomes the operating system, <em>everything slows down.</em></h2>
            <div className="recognition-copy">
              <p>The business may be growing. The work is getting done. But too much depends on memory, workarounds, and you being in the middle of everything.</p>
              <ul className="symptom-list">
                <li>Questions keep finding their way back to you.</li>
                <li>Information lives in too many places.</li>
                <li>Growth adds more coordination than capacity.</li>
                <li>Tools create more work instead of less.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="possibility" aria-labelledby="possibility-title">
          <div className="section-wrap possibility-inner">
            <p className="eyebrow"><span className="eyebrow-line" /> The opportunity</p>
            <h2 id="possibility-title">The business can work <em>better</em> than this.</h2>
            <p className="possibility-copy">Not through another tool for the sake of it. Through the right structure around the work you already do.</p>
            <div className="shift-list" aria-label="Examples of operational improvements">
              <span>Manual <b>&rarr;</b> Repeatable</span>
              <span>Disconnected <b>&rarr;</b> In sync</span>
              <span>Owner-dependent <b>&rarr;</b> Shared ownership</span>
              <span>Reactive <b>&rarr;</b> Ready</span>
            </div>
          </div>
        </section>

        <section className="promise section-wrap" aria-labelledby="promise-title">
          <div className="section-marker"><span>02</span><span>THE FORGEWELL PROMISE</span></div>
          <div className="promise-grid">
            <p className="eyebrow">Build it. Make it yours.</p>
            <div>
              <h2 id="promise-title">A good system should make your business <em>more capable</em>—not more dependent on us.</h2>
              <p>We build, explain, and hand over the work clearly. Support can continue when it is useful, but the business should be stronger even when we are not in the room.</p>
            </div>
          </div>
        </section>

        <section className="forge-section" id="business-forge" aria-labelledby="forge-title">
          <div className="section-wrap">
            <div className="section-heading forge-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-line" /> A working diagnostic / 01</p>
                <h2 id="forge-title">The Business <em>Forge</em></h2>
              </div>
              <p>Start with the part that feels harder than it should. We’ll show you the kind of system thinking that can move it forward.</p>
            </div>
            <div className="forge-tool">
              <div className="forge-choices">
                <div className="tool-topline"><span>01 / FIND THE FRICTION</span><span>Select all that fit</span></div>
                <div className="challenge-list">
                  {challenges.map((challenge, index) => {
                    const isSelected = selectedChallenges.includes(challenge.id)
                    return (
                      <button
                        className={`challenge-option${isSelected ? ' is-selected' : ''}`}
                        type="button"
                        key={challenge.id}
                        aria-pressed={isSelected}
                        onClick={() => toggleChallenge(challenge.id)}
                      >
                        <span className="option-index">0{index + 1}</span>
                        <span className="option-copy"><strong>{challenge.title}</strong><small>{challenge.detail}</small></span>
                        <span className="option-check" aria-hidden="true">{isSelected ? '−' : '+'}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="tool-footnote">This is a starting point, not a score or a one-size-fits-all answer.</p>
              </div>
              <div className="forge-readout" key={selectedChallenges.join('|') || 'empty'} aria-live="polite" aria-atomic="true">
                <div className="tool-topline"><span>02 / SHAPE A RESPONSE</span><span className="live-indicator"><i /> LIVE</span></div>
                {selected.length === 0 ? (
                  <div className="readout-empty">
                    <div className="empty-orbit" aria-hidden="true"><span /><span /><span /><b>FW</b></div>
                    <p className="readout-label">Your business, in context</p>
                    <h3>Choose what is getting in the way.</h3>
                    <p>We’ll connect the friction to a practical place to begin—not a generic package.</p>
                  </div>
                ) : (
                  <div className="readout-content">
                    <p className="readout-label">A place to begin / {selected.length} {selected.length === 1 ? 'constraint' : 'constraints'}</p>
                    <h3>{selected.length === 1 ? 'Start with the work behind the symptom.' : 'Look for the shared cause.'}</h3>
                    <div className="recommendation-list">
                      {selected.map((challenge) => (
                        <div className="recommendation" key={challenge.id}>
                          <span>{challenge.title}</span>
                          <p>{challenge.response}</p>
                        </div>
                      ))}
                    </div>
                    <a className="text-link text-link-light" href="#assessment">Discuss this with Forgewell <span aria-hidden="true">&rarr;</span></a>
                  </div>
                )}
                <div className="forge-stages" aria-label="Forgewell approach">
                  {['Discover', 'Diagnose', 'Design', 'Build', 'Empower', 'Optimize'].map((phase, index) => (
                    <span className={selected.length > 0 && index < 3 ? 'is-lit' : ''} key={phase}><b>0{index + 1}</b>{phase}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lab-section section-wrap" id="forgewell-lab" aria-labelledby="lab-title">
          <div className="section-heading lab-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Forgewell Lab / Demonstrations</p>
              <h2 id="lab-title">See the thinking <em>at work.</em></h2>
            </div>
            <p>Not client claims. Small, tangible examples of how a better system can change the shape of everyday work.</p>
          </div>
          <div className="lab-grid">
            <article className="lab-demo demo-workflow">
              <div className="demo-head"><span>DEMO 01 / INQUIRY ROUTING</span><span>Illustrative workflow</span></div>
              <h3>From incoming request to a clear next step.</h3>
              <div className="demo-tabs" aria-label="Compare inquiry workflows">
                <button type="button" aria-pressed={demoView === 'manual'} onClick={() => setDemoView('manual')}>Without a system</button>
                <button type="button" aria-pressed={demoView === 'structured'} onClick={() => setDemoView('structured')}>With a system</button>
              </div>
              <div className={`workflow-steps${demoView === 'structured' ? ' is-structured' : ''}`} aria-live="polite" aria-atomic="true">
                {(demoView === 'manual'
                  ? ['Request lands in an inbox', 'Someone searches for context', 'The next step depends on memory']
                  : ['Request captures useful context', 'Work routes to a clear owner', 'The next step is visible to the team']
                ).map((step, index) => (
                  <div className="workflow-step" key={step}><span>0{index + 1}</span><p>{step}</p><i aria-hidden="true">{index < 2 ? '→' : ''}</i></div>
                ))}
              </div>
              <p className="demo-caption">A concept to adapt to the actual tools, team, and customer experience.</p>
            </article>
            <article className="lab-demo demo-website">
              <div className="demo-head"><span>DEMO 02 / WEBSITE AS INFRASTRUCTURE</span><span>System map</span></div>
              <h3>A website can carry more of the work.</h3>
              <p className="demo-description">A useful digital experience can answer questions, set expectations, and route the right information before a person has to repeat it.</p>
              <div className="website-flow" aria-label="A website can connect customer questions to useful answers and organized inquiries">
                <div><small>VISITOR</small><strong>Has a question</strong></div><span aria-hidden="true">&rarr;</span>
                <div><small>WEBSITE</small><strong>Finds a clear answer</strong></div><span aria-hidden="true">&rarr;</span>
                <div><small>BUSINESS</small><strong>Receives useful context</strong></div>
              </div>
              <p className="demo-caption">The right outcome depends on the business—not a template.</p>
            </article>
          </div>
        </section>

        <section className="build-section" id="what-we-build" aria-labelledby="build-title">
          <div className="section-wrap build-grid">
            <div className="build-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> The machinery behind the change</p>
              <h2 id="build-title">Three ways to make work <em>better.</em></h2>
              <p>Start with the business problem. We’ll shape the right combination of digital, workflow, and operational work around it.</p>
              <a className="text-link" href="#assessment">Tell us what you need <span aria-hidden="true">&rarr;</span></a>
            </div>
            <div className="service-list">
              {serviceRows.map((service, index) => (
                <a className="service-row" href="#assessment" key={service.title} aria-label={`Discuss ${service.title.toLowerCase()} services with Forgewell`}>
                  <span className="service-number">0{index + 1}</span>
                  <div className="service-copy">
                    <span className="service-audience">{service.audience}</span>
                    <h3>{service.title}</h3>
                    <p>{service.problem}</p>
                    <small>{service.deliverables}</small>
                  </div>
                  <span className="service-arrow" aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="audience-section section-wrap" aria-labelledby="audience-title">
          <div className="section-marker"><span>03</span><span>WHO WE BUILD FOR</span></div>
          <div className="section-heading audience-heading">
            <h2 id="audience-title">Wherever you are in the work, <em>start there.</em></h2>
            <p>No business has the same starting line. The useful next step depends on yours.</p>
          </div>
          <div className="stage-list">
            {stages.map(([stage, description], index) => (
              <article className="stage-row" key={stage}>
                <span className="stage-number">0{index + 1}</span>
                <h3>{stage}</h3>
                <p>{description}</p>
                <span className="stage-mark" aria-hidden="true">+</span>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="how-we-work" aria-labelledby="process-title">
          <div className="section-wrap">
            <div className="section-heading process-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-line" /> A clear path through complex work</p>
                <h2 id="process-title">Understand first.<br /><em>Build with intent.</em></h2>
              </div>
              <p>We do not arrive with a preselected tool or package. We learn how the business works, find the real constraint, and build from there.</p>
            </div>
            <div className="process-grid">
              {process.map(([number, title, description]) => (
                <article className="process-step" key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="founder-section section-wrap" id="about" aria-labelledby="founder-title">
          <div className="founder-aside">
            <p className="eyebrow"><span className="eyebrow-line" /> A note from the founder</p>
            <div className="founder-stamp" aria-hidden="true"><span>F</span><i>Built to work<br />in the real world</i></div>
          </div>
          <div className="founder-copy">
            <h2 id="founder-title">Businesses rarely struggle because people are not trying hard enough.</h2>
            <p className="founder-quote">Forgewell was built around a simple belief: the systems supporting people’s effort should be strong enough to keep up. The goal is to leave the people doing the work with more room to do it well.</p>
            <p className="founder-signature">Jenna <span>Founder, Forgewell</span></p>
          </div>
        </section>

        <section className="proof-section" aria-labelledby="proof-title">
          <div className="section-wrap proof-inner">
            <div className="proof-label"><span className="proof-dot" /> DEMONSTRATION, NOT PROMISE</div>
            <h2 id="proof-title">The work should speak<br />for itself.</h2>
            <p>Forgewell Lab shows the approach in practice. Client stories and measurable outcomes belong here when there is real work to share—never before.</p>
            <a className="text-link text-link-light" href="#forgewell-lab">Explore the demonstrations <span aria-hidden="true">&uarr;</span></a>
            <div className="proof-reservations">
              <div><span>CLIENT STORIES</span><p>Added when there is verified work and a useful business change to document.</p></div>
              <div><span>CLIENT VOICES</span><p>Shared with permission, in the client’s own words.</p></div>
            </div>
          </div>
        </section>

        <section className="assessment-section section-wrap" id="assessment" aria-labelledby="assessment-title">
          <div className="assessment-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> Your next useful step</p>
            <h2 id="assessment-title">Tell us what <em>you need.</em></h2>
            <p>Share the basics. We’ll use your note to understand the project and what a useful next step could be.</p>
            <div className="consultation-note">
              <span className="consultation-mark" aria-hidden="true">01</span>
              <div><p><strong>Prefer email?</strong><br />You can contact Forgewell directly.</p><a className="email-link" href="mailto:forgewellbst@gmail.com">forgewellbst@gmail.com</a></div>
            </div>
          </div>
          <div className="assessment-form-wrap">
            <form className="assessment-form inquiry-form" id="assessment-form" onSubmit={handleInquiry}>
              <div className="form-pair">
                <div><label htmlFor="inquiry-name">Name</label><input id="inquiry-name" name="name" autoComplete="name" required /></div>
                <div><label htmlFor="inquiry-email">Email address</label><input id="inquiry-email" name="email" type="email" autoComplete="email" required /></div>
              </div>
              <label htmlFor="inquiry-service">What kind of help do you need?</label>
              <select id="inquiry-service" name="service" required defaultValue="">
                <option value="" disabled>Select a service area</option>
                {inquiryServices.map((service) => <option key={service}>{service}</option>)}
              </select>
              <label htmlFor="inquiry-project">What are you trying to build or improve?</label>
              <textarea id="inquiry-project" name="project" rows={4} minLength={12} maxLength={1600} placeholder="A few sentences about the challenge, what you have in mind, or where work gets stuck." required />
              <details className="optional-details">
                <summary>Optional project details <span aria-hidden="true">+</span></summary>
                <div className="optional-fields">
                  <div className="form-pair">
                    <div><label htmlFor="inquiry-business">Business name</label><input id="inquiry-business" name="business" autoComplete="organization" /></div>
                    <div><label htmlFor="inquiry-website">Current website</label><input id="inquiry-website" name="website" type="url" placeholder="https://" /></div>
                  </div>
                  <div className="form-pair">
                    <div><label htmlFor="inquiry-budget">Approximate investment range</label><input id="inquiry-budget" name="budget" placeholder="Optional" /></div>
                    <div><label htmlFor="inquiry-timeline">Desired timeline</label><select id="inquiry-timeline" name="timeline" defaultValue=""><option value="">Still exploring</option><option>As soon as practical</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Later</option></select></div>
                  </div>
                </div>
              </details>
              <button className="button button-dark form-submit" type="submit">Prepare email draft <span aria-hidden="true">&rarr;</span></button>
              <p className="form-disclosure">This opens a prefilled draft in your email app. Nothing is sent until you choose Send.</p>
            </form>
            {inquiryDraft && <p className="inquiry-draft-status" role="status">Draft ready. Review it in your email app, then send it to Forgewell. <a href={inquiryDraft}>Open email draft <span aria-hidden="true">&rarr;</span></a></p>}
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="section-wrap faq-layout">
            <div><p className="eyebrow"><span className="eyebrow-line" /> A few useful answers</p><h2 id="faq-title">Before we <em>begin.</em></h2></div>
            <div className="faq-list">
              <details><summary>Do I need to know exactly what service I need?<span aria-hidden="true">+</span></summary><p>No. Start with what is not working or what you want to make possible. The first job is understanding the business and finding the right problem to solve.</p></details>
              <details><summary>How does pricing work?<span aria-hidden="true">+</span></summary><p>Work is scoped around the business need, complexity, technology, and timeline. You receive a custom quote before work begins. Maintenance and ongoing strategic support are available, never required.</p></details>
              <details><summary>Will I have to keep Forgewell involved?<span aria-hidden="true">+</span></summary><p>No. Handover and capability-building are part of the work. Ongoing support is an option when it continues to be useful to your business.</p></details>
              <details><summary>Can Forgewell help with business licensing?<span aria-hidden="true">+</span></summary><p>Forgewell can help navigate setup steps and licensing requirements. This is operational assistance, not legal advice.</p></details>
              <details><summary>What happens after I prepare an inquiry?<span aria-hidden="true">+</span></summary><p>Your email app opens a prefilled message addressed to Forgewell. Review it and press Send there; the website does not transmit your details directly.</p></details>
            </div>
          </div>
        </section>

        <section className="final-cta section-wrap" aria-labelledby="final-title">
          <p className="eyebrow"><span className="eyebrow-line" /> Make the next move</p>
          <div className="final-cta-row"><h2 id="final-title">Build a business that works <em>better.</em></h2><a className="button button-lime" href="#assessment">Tell us what you need <span aria-hidden="true">&rarr;</span></a></div>
          <p>Start with the friction. We’ll work out what should come next.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Forgewell home">
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 5h30v7H13v7h17v7H13v9H5z" /><path className="brand-mark-cut" d="M22 26h13v9H22z" /></svg>
          <span className="brand-word">Forgewell<span>Business Systems + Technology</span></span>
        </a>
        <p>We Build Better Businesses.</p>
        <nav aria-label="Footer navigation"><a href="#what-we-build">What we build</a><a href="#how-we-work">How we work</a><a href="#assessment">Tell us what you need</a><a href="mailto:forgewellbst@gmail.com">forgewellbst@gmail.com</a></nav>
        <small>© {currentYear} Forgewell. Built with purpose.</small>
      </footer>
    </div>
  )
}

export default App
