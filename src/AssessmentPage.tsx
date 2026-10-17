import { useState, type FormEvent } from 'react'
import { PageShell } from './ServicePages'
import { services, servicesBySlug } from './service-data'
import { usePageMetadata } from './page-metadata'

type AssessmentAnswers = {
  stage: string
  challenge: string
  areas: string[]
  goal: string
  help: string
  name: string
  business: string
  email: string
  context: string
}

const stepNames = ['Business stage', 'Current challenge', 'Affected areas', 'What to improve', 'Kind of help', 'Review']
const stageOptions = ['Starting a business', 'Established and operating', 'Growing quickly', 'Restructuring or improving an existing operation']
const challengeOptions = [
  'Website or digital presence',
  'Repetitive manual work',
  'Disorganized processes or missing documentation',
  'Project coordination or operational inefficiency',
  'Difficulty delegating or reducing owner dependency',
  'Choosing or implementing software',
  'Keeping existing systems maintained',
  'I’m not sure yet',
  'Other',
]
const areaOptions = ['Technology', 'Team and training', 'Daily operations', 'Customer experience', 'Growth and scalability', 'Multiple areas']
const helpOptions = ['A specific project', 'Advice on what to do next', 'A broader review of my business systems', 'Ongoing support', 'Not sure yet']
const challengeService: Record<string, string> = {
  'Website or digital presence': 'websites-digital-presence',
  'Repetitive manual work': 'ai-automation-technology',
  'Disorganized processes or missing documentation': 'business-systems-sops',
  'Project coordination or operational inefficiency': 'operations-project-management',
  'Difficulty delegating or reducing owner dependency': 'business-growth-restructuring',
  'Choosing or implementing software': 'software-selection-implementation',
  'Keeping existing systems maintained': 'ongoing-support-maintenance',
  'I’m not sure yet': 'business-growth-restructuring',
  Other: 'business-growth-restructuring',
}

const initialAnswers: AssessmentAnswers = {
  stage: '',
  challenge: '',
  areas: [],
  goal: '',
  help: '',
  name: '',
  business: '',
  email: '',
  context: '',
}

