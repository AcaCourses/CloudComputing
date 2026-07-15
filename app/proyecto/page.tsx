"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Target,
  Lightbulb,
  Cloud,
  Shield,
  Brain,
  Globe,
  BookOpen,
  Heart,
  Eye,
  Laptop,
  Landmark,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  Layout,
  Monitor,
  Code,
  ChevronDown,
  ChevronUp,
  Layers,
  Rocket,
  Presentation,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────── */

const ejes = [
{
  id: 1,
  title: "Género",
  icon: Heart,
  color: "text-pink-600",
  bgColor: "bg-pink-50",
  borderColor: "border-pink-200",
  accentColor: "bg-pink-600",
  description:
    "Escenarios reales donde la tecnología en la nube puede contribuir a la igualdad, prevención de violencia y acceso equitativo.",
  escenarios: [
    {
      titulo: "Canal seguro de denuncia anónima en una universidad",
      contexto:
        "En una universidad, muchas estudiantes no denuncian acoso porque temen represalias o que su identidad sea expuesta. El sistema actual no garantiza anonimato, seguimiento ni trazabilidad clara del caso, aunque las instituciones ya operan rutas formales de orientación y atención por violencia de género.",
      networking: {
        enfoque: "Garantizar anonimato real y protección de datos sensibles",
        ideas: [
          "Autenticación con IAP que permita verificar que la persona pertenece a la comunidad sin exponer su identidad al receptor inicial",
          "Cifrado de extremo a extremo de reportes y evidencias almacenadas en Cloud Storage",
          "VPC privada para aislar la base de datos de denuncias del resto de la infraestructura institucional",
          "Cloud Armor y políticas de acceso para prevenir intentos de scraping, intrusión o exposición de expedientes",
        ],
      },
      data: {
        enfoque: "Detectar patrones de violencia y generar alertas tempranas",
        ideas: [
          "NLP con Vertex AI para clasificar automáticamente tipo de agresión, nivel de riesgo y urgencia del caso",
          "BigQuery para analizar tendencias por plantel, horario, área académica o tipo de incidente",
          "Modelo de ML que detecte repetición de agresores, escalamiento o concentración de reportes",
          "Dashboard con Looker para defensorías o unidades de género con mapas de calor y seguimiento de casos",
        ],
      },
    },
    {
      titulo: "Ruta inteligente de atención y refugio para mujeres en situación de violencia",
      contexto:
        "Muchas mujeres no saben a dónde acudir cuando enfrentan violencia familiar, amenazas o riesgo inmediato. Los servicios existen —líneas de atención, refugios, apoyo psicológico y jurídico— pero suelen estar dispersos, con poca visibilidad y sin una forma clara de canalizar a cada persona según su nivel de urgencia y ubicación.",
      networking: {
        enfoque: "Conectar servicios críticos sin exponer información personal ni ubicaciones sensibles",
        ideas: [
          "IAM con roles para separar acceso entre operadoras, psicólogas, abogadas y personal de refugio",
          "Cloud SQL con cifrado y auditoría para expedientes de atención y canalización",
          "Signed URLs y controles temporales de acceso para compartir documentos sensibles solo con personal autorizado",
          "Cloud Logging para trazabilidad de consultas, derivaciones y accesos a casos de alto riesgo",
        ],
      },
      data: {
        enfoque: "Priorizar urgencia y recomendar el recurso adecuado",
        ideas: [
          "Modelo de clasificación en Vertex AI para determinar si un caso requiere línea de emergencia, refugio, atención legal o acompañamiento psicológico",
          "BigQuery para mapear demanda por zona, tiempos de respuesta y saturación de servicios",
          "Motor de recomendación que sugiera el punto de atención más cercano y adecuado según contexto y riesgo",
          "Tablero operativo para visualizar disponibilidad de refugios, casos abiertos y tiempos de canalización",
        ],
      },
    },
    {
      titulo: "Sistema de monitoreo de violencia digital y acoso en línea",
      contexto:
        "Muchas agresiones contra mujeres ocurren en espacios digitales: difusión de contenido íntimo, amenazas, hostigamiento y acoso persistente. Las víctimas suelen tener evidencia dispersa en capturas, mensajes y enlaces, pero no existe una plataforma estructurada para resguardar pruebas, clasificar incidentes y escalar los casos oportunamente.",
      networking: {
        enfoque: "Resguardar evidencia digital y controlar acceso a casos sensibles",
        ideas: [
          "Cloud Storage con buckets privados para capturas, enlaces, audios y archivos probatorios",
          "VPC Service Controls para limitar extracción no autorizada de información sensible",
          "Autenticación multifactor para personal que revisa evidencia o acompaña denuncias",
          "Políticas de retención y borrado seguro conforme a normativas de protección de datos",
        ],
      },
      data: {
        enfoque: "Clasificar agresiones digitales y acelerar la respuesta",
        ideas: [
          "NLP para identificar amenazas, chantaje, acoso reiterado o difusión no consentida en texto y mensajes",
          "Vision API para extraer texto de capturas y organizar evidencia automáticamente",
          "Modelo de priorización que detecte casos con riesgo de escalamiento a violencia física o extorsión",
          "Dashboard analítico para identificar patrones, plataformas más reportadas y tiempos de respuesta institucional",
        ],
      },
    },
  ],
  },
  {
  id: 2,
  title: "Servicios Públicos",
  icon: Landmark,
  color: "text-amber-600",
  bgColor: "bg-amber-50",
  borderColor: "border-amber-200",
  accentColor: "bg-amber-600",
  description:
    "Escenarios donde la nube puede fortalecer la transparencia, reducir discrecionalidad y mejorar el acceso equitativo a servicios públicos.",
  escenarios: [
    {
      titulo: "Sistema de trazabilidad de trámites y atención ciudadana",
      contexto:
        "En una dependencia pública, los ciudadanos enfrentan trámites lentos, respuestas inconsistentes y poca claridad sobre el estado de sus solicitudes. La falta de trazabilidad permite discrecionalidad, retrasos injustificados y posibles actos de corrupción sin que exista evidencia clara para auditoría.",
      networking: {
        enfoque: "Proteger expedientes ciudadanos y controlar acceso por rol",
        ideas: [
          "IAM con roles: ciudadanos ven solo sus trámites, operadores solo los casos asignados, supervisores y auditores acceden a vistas consolidadas",
          "Cloud SQL con encriptación y backups automáticos para almacenar expedientes y cambios de estado",
          "IAP para que el acceso de funcionarios a paneles internos requiera verificación adicional",
          "VPC para aislar la base de datos y sistemas de gestión del resto de servicios públicos expuestos",
        ],
      },
      data: {
        enfoque: "Detectar retrasos anómalos y posibles irregularidades",
        ideas: [
          "BigQuery para analizar tiempos de respuesta, tasas de rechazo y diferencias por oficina, región o tipo de trámite",
          "Modelo de ML con Vertex AI para detectar anomalías en patrones de atención o resoluciones inusuales",
          "Alertas automáticas vía Pub/Sub cuando un trámite excede tiempos esperados o presenta cambios sospechosos",
          "Dashboard para órganos internos de control con indicadores de rezago, cuellos de botella y variaciones injustificadas",
        ],
      },
    },
    {
      titulo: "Portal transparente de apoyos y subsidios sociales",
      contexto:
        "Programas de apoyo social se asignan con poca claridad para la ciudadanía. Las personas no saben por qué fueron rechazadas, cuánto tarda el proceso o si existen patrones de favoritismo en la distribución de recursos públicos.",
      networking: {
        enfoque: "Garantizar acceso seguro y trazable a información de beneficiarios y funcionarios",
        ideas: [
          "IAM con separación de permisos entre capturistas, validadores, supervisores y auditores",
          "Cloud Storage para resguardar documentos comprobatorios con acceso restringido",
          "Signed URLs para compartir expedientes de revisión sin exponer repositorios completos",
          "Cloud Logging para auditar consultas, modificaciones y aprobaciones dentro del sistema",
        ],
      },
      data: {
        enfoque: "Analizar equidad en asignación y detectar favoritismo",
        ideas: [
          "BigQuery para cruzar solicitudes, aprobaciones, tiempos de resolución y distribución geográfica de apoyos",
          "Modelos analíticos para detectar concentraciones atípicas de beneficios en ciertas zonas o perfiles",
          "Clasificación automática de solicitudes incompletas o inconsistentes para acelerar revisión",
          "Dashboard público con métricas agregadas de cobertura, tiempos y criterios de asignación",
        ],
      },
    },
    {
      titulo: "Monitoreo inteligente de acceso desigual a servicios públicos",
      contexto:
        "Colonias o comunidades enteras reciben atención irregular en servicios como agua, salud, alumbrado o recolección, pero las instituciones no integran los reportes ciudadanos con datos operativos. Esto dificulta identificar si el problema es capacidad limitada, mala gestión o trato desigual.",
      networking: {
        enfoque: "Integrar reportes ciudadanos y datos institucionales de forma segura",
        ideas: [
          "APIs protegidas con autenticación para conectar plataformas de reporte ciudadano con sistemas operativos internos",
          "VPC para segmentar servicios críticos y proteger bases de datos de infraestructura pública",
          "Firewall rules y rate limiting para evitar abuso del sistema de reportes",
          "Cloud Interconnect o VPN para compartir información entre dependencias municipales o estatales",
        ],
      },
      data: {
        enfoque: "Medir brechas territoriales y priorizar intervención",
        ideas: [
          "BigQuery para correlacionar reportes ciudadanos, tiempos de atención y frecuencia de fallas por zona",
          "Modelos geoespaciales para identificar áreas con acceso sistemáticamente menor a servicios",
          "NLP para clasificar quejas ciudadanas y agruparlas por tipo de afectación",
          "Dashboard geográfico para autoridades con mapas de calor, brechas de cobertura y prioridades de intervención",
        ],
      },
    },
  ],
},
  {
    id: 3,
    title: "Inclusión y accesibilidad",
    icon: Globe,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "bg-green-600",
    description:
      "Escenarios donde la nube elimina barreras para que todas las personas accedan a servicios en igualdad de condiciones.",
    escenarios: [
      {
        titulo: "Portal municipal accesible para personas con discapacidad visual",
        contexto:
          "El sitio web de un municipio tiene trámites en línea (pago de predial, solicitud de constancias, reportes ciudadanos) pero es completamente inaccesible para personas con discapacidad visual: imágenes sin descripción, formularios sin etiquetas, PDFs escaneados como imagen.",
        networking: {
          enfoque: "Infraestructura robusta y acceso seguro para todos los perfiles de usuario",
          ideas: [
            "Cloud Load Balancer con HTTPS para disponibilidad y seguridad en cualquier dispositivo/lector de pantalla",
            "IAP con autenticación simplificada (evitar CAPTCHAs visuales, usar verificación por correo)",
            "Cloud CDN para que el sitio cargue rápido incluso con conexiones lentas o asistivas",
            "Monitoreo con Cloud Operations para detectar errores 4xx/5xx que bloqueen flujos accesibles",
          ],
        },
        data: {
          enfoque: "Convertir contenido visual en formatos accesibles automáticamente",
          ideas: [
            "Vision API para generar descripciones alt-text automáticas de todas las imágenes",
            "Document AI para extraer texto de PDFs escaneados y convertirlos en HTML accesible",
            "Text-to-Speech para ofrecer lectura en voz alta de cualquier sección del portal",
            "NLP para simplificar lenguaje burocrático a versiones en lenguaje claro",
          ],
        },
      },
      {
        titulo: "App de transporte público con navegación para personas con movilidad reducida",
        contexto:
          "Las apps de transporte muestran rutas, pero no indican si las estaciones tienen elevador, rampa o si el camión tiene plataforma accesible. Una persona en silla de ruedas no puede planificar un traslado confiable porque la información de accesibilidad no existe o está desactualizada.",
        networking: {
          enfoque: "Infraestructura en la nube para datos en tiempo real de accesibilidad",
          ideas: [
            "Cloud Run para microservicios que consulten y actualicen el estado de infraestructura accesible",
            "Pub/Sub para recibir reportes en tiempo real de usuarios sobre elevadores fuera de servicio",
            "Cloud Storage para imágenes de evidencia subidas por la comunidad",
            "IAM para diferenciar reportes verificados (operadores) vs. comunitarios (ciudadanos)",
          ],
        },
        data: {
          enfoque: "Ruta inteligente que priorice accesibilidad sobre rapidez",
          ideas: [
            "Modelo de ML que calcule la ruta óptima considerando accesibilidad como variable principal (no solo tiempo)",
            "Clasificación de imágenes con Vision API para verificar reportes comunitarios (¿el elevador realmente está fuera de servicio?)",
            "BigQuery para analizar patrones: estaciones con fallas recurrentes, horarios con mayor demanda accesible",
            "Speech-to-Text para que personas con discapacidad motriz dicten su destino en lugar de escribirlo",
          ],
        },
      },
      {
        titulo: "Plataforma educativa multilingüe para comunidades indígenas",
        contexto:
          "Contenido educativo oficial (SEP) está disponible solo en español. Comunidades hablantes de náhuatl, mixteco o maya no tienen materiales en su lengua. Docentes rurales crean contenido improvisado pero no tienen forma de compartirlo ni distribuirlo a otras comunidades.",
        networking: {
          enfoque: "Distribución de contenido en zonas con baja conectividad",
          ideas: [
            "Cloud CDN con caché agresivo para que el contenido cargue incluso con conexiones 2G",
            "Cloud Storage con versionado para que docentes suban y actualicen materiales",
            "Acceso offline-first: la app descarga contenido cuando hay señal y funciona sin internet",
            "IAM para verificar docentes autorizados a subir contenido vs. comunidad que solo consume",
          ],
        },
        data: {
          enfoque: "Traducción y generación de contenido en lenguas indígenas",
          ideas: [
            "Translation API + modelos custom de Vertex AI entrenados con corpus de lenguas indígenas",
            "Text-to-Speech personalizado para generar audio en lenguas que no tienen versión escrita estándar",
            "NLP para adaptar nivel de dificultad según el grado escolar del estudiante",
            "Análisis de uso en BigQuery para saber qué contenidos necesitan más lenguas o formatos",
          ],
        },
      },
    ],
  },
  {
    id: 4,
    title: "Bienestar digital y salud mental",
    icon: Laptop,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    accentColor: "bg-purple-600",
    description:
      "Escenarios donde la nube puede mejorar la relación de las personas con la tecnología y apoyar su equilibrio emocional.",
    escenarios: [
      {
        titulo: "Diario emocional con alertas para redes de apoyo",
        contexto:
          "Estudiantes universitarios experimentan ansiedad y estrés pero no buscan ayuda hasta que la situación es crítica. No existe un sistema que les permita registrar cómo se sienten y que, de forma confidencial, alerte a alguien de confianza si detecta un patrón preocupante.",
        networking: {
          enfoque: "Privacidad absoluta de registros emocionales y control del usuario",
          ideas: [
            "Encriptación at-rest y in-transit de todos los registros emocionales",
            "IAM con control total del usuario: solo ellos deciden quién puede ver alertas",
            "VPC privada para aislar la base de datos de registros del resto de servicios de la universidad",
            "Políticas de borrado automático configurable (el usuario decide cuánto tiempo se retienen sus datos)",
          ],
        },
        data: {
          enfoque: "Detectar patrones de deterioro emocional y sugerir intervención",
          ideas: [
            "Análisis de sentimiento con NLP sobre los textos del diario para medir tendencia emocional",
            "Modelo de ML con Vertex AI que detecte patrones de deterioro sostenido (no alertar por un mal día, sino por tendencia)",
            "Recomendaciones personalizadas: ejercicios de respiración, contacto con psicólogo, actividades según preferencias",
            "BigQuery para análisis agregado (anónimo) que ayude a la universidad a mejorar programas de bienestar",
          ],
        },
      },
      {
        titulo: "Monitor de hábitos digitales para familias",
        contexto:
          "Padres preocupados por el tiempo de pantalla de sus hijos no tienen herramientas que les muestren datos claros ni les ayuden a establecer límites de forma educativa (no punitiva). Las soluciones actuales solo bloquean, no enseñan autorregulación.",
        networking: {
          enfoque: "Control parental con privacidad y seguridad del menor",
          ideas: [
            "IAM con roles: padres configuran reglas, hijos ven su propio dashboard, datos no salen de la familia",
            "Pub/Sub para notificaciones en tiempo real cuando se acerca un límite (sin bloqueo abrupto)",
            "Firewall de la infraestructura para que terceros no accedan a datos de uso del menor",
            "Cloud Logging para auditoría familiar (transparencia sobre qué datos se recolectan)",
          ],
        },
        data: {
          enfoque: "Análisis de patrones y recomendaciones de autorregulación",
          ideas: [
            "ML para clasificar tiempo de pantalla en categorías: educativo, social, entretenimiento, creativo",
            "Modelo de recomendación que sugiera actividades offline basadas en intereses del menor",
            "NLP para generar reportes semanales en lenguaje amigable para el menor (\"esta semana usaste 2h más en videos\")",
            "BigQuery para correlacionar hábitos digitales con desempeño escolar (datos familiares, no institucionales)",
          ],
        },
      },
      {
        titulo: "Espacio seguro de orientación emocional con chatbot",
        contexto:
          "Los servicios psicológicos de una universidad tienen semanas de espera. Muchos estudiantes necesitan orientación inmediata (no terapia, sino escucha y guía básica). Un chatbot podría ofrecer primer contacto 24/7, pero debe ser seguro, empático y saber cuándo referir a un profesional.",
        networking: {
          enfoque: "Entorno confidencial y seguro para conversaciones sensibles",
          ideas: [
            "Cloud Run con HTTPS y certificados gestionados para disponibilidad 24/7",
            "Datos de conversación encriptados y con retención limitada (borrado automático a los 30 días)",
            "IAP para verificar que el usuario sea parte de la comunidad universitaria sin revelar su identidad al terapeuta",
            "Alertas seguras vía canal cifrado cuando el chatbot detecta riesgo y necesita referir a profesional",
          ],
        },
        data: {
          enfoque: "Chatbot empático con detección de riesgo y derivación inteligente",
          ideas: [
            "Dialogflow CX para conversaciones naturales con flujos de contención emocional",
            "Análisis de sentimiento en tiempo real para ajustar el tono de las respuestas",
            "Modelo de clasificación de riesgo: bajo (guía) / medio (seguimiento) / alto (derivación inmediata a profesional)",
            "Speech-to-Text para que el estudiante pueda hablar en lugar de escribir en momentos de crisis",
          ],
        },
      },
    ],
  },
  {
    id: 5,
    title: "Transparencia y acceso a la información",
    icon: Eye,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "bg-amber-600",
    description:
      "Escenarios donde la nube facilita que las personas encuentren, entiendan y usen información pública o institucional.",
    escenarios: [
      {
        titulo: "Buscador inteligente de trámites gubernamentales",
        contexto:
          "Un ciudadano necesita sacar su acta de nacimiento, renovar su INE y tramitar una beca. Cada trámite está en un portal diferente, con requisitos distintos y lenguaje burocrático incomprensible. No existe un lugar único donde buscar \"qué necesito para X\" y recibir una respuesta clara.",
        networking: {
          enfoque: "Portal unificado seguro con autenticación ciudadana",
          ideas: [
            "Cloud Load Balancer para un punto de entrada único que agregue información de múltiples portales",
            "IAP con autenticación ciudadana (CURP + correo) para personalizar trámites según perfil",
            "Cloud Armor contra ataques DDoS que podrían tumbar un servicio público crítico",
            "API Gateway para conectar con APIs de distintas dependencias sin exponer backends individuales",
          ],
        },
        data: {
          enfoque: "Búsqueda semántica y asistente que explique en lenguaje simple",
          ideas: [
            "Vertex AI Search para búsqueda semántica: el ciudadano escribe en lenguaje natural y encuentra el trámite correcto",
            "NLP para convertir requisitos burocráticos en pasos claros y sencillos",
            "Chatbot con Dialogflow que guíe paso a paso según la situación particular del usuario",
            "Document AI para extraer y estructurar información de PDFs oficiales dispersos en múltiples sitios",
          ],
        },
      },
      {
        titulo: "Monitor ciudadano de obra pública",
        contexto:
          "El gobierno anuncia obras públicas (puentes, escuelas, hospitales) con presupuesto y fecha de entrega. Pero no hay forma ciudadana de verificar avances, detectar retrasos o comparar presupuesto ejercido vs. planeado. La información existe pero está enterrada en informes PDF de 200 páginas.",
        networking: {
          enfoque: "Publicación segura de datos abiertos con integridad garantizada",
          ideas: [
            "Cloud Storage con versionado inmutable para que los informes publicados no puedan ser alterados retroactivamente",
            "Firmas digitales en documentos para verificar autenticidad",
            "API pública con rate limiting para que desarrolladores consulten datos sin sobrecargar el sistema",
            "Cloud Logging para transparencia: registrar quién accedió, cuándo y a qué datos",
          ],
        },
        data: {
          enfoque: "Extraer, analizar y visualizar datos de avance automáticamente",
          ideas: [
            "Document AI para extraer datos estructurados de informes PDF (montos, fechas, porcentajes)",
            "BigQuery para cruzar presupuesto planeado vs. ejercido y detectar desviaciones",
            "Modelo de ML que prediga probabilidad de retraso basado en patrones históricos de obras similares",
            "Dashboard público con Looker que cualquier ciudadano pueda consultar sin conocimientos técnicos",
          ],
        },
      },
      {
        titulo: "Sistema de seguimiento de reportes ciudadanos",
        contexto:
          "Los ciudadanos reportan baches, fugas de agua, luminarias fundidas a través de llamadas telefónicas o ventanillas. No reciben número de seguimiento, no saben si alguien atendió su reporte, y al llamar de nuevo les piden repetir toda la información. No hay rendición de cuentas.",
        networking: {
          enfoque: "Plataforma confiable con autenticación y trazabilidad",
          ideas: [
            "Cloud Run para una app escalable que reciba miles de reportes simultáneos",
            "Pub/Sub para enrutar cada reporte al departamento correcto automáticamente",
            "IAM con roles: ciudadano (reporta/consulta), operador (actualiza estatus), auditor (ve todo)",
            "Cloud SQL con historial inmutable: cada cambio de estatus queda registrado y es auditable",
          ],
        },
        data: {
          enfoque: "Clasificación automática, priorización y análisis de patrones",
          ideas: [
            "Vision API para que el ciudadano suba foto del problema y el sistema clasifique automáticamente (bache/fuga/luminaria)",
            "NLP para extraer ubicación y tipo de problema de reportes escritos en lenguaje natural",
            "Modelo de priorización: urgencia × impacto × antigüedad para ordenar atención",
            "BigQuery para detectar zonas con problemas recurrentes y planificar mantenimiento preventivo",
          ],
        },
      },
    ],
  },
];

