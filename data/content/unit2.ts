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
];
