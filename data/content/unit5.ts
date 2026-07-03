import { TopicContent } from "./unit1";

export const unit5Content: TopicContent[] = [
  {
    slug: "opciones-almacenamiento",
    title: "Opciones de almacenamiento en la nube",
    readingTime: "12 min",
    objectives: [
      "Comprender qué significa almacenar información en la nube y por qué no equivale solo a guardar archivos",
      "Identificar que existen distintas formas de almacenar según el tipo de dato, su uso y la manera en que se accede",
      "Reconocer que la nube permite flexibilidad, escalabilidad y acceso desde distintos contextos",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si tienes información distinta —documentos, imágenes, respaldos o datos de una aplicación—, ¿tiene sentido guardarlo todo de la misma forma?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Almacenamiento en la nube significa guardar información en infraestructura remota administrada por un proveedor, de manera que los datos puedan accederse, respaldarse y organizarse sin depender solo del dispositivo local. La idea central no es el producto, sino la capacidad de conservar y recuperar datos de forma flexible.",
      },
      {
        type: "text",
        title: "Más que subir archivos",
        content:
          "Antes, gran parte de la información vivía en discos duros o memorias físicas. En la nube, los datos se guardan en servicios remotos que permiten acceso desde distintos dispositivos y ubicaciones. Eso cambia el enfoque: ya no se trata solo de dónde está el archivo, sino de cómo se accede, comparte y protege.",
      },
      {
        type: "text",
        content:
          "El almacenamiento en la nube responde a preguntas como: ¿Quién accede al dato? ¿Con qué frecuencia? ¿Es un archivo, un objeto o un registro? ¿Necesita colaboración o recuperación? Cuando entiendes estas preguntas, los servicios dejan de ser listas aisladas y se convierten en respuestas a problemas concretos.",
      },
      {
        type: "text",
        content:
          "Google Cloud ofrece múltiples formas de almacenamiento dentro de su ecosistema. Algunos datos necesitan ser compartidos fácilmente, otros requieren respaldo, otros deben soportar altas cargas, y otros se usan para análisis o aplicaciones. Esa clasificación por necesidad es más importante que memorizar nombres de servicios.",
      },
      {
        type: "storageSelector",
      },
      {
        type: "tabs",
        title: "Almacenamiento en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "El almacenamiento cloud permite conservar datos en infraestructura remota con acceso flexible, respaldo automático y compartición controlada. No todos los datos se guardan igual: la necesidad (acceso frecuente, respaldo, colaboración, archivo) determina la estrategia.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud Storage",
            content:
              "Cloud Storage es el servicio principal de almacenamiento de objetos en GCP. Ofrece clases según frecuencia de acceso: Standard (frecuente), Nearline (mensual), Coldline (trimestral), Archive (anual). Se complementa con Persistent Disks para VMs y Filestore para NFS compartido.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "Amazon S3",
            content:
              "Amazon S3 es el servicio de almacenamiento de objetos más conocido de AWS. Ofrece clases como Standard, Intelligent-Tiering, Glacier y Glacier Deep Archive. Se complementa con EBS (discos para EC2) y EFS (sistema de archivos compartido).",
          },
        ],
      },
      {
        type: "table",
        title: "Necesidades de almacenamiento y estrategias",
        headers: ["Necesidad", "Qué busca resolver", "Estrategia cloud"],
        rows: [
          ["Archivos personales o de equipo", "Acceso sencillo y compartido", "Almacenamiento de objetos con permisos por usuario"],
          ["Respaldo", "Preservar información y recuperarla", "Clases económicas (Coldline/Glacier) con retención"],
          ["Datos de aplicación", "Soportar funcionamiento de sistemas", "Almacenamiento escalable con acceso programático"],
          ["Archivo histórico", "Conservar datos por largo tiempo", "Clase Archive con costo mínimo y acceso diferido"],
          ["Material compartido", "Distribuir recursos al grupo", "Objetos con acceso público o por dominio"],
        ],
      },
      {
        type: "scenario",
        title: "¿Dónde guardarías esto?",
        scenarios: [
          {
            situation: "Los apuntes del curso que todos los estudiantes deben poder descargar en cualquier momento desde cualquier dispositivo.",
            question: "¿Qué tipo de almacenamiento necesita este caso?",
            hint: "Necesita acceso frecuente, compartido y desde múltiples dispositivos → almacenamiento de objetos con permisos de lectura.",
          },
          {
            situation: "El respaldo completo de un proyecto final que no se consultará a menos que algo falle.",
            question: "¿Conviene el mismo tipo de almacenamiento que los apuntes activos?",
            hint: "Acceso infrecuente, solo para recuperación → clase económica (Coldline/Glacier) con costo bajo.",
          },
          {
            situation: "Imágenes y archivos de evidencia de prácticas de laboratorio que deben entregarse al profesor.",
            question: "¿Qué necesidades de almacenamiento tiene este caso?",
            hint: "Archivos pesados, acceso por URL, entrega puntual → almacenamiento estándar con enlaces compartidos.",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave del almacenamiento en la nube",
        items: [
          "Almacenar en la nube no es solo subir archivos — implica acceso, respaldo, compartición y recuperación",
          "El tipo de dato y su uso determinan qué estrategia de almacenamiento conviene",
          "Los proveedores ofrecen clases de almacenamiento según frecuencia de acceso y costo",
          "Los datos pueden accederse desde cualquier dispositivo con los permisos adecuados",
          "La nube permite escalar el almacenamiento sin comprar hardware adicional",
          "Un buen diseño de almacenamiento responde a: quién, con qué frecuencia, qué formato y para qué",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué ventaja describe mejor el almacenamiento en la nube?",
        options: [
          {
            label: "Solo funciona en un equipo local",
            correct: false,
            explanation: "Eso describe almacenamiento local, no cloud. La nube permite acceso desde múltiples dispositivos.",
          },
          {
            label: "Permite acceso flexible, respaldo y compartición desde distintos dispositivos",
            correct: true,
            explanation: "Exacto — la nube ofrece acceso remoto, respaldo automático y compartición controlada sin depender de un solo equipo.",
          },
          {
            label: "Elimina la necesidad de organizar archivos",
            correct: false,
            explanation: "La nube no elimina la organización — la facilita con herramientas, pero la responsabilidad de estructura sigue existiendo.",
          },
          {
            label: "Evita por completo el uso de internet",
            correct: false,
            explanation: "El almacenamiento cloud requiere internet para acceder a los datos remotos. Sin conexión, no hay acceso.",
          },
        ],
      },
    ],
  },
  {
    slug: "datos-estructurados-no-estructurados",
    title: "Datos estructurados y no estructurados",
    readingTime: "11 min",
    objectives: [
      "Distinguir entre datos estructurados y no estructurados a partir de su forma y modo de organización",
      "Entender por qué el tipo de dato influye en cómo se almacena, consulta y analiza",
      "Relacionar esta clasificación con decisiones de arquitectura y almacenamiento en Google Cloud",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "¿Toda la información tiene la misma forma o hay datos que nacen ordenados y otros que son más libres?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Los datos estructurados son aquellos que siguen una organización clara, normalmente en filas, columnas o esquemas bien definidos; los datos no estructurados, en cambio, no tienen una forma rígida y aparecen como documentos, imágenes, audio, video o texto libre. Esta diferencia no es solo académica: condiciona cómo se almacenan, consultan y procesan los datos.",
      },
      {
        type: "text",
        title: "La forma del dato importa",
        content:
          "Un dato estructurado tiene una organización que facilita consultas, filtros y análisis, porque su forma es predecible. Un dato no estructurado, en cambio, guarda contenido valioso pero no siempre en un formato que se pueda recorrer fácilmente con reglas tabulares. La diferencia no está en la importancia del dato, sino en su forma.",
      },
      {
        type: "text",
        content:
          "Una tabla de estudiantes y una foto de una práctica pueden ser igual de relevantes, pero se manejan de modo distinto. En Google Cloud, esta distinción ayuda a decidir qué estrategia de almacenamiento o análisis conviene usar. Los datos estructurados suelen ir a bases de datos (BigQuery, Cloud SQL), mientras que los no estructurados se almacenan en Cloud Storage como objetos.",
      },
      {
        type: "text",
        content:
          "Los datos estructurados se asocian con consultas definidas y organización por campos. Los no estructurados requieren estrategias más flexibles para almacenar, clasificar o analizar contenido. Esta idea es clave para decisiones de arquitectura cloud y para cursos posteriores de bases de datos, analítica y ciencia de datos.",
      },
      {
        type: "dataClassifier",
      },
      {
        type: "tabs",
        title: "Tipos de datos y almacenamiento",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "Los datos estructurados tienen esquema fijo (tablas, filas, campos tipados) y se consultan con SQL o filtros. Los no estructurados (imágenes, video, documentos) no siguen un esquema tabular y requieren almacenamiento flexible. Algunos datos son semi-estructurados (JSON, XML): tienen cierta organización pero no son completamente rígidos.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "BigQuery / Cloud Storage",
            content:
              "Datos estructurados: BigQuery (análisis masivo), Cloud SQL (relacional), Spanner (distribuido global). Datos no estructurados: Cloud Storage (objetos). Semi-estructurados: Firestore (documentos JSON), Bigtable (columnar). La clasificación del dato guía qué servicio usar.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "RDS / S3",
            content:
              "Datos estructurados: RDS (relacional), Redshift (análisis), Athena (consultas SQL sobre S3). Datos no estructurados: S3 (objetos). Semi-estructurados: DynamoDB (documentos). Data lakes en S3 con Glue Catalog permiten combinar ambos tipos bajo un solo repositorio.",
          },
        ],
      },
      {
        type: "table",
        title: "Comparación: estructurados vs. no estructurados",
        headers: ["Aspecto", "Dato estructurado", "Dato no estructurado"],
        rows: [
          ["Forma", "Tablas, filas, columnas, esquema claro", "Sin estructura tabular rígida"],
          ["Ejemplos", "Lista de alumnos, calificaciones, ventas, JSON", "Imágenes, PDFs, videos, audio, texto libre"],
          ["Consulta", "SQL, filtros por campos, agregaciones", "Búsqueda por metadatos, ML, procesamiento especial"],
          ["Almacenamiento típico", "Bases de datos relacionales o analíticas", "Almacenamiento de objetos (buckets)"],
          ["Volumen", "Generalmente menor pero muy consultado", "Puede ser masivo (TB de imágenes/video)"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué tipo de dato es?",
        scenarios: [
          {
            situation: "Una hoja de calificaciones con columnas: nombre, matrícula, parcial 1, parcial 2, final.",
            question: "¿Es un dato estructurado o no estructurado?",
            hint: "Tiene esquema fijo con campos definidos y tipos predecibles → dato estructurado.",
          },
          {
            situation: "Un video de 45 minutos grabado durante una sesión de laboratorio.",
            question: "¿Cómo clasificarías este dato y por qué importa?",
            hint: "Es un bloque multimedia sin esquema tabular → dato no estructurado. Importa porque se almacena como objeto, no en una base de datos relacional.",
          },
          {
            situation: "Un archivo JSON que devuelve una API con campos como id, nombre, email y rol.",
            question: "¿Dónde cae en la clasificación?",
            hint: "JSON tiene estructura definida con claves y valores tipados → semi-estructurado/estructurado. Es consultable y organizado.",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave sobre tipos de datos",
        items: [
          "La diferencia entre estructurado y no estructurado está en la forma, no en la importancia del dato",
          "Los datos estructurados se consultan con SQL y reglas tabulares — su esquema es predecible",
          "Los datos no estructurados requieren almacenamiento flexible y herramientas especializadas para extraer valor",
          "Esta clasificación guía directamente qué servicio de almacenamiento o análisis usar en la nube",
          "Los datos semi-estructurados (JSON, XML) tienen organización parcial y se almacenan en bases documentales",
          "En la práctica, la mayoría de sistemas combinan ambos tipos — la clave es saber tratar cada uno según su forma",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es un ejemplo de dato no estructurado?",
        options: [
          {
            label: "Una tabla de estudiantes con nombre y matrícula",
            correct: false,
            explanation: "Una tabla con campos definidos es dato estructurado — tiene esquema claro y se consulta por columnas.",
          },
          {
            label: "Un CSV con ventas mensuales",
            correct: false,
            explanation: "Un CSV tiene filas y columnas definidas — es dato estructurado aunque el formato sea texto plano.",
          },
          {
            label: "Una imagen o un video",
            correct: true,
            explanation: "Correcto — imágenes y videos son bloques de contenido sin esquema tabular. No se recorren con SQL ni tienen campos predefinidos.",
          },
          {
            label: "Una hoja de cálculo con columnas fijas",
            correct: false,
            explanation: "Una hoja con columnas fijas sigue un esquema predecible — es dato estructurado.",
          },
        ],
      },
    ],
  },
  {
    slug: "arquitectura-almacenamiento",
    title: "Arquitectura general de almacenamiento",
    readingTime: "12 min",
    objectives: [
      "Comprender cómo se organiza el almacenamiento en la nube como parte de una arquitectura más amplia",
      "Identificar que almacenar no es solo guardar archivos, sino decidir cómo circulan, se consultan, se respaldan y se protegen los datos",
      "Relacionar el almacenamiento con el tipo de dato, el uso esperado y el contexto de la aplicación",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si una organización tiene documentos, respaldos, imágenes, datos de aplicación y archivos históricos, ¿debería tratarlos como si todos vivieran en el mismo lugar y con las mismas reglas?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La arquitectura general de almacenamiento es la forma en que una organización distribuye, organiza y conecta sus datos según su propósito, su frecuencia de acceso y su nivel de importancia. En Google Cloud, esta arquitectura no se piensa como un único depósito, sino como un conjunto de decisiones sobre dónde vive cada tipo de información y cómo se usa.",
      },
      {
        type: "text",
        title: "Una capa de diseño, no una lista de productos",
        content:
          "Una arquitectura de almacenamiento responde preguntas como: qué datos se guardan, quién los usa, con qué frecuencia se consultan, cuánto tiempo deben conservarse y qué nivel de recuperación necesitan.El almacenamiento se organiza por necesidades distintas.",
      },
      {
        type: "text",
        content:
          "No es lo mismo un archivo compartido de clase que un respaldo de seguridad o una imagen que será procesada por una aplicación. La arquitectura se entiende mejor como una combinación entre tipo de dato + frecuencia de acceso + objetivo del dato. Google Cloud ofrece opciones para guardar objetos, administrar datos de forma escalable y diseñar estrategias de respaldo, recuperación y transferencia.",
      },
      {
        type: "text",
        content:
          "Una buena arquitectura evita mezclar todo en una sola solución. Cuando los datos se separan según su función, el sistema se vuelve más claro, más eficiente y más fácil de mantener. Esto es especialmente útil en contextos educativos, empresariales y de investigación, donde conviven materiales muy distintos dentro de un mismo ecosistema.",
      },
      {
        type: "storageArchitecture",
      },
      {
        type: "tabs",
        title: "Arquitectura de almacenamiento en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "Una arquitectura de almacenamiento organiza los datos en capas según su uso: frecuente, compartido, respaldo y archivo. Cada capa tiene reglas de acceso, costo y retención diferentes. El objetivo es que cada dato reciba el tratamiento que necesita sin desperdiciar recursos.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Lifecycle Management",
            content:
              "Cloud Storage permite definir lifecycle rules que mueven objetos entre clases (Standard → Nearline → Coldline → Archive) automáticamente según antigüedad o acceso. Esto implementa la arquitectura por capas sin intervención manual. Se complementa con Transfer Service para mover datos entre fuentes.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "S3 Lifecycle Policies",
            content:
              "S3 Lifecycle Policies automatizan transiciones entre clases. S3 Intelligent-Tiering mueve objetos según patrones de acceso reales sin configuración manual. AWS DataSync y Snow Family facilitan transferencias masivas. La lógica de capas es la misma: uso determina clase.",
          },
        ],
      },
      {
        type: "table",
        title: "Capas de almacenamiento y sus decisiones",
        headers: ["Capa", "Qué resuelve", "Frecuencia de acceso", "Costo relativo"],
        rows: [
          ["Uso frecuente", "Acceso rápido a datos activos", "Diario / constante", "Alto"],
          ["Contenido compartido", "Distribución controlada a múltiples usuarios", "Variable, según demanda", "Medio-alto"],
          ["Datos de aplicación", "Soporte a sistemas en ejecución", "Constante (programático)", "Medio"],
          ["Respaldo", "Protección contra pérdida de datos", "Infrecuente (solo recuperación)", "Bajo"],
          ["Archivo histórico", "Retención a largo plazo por regulación o referencia", "Casi nunca", "Mínimo"],
        ],
      },
      {
        type: "scenario",
        title: "¿En qué capa iría?",
        scenarios: [
          {
            situation: "Material de clase que los estudiantes descargan cada semana durante el semestre.",
            question: "¿En qué capa de almacenamiento ubicarías estos archivos?",
            hint: "Acceso frecuente, compartido con el grupo → capa de contenido compartido con disponibilidad alta.",
          },
          {
            situation: "Un respaldo completo del sitio web de la facultad que se genera cada domingo a las 3 AM.",
            question: "¿Es lo mismo que los archivos activos del sitio?",
            hint: "Se consulta solo si algo falla → capa de respaldo con clase económica (Nearline/Glacier).",
          },
          {
            situation: "Imágenes de evidencia de laboratorio que se entregan una vez y luego rara vez se consultan.",
            question: "¿Deberían estar en la misma capa que los documentos activos?",
            hint: "Uso puntual y luego inactivo → transición de capa frecuente a respaldo/archivo tras entrega.",
          },
          {
            situation: "Archivos de investigación de hace 5 años que deben conservarse por normativa institucional.",
            question: "¿Qué capa y qué clase de almacenamiento conviene?",
            hint: "Retención obligatoria, acceso casi nulo → capa de archivo histórico (Archive/Glacier Deep Archive).",
          },
        ],
      },
      {
        type: "list",
        title: "Principios de una buena arquitectura de almacenamiento",
        items: [
          "No mezclar datos activos con respaldos — cada tipo necesita reglas distintas de acceso y costo",
          "La frecuencia de acceso determina la capa: más acceso = más costo pero más velocidad",
          "Las lifecycle rules automatizan la transición entre capas sin intervención manual",
          "El diseño por capas optimiza costos: los datos que menos se usan cuestan menos de almacenar",
          "El almacenamiento no es estático — los datos cambian de uso con el tiempo y deben moverse entre capas",
          "Una arquitectura clara facilita la gobernanza: saber qué hay, dónde está y quién puede acceder",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor una arquitectura general de almacenamiento?",
        options: [
          {
            label: "Guardar todo en una sola carpeta sin reglas",
            correct: false,
            explanation: "Eso es la ausencia de arquitectura. Sin organización, los costos crecen y la recuperación se dificulta.",
          },
          {
            label: "Organizar los datos según su uso, acceso y necesidad de protección",
            correct: true,
            explanation: "Exacto — una arquitectura de almacenamiento distribuye datos en capas según propósito, frecuencia y criticidad.",
          },
          {
            label: "Eliminar toda clasificación de archivos",
            correct: false,
            explanation: "Eliminar la clasificación es lo opuesto a tener arquitectura. La organización por capas es la base del diseño.",
          },
          {
            label: "Convertir todos los datos en contenedores",
            correct: false,
            explanation: "Los contenedores son para cómputo, no para almacenamiento de datos. Son conceptos diferentes.",
          },
        ],
      },
    ],
  },
  {
    slug: "almacenamiento-objetos",
    title: "Almacenamiento de objetos",
    readingTime: "12 min",
    objectives: [
      "Comprender qué es el almacenamiento de objetos y por qué es útil para archivos grandes y contenido flexible",
      "Entender que un objeto no se organiza como una carpeta tradicional, sino como una unidad con datos y metadatos",
      "Relacionar este modelo con casos como imágenes, videos, respaldos y material no estructurado",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si quieres guardar una foto, un video o un respaldo, ¿necesitas una estructura de carpetas compleja o una forma más flexible de almacenar el archivo?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "El almacenamiento de objetos guarda información como unidades independientes llamadas objetos, que combinan el contenido del archivo con metadatos asociados. En Google Cloud, Cloud Storage es el ejemplo principal de este enfoque y está pensado para almacenar datos de forma escalable y accesible.",
      },
      {
        type: "text",
        title: "No son carpetas, son objetos",
        content:
          "A diferencia de un sistema de archivos tradicional con carpetas jerárquicas, el almacenamiento de objetos trata cada archivo como una unidad independiente con identidad, contenido y metadatos. Los objetos viven en contenedores planos llamados buckets y se identifican por nombre, no por ruta de directorio. Eso lo hace ideal para grandes volúmenes de datos variados.",
      },
      {
        type: "text",
        content:
          "Este modelo es especialmente útil cuando se trabaja con gran volumen de datos o cuando el contenido cambia menos por edición directa y más por reemplazo o carga de nuevos elementos. Imágenes, videos, documentos, respaldos — todos encajan naturalmente como objetos porque no necesitan estructura relacional ni edición parcial.",
      },
      {
        type: "text",
        content:
          "Cada objeto tiene tres componentes: el contenido (los bytes del archivo), los metadatos (información descriptiva como tipo, fecha, autor) y un identificador único dentro del bucket. Esta combinación permite buscar, organizar y administrar archivos de forma más flexible que una jerarquía de carpetas.",
      },
      {
        type: "objectExplorer",
      },
      {
        type: "tabs",
        title: "Almacenamiento de objetos en la nube",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "El almacenamiento de objetos trata cada archivo como una unidad independiente (objeto) con contenido + metadatos + identificador. Los objetos viven en buckets planos (sin jerarquía real de carpetas). Es ideal para datos no estructurados, grandes volúmenes y acceso por URL.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud Storage",
            content:
              "Cloud Storage organiza objetos en buckets con nombres globalmente únicos. Soporta clases de almacenamiento (Standard, Nearline, Coldline, Archive), versionado de objetos, lifecycle rules, acceso por gsutil/API/Console, y permisos granulares con IAM. Ideal para datos no estructurados de cualquier tamaño.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "Amazon S3",
            content:
              "Amazon S3 (Simple Storage Service) es el servicio equivalente. Buckets globales, clases de almacenamiento (Standard, IA, Glacier), versionado, lifecycle policies y acceso por CLI/SDK/Console. Es uno de los servicios más usados de AWS.",
          },
        ],
      },
      {
        type: "table",
        title: "Almacenamiento de objetos vs. sistema de archivos vs. base de datos",
        headers: ["Aspecto", "Objetos (Cloud Storage/S3)", "Sistema de archivos", "Base de datos"],
        rows: [
          ["Estructura", "Plana (buckets + keys)", "Jerárquica (carpetas)", "Tabular (filas/columnas)"],
          ["Ideal para", "Archivos grandes, multimedia, respaldos", "Archivos de sistema operativo", "Datos estructurados consultables"],
          ["Acceso", "URL, API REST, CLI", "Rutas de directorio", "SQL / consultas"],
          ["Escalabilidad", "Prácticamente ilimitada", "Limitada por disco", "Depende del motor"],
          ["Edición parcial", "No (se reemplaza el objeto entero)", "Sí", "Sí (UPDATE por campos)"],
        ],
      },
      {
        type: "scenario",
        title: "¿Lo guardarías como objeto?",
        scenarios: [
          {
            situation: "Miles de fotos de evidencia de prácticas que los estudiantes suben cada semestre.",
            question: "¿Es un buen caso para almacenamiento de objetos?",
            hint: "Archivos binarios, gran volumen, acceso por URL, sin edición parcial → caso ideal para objetos.",
          },
          {
            situation: "Una tabla de calificaciones que se actualiza cada semana y se consulta por matrícula.",
            question: "¿Conviene guardarlo como objeto o en una base de datos?",
            hint: "Datos tabulares con consultas frecuentes y updates parciales → base de datos relacional, no objetos.",
          },
          {
            situation: "Respaldos nocturnos del servidor que se guardan por si algo falla.",
            question: "¿Qué clase de almacenamiento de objetos usarías?",
            hint: "Acceso infrecuente, solo recuperación → clase económica (Nearline/Coldline o S3 Glacier).",
          },
        ],
      },
      {
        type: "list",
        title: "Ideas clave del almacenamiento de objetos",
        items: [
          "Un objeto = contenido + metadatos + identificador único dentro de un bucket",
          "No hay carpetas reales — los prefijos en el nombre simulan estructura (ej: fotos/2026/lab3.jpg)",
          "Ideal para datos no estructurados: imágenes, videos, PDFs, respaldos, logs",
          "Escalabilidad prácticamente ilimitada — puede almacenar petabytes sin problema",
          "El acceso es por URL o API, no por rutas de sistema operativo",
          "Las clases de almacenamiento optimizan costo según frecuencia de acceso",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor el almacenamiento de objetos?",
        options: [
          {
            label: "Guarda archivos como unidades independientes con metadatos en buckets planos",
            correct: true,
            explanation: "Exacto — cada objeto es independiente, tiene contenido + metadatos y vive en un bucket sin jerarquía real de carpetas.",
          },
          {
            label: "Solo sirve para tablas relacionales con SQL",
            correct: false,
            explanation: "Las tablas relacionales van en bases de datos, no en almacenamiento de objetos. Los objetos son para datos no estructurados.",
          },
          {
            label: "Requiere carpetas físicas obligatorias para organizar los archivos",
            correct: false,
            explanation: "El almacenamiento de objetos es plano — no tiene carpetas reales. Los prefijos en nombres simulan estructura.",
          },
          {
            label: "No permite escalar más allá de unos pocos archivos",
            correct: false,
            explanation: "Al contrario — el almacenamiento de objetos escala a petabytes con millones de objetos sin problema.",
          },
        ],
      },
    ],
  },
];