const entregables = [
  "Nombre de la plataforma o solución",
  "Problema que busca resolver",
  "Eje temático elegido",
  "Cómo la solución utiliza Data, ML e IA",
  "Público objetivo",
  "Descripción general de cómo funcionaría",
  "Servicios de nube que usarían",
  "Breve justificación de por qué elegirían esos servicios",
  "Posibles herramientas de IA o APIs que podrían integrarse",
  "Beneficio social, educativo o institucional de la solución",
  "Maqueta digital tipo MVP creada con apoyo de IA o herramientas web, que represente visualmente la solución al problema elegido",
  "Link público de la maqueta digital (MVP) para revisión del docente",
];

const rubricaProyecto = [
  {
    criterio: "Presentación del problema y propuesta",
    detalle: "El equipo explica con claridad el problema, su contexto, público objetivo y el valor de la solución.",
    puntos: 5,
  },
  {
    criterio: "MVP presentado en exposición",
    detalle: "La presentación incluye una maqueta digital tipo MVP navegable y coherente con la propuesta.",
    puntos: 7,
  },
  {
    criterio: "Servicios de nube propuestos",
    detalle: "Se exponen al menos 5 servicios de Google Cloud aplicables al proyecto y su función dentro de la arquitectura.",
    puntos: 7,
  },
  {
    criterio: "Alineación con Data, ML e IA",
    detalle: "La propuesta integra claramente capacidades de Data, Machine Learning e Inteligencia Artificial en su solución.",
    puntos: 4,
  },
  {
    criterio: "Viabilidad e impacto",
    detalle: "La solución muestra factibilidad conceptual y beneficio social, educativo o institucional realista.",
    puntos: 4,
  },
  {
    criterio: "Claridad de exposición y respuestas",
    detalle: "Exposición ordenada, uso efectivo del tiempo y respuestas claras a preguntas del docente.",
    puntos: 3,
  },
];

