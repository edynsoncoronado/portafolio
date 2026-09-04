/**
 * Diccionario en español. Es la fuente de verdad del tipo `Dictionary`:
 * cualquier clave que falte o sobre en `en.ts` produce un error de compilación.
 */
export const es = {
  meta: {
    title: 'KERULab | Software, Automatización e Inteligencia Artificial para Empresas',
    description:
      'KERULab ayuda a empresas a optimizar procesos mediante consultoría, ERP SaaS, automatización, software personalizado e inteligencia artificial.',
  },

  a11y: {
    skipToContent: 'Saltar al contenido principal',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie de página',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    switchToLight: 'Cambiar a modo claro',
    switchToDark: 'Cambiar a modo oscuro',
    languageSelector: 'Seleccionar idioma',
    spanish: 'Español',
    english: 'Inglés',
    scrollHint: 'Desplázate para ver más',
    tablist: 'Módulos de la plataforma',
    horizontalScroll: 'Contenido desplazable horizontalmente',
  },

  common: {
    demoData: 'Datos de demostración',
    useCase: 'Caso de uso',
    exampleSolution: 'Solución de ejemplo',
    mockup: 'Mockup ilustrativo',
    learnMore: 'Ver detalle',
    brandTagline: 'Procesos, automatización e IA para empresas',
  },

  nav: {
    services: 'Servicios',
    erp: 'ERP SaaS',
    ai: 'IA & Automatización',
    industries: 'Industrias',
    process: 'Cómo trabajamos',
    about: 'Nosotros',
    contact: 'Contacto',
    book: 'Agendar consulta',
    demo: 'Solicitar demo',
  },

  hero: {
    eyebrow: 'Consultoría · ERP SaaS · IA aplicada',
    titleLead: 'Transformamos procesos empresariales con',
    titleGradient: 'software, automatización e inteligencia artificial',
    subtitle:
      'Analizamos cómo funciona tu empresa, identificamos oportunidades de mejora y construimos soluciones tecnológicas que ayudan a automatizar operaciones, centralizar información y tomar mejores decisiones.',
    ctaPrimary: 'Agendar una consulta',
    ctaSecondary: 'Explorar soluciones',
    note: 'Trabajamos con pequeñas y medianas empresas en manufactura, salud, educación y otros sectores.',
    flowTitle: 'Del proceso a la decisión',
    flowCaption: 'Así conectamos la operación diaria con decisiones basadas en datos.',
    flow: {
      process: 'Procesos',
      processDetail: 'Ventas, compras, inventario, administración',
      data: 'Datos',
      dataDetail: 'Centralizados y consistentes',
      automation: 'Automatización',
      automationDetail: 'Menos tareas manuales',
      ai: 'Inteligencia artificial',
      aiDetail: 'Consultas, documentos y asistentes',
      decisions: 'Decisiones',
      decisionsDetail: 'Indicadores en tiempo real',
    },
  },

  capabilities: {
    eyebrow: 'Capacidades',
    title: 'Un mismo equipo para todo el recorrido',
    subtitle:
      'Desde el análisis del proceso hasta la solución en producción, sin traspasar el problema a terceros.',
    items: {
      consulting: {
        title: 'Consultoría de negocio',
        description: 'Entendemos el proceso antes de proponer tecnología.',
      },
      ai: {
        title: 'Soluciones de IA',
        description: 'Asistentes, RAG documental y modelos aplicados a tu operación.',
      },
      erp: {
        title: 'ERP',
        description: 'Ventas, inventario y administración en una sola plataforma.',
      },
      automation: {
        title: 'Automatización',
        description: 'Tareas repetitivas y flujos entre sistemas.',
      },
      software: {
        title: 'Software a medida',
        description: 'Cuando ninguna herramienta del mercado encaja.',
      },
      data: {
        title: 'Datos y dashboards',
        description: 'Indicadores que se entienden y se usan.',
      },
    },
  },

  value: {
    eyebrow: 'El punto de partida',
    title: 'Tu empresa no necesita más software. Necesita mejores procesos.',
    intro:
      'La mayoría de las empresas no tiene un problema de herramientas: tiene procesos que crecieron sin diseño. Antes de escribir una línea de código buscamos dónde se pierde tiempo, información y visibilidad.',
    problemsTitle: 'Señales de que un proceso se quedó atrás',
    problems: [
      {
        title: 'Tareas manuales que se repiten',
        description: 'Copiar datos entre sistemas, rehacer los mismos cálculos, reenviar los mismos correos.',
      },
      {
        title: 'Información dispersa',
        description: 'Hojas de cálculo, correos y carpetas donde nadie sabe cuál es la versión válida.',
      },
      {
        title: 'Sistemas que no se hablan',
        description: 'Cada área con su herramienta y una persona en medio haciendo de integración.',
      },
      {
        title: 'Reportes armados a mano',
        description: 'Días de trabajo cada mes para producir un informe que envejece en una semana.',
      },
      {
        title: 'Falta de visibilidad',
        description: 'Saber qué pasó el mes pasado es posible; saber qué está pasando hoy, no.',
      },
      {
        title: 'Procesos que dependen de una persona',
        description: 'Si esa persona no está, el proceso se detiene o se hace de otra forma.',
      },
      {
        title: 'Documentación difícil de consultar',
        description: 'Manuales, políticas y procedimientos que existen pero nadie encuentra a tiempo.',
      },
      {
        title: 'Decisiones que llegan tarde',
        description: 'El dato existe, pero llega cuando ya no cambia nada.',
      },
    ],
    philosophyTitle: 'Cómo lo abordamos',
    philosophySubtitle: 'Un ciclo corto, repetible y medible.',
    philosophy: [
      { step: 'Entender', description: 'Mapeamos el proceso real, no el que dice el manual.' },
      { step: 'Diseñar', description: 'Definimos cómo debería funcionar y qué tecnología lo sostiene.' },
      { step: 'Automatizar', description: 'Implementamos ERP, integraciones, software e IA donde aportan.' },
      { step: 'Medir', description: 'Instrumentamos indicadores y ajustamos con datos reales.' },
    ],
  },

  services: {
    eyebrow: 'Servicios',
    title: 'Soluciones diseñadas alrededor de tu negocio',
    subtitle:
      'Tres líneas de trabajo que se combinan según lo que tu operación necesite. Puedes empezar por cualquiera de ellas.',
    areasLabel: 'Áreas donde solemos empezar',
    featuresLabel: 'Qué incluye',
    capabilitiesLabel: 'Capacidades',
    items: {
      consulting: {
        name: 'Consultoría y transformación empresarial',
        tag: 'Empieza por aquí',
        description:
          'Ayudamos a identificar oportunidades de mejora, digitalización y automatización dentro de los procesos empresariales, con un diagnóstico priorizado por impacto y esfuerzo.',
        list: [
          'Ventas',
          'Finanzas',
          'Compras',
          'Inventario',
          'Operaciones',
          'Recursos humanos',
          'Marketing',
          'Atención al cliente',
          'Administración',
        ],
        cta: 'Analizar mi proceso',
      },
      erp: {
        name: 'ERP SaaS',
        tag: 'Basado en Odoo Enterprise',
        description:
          'KERULab ERP es una plataforma SaaS construida sobre Odoo Enterprise, sobre la que desarrollamos una experiencia empresarial integrada con automatización y aplicaciones de inteligencia artificial.',
        list: [
          'Ventas',
          'Inventario',
          'Reportes',
          'Automatización',
          'Inteligencia artificial',
          'Información centralizada',
        ],
        cta: 'Solicitar una demo',
      },
      custom: {
        name: 'Software personalizado + IA',
        tag: 'Cuando el estándar no alcanza',
        description:
          'Construimos soluciones específicas cuando las herramientas existentes no cubren las necesidades del negocio, integradas con lo que ya usas.',
        list: [
          'Automatización de procesos',
          'Integración con ERP',
          'APIs',
          'Dashboards',
          'Aplicaciones empresariales',
          'RAG sobre documentos',
          'Agentes de IA',
          'Integración de modelos de IA',
        ],
        cta: 'Hablar con un especialista',
      },
    },
  },

  erp: {
    eyebrow: 'Plataforma ERP',
    title: 'Un ERP conectado con la inteligencia de tu negocio.',
    subtitle:
      'Ventas, inventario y reportes sobre una misma base de datos, con automatizaciones que reducen el trabajo manual y una capa de IA para consultar la información en lenguaje natural.',
    odooNote:
      'KERULab utiliza Odoo Enterprise como base ERP y desarrolla sobre ella la experiencia empresarial, las automatizaciones y las aplicaciones de IA.',
    pillarsTitle: 'La plataforma combina',
    pillars: [
      { title: 'ERP', description: 'Los procesos centrales de la operación en un solo sistema.' },
      { title: 'Automatización', description: 'Flujos que se ejecutan solos y avisan cuando algo se sale de rango.' },
      { title: 'Inteligencia artificial', description: 'Consultas en lenguaje natural e insights sobre tus datos.' },
      { title: 'Business Intelligence', description: 'Indicadores actualizados, sin exportar a hojas de cálculo.' },
    ],
    cta: 'Solicitar una demo',
    mockup: {
      title: 'KERULab ERP',
      subtitle: 'Vista de demostración',
      tabs: {
        sales: 'Ventas',
        inventory: 'Inventario',
        reports: 'Reportes + IA',
      },
      sales: {
        opportunities: 'Oportunidades',
        orders: 'Pedidos del mes',
        customers: 'Clientes activos',
        revenue: 'Ingresos del mes',
        pipelineTitle: 'Pipeline por etapa',
        stages: {
          new: 'Nuevas',
          qualified: 'Calificadas',
          proposal: 'Propuesta',
          won: 'Ganadas',
        },
        trendLabel: 'vs. mes anterior',
      },
      inventory: {
        stock: 'Referencias en stock',
        products: 'Productos activos',
        warehouses: 'Almacenes',
        alerts: 'Alertas abiertas',
        tableTitle: 'Stock por producto',
        columns: {
          product: 'Producto',
          warehouse: 'Almacén',
          units: 'Unidades',
          status: 'Estado',
        },
        status: {
          ok: 'Correcto',
          low: 'Stock bajo',
          critical: 'Crítico',
        },
        alertLabel: 'Reposición sugerida automáticamente',
      },
      reports: {
        chartTitle: 'Ingresos por mes',
        marginTitle: 'Margen bruto',
        ordersTitle: 'Pedidos completados',
        insightTitle: 'Insight generado por IA',
        insightBody:
          'El margen se mantiene estable, pero tres referencias de la categoría con mayor volumen bajaron su rotación respecto al mes anterior. Revisar precio y nivel de stock.',
        queryLabel: 'Consulta en lenguaje natural',
        question: '¿Qué productos tuvieron menor rotación este mes?',
        answer:
          'Los productos A, B y C presentan una reducción de rotación frente al mes anterior. A y B acumulan stock por encima del nivel objetivo; C mantiene demanda estable pero con menor margen.',
        disclaimer: 'Ejemplo ilustrativo. Los datos mostrados no corresponden a ninguna empresa real.',
      },
    },
  },

  ai: {
    eyebrow: 'IA & Automatización',
    title: 'La IA no reemplaza tus procesos. Los hace más inteligentes.',
    subtitle:
      'Aplicamos inteligencia artificial donde produce un resultado medible: consultar información, entender documentos, reducir trabajo repetitivo y anticipar lo que necesita atención.',
    items: {
      assistant: {
        title: 'AI Business Assistant',
        description:
          'Consultar información empresarial en lenguaje natural, sin depender de que alguien construya el reporte.',
        points: ['Preguntas sobre ventas, stock o clientes', 'Respuestas con el dato y su origen', 'Sin exportar a hojas de cálculo'],
      },
      rag: {
        title: 'RAG empresarial',
        description:
          'Consultar la documentación interna de la empresa con IA, respondiendo a partir de tus propios documentos.',
        points: ['Búsqueda semántica sobre documentos', 'Respuestas con referencia a la fuente', 'Control de acceso por área'],
      },
      automation: {
        title: 'Automatización inteligente',
        description: 'Automatizar tareas repetitivas y conectar sistemas que hoy no se comunican.',
        points: ['Flujos entre ERP, CRM y APIs', 'Validaciones y alertas automáticas', 'Procesos documentados y trazables'],
      },
      dashboards: {
        title: 'Dashboards inteligentes',
        description: 'Convertir los datos empresariales en información accionable y actualizada.',
        points: ['Indicadores por área', 'Alertas sobre desviaciones', 'Una sola versión del dato'],
      },
    },
    ragExamplesTitle: 'Documentos que se pueden consultar',
    ragExamples: [
      'Manuales',
      'Procedimientos',
      'Políticas',
      'Documentación técnica',
      'Contratos',
      'Documentos internos',
    ],
    architectureTitle: 'Cómo se conecta con lo que ya tienes',
    architectureSubtitle:
      'La capa de IA se apoya en tus fuentes actuales; no requiere reemplazar los sistemas existentes.',
    sourcesLabel: 'Fuentes',
    layerLabel: 'Capa de IA',
    outputsLabel: 'Resultados',
    sources: ['Documentos', 'ERP', 'CRM', 'APIs', 'Bases de datos'],
    outputs: ['Insights', 'Automatización', 'Acciones'],
    assistantMockup: {
      title: 'Asistente de negocio',
      badge: 'Ejemplo',
      placeholder: 'Escribe tu pregunta…',
      question: '¿Qué política aplica para una devolución fuera de plazo?',
      answer:
        'Según el procedimiento de devoluciones, fuera del plazo estándar la solicitud requiere aprobación del responsable de área y se registra como excepción.',
      sourceLabel: 'Fuente',
      sourceValue: 'Procedimiento de devoluciones · sección 4',
      typing: 'Consultando documentos…',
    },
  },

  industries: {
    eyebrow: 'Industrias',
    title: 'Tecnología adaptada a cada negocio',
    subtitle:
      'Trabajamos con más sectores, pero estos tres concentran hoy la mayor parte de nuestro trabajo.',
    items: {
      manufacturing: {
        name: 'Manufactura',
        description: 'Coordinar producción, inventario y compras sin perder el control del piso de planta.',
        points: ['Inventario', 'Producción', 'Compras', 'Ventas', 'Automatización', 'Dashboards operativos'],
      },
      healthcare: {
        name: 'Salud',
        description: 'Ordenar la operación administrativa para que el equipo dedique menos tiempo al papeleo.',
        points: ['Gestión administrativa', 'Automatización', 'Documentación', 'Dashboards', 'Integración de sistemas'],
      },
      education: {
        name: 'Educación',
        description: 'Centralizar la información académica y administrativa dispersa entre áreas.',
        points: ['Gestión administrativa', 'Automatización', 'Documentación', 'Reportes', 'Integraciones'],
      },
    },
    note: '¿Tu sector no aparece aquí? El método es el mismo: entender el proceso antes de proponer tecnología.',
  },

  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'De un problema empresarial a una solución tecnológica.',
    subtitle: 'Un recorrido corto, con entregables claros en cada etapa.',
    steps: [
      {
        name: 'Discover',
        title: 'Entendemos el negocio',
        description: 'Conversamos con las personas que ejecutan el proceso y documentamos cómo funciona hoy.',
        output: 'Mapa del proceso actual',
      },
      {
        name: 'Analyze',
        title: 'Identificamos oportunidades',
        description: 'Detectamos cuellos de botella, trabajo duplicado y datos que no llegan a tiempo.',
        output: 'Oportunidades priorizadas',
      },
      {
        name: 'Design',
        title: 'Diseñamos la solución',
        description: 'Definimos el proceso objetivo, la arquitectura y el alcance de cada fase.',
        output: 'Propuesta y plan por fases',
      },
      {
        name: 'Build',
        title: 'Implementamos',
        description: 'Configuramos el ERP, desarrollamos lo que falte y conectamos automatización e IA.',
        output: 'Solución en producción',
      },
      {
        name: 'Optimize',
        title: 'Medimos y mejoramos',
        description: 'Instrumentamos indicadores, revisamos resultados y ajustamos sobre datos reales.',
        output: 'Indicadores y siguiente iteración',
      },
    ],
  },

  about: {
    eyebrow: 'Nosotros',
    title: 'Empezamos por el negocio, no por la tecnología.',
    body: [
      'KERULab es una empresa de tecnología que combina consultoría de procesos, plataforma ERP, automatización y desarrollo de software con inteligencia artificial. Trabajamos con equipos internacionales y con pequeñas y medianas empresas que necesitan operar mejor sin montar un departamento de TI.',
      'Nuestro criterio es simple: si un cambio de proceso resuelve el problema, no hace falta construir software. Y cuando el software es la respuesta, lo diseñamos para que encaje con la forma real de trabajar del equipo.',
    ],
    pillars: [
      {
        title: 'Enfoque en el proceso',
        description: 'El diagnóstico llega antes que la herramienta.',
      },
      {
        title: 'Alcance internacional',
        description: 'Trabajo remoto y en dos idiomas, con equipos distribuidos.',
      },
      {
        title: 'Un solo interlocutor',
        description: 'Consultoría, ERP, desarrollo e IA en el mismo equipo.',
      },
      {
        title: 'Entregas por fases',
        description: 'Alcance acotado, resultados visibles y decisiones revisables.',
      },
    ],
  },

  projects: {
    eyebrow: 'Casos de uso',
    title: 'Ejemplos del tipo de soluciones que construimos',
    subtitle:
      'Los siguientes ejemplos ilustran soluciones representativas. Son casos de uso demostrativos, no clientes reales.',
    labels: {
      problem: 'Problema',
      solution: 'Solución',
      outcome: 'Resultado esperado',
    },
    items: {
      sales: {
        category: 'Automatización + CRM',
        name: 'Operación de ventas automatizada',
        problem:
          'Los leads llegan por varios canales, se registran a mano y el seguimiento depende de que alguien lo recuerde.',
        solution:
          'Captura centralizada, asignación automática, recordatorios de seguimiento y sincronización con el ERP.',
        outcome: 'Menos registro manual y trazabilidad completa desde el lead hasta el pedido.',
      },
      knowledge: {
        category: 'IA · RAG',
        name: 'Asistente de conocimiento interno',
        problem:
          'La documentación existe, pero encontrar el procedimiento correcto toma más tiempo del que nadie tiene.',
        solution:
          'RAG empresarial sobre manuales, políticas y procedimientos, con respuestas referenciadas a la fuente.',
        outcome: 'Consultas resueltas en segundos y menos dependencia de las personas que "saben dónde está".',
      },
      erpAi: {
        category: 'ERP + IA',
        name: 'Integración de ERP con aplicaciones de IA',
        problem:
          'El ERP concentra la información, pero obtener una respuesta concreta exige construir un reporte cada vez.',
        solution:
          'Capa de consulta en lenguaje natural sobre los datos del ERP, con permisos por rol y resúmenes automáticos.',
        outcome: 'Respuestas inmediatas sobre ventas, stock y clientes sin pasar por el equipo técnico.',
      },
      dashboard: {
        category: 'Business Intelligence',
        name: 'Dashboard de indicadores empresariales',
        problem:
          'Cada área presenta sus propios números y las reuniones empiezan discutiendo cuál es el dato correcto.',
        solution:
          'Modelo de datos unificado y dashboards por área, con alertas sobre desviaciones relevantes.',
        outcome: 'Una sola versión del dato y decisiones apoyadas en información actualizada.',
      },
    },
  },

  technology: {
    eyebrow: 'Tecnología',
    title: 'Capacidades técnicas al servicio del negocio',
    subtitle:
      'Elegimos la tecnología después de entender el problema. Estas son las capacidades con las que trabajamos habitualmente.',
    groups: {
      erp: { title: 'ERP', description: 'Procesos centrales sobre una base sólida y extensible.' },
      ai: { title: 'Inteligencia artificial', description: 'Modelos, agentes y recuperación sobre documentos.' },
      automation: { title: 'Automatización', description: 'Flujos y tareas que dejan de hacerse a mano.' },
      cloud: { title: 'Cloud', description: 'Infraestructura gestionada, escalable y monitorizada.' },
      apis: { title: 'APIs e integraciones', description: 'Sistemas que empiezan a hablar entre sí.' },
      data: { title: 'Datos', description: 'Modelado, almacenamiento y calidad del dato.' },
      dashboards: { title: 'Dashboards', description: 'Indicadores que se leen de un vistazo.' },
      integrations: { title: 'Aplicaciones', description: 'Interfaces empresariales hechas para usarse a diario.' },
    },
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntarnos antes de empezar',
    subtitle: '¿Falta la tuya? Escríbenos y la respondemos sin compromiso.',
    items: {
      custom: {
        question: '¿KERULab desarrolla software a medida?',
        answer:
          'Sí. Cuando las herramientas existentes no cubren la necesidad, diseñamos y construimos la solución específica, integrada con los sistemas que ya utilizas.',
      },
      integration: {
        question: '¿Pueden integrar IA con nuestros sistemas existentes?',
        answer:
          'Sí, dependiendo del caso de uso y de la arquitectura existente. Antes de proponer nada revisamos qué sistemas hay, qué datos están disponibles y qué se quiere resolver.',
      },
      erp: {
        question: '¿Qué es el ERP SaaS de KERULab?',
        answer:
          'Es una plataforma empresarial basada en Odoo Enterprise, sobre la que desarrollamos la experiencia de uso, las automatizaciones y las aplicaciones de inteligencia artificial que conectan el ERP con el resto de la operación.',
      },
      discovery: {
        question: '¿Pueden ayudarnos a identificar qué procesos automatizar?',
        answer:
          'Sí. La consultoría comienza analizando los procesos actuales y detectando oportunidades, priorizadas por impacto y esfuerzo de implementación.',
      },
      smes: {
        question: '¿Trabajan con pequeñas y medianas empresas?',
        answer:
          'Sí. Es nuestro foco principal. Ajustamos el alcance por fases para que el proyecto sea abordable sin detener la operación.',
      },
      demo: {
        question: '¿Podemos solicitar una demostración?',
        answer:
          'Sí. Puedes solicitar una demo del ERP y de las aplicaciones de IA desde cualquiera de los botones de esta página o desde el formulario de contacto.',
      },
      booking: {
        question: '¿Cómo puedo agendar una consulta?',
        answer:
          'Con el botón de agendamiento de la página. Si prefieres explicarnos el caso por escrito, el formulario de contacto llega al mismo sitio.',
      },
    },
  },

  cta: {
    title: '¿Tienes un proceso que debería funcionar mejor?',
    subtitle:
      'Cuéntanos cómo funciona actualmente y exploremos juntos cómo automatizarlo, integrarlo o mejorarlo con tecnología e inteligencia artificial.',
    primary: 'Agendar una consulta',
    secondary: 'Solicitar una demo',
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos tu caso',
    subtitle:
      'Describe el proceso que quieres mejorar. Te respondemos con una primera lectura del problema y los siguientes pasos posibles.',
    asideTitle: 'Qué ocurre después',
    asideSteps: [
      'Leemos tu caso y te respondemos por correo.',
      'Agendamos una conversación breve para entender el proceso.',
      'Te enviamos un enfoque inicial y alternativas de alcance.',
    ],
    fields: {
      name: { label: 'Nombre', placeholder: 'Tu nombre completo' },
      company: { label: 'Empresa', placeholder: 'Nombre de tu empresa' },
      email: { label: 'Correo electrónico', placeholder: 'nombre@empresa.com' },
      phone: { label: 'Teléfono', placeholder: '+00 000 000 000', optional: 'opcional' },
      industry: { label: 'Industria', placeholder: 'Selecciona una industria' },
      topic: { label: '¿En qué podemos ayudarte?', placeholder: 'Selecciona una opción' },
      message: { label: 'Cuéntanos tu desafío', placeholder: 'Describe el proceso, qué falla hoy y qué te gustaría lograr…' },
    },
    industries: {
      manufacturing: 'Manufactura',
      healthcare: 'Salud',
      education: 'Educación',
      services: 'Servicios',
      retail: 'Comercio y retail',
      logistics: 'Logística',
      other: 'Otra',
    },
    topics: {
      consulting: 'Consultoría',
      erp: 'ERP',
      automation: 'Automatización',
      ai: 'Inteligencia artificial',
      software: 'Software personalizado',
      other: 'Otro',
    },
    submit: 'Hablemos',
    submitting: 'Enviando…',
    successTitle: 'Mensaje enviado',
    successBody: 'Gracias por escribirnos. Revisaremos tu caso y te responderemos por correo.',
    successAgain: 'Enviar otro mensaje',
    errorTitle: 'No pudimos enviar el mensaje',
    errorBody: 'Ha ocurrido un problema al enviar el formulario. Inténtalo de nuevo en unos minutos.',
    retry: 'Reintentar',
    privacy: 'Solo usamos estos datos para responder a tu consulta.',
    errors: {
      required: 'Este campo es obligatorio',
      email: 'Introduce un correo electrónico válido',
      minMessage: 'Cuéntanos un poco más (mínimo 20 caracteres)',
      select: 'Selecciona una opción',
    },
    formErrorSummary: 'Revisa los campos marcados antes de enviar.',
  },

  footer: {
    description:
      'Consultoría de procesos, ERP SaaS, automatización y soluciones de inteligencia artificial para pequeñas y medianas empresas.',
    solutionsTitle: 'Soluciones',
    solutions: {
      consulting: 'Consultoría',
      erp: 'ERP SaaS',
      ai: 'IA & Automatización',
      software: 'Software a medida',
    },
    industriesTitle: 'Industrias',
    industries: {
      manufacturing: 'Manufactura',
      healthcare: 'Salud',
      education: 'Educación',
    },
    companyTitle: 'Empresa',
    company: {
      about: 'Nosotros',
      contact: 'Contacto',
      faq: 'Preguntas frecuentes',
    },
    connectTitle: 'Conecta',
    connect: {
      linkedin: 'LinkedIn',
      email: 'Correo',
      x: 'X',
    },
    rights: 'Todos los derechos reservados.',
    disclaimer: 'Las visualizaciones de producto de esta página son mockups ilustrativos.',
  },
};
