import { TopicContent } from "./unit1";

export const unit6Content: TopicContent[] = [
  {
    slug: "bases-datos-relacionales",
    title: "Servicios de bases de datos relacionales",
        courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "12 min",
    objectives: [
      "Comprender qué caracteriza a una base de datos relacional y por qué organiza información en tablas relacionadas",
      "Relacionar este modelo con datos estructurados y consultas consistentes",
      "Entender que Google Cloud ofrece servicios relacionales administrados para simplificar operación y mantenimiento",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si tienes estudiantes, materias, inscripciones y calificaciones, ¿te conviene guardar todo como archivos sueltos o relacionar los datos entre sí?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una base de datos relacional organiza la información en tablas conectadas entre sí mediante relaciones definidas. En Google Cloud, servicios como Cloud SQL y otros motores relacionales administrados permiten trabajar con este modelo sin tener que operar toda la infraestructura por cuenta propia.",
      },
      {
        type: "text",
        title: "Tablas que se conectan por significado",
        content:
          "Una base relacional no solo almacena datos; también ayuda a mantener orden entre entidades como personas, cursos, transacciones o registros académicos. Los datos no se guardan aislados, sino vinculados por significado. Una tabla de estudiantes se conecta con una tabla de calificaciones a través de la matrícula — esa conexión es la relación.",
      },
      {
        type: "text",
        content:
          "El modelo relacional funciona especialmente bien cuando los datos están bien definidos y se requiere consultar, filtrar, unir o actualizar registros con precisión. No se trata solo de almacenar, sino de preservar orden lógico y consistencia. Si actualizas el nombre de un estudiante, todos los registros que lo referencian se mantienen consistentes automáticamente.",
      },
      {
        type: "text",
        content:
          "Google Cloud ofrece bases relacionales administradas como Cloud SQL (MySQL, PostgreSQL, SQL Server) y también servicios de mayor escala como AlloyDB y Spanner para escenarios más exigentes. Lo importante es entender la idea de relación: una tabla no vive sola, sino que se conecta con otras mediante claves y reglas de integridad.",
      },
      {
        type: "relationalMap",
      },
      {
        type: "tabs",
        title: "Bases de datos relacionales en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "Una base relacional organiza datos en tablas con esquema definido. Las tablas se conectan por claves (primarias y foráneas). Las consultas SQL permiten filtrar, unir y agregar datos de múltiples tablas. El modelo garantiza consistencia e integridad referencial.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud SQL",
            content:
              "Cloud SQL ofrece MySQL, PostgreSQL y SQL Server administrados. Incluye backups automáticos, réplicas de lectura, alta disponibilidad y escalado vertical. AlloyDB para cargas analíticas pesadas. Spanner para bases relacionales distribuidas globalmente con consistencia fuerte.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "Amazon RDS",
            content:
              "Amazon RDS ofrece MySQL, PostgreSQL, SQL Server, Oracle y MariaDB administrados. Multi-AZ para alta disponibilidad. Read replicas para escalar lecturas. Aurora para mayor rendimiento compatible con MySQL/PostgreSQL.",
          },
        ],
      },
      {
        type: "table",
        title: "Base relacional vs. almacenamiento de objetos",
        headers: ["Aspecto", "Base de datos relacional", "Almacenamiento de objetos"],
        rows: [
          ["Estructura", "Tablas con esquema definido (filas/columnas)", "Objetos planos con metadatos"],
          ["Mejor para", "Datos estructurados con relaciones entre entidades", "Archivos binarios, multimedia, respaldos"],
          ["Consulta", "SQL con JOINs, filtros, agregaciones", "Por nombre/URL, sin consultas complejas"],
          ["Consistencia", "ACID — transacciones garantizadas", "Eventual o por objeto individual"],
          ["Edición", "UPDATE parcial de campos específicos", "Reemplazo completo del objeto"],
          ["Ejemplo", "Tabla de estudiantes con matrícula y promedio", "Foto de una práctica de laboratorio"],
        ],
      },
      {
        type: "starService",
        serviceName: "Cloud SQL",
        icon: "/assets/Cloud SQL.svg",
        description: "Cloud SQL es el servicio de bases de datos relacionales administradas de Google Cloud. Soporta MySQL, PostgreSQL y SQL Server sin necesidad de instalar, configurar ni mantener el motor de base de datos. Google se encarga de backups, parches, réplicas y alta disponibilidad, mientras tú te enfocas en tus datos y consultas.",
        features: [
          "Motores soportados: MySQL 8.0, PostgreSQL 15, SQL Server 2022",
          "Backups automáticos diarios con retención configurable y restauración point-in-time",
          "Alta disponibilidad (HA): failover automático con réplica en otra zona",
          "Réplicas de lectura para escalar consultas SELECT sin afectar la instancia principal",
          "Escalado vertical: cambia CPU y RAM sin migrar datos",
          "Conexión segura con Cloud SQL Auth Proxy (sin exponer IP pública)",
          "Integración directa con App Engine, Cloud Run, GKE y Cloud Functions",
          "Cifrado en reposo y en tránsito por defecto",
        ],
        commands: [
          { command: "gcloud sql instances create my-db --database-version=MYSQL_8_0 --tier=db-f1-micro --region=us-central1", description: "Crear una instancia MySQL 8.0 en us-central1" },
          { command: "gcloud sql databases create myapp --instance=my-db", description: "Crear una base de datos dentro de la instancia" },
          { command: "gcloud sql connect my-db --user=root", description: "Conectarse a la instancia por línea de comandos SQL" },
          { command: "gcloud sql backups create --instance=my-db", description: "Crear un backup manual de la instancia" },
          { command: "gcloud sql instances patch my-db --tier=db-n1-standard-2", description: "Escalar verticalmente cambiando el tier de la instancia" },
          { command: "gcloud sql instances list", description: "Listar todas las instancias de Cloud SQL del proyecto" },
        ],
      },
      {
        type: "scenario",
        title: "¿Relacional o no?",
        scenarios: [
          {
            situation: "Una universidad necesita registrar qué estudiantes están inscritos en qué materias, con sus calificaciones por parcial.",
            question: "¿Es un caso para base relacional?",
            hint: "Entidades claras (estudiantes, materias, calificaciones) con relaciones entre sí → caso ideal para modelo relacional.",
          },
          {
            situation: "Un sistema almacena miles de imágenes de evidencia sin necesidad de consultar por campos internos.",
            question: "¿Conviene una base relacional aquí?",
            hint: "Sin esquema tabular ni consultas SQL → almacenamiento de objetos es más apropiado.",
          },
          {
            situation: "Una aplicación de e-commerce necesita registrar pedidos, productos, clientes y pagos con integridad transaccional.",
            question: "¿Qué modelo de almacenamiento garantiza consistencia?",
            hint: "Múltiples entidades relacionadas + transacciones ACID → base de datos relacional administrada.",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave de las bases de datos relacionales",
        items: [
          "Las tablas se conectan entre sí mediante claves primarias y foráneas — esa conexión es la relación",
          "SQL permite consultar, filtrar, unir y agregar datos de múltiples tablas en una sola operación",
          "Las transacciones ACID garantizan que los datos se mantengan consistentes incluso ante fallos",
          "Servicios administrados (Cloud SQL, RDS) eliminan la necesidad de operar servidores de base de datos",
          "El modelo relacional es ideal cuando los datos tienen esquema claro y necesitan integridad referencial",
          "No todo dato necesita ser relacional — imágenes, videos y respaldos van mejor como objetos",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué caracteriza mejor a una base de datos relacional?",
        options: [
          {
            label: "Guarda información en tablas conectadas entre sí mediante relaciones definidas",
            correct: true,
            explanation: "Exacto — el modelo relacional organiza datos en tablas con esquema y las conecta por claves, permitiendo consultas cruzadas con SQL.",
          },
          {
            label: "Solo sirve para imágenes y videos",
            correct: false,
            explanation: "Imágenes y videos son datos no estructurados — van en almacenamiento de objetos, no en bases relacionales.",
          },
          {
            label: "No permite relaciones entre datos",
            correct: false,
            explanation: "Al contrario — las relaciones son la esencia del modelo. Las tablas se conectan por claves para mantener integridad.",
          },
          {
            label: "Requiere que todos los datos estén en un solo archivo",
            correct: false,
            explanation: "El modelo relacional distribuye datos en múltiples tablas especializadas — esa separación es una de sus ventajas.",
          },
        ],
      },
    ],
  },
  {
    slug: "sql-administrado",
    title: "Servicios SQL administrados",
        courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "11 min",
    objectives: [
      "Comprender qué significa tener una base de datos SQL administrada en la nube",
      "Entender que el proveedor se encarga de gran parte de la operación, mientras el usuario se enfoca en los datos y la aplicación",
      "Relacionar este modelo con datos estructurados, tablas y consultas relacionales",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si ya sabes usar SQL, ¿por qué querrías que un proveedor administre la infraestructura de la base de datos por ti?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Un servicio SQL administrado es una base de datos relacional ofrecida como servicio, donde el proveedor se encarga de tareas de operación como administración de infraestructura, disponibilidad y mantenimiento, mientras el usuario trabaja con tablas, consultas y datos. En Google Cloud, Cloud SQL representa este enfoque para motores relacionales administrados.",
      },
      {
        type: "text",
        title: "Mismo SQL, menos operación",
        content:
          "El estudiante sigue usando tablas, relaciones, consultas y transacciones, pero ya no tiene que encargarse de levantar servidores, aplicar parches o resolver buena parte del mantenimiento operativo. La clave está en separar dos cosas: el modelo de datos (que sigue siendo relacional) y la operación del servicio (que queda abstraída por el proveedor).",
      },
      {
        type: "text",
        content:
          "Cloud SQL se entiende como un puente entre el mundo tradicional de bases relacionales y el mundo cloud administrado. Soporta MySQL, PostgreSQL y SQL Server — los mismos motores que se usan localmente, pero operados por Google. Eso significa compatibilidad total con herramientas y librerías existentes.",
      },
      {
        type: "text",
        content:
          "Este tipo de servicio es ideal cuando se busca previsibilidad, compatibilidad y facilidad operativa. Si la aplicación encaja bien con SQL y no requiere distribución global compleja, un servicio SQL administrado suele ser la opción más natural y de menor fricción para equipos que ya conocen bases relacionales.",
      },
      {
        type: "managedSqlExplorer",
      },
      {
        type: "tabs",
        title: "SQL administrado en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "Un servicio SQL administrado ofrece la misma experiencia relacional (tablas, SQL, transacciones ACID) pero elimina la carga operativa de instalar, parchear, respaldar y escalar el motor. El usuario se enfoca en esquema, consultas y lógica de aplicación.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud SQL",
            content:
              "Cloud SQL soporta MySQL, PostgreSQL y SQL Server. Ofrece backups automáticos, réplicas de lectura, failover automático, escalado vertical y conexión segura via Cloud SQL Auth Proxy. Se integra con App Engine, Cloud Run y GKE directamente.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "Amazon RDS",
            content:
              "Amazon RDS soporta MySQL, PostgreSQL, SQL Server, Oracle y MariaDB. Multi-AZ para alta disponibilidad, read replicas, automated backups y Performance Insights para monitoreo. Aurora ofrece mayor rendimiento con compatibilidad MySQL/PostgreSQL.",
          },
        ],
      },
      {
        type: "table",
        title: "Administrado vs. auto-gestionado",
        headers: ["Aspecto", "SQL administrado (Cloud SQL/RDS)", "Auto-gestionado (en VM)"],
        rows: [
          ["Instalación", "El proveedor lo configura por ti", "Tú instalas el motor en un servidor"],
          ["Backups", "Automáticos, configurables", "Debes programarlos manualmente"],
          ["Parches", "El proveedor los aplica", "Tú monitoreas y aplicas actualizaciones"],
          ["Alta disponibilidad", "Failover automático incluido", "Debes configurar réplicas tú mismo"],
          ["Escalado", "Un clic o API call", "Migración manual a hardware mayor"],
          ["Costo de operación", "Incluido en el servicio", "Requiere equipo de DBA dedicado"],
        ],
      },
      {
        type: "scenario",
        title: "¿Administrado o auto-gestionado?",
        scenarios: [
          {
            situation: "Un equipo pequeño de 3 desarrolladores necesita una base PostgreSQL para su API. No tienen DBA dedicado.",
            question: "¿Les conviene un servicio administrado?",
            hint: "Sin DBA + equipo pequeño → Cloud SQL/RDS elimina la carga operativa y les permite enfocarse en la app.",
          },
          {
            situation: "Una empresa necesita un motor de base de datos modificado con extensiones personalizadas no estándar que no soporta Cloud SQL.",
            question: "¿Pueden usar un servicio administrado?",
            hint: "Extensiones no soportadas → probablemente necesitan auto-gestionar la instalación en una VM para tener control total.",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave de SQL administrado",
        items: [
          "SQL administrado = misma experiencia relacional sin la carga de operar la infraestructura",
          "El proveedor maneja servidores, backups, parches, failover y escalado",
          "El usuario se enfoca en diseño de tablas, consultas SQL y lógica de aplicación",
          "Compatible con motores estándar (MySQL, PostgreSQL, SQL Server) — sin lock-in del modelo",
          "Ideal para equipos sin DBA dedicado o aplicaciones que no necesitan control extremo",
          "No cambia el modelo mental del SQL — solo simplifica la operación",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué caracteriza mejor a un servicio SQL administrado?",
        options: [
          {
            label: "Solo almacena imágenes y videos",
            correct: false,
            explanation: "Eso describe almacenamiento de objetos. Un servicio SQL administrado trabaja con tablas y datos estructurados.",
          },
          {
            label: "El proveedor administra infraestructura y el usuario trabaja con SQL y tablas",
            correct: true,
            explanation: "Exacto — la operación queda en manos del proveedor mientras el usuario se enfoca en datos, consultas y esquema.",
          },
          {
            label: "No permite consultas SQL",
            correct: false,
            explanation: "Al contrario — SQL es exactamente lo que se usa. El servicio administra la infraestructura, no reemplaza SQL.",
          },
          {
            label: "No es relacional",
            correct: false,
            explanation: "Sí es relacional — usa tablas, relaciones y transacciones ACID. Solo cambia quién opera la infraestructura.",
          },
        ],
      },
    ],
  },
  {
    slug: "bases-datos-distribuidas",
    title: "Bases de datos distribuidas y globales",
        courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "12 min",
    objectives: [
      "Comprender qué significa que una base de datos sea distribuida y global",
      "Entender por qué algunas aplicaciones necesitan consistencia, alta disponibilidad y escala en varias regiones",
      "Relacionar Cloud Spanner con este tipo de necesidad en Google Cloud",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si tu aplicación debe responder desde distintos lugares del mundo sin perder consistencia, ¿te basta con una base relacional tradicional?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una base de datos distribuida y global es aquella que almacena y sincroniza datos en varias ubicaciones para ofrecer disponibilidad, escalabilidad y consistencia a gran escala. En Google Cloud, Cloud Spanner es el ejemplo más claro de este enfoque: una base relacional, distribuida globalmente y con consistencia transaccional fuerte.",
      },
      {
        type: "globalDbExplainer",
      },
      {
        type: "tabs",
        title: "Bases distribuidas y globales",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "Una base distribuida replica datos en múltiples ubicaciones geográficas. Una base global garantiza que esas réplicas mantienen consistencia transaccional — todos ven los mismos datos sin importar desde dónde lean. Esto permite alta disponibilidad, baja latencia regional y tolerancia a fallos de zona/región.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud Spanner",
            content:
              "Cloud Spanner: relacional + distribuida + consistente globalmente. Usa TrueTime para sincronización. Escala horizontalmente agregando nodos. SQL completo con transacciones ACID multi-región. SLA de 99.999%. Ideal para finanzas, gaming y e-commerce global.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "Aurora Global / DSQL",
            content:
              "Aurora Global Database: réplicas cross-region con latencia < 1 segundo. Aurora DSQL: distribución global SQL (en desarrollo). DynamoDB Global Tables: replicación multi-región para NoSQL. Cada opción tiene trade-offs entre consistencia, latencia y modelo de datos.",
          },
        ],
      },
      {
        type: "table",
        title: "SQL administrado regional vs. base distribuida global",
        headers: ["Aspecto", "SQL administrado (Cloud SQL/RDS)", "Distribuida global (Spanner/Aurora Global)"],
        rows: [
          ["Ubicación", "Una región principal", "Múltiples regiones sincronizadas"],
          ["Escalado", "Vertical (máquina más grande)", "Horizontal (más nodos en más regiones)"],
          ["Consistencia", "Fuerte dentro de la región", "Fuerte entre todas las regiones"],
          ["Latencia", "Baja en su región, alta desde otras", "Baja desde cualquier región (lectura local)"],
          ["Costo", "Menor, predecible", "Mayor, proporcional a la escala global"],
          ["Caso ideal", "Apps regionales, equipos pequeños", "Apps críticas globales, millones de usuarios"],
        ],
      },
      {
        type: "starService",
        serviceName: "Cloud Spanner",
        icon: "/assets/Cloud Spanner.svg",
        description: "Cloud Spanner es la base de datos relacional distribuida globalmente de Google Cloud. Combina la estructura de SQL con escalamiento horizontal ilimitado y consistencia transaccional fuerte en todas las regiones. Usa TrueTime (relojes atómicos + GPS) para sincronizar transacciones a nivel global. Es el servicio que usan internamente Google Ads, Google Play y Google Finance.",
        features: [
          "SQL completo con transacciones ACID distribuidas entre regiones",
          "Consistencia fuerte global: todas las lecturas ven los datos más recientes, sin importar la región",
          "Escalamiento horizontal: agrega nodos para más capacidad sin downtime",
          "SLA de 99.999% (5 nueves) — menos de 5 minutos de downtime al año",
          "TrueTime: sincronización con relojes atómicos para ordenar transacciones globalmente",
          "Backups automáticos y restauración point-in-time",
          "Esquema relacional con claves primarias compuestas e interleaving de tablas",
          "Compatible con drivers PostgreSQL para migración más sencilla",
        ],
        commands: [
          { command: "gcloud spanner instances create my-instance --config=regional-us-central1 --nodes=1", description: "Crear una instancia Spanner regional con 1 nodo" },
          { command: "gcloud spanner databases create mydb --instance=my-instance", description: "Crear una base de datos dentro de la instancia" },
          { command: "gcloud spanner databases execute-sql mydb --instance=my-instance --sql='SELECT * FROM users'", description: "Ejecutar una consulta SQL directamente" },
          { command: "gcloud spanner instances list", description: "Listar todas las instancias Spanner del proyecto" },
          { command: "gcloud spanner backups create my-backup --instance=my-instance --database=mydb --retention-period=7d", description: "Crear un backup con retención de 7 días" },
          { command: "gcloud spanner databases ddl update mydb --instance=my-instance --ddl='CREATE TABLE orders (id INT64) PRIMARY KEY (id)'", description: "Modificar el esquema de la base de datos" },
        ],
      },
      {
        type: "starService",
        serviceName: "AlloyDB",
        icon: "/assets/Cloud SQL.svg",
        description: "AlloyDB es el servicio de base de datos relacional de alto rendimiento de Google Cloud, totalmente compatible con PostgreSQL. Combina la familiaridad de PostgreSQL con una arquitectura diseñada por Google que ofrece hasta 4x más rendimiento en cargas transaccionales y hasta 100x más rápido en consultas analíticas que PostgreSQL estándar, sin cambiar tu código.",
        features: [
          "100% compatible con PostgreSQL — migra sin cambiar código ni queries",
          "Hasta 4x más rápido en transacciones (OLTP) vs PostgreSQL estándar",
          "Hasta 100x más rápido en consultas analíticas (OLAP) con columnar engine",
          "Almacenamiento inteligente: separa cómputo y storage para escalar independientemente",
          "Alta disponibilidad con failover automático en menos de 60 segundos",
          "Réplicas de lectura cross-region para baja latencia global",
          "Machine learning integrado: ejecuta modelos directamente desde SQL",
          "Backups automáticos continuos con restauración point-in-time",
        ],
        commands: [
          { command: "gcloud alloydb clusters create my-cluster --region=us-central1 --password=<PASSWORD>", description: "Crear un clúster AlloyDB en us-central1" },
          { command: "gcloud alloydb instances create my-primary --cluster=my-cluster --region=us-central1 --instance-type=PRIMARY", description: "Crear la instancia primaria del clúster" },
          { command: "gcloud alloydb instances list --cluster=my-cluster --region=us-central1", description: "Listar instancias del clúster" },
          { command: "gcloud alloydb clusters list --region=us-central1", description: "Listar todos los clústeres AlloyDB en la región" },
          { command: "gcloud alloydb instances create my-reader --cluster=my-cluster --region=us-central1 --instance-type=READ_POOL --read-pool-node-count=2", description: "Crear un pool de lectura con 2 nodos" },
          { command: "gcloud alloydb backups create my-backup --cluster=my-cluster --region=us-central1", description: "Crear un backup manual del clúster" },
        ],
      },
      {
        type: "scenario",
        title: "¿Necesitas una base global?",
        scenarios: [
          {
            situation: "Un sistema escolar para una universidad en la Ciudad de México. Todos los usuarios están en la misma zona horaria.",
            question: "¿Necesita una base de datos distribuida global?",
            hint: "Usuarios locales, carga moderada → Cloud SQL regional es más que suficiente. Una base global sería sobre-ingeniería.",
          },
          {
            situation: "Una tienda en línea que vende en todo el país con miles de transacciones diarias.",
            question: "¿Conviene una base global o basta con SQL administrado?",
            hint: "Un solo país, carga alta pero no global → SQL administrado con réplicas de lectura probablemente basta.",
          },
          {
            situation: "Una aplicación de pagos internacionales que procesa transacciones desde 40 países y no puede tolerar inconsistencia.",
            question: "¿Es este un caso para una base distribuida global?",
            hint: "Múltiples continentes + transacciones financieras + consistencia crítica → caso ideal para Cloud Spanner.",
          },
        ],
      },
      {
        type: "list",
        title: "Cuándo considerar una base distribuida global",
        items: [
          "Usuarios en múltiples continentes que necesitan baja latencia desde su región",
          "Transacciones críticas que requieren consistencia fuerte a nivel global (no eventual)",
          "Sistemas que deben tolerar la caída completa de una región sin perder datos ni servicio",
          "Aplicaciones con crecimiento horizontal que necesitan agregar capacidad sin migrar",
          "Escenarios donde una base regional ya no puede sostener la carga o la distribución geográfica",
          "No todo proyecto necesita esto — es una decisión de arquitectura, no una mejora por defecto",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué caracteriza mejor a una base de datos distribuida y global?",
        options: [
          {
            label: "Solo se usa en una computadora local",
            correct: false,
            explanation: "Lo opuesto — una base distribuida opera en múltiples ubicaciones geográficas simultáneamente.",
          },
          {
            label: "Mantiene datos sincronizados en varias ubicaciones para alta disponibilidad y consistencia",
            correct: true,
            explanation: "Exacto — la base replica y sincroniza datos entre regiones para que todos los usuarios vean información consistente sin importar su ubicación.",
          },
          {
            label: "No soporta SQL",
            correct: false,
            explanation: "Cloud Spanner sí soporta SQL completo. Combina el modelo relacional con distribución global.",
          },
          {
            label: "Solo sirve para archivos estáticos",
            correct: false,
            explanation: "Las bases distribuidas manejan datos transaccionales dinámicos, no archivos estáticos. Para archivos está el almacenamiento de objetos.",
          },
        ],
      },
    ],
  },
  {
    slug: "opciones-nosql",
    title: "Opciones NoSQL",
        courseLink: "https://www.skills.google/paths/36/course_templates/154",
    courseTitle: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    readingTime: "11 min",
    objectives: [
      "Entender qué significa NoSQL y por qué existe como alternativa al modelo relacional",
      "Distinguir NoSQL de una base de datos relacional según estructura, escalado y casos de uso",
      "Identificar cuándo conviene usar un modelo NoSQL y reconocer opciones en Google Cloud",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si tus datos no encajan bien en tablas rígidas, ¿tiene sentido seguir usando solo SQL?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "NoSQL significa 'no solo SQL' o base de datos no relacional. Está pensada para datos con estructura flexible, alto volumen o necesidades de escalado rápido. No parte necesariamente de tablas con relaciones fijas como en el modelo relacional. NoSQL no reemplaza a SQL en todos los casos — más bien resuelve problemas diferentes.",
      },
      {
        type: "text",
        title: "¿Cuándo aparece NoSQL?",
        content:
          "SQL funciona muy bien cuando los datos son estructurados y las relaciones están claras. NoSQL aparece cuando los datos cambian mucho de forma, no conviene usar un esquema rígido, se necesita escalar muy rápido, o el acceso a los datos ocurre a gran velocidad. La idea clave: SQL = estructura fuerte y relaciones claras. NoSQL = flexibilidad, escala y modelos distintos de datos.",
      },
      {
        type: "text",
        content:
          "NoSQL no significa desorden. Significa que la organización de los datos no depende de tablas relacionales clásicas. Puede servir para perfiles de usuario, catálogos, eventos, sesiones, contenido de apps y grandes volúmenes de lecturas y escrituras. Es útil cuando la app crece rápido, hay muchos accesos simultáneos, o no todo cabe naturalmente en filas y columnas.",
      },
      {
        type: "text",
        content:
          "En Google Cloud destacan tres opciones NoSQL principales: Firestore (base documental flexible para apps web y móviles), Bigtable (columna amplia para gran escala y baja latencia) y Memorystore (clave-valor para caché y sesiones). Cada una resuelve un patrón de acceso diferente. SQL y NoSQL no compiten siempre — muchas veces se complementan dentro del mismo sistema.",
      },
      {
        type: "noSqlExplorer",
      },
      {
        type: "tabs",
        title: "NoSQL en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "NoSQL agrupa varios modelos de bases de datos no relacionales: documental (JSON flexible), clave-valor (acceso ultra-rápido por ID), columna amplia (escrituras masivas a baja latencia). Cada modelo optimiza un patrón de acceso distinto. La elección depende de cómo se consultan y escalan los datos.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Firestore / Bigtable",
            content:
              "Firestore: documental, serverless, tiempo real, ideal para apps web/móviles. Bigtable: columna amplia, petabytes, baja latencia, ideal para IoT y analytics. Memorystore: Redis/Memcached administrado para caché y sesiones. Datastore: modelo documental legacy compatible con Firestore.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "DynamoDB",
            content:
              "DynamoDB: documental + clave-valor serverless, escalado automático. DocumentDB: compatible con MongoDB. ElastiCache: Redis/Memcached para caché. Keyspaces: compatible con Apache Cassandra para columna amplia. Neptune: base de grafos.",
          },
        ],
      },
      {
        type: "table",
        title: "SQL vs. NoSQL — comparación rápida",
        headers: ["Aspecto", "SQL (relacional)", "NoSQL (no relacional)"],
        rows: [
          ["Estructura", "Tablas con esquema rígido", "Flexible (documentos, claves, columnas)"],
          ["Relaciones", "Claves foráneas y JOINs", "Generalmente sin JOINs — datos desnormalizados"],
          ["Escalado", "Principalmente vertical", "Diseñado para escalado horizontal"],
          ["Consistencia", "ACID fuerte", "Variable (eventual o configurable)"],
          ["Mejor para", "Datos estructurados con relaciones claras", "Datos flexibles, masivos o de acceso rápido"],
          ["Ejemplo GCP", "Cloud SQL, Spanner", "Firestore, Bigtable, Memorystore"],
        ],
      },
      {
        type: "starService",
        serviceName: "Firestore",
        icon: "/assets/Cloud Storage.svg",
        description: "Firestore es la base de datos documental NoSQL serverless de Google Cloud. Almacena datos como documentos JSON organizados en colecciones, con sincronización en tiempo real, consultas offline y escalamiento automático. Es la opción ideal para aplicaciones web y móviles que necesitan datos flexibles y reactivos.",
        features: [
          "Modelo documental: datos como documentos JSON en colecciones jerárquicas",
          "Sincronización en tiempo real: los cambios se reflejan instantáneamente en todos los clientes",
          "Modo offline: la app sigue funcionando sin conexión y sincroniza al reconectarse",
          "Serverless: sin instancias ni servidores — escala automáticamente a cero o a millones",
          "Consultas compuestas con índices automáticos y soporte para filtros y ordenamiento",
          "Transacciones ACID a nivel de documento y entre documentos",
          "Integración nativa con Firebase, Cloud Functions y Cloud Run",
          "SLA de 99.999% en configuración multi-región",
        ],
        commands: [
          { command: "gcloud firestore databases create --location=us-central", description: "Crear una base de datos Firestore en us-central" },
          { command: "gcloud firestore indexes composite create --collection-group=users --field-config=field-path=age,order=ASCENDING", description: "Crear un índice compuesto para consultas" },
          { command: "gcloud firestore export gs://my-bucket/firestore-backup", description: "Exportar toda la base de datos a Cloud Storage" },
          { command: "gcloud firestore import gs://my-bucket/firestore-backup", description: "Importar datos desde un backup en Cloud Storage" },
          { command: "gcloud firestore indexes composite list", description: "Listar todos los índices compuestos configurados" },
          { command: "gcloud firestore databases list", description: "Listar las bases de datos Firestore del proyecto" },
        ],
      },
      {
        type: "starService",
        serviceName: "Cloud Bigtable",
        icon: "/assets/BigQuery.svg",
        description: "Cloud Bigtable es la base de datos NoSQL de columna amplia de Google Cloud, diseñada para cargas masivas con latencia de milisegundos. Es el mismo motor que impulsa internamente Google Search, Gmail y Google Maps. Ideal para IoT, series temporales, analytics en tiempo real y cualquier carga que necesite manejar millones de operaciones por segundo.",
        features: [
          "Latencia consistente de un solo dígito de milisegundos a cualquier escala",
          "Escalamiento lineal: cada nodo agrega ~10,000 QPS de lectura/escritura",
          "Almacena petabytes de datos sin degradar rendimiento",
          "Compatible con la API de Apache HBase — migración directa desde Hadoop",
          "Replicación automática entre clústeres para alta disponibilidad",
          "Integración directa con BigQuery, Dataflow, Dataproc y Apache Beam",
          "Compactación y garbage collection automáticos",
          "Ideal para: IoT, series temporales, ad-tech, fintech y analytics en tiempo real",
        ],
        commands: [
          { command: "cbt createtable my-table", description: "Crear una tabla en la instancia Bigtable configurada" },
          { command: "cbt createfamily my-table cf1", description: "Crear una column family 'cf1' en la tabla" },
          { command: "cbt set my-table row1 cf1:col1=value1", description: "Escribir un valor en una celda específica" },
          { command: "cbt read my-table", description: "Leer todas las filas de la tabla" },
          { command: "gcloud bigtable instances create my-instance --display-name=MyInstance --cluster-config=id=my-cluster,zone=us-central1-a,nodes=1", description: "Crear una instancia Bigtable con un clúster de 1 nodo" },
          { command: "gcloud bigtable instances list", description: "Listar todas las instancias Bigtable del proyecto" },
        ],
      },
      {
        type: "scenario",
        title: "¿SQL o NoSQL para este caso?",
        scenarios: [
          {
            situation: "Una red social necesita guardar perfiles de usuario donde cada uno puede tener campos diferentes (bio, enlaces, preferencias variables).",
            question: "¿Modelo relacional o NoSQL?",
            hint: "Campos variables por usuario, sin esquema fijo → NoSQL documental (Firestore/DynamoDB).",
          },
          {
            situation: "Un sistema bancario necesita registrar transacciones entre cuentas con integridad total y relaciones claras entre entidades.",
            question: "¿Qué modelo garantiza la consistencia necesaria?",
            hint: "Transacciones ACID + relaciones + integridad referencial → SQL relacional.",
          },
          {
            situation: "Un sistema IoT recibe 100,000 lecturas por segundo de sensores distribuidos y necesita almacenarlas con baja latencia.",
            question: "¿Conviene una tabla relacional para esto?",
            hint: "Escrituras masivas, baja latencia, sin relaciones complejas → NoSQL columna amplia (Bigtable).",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave sobre NoSQL",
        items: [
          "NoSQL = base no relacional, no 'sin orden' — organiza datos de formas distintas a tablas",
          "Tres modelos principales: documental (JSON), clave-valor (ID→dato) y columna amplia (filas dinámicas)",
          "Ideal cuando los datos son flexibles, masivos o necesitan escalado horizontal rápido",
          "No reemplaza siempre a SQL — ambos se complementan según el caso de uso",
          "En GCP: Firestore (docs), Bigtable (columnas), Memorystore (caché). En AWS: DynamoDB, DocumentDB, ElastiCache",
          "La decisión SQL vs NoSQL depende de: estructura del dato, patrón de acceso y necesidad de escala",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor a una base de datos NoSQL?",
        options: [
          {
            label: "Solo trabaja con tablas rígidas y relaciones fijas",
            correct: false,
            explanation: "Eso describe SQL relacional. NoSQL justamente no depende de tablas rígidas ni relaciones definidas.",
          },
          {
            label: "Es una base no relacional útil para datos flexibles o de gran escala",
            correct: true,
            explanation: "Exacto — NoSQL ofrece modelos flexibles (documentos, claves, columnas) optimizados para escala y patrones de acceso variados.",
          },
          {
            label: "Reemplaza siempre a SQL sin excepción",
            correct: false,
            explanation: "NoSQL no reemplaza a SQL — son complementarios. SQL sigue siendo mejor para datos con relaciones claras y consistencia ACID.",
          },
          {
            label: "Solo sirve para archivos PDF y videos",
            correct: false,
            explanation: "Para archivos binarios está el almacenamiento de objetos. NoSQL maneja datos estructurados de forma flexible, no archivos.",
          },
        ],
      },
    ],
  },
];