const serviciosCloud = [
  { name: "Cloud Run / App Engine", desc: "Alojar la aplicación web", icon: Rocket },
  { name: "Cloud Storage", desc: "Guardar imágenes, documentos o archivos", icon: Cloud },
  { name: "Cloud SQL", desc: "Almacenar información estructurada", icon: Layers },
  { name: "Pub/Sub", desc: "Notificaciones o comunicación entre componentes", icon: Sparkles },
  { name: "Text-to-Speech", desc: "Accesibilidad y lectura en voz alta", icon: Monitor },
  { name: "Speech-to-Text", desc: "Convertir voz en texto", icon: Monitor },
  { name: "Translation API", desc: "Contenido multilingüe", icon: Globe },
  { name: "Vision API", desc: "Analizar imágenes o documentos", icon: Eye },
  { name: "IAM / IAP", desc: "Controlar acceso y seguridad", icon: Shield },
  { name: "Cloud Logging / Monitoring", desc: "Observabilidad de la plataforma", icon: Target },
];

const reglasGenerales = [
  "Los equipos serán de máximo 3 integrantes de la misma área.",
  "Los equipos los seleccionan los alumnos.",
  "Solo 2 integrantes exponen.",
  "La exposición dura máximo 5 minutos.",
  "Todos los proyectos deben alinearse con Data, ML e IA (no hay opciones de especialización diferentes).",
  "La solución debe ser teórica y conceptual, no un desarrollo completo.",
  "La página web debe funcionar como una maqueta o emulación tipo MVP de la plataforma propuesta.",
  "Se puede usar IA para generar el prototipo, siempre que el equipo pueda explicar lo que construyó.",
  "La exposición debe demostrar comprensión del problema, la propuesta, las capacidades de ML/IA utilizadas y los servicios cloud seleccionados.",
];

