export type ContentSection =
  | { type: "concept"; title: string; content: string }
  | { type: "text"; title?: string; content: string }
  | { type: "example"; title: string; content: string }
  | { type: "table"; title: string; headers: string[]; rows: string[][] }
  | { type: "list"; title: string; items: string[] }
  | { type: "interaction"; title: string; items: string[] }
  | { type: "quiz"; question: string; options: { label: string; correct?: boolean; explanation?: string }[] }
  | { type: "trigger"; question: string }
  | { type: "tabs"; title: string; tabs: { id: string; label: string; badge?: string; content: string }[] }
  | { type: "matching"; title: string; description: string; pairs: { concept: string; items: string[] }[] }
  | { type: "scenario"; title: string; scenarios: { situation: string; question: string; hint?: string }[] }
  | { type: "responsibilityStack"; title: string; description: string }
  | { type: "classify"; title: string; description: string; cases: { text: string; answer: string; explanation: string }[] }
  | { type: "timeline"; title: string; events: { year: string; title: string; description: string }[] }
  | { type: "deploymentDecision" }
  | { type: "providerExplorer" }
  | { type: "cloudArchitecture" }
  | { type: "projectOrganizer" }
  | { type: "billingSimulator" }
  | { type: "consoleMockup" }
  | { type: "automationTimeline" }
  | { type: "computeOptions" }
  | { type: "vmBuilder" }
  | { type: "regionZoneMap" }
  | { type: "scalingSimulator" }
  | { type: "scalingComparison" }
  | { type: "containerVsVmVisual" }
  | { type: "serverlessExplainer" }
  | { type: "containerBuilder" }
  | { type: "serverlessFlow" }
  | { type: "eventMapper" }
  | { type: "eventFunctionSimulator" }
  | { type: "automationBuilder" }
  | { type: "deploymentFlow" }
  | { type: "storageSelector" }
  | { type: "dataClassifier" }
  | { type: "storageArchitecture" }
  | { type: "objectExplorer" }
  | { type: "relationalMap" }
  | { type: "managedSqlExplorer" }
  | { type: "distributedDbMap" }
  | { type: "noSqlExplorer" };

export type TopicContent = {
  slug: string;
  title: string;
  readingTime: string;
  objectives: string[];
  sections: ContentSection[];
};

