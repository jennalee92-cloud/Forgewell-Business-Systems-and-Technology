import { useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './App.css'

gsap.registerPlugin(useGSAP)
const currentYear = new Date().getFullYear()

type ChallengeId = 'manual' | 'owner' | 'disconnected' | 'growth'
type AssessmentBrief = {
  stage: string
  priority: string
  friction: string
  timeline: string
  meeting: string
  investment: string
}

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
  ['BUILD', 'Websites and digital experiences that do a job in the business.'],
  ['AUTOMATE', 'Practical AI and workflows that reduce repetitive work.'],
  ['SYSTEMIZE', 'Processes and SOPs that get important knowledge out of people’s heads.'],
  ['ORGANIZE', 'Project and operational systems that make ownership clearer.'],
  ['LAUNCH', 'Business setup and licensing navigation, without legal advice.'],
  ['OPTIMIZE', 'Ongoing improvements, technology support, and strategic thinking.'],
  ['BESPOKE', 'A considered solution when the right answer crosses disciplines.'],
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
  const [assessment, setAssessment] = useState<AssessmentBrief | null>(null)
  const [copyMessage, setCopyMessage] = useState('')

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

  const handleAssessment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    setAssessment({
      stage: String(values.get('stage')),
      priority: String(values.get('priority')),
      friction: String(values.get('friction')),
      timeline: String(values.get('timeline')),
      meeting: String(values.get('meeting')),
      investment: String(values.get('investment')),
    })
    setCopyMessage('')
  }

  const copyAssessment = async () => {
    if (!assessment) return
    const summary = [
      'FORGEWELL BUSINESS BRIEF',
      `Business stage: ${assessment.stage}`,
      `What I want to improve: ${assessment.priority}`,
      `Where work gets stuck: ${assessment.friction}`,
      `Timeline: ${assessment.timeline}`,
      `Meeting preference: ${assessment.meeting}`,
      `Investment: ${assessment.investment}`,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(summary)
      setCopyMessage('Brief copied.')
    } catch {
      setCopyMessage('Copy was blocked. Select the brief above to copy it manually.')
    }
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
          <a className="nav-cta" href="#assessment" onClick={closeMenu}>Start building <span aria-hidden="true">&rarr;</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> Business systems + technology</p>
            <h1 className="hero-title" id="hero-title">Your business shouldn’t be <em>this hard</em> to run.</h1>
            <p className="hero-intro">We find the friction behind the day-to-day and build the systems, technology, and processes that help your business work better.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#assessment">Start building <span aria-hidden="true">&rarr;</span></a>
              <a className="text-link" href="#business-forge">Assess your business <span aria-hidden="true">&darr;</span></a>
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
                    <a className="text-link text-link-light" href="#assessment">Turn this into a business brief <span aria-hidden="true">&rarr;</span></a>
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
              <h2 id="build-title">Different tools.<br /><em>One better business.</em></h2>
              <p>The work starts with what needs to improve. The right combination follows from there.</p>
              <a className="text-link" href="#assessment">Talk through your situation <span aria-hidden="true">&rarr;</span></a>
            </div>
            <div className="service-list">
              {serviceRows.map(([label, description], index) => (
                <div className="service-row" key={label}>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{label}</h3>
                  <p>{description}</p>
                  <span className="service-arrow" aria-hidden="true">&rarr;</span>
                </div>
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
            <h2 id="assessment-title">Get clear on what <em>needs to change.</em></h2>
            <p>Answer a few questions to shape a short working brief. No pitch, no score—just a better starting point for a conversation.</p>
            <div className="consultation-note">
              <span className="consultation-mark" aria-hidden="true">01</span>
              <div><p><strong>Prefer to talk it through?</strong><br />Focused consultations are available over Zoom or FaceTime. Scope and any fee are agreed before scheduling.</p><a className="text-link" href="#assessment-form">Prepare a consultation brief <span aria-hidden="true">&rarr;</span></a></div>
            </div>
          </div>
          <div className="assessment-form-wrap">
            <form className="assessment-form" id="assessment-form" onSubmit={handleAssessment}>
              <label htmlFor="stage">Where is the business right now?</label>
              <select id="stage" name="stage" required defaultValue="">
                <option value="" disabled>Select a stage</option>
                <option>Starting</option><option>Already operating</option><option>Growing</option><option>Scaling</option><option>Owner-dependent</option>
              </select>

              <label htmlFor="priority">What would you most like to improve?</label>
              <select id="priority" name="priority" required defaultValue="">
                <option value="" disabled>Select a priority</option>
                <option>Reduce repetitive manual work</option><option>Make the business less owner-dependent</option><option>Connect tools and information</option><option>Support growth with better systems</option><option>Build or improve a website</option><option>Something else</option>
              </select>

              <label htmlFor="friction">Where does work get stuck?</label>
              <textarea id="friction" name="friction" rows={3} placeholder="A recurring task, handoff, or question that takes more effort than it should." required />

              <div className="form-pair">
                <div><label htmlFor="timeline">When are you hoping to act?</label><select id="timeline" name="timeline" required defaultValue=""><option value="" disabled>Choose a timeline</option><option>As soon as practical</option><option>Within the next few months</option><option>Later this year</option><option>Still exploring</option></select></div>
                <div><label htmlFor="meeting">Meeting preference</label><select id="meeting" name="meeting" required defaultValue=""><option value="" disabled>Choose a format</option><option>Zoom</option><option>FaceTime</option><option>No preference</option></select></div>
              </div>
              <label htmlFor="investment">Investment conversation</label><select id="investment" name="investment" required defaultValue=""><option value="" disabled>Choose one</option><option>I have a range in mind</option><option>I need help understanding scope</option><option>I am still exploring options</option></select>
              <button className="button button-dark form-submit" type="submit">Prepare my brief <span aria-hidden="true">&rarr;</span></button>
              <p className="form-disclosure">Your answers stay in this browser. This assessment prepares a brief; it does not submit personal information.</p>
            </form>
            {assessment && (
              <div className="assessment-result" aria-live="polite">
                <div className="result-topline"><span>YOUR WORKING BRIEF</span><span>READY</span></div>
                <p><b>Business stage</b>{assessment.stage}</p>
                <p><b>Priority</b>{assessment.priority}</p>
                <p><b>Where work gets stuck</b>{assessment.friction}</p>
                <p><b>Timeline</b>{assessment.timeline}</p>
                <p><b>Meeting preference</b>{assessment.meeting}</p>
                <p><b>Investment conversation</b>{assessment.investment}</p>
                <button className="text-link copy-button" type="button" onClick={copyAssessment}>Copy brief <span aria-hidden="true">&rarr;</span></button>
                {copyMessage && <p className="copy-message" role="status">{copyMessage}</p>}
              </div>
            )}
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
              <details><summary>What happens after I prepare the brief?<span aria-hidden="true">+</span></summary><p>Use it to clarify your own thinking or bring it to a focused conversation. Consultation timing and any fee are agreed before scheduling.</p></details>
            </div>
          </div>
        </section>

        <section className="final-cta section-wrap" aria-labelledby="final-title">
          <p className="eyebrow"><span className="eyebrow-line" /> Make the next move</p>
          <div className="final-cta-row"><h2 id="final-title">Build a business that works <em>better.</em></h2><a className="button button-lime" href="#assessment">Start building <span aria-hidden="true">&rarr;</span></a></div>
          <p>Start with the friction. We’ll work out what should come next.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Forgewell home">
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 5h30v7H13v7h17v7H13v9H5z" /><path className="brand-mark-cut" d="M22 26h13v9H22z" /></svg>
          <span className="brand-word">Forgewell<span>Business Systems + Technology</span></span>
        </a>
        <p>We Build Better Businesses.</p>
        <nav aria-label="Footer navigation"><a href="#what-we-build">What we build</a><a href="#how-we-work">How we work</a><a href="#assessment">Start building</a></nav>
        <small>© {currentYear} Forgewell. Built with purpose.</small>
      </footer>
    </div>
  )
}

export default App