const mvpMustShow = [
  "La problemática que atiende",
  "El público objetivo",
  "La función principal de la plataforma",
  "Un flujo de interacción de usuario",
  "Pantallas clave: inicio, consulta, reporte, seguimiento, resultados o panel",
  "Una apariencia de plataforma funcional (aunque no tenga backend real)",
];

/* ─── Prompt Ejemplo Component ──────────────────────── */

const promptEjemplo = `Quiero que construyas un sistema web tipo MVP llamado EcoRuta Escolar, una plataforma digital enfocada en resolver un problema ambiental y social: el uso ineficiente del transporte escolar y familiar, que genera más tráfico, más emisiones contaminantes y más gasto de combustible alrededor de escuelas urbanas.

Objetivo del sistema:
Diseña una plataforma web que ayude a escuelas, familias y administradores a organizar rutas compartidas, registrar hábitos de traslado y visualizar oportunidades para reducir emisiones. El proyecto debe verse como una solución real, aunque sea un prototipo funcional frontend con datos simulados.

IMPORTANTE: Tu solución DEBE estar alineada al camino de especialización en Data, Machine Learning e Inteligencia Artificial. Integra capacidades de ML, análisis de datos y APIs de IA de Google Cloud para resolver el problema.

Requisitos generales:
- Crea una aplicación web moderna, atractiva y clara.
- Usa HTML, CSS y JavaScript si quieres algo simple, o una estructura más completa si consideras que vale la pena.
- Si decides usar framework, mantenlo ligero y fácil de ejecutar.
- El resultado debe parecer una plataforma real, no solo una landing page.
- Debe incluir navegación entre secciones o pantallas.
- Todo el contenido debe estar en español.
- El diseño debe sentirse limpio, tecnológico, ecológico y escolar/institucional.
- Usa colores verdes, azules suaves, blanco y acentos modernos.
- Agrega iconos, tarjetas, paneles, estadísticas y microinteracciones.

Problema que resuelve:
Muchas familias llevan a sus hijos en vehículos separados, incluso cuando viven en zonas cercanas. Esto incrementa tráfico, emisiones de CO2, consumo de combustible y desorden vial en horarios escolares. La plataforma debe proponer una manera digital de coordinar trayectos compartidos y visualizar impacto ambiental positivo.

Público objetivo:
- Escuelas
- Familias
- Coordinadores escolares
- Municipios o autoridades educativas
- Comunidades interesadas en movilidad sostenible

Funcionalidades que quiero en el MVP:
1. Página de inicio con explicación del problema ambiental y propuesta de solución.
2. Dashboard principal con métricas simuladas:
   - emisiones evitadas
   - viajes compartidos realizados
   - familias registradas
   - rutas activas
   - ahorro estimado de combustible
3. Módulo de registro de rutas:
   - origen
   - destino
   - horario
   - número de lugares disponibles
   - tipo de transporte
4. Módulo de coincidencias inteligentes:
   - mostrar familias o usuarios con rutas similares
   - sugerir agrupaciones de viaje con lógica simulada
5. Mapa o sección visual simulada de rutas compartidas.
6. Sección de impacto ambiental:
   - gráficos
   - indicadores
   - comparaciones semanales o mensuales
7. Panel para escuela o administrador:
   - ver rutas registradas
   - ver zonas de mayor tráfico
   - ver estudiantes/familias participantes
8. Sección "IA aplicada" donde se explique cómo la plataforma podría usar inteligencia artificial.
9. Formulario o asistente para recomendar la mejor ruta compartida.
10. Diseño responsive.

Quiero que incluyas una sección conceptual de IA con ejemplos como:
- recomendación inteligente de rutas compartidas
- predicción de horas de mayor congestión
- clasificación de zonas con mayor impacto ambiental
- sugerencias automáticas para reducir emisiones
- generación de alertas para coordinadores escolares

Además, quiero una sección conceptual de nube con arquitectura propuesta usando servicios de Google Cloud, por ejemplo:
- Cloud Run o App Engine para alojar la aplicación
- Cloud SQL para datos estructurados
- Cloud Storage para archivos o reportes
- Maps API o componente visual simulado para rutas
- Vertex AI o APIs de IA para recomendaciones inteligentes
- IAM/IAP para control de acceso
- Logging/Monitoring para observabilidad

Estructura visual esperada:
- Header con logo textual "EcoRuta Escolar"
- Hero section con eslogan potente
- Tarjetas de problema, solución e impacto
- Dashboard con KPIs
- Tablas o cards para rutas
- Gráficas atractivas
- Espacio visual para mapa
- Sección de arquitectura cloud
- Sección de IA
- Footer institucional

Interacciones web que quiero:
- hover en tarjetas
- navegación por tabs o sidebar
- botones con estados activos
- animaciones suaves al cargar
- filtros simulados para rutas
- paneles expandibles
- indicadores dinámicos con datos mock

Importante:
- No quiero solo texto descriptivo; quiero una maqueta funcional navegable.
- Usa datos simulados realistas.
- Organiza bien componentes, estilos y scripts.
- Si generas varios archivos, sepáralos limpiamente.
- Quiero código entendible para poder editarlo después.
- Incluye comentarios mínimos pero útiles.
- Asegúrate de que todo corra localmente sin depender de backend real.
- Si necesitas inventar datos, hazlo de forma coherente con el problema.

Entregables:
- archivos completos del proyecto
- interfaz funcional
- diseño visual convincente
- texto del sistema en español
- breve README con instrucciones para correrlo
- breve explicación de cómo cada módulo se relaciona con el problema ambiental

Antes de empezar:
1. Propón una estructura de archivos.
2. Resume qué pantallas vas a construir.
3. Explica cómo representarás el componente de IA y el de Google Cloud dentro del MVP.
4. Luego genera el proyecto completo.`;

