import { SiteFooter, SiteHeader } from './SiteChrome'
import { forgewellProcess } from './site-content'
import { services, servicesBySlug, type Service } from './service-data'
import { usePageMetadata } from './page-metadata'
import { PortfolioSection } from './PortfolioSection'
import './ServicePages.css'

const projectInquiry = '/#assessment'
const consultationInquiry = 'mailto:forgewellbst@gmail.com?subject=Paid%20consultation%20inquiry'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell service-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}

function PageActions() {
  return (
    <div className="service-actions">
      <a className="button button-lime" href={projectInquiry}>Discuss a project <span aria-hidden="true">&rarr;</span></a>
      <a className="text-link" href={consultationInquiry}>Ask about a paid consultation <span aria-hidden="true">&rarr;</span></a>
      <p>Consultation scope and any fee are agreed before scheduling. Online booking and payment are not configured.</p>
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="service-card">
      <div className="service-card-top"><span>0{index + 1}</span><span aria-hidden="true">FW / S{index + 1}</span></div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <p className="service-card-problem">Often useful when: {service.problems[0]}</p>
      <ul>{service.deliverables.slice(0, 3).map((item) => <li key={item.title}>{item.title}</li>)}</ul>
      <a className="service-card-link" href={`/services/${service.slug}`}>Explore this service <span aria-hidden="true">&rarr;</span></a>
    </article>
  )
}

