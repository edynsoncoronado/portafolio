import type { Dictionary } from './types';

/** English dictionary. Typed against `Dictionary` so it can never drift from `es.ts`. */
export const en = {
  meta: {
    title: 'KERULab | Software, Automation and Artificial Intelligence for Business',
    description:
      'KERULab helps companies optimize their processes through consulting, SaaS ERP, automation, custom software and artificial intelligence.',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    languageSelector: 'Select language',
    spanish: 'Spanish',
    english: 'English',
    scrollHint: 'Scroll for more',
    tablist: 'Platform modules',
    horizontalScroll: 'Horizontally scrollable content',
  },

  common: {
    demoData: 'Demo data',
    useCase: 'Use case',
    exampleSolution: 'Example solution',
    mockup: 'Illustrative mockup',
    learnMore: 'See details',
    brandTagline: 'Processes, automation and AI for business',
  },

  nav: {
    services: 'Services',
    erp: 'SaaS ERP',
    ai: 'AI & Automation',
    industries: 'Industries',
    process: 'How we work',
    about: 'About',
    contact: 'Contact',
    book: 'Book a consultation',
    demo: 'Request a demo',
  },

  hero: {
    eyebrow: 'Consulting · SaaS ERP · Applied AI',
    titleLead: 'We transform business processes with',
    titleGradient: 'software, automation and artificial intelligence',
    subtitle:
      'We analyze how your company actually works, identify opportunities for improvement, and build technology that automates operations, centralizes information and supports better decisions.',
    ctaPrimary: 'Book a consultation',
    ctaSecondary: 'Explore solutions',
    note: 'We work with small and mid-sized companies in manufacturing, healthcare, education and beyond.',
    flowTitle: 'From process to decision',
    flowCaption: 'How we connect day-to-day operations with data-driven decisions.',
    flow: {
      process: 'Processes',
      processDetail: 'Sales, purchasing, inventory, admin',
      data: 'Data',
      dataDetail: 'Centralized and consistent',
      automation: 'Automation',
      automationDetail: 'Less manual work',
      ai: 'Artificial intelligence',
      aiDetail: 'Queries, documents and assistants',
      decisions: 'Decisions',
      decisionsDetail: 'Metrics in real time',
    },
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'One team across the whole journey',
    subtitle:
      'From analyzing the process to running the solution in production, without handing the problem to someone else.',
    items: {
      consulting: {
        title: 'Business consulting',
        description: 'We understand the process before proposing technology.',
      },
      ai: {
        title: 'AI solutions',
        description: 'Assistants, document RAG and models applied to your operation.',
      },
      erp: {
        title: 'ERP',
        description: 'Sales, inventory and administration on a single platform.',
      },
      automation: {
        title: 'Automation',
        description: 'Repetitive tasks and flows between systems.',
      },
      software: {
        title: 'Custom software',
        description: 'For when no off-the-shelf tool fits.',
      },
      data: {
        title: 'Data & dashboards',
        description: 'Metrics people actually read and use.',
      },
    },
  },

  value: {
    eyebrow: 'Where we start',
    title: "Your company doesn't need more software. It needs better processes.",
    intro:
      "Most companies don't have a tooling problem: they have processes that grew without design. Before writing a line of code we look for where time, information and visibility are being lost.",
    problemsTitle: 'Signs that a process has fallen behind',
    problems: [
      {
        title: 'Manual work that repeats',
        description: 'Copying data between systems, redoing the same calculations, resending the same emails.',
      },
      {
        title: 'Information scattered everywhere',
        description: 'Spreadsheets, inboxes and folders where nobody knows which version is the valid one.',
      },
      {
        title: "Systems that don't talk to each other",
        description: 'Every department with its own tool and a person in the middle acting as the integration.',
      },
      {
        title: 'Reports built by hand',
        description: 'Days of work every month to produce a report that is outdated within a week.',
      },
      {
        title: 'No visibility',
        description: 'Knowing what happened last month is possible; knowing what is happening today is not.',
      },
      {
        title: 'Processes that depend on one person',
        description: 'If that person is away, the process stops or gets done a different way.',
      },
      {
        title: 'Documentation nobody can find',
        description: 'Manuals, policies and procedures that exist but never surface when they are needed.',
      },
      {
        title: 'Decisions that arrive late',
        description: 'The data exists, but it arrives once it can no longer change anything.',
      },
    ],
    philosophyTitle: 'How we approach it',
    philosophySubtitle: 'A short, repeatable and measurable cycle.',
    philosophy: [
      { step: 'Understand', description: 'We map the real process, not the one in the manual.' },
      { step: 'Design', description: 'We define how it should work and which technology supports it.' },
      { step: 'Automate', description: 'We implement ERP, integrations, software and AI where they pay off.' },
      { step: 'Measure', description: 'We instrument metrics and adjust based on real data.' },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'Solutions designed around your business',
    subtitle:
      'Three lines of work that combine according to what your operation needs. You can start with any of them.',
    areasLabel: 'Areas we usually start with',
    featuresLabel: "What's included",
    capabilitiesLabel: 'Capabilities',
    items: {
      consulting: {
        name: 'Business consulting & transformation',
        tag: 'Start here',
        description:
          'We help identify opportunities for improvement, digitalization and automation across business processes, with a diagnosis prioritized by impact and effort.',
        list: [
          'Sales',
          'Finance',
          'Purchasing',
          'Inventory',
          'Operations',
          'Human resources',
          'Marketing',
          'Customer support',
          'Administration',
        ],
        cta: 'Analyze my process',
      },
      erp: {
        name: 'SaaS ERP',
        tag: 'Built on Odoo Enterprise',
        description:
          'KERULab ERP is a SaaS platform built on Odoo Enterprise, on top of which we develop an integrated business experience with automation and artificial intelligence applications.',
        list: [
          'Sales',
          'Inventory',
          'Reporting',
          'Automation',
          'Artificial intelligence',
          'Centralized information',
        ],
        cta: 'Request a demo',
      },
      custom: {
        name: 'Custom software + AI',
        tag: 'When standard tools fall short',
        description:
          "We build specific solutions when existing tools don't cover the needs of the business, integrated with what you already use.",
        list: [
          'Process automation',
          'ERP integration',
          'APIs',
          'Dashboards',
          'Business applications',
          'RAG over documents',
          'AI agents',
          'AI model integration',
        ],
        cta: 'Talk to a specialist',
      },
    },
  },

  erp: {
    eyebrow: 'ERP platform',
    title: 'An ERP connected to the intelligence of your business.',
    subtitle:
      'Sales, inventory and reporting on the same database, with automations that cut manual work and an AI layer to query the information in natural language.',
    odooNote:
      'KERULab uses Odoo Enterprise as its ERP foundation and builds the business experience, the automations and the AI applications on top of it.',
    pillarsTitle: 'The platform combines',
    pillars: [
      { title: 'ERP', description: 'The core processes of the operation in a single system.' },
      { title: 'Automation', description: 'Flows that run on their own and flag anything out of range.' },
      { title: 'Artificial intelligence', description: 'Natural-language queries and insights over your data.' },
      { title: 'Business Intelligence', description: 'Metrics kept current, with no export to spreadsheets.' },
    ],
    cta: 'Request a demo',
    mockup: {
      title: 'KERULab ERP',
      subtitle: 'Demo view',
      tabs: {
        sales: 'Sales',
        inventory: 'Inventory',
        reports: 'Reports + AI',
      },
      sales: {
        opportunities: 'Opportunities',
        orders: 'Orders this month',
        customers: 'Active customers',
        revenue: 'Revenue this month',
        pipelineTitle: 'Pipeline by stage',
        stages: {
          new: 'New',
          qualified: 'Qualified',
          proposal: 'Proposal',
          won: 'Won',
        },
        trendLabel: 'vs. last month',
      },
      inventory: {
        stock: 'SKUs in stock',
        products: 'Active products',
        warehouses: 'Warehouses',
        alerts: 'Open alerts',
        tableTitle: 'Stock by product',
        columns: {
          product: 'Product',
          warehouse: 'Warehouse',
          units: 'Units',
          status: 'Status',
        },
        status: {
          ok: 'Healthy',
          low: 'Low stock',
          critical: 'Critical',
        },
        alertLabel: 'Replenishment suggested automatically',
      },
      reports: {
        chartTitle: 'Revenue by month',
        marginTitle: 'Gross margin',
        ordersTitle: 'Completed orders',
        insightTitle: 'AI-generated insight',
        insightBody:
          'Margin remains stable, but three SKUs in the highest-volume category slowed down versus last month. Worth reviewing price and stock level.',
        queryLabel: 'Natural language query',
        question: 'Which products had the lowest turnover this month?',
        answer:
          'Products A, B and C show lower turnover than last month. A and B are holding stock above target level; C keeps steady demand but at a lower margin.',
        disclaimer: 'Illustrative example. The data shown does not belong to any real company.',
      },
    },
  },

  ai: {
    eyebrow: 'AI & Automation',
    title: "AI doesn't replace your processes. It makes them smarter.",
    subtitle:
      'We apply artificial intelligence where it produces a measurable result: querying information, understanding documents, cutting repetitive work and flagging what needs attention.',
    items: {
      assistant: {
        title: 'AI Business Assistant',
        description:
          'Query business information in natural language, without waiting for someone to build the report.',
        points: ['Questions about sales, stock or customers', 'Answers with the figure and its source', 'No spreadsheet exports'],
      },
      rag: {
        title: 'Enterprise RAG',
        description:
          "Query the company's internal documentation with AI, answering from your own documents.",
        points: ['Semantic search over documents', 'Answers referencing the source', 'Access control by department'],
      },
      automation: {
        title: 'Intelligent automation',
        description: "Automate repetitive tasks and connect systems that don't talk to each other today.",
        points: ['Flows across ERP, CRM and APIs', 'Automatic validations and alerts', 'Documented, traceable processes'],
      },
      dashboards: {
        title: 'Intelligent dashboards',
        description: 'Turn business data into information that can be acted on.',
        points: ['Metrics by department', 'Alerts on deviations', 'A single version of the truth'],
      },
    },
    ragExamplesTitle: 'Documents that can be queried',
    ragExamples: [
      'Manuals',
      'Procedures',
      'Policies',
      'Technical documentation',
      'Contracts',
      'Internal documents',
    ],
    architectureTitle: 'How it connects to what you already have',
    architectureSubtitle:
      "The AI layer builds on your current sources; it doesn't require replacing existing systems.",
    sourcesLabel: 'Sources',
    layerLabel: 'AI layer',
    outputsLabel: 'Outputs',
    sources: ['Documents', 'ERP', 'CRM', 'APIs', 'Databases'],
    outputs: ['Insights', 'Automation', 'Actions'],
    assistantMockup: {
      title: 'Business assistant',
      badge: 'Example',
      placeholder: 'Type your question…',
      question: 'Which policy applies to a return outside the standard window?',
      answer:
        'According to the returns procedure, requests outside the standard window require approval from the department lead and are logged as an exception.',
      sourceLabel: 'Source',
      sourceValue: 'Returns procedure · section 4',
      typing: 'Searching documents…',
    },
  },

  industries: {
    eyebrow: 'Industries',
    title: 'Technology adapted to each business',
    subtitle: 'We work across more sectors, but these three make up most of our work today.',
    items: {
      manufacturing: {
        name: 'Manufacturing',
        description: 'Coordinate production, inventory and purchasing without losing control of the shop floor.',
        points: ['Inventory', 'Production', 'Purchasing', 'Sales', 'Automation', 'Operational dashboards'],
      },
      healthcare: {
        name: 'Healthcare',
        description: 'Organize administrative operations so the team spends less time on paperwork.',
        points: ['Administrative management', 'Automation', 'Documentation', 'Dashboards', 'Systems integration'],
      },
      education: {
        name: 'Education',
        description: 'Centralize academic and administrative information scattered across departments.',
        points: ['Administrative management', 'Automation', 'Documentation', 'Reporting', 'Integrations'],
      },
    },
    note: "Don't see your sector? The method is the same: understand the process before proposing technology.",
  },

  process: {
    eyebrow: 'How we work',
    title: 'From a business problem to a technology solution.',
    subtitle: 'A short path, with clear deliverables at every stage.',
    steps: [
      {
        name: 'Discover',
        title: 'We understand the business',
        description: 'We talk to the people who run the process and document how it works today.',
        output: 'Current process map',
      },
      {
        name: 'Analyze',
        title: 'We identify opportunities',
        description: "We spot bottlenecks, duplicated work and data that doesn't arrive on time.",
        output: 'Prioritized opportunities',
      },
      {
        name: 'Design',
        title: 'We design the solution',
        description: 'We define the target process, the architecture and the scope of each phase.',
        output: 'Proposal and phased plan',
      },
      {
        name: 'Build',
        title: 'We implement',
        description: 'We configure the ERP, develop what is missing and wire up automation and AI.',
        output: 'Solution in production',
      },
      {
        name: 'Optimize',
        title: 'We measure and improve',
        description: 'We instrument metrics, review results and adjust based on real data.',
        output: 'Metrics and the next iteration',
      },
    ],
  },

  about: {
    eyebrow: 'About',
    title: 'We start with the business, not with the technology.',
    body: [
      'KERULab is a technology company combining process consulting, an ERP platform, automation and software development with artificial intelligence. We work with international teams and with small and mid-sized companies that need to operate better without building an IT department.',
      "Our criterion is simple: if a process change solves the problem, there is no need to build software. And when software is the answer, we design it to fit how the team actually works.",
    ],
    pillars: [
      {
        title: 'Process-first',
        description: 'The diagnosis comes before the tool.',
      },
      {
        title: 'International reach',
        description: 'Remote work in two languages, with distributed teams.',
      },
      {
        title: 'A single counterpart',
        description: 'Consulting, ERP, development and AI in the same team.',
      },
      {
        title: 'Phased delivery',
        description: 'Bounded scope, visible results and decisions you can revisit.',
      },
    ],
  },

  projects: {
    eyebrow: 'Use cases',
    title: 'Examples of the solutions we build',
    subtitle:
      'The following examples illustrate representative solutions. They are demonstrative use cases, not real clients.',
    labels: {
      problem: 'Problem',
      solution: 'Solution',
      outcome: 'Expected outcome',
    },
    items: {
      sales: {
        category: 'Automation + CRM',
        name: 'Automated sales operations',
        problem:
          'Leads arrive through several channels, get logged by hand, and follow-up depends on someone remembering.',
        solution:
          'Centralized capture, automatic assignment, follow-up reminders and synchronization with the ERP.',
        outcome: 'Less manual data entry and full traceability from lead to order.',
      },
      knowledge: {
        category: 'AI · RAG',
        name: 'Internal knowledge assistant',
        problem:
          'The documentation exists, but finding the right procedure takes more time than anyone has.',
        solution:
          'Enterprise RAG over manuals, policies and procedures, with answers referenced back to the source.',
        outcome: 'Questions resolved in seconds and less dependence on the people who "know where it is".',
      },
      erpAi: {
        category: 'ERP + AI',
        name: 'ERP integrated with AI applications',
        problem:
          'The ERP holds the information, but getting a specific answer means building a report every time.',
        solution:
          'A natural-language query layer over ERP data, with role-based permissions and automatic summaries.',
        outcome: 'Immediate answers about sales, stock and customers without going through the technical team.',
      },
      dashboard: {
        category: 'Business Intelligence',
        name: 'Business intelligence dashboard',
        problem:
          'Every department brings its own numbers and meetings start by arguing which figure is correct.',
        solution: 'A unified data model and dashboards per department, with alerts on meaningful deviations.',
        outcome: 'A single version of the truth and decisions backed by current information.',
      },
    },
  },

  technology: {
    eyebrow: 'Technology',
    title: 'Technical capabilities in service of the business',
    subtitle:
      'We choose technology after understanding the problem. These are the capabilities we work with day to day.',
    groups: {
      erp: { title: 'ERP', description: 'Core processes on a solid, extensible foundation.' },
      ai: { title: 'Artificial intelligence', description: 'Models, agents and retrieval over documents.' },
      automation: { title: 'Automation', description: 'Flows and tasks that stop being done by hand.' },
      cloud: { title: 'Cloud', description: 'Managed, scalable and monitored infrastructure.' },
      apis: { title: 'APIs & integrations', description: 'Systems that finally talk to each other.' },
      data: { title: 'Data', description: 'Modeling, storage and data quality.' },
      dashboards: { title: 'Dashboards', description: 'Metrics you can read at a glance.' },
      integrations: { title: 'Applications', description: 'Business interfaces built to be used daily.' },
    },
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'What companies usually ask before starting',
    subtitle: 'Missing yours? Write to us and we will answer, no strings attached.',
    items: {
      custom: {
        question: 'Does KERULab build custom software?',
        answer:
          'Yes. When existing tools do not cover the need, we design and build the specific solution, integrated with the systems you already use.',
      },
      integration: {
        question: 'Can you integrate AI with our existing systems?',
        answer:
          'Yes, depending on the use case and the existing architecture. Before proposing anything we review which systems are in place, which data is available and what you want to solve.',
      },
      erp: {
        question: "What is KERULab's SaaS ERP?",
        answer:
          'It is a business platform based on Odoo Enterprise, on top of which we develop the user experience, the automations and the artificial intelligence applications that connect the ERP with the rest of the operation.',
      },
      discovery: {
        question: 'Can you help us identify which processes to automate?',
        answer:
          'Yes. Consulting starts by analyzing current processes and spotting opportunities, prioritized by impact and implementation effort.',
      },
      smes: {
        question: 'Do you work with small and mid-sized companies?',
        answer:
          'Yes. They are our main focus. We phase the scope so the project is manageable without disrupting the operation.',
      },
      demo: {
        question: 'Can we request a demo?',
        answer:
          'Yes. You can request a demo of the ERP and the AI applications from any button on this page or from the contact form.',
      },
      booking: {
        question: 'How do I book a consultation?',
        answer:
          'Through the booking button on this page. If you would rather describe the case in writing, the contact form reaches the same place.',
      },
    },
  },

  cta: {
    title: 'Do you have a process that should work better?',
    subtitle:
      "Tell us how it works today and let's explore together how to automate it, integrate it or improve it with technology and artificial intelligence.",
    primary: 'Book a consultation',
    secondary: 'Request a demo',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Tell us about your case',
    subtitle:
      'Describe the process you want to improve. We reply with a first read of the problem and the possible next steps.',
    asideTitle: 'What happens next',
    asideSteps: [
      'We read your case and reply by email.',
      'We schedule a short call to understand the process.',
      'We send an initial approach and scope alternatives.',
    ],
    fields: {
      name: { label: 'Name', placeholder: 'Your full name' },
      company: { label: 'Company', placeholder: 'Your company name' },
      email: { label: 'Email', placeholder: 'name@company.com' },
      phone: { label: 'Phone', placeholder: '+00 000 000 000', optional: 'optional' },
      industry: { label: 'Industry', placeholder: 'Select an industry' },
      topic: { label: 'What can we help you with?', placeholder: 'Select an option' },
      message: {
        label: 'Tell us about your challenge',
        placeholder: 'Describe the process, what breaks today and what you would like to achieve…',
      },
    },
    industries: {
      manufacturing: 'Manufacturing',
      healthcare: 'Healthcare',
      education: 'Education',
      services: 'Services',
      retail: 'Retail & commerce',
      logistics: 'Logistics',
      other: 'Other',
    },
    topics: {
      consulting: 'Consulting',
      erp: 'ERP',
      automation: 'Automation',
      ai: 'Artificial intelligence',
      software: 'Custom software',
      other: 'Other',
    },
    submit: "Let's talk",
    submitting: 'Sending…',
    successTitle: 'Message sent',
    successBody: 'Thanks for reaching out. We will review your case and reply by email.',
    successAgain: 'Send another message',
    errorTitle: "We couldn't send your message",
    errorBody: 'Something went wrong while submitting the form. Please try again in a few minutes.',
    retry: 'Try again',
    privacy: 'We only use this information to reply to your enquiry.',
    errors: {
      required: 'This field is required',
      email: 'Enter a valid email address',
      minMessage: 'Tell us a little more (at least 20 characters)',
      select: 'Select an option',
    },
    formErrorSummary: 'Please review the highlighted fields before sending.',
  },

  footer: {
    description:
      'Process consulting, SaaS ERP, automation and artificial intelligence solutions for small and mid-sized companies.',
    solutionsTitle: 'Solutions',
    solutions: {
      consulting: 'Consulting',
      erp: 'SaaS ERP',
      ai: 'AI & Automation',
      software: 'Custom software',
    },
    industriesTitle: 'Industries',
    industries: {
      manufacturing: 'Manufacturing',
      healthcare: 'Healthcare',
      education: 'Education',
    },
    companyTitle: 'Company',
    company: {
      about: 'About',
      contact: 'Contact',
      faq: 'FAQ',
    },
    connectTitle: 'Connect',
    connect: {
      linkedin: 'LinkedIn',
      email: 'Email',
      x: 'X',
    },
    rights: 'All rights reserved.',
    disclaimer: 'The product visuals on this page are illustrative mockups.',
  },
} satisfies Dictionary;
