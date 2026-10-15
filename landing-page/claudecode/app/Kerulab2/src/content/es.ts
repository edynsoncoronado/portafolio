/**
 * Contenido de la landing (versión 2, español).
 *
 * Toda la copia vive aquí para que el diseño y el texto se puedan revisar
 * por separado. Los componentes solo leen de este objeto.
 */
export const content = {
  nav: {
    links: [
      { label: 'Aplicaciones', href: '#aplicaciones' },
      { label: 'ERP', href: '#erp' },
      { label: 'IA', href: '#ia' },
      { label: 'Industrias', href: '#industrias' },
      { label: 'Casos', href: '#casos' },
      { label: 'Contacto', href: '#contacto' },
    ],
    demo: 'Solicitar demo',
    book: 'Agendar consulta',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
  },

  hero: {
    titleTop: 'Gestiona todo tu negocio desde',
    titleMarker: 'un solo lugar',
    subtitle: '¡Procesos claros, tareas automáticas y decisiones con datos!',
    ctaPrimary: 'Agenda tu consulta gratis',
    ctaSecondary: 'Hablar con un especialista',
    note: 'Consultoría de procesos, ERP SaaS, automatización e inteligencia artificial en un mismo equipo.',
    badge: 'Un diagnóstico inicial sin costo, incluso si al final no necesitas software.',
  },

  apps: {
    eyebrow: 'Aplicaciones',
    lead: 'Imagina todas las piezas de tu operación al alcance.',
    body:
      '¿Quieres mejorar algo? Hay una aplicación para eso. Sin complicaciones y sin sistemas que se ignoran entre sí: cada pieza simplifica un proceso y se lleva bien con las demás.',
    footnote: 'Imagina todo lo que puede lograr tu equipo cuando trabaja con la herramienta correcta.',
    moreLabel: 'Conoce cómo encajan en tu operación',
    limitless: 'Sin límites',
    items: [
      { name: 'Contabilidad', tone: 'plum' },
      { name: 'Facturación', tone: 'teal' },
      { name: 'CRM', tone: 'coral' },
      { name: 'Ventas', tone: 'mango' },
      { name: 'Compras', tone: 'plum' },
      { name: 'Inventario', tone: 'teal' },
      { name: 'Manufactura', tone: 'coral' },
      { name: 'Proyectos', tone: 'mango' },
      { name: 'Registro de horas', tone: 'plum' },
      { name: 'Recursos humanos', tone: 'teal' },
      { name: 'Documentos', tone: 'coral' },
      { name: 'Firma electrónica', tone: 'mango' },
      { name: 'Automatización', tone: 'plum' },
      { name: 'Inteligencia artificial', tone: 'teal' },
      { name: 'Asistente RAG', tone: 'coral' },
      { name: 'Dashboards', tone: 'mango' },
      { name: 'Integraciones', tone: 'plum' },
      { name: 'Atención al cliente', tone: 'teal' },
      { name: 'Marketing', tone: 'coral' },
      { name: 'Planeación', tone: 'mango' },
    ],
  },

  quality: {
    titleMarker: 'Mejora',
    titleRest: 'la calidad de tu trabajo',
    subtitle:
      'Documentos, cobros y seguimientos dejan de depender de que alguien se acuerde: el sistema los prepara y tu equipo solo revisa.',
    invoice: {
      label: 'Factura',
      number: 'INV/2026/0184',
      amount: '12,480.00 €',
      customer: 'Cliente demo S.L.',
      person: 'Fiona · Cliente',
      status: 'Pagada',
      dueLabel: 'Vencimiento',
      dueValue: '08/09/2026',
      tagsLabel: 'Etiquetas',
      tags: ['Recurrente', 'Prioridad alta'],
      actions: ['Enviar', 'Firmar', 'Descargar', 'Imprimir'],
      note: 'Mockup ilustrativo: los datos no corresponden a ninguna empresa real.',
    },
    bullets: [
      { title: 'Menos trabajo manual', description: 'Los datos se capturan una vez y viajan solos entre áreas.' },
      { title: 'Una sola versión del dato', description: 'Se acabaron las hojas de cálculo con tres versiones distintas.' },
      { title: 'Trazabilidad completa', description: 'Del primer contacto al cobro, todo queda registrado.' },
    ],
  },

  productivity: {
    title: 'Optimizado para mejorar la productividad',
    subtitle:
      'Olvídate de capturar datos a mano. Aprovecha una interfaz pensada para el trabajo diario y automatizaciones que resuelven lo repetitivo mientras tu equipo se ocupa de lo importante.',
    stats: [
      { value: '-70%', label: 'tiempo en tareas repetitivas', hint: 'Objetivo habitual tras automatizar un proceso.' },
      { value: '1', label: 'sola fuente de información', hint: 'ERP, documentos e indicadores conectados.' },
      { value: '4-8', label: 'semanas a la primera entrega', hint: 'Alcance por fases, resultados visibles pronto.' },
    ],
    compare: 'Comparado con trabajar a mano',
  },

  ai: {
    titleLead: 'Usa la',
    titleUnderlined: 'IA',
    titleRest: 'para llevar tu negocio al siguiente nivel',
    subtitle:
      'Automatiza el trabajo, personaliza funciones, realiza investigación a fondo y sigue escalando sin límites.',
    assistant: {
      title: 'Asistente de negocio',
      badge: 'Ejemplo',
      question: '¿Qué política aplica para una devolución fuera de plazo?',
      typing: 'Consultando documentos…',
      answer:
        'Según el procedimiento de devoluciones, fuera del plazo estándar la solicitud requiere aprobación del responsable de área y se registra como excepción.',
      sourceLabel: 'Fuente',
      sourceValue: 'Procedimiento de devoluciones · sección 4',
      placeholder: 'Escribe tu pregunta…',
    },
    items: [
      {
        title: 'AI Business Assistant',
        description: 'Consulta ventas, stock o clientes en lenguaje natural, sin esperar a que alguien arme el reporte.',
      },
      {
        title: 'RAG empresarial',
        description: 'Responde con tus propios manuales, políticas y procedimientos, citando siempre la fuente.',
      },
      {
        title: 'Automatización inteligente',
        description: 'Flujos entre ERP, CRM y APIs, con validaciones y alertas cuando algo se sale de rango.',
      },
      {
        title: 'Dashboards inteligentes',
        description: 'Indicadores por área y avisos sobre desviaciones, con una sola versión del dato.',
      },
    ],
  },

  bento: {
    titleLead: 'Un software empresarial',
    titleMarker: 'bien hecho.',
    cards: [
      {
        title: 'Empezamos por el proceso',
        body:
          'Antes de escribir una línea de código mapeamos cómo trabaja tu equipo de verdad, no cómo lo describe el manual. Si un cambio de proceso resuelve el problema, te lo decimos.',
        cta: 'Analizar mi proceso',
      },
      {
        title: 'Sin ataduras',
        body:
          'Tus datos te pertenecen. Trabajamos sobre estándares abiertos y te entregamos accesos, documentación y código donde corresponde. Puedes seguir con nosotros porque quieres, no porque no haya salida.',
      },
      {
        title: 'ERP + IA',
        body:
          'KERULab ERP se apoya en Odoo Enterprise y sobre esa base construimos la experiencia, las automatizaciones y las aplicaciones de inteligencia artificial de tu operación.',
        cta: 'Solicitar una demo',
      },
      {
        title: 'Precio honesto',
        body:
          'Alcance por fases, presupuesto cerrado por fase y sin funciones imprescindibles escondidas detrás de un plan superior. Sabes qué pagas y qué recibes antes de empezar.',
        cta: 'Conversemos del alcance',
      },
      {
        title: 'Un solo interlocutor',
        body:
          'Consultoría, ERP, desarrollo e IA en el mismo equipo. No trasladamos el problema a un tercero ni te dejamos coordinando proveedores que se culpan entre sí.',
      },
      {
        title: 'Entregas por fases',
        body:
          'Alcance acotado, resultados visibles pronto y decisiones revisables. Cada fase termina con algo funcionando en producción, no con un documento.',
      },
    ],
  },

  industries: {
    eyebrow: 'Industrias',
    title: 'Tecnología adaptada a cada negocio',
    subtitle: 'Trabajamos con más sectores, pero estos tres concentran hoy la mayor parte de nuestro trabajo.',
    items: [
      {
        name: 'Manufactura',
        description: 'Coordinar producción, inventario y compras sin perder el control del piso de planta.',
        points: ['Inventario', 'Producción', 'Compras', 'Ventas', 'Dashboards operativos'],
      },
      {
        name: 'Salud',
        description: 'Ordenar la operación administrativa para que el equipo dedique menos tiempo al papeleo.',
        points: ['Gestión administrativa', 'Automatización', 'Documentación', 'Integración de sistemas'],
      },
      {
        name: 'Educación',
        description: 'Centralizar la información académica y administrativa dispersa entre áreas.',
        points: ['Gestión administrativa', 'Automatización', 'Reportes', 'Integraciones'],
      },
    ],
    note: '¿Tu sector no aparece aquí? El método es el mismo: entender el proceso antes de proponer tecnología.',
  },

  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'De un problema empresarial a una solución en producción',
    subtitle: 'Un recorrido corto, con entregables claros en cada etapa.',
    steps: [
      { name: 'Discover', title: 'Entendemos el negocio', output: 'Mapa del proceso actual' },
      { name: 'Analyze', title: 'Identificamos oportunidades', output: 'Oportunidades priorizadas' },
      { name: 'Design', title: 'Diseñamos la solución', output: 'Propuesta y plan por fases' },
      { name: 'Build', title: 'Implementamos', output: 'Solución en producción' },
      { name: 'Optimize', title: 'Medimos y mejoramos', output: 'Indicadores y siguiente iteración' },
    ],
  },

  cases: {
    eyebrow: 'Casos de uso',
    title: 'Ejemplos del tipo de soluciones que construimos',
    subtitle: 'Casos demostrativos que ilustran soluciones representativas; no corresponden a clientes reales.',
    labels: { problem: 'Problema', solution: 'Solución', outcome: 'Resultado esperado' },
    items: [
      {
        category: 'Automatización + CRM',
        name: 'Operación de ventas automatizada',
        problem: 'Los leads llegan por varios canales, se registran a mano y el seguimiento depende de que alguien lo recuerde.',
        solution: 'Captura centralizada, asignación automática, recordatorios de seguimiento y sincronización con el ERP.',
        outcome: 'Menos registro manual y trazabilidad completa desde el lead hasta el pedido.',
      },
      {
        category: 'IA · RAG',
        name: 'Asistente de conocimiento interno',
        problem: 'La documentación existe, pero encontrar el procedimiento correcto toma más tiempo del que nadie tiene.',
        solution: 'RAG empresarial sobre manuales, políticas y procedimientos, con respuestas referenciadas a la fuente.',
        outcome: 'Consultas resueltas en segundos y menos dependencia de quien "sabe dónde está".',
      },
      {
        category: 'ERP + IA',
        name: 'Integración de ERP con aplicaciones de IA',
        problem: 'El ERP concentra la información, pero obtener una respuesta concreta exige construir un reporte cada vez.',
        solution: 'Capa de consulta en lenguaje natural sobre los datos del ERP, con permisos por rol y resúmenes automáticos.',
        outcome: 'Respuestas inmediatas sobre ventas, stock y clientes sin pasar por el equipo técnico.',
      },
      {
        category: 'Business Intelligence',
        name: 'Dashboard de indicadores empresariales',
        problem: 'Cada área presenta sus propios números y las reuniones empiezan discutiendo cuál es el dato correcto.',
        solution: 'Modelo de datos unificado y dashboards por área, con alertas sobre desviaciones relevantes.',
        outcome: 'Una sola versión del dato y decisiones apoyadas en información actualizada.',
      },
    ],
  },

  social: {
    titleLead: 'Únete a los equipos',
    titleRest: 'que ya trabajan así',
    subtitle: 'Pequeñas y medianas empresas que decidieron ordenar su operación antes de comprar más software.',
    testimonial: {
      quote:
        'El tiempo que nos tomaba procesar los documentos administrativos disminuyó de manera notable, en algunos casos pasó de 2 días a tan solo 5 horas. Gracias a eso, ahora podemos concentrarnos en lo que más importa: informar y asesorar a nuestros clientes.',
      author: 'Testimonio ilustrativo',
      role: 'Dirección de operaciones · empresa de servicios',
      note: 'Ejemplo demostrativo, no corresponde a un cliente real.',
    },
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntarnos antes de empezar',
    subtitle: '¿Falta la tuya? Escríbenos y la respondemos sin compromiso.',
    items: [
      {
        question: '¿KERULab desarrolla software a medida?',
        answer:
          'Sí. Cuando las herramientas existentes no cubren la necesidad, diseñamos y construimos la solución específica, integrada con los sistemas que ya utilizas.',
      },
      {
        question: '¿Pueden integrar IA con nuestros sistemas existentes?',
        answer:
          'Sí, dependiendo del caso de uso y de la arquitectura existente. Antes de proponer nada revisamos qué sistemas hay, qué datos están disponibles y qué se quiere resolver.',
      },
      {
        question: '¿Qué es el ERP SaaS de KERULab?',
        answer:
          'Es una plataforma empresarial basada en Odoo Enterprise, sobre la que desarrollamos la experiencia de uso, las automatizaciones y las aplicaciones de inteligencia artificial que conectan el ERP con el resto de la operación.',
      },
      {
        question: '¿Pueden ayudarnos a identificar qué procesos automatizar?',
        answer:
          'Sí. La consultoría comienza analizando los procesos actuales y detectando oportunidades, priorizadas por impacto y esfuerzo de implementación.',
      },
      {
        question: '¿Trabajan con pequeñas y medianas empresas?',
        answer:
          'Sí. Es nuestro foco principal. Ajustamos el alcance por fases para que el proyecto sea abordable sin detener la operación.',
      },
      {
        question: '¿Cómo puedo agendar una consulta?',
        answer:
          'Con el botón de agendamiento de la página. Si prefieres explicarnos el caso por escrito, el formulario de contacto llega al mismo sitio.',
      },
    ],
  },

  cta: {
    titleLead: 'Libera',
    titleRest: 'tu potencial de crecimiento',
    subtitle: 'Cuéntanos cómo funciona hoy tu proceso y exploramos juntos cómo automatizarlo, integrarlo o mejorarlo.',
    primary: 'Comienza ahora, es gratis',
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
      message: {
        label: 'Cuéntanos tu desafío',
        placeholder: 'Describe el proceso, qué falla hoy y qué te gustaría lograr…',
      },
    },
    industries: ['Manufactura', 'Salud', 'Educación', 'Servicios', 'Comercio y retail', 'Logística', 'Otra'],
    topics: ['Consultoría', 'ERP', 'Automatización', 'Inteligencia artificial', 'Software personalizado', 'Otro'],
    submit: 'Hablemos',
    submitting: 'Enviando…',
    successTitle: 'Mensaje enviado',
    successBody: 'Gracias por escribirnos. Revisaremos tu caso y te responderemos por correo.',
    successAgain: 'Enviar otro mensaje',
    privacy: 'Solo usamos estos datos para responder a tu consulta.',
    errorTitle: 'No pudimos enviar el mensaje',
    errorBody: 'Ha ocurrido un problema al enviar el formulario. Inténtalo de nuevo en unos minutos.',
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
    columns: [
      {
        title: 'Soluciones',
        links: [
          { label: 'Consultoría', href: '#enfoque' },
          { label: 'ERP SaaS', href: '#erp' },
          { label: 'IA & Automatización', href: '#ia' },
          { label: 'Software a medida', href: '#casos' },
        ],
      },
      {
        title: 'Industrias',
        links: [
          { label: 'Manufactura', href: '#industrias' },
          { label: 'Salud', href: '#industrias' },
          { label: 'Educación', href: '#industrias' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Cómo trabajamos', href: '#proceso' },
          { label: 'Casos de uso', href: '#casos' },
          { label: 'Preguntas frecuentes', href: '#faq' },
          { label: 'Contacto', href: '#contacto' },
        ],
      },
    ],
    connectTitle: 'Conecta',
    rights: 'Todos los derechos reservados.',
    disclaimer: 'Las visualizaciones de producto de esta página son mockups ilustrativos.',
  },
} as const;

export type Content = typeof content;