export function ServicesOverviewPage() {
  usePageMetadata(
    'Services | Forgewell Business Systems and Technology',
    'Explore tailored websites, automation, business systems, operations, software implementation, and ongoing support from Forgewell.',
    '/services',
  )

  return (
    <PageShell>
      <main id="main">
        <section className="service-overview-hero section-wrap" aria-labelledby="services-title">
          <div className="service-overview-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> SERVICES / BUILT AROUND THE WORK</p>
            <h1 id="services-title">A clearer way to <em>build what’s next.</em></h1>
            <p>Forgewell identifies what is holding work back, then shapes the right combination of systems, technology, and practical support around your business.</p>
            <div className="service-overview-actions">
              <a className="button button-dark" href="#service-categories">I know what I need <span aria-hidden="true">&darr;</span></a>
              <a className="text-link" href="/assessment">I’m not sure what’s holding my business back <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <figure className="service-map" aria-label="Forgewell connects business friction to practical systems and clearer work">
            <figcaption>START WITH THE FRICTION</figcaption>
            <div className="service-map-flow">
              <span>Work as it happens</span><b aria-hidden="true">↓</b>
              <strong>Find the constraint</strong><b aria-hidden="true">↓</b>
              <span>Build a practical response</span>
            </div>
            <div className="service-map-foot"><span>PROCESS + PEOPLE + TECHNOLOGY</span><span>FW / 07</span></div>
          </figure>
        </section>

        <section className="service-catalog section-wrap" id="service-categories" aria-labelledby="catalog-title">
          <div className="section-heading service-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> SEVEN CAPABILITIES / ONE TAILORED ENGAGEMENT</p><h2 id="catalog-title">Start with what needs to <em>work better.</em></h2></div>
            <p>Choose a focused service or combine capabilities when the business problem crosses categories.</p>
          </div>
          <div className="service-card-grid">
            {services.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}
          </div>
        </section>

        <PortfolioSection />

        <section className="service-process-section" aria-labelledby="service-process-title">
          <div className="section-wrap">
            <div className="section-heading service-heading">
              <div><p className="eyebrow"><span className="eyebrow-line" /> THE FORGEWELL APPROACH</p><h2 id="service-process-title">Understand first.<br /><em>Build with intent.</em></h2></div>
              <p>This is a guiding process, adapted to the size and needs of each project. It does not require six separate engagements.</p>
            </div>
            <div className="service-process-grid">
              {forgewellProcess.map(([number, title, description]) => (
                <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-approach section-wrap" aria-labelledby="service-approach-title">
          <div className="service-approach-heading"><p className="eyebrow"><span className="eyebrow-line" /> PROJECTS / CUSTOM ENGAGEMENTS</p><h2 id="service-approach-title">A defined deliverable, or a broader problem to solve.</h2></div>
          <div className="service-approach-copy">
            <p>Some businesses need a clearly scoped website, workflow, or software implementation. Others need a practical combination of services to address an operational constraint.</p>
            <p>Forgewell scopes the work around the problem, dependencies, and useful deliverables. You receive a custom scope before work begins; no fixed package or price is assumed.</p>
            <p className="service-approach-note">Maintenance and retainers are optional, separately scoped arrangements.</p>
          </div>
        </section>

        <section className="service-close" aria-labelledby="service-close-title">
          <div className="section-wrap service-close-inner">
            <div><p className="eyebrow"><span className="eyebrow-line" /> MAKE THE NEXT MOVE</p><h2 id="service-close-title">Start with what feels harder than it should.</h2></div>
            <div className="service-close-actions">
              <a className="button button-lime" href={projectInquiry}>Tell us about a project <span aria-hidden="true">&rarr;</span></a>
              <a className="text-link text-link-light" href="/assessment">Start the business assessment <span aria-hidden="true">&rarr;</span></a>
              <a className="text-link text-link-light" href={consultationInquiry}>Ask about a paid consultation <span aria-hidden="true">&rarr;</span></a>
              <p>Consultation scope and any fee are agreed before scheduling. No online booking or payment is currently configured.</p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}

export function ServiceDetailPage({ service }: { service: Service }) {
  usePageMetadata(
    `${service.title} | Forgewell`,
    service.summary,
    `/services/${service.slug}`,
  )
  const relatedServices = service.related.map((slug) => servicesBySlug.get(slug)).filter((item): item is Service => Boolean(item))

  return (
    <PageShell>
      <main id="main">
        <nav className="service-breadcrumb section-wrap" aria-label="Breadcrumb"><a href="/services">Services</a><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
        <section className="service-detail-hero section-wrap" aria-labelledby="service-title">
          <p className="eyebrow"><span className="eyebrow-line" /> FORGEWELL SERVICES / {service.title.toUpperCase()}</p>
          <h1 id="service-title">{service.title}</h1>
          <div className="service-detail-intro"><p>{service.summary}</p><p>{service.problem}</p></div>
          <PageActions />
        </section>

        <section className="service-detail-section service-audience-section" aria-labelledby="service-audience-title">
          <div className="section-wrap service-detail-two-col">
            <div><p className="eyebrow"><span className="eyebrow-line" /> WHO IT’S FOR</p><h2 id="service-audience-title">Built around the people doing the work.</h2></div>
            <div><p className="service-audience-copy">{service.audience}</p><h3>Problems this can help address</h3><ul className="service-check-list">{service.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul></div>
          </div>
        </section>

        <section className="service-detail-section service-deliverables-section" aria-labelledby="deliverables-title">
          <div className="section-wrap">
            <div className="section-heading service-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> PRACTICAL SCOPE</p><h2 id="deliverables-title">What the work can <em>include.</em></h2></div><p>Deliverables are selected to fit the need, existing systems, access, and agreed scope.</p></div>
            <div className="service-deliverables-grid">{service.deliverables.map((item, index) => <article className="service-deliverable" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
          </div>
        </section>

        <section className="service-detail-section service-outcomes-section" aria-labelledby="outcomes-title">
          <div className="section-wrap service-detail-two-col">
            <div><p className="eyebrow"><span className="eyebrow-line" /> THE INTENT</p><h2 id="outcomes-title">Useful change, without inflated promises.</h2></div>
            <ul className="service-outcome-list">{service.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </div>
        </section>

        <section className="service-detail-section service-engagement-section" aria-labelledby="engagement-title">
          <div className="section-wrap">
            <div className="section-heading service-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> HOW AN ENGAGEMENT WORKS</p><h2 id="engagement-title">A clear path from question to <em>handover.</em></h2></div><p>Scope and sequence are adapted to the project; ongoing support is never a requirement.</p></div>
            <ol className="service-engagement-list">{service.approach.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
          </div>
        </section>

        <section className="service-related-section" aria-labelledby="related-title">
          <div className="section-wrap">
            <div className="section-heading service-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> CONNECTED CAPABILITIES</p><h2 id="related-title">Related services that may <em>fit.</em></h2></div><p>Only combine services when they help address the same business need.</p></div>
            <div className="related-service-list">{relatedServices.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><span>{item.title}</span><span aria-hidden="true">&rarr;</span><small>{item.summary}</small></a>)}</div>
          </div>
        </section>

        <section className="service-faq-section section-wrap" aria-labelledby="service-faq-title">
          <div><p className="eyebrow"><span className="eyebrow-line" /> A FEW USEFUL ANSWERS</p><h2 id="service-faq-title">Before we <em>begin.</em></h2></div>
          <div className="faq-list">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="service-close" aria-labelledby="detail-close-title">
          <div className="section-wrap service-close-inner"><div><p className="eyebrow"><span className="eyebrow-line" /> NEXT STEP</p><h2 id="detail-close-title">Let’s start with the business problem.</h2></div><PageActions /></div>
        </section>
      </main>
    </PageShell>
  )
}

export function NotFoundPage() {
  usePageMetadata('Page not found | Forgewell', 'This Forgewell page could not be found.', window.location.pathname)

  return (
    <PageShell>
      <main id="main" className="service-not-found section-wrap">
        <p className="eyebrow"><span className="eyebrow-line" /> PAGE NOT FOUND</p>
        <h1>This page isn’t here.</h1>
        <p>Return to the Services overview or visit the Forgewell homepage to find a useful next step.</p>
        <div className="service-not-found-actions"><a className="button button-lime" href="/services">Explore services <span aria-hidden="true">&rarr;</span></a><a className="text-link" href="/">Go to the homepage <span aria-hidden="true">&rarr;</span></a></div>
      </main>
    </PageShell>
  )
}