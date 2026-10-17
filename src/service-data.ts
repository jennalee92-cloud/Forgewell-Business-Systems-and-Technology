export type ServiceFaq = { question: string; answer: string }

export type Service = {
  slug: string
  title: string
  summary: string
  problem: string
  audience: string
  problems: string[]
  deliverables: { title: string; description: string }[]
  outcomes: string[]
  approach: string[]
  related: string[]
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'websites-digital-presence',
    title: 'Websites & Digital Presence',
    summary: 'A useful digital presence makes it easier for people to understand what you do, trust what they see, and take a clear next step.',
    problem: 'Your website is often the first place a customer looks for answers. When it is unclear, difficult to use, or disconnected from the way the business works, people have to work too hard to understand what comes next.',
    audience: 'New businesses establishing a credible foundation, and established teams whose website no longer reflects their services, customers, or operations.',
    problems: [
      'Visitors cannot quickly tell who you help or how to get started.',
      'The current site is hard to update or no longer fits the business.',
      'Inquiries arrive without the context needed for a useful response.',
      'A new offer, campaign, or online store needs a clear digital home.',
    ],
    deliverables: [
      { title: 'Custom websites and redesigns', description: 'Responsive page structure, content hierarchy, and visual design shaped around your business and the people it serves.' },
      { title: 'Landing pages and lead intake', description: 'Focused campaign or service pages with forms and next steps suited to the actual inquiry process.' },
      { title: 'E-commerce and digital integrations', description: 'Product, payment, booking, or business-tool connections scoped to platform capabilities and project needs.' },
      { title: 'Domain, business email, and SEO foundations', description: 'Setup guidance, on-page structure, metadata, and indexability checks without promising rankings or traffic.' },
    ],
    outcomes: [
      'A clearer explanation of the business and its offerings.',
      'A more direct path from a visitor question to an appropriate next step.',
      'A digital foundation the team can understand and maintain after handover.',
    ],
    approach: [
      'Clarify the audience, content, purpose, constraints, and required integrations.',
      'Agree on scope, platform, responsibilities, and review points before implementation.',
      'Build, test key journeys across screen sizes, and hand over access and guidance.',
    ],
    related: ['ai-automation-technology', 'software-selection-implementation', 'ongoing-support-maintenance'],
    faqs: [
      { question: 'Does website work include ongoing maintenance?', answer: 'A defined website project and ongoing maintenance are separate scopes. Support can be discussed as an optional arrangement after launch.' },
      { question: 'Can you guarantee search rankings or traffic?', answer: 'No. Forgewell can build sound technical and on-page SEO foundations, but rankings, traffic, and business results depend on factors outside a website project.' },
    ],
  },
  {
    slug: 'ai-automation-technology',
    title: 'AI Automation & Technology',
    summary: 'Practical automation starts with a workflow worth improving, then connects the right tools with clear human oversight.',
    problem: 'Repeated copying, chasing, and handoffs consume attention. New technology can help, but adding a tool before understanding the workflow can add another place for work to get stuck.',
    audience: 'Owners and teams handling repeatable tasks across forms, inboxes, spreadsheets, and software who want more consistent ways to move work forward.',
    problems: [
      'The same information is entered into multiple systems.',
      'Leads or requests need a more reliable intake and follow-up path.',
      'People spend time searching, sorting, or summarizing routine information.',
      'Existing software is disconnected or does not support the way work flows.',
    ],
    deliverables: [
      { title: 'Workflow analysis and automation design', description: 'Map the current steps and exceptions before deciding what should change or remain human-led.' },
      { title: 'Software connections and practical automations', description: 'Configure available integrations and handoffs where platform access and APIs allow.' },
      { title: 'AI-assisted processes and custom assistants', description: 'Set up bounded assistance for tasks such as drafting, sorting, or retrieving information, with review points defined.' },
      { title: 'Lead intake and follow-up workflows', description: 'Connect forms and routine notifications to an agreed process without implying that messages are sent automatically unless configured.' },
    ],
    outcomes: [
      'Fewer avoidable manual handoffs in the selected workflow.',
      'More consistent handling of routine work and information.',
      'A clear understanding of where human review remains necessary.',
    ],
    approach: [
      'Choose a specific workflow and define what a better day-to-day looks like.',
      'Check platform fit, permissions, data handling, failure cases, and human oversight.',
      'Implement a bounded solution, test realistic scenarios, and document how to operate it.',
    ],
    related: ['software-selection-implementation', 'business-systems-sops', 'websites-digital-presence'],
    faqs: [
      { question: 'Should every repetitive task be automated?', answer: 'No. Some tasks should be removed, simplified, documented, or kept human-led. The workflow comes before the technology choice.' },
      { question: 'Can every app be connected?', answer: 'No. Feasibility depends on the platforms, permissions, APIs, plan limits, and project scope. Those constraints are checked before implementation.' },
    ],
  },
  {
    slug: 'business-systems-sops',
    title: 'Business Systems & SOPs',
    summary: 'Make important work easier to understand, repeat, hand off, and improve without burying the team in paperwork.',
    problem: 'When processes live only in memory, employees have to guess, owners become the default answer, and useful knowledge can disappear when roles change.',
    audience: 'Businesses onboarding people, delegating recurring work, or trying to make important tasks less dependent on one person.',
    problems: [
      'The same questions return because instructions are hard to find.',
      'Quality or handoffs vary depending on who is doing the work.',
      'Training depends on informal shadowing and repeated explanations.',
      'The owner holds critical decisions and process knowledge alone.',
    ],
    deliverables: [
      { title: 'SOPs and practical process documentation', description: 'Task-focused instructions, decision points, and ownership written for the people who will use them.' },
      { title: 'Workflow maps and improvement', description: 'A visible picture of steps, roles, handoffs, and friction before documentation is finalized.' },
      { title: 'Onboarding and training materials', description: 'Role-based guides, checklists, and knowledge resources that support consistent learning.' },
      { title: 'Forms, templates, and operational checklists', description: 'Reusable tools that help capture information and make routine work easier to complete.' },
    ],
    outcomes: [
      'Important knowledge is easier for the team to find and use.',
      'Clearer ownership and fewer avoidable clarification loops.',
      'A practical foundation for delegation, onboarding, and later improvement.',
    ],
    approach: [
      'Observe or map how the work actually happens, including exceptions.',
      'Decide what needs a procedure, checklist, template, or tool and who owns it.',
      'Draft with the people doing the work, test usability, and agree on review ownership.',
    ],
    related: ['operations-project-management', 'ai-automation-technology', 'business-growth-restructuring'],
    faqs: [
      { question: 'Will this create a large manual no one uses?', answer: 'The goal is useful documentation at the point of work. Scope can be limited to the procedures and formats the team needs now.' },
      { question: 'Can you help with employee onboarding?', answer: 'Yes. Work can include role-specific onboarding steps, checklists, training materials, and a clear path to the relevant process knowledge.' },
    ],
  },
  {
    slug: 'operations-project-management',
    title: 'Operations & Project Management',
    summary: 'Bring clearer priorities, ownership, and coordination to the projects and recurring work that keep the business moving.',
    problem: 'Projects lose momentum when priorities compete, handoffs are unclear, and nobody can see what is blocked or who owns the next step.',
    audience: 'Teams managing more work than their current routines can comfortably coordinate, or owners who need better visibility without adding unnecessary process.',
    problems: [
      'Projects start without a shared scope, sequence, or owner.',
      'Work gets delayed between people, tools, or departments.',
      'Important tasks and decisions are difficult to track.',
      'Processes have grown around exceptions and need a clearer operating rhythm.',
    ],
    deliverables: [
      { title: 'Project plans and coordination', description: 'Practical scope, milestones, responsibilities, risks, and check-in structure for an agreed project.' },
      { title: 'Operating procedures and team accountability', description: 'Clear roles, handoffs, and repeatable meeting or review rhythms suited to the team.' },
      { title: 'Work visibility and dashboards', description: 'Simple views of status, ownership, and blockers using suitable existing or selected tools.' },
      { title: 'Process improvement and restructuring support', description: 'Identify bottlenecks and organize practical changes to how work is coordinated.' },
    ],
    outcomes: [
      'A shared view of what matters, who owns it, and what comes next.',
      'More visible blockers and clearer handoffs.',
      'A workable approach to delivering projects and recurring operational tasks.',
    ],
    approach: [
      'Define the outcome, people involved, constraints, and current delivery pattern.',
      'Set a proportionate plan, ownership model, and communication rhythm.',
      'Coordinate implementation and leave the team with usable tracking and handover.' ,
    ],
    related: ['business-systems-sops', 'business-growth-restructuring', 'software-selection-implementation'],
    faqs: [
      { question: 'Do you take over all project management?', answer: 'The role is scoped to the project need. Forgewell can establish structure, coordinate agreed work, or support an internal owner rather than assume permanent control.' },
      { question: 'Do you provide regulated or certified services?', answer: 'This service focuses on practical operations and project coordination. No specialized certification or regulated professional service is implied.' },
    ],
  },
  {
    slug: 'business-growth-restructuring',
    title: 'Business Growth & Restructuring',
    summary: 'Find what is constraining the next stage of the business and shape a practical improvement roadmap around the real problem.',
    problem: 'Growth can expose weak handoffs, owner dependency, outdated tools, or processes that no longer fit. Choosing a solution before understanding the constraint can spend effort in the wrong place.',
    audience: 'New and established business owners who can feel that the current way of operating is limiting capacity, clarity, or the ability to move forward.',
    problems: [
      'The owner is involved in too many routine decisions and tasks.',
      'Growth is adding complexity faster than the operating model can absorb it.',
      'Technology, processes, and responsibilities have developed separately.',
      'There are many possible improvements but no clear place to start.',
    ],
    deliverables: [
      { title: 'Business systems and needs assessment', description: 'A structured review of stated goals, operating friction, current systems, and practical constraints.' },
      { title: 'Growth bottleneck and owner-dependency mapping', description: 'Identify where work or decisions rely on one person and what may make handoff more workable.' },
      { title: 'Business process and technology strategy', description: 'Prioritized options grounded in the current situation rather than a predetermined tool or package.' },
      { title: 'Practical improvement roadmap', description: 'A sequenced set of possible actions, dependencies, and next decisions for the business to consider.' },
    ],
    outcomes: [
      'A clearer view of constraints and possible leverage points.',
      'A practical sequence for process, technology, delegation, or documentation work.',
      'Better-informed decisions about what to implement now and what can wait.',
    ],
    approach: [
      'Understand the business stage, goals, work patterns, and what feels constrained.',
      'Separate visible symptoms from underlying causes and validate assumptions with the team.',
      'Present practical options and a roadmap; implementation is scoped separately where needed.',
    ],
    related: ['operations-project-management', 'business-systems-sops', 'software-selection-implementation'],
    faqs: [
      { question: 'Is this a guarantee of business growth?', answer: 'No. The work helps identify constraints and plan practical changes; business growth and financial results depend on many factors beyond this engagement.' },
      { question: 'Does a roadmap require hiring Forgewell to implement it?', answer: 'No. Recommendations can guide your own team or lead to a separately scoped implementation if that is useful.' },
    ],
  },
  {
    slug: 'software-selection-implementation',
    title: 'Software Selection & Implementation',
    summary: 'Choose and configure software around how the business needs to work, with usability and team adoption considered from the start.',
    problem: 'A tool can look capable and still create friction if it does not fit the process, existing systems, access needs, or the people expected to use it.',
    audience: 'Businesses evaluating software, consolidating subscriptions, replacing a tool, or trying to get more value from systems they already have.',
    problems: [
      'It is unclear which tool fits the actual requirements.',
      'The business has overlapping subscriptions or fragmented records.',
      'Software has been purchased but setup and adoption have stalled.',
      'Current tools do not connect cleanly with the workflow around them.',
    ],
    deliverables: [
      { title: 'Software needs and selection research', description: 'Requirements, constraints, and a practical comparison of relevant options for the business.' },
      { title: 'Configuration and implementation', description: 'Initial setup, roles, workflows, and migration planning within platform and project limits.' },
      { title: 'Integrations and operational fit', description: 'Review available connections and configure appropriate handoffs where technically supported.' },
      { title: 'Team guidance and adoption materials', description: 'Role-focused orientation and documentation that help the people using the software understand the new routine.' },
    ],
    outcomes: [
      'A selection process grounded in operational needs and constraints.',
      'A more deliberate setup and transition plan.',
      'Clearer expectations for team use, ownership, and ongoing administration.',
    ],
    approach: [
      'Document requirements, current tools, users, access needs, and integration constraints.',
      'Compare suitable options and agree on the selection before purchase or migration.',
      'Configure, test representative workflows, and support a clear handover and adoption plan.',
    ],
    related: ['ai-automation-technology', 'business-systems-sops', 'ongoing-support-maintenance'],
    faqs: [
      { question: 'Are you certified by a software vendor?', answer: 'No vendor certification or authorized-partner relationship is implied. Recommendations are based on fit, access, and project requirements.' },
      { question: 'Can you help us evaluate tools we already pay for?', answer: 'Yes. A review can map current use, overlap, constraints, and possible next steps before any new software is selected.' },
    ],
  },
  {
    slug: 'ongoing-support-maintenance',
    title: 'Ongoing Support & Maintenance',
    summary: 'Keep implemented websites, workflows, and business systems useful as your tools, team, and priorities change.',
    problem: 'A launch or implementation is a point in time. Without clear ownership for updates and review, small changes can leave a system outdated or difficult to rely on.',
    audience: 'Businesses that want optional, defined help maintaining a Forgewell implementation or making measured improvements over time.',
    problems: [
      'A website needs planned content, security, or technical updates.',
      'Automations and integrations need periodic review as connected tools change.',
      'The team wants a regular place to raise systems issues and improvements.',
      'No one is sure what is included in a maintenance or support arrangement.',
    ],
    deliverables: [
      { title: 'Website maintenance and updates', description: 'Agreed updates and maintenance tasks defined by platform, access, and support scope.' },
      { title: 'Workflow and automation review', description: 'Periodic checks of selected processes, dependencies, and reported issues.' },
      { title: 'Systems improvement support', description: 'A scoped cadence for reviewing operational needs and implementing agreed small improvements.' },
      { title: 'Business systems review', description: 'A scheduled review of how implemented systems fit current workflows and priorities.' },
    ],
    outcomes: [
      'Clear ownership for selected maintenance and improvement work.',
      'A regular opportunity to review whether systems still fit the business.',
      'A transparent boundary between included support and separately scoped work.',
    ],
    approach: [
      'Review the implementation, current needs, access, and expected support responsibilities.',
      'Agree the cadence, scope, exclusions, communication method, and commercial terms in writing.',
      'Review work periodically and adjust the arrangement as needs change.',
    ],
    related: ['websites-digital-presence', 'ai-automation-technology', 'software-selection-implementation'],
    faqs: [
      { question: 'Is a retainer required after a project?', answer: 'No. Recurring support is optional and separately scoped. A project can be handed over without an ongoing arrangement.' },
      { question: 'Does ongoing support mean 24/7 availability or unlimited revisions?', answer: 'No. Availability, response expectations, included work, and fees must be agreed for each arrangement; none are assumed here.' },
    ],
  },
]

export const servicesBySlug = new Map(services.map((service) => [service.slug, service]))