export const unit1Content: TopicContent[] = [
  {
    slug: "introduccion-computacion-nube",
    title: "Introducción a la computación en la nube",
    readingTime: "8 min",
    objectives: [
      "Comprender qué es la computación en la nube y su definición formal",
      "Identificar diferencias entre recursos locales y recursos en la nube",
      "Relacionar el concepto con acciones cotidianas del uso de tecnología",
    ],
    sections: [
      {
        type: "trigger",
        question: "¿Qué pasaría si mañana tu disco duro dejara de funcionar? ¿Perderías algo importante?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La computación en la nube es un modelo que permite acceder por internet a recursos tecnológicos —almacenamiento, servidores, bases de datos, redes y software— sin poseer la infraestructura físicamente. Es pasar de \"tener\" a \"consumir bajo demanda\".",
      },
      {
        type: "tabs",
        title: "Lo local vs. La nube",
        tabs: [
          {
            id: "local",
            label: "Modelo local",
            badge: "Tradicional",
            content: "Compras hardware, instalas software, administras todo tú. Si falla, pierdes acceso. La capacidad es fija y requiere inversión inicial alta.",
          },
          {
            id: "nube",
            label: "Modelo en la nube",
            badge: "Cloud",
            content: "Consumes recursos por internet, pagas por uso, escalas cuando necesitas. El proveedor mantiene la infraestructura. Accedes desde cualquier dispositivo.",
          },
          {
            id: "ejemplo",
            label: "En tu día a día",
            badge: "Cotidiano",
            content: "Google Drive, Gmail, Netflix, Spotify... Ya usas la nube sin darte cuenta. Tus archivos, correos y música no viven en tu dispositivo: están en centros de datos remotos.",
          },
        ],
      },
      {
        type: "table",
        title: "Características esenciales del cloud (NIST)",
        headers: ["Característica", "Qué significa", "Analogía"],
        rows: [
          ["Autoservicio bajo demanda", "Provisionar recursos sin llamar al proveedor", "Como sacar dinero del cajero sin ir al banco"],
          ["Acceso amplio por red", "Disponible desde cualquier dispositivo con internet", "Como acceder a tu correo desde el celular o la laptop"],
          ["Agrupación de recursos", "El proveedor sirve a múltiples clientes con recursos compartidos", "Como un edificio de oficinas compartido"],
          ["Elasticidad rápida", "Escalar automáticamente según la demanda", "Como un estacionamiento que crece en eventos masivos"],
          ["Servicio medido", "Pagar solo por lo que consumes", "Como pagar la luz: más usas, más pagas"],
        ],
      },
      {
        type: "scenario",
        title: "¿Cloud o no cloud?",
        scenarios: [
          {
            situation: "Una startup necesita un servidor web para lanzar su producto en 2 semanas.",
            question: "¿Le conviene comprar un servidor físico o usar la nube?",
            hint: "Piensa en tiempo de configuración, costo inicial y escalabilidad.",
          },
          {
            situation: "Un fotógrafo guarda 500 GB de fotos solo en su disco duro externo.",
            question: "¿Qué riesgo corre? ¿Cómo le ayudaría la nube?",
            hint: "Considera qué pasa si el disco se daña o pierde.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál de las siguientes NO es una característica esencial del cloud computing según NIST?",
        options: [
          { label: "Autoservicio bajo demanda" },
          { label: "Acceso amplio por red" },
          { label: "Propiedad del hardware por parte del usuario", correct: true },
          { label: "Elasticidad rápida" },
        ],
      },
    ],
  },
  {
    slug: "modelos-servicio",
    title: "Modelos de servicio: IaaS, PaaS, SaaS",
    readingTime: "12 min",
    objectives: [
      "Diferenciar los tres modelos de servicio cloud: IaaS, PaaS y SaaS",
      "Visualizar cómo se redistribuyen las capas de responsabilidad entre usuario y proveedor",
      "Clasificar casos reales en el modelo de servicio correspondiente",
    ],
    sections: [
      {
        type: "trigger",
        question: "Cuando usas Gmail, ¿administras el servidor donde vive tu correo? ¿Y si creas una máquina virtual en la nube? ¿Quién se encarga de qué en cada caso?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Los modelos de servicio (IaaS, PaaS, SaaS) definen cuánto controlas tú y cuánto administra el proveedor. Conforme te mueves de IaaS hacia SaaS, el proveedor asume más capas de la pila tecnológica y tú conservas menos tareas operativas —aunque siempre mantienes responsabilidad sobre tus datos e identidades.",
      },
      {
        type: "text",
        title: "La analogía: terreno, departamento y hotel",
        content:
          "En IaaS te dan el terreno con servicios básicos: tú construyes y administras todo. En PaaS te dan un departamento ya construido: tú solo lo decoras con tu código. En SaaS te dan un hotel con todo incluido: solo llegas, te registras y usas. La clave es entender que no hay un modelo \"mejor\" sino uno más adecuado según cuánto control necesitas y cuánta gestión quieres delegar.",
      },
      {
        type: "responsibilityStack",
        title: "Pila de responsabilidad compartida",
        description: "Selecciona un modelo para ver quién administra cada capa. Este es el concepto central de la unidad: la diferencia entre modelos es quién se encarga de qué.",
      },
      {
        type: "table",
        title: "Resumen comparativo",
        headers: ["Modelo", "Tú controlas", "El proveedor controla", "Ejemplo rápido"],
        rows: [
          ["IaaS", "SO, apps, configuración, datos", "Hardware, red, virtualización", "Crear una VM en Azure"],
          ["PaaS", "Código y datos", "SO, runtime, middleware, infra", "Desplegar en App Service"],
          ["SaaS", "Uso y configuración funcional", "Toda la pila tecnológica", "Usar Gmail o Microsoft 365"],
        ],
      },
      {
        type: "tabs",
        title: "Explora cada modelo en detalle",
        tabs: [
          {
            id: "iaas",
            label: "IaaS",
            badge: "Más control",
            content: "Te dan máquinas virtuales, red y almacenamiento. Tú instalas el SO, configuras el firewall, aplicas parches y despliegas tus apps. Máxima flexibilidad, pero también máxima responsabilidad operativa. Ejemplos: AWS EC2, Azure Virtual Machines, Google Compute Engine.",
          },
          {
            id: "paas",
            label: "PaaS",
            badge: "Equilibrio",
            content: "Te dan una plataforma lista para subir tu código. No tocas el servidor, el SO ni el middleware. Solo escribes código, despliegas y la plataforma se encarga del resto. Ideal para desarrolladores. Ejemplos: Azure App Service, AWS Elastic Beanstalk, Google App Engine.",
          },
          {
            id: "saas",
            label: "SaaS",
            badge: "Menos gestión",
            content: "Usas software directamente por internet. No administras nada técnico: solo inicias sesión y trabajas. El proveedor se encarga de toda la infraestructura, actualizaciones y disponibilidad. Ejemplos: Gmail, Microsoft 365, Zoom, Salesforce.",
          },
        ],
      },
      {
        type: "classify",
        title: "Clasifica el caso",
        description: "Lee cada situación y decide a qué modelo de servicio pertenece. Haz clic para verificar tu respuesta.",
        cases: [
          {
            text: "Un administrador crea una máquina virtual con Ubuntu Server para configurar un firewall personalizado.",
            answer: "IaaS",
            explanation: "Es IaaS porque el usuario controla el sistema operativo, la configuración de red y las aplicaciones. El proveedor solo ofrece la infraestructura virtualizada.",
          },
          {
            text: "Un equipo de desarrollo despliega una API Node.js en Azure App Service sin configurar el servidor.",
            answer: "PaaS",
            explanation: "Es PaaS porque el equipo solo sube código y el proveedor administra el SO, runtime, escalamiento y parches del servidor.",
          },
          {
            text: "Un profesor usa Google Classroom para gestionar tareas y calificaciones de sus alumnos.",
            answer: "SaaS",
            explanation: "Es SaaS porque el profesor solo usa la aplicación funcionalmente. No administra nada de la infraestructura ni del código.",
          },
          {
            text: "Una empresa contrata Salesforce para gestionar sus relaciones con clientes.",
            answer: "SaaS",
            explanation: "Es SaaS porque Salesforce es un software completo al que solo accedes por internet. Toda la infraestructura y el desarrollo son del proveedor.",
          },
          {
            text: "Un estudiante publica un sitio estático usando GitHub Pages con build automático.",
            answer: "PaaS",
            explanation: "Es PaaS porque la plataforma se encarga de compilar, desplegar y servir el sitio. El estudiante solo sube código.",
          },
        ],
      },
      {
        type: "quiz",
        question: "Si despliegas tu aplicación web en Azure App Service sin preocuparte por el sistema operativo ni los parches, ¿qué modelo estás usando?",
        options: [
          { label: "IaaS", explanation: "En IaaS tú administras el SO y los parches. Aquí no lo haces." },
          { label: "PaaS", correct: true, explanation: "Correcto: PaaS te permite enfocarte solo en el código. El proveedor administra SO, runtime y middleware." },
          { label: "SaaS", explanation: "En SaaS no despliegas código propio, solo usas software funcional." },
          { label: "On-premises", explanation: "On-premises significa que tú administras todo, incluyendo el hardware físico." },
        ],
      },
    ],
  },
  {
    slug: "modelos-despliegue",
    title: "Modelos de despliegue: público, privado, híbrido",
    readingTime: "10 min",
    objectives: [
      "Diferenciar los modelos de despliegue: nube pública, privada e híbrida",
      "Justificar la elección de un modelo a partir de necesidades reales",
      "Analizar escenarios organizacionales y defender qué modelo conviene más",
    ],
    sections: [
      {
        type: "trigger",
        question: "¿Un hospital debería guardar los expedientes de sus pacientes en el mismo lugar que una startup guarda sus fotos de marketing? ¿Por qué sí o por qué no?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Los modelos de despliegue definen dónde viven tus recursos: nube pública (compartida, escala rápida, pago por uso), privada (exclusiva, control total, inversión alta) o híbrida (combinación estratégica de ambas). La elección no es técnica únicamente: depende del contexto organizacional, las regulaciones y las prioridades del negocio.",
      },
      {
        type: "tabs",
        title: "Los tres modelos",
        tabs: [
          {
            id: "publica",
            label: "Nube pública",
            badge: "Compartida",
            content: "Recursos compartidos entre múltiples clientes vía internet. Escala inmediata, pago por uso, sin inversión inicial. El proveedor es dueño de toda la infraestructura física. Ideal para startups, desarrollo, pruebas y cargas variables. Ejemplos: AWS, Azure, GCP.",
          },
          {
            id: "privada",
            label: "Nube privada",
            badge: "Exclusiva",
            content: "Infraestructura dedicada a una sola organización, ya sea en sus propias instalaciones o con un proveedor dedicado. Mayor control, seguridad y cumplimiento regulatorio, pero inversión alta y escalabilidad limitada. Ideal para gobiernos, hospitales, instituciones financieras.",
          },
          {
            id: "hibrida",
            label: "Nube híbrida",
            badge: "Combinada",
            content: "Combina pública y privada estratégicamente: datos sensibles en privado, cargas variables o analítica en público. Flexibilidad máxima pero mayor complejidad de gestión. Ideal para organizaciones grandes con requisitos mixtos de seguridad y escalabilidad.",
          },
        ],
      },
      {
        type: "table",
        title: "Factores de decisión",
        headers: ["Factor", "Pública", "Privada", "Híbrida"],
        rows: [
          ["Costo inicial", "Bajo (pago por uso)", "Alto (infraestructura propia)", "Medio (combina ambos)"],
          ["Control y seguridad", "Compartido con proveedor", "Control total", "Flexible por tipo de carga"],
          ["Escalabilidad", "Inmediata y elástica", "Limitada al hardware disponible", "Elástica en la parte pública"],
          ["Cumplimiento regulatorio", "Depende de la ubicación del proveedor", "Cumplimiento total local", "Datos regulados en privado"],
        ],
      },
      {
        type: "deploymentDecision",
      },
      {
        type: "quiz",
        question: "¿Qué modelo de despliegue combina recursos exclusivos con servicios compartidos según la necesidad?",
        options: [
          { label: "Nube pública", explanation: "La nube pública solo ofrece recursos compartidos, no exclusivos." },
          { label: "Nube privada", explanation: "La nube privada solo tiene recursos exclusivos, sin la parte compartida." },
          { label: "Nube híbrida", correct: true, explanation: "Correcto: la nube híbrida combina infraestructura privada (exclusiva) con servicios de nube pública (compartidos), eligiendo dónde va cada carga según sus requisitos." },
          { label: "Multi-cloud", explanation: "Multi-cloud significa usar múltiples proveedores públicos, no necesariamente combinar con privado." },
        ],
      },
    ],
  },
  {
    slug: "proveedores-principales",
    title: "Proveedores principales: Azure, AWS, GCP",
    readingTime: "10 min",
    objectives: [
      "Conocer los tres principales proveedores de nube pública",
      "Identificar fortalezas y enfoques de cada proveedor",
      "Comprender que los conceptos base son transferibles entre proveedores",
    ],
    sections: [
      {
        type: "trigger",
        question: "¿Cambian los fundamentos entre AWS, Azure y GCP? ¿O solo cambian los nombres de los servicios?",
      },
      {
        type: "concept",
        title: "Idea clave",
        content:
          "Los nombres cambian, pero los conceptos base de cómputo, almacenamiento, red y automatización son transferibles entre proveedores. Aprender cloud no es memorizar marcas: es entender patrones que funcionan en cualquier nube.",
      },
      {
        type: "tabs",
        title: "Conoce a cada proveedor",
        tabs: [
          {
            id: "aws",
            label: "AWS",
            badge: "Catálogo amplio",
            content: "Pionero del cloud (EC2, 2006). Mayor variedad de servicios y presencia global. Comunidad extensa, documentación abundante. Fuerte en startups, DevOps e infraestructura. Servicios clave: EC2, S3, Lambda, RDS.",
          },
          {
            id: "azure",
            label: "Azure",
            badge: "Ecosistema Microsoft",
            content: "Integración natural con Microsoft 365, Active Directory y .NET. Fuerte en entornos empresariales y corporativos. Creció rápido por su base instalada. Servicios clave: Virtual Machines, Azure SQL, Functions, Entra ID.",
          },
          {
            id: "gcp",
            label: "GCP",
            badge: "Datos e IA",
            content: "Hereda la infraestructura interna de Google. Líder en Big Data, Machine Learning y Kubernetes (nació ahí). Fuerte en equipos de datos y analítica. Servicios clave: BigQuery, Vertex AI, GKE, Cloud Functions.",
          },
        ],
      },
      {
        type: "providerExplorer",
      },
      {
        type: "scenario",
        title: "¿Qué proveedor elegirías?",
        scenarios: [
          {
            situation: "Tu institución ya usa Microsoft 365 y Active Directory para todos los empleados.",
            question: "¿Qué proveedor ofrece integración más natural?",
            hint: "Azure se integra directamente con el ecosistema Microsoft: Entra ID, Office 365, .NET.",
          },
          {
            situation: "Tu equipo quiere entrenar modelos de ML con grandes volúmenes de datos y necesita BigQuery.",
            question: "¿Qué proveedor explorarías primero?",
            hint: "GCP tiene BigQuery y Vertex AI, diseñados para datos e IA a escala.",
          },
          {
            situation: "Necesitas el catálogo más amplio y la comunidad más grande para resolver dudas rápido.",
            question: "¿Qué proveedor tiene ventaja aquí?",
            hint: "AWS tiene la mayor cantidad de servicios (+200) y la comunidad más extensa del mundo.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál proveedor de nube lanzó el primer servicio de cómputo cloud comercial (EC2) en 2006?",
        options: [
          { label: "Microsoft Azure", explanation: "Azure se lanzó en 2010, cuatro años después del cloud comercial." },
          { label: "Google Cloud Platform", explanation: "GCP lanzó App Engine en 2008 y Compute Engine en 2013." },
          { label: "Amazon Web Services", correct: true, explanation: "Correcto: AWS lanzó EC2 en 2006, inaugurando la era del cloud computing comercial con servidores por hora." },
          { label: "IBM Cloud", explanation: "IBM Cloud (antes SoftLayer/Bluemix) llegó después al mercado de nube pública." },
        ],
      },
    ],
  },
];
