import { TopicContent } from "./unit1";

export const unit7Content: TopicContent[] = [
  {
    slug: "proposito-apis",
    title: "El propósito de las APIs",
    courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "9 min",
    objectives: [
      "Entender qué es una API y por qué se usa como capa de abstracción entre servicios",
      "Comprender por qué el versionado de APIs permite evolucionar servicios sin romper clientes existentes",
      "Identificar REST como el estilo arquitectónico más utilizado para APIs en la nube",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si un servicio cambia su implementación interna, ¿deberían todos los que lo usan tener que actualizar su código? ¿Cómo se evita ese problema?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una API (Application Programming Interface) es una interfaz limpia y bien definida que un servicio expone hacia el exterior. Oculta los detalles internos de implementación y ofrece un contrato estable: mientras ese contrato no cambie, los clientes pueden seguir funcionando sin importar cómo está construido el servicio por dentro.",
      },
      {
        type: "text",
        title: "La interfaz como contrato",
        content:
          "Sin APIs, para usar un servicio externo habría que conocer todos sus detalles internos — cómo está codificado, qué tecnología usa, cómo procesa los datos. Eso haría los sistemas frágiles: cualquier cambio interno rompería a todos los que lo usan. La API soluciona esto definiendo un contrato público: 'si me mandas esta petición en este formato, te respondo de esta forma'. Lo que pase detrás de ese contrato puede cambiar libremente.",
      },
      {
        type: "text",
        title: "APIs en la nube: comunicación universal",
        content:
          "En cloud computing, las APIs son el mecanismo principal de comunicación entre servicios. Cuando tu aplicación usa Cloud Storage para guardar un archivo, no está accediendo directamente a un disco físico: está llamando a la API de Cloud Storage. Cuando hace una consulta a Cloud SQL, habla con su API. Esta estructura universal permite conectar distintos servicios — de diferentes lenguajes, plataformas o proveedores — sin que ninguno necesite conocer los internos del otro.",
      },
      {
        type: "apiVisualizer",
      },
      {
        type: "tabs",
        title: "APIs en el ecosistema cloud",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Una API tiene cuatro elementos fundamentales: (1) Interfaz — el contrato que define qué operaciones están disponibles y en qué formato; (2) Implementación — el código que ejecuta la lógica, oculto al cliente; (3) Versión — permite evolucionar la API sin romper clientes actuales; (4) Documentación — describe cómo usar la interfaz. El cliente solo necesita conocer la interfaz, nunca la implementación.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "GCP",
            content:
              "Todos los servicios de Google Cloud se exponen a través de APIs REST. Desde Cloud Storage hasta BigQuery, desde Compute Engine hasta IAM — cada servicio tiene una API documentada que cualquier lenguaje puede consumir. Google también ofrece herramientas para crear tus propias APIs administradas: Cloud Endpoints y Apigee. El API Explorer (console.cloud.google.com/apis) muestra todas las APIs disponibles y cuáles están habilitadas en tu proyecto.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "AWS",
            content:
              "En AWS, la lógica es idéntica: todos los servicios (S3, EC2, Lambda, RDS...) se controlan mediante APIs. El SDK de AWS (boto3, aws-sdk) envuelve esas APIs en métodos de lenguaje. Para administrar tus propias APIs, AWS ofrece API Gateway — equivalente a Cloud Endpoints. La diferencia de nombres es superficial; el patrón de interfaz → implementación → versión es el mismo.",
          },
        ],
      },
      {
        type: "table",
        title: "Beneficios clave de las APIs",
        headers: ["Beneficio", "Descripción", "Ejemplo en la nube"],
        rows: [
          ["Abstracción", "Oculta la complejidad interna del servicio", "Usas Cloud Storage por API sin saber cómo almacena los bits"],
          ["Desacoplamiento", "Cliente y servicio pueden evolucionar independientemente", "Google mejora Compute Engine sin que tus scripts rompan"],
          ["Interoperabilidad", "Cualquier lenguaje puede consumir la misma API", "Python, Java y JavaScript usan la misma API de Cloud SQL"],
          ["Versionado", "Cambios sin romper clientes actuales", "/api/v1 y /api/v2 coexisten; los clientes migran a su ritmo"],
          ["Seguridad", "Control de acceso centralizado en la capa de API", "IAM, OAuth y tokens controlan quién puede llamar a qué"],
        ],
      },
      {
        type: "scenario",
        title: "APIs en contexto",
        scenarios: [
          {
            situation: "Un equipo actualiza su base de datos de MySQL a Spanner. Sus clientes externos usan una API para consultar los datos.",
            question: "¿Los clientes necesitan actualizar su código cuando el equipo migra la base de datos?",
            hint: "No, si la API (el contrato) no cambia. La API abstrae la implementación interna — el cliente nunca habla directamente con la base de datos.",
          },
          {
            situation: "Una empresa quiere agregar un nuevo campo opcional a su respuesta de API sin afectar a clientes que ya consumen la versión actual.",
            question: "¿Necesita crear una nueva versión de la API?",
            hint: "Agregar campos opcionales generalmente es retrocompatible. Si el cambio rompe clientes existentes (quita campos, cambia tipos), entonces sí se necesita una nueva versión.",
          },
          {
            situation: "Tu aplicación web necesita subir imágenes a Cloud Storage desde JavaScript.",
            question: "¿Qué mecanismo usa para comunicarse con Cloud Storage?",
            hint: "La API REST de Cloud Storage (HTTP requests). El SDK de JavaScript envuelve esas llamadas en métodos cómodos, pero internamente todo es API.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Por qué el versionado de APIs es importante?",
        options: [
          {
            label: "Para que los clientes siempre deban actualizar cuando el servicio cambia",
            correct: false,
            explanation: "El versionado existe precisamente para que los clientes NO necesiten actualizar de inmediato. Ambas versiones coexisten.",
          },
          {
            label: "Para evolucionar la API con nuevas funciones sin romper a los clientes que usan la versión anterior",
            correct: true,
            explanation: "Correcto. El versionado permite cambiar o extender una API manteniendo versiones anteriores activas, dando tiempo a los clientes para migrar.",
          },
          {
            label: "Para hacer la API más lenta y costosa",
            correct: false,
            explanation: "El versionado no tiene impacto en rendimiento ni costo directo — es un mecanismo de compatibilidad.",
          },
          {
            label: "Para que solo un lenguaje pueda usar el servicio",
            correct: false,
            explanation: "Las APIs (especialmente REST) están diseñadas para ser consumidas por cualquier lenguaje que pueda hacer HTTP requests.",
          },
        ],
      },
    ],
  },
  {
    slug: "api-rest",
    title: "Arquitectura básica de una API REST",
    courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "8 min",
    objectives: [
      "Comprender qué es REST y qué restricciones define para una API web",
      "Identificar los verbos HTTP (GET, POST, PUT, DELETE) y su relación con operaciones CRUD",
      "Entender qué significa que una API sea stateless y por qué eso importa en la nube",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Cuando usas una app que consulta datos, los crea, los edita y los elimina, ¿cómo sabe el servidor qué quieres hacer en cada petición?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "REST (Representational State Transfer) es el estilo arquitectónico más usado para APIs en la web. No es un protocolo ni una tecnología — es un conjunto de restricciones que, si se cumplen, hacen que el servicio sea 'RESTful'. REST toma las ideas que hicieron funcionar la web (HTTP, URLs como identidad de recursos, verbos estándar) y las aplica al diseño de APIs.",
      },
      {
        type: "text",
        title: "HTTP como canal universal",
        content:
          "La web lleva décadas funcionando sobre HTTP. REST aprovecha esa infraestructura: en lugar de inventar un nuevo protocolo, define cómo usar los verbos HTTP para representar operaciones. GET para leer, POST para crear, PUT para actualizar, DELETE para eliminar. Cualquier sistema que soporta HTTP puede consumir una API REST, sin instalar librerías especiales. Eso explica su popularidad: funciona desde un navegador, desde un script Python, desde una app móvil o desde otro servidor.",
      },
      {
        type: "text",
        title: "Sin estado: cada petición es completa por sí misma",
        content:
          "Una propiedad central de REST es que es stateless: el servidor no guarda información sobre peticiones anteriores. Cada request contiene todo lo que el servidor necesita para procesarla — incluyendo los datos de autenticación. Esto facilita el escalamiento horizontal (cualquier instancia puede atender cualquier request) y simplifica la recuperación ante fallos. La autenticación en REST típicamente se hace con OAuth tokens, que se incluyen en cada petición.",
      },
      {
        type: "tabs",
        title: "REST en la práctica",
        tabs: [
          {
            id: "verbos",
            label: "Verbos HTTP",
            badge: "CRUD",
            content:
              "Los cuatro verbos HTTP de REST mapean directamente a las operaciones CRUD: GET → Read (leer un recurso), POST → Create (crear nuevo recurso), PUT/PATCH → Update (modificar recurso existente), DELETE → Delete (eliminar recurso). La URL identifica el recurso; el verbo dice qué hacer con él. Por ejemplo: GET /cursos obtiene la lista, POST /cursos crea uno nuevo, PUT /cursos/5 actualiza el curso 5, DELETE /cursos/5 lo elimina.",
          },
          {
            id: "stateless",
            label: "Sin estado",
            badge: "Escalabilidad",
            content:
              "Al ser stateless, cada petición debe incluir toda la información necesaria (autenticación, parámetros, cuerpo). El servidor no recuerda la sesión del cliente entre requests. Ventajas: cualquier servidor puede atender cualquier petición (fácil escalamiento), no hay sesiones que gestionar, y si un servidor falla, la siguiente petición puede ir a otro sin problema. OAuth 2.0 es el estándar para incluir la identidad del usuario en cada request mediante tokens.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Las APIs de Google Cloud son RESTful: tienen endpoints HTTPS, usan verbos HTTP estándar, identifican recursos con URLs (/projects/{project}/buckets/{bucket}/objects/{object}) y requieren autenticación OAuth. La documentación de cada API incluye el método (GET/POST/etc.), la URL, los parámetros y ejemplos de request/response. Cloud Shell y el SDK (gcloud, gsutil) son simplemente envolturas que hacen esas llamadas REST por ti.",
          },
        ],
      },
      {
        type: "table",
        title: "Verbos HTTP y operaciones CRUD",
        headers: ["Verbo HTTP", "Operación", "Descripción", "Ejemplo de URL", "Código de respuesta típico"],
        rows: [
          ["GET", "Read", "Obtener un recurso o lista", "GET /proyectos/mi-proyecto/vms", "200 OK"],
          ["POST", "Create", "Crear un nuevo recurso", "POST /proyectos/mi-proyecto/vms", "201 Created"],
          ["PUT / PATCH", "Update", "Actualizar un recurso existente", "PUT /proyectos/mi-proyecto/vms/vm-1", "200 OK"],
          ["DELETE", "Delete", "Eliminar un recurso", "DELETE /proyectos/mi-proyecto/vms/vm-1", "204 No Content"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué verbo usarías?",
        scenarios: [
          {
            situation: "Quieres ver la lista de todos los buckets que tienes en tu proyecto de Google Cloud.",
            question: "¿Qué verbo HTTP usa esa operación y por qué?",
            hint: "Leer / obtener información → GET. No creas ni modificas nada, solo consultas lo que existe.",
          },
          {
            situation: "Un estudiante envía un formulario de registro y tu API debe guardar sus datos en la base de datos.",
            question: "¿Qué verbo HTTP corresponde a esta operación?",
            hint: "Crear un nuevo recurso (un nuevo registro de estudiante) → POST.",
          },
          {
            situation: "Un usuario cambia su email en el perfil. Tu API debe actualizar solo ese campo en el registro existente.",
            question: "¿Qué verbo HTTP corresponde y por qué no usarías GET?",
            hint: "Modificar un recurso existente → PUT o PATCH. GET es de solo lectura, no modifica datos en el servidor.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Qué significa que una API REST sea stateless?",
        options: [
          {
            label: "Que el servidor guarda el historial de todas las peticiones anteriores del cliente",
            correct: false,
            explanation: "Eso sería lo contrario de stateless. En REST, el servidor NO guarda estado de sesión entre peticiones.",
          },
          {
            label: "Que cada petición contiene toda la información necesaria para procesarla sin depender de peticiones anteriores",
            correct: true,
            explanation: "Correcto. Stateless significa que el servidor no recuerda conversaciones anteriores. Cada request debe ser autosuficiente — incluyendo la autenticación.",
          },
          {
            label: "Que la API no tiene documentación",
            correct: false,
            explanation: "Stateless se refiere al manejo del estado de sesión, no a la documentación. Las APIs REST bien diseñadas siempre tienen documentación.",
          },
          {
            label: "Que la API solo acepta peticiones GET",
            correct: false,
            explanation: "REST usa GET, POST, PUT y DELETE. Stateless es una propiedad del manejo de sesión, no del tipo de verbo.",
          },
        ],
      },
    ],
  },
  {
    slug: "gestion-apis",
    title: "Gestión de APIs: Cloud Endpoints y Apigee",
    courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "10 min",
    objectives: [
      "Entender qué desafíos existen al desplegar y administrar APIs propias a escala",
      "Distinguir Cloud Endpoints y Apigee como dos herramientas de gestión de APIs con enfoques diferentes",
      "Reconocer cuándo conviene usar cada una según el caso de uso",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si construyes una API que van a usar miles de clientes, ¿qué necesitas más allá de solo escribir el código? ¿Cómo controlas quién accede, cuánto usan y si está funcionando bien?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Desplegar una API en producción va mucho más allá de escribir el código. Necesitas autenticación (¿quién puede llamarla?), autorización (¿qué puede hacer?), monitoreo (¿está funcionando?), control de tráfico (¿qué pasa si recibe mil peticiones por segundo?), versiones y documentación. Los sistemas de gestión de APIs como Cloud Endpoints y Apigee resuelven estos problemas sin que debas implementarlos desde cero.",
      },
      {
        type: "text",
        title: "Cloud Endpoints: gestión de APIs para backends en Google Cloud",
        content:
          "Cloud Endpoints es un sistema distribuido de gestión de APIs diseñado para backends que corren en App Engine, GKE o Compute Engine. Usa un proxy llamado Extensible Service Proxy (ESP), que corre en su propio contenedor Docker al lado de tu servicio. El proxy intercepta todas las peticiones, las valida, las registra y las reenvía a tu backend. Cloud Endpoints soporta el estándar OpenAPI (antes conocido como Swagger) y gRPC para definir la interfaz de la API. Ofrece consola de administración, logs detallados, trazabilidad de latencia y autenticación integrada con Firebase, Auth0 y Google accounts.",
      },
      {
        type: "text",
        title: "Apigee: gestión de APIs con foco empresarial",
        content:
          "Apigee es una plataforma de gestión de APIs con un enfoque diferente al de Cloud Endpoints: está diseñada para problemas de negocio. Casos como rate limiting (limitar cuántas peticiones puede hacer un cliente por minuto), cuotas de uso, análisis de consumo por cliente, monetización de APIs y gestión de acuerdos comerciales son el dominio de Apigee. Muchas empresas usan Apigee para exponer sus servicios a socios o clientes externos. A diferencia de Cloud Endpoints, el backend de Apigee no necesita estar en Google Cloud — puede estar en cualquier proveedor o incluso en instalaciones on-premises.",
      },
      {
        type: "text",
        title: "Apigee para modernizar aplicaciones legacy",
        content:
          "Una de las aplicaciones más estratégicas de Apigee es la modernización gradual de sistemas heredados (legacy). En lugar de reescribir una aplicación monolítica de golpe, Apigee permite 'pelarla' servicio por servicio: cada funcionalidad se extrae como un microservicio independiente, mientras Apigee enruta el tráfico hacia el componente nuevo o el antiguo según corresponda. Cuando todos los componentes están migrados, la aplicación legacy puede retirarse. Este patrón —conocido como strangler fig— reduce enormemente el riesgo de migración.",
      },
      {
        type: "tabs",
        title: "Cloud Endpoints vs Apigee",
        tabs: [
          {
            id: "endpoints",
            label: "Cloud Endpoints",
            badge: "GCP-nativo",
            content:
              "Cloud Endpoints es ideal cuando: tu backend corre en Google Cloud (App Engine, GKE, Compute Engine); necesitas gestión de APIs técnica (autenticación, monitoreo, trazabilidad, escala); trabajas con OpenAPI o gRPC; quieres integración nativa con Google Cloud Logging y Monitoring. El Extensible Service Proxy maneja validación, logging y rate limiting como proxy entre el cliente y tu servicio.",
          },
          {
            id: "apigee",
            label: "Apigee",
            badge: "Empresarial",
            content:
              "Apigee es ideal cuando: el caso de uso es empresarial (cuotas, rate limiting, análisis, monetización, acuerdos con socios); el backend puede estar en cualquier proveedor o on-premises; necesitas un developer portal para que terceros descubran y usen tu API; estás migrando un sistema legacy de forma incremental (patrón strangler fig). Apigee es más complejo y costoso que Cloud Endpoints, pero más poderoso para escenarios B2B.",
          },
          {
            id: "comparacion",
            label: "¿Cuál elegir?",
            badge: "Decisión",
            content:
              "Usa Cloud Endpoints si: tu equipo es técnico, el backend está en GCP y necesitas monitoreo/auth sin complejidad empresarial. Usa Apigee si: ofreces una API pública o a socios externos, necesitas control de cuotas por cliente, tienes un sistema legacy que migrar, o requieres analytics de negocio sobre el uso de la API. Para muchos proyectos de clase y MVPs, Cloud Endpoints es suficiente y más sencillo de configurar.",
          },
        ],
      },
      {
        type: "table",
        title: "Cloud Endpoints vs Apigee — comparación clave",
        headers: ["Característica", "Cloud Endpoints", "Apigee"],
        rows: [
          ["Foco principal", "Gestión técnica de APIs (autenticación, monitoreo)", "Problemas de negocio (cuotas, rate limiting, analytics)"],
          ["Backend", "Debe estar en Google Cloud", "Puede estar en cualquier proveedor o on-premises"],
          ["Proxy", "Extensible Service Proxy (ESP en Docker)", "Proxy de Apigee con políticas configurables"],
          ["Autenticación", "Firebase, Auth0, Google accounts", "OAuth, API keys, JWT, SAML"],
          ["Rate limiting / cuotas", "Básico", "Avanzado — por cliente, plan, tiempo"],
          ["Analytics", "Cloud Logging / Monitoring integrado", "Dashboard de negocio con métricas de uso por cliente"],
          ["Caso típico", "API interna o microservicio en GCP", "API pública o para socios externos, modernización legacy"],
          ["Equivalente AWS", "API Gateway (modo técnico)", "API Gateway + API Management features"],
        ],
      },
      {
        type: "starService",
        serviceName: "Cloud Endpoints",
        icon: "/assets/API.svg",
        description: "Cloud Endpoints es el sistema distribuido de gestión de APIs de Google Cloud. Usa el Extensible Service Proxy (ESP) — un contenedor Docker que actúa como proxy frente a tu backend — para validar peticiones, autenticar usuarios, registrar logs y controlar el tráfico. Compatible con OpenAPI y gRPC. Ideal para backends que corren en App Engine, GKE o Compute Engine.",
        features: [
          "Extensible Service Proxy (ESP): proxy Docker que intercepta y valida cada petición antes de llegar al backend",
          "Soporte OpenAPI (Swagger) y gRPC para definir la interfaz de la API",
          "Autenticación integrada: Firebase Auth, Auth0, Google accounts y JWT",
          "Logging automático en Cloud Logging y métricas en Cloud Monitoring",
          "Trazabilidad de latencia: histogramas de tiempo de respuesta por endpoint",
          "Control de acceso a nivel de método (quién puede llamar a qué operación)",
          "Compatible con backends en App Engine, GKE, Compute Engine y Cloud Run",
          "Developer portal para documentar y compartir la API con otros equipos",
        ],
        commands: [
          { command: "gcloud endpoints services deploy openapi.yaml", description: "Desplegar la configuración OpenAPI de la API en Cloud Endpoints" },
          { command: "gcloud endpoints services list", description: "Listar todos los servicios de API registrados" },
          { command: "gcloud endpoints services describe my-api.endpoints.PROJECT.cloud.goog", description: "Ver detalles de configuración de un servicio específico" },
          { command: "gcloud endpoints configs list --service=my-api.endpoints.PROJECT.cloud.goog", description: "Listar las versiones de configuración desplegadas" },
          { command: "gcloud logging read 'resource.type=api'", description: "Ver logs de peticiones a la API en Cloud Logging" },
          { command: "gcloud endpoints services rollout", description: "Hacer rollback a una configuración anterior de la API" },
        ],
      },
      {
        type: "starService",
        serviceName: "Apigee",
        icon: "/assets/API.svg",
        description: "Apigee es la plataforma empresarial de gestión de APIs de Google Cloud. A diferencia de Cloud Endpoints (foco técnico), Apigee resuelve problemas de negocio: rate limiting por cliente, planes de uso con cuotas, analytics de consumo, monetización de APIs y un developer portal completo para socios externos. El backend puede estar en cualquier proveedor o incluso on-premises.",
        features: [
          "Rate limiting avanzado: límites por cliente, plan contratado, hora del día o tipo de operación",
          "Cuotas de uso: define cuántas peticiones puede hacer cada cliente por día/mes/semana",
          "Analytics de negocio: dashboard con métricas de uso por cliente, endpoint y plan",
          "Developer portal: interfaz para que socios externos descubran, documenten y prueben la API",
          "Monetización: cobra por volumen de peticiones o por plan de acceso a la API",
          "Políticas configurables: transformación de requests/responses, caching, autenticación (OAuth, API keys, JWT, SAML)",
          "Backend agnóstico: funciona con cualquier proveedor cloud o infraestructura on-premises",
          "Modernización legacy (strangler fig): extrae servicios del monolito uno a uno mientras Apigee enruta el tráfico",
        ],
        commands: [
          { command: "apigeecli apis create -n my-api -p PROJECT -t TOKEN", description: "Crear un nuevo proxy de API en Apigee" },
          { command: "apigeecli apis deploy -n my-api -e prod -p PROJECT -t TOKEN", description: "Desplegar el proxy en el entorno de producción" },
          { command: "apigeecli apis list -p PROJECT -t TOKEN", description: "Listar todos los proxies de API registrados" },
          { command: "apigeecli products create -n my-product -p PROJECT -t TOKEN", description: "Crear un producto de API (agrupa proxies en un plan de acceso)" },
          { command: "apigeecli apps create -n my-app -d developer@example.com -p PROJECT -t TOKEN", description: "Crear una aplicación de desarrollador con credenciales de API key" },
          { command: "apigeecli stats get -d api_calls -p PROJECT -t TOKEN", description: "Obtener estadísticas de uso de la API" },
        ],
      },
      {
        type: "scenario",
        title: "¿Cloud Endpoints o Apigee?",
        scenarios: [
          {
            situation: "Un equipo de clase despliega una API REST en App Engine que da acceso a datos de estudiantes. Quieren monitorear latencia y autenticar con Google accounts.",
            question: "¿Qué herramienta conviene y por qué?",
            hint: "Cloud Endpoints. Backend en GCP, necesidades técnicas (auth + monitoreo), sin requisitos empresariales complejos. Es más sencillo y suficiente para este caso.",
          },
          {
            situation: "Una empresa expone su catálogo de productos como API a cientos de socios comerciales. Necesita cobrar por volumen de peticiones, limitar el uso según el plan contratado y generar reportes de consumo para cada socio.",
            question: "¿Qué herramienta es más adecuada?",
            hint: "Apigee. Rate limiting por cliente, planes de uso, analytics de negocio, developer portal para socios — todo esto es el dominio de Apigee.",
          },
          {
            situation: "Un banco tiene un sistema legacy monolítico de 20 años. Quieren modernizarlo sin arriesgarse a una reescritura completa de una vez.",
            question: "¿Cómo puede ayudar Apigee en este proceso?",
            hint: "Patrón strangler fig con Apigee: cada módulo se extrae como microservicio y Apigee enruta el tráfico hacia el componente nuevo o el antiguo. El monolito se retira gradualmente.",
          },
        ],
      },
      {
        type: "list",
        title: "Problemas que resuelve la gestión de APIs",
        items: [
          "Autenticación y autorización: ¿quién puede llamar a la API y qué puede hacer?",
          "Rate limiting: evitar que un solo cliente consuma todos los recursos",
          "Monitoreo y trazabilidad: ¿cuánto tarda cada petición? ¿Hay errores?",
          "Versionado: mantener versiones antiguas activas mientras los clientes migran",
          "Documentación y discovery: portal para que los consumidores entiendan cómo usar la API",
          "Escalamiento: el proxy gestiona el tráfico sin que el backend se sature",
          "Seguridad: cifrado TLS, validación de tokens, protección contra ataques",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la diferencia principal entre Cloud Endpoints y Apigee?",
        options: [
          {
            label: "Cloud Endpoints solo funciona con bases de datos; Apigee solo con apps móviles",
            correct: false,
            explanation: "Ambas son herramientas de gestión de APIs. La diferencia está en el enfoque: técnico vs. empresarial.",
          },
          {
            label: "Cloud Endpoints se enfoca en la gestión técnica de APIs en GCP; Apigee se enfoca en problemas de negocio como cuotas, rate limiting y analytics",
            correct: true,
            explanation: "Exacto. Cloud Endpoints es ideal para autenticación y monitoreo de APIs con backend en GCP. Apigee resuelve necesidades empresariales más complejas y funciona con cualquier backend.",
          },
          {
            label: "Apigee solo puede usarse con backends en Google Cloud",
            correct: false,
            explanation: "Al contrario: una de las ventajas de Apigee es que el backend puede estar en cualquier proveedor o incluso on-premises.",
          },
          {
            label: "Cloud Endpoints es más costoso y complejo que Apigee",
            correct: false,
            explanation: "Apigee es la plataforma más completa y costosa de las dos. Cloud Endpoints es más sencillo y suficiente para muchos casos técnicos.",
          },
        ],
      },
    ],
  },
  {
    slug: "mensajeria-eventos",
    title: "Mensajería e integración asíncrona",
    courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "8 min",
    objectives: [
      "Entender la diferencia entre comunicación síncrona y asíncrona entre servicios",
      "Comprender qué es Pub/Sub y cómo desacopla productores de consumidores",
      "Relacionar mensajería con casos de uso como procesamiento en lote, notificaciones y pipelines de datos",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si un servicio necesita notificar a otros 10 servicios cada vez que algo ocurre, ¿tiene sentido que espere la respuesta de todos antes de continuar?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La mensajería asíncrona permite que un servicio publique un mensaje sin esperar a que los consumidores lo procesen. El mensaje se almacena en un canal intermediario (un topic o queue) y los consumidores lo reciben cuando están listos. Esto desacopla productores y consumidores: pueden estar en diferentes lenguajes, escalar independientemente y funcionar incluso si alguno falla temporalmente.",
      },
      {
        type: "text",
        title: "Síncrono vs asíncrono",
        content:
          "En comunicación síncrona (como REST), el llamador espera la respuesta antes de continuar. Si el receptor tarda o falla, el llamador queda bloqueado. En comunicación asíncrona, el llamador publica un mensaje y sigue con su trabajo. El receptor lo procesa cuando puede. Esto es fundamental para sistemas de alta disponibilidad, pipelines de datos y arquitecturas de microservicios donde los servicios no deben estar estrechamente acoplados.",
      },
      {
        type: "tabs",
        title: "Mensajería en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Pub/Sub",
            badge: "Patrón",
            content:
              "Pub/Sub (Publicar/Suscribir) es el patrón principal de mensajería asíncrona. Un publicador (producer) envía mensajes a un topic sin saber quién los recibirá. Uno o varios suscriptores (consumers) están suscritos a ese topic y reciben cada mensaje. Google Cloud Pub/Sub implementa este patrón con durabilidad garantizada, entrega at-least-once y escala a millones de mensajes por segundo.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "GCP",
            content:
              "Cloud Pub/Sub es el servicio de mensajería de GCP. Casos de uso: pipelines de datos en tiempo real (ingestar eventos de IoT), disparar Cloud Run functions cuando llega un mensaje, desacoplar microservicios, procesamiento de logs en lote. Eventarc usa Pub/Sub bajo el capó para enrutar eventos de servicios GCP hacia Cloud Run o Cloud Run functions. El formato de eventos es CloudEvents.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "AWS",
            content:
              "En AWS los equivalentes son: SNS (Simple Notification Service) para Pub/Sub, SQS (Simple Queue Service) para colas de mensajes punto a punto y Amazon Kinesis para streaming de datos en tiempo real. El patrón es el mismo — desacoplar productores de consumidores mediante un intermediario. La elección entre SNS, SQS y Kinesis depende del patrón de entrega necesario.",
          },
        ],
      },
      {
        type: "table",
        title: "Síncrono vs asíncrono",
        headers: ["Aspecto", "Síncrono (REST)", "Asíncrono (Pub/Sub)"],
        rows: [
          ["El llamador espera respuesta", "Sí — bloquea hasta recibir respuesta", "No — publica y sigue su trabajo"],
          ["Acoplamiento", "Alto — receptor debe estar disponible", "Bajo — mensaje persiste si receptor falla"],
          ["Escalabilidad", "Limitada por el receptor", "Productor y consumidor escalan independientemente"],
          ["Tolerancia a fallos", "Si receptor falla, la llamada falla", "Mensaje se reintenta hasta que sea procesado"],
          ["Caso de uso ideal", "Consultas en tiempo real, lecturas de datos", "Notificaciones, pipelines, procesamiento en lote"],
          ["Google Cloud", "Cloud Endpoints, REST APIs", "Cloud Pub/Sub, Eventarc"],
          ["AWS", "API Gateway + Lambda sync", "SNS, SQS, Kinesis"],
        ],
      },
      {
        type: "scenario",
        title: "¿Síncrono o asíncrono?",
        scenarios: [
          {
            situation: "Un usuario hace clic en 'pagar' en una tienda online. La app necesita mostrarle de inmediato si la transacción fue aprobada o rechazada.",
            question: "¿Conviene comunicación síncrona o asíncrona con el servicio de pagos?",
            hint: "Síncrona. El usuario necesita ver el resultado de inmediato. La app no puede continuar sin saber si el pago fue aprobado.",
          },
          {
            situation: "Cuando se registra una venta, el sistema necesita: actualizar el inventario, notificar al vendedor por email, generar un reporte y registrar la auditoría.",
            question: "¿Conviene que el servicio de ventas espere a que todo eso termine antes de confirmar?",
            hint: "Asíncrona. El servicio de ventas puede publicar un evento 'venta registrada' y los otros servicios lo procesan independientemente. La confirmación se da de inmediato.",
          },
          {
            situation: "10,000 sensores IoT envían lecturas de temperatura cada segundo. Un sistema de análisis debe procesarlas todas.",
            question: "¿Cómo se maneja un volumen tan alto sin perder datos?",
            hint: "Cloud Pub/Sub o Kinesis. Los sensores publican mensajes a un topic; el sistema de análisis los consume a su ritmo. Pub/Sub puede absorber millones de mensajes por segundo sin pérdida.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Qué ventaja principal ofrece la mensajería asíncrona con Pub/Sub respecto a las llamadas REST síncronas?",
        options: [
          {
            label: "Es más rápida porque no usa internet",
            correct: false,
            explanation: "Pub/Sub también usa internet. La ventaja no es velocidad sino desacoplamiento y tolerancia a fallos.",
          },
          {
            label: "Desacopla productores y consumidores: el productor no necesita esperar ni depender de que el consumidor esté disponible",
            correct: true,
            explanation: "Correcto. El productor publica y sigue trabajando. El mensaje persiste hasta que el consumidor lo procese, incluso si este falla temporalmente.",
          },
          {
            label: "Solo funciona para enviar emails",
            correct: false,
            explanation: "Pub/Sub es un sistema de mensajería de propósito general. Se usa para pipelines de datos, eventos IoT, notificaciones, microservicios y mucho más.",
          },
          {
            label: "Requiere que todos los servicios estén escritos en el mismo lenguaje",
            correct: false,
            explanation: "Una de las ventajas de Pub/Sub es que productores y consumidores pueden estar en cualquier lenguaje — todos hablan el mismo protocolo de mensajería.",
          },
        ],
      },
    ],
  },
];
