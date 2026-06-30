import { TopicContent } from "./unit1";

export const unit2Content: TopicContent[] = [
  {
    slug: "arquitectura-entorno-cloud",
    title: "Arquitectura general del entorno cloud",
    readingTime: "10 min",
    objectives: [
      "Identificar las capas principales de la arquitectura cloud: cómputo, almacenamiento, red, identidad y bases de datos",
      "Comprender cómo se organizan los servicios dentro de un proveedor cloud",
      "Relacionar cada capa con servicios concretos de Google Cloud y su equivalente en AWS",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si tuvieras que construir un centro de datos desde cero, ¿qué componentes necesitarías? ¿Servidores, discos, cables de red…? En la nube esos mismos componentes existen, solo que no los ves.",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La arquitectura cloud organiza los recursos en capas de servicio: cómputo (procesamiento), almacenamiento (datos persistentes), red (conectividad), identidad y seguridad (quién accede a qué) y bases de datos (datos estructurados). Cada proveedor ofrece servicios específicos para cada capa, pero la estructura conceptual es la misma.",
      },
      {
        type: "text",
        title: "¿Por qué importa entender la arquitectura?",
        content:
          "Antes de usar cualquier servicio cloud, necesitas un mapa mental de cómo se relacionan entre sí. No basta con saber que existe Compute Engine o Cloud Storage; necesitas entender que Compute Engine es cómputo, Cloud Storage es almacenamiento, y que ambos se conectan a través de una red virtual (VPC). Este mapa te permite tomar decisiones informadas sobre qué servicio usar para cada necesidad.",
      },
      {
        type: "cloudArchitecture",
      },
      {
        type: "tabs",
        title: "Capas de la arquitectura",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Todo entorno cloud se organiza en cinco pilares: (1) Cómputo — máquinas virtuales, contenedores y funciones que ejecutan tu código; (2) Almacenamiento — discos, objetos y archivos donde persisten tus datos; (3) Red — redes virtuales, balanceadores y DNS que conectan todo; (4) Identidad y seguridad — usuarios, roles y políticas que controlan el acceso; (5) Bases de datos — motores relacionales y NoSQL administrados por el proveedor.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "En Google Cloud las capas se mapean así: Cómputo → Compute Engine (VMs), Cloud Functions (serverless), GKE (contenedores). Almacenamiento → Cloud Storage (objetos), Persistent Disk (discos de bloque), Filestore (archivos). Red → VPC (red virtual), Cloud Load Balancing (balanceador), Cloud DNS. Identidad → IAM (usuarios y roles), Cloud Identity. Bases de datos → Cloud SQL (relacional), Firestore (NoSQL), Memorystore (caché).",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS las capas equivalentes son: Cómputo → EC2, Lambda, ECS/EKS. Almacenamiento → S3, EBS, EFS. Red → VPC, ELB, Route 53. Identidad → IAM, Organizations. Bases de datos → RDS, DynamoDB, ElastiCache. Los conceptos son los mismos; cambian los nombres comerciales.",
          },
        ],
      },
      {
        type: "table",
        title: "Servicios fundamentales por capa",
        headers: ["Capa", "Función", "Google Cloud", "Equivalente AWS"],
        rows: [
          ["Cómputo", "Ejecutar código y aplicaciones", "Compute Engine, Cloud Functions, GKE", "EC2, Lambda, EKS"],
          ["Almacenamiento", "Guardar datos de forma persistente", "Cloud Storage, Persistent Disk, Filestore", "S3, EBS, EFS"],
          ["Red", "Conectar servicios entre sí y con internet", "VPC, Cloud Load Balancing, Cloud DNS", "VPC, ELB, Route 53"],
          ["Identidad", "Controlar quién accede a qué", "IAM, Cloud Identity, Organization Policy", "IAM, Organizations"],
          ["Bases de datos", "Almacenar datos estructurados/consultas", "Cloud SQL, Firestore, Memorystore", "RDS, DynamoDB, ElastiCache"],
        ],
      },
      {
        type: "scenario",
        title: "¿A qué capa pertenece?",
        scenarios: [
          {
            situation: "Necesitas ejecutar un script de Python que procesa imágenes cada vez que se sube un archivo.",
            question: "¿Qué capa de la arquitectura necesitas principalmente?",
            hint: "Piensa en qué recurso ejecuta código bajo demanda → Cómputo (Cloud Functions en GCP, Lambda en AWS).",
          },
          {
            situation: "Tu aplicación web necesita guardar las fotos de perfil de los usuarios de forma duradera y accesible por URL.",
            question: "¿Qué capa resuelve esta necesidad?",
            hint: "Archivos accesibles por URL = almacenamiento de objetos → Almacenamiento (Cloud Storage en GCP, S3 en AWS).",
          },
          {
            situation: "Quieres que solo los desarrolladores del equipo puedan modificar la base de datos de producción, pero que todos puedan leerla.",
            question: "¿Qué capa necesitas configurar?",
            hint: "Controlar quién puede hacer qué = permisos → Identidad (IAM, tanto en GCP como en AWS).",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál de las siguientes afirmaciones sobre la arquitectura cloud es CORRECTA?",
        options: [
          {
            label: "Cada proveedor cloud tiene una arquitectura completamente diferente sin puntos en común",
            correct: false,
            explanation: "Aunque los nombres de los servicios cambian, todos los proveedores organizan sus servicios en las mismas capas conceptuales.",
          },
          {
            label: "Las capas de la arquitectura cloud (cómputo, almacenamiento, red, identidad, DB) son comunes a todos los proveedores",
            correct: true,
            explanation: "Correcto. AWS, Azure y GCP comparten la misma estructura conceptual; lo que cambia son los nombres y detalles de implementación.",
          },
          {
            label: "IAM es un servicio de almacenamiento de archivos",
            correct: false,
            explanation: "IAM (Identity and Access Management) pertenece a la capa de Identidad y seguridad, no al almacenamiento. Existe tanto en GCP como en AWS.",
          },
          {
            label: "VPC se usa para ejecutar código serverless",
            correct: false,
            explanation: "VPC (Virtual Private Cloud) pertenece a la capa de Red. Para serverless se usa Cloud Functions (GCP) o Lambda (AWS).",
          },
        ],
      },
    ],
  },
  {
    slug: "proyectos-recursos",
    title: "Proyectos y recursos",
    readingTime: "9 min",
    objectives: [
      "Entender qué es un recurso en el contexto cloud y cómo se crea",
      "Comprender cómo se organizan los recursos dentro de la jerarquía del entorno cloud",
      "Aplicar buenas prácticas de organización usando proyectos, carpetas y etiquetas, con comparación opcional con AWS",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Imagina que tienes 50 servicios corriendo en la nube: máquinas virtuales, bases de datos, buckets y funciones. ¿Cómo sabrías cuáles pertenecen a una clase, cuáles a una investigación y cuáles a producción?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "En cloud computing, un recurso es cualquier elemento que creas y utilizas en la plataforma: una máquina virtual, un bucket de almacenamiento, una base de datos o una API habilitada. Para administrarlos con orden, Google Cloud usa una jerarquía de organización, carpetas, proyectos y recursos, mientras que las labels permiten clasificarlos transversalmente por proyecto, entorno, equipo o costo.",
      },
      {
        type: "tabs",
        title: "Organización de recursos",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Todo proveedor cloud necesita una jerarquía para organizar recursos: una entidad superior que agrupa todo, contenedores intermedios para separar propósitos y recursos individuales dentro de esos contenedores. Además, las etiquetas (labels/tags) permiten clasificar transversalmente: por entorno (dev/prod), por equipo, por centro de costo.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud define una jerarquía de: Organization (entidad institucional) → Folders (agrupadores por área, facultad o equipo) → Projects (unidad principal donde viven los recursos, APIs, IAM y facturación) → Resources (VMs, buckets, DBs, funciones). Las labels (pares clave-valor) permiten clasificar recursos sin importar en qué proyecto estén: environment=prod, course=cloud, owner=diego.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS existe una lógica equivalente: Organizations (raíz) → Organizational Units (OUs) → Accounts → Resources, con tags para clasificar. La diferencia principal es que en AWS cada account actúa como contenedor aislado (similar al project de GCP), y las OUs equivalen a las folders. El concepto transferible es el mismo: jerarquía + etiquetas = organización.",
          },
        ],
      },
      {
        type: "text",
        title: "¿Por qué separar en proyectos?",
        content:
          "Separar recursos en distintos proyectos mejora el aislamiento administrativo, facilita el control de permisos y permite distinguir mejor los costos por iniciativa o entorno. Un error en un proyecto de pruebas no afecta a producción. Cada proyecto es como un espacio de trabajo con reglas propias: no es solo una carpeta, es una unidad lógica donde se concentran recursos, políticas y operación.",
      },
      {
        type: "projectOrganizer",
      },
      {
        type: "table",
        title: "Estrategias de organización",
        headers: ["Estrategia", "Cuándo usarla", "Ejemplo en Google Cloud"],
        rows: [
          ["Por entorno", "Separar desarrollo, pruebas y producción", "Proyecto-Dev, Proyecto-Test, Proyecto-Prod"],
          ["Por iniciativa", "Cuando cada proyecto tiene su propio ciclo de vida", "Proyecto-CloudClase, Proyecto-TesisIA"],
          ["Por unidad académica o equipo", "Cuando distintas áreas necesitan autonomía", "Carpeta-Docencia, Carpeta-Investigación"],
          ["Labels transversales", "Clasificar sin depender solo de la jerarquía", "environment=prod, owner=diego, course=cloud"],
        ],
      },
      {
        type: "matching",
        title: "Relaciona concepto con práctica",
        description: "Conecta cada necesidad organizacional con el mecanismo de Google Cloud correspondiente.",
        pairs: [
          {
            concept: "Agrupar recursos de una misma iniciativa",
            items: ["Proyecto (Project)"],
          },
          {
            concept: "Separar áreas institucionales",
            items: ["Carpeta (Folder)"],
          },
          {
            concept: "Clasificar recursos por entorno (dev/prod)",
            items: ["Labels (etiquetas)"],
          },
          {
            concept: "Aplicar políticas y gobierno general",
            items: ["Organización (Organization)"],
          },
        ],
      },
      {
        type: "scenario",
        title: "Organiza tu entorno",
        scenarios: [
          {
            situation: "Eres profesor y quieres que cada equipo tenga un entorno aislado para experimentar sin afectar a otros grupos.",
            question: "¿Cómo organizarías esto en Google Cloud?",
            hint: "Proyectos separados por equipo o por práctica, dentro de una carpeta 'Docencia' bajo la organización institucional.",
          },
          {
            situation: "Tu grupo de investigación necesita distinguir cuánto consume el entorno de clase y cuánto consume el entorno de tesis.",
            question: "¿Qué estrategia de organización usarías?",
            hint: "Proyectos separados (Proyecto-Clase, Proyecto-Tesis) dentro de carpetas distintas, complementados con labels como course=cloud y course=tesis.",
          },
          {
            situation: "Tienes decenas de recursos y necesitas ubicar todos los relacionados con una línea de investigación específica.",
            question: "¿Qué mecanismo facilita esta búsqueda?",
            hint: "Labels consistentes: owner=equipo-ia o project=tesis-analitica. Puedes filtrar por label en la consola, con gcloud CLI o con la API.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Qué elemento es la unidad principal donde viven los recursos en Google Cloud?",
        options: [
          {
            label: "La etiqueta (label)",
            correct: false,
            explanation: "Las labels clasifican recursos transversalmente, pero no los contienen. Los recursos viven dentro de proyectos.",
          },
          {
            label: "La carpeta (folder)",
            correct: false,
            explanation: "Las carpetas agrupan proyectos por área o equipo, pero los recursos no viven directamente en carpetas — viven en proyectos.",
          },
          {
            label: "El proyecto (project)",
            correct: true,
            explanation: "Correcto. El proyecto es la unidad donde se crean recursos, se gestionan APIs, se asignan permisos IAM y se vincula la facturación.",
          },
          {
            label: "La organización (organization)",
            correct: false,
            explanation: "La organización es la entidad raíz institucional. Contiene carpetas y proyectos, pero los recursos individuales se crean dentro de proyectos.",
          },
        ],
      },
    ],
  },
  {
    slug: "acceso-consola-apis",
    title: "Acceso, consola y APIs",
    readingTime: "9 min",
    objectives: [
      "Distinguir las tres formas principales de acceso a un entorno cloud: consola, CLI y API",
      "Comprender que toda acción visual tiene un equivalente programático",
      "Identificar cuándo conviene cada forma de acceso según el caso de uso",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si puedes crear un recurso desde una consola web haciendo clic en botones, ¿por qué también existen APIs y línea de comandos?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Acceder a la nube no significa solo entrar a una página web; significa poder operar recursos desde interfaces visuales, comandos y APIs. Cada puerta de entrada sirve para tareas distintas: la consola para exploración visual, la CLI para operación técnica repetible y las APIs para integración programática.",
      },
      {
        type: "text",
        title: "La nube no es solo 'una página con botones'",
        content:
          "Toda acción que puedes hacer en la consola web de un proveedor cloud —crear un servidor, configurar almacenamiento, revisar costos— tiene una contraparte en la API y generalmente en la línea de comandos. Esto es fundamental porque abre la puerta a la automatización: si puedes hacerlo por API, puedes scripting, y si puedes scriptear, puedes repetir sin error humano.",
      },
      {
        type: "text",
        content:
          "Piensa en un docente que quiere crear un bucket de almacenamiento para archivos de clase. Desde la consola, lo hace con clics y formularios. Desde la CLI, con un comando. Desde la API, con una petición automatizada desde una aplicación. Tres caminos, mismo resultado.",
      },
      {
        type: "accessCompare",
      },
      {
        type: "tabs",
        title: "Formas de acceso",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Todo proveedor cloud ofrece al menos tres interfaces: (1) Consola web — interfaz gráfica para explorar y crear recursos visualmente; (2) CLI — herramienta de línea de comandos para ejecutar acciones desde la terminal; (3) APIs/SDKs — endpoints REST y bibliotecas de lenguaje para integración programática. La consola es ideal para aprender, la CLI para operar, y la API para automatizar.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "En Google Cloud: la Cloud Console (console.cloud.google.com) para gestión visual; gcloud CLI para comandos en terminal (gcloud compute instances list, gcloud storage ls); y Google Cloud Client Libraries (Python, Node.js, Java, Go) para integración desde código. Además, Cloud Shell ofrece una terminal en el navegador con gcloud preinstalado.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS el equivalente es: AWS Management Console para gestión visual, AWS CLI para comandos en terminal, y AWS SDKs (boto3 para Python, aws-sdk para JavaScript). AWS CloudShell ofrece una terminal en el navegador similar a Cloud Shell de GCP.",
          },
        ],
      },
      {
        type: "table",
        title: "Comparativa de interfaces de acceso",
        headers: ["Característica", "Consola web", "CLI", "API / SDK"],
        rows: [
          ["Curva de aprendizaje", "Baja — visual e intuitiva", "Media — requiere conocer comandos", "Alta — requiere programar"],
          ["Velocidad para una tarea", "Lenta (muchos clics)", "Rápida (un comando)", "Depende del código"],
          ["Repetibilidad", "Manual cada vez", "Scripteable y versionable", "Totalmente automatizable"],
          ["Ideal para", "Explorar, aprender, prototipar", "Administrar, scriptear, CI/CD", "Integrar apps, IaC, bots"],
          ["Ejemplo GCP", "Cloud Console", "gcloud CLI", "Client Libraries"],
          ["Ejemplo AWS", "Management Console", "AWS CLI", "boto3 / aws-sdk"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué interfaz usarías?",
        scenarios: [
          {
            situation: "Necesitas crear 100 buckets de almacenamiento con nombres secuenciales para un laboratorio con 100 alumnos.",
            question: "¿Qué interfaz es la más adecuada?",
            hint: "CLI con un loop (for i in {1..100}; do gcloud storage buckets create gs://lab-alumno-$i; done) o un script con el SDK. La consola sería impráctica para 100 repeticiones.",
          },
          {
            situation: "Es tu primer día usando Google Cloud y quieres ver qué servicios existen y cómo se organizan.",
            question: "¿Por dónde empezarías?",
            hint: "La consola web. Es visual, tiene búsqueda y te permite explorar sin conocer comandos.",
          },
          {
            situation: "Tu aplicación web necesita subir automáticamente las fotos de perfil de los usuarios a Cloud Storage cuando se registran.",
            question: "¿Qué interfaz debe usar la aplicación?",
            hint: "El SDK / API. La aplicación llama a storage.bucket('mi-bucket').upload() desde el código backend, no desde una consola ni CLI.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la relación entre la consola web, la CLI y las APIs de un proveedor cloud?",
        options: [
          {
            label: "Son sistemas independientes que hacen cosas diferentes",
            correct: false,
            explanation: "Las tres interfaces acceden a los mismos servicios subyacentes. Son puertas diferentes al mismo destino.",
          },
          {
            label: "La consola web internamente llama a las mismas APIs que la CLI y los SDKs",
            correct: true,
            explanation: "Correcto. La consola es una interfaz gráfica que traduce tus clics en llamadas a la API. Las tres interfaces convergen en los mismos endpoints.",
          },
          {
            label: "La CLI es más poderosa que la API porque puede hacer cosas que la API no",
            correct: false,
            explanation: "La CLI es un wrapper sobre la API. Todo lo que hace la CLI se traduce en llamadas API. La API es la base de todo.",
          },
          {
            label: "Las APIs solo se usan para lectura, no para crear recursos",
            correct: false,
            explanation: "Las APIs permiten todas las operaciones CRUD: crear, leer, actualizar y eliminar recursos.",
          },
        ],
      },
    ],
  },
  {
    slug: "facturacion-administracion",
    title: "Facturación y administración básica",
    readingTime: "10 min",
    objectives: [
      "Entender cómo se vinculan cuentas, proyectos y costos en la nube",
      "Configurar conceptualmente presupuestos y alertas de gasto",
      "Aplicar buenas prácticas de administración responsable del consumo cloud",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si dos proyectos usan recursos distintos en la nube, ¿cómo sabes cuánto cuesta cada uno y quién lo paga?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "En la nube, administrar también significa controlar el consumo, el presupuesto y la relación entre proyectos y costos. La facturación cloud se basa en el uso real de recursos: no pagas por tener una cuenta, pagas por lo que enciendes, almacenas y transfieres.",
      },
      {
        type: "text",
        title: "No es solo pagar: es gobernar el uso",
        content:
          "La facturación cloud no es solo un tema financiero — es un tema de organización y control operativo. Una cuenta de facturación puede estar asociada a uno o varios proyectos, y cada recurso activo genera un costo proporcional a su uso. Entender esta cadena (cuenta → proyecto → recurso → costo) es fundamental para evitar sorpresas.",
      },
      {
        type: "text",
        content:
          "Administrar responsablemente implica tres acciones: organizar quién paga (estructura de cuentas), medir cuánto se consume (reportes y dashboards) y prevenir sorpresas (presupuestos y alertas). Sin estas tres patas, un laboratorio de clase puede terminar costando miles de dólares por un recurso olvidado.",
      },
      {
        type: "tabs",
        title: "Facturación y control de costos",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "El flujo de costo en cloud es: (1) Cuenta de facturación — entidad que paga; (2) Proyectos/cuentas — contenedores de recursos con un propósito; (3) Recursos — servicios activos que consumen capacidad; (4) Consumo — métricas de uso (horas de VM, GB almacenados, peticiones API); (5) Presupuesto/alertas — límites definidos que notifican cuando el gasto se acerca o supera umbrales.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "En Google Cloud: Billing Dashboard muestra el consumo por proyecto; Cost Table y Cost Breakdown analizan gastos por servicio, SKU o label; Budgets & Alerts define presupuestos con notificaciones por email o Pub/Sub; las labels (environment=prod, course=cloud) permiten clasificar costos transversalmente. Cada proyecto se vincula a una cuenta de facturación.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS el equivalente es: AWS Billing Dashboard para consumo global, Cost Explorer para análisis detallado, AWS Budgets para alertas, y Cost Allocation Tags para clasificar. La lógica es la misma: vincular proyectos/cuentas a facturación y usar etiquetas para desglosar.",
          },
        ],
      },
      {
        type: "billingSimulator",
      },
      {
        type: "table",
        title: "Herramientas de control de costos",
        headers: ["Herramienta", "Qué hace", "Google Cloud", "Equivalente AWS"],
        rows: [
          ["Dashboard de facturación", "Vista general del gasto actual y proyectado", "Billing Dashboard", "AWS Billing Dashboard"],
          ["Explorador de costos", "Análisis detallado por servicio, fecha, etiqueta", "Cost Table / Cost Breakdown", "AWS Cost Explorer"],
          ["Presupuestos", "Define límites de gasto con notificaciones", "Budgets & Alerts", "AWS Budgets"],
          ["Etiquetas de costo", "Clasifica gastos por proyecto, equipo o entorno", "Labels", "Cost Allocation Tags"],
          ["Reportes", "Exporta datos de consumo para análisis externo", "Billing Export a BigQuery", "AWS Cost & Usage Report"],
        ],
      },
      {
        type: "list",
        title: "Buenas prácticas de administración de costos",
        items: [
          "Establece presupuestos y alertas desde el día uno, incluso con free tier",
          "Usa etiquetas (labels) en cada recurso para rastrear costos por proyecto",
          "Revisa el dashboard de facturación semanalmente",
          "Apaga o elimina recursos que no estés usando (VMs detenidas siguen costando por disco)",
          "Usa el free tier y los créditos educativos para laboratorios",
          "Separa entornos en proyectos distintos para facturación clara",
        ],
      },
      {
        type: "scenario",
        title: "Escenarios de control de costos",
        scenarios: [
          {
            situation: "Una universidad crea tres proyectos: laboratorio de clase, portal académico e investigación. Al final del mes, recibe una sola factura sin desglose.",
            question: "¿Qué debería haber configurado desde el inicio?",
            hint: "Labels de costo (course=clase, course=portal, course=investigacion) para poder desglosar en Cost Table de Google Cloud. En AWS serían Cost Allocation Tags.",
          },
          {
            situation: "Un estudiante dejó una instancia de Compute Engine corriendo durante las vacaciones. Al volver, descubre una factura de $200.",
            question: "¿Cómo se pudo haber prevenido?",
            hint: "Budgets & Alerts con alerta al 80% del presupuesto + revisión semanal del dashboard + apagar recursos al terminar la práctica.",
          },
          {
            situation: "Tu presupuesto mensual es $100 USD y ya llevas $90 a mitad de mes.",
            question: "¿Qué acciones tomarías?",
            hint: "Revisar qué recursos consumen más en Cost Table, apagar los no esenciales, reducir tamaño de instancias y evaluar si se pueden usar servicios serverless (pago por invocación).",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Por qué es importante configurar presupuestos y alertas en la nube desde el primer día?",
        options: [
          {
            label: "Porque el proveedor cobra una multa si no los configuras",
            correct: false,
            explanation: "No hay multa por no configurar presupuestos. Pero sin ellos, puedes acumular costos inesperados sin darte cuenta.",
          },
          {
            label: "Porque el consumo cloud es proporcional al uso y puede crecer sin límite si no se monitorea",
            correct: true,
            explanation: "Correcto. A diferencia de un plan fijo, en cloud pagas por uso. Un recurso olvidado o mal dimensionado puede escalar costos silenciosamente.",
          },
          {
            label: "Porque el free tier solo dura 24 horas",
            correct: false,
            explanation: "Google Cloud ofrece $300 USD en créditos por 90 días para nuevos usuarios, y el free tier 'Always Free' incluye ciertos recursos sin costo permanente. AWS ofrece 12 meses de free tier.",
          },
          {
            label: "Porque los presupuestos limitan automáticamente el gasto y apagan recursos",
            correct: false,
            explanation: "Los presupuestos son alertas, no límites duros. Notifican pero no detienen servicios automáticamente (a menos que configures acciones específicas con Cloud Functions o Lambda).",
          },
        ],
      },
    ],
  },
  {
    slug: "consola-web",
    title: "Consola web",
    readingTime: "8 min",
    objectives: [
      "Identificar las zonas principales de una consola web cloud y su propósito",
      "Comprender la consola como herramienta de exploración y aprendizaje",
      "Reconocer cuándo la consola es la interfaz más adecuada y cuándo no",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si existe la línea de comandos, ¿por qué sigue siendo tan importante una consola visual?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La consola web es una interfaz gráfica que permite explorar, crear, configurar y supervisar recursos cloud sin escribir comandos. Es la puerta de entrada ideal para principiantes porque hace visibles los servicios, los proyectos y las configuraciones en un entorno navegable.",
      },
      {
        type: "text",
        title: "Aprender a 'leer' la consola",
        content:
          "La consola web ayuda a construir una comprensión espacial del entorno cloud: ves menús de servicios, paneles de recursos, formularios de creación, métricas de rendimiento y alertas. Antes de automatizar con CLI o APIs, necesitas entender qué existe y cómo se relaciona. La consola te da esa vista panorámica.",
      },
      {
        type: "text",
        content:
          "Un estudiante que quiere crear un bucket, revisar qué APIs están habilitadas o ver el consumo de su proyecto puede hacerlo todo desde la consola con navegación visual y formularios guiados. Esto reduce la barrera de entrada y facilita el aprendizaje inicial. Pero ojo: la consola no reemplaza a la CLI ni a las APIs — convive con ellas.",
      },
      {
        type: "consoleMockup",
      },
      {
        type: "tabs",
        title: "La consola web en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Toda consola cloud tiene zonas comunes: (1) Menú de servicios — navegación por categorías; (2) Selector de contexto — proyecto, cuenta o región; (3) Búsqueda global — encontrar servicios y recursos rápido; (4) Panel central — donde se crean y listan recursos; (5) Métricas y alertas — monitoreo visual del estado. Entender estas zonas te permite orientarte en cualquier proveedor.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "La Cloud Console de Google (console.cloud.google.com) organiza todo con: menú lateral de servicios (Compute Engine, Cloud Storage, IAM, BigQuery...), selector de proyecto, búsqueda global y un panel central donde listas y creas recursos. Cloud Shell está integrado para ejecutar gcloud sin salir del navegador. Cada servicio tiene su propia página con tablas, formularios y métricas.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "La AWS Management Console (console.aws.amazon.com) sigue el mismo esquema: barra superior con búsqueda, selector de región, menú Services con categorías, y accesos rápidos a servicios recientes. Cada servicio (EC2, S3, IAM) tiene su propio dashboard. CloudShell está integrado igual que en GCP.",
          },
        ],
      },
      {
        type: "table",
        title: "Zonas de la consola y su función",
        headers: ["Zona", "Función principal", "Ejemplo en Google Cloud"],
        rows: [
          ["Menú de servicios", "Navegar por categorías de servicios", "Encontrar Cloud Storage dentro del menú lateral"],
          ["Selector de proyecto", "Definir el proyecto y contexto de trabajo", "Cambiar de proyecto-dev a proyecto-prod"],
          ["Búsqueda global", "Encontrar servicios o recursos por nombre", "Buscar 'IAM' para ir directo a permisos"],
          ["Panel de recursos", "Listar, crear y configurar recursos", "Ver la lista de buckets en Cloud Storage y crear uno nuevo"],
          ["Métricas", "Monitorear rendimiento y uso", "Ver gráfica de CPU de una VM en Cloud Monitoring"],
          ["Notificaciones", "Alertas de la plataforma", "Aviso de que una cuota o presupuesto está al 80%"],
        ],
      },
      {
        type: "scenario",
        title: "¿Consola o no?",
        scenarios: [
          {
            situation: "Es tu primer día en Google Cloud y quieres ver qué servicios existen y cómo están organizados.",
            question: "¿Es buen momento para usar la consola web?",
            hint: "Sí. La Cloud Console es ideal para explorar visualmente por primera vez. Navegas el menú lateral, ves categorías y descubres servicios sin necesidad de memorizar comandos gcloud.",
          },
          {
            situation: "Necesitas crear 50 buckets en Cloud Storage con nombres secuenciales para un laboratorio.",
            question: "¿Usarías la consola web?",
            hint: "No. Para tareas repetitivas es mucho más eficiente gcloud CLI con un script. La consola requeriría 50 navegaciones y formularios manuales.",
          },
          {
            situation: "Quieres revisar rápidamente las métricas de CPU de tu servidor de producción.",
            question: "¿Consola o CLI?",
            hint: "Consola. Las gráficas de Cloud Monitoring se visualizan mejor en la interfaz web que como texto en una terminal.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la principal ventaja pedagógica de la consola web frente a la CLI?",
        options: [
          {
            label: "Es más rápida para todas las tareas",
            correct: false,
            explanation: "No es más rápida para todo. Para tareas repetitivas o automatizables, la CLI es superior. La consola brilla en exploración y aprendizaje.",
          },
          {
            label: "Permite ver y entender la estructura del entorno cloud de forma visual antes de automatizar",
            correct: true,
            explanation: "Correcto. La consola construye comprensión espacial: ves servicios, relaciones y configuraciones que después puedes replicar por CLI o API con mayor confianza.",
          },
          {
            label: "Reemplaza completamente a la CLI y las APIs",
            correct: false,
            explanation: "La consola convive con las otras interfaces. No las reemplaza; cada una tiene su caso de uso ideal.",
          },
          {
            label: "Solo existe en AWS, no en otros proveedores",
            correct: false,
            explanation: "Todos los proveedores cloud (AWS, Azure, GCP) tienen su propia consola web. Es un patrón universal.",
          },
        ],
      },
    ],
  },
  {
    slug: "linea-comandos",
    title: "Línea de comandos",
    readingTime: "9 min",
    objectives: [
      "Entender la CLI como interfaz de operación reproducible y automatizable",
      "Leer y descomponer un comando cloud en sus partes: herramienta, servicio, acción y flags",
      "Comparar la misma tarea realizada por consola vs. CLI y evaluar cuándo conviene cada una",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "¿Qué pasa si debes repetir la misma configuración diez veces: usar clics o usar comandos?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La línea de comandos convierte la administración cloud en una operación reproducible, rápida y automatizable. En lugar de navegar por menús, escribes instrucciones precisas que pueden guardarse en scripts, versionarse en Git y repetirse sin error humano.",
      },
      {
        type: "text",
        title: "De la exploración a la operación",
        content:
          "Si la consola es para explorar y aprender, la CLI es para operar y repetir. Cada comando cloud sigue un patrón predecible: herramienta + servicio + acción + parámetros. Una vez que entiendes ese patrón, puedes hacer cualquier cosa que la consola permite — pero más rápido y de forma reproducible.",
      },
      {
        type: "text",
        content:
          "La CLI introduce una idea central del trabajo profesional en cloud: si puedes escribirlo como comando, puedes automatizarlo. Esto conecta directamente con scripting, CI/CD, DevOps e infraestructura como código. Dominar la CLI no es opcional para quien trabaje en cloud — es una habilidad fundamental.",
      },
      {
        type: "terminalSimulator",
      },
      {
        type: "tabs",
        title: "CLI cloud en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Toda CLI cloud sigue un patrón: (1) Configurar contexto — definir proyecto/región activa; (2) Listar recursos existentes; (3) Crear o modificar recursos con flags; (4) Verificar el resultado. Los comandos son texto estructurado: herramienta + servicio + acción + argumentos + flags opcionales. Este patrón se repite en AWS CLI, Azure CLI y gcloud.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "gcloud CLI usa la estructura: gcloud <servicio> <acción> [argumentos] [--flags]. Ejemplos: 'gcloud compute instances list' (ver VMs), 'gcloud storage ls' (listar buckets), 'gcloud iam service-accounts list' (listar cuentas de servicio). Se instala con Google Cloud SDK o se usa desde Cloud Shell. La configuración se guarda en ~/.config/gcloud/.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "AWS CLI usa la estructura: aws <servicio> <acción> [argumentos] [--flags]. Ejemplos: 'aws s3 ls' (listar buckets), 'aws ec2 describe-instances' (ver VMs), 'aws iam list-users' (listar usuarios). Se instala localmente o se usa desde AWS CloudShell. La configuración se guarda en ~/.aws/config y ~/.aws/credentials.",
          },
        ],
      },
      {
        type: "table",
        title: "Anatomía de un comando CLI",
        headers: ["Parte", "Qué es", "Ejemplo gcloud (GCP)", "Ejemplo AWS CLI"],
        rows: [
          ["Herramienta", "El programa CLI del proveedor", "gcloud", "aws"],
          ["Servicio", "Categoría de recurso a operar", "storage / compute", "s3 / ec2"],
          ["Acción", "Qué operación realizar", "buckets create", "mb (make bucket)"],
          ["Argumento", "El recurso objetivo", "gs://mi-bucket", "s3://mi-bucket"],
          ["Flag", "Opciones de configuración", "--location=us-east1", "--region us-east-1"],
        ],
      },
      {
        type: "list",
        title: "Buenas prácticas iniciales con CLI",
        items: [
          "Siempre verifica tu contexto (proyecto/región) antes de ejecutar comandos",
          "Usa --dry-run o --help antes de ejecutar comandos destructivos",
          "Guarda secuencias de comandos en scripts .sh para repetirlos",
          "Usa --format o --output para controlar el formato de salida (table, json, text)",
          "Versiona tus scripts en Git como parte de la documentación del proyecto",
          "Comienza con comandos de lectura (list, describe) antes de crear o eliminar",
        ],
      },
      {
        type: "classify",
        title: "¿Consola o CLI?",
        description: "Para cada tarea, indica si conviene más la consola web o la línea de comandos.",
        cases: [
          {
            text: "Explorar qué servicios ofrece Google Cloud por primera vez",
            answer: "Consola",
            explanation: "Para descubrir y explorar visualmente, la Cloud Console es superior. No necesitas saber nombres de comandos gcloud.",
          },
          {
            text: "Crear 20 VMs idénticas de Compute Engine para un laboratorio",
            answer: "CLI",
            explanation: "Un loop con gcloud compute instances create lo resuelve en segundos. En la consola serían 20 formularios manuales.",
          },
          {
            text: "Revisar gráficas de rendimiento de CPU y memoria",
            answer: "Consola",
            explanation: "Las métricas visuales (gráficas de Cloud Monitoring) se entienden mejor en la interfaz gráfica.",
          },
          {
            text: "Configurar un entorno que debe ser idéntico en desarrollo y producción",
            answer: "CLI",
            explanation: "Un script con gcloud garantiza que ambos entornos se configuren exactamente igual. La consola introduce riesgo de diferencias manuales.",
          },
          {
            text: "Verificar rápidamente si un bucket de Cloud Storage existe",
            answer: "CLI",
            explanation: "'gcloud storage ls | grep mi-bucket' es más rápido que navegar a Cloud Storage en la consola y buscar visualmente.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Por qué la CLI cloud es considerada esencial para el trabajo profesional?",
        options: [
          {
            label: "Porque la consola web no permite crear recursos",
            correct: false,
            explanation: "La consola sí permite crear recursos. La CLI no es esencial porque la consola no pueda, sino porque la CLI es reproducible y automatizable.",
          },
          {
            label: "Porque permite operaciones reproducibles, automatizables y versionables en Git",
            correct: true,
            explanation: "Correcto. Un script CLI puede repetirse, integrarse en CI/CD y versionarse. Esto es la base de DevOps e infraestructura como código.",
          },
          {
            label: "Porque es más fácil de aprender que la consola",
            correct: false,
            explanation: "La CLI tiene una curva de aprendizaje mayor que la consola visual. Su ventaja no es la facilidad, sino la potencia y repetibilidad.",
          },
          {
            label: "Porque solo funciona en Linux y eso la hace más profesional",
            correct: false,
            explanation: "Las CLIs cloud funcionan en Windows, macOS y Linux. No están limitadas a un sistema operativo.",
          },
        ],
      },
    ],
  },
  {
    slug: "terminal-cloud",
    title: "Entornos de terminal en la nube",
    readingTime: "8 min",
    objectives: [
      "Entender qué es un entorno de terminal cloud y cómo se diferencia de una terminal local",
      "Identificar las ventajas de practicar desde el navegador: autenticación, herramientas preinstaladas y portabilidad",
      "Evaluar cuándo conviene usar una terminal cloud vs. un entorno local",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si puedes usar una terminal desde el navegador, ¿por qué seguirías instalando herramientas localmente?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Un entorno de terminal en la nube es un espacio de trabajo accesible desde el navegador que permite ejecutar comandos, administrar recursos y editar código sin instalar herramientas localmente. Reduce la fricción inicial y permite que todos los estudiantes comiencen desde el mismo punto.",
      },
      {
        type: "text",
        title: "Menos configuración, más práctica",
        content:
          "A diferencia de una terminal local, un entorno cloud viene con herramientas preinstaladas (CLI del proveedor, Python, Git, editores), autenticación integrada y acceso directo a los servicios. Esto significa que puedes empezar a practicar en minutos, sin perder tiempo configurando tu computadora.",
      },
      {
        type: "text",
        content:
          "Estos entornos no sustituyen a la terminal local — la complementan. Son ideales para cursos introductorios porque igualan el punto de partida técnico del grupo: no importa si usas Windows, macOS o Linux, ni qué versión tengas instalada. Todos trabajan en el mismo entorno, con las mismas herramientas, desde el navegador.",
      },
      {
        type: "cloudTerminal",
      },
      {
        type: "tabs",
        title: "Terminal cloud en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Un entorno de terminal cloud ofrece: (1) Autenticación automática — no configuras credenciales; (2) Herramientas preinstaladas — CLI, lenguajes, utilidades listas; (3) Almacenamiento persistente — tus scripts sobreviven entre sesiones; (4) Portabilidad total — accesible desde cualquier navegador. Es como tener un laboratorio de cómputo portátil que vive en la nube.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Cloud Shell de Google es una terminal basada en navegador accesible desde la Cloud Console. Incluye gcloud CLI, Python, Node.js, Git, kubectl, Terraform y 5 GB de almacenamiento persistente en $HOME. Las credenciales se heredan de tu sesión. Se abre con un clic desde el ícono de terminal en la barra superior. También incluye un editor de código integrado (Cloud Shell Editor basado en VS Code).",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "AWS CloudShell es el equivalente: terminal en navegador desde la Management Console. Incluye AWS CLI v2, Python, Node.js, Git y 1 GB de almacenamiento persistente por región. Las credenciales se heredan de la sesión IAM. Ambos cumplen la misma función: terminal lista para usar sin instalar nada.",
          },
        ],
      },
      {
        type: "table",
        title: "Terminal local vs. Terminal cloud",
        headers: ["Aspecto", "Terminal local", "Terminal cloud"],
        rows: [
          ["Instalación", "Manual: descargar e instalar CLI, lenguajes, etc.", "Todo preinstalado y listo para usar"],
          ["Autenticación", "Configurar credenciales y perfiles manualmente", "Automática desde la sesión del navegador"],
          ["Portabilidad", "Solo funciona en tu computadora", "Accesible desde cualquier navegador"],
          ["Rendimiento", "Recursos completos de tu máquina", "Recursos limitados del entorno cloud"],
          ["Personalización", "Control total del sistema y herramientas", "Limitado al directorio home"],
          ["Trabajo offline", "Funciona sin internet (tareas locales)", "Requiere conexión permanente"],
        ],
      },
      {
        type: "scenario",
        title: "¿Terminal local o cloud?",
        scenarios: [
          {
            situation: "Un grupo de 30 estudiantes debe completar una práctica de laboratorio. Algunos usan Windows, otros Mac, y unos pocos Linux.",
            question: "¿Qué tipo de terminal conviene para igualar el entorno?",
            hint: "Terminal cloud (Cloud Shell). Todos acceden al mismo entorno desde el navegador, sin importar su sistema operativo. No hay que instalar nada.",
          },
          {
            situation: "Necesitas desarrollar una aplicación que requiere Docker, GPU y 16 GB de RAM.",
            question: "¿Terminal cloud o local?",
            hint: "Terminal local. Los entornos cloud como Cloud Shell tienen recursos limitados y no soportan GPU. Para desarrollo pesado, necesitas tu máquina.",
          },
          {
            situation: "Estás en una biblioteca pública y necesitas verificar urgentemente el estado de un servidor en producción.",
            question: "¿Puedes usar una terminal cloud?",
            hint: "Sí. Solo necesitas un navegador y tu login. Entras a la Cloud Console, abres Cloud Shell y verificas el estado sin instalar nada en esa computadora.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la principal ventaja de un entorno de terminal cloud para un curso universitario?",
        options: [
          {
            label: "Es más rápido que cualquier terminal local",
            correct: false,
            explanation: "Los entornos cloud tienen recursos limitados. Su ventaja no es la velocidad, sino la accesibilidad y uniformidad.",
          },
          {
            label: "Iguala el punto de partida técnico: todos trabajan en el mismo entorno sin configurar nada",
            correct: true,
            explanation: "Correcto. Elimina las diferencias de sistema operativo, versiones y configuración. Todos los estudiantes empiezan desde el mismo lugar.",
          },
          {
            label: "Reemplaza completamente la necesidad de instalar herramientas locales",
            correct: false,
            explanation: "Para desarrollo complejo, Docker o tareas que requieren más recursos, la terminal local sigue siendo necesaria. Son complementarios.",
          },
          {
            label: "Permite trabajar sin conexión a internet",
            correct: false,
            explanation: "Al contrario: la terminal cloud requiere conexión permanente. Esa es precisamente una de sus limitaciones frente a la local.",
          },
        ],
      },
    ],
  },
  {
    slug: "sdk-automatizacion",
    title: "SDK y herramientas de automatización",
    readingTime: "9 min",
    objectives: [
      "Entender qué es un SDK y cómo se diferencia de la CLI y la API directa",
      "Comprender la automatización como evolución natural del trabajo cloud",
      "Evaluar el nivel de madurez operativa adecuado según la tarea y su frecuencia",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si una tarea la puedes repetir muchas veces, ¿por qué seguir haciéndola manualmente?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Los SDK y las herramientas de automatización convierten tareas cloud en procesos repetibles, integrables y programables. Un SDK (Software Development Kit) es un conjunto de bibliotecas que permite operar servicios cloud desde código — no desde la consola ni desde la terminal, sino desde tus programas.",
      },
      {
        type: "text",
        title: "De la operación manual a la programable",
        content:
          "Este tema marca un punto de inflexión: pasamos de operar manualmente (consola, CLI) a operar programáticamente (SDK, scripts, automatización). Cuando un estudiante entiende que una acción puede hacerse primero a mano, luego por comando y finalmente por script automatizado, comienza a pensar en escalabilidad operativa.",
      },
      {
        type: "text",
        content:
          "La automatización no es un lujo — es una necesidad cuando el volumen crece. Crear un recurso a mano está bien para aprender; crearlo por script está bien para un laboratorio; automatizarlo con infraestructura como código (IaC) está bien para producción. Cada nivel tiene su lugar, y entender cuándo usar cada uno es una habilidad profesional clave.",
      },
      {
        type: "automationTimeline",
      },
      {
        type: "tabs",
        title: "SDK y automatización en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "La progresión operativa es: (1) Consola — manual, visual, exploratoria; (2) CLI — comandos individuales, rápidos y precisos; (3) Scripts con SDK — secuencias de acciones en Python, JavaScript o Java, reutilizables; (4) Automatización/IaC — plantillas declarativas que definen toda la infraestructura como código, versionable y auditables. Cada nivel reduce el esfuerzo por repetición y el riesgo de error.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud ofrece Client Libraries para múltiples lenguajes: google-cloud-storage (Python), @google-cloud/storage (Node.js), Cloud Client Libraries for Java, Go, etc. Para automatización: Deployment Manager (plantillas YAML), Terraform (compatible oficialmente), y Config Connector para Kubernetes. El patrón es el mismo: de Console → gcloud CLI → Client Libraries → IaC.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "AWS ofrece SDKs equivalentes: boto3 (Python), aws-sdk (JavaScript/TypeScript), AWS SDK for Java, etc. Para automatización: CloudFormation (plantillas YAML/JSON), CDK (IaC en lenguajes reales), y compatibilidad con Terraform. El patrón es idéntico al de GCP.",
          },
        ],
      },
      {
        type: "table",
        title: "API vs CLI vs SDK — ¿Cuál es cuál?",
        headers: ["Herramienta", "Qué es", "Cuándo usarla", "Ejemplo GCP", "Ejemplo AWS"],
        rows: [
          ["API", "Endpoints HTTP que reciben peticiones y devuelven respuestas", "Integración directa desde cualquier lenguaje o herramienta", "REST API de Cloud Storage", "REST API de S3"],
          ["CLI", "Programa de terminal que traduce comandos a llamadas API", "Operación rápida, scripting básico, CI/CD", "gcloud storage ls, gcloud compute instances list", "aws s3 ls, aws ec2 describe-instances"],
          ["SDK", "Biblioteca de lenguaje que envuelve las APIs en métodos nativos", "Desarrollo de aplicaciones, lógica compleja, automatización", "storage.Client().list_buckets()", "boto3.client('s3').list_buckets()"],
          ["IaC", "Plantillas declarativas que definen infraestructura completa", "Ambientes reproducibles, producción, auditoría", "Deployment Manager / Terraform", "CloudFormation / Terraform"],
        ],
      },
      {
        type: "matching",
        title: "Relaciona nivel con situación",
        description: "Conecta cada escenario con el nivel de madurez operativa más adecuado.",
        pairs: [
          {
            concept: "Explorar un servicio nuevo por primera vez",
            items: ["Consola web"],
          },
          {
            concept: "Crear un recurso rápidamente y verificar",
            items: ["CLI"],
          },
          {
            concept: "Una app que sube archivos a Cloud Storage cuando los usuarios se registran",
            items: ["SDK (Client Libraries / boto3)"],
          },
          {
            concept: "Replicar el mismo entorno en dev, staging y producción",
            items: ["IaC (Terraform / Deployment Manager)"],
          },
        ],
      },
      {
        type: "scenario",
        title: "¿Cómo lo resolverías?",
        scenarios: [
          {
            situation: "Un profesor necesita preparar 30 entornos idénticos para un laboratorio, cada uno con un bucket de Cloud Storage, una VM de Compute Engine y una base de datos Cloud SQL.",
            question: "¿Qué nivel de automatización sería más eficiente?",
            hint: "IaC con Terraform o Deployment Manager. Define el stack una vez y despliégalo 30 veces con parámetros distintos (alumno-1, alumno-2...). Hacerlo manual o por CLI individual sería tedioso y propenso a errores.",
          },
          {
            situation: "Tu aplicación necesita enviar un email cada vez que se sube un archivo a Cloud Storage.",
            question: "¿Usarías la consola, la CLI o un SDK?",
            hint: "SDK / Client Libraries. La aplicación necesita integrarse programáticamente con Cloud Storage y un servicio de notificaciones (Pub/Sub + Cloud Functions). Esto requiere código, no clics ni comandos sueltos.",
          },
          {
            situation: "Acabas de activar tu cuenta de Google Cloud y quieres ver qué servicios existen.",
            question: "¿Qué nivel de operación es más adecuado?",
            hint: "Cloud Console. Para explorar y descubrir por primera vez, la interfaz visual es la mejor opción. No necesitas automatizar lo que aún no entiendes.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la diferencia principal entre usar la CLI y usar un SDK?",
        options: [
          {
            label: "La CLI es más moderna que los SDKs",
            correct: false,
            explanation: "Ambas herramientas son contemporáneas y se actualizan regularmente. No hay una más moderna que la otra.",
          },
          {
            label: "La CLI ejecuta comandos desde terminal; el SDK ejecuta métodos desde código de aplicación",
            correct: true,
            explanation: "Correcto. La CLI es para operación humana en terminal. El SDK es para integración programática dentro de aplicaciones, scripts complejos y automatización.",
          },
          {
            label: "Los SDKs solo funcionan con Python",
            correct: false,
            explanation: "Google Cloud tiene Client Libraries para Python, Node.js, Java, Go, C#, Ruby y más. AWS tiene boto3 (Python), aws-sdk (JS), etc. No están limitados a un lenguaje.",
          },
          {
            label: "La CLI puede hacer cosas que el SDK no puede",
            correct: false,
            explanation: "Tanto la CLI como los SDKs llaman a las mismas APIs subyacentes. En general, todo lo que puedes hacer con la CLI también puedes hacerlo con el SDK, y viceversa.",
          },
        ],
      },
    ],
  },
  {
    slug: "apis-exploracion",
    title: "APIs y exploración de servicios",
    readingTime: "9 min",
    objectives: [
      "Entender qué es una API cloud y cómo expone las operaciones de un servicio",
      "Explorar métodos, endpoints y respuestas de APIs de forma estructurada",
      "Comprender que consola, CLI y SDK convergen en las mismas APIs subyacentes",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si una consola ya te deja usar un servicio, ¿para qué querrías explorar su API?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Las APIs son la base programable de los servicios cloud. Son interfaces que permiten que aplicaciones, scripts y servicios se comuniquen de forma estructurada: envías una solicitud (request) con un verbo HTTP y un endpoint, y recibes una respuesta (response) con datos en formato JSON o XML.",
      },
      {
        type: "text",
        title: "De usuario pasivo a operador activo",
        content:
          "Detrás de cada clic en la consola, detrás de cada comando en la CLI, hay una llamada a una API. Entender las APIs no requiere ser programador experto — significa comprender la conversación entre tu solicitud y el servicio: qué le pides (endpoint + verbo), qué le mandas (parámetros) y qué te responde (datos estructurados).",
      },
      {
        type: "text",
        content:
          "Explorar una API te permite descubrir qué puede hacer un servicio, probar métodos sin escribir una aplicación completa y entender la lógica que la consola oculta detrás de formularios. Herramientas como exploradores de APIs hacen esto accesible incluso para principiantes.",
      },
      {
        type: "apiExplorer",
      },
      {
        type: "tabs",
        title: "APIs cloud en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Una API cloud expone operaciones como: (1) Listar recursos — GET /service/resources; (2) Crear un recurso — POST /service/resources con un body JSON; (3) Obtener detalles — GET /service/resources/{id}; (4) Eliminar — DELETE /service/resources/{id}. Los verbos HTTP (GET, POST, PUT, DELETE) corresponden a operaciones CRUD. La autenticación se maneja con tokens o credenciales en los headers.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud expone APIs REST para cada servicio (storage.googleapis.com, compute.googleapis.com, etc.). La autenticación usa tokens OAuth 2.0 o cuentas de servicio con claves JSON. Las Client Libraries (Python, Node.js, Java, Go) abstraen esta complejidad. Además, APIs Explorer (developers.google.com/apis-explorer) permite probar endpoints directamente desde el navegador.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "AWS expone APIs REST para cada servicio. Algunas usan estilo Query (EC2, IAM) con ?Action=NombreOperacion, y otras usan REST puro (S3, API Gateway). La autenticación usa Signature V4 (firmas criptográficas en headers). Los SDKs (boto3, aws-sdk) abstraen esta complejidad automáticamente.",
          },
        ],
      },
      {
        type: "table",
        title: "Anatomía de una solicitud API",
        headers: ["Componente", "Qué es", "Ejemplo"],
        rows: [
          ["Verbo HTTP", "La acción que quieres realizar", "GET (leer), POST (crear), DELETE (eliminar)"],
          ["Endpoint", "La URL del recurso o servicio", "storage.googleapis.com/storage/v1/b (GCP) o s3.amazonaws.com (AWS)"],
          ["Headers", "Metadatos: autenticación, formato, etc.", "Authorization: Bearer token123"],
          ["Body", "Datos enviados (para POST/PUT)", "{ \"name\": \"mi-bucket\", \"location\": \"us-east\" }"],
          ["Response", "Datos devueltos por el servicio", "JSON con la lista de recursos o el recurso creado"],
          ["Status Code", "Código numérico de resultado", "200 (ok), 201 (creado), 403 (sin permiso), 404 (no existe)"],
        ],
      },
      {
        type: "matching",
        title: "Relaciona verbo HTTP con operación",
        description: "Conecta cada verbo HTTP con la operación cloud que representa.",
        pairs: [
          {
            concept: "Consultar la lista de recursos existentes",
            items: ["GET"],
          },
          {
            concept: "Crear un nuevo recurso",
            items: ["POST"],
          },
          {
            concept: "Actualizar la configuración de un recurso",
            items: ["PUT"],
          },
          {
            concept: "Eliminar un recurso del proyecto",
            items: ["DELETE"],
          },
        ],
      },
      {
        type: "scenario",
        title: "¿API, CLI o consola?",
        scenarios: [
          {
            situation: "Tu aplicación de reportes necesita consultar automáticamente cuántas instancias están corriendo cada 5 minutos y guardar el dato en una base de datos.",
            question: "¿Qué forma de acceso es la más adecuada?",
            hint: "API / SDK. La aplicación necesita hacer llamadas programáticas automáticas, no depender de una persona abriendo la consola o ejecutando CLI.",
          },
          {
            situation: "Quieres entender qué métodos ofrece el servicio de almacenamiento y probar uno sin escribir código.",
            question: "¿Cómo lo explorarías?",
            hint: "Un explorador de APIs (como APIs Explorer de Google Cloud o herramientas tipo Postman/Insomnia). Te permite ver métodos, enviar solicitudes y ver respuestas sin programar.",
          },
          {
            situation: "Recibes un error 403 (Forbidden) al intentar listar buckets por API.",
            question: "¿Qué capa del sistema probablemente está mal configurada?",
            hint: "Identidad y permisos (IAM). El código 403 indica que tu usuario o cuenta de servicio no tiene los permisos necesarios (storage.buckets.list en GCP, s3:ListAllMyBuckets en AWS).",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Qué ocurre internamente cuando creas un bucket desde la consola web?",
        options: [
          {
            label: "La consola accede directamente al disco duro del centro de datos",
            correct: false,
            explanation: "La consola no accede al hardware directamente. Es una interfaz gráfica que traduce tus acciones en llamadas API.",
          },
          {
            label: "La consola envía una solicitud HTTP a la API del servicio de almacenamiento, igual que lo haría un SDK",
            correct: true,
            explanation: "Correcto. La consola es un cliente web que construye y envía peticiones API en tu nombre. El mismo endpoint que usa la consola está disponible para CLI, SDK y cualquier cliente HTTP.",
          },
          {
            label: "La consola ejecuta un comando CLI en segundo plano",
            correct: false,
            explanation: "La consola no usa la CLI internamente. Tanto la consola como la CLI llaman a las APIs directamente, son clientes independientes del mismo servicio.",
          },
          {
            label: "La consola solo funciona para ver recursos, no para crearlos",
            correct: false,
            explanation: "La consola permite todas las operaciones CRUD: crear, ver, modificar y eliminar recursos.",
          },
        ],
      },
    ],
  },
];