function PromptEjemploInline() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 space-y-6">
      {/* Prompt toggle */}
      <div className="rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50/40 via-white to-purple-50/20 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 p-5 text-left hover:bg-cyan-50/30 transition-colors"
        >
          <div className="p-2.5 rounded-lg bg-cyan-100 shrink-0">
            <Code className="w-5 h-5 text-cyan-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">Ver Prompt Ejemplo</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Ejemplo completo de cómo redactar un prompt para que una IA construya tu MVP.
            </p>
          </div>
          <div className="shrink-0 p-1.5 rounded-lg bg-cyan-100/60">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-cyan-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-cyan-700" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="border-t-2 border-cyan-100 p-5 sm:p-6 space-y-5">
            {/* Note */}
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-cyan-50 border border-cyan-100">
              <Lightbulb className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Este prompt es un ejemplo.</strong> Adapta el nombre, eje temático, problema y módulos a tu propuesta. Lo importante es ser específico y claro.
              </p>
            </div>

            {/* Prompt code block */}
            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(promptEjemplo); }}
                  className="px-3 py-1.5 rounded-md bg-white border border-border text-xs font-medium text-text-secondary hover:text-foreground hover:border-cyan-300 transition-colors shadow-sm"
                >
                  Copiar prompt
                </button>
              </div>
              <div className="rounded-lg border border-border bg-gray-900 p-5 overflow-auto max-h-[400px]">
                <pre className="text-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                  {promptEjemplo}
                </pre>
              </div>
            </div>

            {/* Tips */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Sé específico</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Indica colores, secciones, funcionalidades y estructura esperada.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Pide estructura primero</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Solicita que la IA proponga la arquitectura antes de generar código.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Itera y mejora</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  No esperes perfección al primer intento. Pide ajustes en mensajes siguientes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Artifact link */}
      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50/60 to-cyan-50/40 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-purple-100">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Artefacto generado por Claude</h3>
            <p className="text-xs text-text-secondary">Resultado real del prompt anterior — MVP funcional de EcoRuta Escolar</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-5 leading-relaxed">
          Observa cómo una instrucción bien estructurada produce una maqueta completa y navegable.
        </p>
        <a
          href="https://claude.ai/public/artifacts/8f6cdf14-400a-40d9-b895-a3656ccf4e9c"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Layout className="w-4 h-4" />
          Ver artefacto: EcoRuta Escolar ↗
        </a>
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────── */