function RadioOptions({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="assessment-option-list">
      {options.map((option) => (
        <label className="assessment-choice" key={option}>
          <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

export function AssessmentPage() {
  usePageMetadata(
    'Business Assessment | Forgewell',
    'Answer a few questions about your business to create a preliminary summary and identify useful Forgewell next steps.',
    '/assessment',
  )
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [complete, setComplete] = useState(false)

  const updateAnswer = <K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    setError('')
  }

  const validateStep = () => {
    if (step === 0 && !answers.stage) return 'Choose the stage that best describes your business.'
    if (step === 1 && !answers.challenge) return 'Choose the challenge that feels closest, or select “I’m not sure yet”.'
    if (step === 2 && answers.areas.length === 0) return 'Select at least one affected area.'
    if (step === 3 && answers.goal.trim().length < 12) return 'Add a little more detail (at least 12 characters) so the summary has useful context.'
    if (step === 4 && !answers.help) return 'Choose the kind of help you are looking for.'
    return ''
  }

  const continueAssessment = () => {
    const validationMessage = validateStep()
    if (validationMessage) {
      setError(validationMessage)
      return
    }
    setStep((current) => Math.min(current + 1, stepNames.length - 1))
    setError('')
  }

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setComplete(true)
  }

  const toggleArea = (area: string) => {
    updateAnswer('areas', answers.areas.includes(area)
      ? answers.areas.filter((item) => item !== area)
      : [...answers.areas, area])
  }

  const primarySlug = challengeService[answers.challenge] || 'business-growth-restructuring'
  const primaryService = servicesBySlug.get(primarySlug) ?? services[0]
  const relatedService = answers.areas.includes('Technology') && primarySlug !== 'software-selection-implementation'
    ? servicesBySlug.get('software-selection-implementation')
    : answers.areas.includes('Team and training') && primarySlug !== 'business-systems-sops'
      ? servicesBySlug.get('business-systems-sops')
      : undefined
  const recommendedServices = relatedService && relatedService.slug !== primaryService.slug
    ? [primaryService, relatedService]
    : [primaryService]

  const summary = [
    'Forgewell business assessment - preliminary summary',
    `Business stage: ${answers.stage}`,
    `Current challenge: ${answers.challenge}`,
    `Affected areas: ${answers.areas.join(', ')}`,
    `What I would like to improve: ${answers.goal.trim()}`,
    `Kind of help: ${answers.help}`,
    answers.name.trim() ? `Name: ${answers.name.trim()}` : '',
    answers.business.trim() ? `Business: ${answers.business.trim()}` : '',
    answers.email.trim() ? `Email: ${answers.email.trim()}` : '',
    answers.context.trim() ? `Additional context: ${answers.context.trim()}` : '',
  ].filter(Boolean).join('\n\n')
  const emailDraft = `mailto:forgewellbst@gmail.com?subject=${encodeURIComponent('Business assessment follow-up')}&body=${encodeURIComponent(summary)}`

  return (
    <PageShell>
      <main id="main">
        <section className="assessment-page section-wrap" aria-labelledby="assessment-page-title">
          <div className="assessment-page-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> A USEFUL STARTING POINT</p>
            <h1 id="assessment-page-title">Get clearer on what needs to <em>change.</em></h1>
            <p>Answer a few questions about the business. Your responses create a preliminary summary, not an audit or definitive diagnosis.</p>
          </div>

          {!complete ? (
            <div className="assessment-panel">
              <div className="assessment-panel-top">
                <p className="assessment-step-count" role="status">Step {step + 1} of {stepNames.length}: {stepNames[step]}</p>
                <ol className="assessment-progress" aria-label="Assessment progress">
                  {stepNames.map((name, index) => <li className={index === step ? 'is-current' : index < step ? 'is-done' : ''} aria-current={index === step ? 'step' : undefined} key={name}><span>{index < step ? '✓' : `0${index + 1}`}</span><small>{name}</small></li>)}
                </ol>
              </div>

              <form className="assessment-form-step" onSubmit={submitReview}>
                {step === 0 && <fieldset><legend>What stage is your business in?</legend><RadioOptions name="stage" options={stageOptions} value={answers.stage} onChange={(value) => updateAnswer('stage', value)} /></fieldset>}
                {step === 1 && <fieldset><legend>What is your biggest current challenge?</legend><RadioOptions name="challenge" options={challengeOptions} value={answers.challenge} onChange={(value) => updateAnswer('challenge', value)} /></fieldset>}
                {step === 2 && (
                  <fieldset>
                    <legend>Which areas are affected?</legend>
                    <div className="assessment-option-list">
                      {areaOptions.map((area) => <label className="assessment-choice" key={area}><input type="checkbox" checked={answers.areas.includes(area)} onChange={() => toggleArea(area)} /><span>{area}</span></label>)}
                    </div>
                  </fieldset>
                )}
                {step === 3 && <div className="assessment-text-step"><label htmlFor="assessment-goal">What would you most like to improve?</label><textarea id="assessment-goal" value={answers.goal} onChange={(event) => updateAnswer('goal', event.target.value)} minLength={12} maxLength={600} rows={5} placeholder="Describe a task, handoff, or outcome you want to make easier." aria-invalid={Boolean(error)} aria-describedby={error ? 'assessment-error' : undefined} /></div>}
                {step === 4 && <fieldset><legend>What kind of help are you looking for?</legend><RadioOptions name="help" options={helpOptions} value={answers.help} onChange={(value) => updateAnswer('help', value)} /></fieldset>}
                {step === 5 && (
                  <div className="assessment-review">
                    <h2>Review your answers</h2>
                    <dl>
                      <div><dt>Business stage</dt><dd>{answers.stage}</dd></div>
                      <div><dt>Current challenge</dt><dd>{answers.challenge}</dd></div>
                      <div><dt>Affected areas</dt><dd>{answers.areas.join(', ')}</dd></div>
                      <div><dt>What to improve</dt><dd>{answers.goal.trim()}</dd></div>
                      <div><dt>Kind of help</dt><dd>{answers.help}</dd></div>
                    </dl>
                    <div className="assessment-optional-fields">
                      <p>Optional contact details for the email draft</p>
                      <div className="assessment-contact-pair"><label>Name<input value={answers.name} autoComplete="name" onChange={(event) => updateAnswer('name', event.target.value)} /></label><label>Business name<input value={answers.business} autoComplete="organization" onChange={(event) => updateAnswer('business', event.target.value)} /></label></div>
                      <label>Email<input type="email" value={answers.email} autoComplete="email" onChange={(event) => updateAnswer('email', event.target.value)} /></label>
                      <label>Anything else Forgewell should know?<textarea value={answers.context} onChange={(event) => updateAnswer('context', event.target.value)} maxLength={800} rows={3} /></label>
                    </div>
                    <p className="assessment-privacy-note">Your answers remain in this browser until you choose to open an email draft. Nothing is submitted automatically.</p>
                  </div>
                )}

                {error && <p id="assessment-error" className="assessment-error" role="alert">{error}</p>}
                <div className="assessment-step-actions">
                  {step > 0 && <button className="button button-outline" type="button" onClick={() => { setStep((current) => current - 1); setError('') }}>Back</button>}
                  {step < stepNames.length - 1
                    ? <button className="button button-lime" type="button" onClick={continueAssessment}>Continue <span aria-hidden="true">&rarr;</span></button>
                    : <button className="button button-lime" type="submit">Create preliminary summary <span aria-hidden="true">&rarr;</span></button>}
                </div>
              </form>
            </div>
          ) : (
            <section className="assessment-results" aria-labelledby="assessment-results-title" aria-live="polite">
              <p className="eyebrow"><span className="eyebrow-line" /> YOUR PRELIMINARY SUMMARY</p>
              <h2 id="assessment-results-title">A useful place to begin.</h2>
              <p>Based on what you shared, <strong>{primaryService.title}</strong> may be a relevant area to explore. This is an initial reflection of your answers, not a professional audit, final diagnosis, or guaranteed recommendation. A deeper review may be useful after discussing the business context.</p>
              <div className="assessment-result-summary">
                <div><span>Business stage</span><p>{answers.stage}</p></div>
                <div><span>Main challenge</span><p>{answers.challenge}</p></div>
                <div><span>Affected areas</span><p>{answers.areas.join(', ')}</p></div>
                <div><span>Desired improvement</span><p>{answers.goal.trim()}</p></div>
              </div>
              <h3>Related services to explore</h3>
              <div className="assessment-recommendations">{recommendedServices.map((service) => <a href={`/services/${service.slug}`} key={service.slug}><span>{service.title}</span><span aria-hidden="true">&rarr;</span><small>{service.summary}</small></a>)}</div>
              <div className="assessment-result-actions">
                <a className="button button-lime" href={emailDraft}>Prepare email draft <span aria-hidden="true">&rarr;</span></a>
                <a className="text-link" href="/#assessment">Start a project inquiry <span aria-hidden="true">&rarr;</span></a>
                <a className="text-link" href="mailto:forgewellbst@gmail.com?subject=Paid%20consultation%20inquiry">Ask about a paid consultation <span aria-hidden="true">&rarr;</span></a>
                <p>Review the draft before sending. A consultation’s scope and any fee are agreed before scheduling; online booking and payment are not configured.</p>
              </div>
              <button className="assessment-restart" type="button" onClick={() => { setAnswers(initialAnswers); setStep(0); setComplete(false); setError('') }}>Start again</button>
            </section>
          )}
        </section>
      </main>
    </PageShell>
  )
}