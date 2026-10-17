export type PortfolioCaseStudy = {
  title: string
  initialSituation: string
  constraint: string
  workPerformed: string
  deliverables: string[]
  observedImprovement?: string
}

const verifiedCaseStudies: PortfolioCaseStudy[] = []

export function PortfolioSection() {
  return (
    <section className="portfolio-section" aria-labelledby="portfolio-title">
      <div className="section-wrap portfolio-inner">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> VERIFIED WORK / CASE STUDIES</p>
          <h2 id="portfolio-title">Real work, shared when it’s ready.</h2>
        </div>
        {verifiedCaseStudies.length > 0 ? (
          <div className="portfolio-case-list">
            {verifiedCaseStudies.map((study) => (
              <article className="portfolio-case" key={study.title}>
                <h3>{study.title}</h3>
                <dl>
                  <div><dt>Initial situation</dt><dd>{study.initialSituation}</dd></div>
                  <div><dt>Constraint</dt><dd>{study.constraint}</dd></div>
                  <div><dt>Work performed</dt><dd>{study.workPerformed}</dd></div>
                  <div><dt>Deliverables</dt><dd>{study.deliverables.join(', ')}</dd></div>
                  {study.observedImprovement && <div><dt>Observed improvement</dt><dd>{study.observedImprovement}</dd></div>}
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <div className="portfolio-empty">
            <p>There are no verified client case studies to publish yet. We’ll add examples when there is real work and evidence worth sharing.</p>
            <a className="text-link" href="/#forgewell-lab">Explore illustrative Forgewell Lab demonstrations <span aria-hidden="true">&rarr;</span></a>
          </div>
        )}
      </div>
    </section>
  )
}