export default function ProyectoPage() {
  const [openEje, setOpenEje] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-azure/8 via-background to-green/8 border-b border-border">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23000' stroke-width='.5'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/#evaluacion"
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-azure transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Evaluación
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-azure/10 border border-azure/20 text-xs font-medium text-azure mb-6">
              <Presentation className="w-3.5 h-3.5" />
              30% de la calificación final
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Proyecto Final
              <span className="block text-azure mt-1">Exposición por Equipos</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Propón una solución digital basada en la nube, vinculada con un eje temático social
              y el camino de especialización en Data, Machine Learning e Inteligencia Artificial.
            </p>

            {/* Quick nav buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#reglas" className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:border-azure/40 hover:shadow-sm transition-all">
                Lineamientos
              </a>
              <a href="#ejes" className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:border-green/40 hover:shadow-sm transition-all">
                Ejes temáticos
              </a>
              <a href="#mvp" className="px-4 py-2 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure/90 shadow-sm transition-all">
                Ver MVP
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Users className="w-6 h-6 text-azure mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Máx. integrantes</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Target className="w-6 h-6 text-green mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Exponen</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Clock className="w-6 h-6 text-orange mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">5<span className="text-sm font-normal ml-0.5">min</span></p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Máx. por equipo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* ═══ RUTA DE ESPECIALIZACIÓN ═══ */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Especialización: Data, ML e IA</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Todos los proyectos deben alinearse con el camino de Data, Machine Learning e Inteligencia Artificial en Google Cloud.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-green/20 bg-gradient-to-br from-green/5 to-transparent p-6 hover:border-green/40 hover:shadow-lg transition-all duration-300">
            <div className="p-3 rounded-xl bg-green/10 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-green" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Data, ML, and AI in Google Cloud
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Análisis de datos, aprendizaje automático, APIs de inteligencia artificial, procesamiento de lenguaje natural y visión.
              Tu propuesta debe integrar capacidades de ML, análisis de datos y APIs de IA para resolver el problema elegido.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["BigQuery", "Vertex AI", "Vision API", "NLP", "Translation", "TTS", "Recommendations AI"].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ REGLAS GENERALES ═══ */}
        <section id="reglas">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange/10">
              <AlertTriangle className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Reglas Generales</h2>
              <p className="text-xs text-text-secondary">Lineamientos obligatorios para todos los equipos</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reglasGenerales.map((regla, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-orange/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange/20 transition-colors">
                  <span className="text-xs font-bold text-orange">{i + 1}</span>
                </div>
                <span className="text-sm text-foreground leading-relaxed">{regla}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ EJES TEMÁTICOS ═══ */}
        <section id="ejes">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-xs font-medium text-warning mb-3">
              <Lightbulb className="w-3.5 h-3.5" />
              5 ejes · 15 escenarios reales
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Ejes Temáticos</h2>
            <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto">
              Cada eje tiene 3 escenarios con problema concreto y dos enfoques de solución. Elige uno y desarróllalo con tu equipo.
            </p>
          </div>

          <div className="space-y-3">
            {ejes.map((eje) => {
              const isOpen = openEje === eje.id;
              return (
                <div
                  key={eje.id}
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? `${eje.borderColor} shadow-md` : "border-border hover:border-gray-300"
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setOpenEje(isOpen ? null : eje.id)}
                    className={`w-full flex items-center gap-4 p-4 sm:p-5 text-left transition-colors ${
                      isOpen ? eje.bgColor : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${eje.bgColor} shrink-0`}>
                      <eje.icon className={`w-5 h-5 ${eje.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        {eje.id}. {eje.title}
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{eje.description}</p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-text-secondary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary shrink-0" />
                    )}
                  </button>

                  {/* Accordion content */}
                  {isOpen && (
                    <div className="p-4 sm:p-5 border-t border-border/50 bg-white space-y-5">
                      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                        Elige uno de los siguientes escenarios y resuélvelo utilizando Data, ML e Inteligencia Artificial
                      </p>

                      {eje.escenarios.map((esc, idx) => (
                        <div key={idx} className="rounded-xl border border-border overflow-hidden">
                          {/* Scenario header */}
                          <div className={`p-4 ${eje.bgColor} border-b border-border/50`}>
                            <div className="flex items-start gap-2">
                              <span className={`text-sm font-bold ${eje.color}`}>{idx + 1}.</span>
                              <div>
                                <h4 className="text-sm font-bold text-foreground">{esc.titulo}</h4>
                                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{esc.contexto}</p>
                              </div>
                            </div>
                          </div>

                          {/* Data, ML & AI approach - Only approach */}
                          <div className="p-4 space-y-2.5">
                            <div className="flex items-center gap-1.5">
                              <Brain className="w-3.5 h-3.5 text-green" />
                              <span className="text-[10px] font-bold text-green uppercase tracking-wider">
                                Enfoque: Data, ML & AI
                              </span>
                            </div>
                            <p className="text-xs font-medium text-foreground">{esc.data.enfoque}</p>
                            <ul className="space-y-1.5">
                              {esc.data.ideas.map((idea, i) => (
                                <li key={i} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-green shrink-0 mt-1.5" />
                                  {idea}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ MVP BLOCK ═══ */}
        <section id="mvp">
          <div className="rounded-2xl border-2 border-azure/30 bg-gradient-to-br from-azure/5 via-white to-cyan/5 overflow-hidden shadow-sm">
            {/* MVP Header */}
            <div className="p-6 sm:p-8 border-b border-azure/10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-azure/10 shrink-0">
                  <Layout className="w-7 h-7 text-azure" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Maqueta Digital tipo MVP
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-2xl">
                    Cada equipo deberá presentar una maqueta digital tipo MVP de su solución, es decir,
                    una <strong className="text-foreground">versión mínima de la plataforma</strong> que muestre de forma visual
                    cómo funcionaría y cómo ayudaría a resolver el problema elegido.
                  </p>
                </div>
              </div>
            </div>

            {/* MVP Definition */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* What is a MVP */}
              <div className="p-5 rounded-xl bg-azure/5 border border-azure/15">
                <h3 className="text-sm font-bold text-azure mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  ¿Qué es un MVP?
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  Un MVP (Minimum Viable Product) es una versión mínima del producto con un conjunto pequeño
                  de funciones esenciales que permite <strong>comunicar valor</strong> y mostrar cómo
                  resolvería el problema principal. No tiene que ser un producto terminado, pero sí debe
                  comunicar claramente valor, propósito y flujo de uso.
                </p>
              </div>

              {/* Browser mockup */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                  Tu equipo debe mostrar cómo se vería la solución funcionando
                </p>
                <div className="rounded-xl border border-border overflow-hidden shadow-sm">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md border border-border px-3 py-1 text-[10px] text-text-secondary font-mono">
                        https://mi-plataforma.ejemplo.com
                      </div>
                    </div>
                  </div>
                  {/* Mock content */}
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Sidebar */}
                      <div className="col-span-3 space-y-2">
                        <div className="h-8 rounded bg-azure/20" />
                        <div className="h-4 rounded bg-gray-100 w-3/4" />
                        <div className="h-4 rounded bg-gray-100" />
                        <div className="h-4 rounded bg-gray-100 w-5/6" />
                        <div className="h-4 rounded bg-azure/10 border border-azure/20" />
                        <div className="h-4 rounded bg-gray-100 w-2/3" />
                      </div>
                      {/* Main */}
                      <div className="col-span-9 space-y-3">
                        <div className="h-6 rounded bg-gray-200 w-1/3" />
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-20 rounded-lg bg-azure/10 border border-azure/20" />
                          <div className="h-20 rounded-lg bg-green/10 border border-green/20" />
                          <div className="h-20 rounded-lg bg-orange/10 border border-orange/20" />
                        </div>
                        <div className="h-32 rounded-lg bg-gray-50 border border-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What MVP must show */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  Qué debe mostrar tu MVP
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {mvpMustShow.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white hover:border-azure/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-azure/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-azure">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ BLOQUE IA ═══ */}
        <section>
          <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-purple-100 shrink-0">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Uso de IA
                </h2>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-2xl">
                  Google Cloud ofrece APIs de IA para tareas como texto, voz, traducción e imágenes. 
                  Es coherente que pienses soluciones apoyadas en capacidades inteligentes y que 
                  construyas tu prototipo con herramientas generativas.
                </p>
              </div>
            </div>

            {/* Infinite logo carousel */}
            <div className="relative mb-8 overflow-hidden rounded-xl bg-white/60 border border-purple-100 py-6">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />
              <div className="flex animate-carousel">
                {[...Array(2)].map((_, setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-12 px-6">
                    {[
                      { name: "Claude", logo: "/assets/claudeLogo.png" },
                      { name: "Antigravity", logo: "/assets/antigravityLogo.png" },
                      { name: "Cursor", logo: "/assets/cursorLogo.png" },
                      { name: "GitHub Copilot", logo: "/assets/copilotLogo.png" },
                    ].map((tool) => (
                      <div
                        key={`${setIdx}-${tool.name}`}
                        className="flex flex-col items-center gap-2 shrink-0 w-24 group"
                      >
                        {tool.logo ? (
                          <div className="w-14 h-14 rounded-xl bg-white border border-purple-100 shadow-sm flex items-center justify-center p-2 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tool.logo} alt={tool.name} className="w-10 h-10 object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            <span className="text-base font-bold text-purple-500">{tool.name.charAt(0)}</span>
                          </div>
                        )}
                        <span className="text-[10px] font-medium text-text-secondary whitespace-nowrap">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-purple-700 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Tu equipo puede:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Pedir a una IA que genere la estructura de la web",
                    "Solicitar pantallas tipo plataforma",
                    "Construir un MVP con HTML, CSS y JS",
                    "Editar y personalizar lo generado",
                    "Explicar qué partes del prototipo representan funciones reales",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                <p className="text-sm text-foreground leading-relaxed">
                  Preferentemente <strong>HTML, CSS y JavaScript</strong>, aunque no está prohibido usar 
                  otras herramientas si el resultado permite simular bien la solución.
                </p>
              </div>
            </div>

            {/* ─── Prompt Ejemplo (inline) ─── */}
            <PromptEjemploInline />
          </div>
        </section>

        {/* ═══ ENTREGABLES ═══ */}
        <section>
          <div className="mb-8 rounded-2xl border border-azure/25 bg-azure/5 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-azure/15 shrink-0">
                <FileText className="w-5 h-5 text-azure" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Entregable</h2>
                <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                  Entregar en el SEA un documento con la propuesta completa del proyecto y el link de la maqueta digital tipo MVP.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green/10">
              <CheckCircle2 className="w-5 h-5 text-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Qué debe incluir cada propuesta</h2>
              <p className="text-xs text-text-secondary">Elementos que deben estar presentes en la exposición</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {entregables.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3.5 rounded-xl border bg-white hover:shadow-sm transition-all ${
                  i === entregables.length - 1
                    ? "border-azure/30 bg-azure/5 sm:col-span-2"
                    : "border-border"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  i === entregables.length - 1 ? "bg-azure/20" : "bg-green/10"
                }`}>
                  <span className={`text-[10px] font-bold ${
                    i === entregables.length - 1 ? "text-azure" : "text-green"
                  }`}>{i + 1}</span>
                </div>
                <span className={`text-sm leading-relaxed ${
                  i === entregables.length - 1 ? "text-foreground font-medium" : "text-foreground"
                }`}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ RÚBRICA ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-azure/10">
              <Target className="w-5 h-5 text-azure" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Rúbrica de evaluación del proyecto (30%)</h2>
              <p className="text-xs text-text-secondary">Así se calificará su Proyecto Final durante la exposición</p>
            </div>
          </div>

          <div className="space-y-3">
            {rubricaProyecto.map((item, i) => (
              <div key={item.criterio} className="rounded-xl border border-border bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-azure/15 text-azure text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{item.criterio}</h3>
                  </div>
                  <span className="text-xs font-bold text-azure bg-azure/10 px-2 py-1 rounded-full">
                    {item.puntos} pts
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed pl-8">
                  {item.detalle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-azure/25 bg-azure/5 p-4">
            <p className="text-sm text-foreground font-medium">
              Puntaje total de la rúbrica: 30 puntos (equivale al 30% de la calificación final).
            </p>
          </div>
        </section>

        {/* ═══ FOOTER CTA ═══ */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">
            ¿Listo para comenzar? Reúne a tu equipo, elige un eje y un camino de especialización.
          </p>
          <Link
            href="/#evaluacion"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure/90 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Evaluación
          </Link>
        </div>
      </div>
    </main>
  );
}
