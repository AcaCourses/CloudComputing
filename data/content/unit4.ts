import { TopicContent } from "./unit1";

export const unit4Content: TopicContent[] = [
  {
    slug: "que-es-evento",
    title: "Qué es un evento",
    readingTime: "10 min",
    objectives: [
      "Comprender qué significa un evento dentro de un sistema cloud y por qué es una unidad clave para la automatización y la integración",
      "Identificar que un evento representa un hecho ocurrido o un cambio de estado, no una aplicación completa ni una acción manual",
      "Relacionar eventos con escenarios reales de Google Cloud, como subida de archivos, publicación de mensajes o cambios en recursos",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si un archivo se sube, una compra se registra o una máquina cambia de estado, ¿cómo se entera el resto del sistema de que algo ocurrió?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Un evento es el registro de algo que ya pasó dentro de un sistema: una acción del usuario, un cambio en un dato, la creación de un recurso o la llegada de un mensaje. En arquitecturas modernas, los eventos funcionan como señales que otros componentes pueden observar para reaccionar sin necesidad de estar preguntando constantemente si hubo cambios.",
      },
      {
        type: "text",
        title: "El evento no es toda la acción",
        content:
          "Para entender los eventos, conviene dejar claro que un evento no es 'todo el proceso', sino el suceso que dispara una reacción. Subir un archivo no es toda la aplicación; es un hecho puntual que puede provocar varias respuestas: validación, notificación, procesamiento o almacenamiento adicional. Muchos sistemas cloud no funcionan por consulta constante (polling), sino por reacción a sucesos detectables.",
      },
      {
        type: "text",
        content:
          "Google Cloud describe los eventos como cambios de estado que pueden ser emitidos, transportados y consumidos por distintos componentes. Esa idea es muy poderosa porque muestra que una plataforma cloud no solo ejecuta tareas, sino que también escucha lo que ocurre y puede reaccionar de forma distribuida. Así, el evento se convierte en la pieza mínima que conecta servicios sin acoplarlos demasiado.",
      },
      {
        type: "text",
        content:
          "Un evento no siempre implica algo 'grande'. Puede ser tan simple como que llegó un mensaje a un tema, se actualizó un registro o alguien hizo clic en enviar. Lo importante no es el tamaño del hecho, sino que el sistema pueda reconocerlo y responder de forma consistente. Los eventos son inmutables: representan algo que ya ocurrió y no se modifica después.",
      },
      {
        type: "eventMapper",
      },
      {
        type: "tabs",
        title: "Eventos en sistemas cloud",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Un evento tiene cuatro elementos: (1) la acción que ocurrió, (2) el registro inmutable del hecho (el evento en sí), (3) un canal por donde se transporta, y (4) consumidores que reaccionan. Un solo evento puede activar múltiples respuestas independientes (fan-out). Los eventos son inmutables, pueden persistirse y representan la base de sistemas desacoplados.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud genera eventos en muchos servicios: Cloud Storage emite object.finalize al subir archivos; Firestore emite document.create/update/delete; Pub/Sub transporta mensajes como eventos; Cloud Audit Logs registra acciones administrativas. Eventarc enruta estos eventos hacia Cloud Run, Cloud Run functions o GKE. Formato estándar: CloudEvents.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "Equivalencia conceptual: AWS también trabaja con eventos — S3 emite eventos al subir objetos, DynamoDB Streams captura cambios, CloudTrail registra acciones de API. EventBridge actúa como bus de eventos central que enruta a Lambda, SQS o Step Functions. El concepto de evento inmutable y desacoplamiento es idéntico al de GCP.",
          },
        ],
      },
      {
        type: "table",
        title: "Anatomía de un evento cloud",
        headers: ["Elemento", "Qué significa", "Ejemplo en GCP", "Ejemplo en AWS"],
        rows: [
          ["Acción", "Algo que ocurre en el sistema", "Subir archivo a Cloud Storage", "Upload a S3"],
          ["Evento", "Registro inmutable del hecho", "object.finalize", "s3:ObjectCreated"],
          ["Canal", "Medio de transporte", "Pub/Sub topic / Eventarc", "EventBridge / SNS"],
          ["Consumidor", "Servicio que reacciona", "Cloud Run function", "Lambda"],
          ["Respuesta", "Acción resultante", "Validar, transformar, notificar", "Procesar, almacenar, alertar"],
        ],
      },
      {
        type: "scenario",
        title: "Detecta el evento",
        scenarios: [
          {
            situation: "Un estudiante sube un PDF de tarea a la plataforma educativa. El sistema debe validar el formato, notificar al profesor y registrar la entrega.",
            question: "¿Cuál es la acción, cuál es el evento y cuáles son las reacciones?",
            hint: "Acción = subir PDF. Evento = archivo_creado. Reacciones = validar + notificar + registrar (3 consumidores independientes).",
          },
          {
            situation: "Un administrador elimina una VM de desarrollo desde la consola de Google Cloud.",
            question: "¿Genera esto un evento? ¿Quién podría consumirlo?",
            hint: "Sí — Cloud Audit Logs registra la eliminación. Un consumidor podría ser una alerta de seguridad o un sistema de compliance.",
          },
          {
            situation: "Se actualiza el estado de un pedido de 'procesando' a 'enviado' en Firestore.",
            question: "¿Qué evento se genera y qué podría reaccionar?",
            hint: "Evento = document.update en Firestore. Reacciones posibles: notificar al cliente, actualizar inventario, generar factura.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Un evento es un registro inmutable de algo que ocurrió — un hecho, no una instrucción",
          "Los eventos permiten que servicios reaccionen sin estar preguntando constantemente (push vs polling)",
          "Un solo evento puede disparar múltiples reacciones independientes (fan-out)",
          "Google Cloud genera eventos en Storage, Firestore, Pub/Sub, Audit Logs y muchos más servicios",
          "Eventarc enruta eventos de servicios GCP hacia Cloud Run o Cloud Run functions",
          "Los eventos siguen el formato estándar CloudEvents para interoperabilidad",
          "El concepto es transversal: GCP (Eventarc/Pub/Sub), AWS (EventBridge/SNS), Azure (Event Grid)",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor un evento en cloud?",
        options: [
          {
            label: "Un servidor que siempre está encendido",
            correct: false,
            explanation: "Un servidor es infraestructura permanente. Un evento es un hecho puntual que ocurrió, no un recurso activo.",
          },
          {
            label: "Un hecho o cambio de estado que puede activar otras acciones",
            correct: true,
            explanation: "Correcto. Un evento registra que algo pasó (archivo subido, registro cambiado, mensaje recibido) y permite que otros componentes reaccionen.",
          },
          {
            label: "Una máquina virtual con sistema operativo",
            correct: false,
            explanation: "Una VM es un recurso de cómputo. Un evento es una señal de que algo ocurrió en el sistema.",
          },
          {
            label: "Una carpeta local del usuario",
            correct: false,
            explanation: "Una carpeta local no es un concepto cloud. Los eventos son señales dentro de sistemas distribuidos.",
          },
        ],
      },
    ],
  },
  {
    slug: "funciones-eventos",
    title: "Funciones que responden a eventos",
    readingTime: "11 min",
    objectives: [
      "Comprender qué es una función que responde a eventos y por qué se activa solo cuando ocurre un disparador",
      "Entender cómo Eventarc participa en la entrega de eventos a funciones en Google Cloud",
      "Relacionar funciones event-driven con casos simples de automatización y respuesta reactiva",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si ocurre algo dentro de tu sistema, ¿tiene sentido que una función esté esperando ese momento o que la reacción dependa de una intervención manual?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una función que responde a eventos es un bloque pequeño de lógica que se ejecuta automáticamente cuando ocurre un suceso relevante en el sistema. En Google Cloud, estas funciones se activan mediante eventos y activadores, y Eventarc actúa como el mecanismo que publica y enruta esos eventos hacia la función adecuada.",
      },
      {
        type: "text",
        title: "De detectar eventos a ejecutar respuestas",
        content:
          "Este tema es una evolución natural de la programación basada en eventos. Ya no hablamos solo de 'detectar que pasó algo', sino de ejecutar una acción concreta y pequeña cuando ese algo ocurre. Esa función no vive como una aplicación grande y permanente, sino como una pieza especializada que responde a un disparador y realiza una tarea específica.",
      },
      {
        type: "text",
        content:
          "Es importante comprender que serverless y evento no son lo mismo, pero trabajan juntos. El evento marca el momento de ejecución, mientras que la función contiene la lógica de respuesta. Google Cloud documenta que las funciones controladas por eventos pueden responder a fuentes como Pub/Sub, Cloud Storage, Firestore y otros eventos compatibles con Eventarc. No se trata de una función aislada, sino de un componente integrado a un ecosistema de eventos.",
      },
      {
        type: "text",
        content:
          "Este modelo favorece tareas puntuales: validar archivos, transformar datos, lanzar notificaciones, registrar cambios o reaccionar a mensajes. La función es el 'actor' que responde cuando el evento ocurre — no un proceso que deba quedarse encendido todo el tiempo. Es intencionalmente pequeña y de propósito específico.",
      },
      {
        type: "eventFunctionSimulator",
      },
      {
        type: "tabs",
        title: "Funciones event-driven en la práctica",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "El flujo completo es: (1) Evento — algo ocurre en el sistema; (2) Activador — detecta el evento y lo enruta; (3) Función — se ejecuta con la lógica de respuesta; (4) Resultado — la tarea se completa. La función no existe permanentemente: se instancia al recibir el evento y se apaga después. Esto permite pagar solo por ejecución real.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Eventarc enruta eventos de Cloud Storage (object.finalize), Firestore (document.create/update/delete), Pub/Sub (message.publish) y Cloud Audit Logs hacia Cloud Run functions. Formato: CloudEvents. Deploy: gcloud functions deploy --gen2 --trigger-event-filters=\"type=google.cloud.storage.object.v1.finalized\". También soporta triggers HTTP directos.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "Equivalencia conceptual: Lambda se activa mediante event source mappings — S3 (ObjectCreated), DynamoDB Streams, SQS, API Gateway, EventBridge rules. El patrón es el mismo: evento → trigger config → función → resultado. AWS Lambda tiene timeout de 15 min vs 60 min en GCP.",
          },
        ],
      },
      {
        type: "table",
        title: "Fuentes de eventos para funciones",
        headers: ["Fuente", "Evento típico", "GCP (Eventarc)", "AWS (Lambda trigger)"],
        rows: [
          ["Almacenamiento", "Archivo creado/eliminado", "Cloud Storage → object.finalize", "S3 → ObjectCreated"],
          ["Base de datos", "Documento creado/modificado", "Firestore → document.write", "DynamoDB Streams"],
          ["Mensajería", "Mensaje publicado", "Pub/Sub → message.publish", "SQS / SNS"],
          ["HTTP", "Solicitud entrante", "HTTP trigger directo", "API Gateway → Lambda"],
          ["Programado", "Hora/cron ejecutado", "Cloud Scheduler → Pub/Sub → function", "EventBridge Scheduler"],
          ["Auditoría", "Acción administrativa", "Cloud Audit Logs → Eventarc", "CloudTrail → EventBridge"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué dispara la función?",
        scenarios: [
          {
            situation: "Un estudiante sube una imagen de su credencial. El sistema debe verificar que sea PNG o JPG y que pese menos de 5MB.",
            question: "¿Qué evento dispara la función y qué haría?",
            hint: "Evento: object.finalize en Storage. Función: validar tipo MIME y tamaño. Si no cumple → rechazar y notificar.",
          },
          {
            situation: "Un microservicio publica un mensaje con los datos de un pedido nuevo. Otro servicio debe generar la factura.",
            question: "¿Cómo se conectan mediante evento y función?",
            hint: "Evento: message.publish en Pub/Sub. Función: recibe payload del pedido → genera factura → guarda en Storage.",
          },
          {
            situation: "Cada vez que se actualiza el perfil de un usuario en Firestore, se debe sincronizar con el sistema de email marketing.",
            question: "¿Qué tipo de trigger usarías?",
            hint: "Trigger: document.update en Firestore vía Eventarc. Función: lee el perfil actualizado → llama API del servicio de email.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Una función event-driven se ejecuta solo cuando ocurre un evento — no vive encendida permanentemente",
          "Eventarc enruta eventos de servicios GCP hacia Cloud Run functions automáticamente",
          "El diseño de estas funciones es intencionalmente pequeño: una tarea, un propósito",
          "Fuentes comunes: Cloud Storage, Firestore, Pub/Sub, HTTP, Cloud Scheduler, Audit Logs",
          "El formato estándar CloudEvents permite interoperabilidad entre servicios",
          "Serverless + eventos = función que existe solo durante la ejecución y paga por uso real",
          "AWS Lambda usa el mismo patrón con event source mappings (S3, DynamoDB, SQS, API Gateway)",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor una función que responde a eventos?",
        options: [
          {
            label: "Una aplicación que corre todo el tiempo sin disparadores",
            correct: false,
            explanation: "Eso describe una app tradicional siempre encendida. Las funciones event-driven solo se activan cuando ocurre el evento.",
          },
          {
            label: "Un bloque de código pequeño que se activa cuando ocurre un evento",
            correct: true,
            explanation: "Correcto. La función responde a un disparador específico, ejecuta una tarea puntual y termina. No necesita estar encendida permanentemente.",
          },
          {
            label: "Un clúster de contenedores coordinado",
            correct: false,
            explanation: "Eso describe orquestación (Kubernetes). Las funciones event-driven son unidades individuales mucho más simples.",
          },
          {
            label: "Un archivo estático sin lógica",
            correct: false,
            explanation: "Un archivo estático no ejecuta código. Las funciones contienen lógica activa que procesa eventos.",
          },
        ],
      },
    ],
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    readingTime: "11 min",
    objectives: [
      "Comprender qué significa automatizar procesos en un entorno cloud",
      "Relacionar automatización con eventos, funciones y respuestas sin intervención manual",
      "Identificar casos donde la automatización reduce tareas repetitivas y mejora consistencia",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si una misma acción debe repetirse muchas veces cuando ocurre un evento, ¿por qué hacerla manualmente cada vez?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "La automatización es la capacidad de hacer que un sistema ejecute tareas por sí mismo cuando se cumplen ciertas condiciones o se produce un evento. En Google Cloud, esto puede materializarse mediante funciones, activadores y otros mecanismos que reaccionan a cambios, datos o disparadores del sistema.",
      },
      {
        type: "text",
        title: "De la señal a la cadena de acciones",
        content:
          "La automatización es el punto donde el evento deja de ser solo una señal y se convierte en una cadena útil de acciones. En lugar de revisar manualmente si ocurrió algo, el sistema se encarga de detectar el evento y ejecutar la respuesta apropiada. Ese cambio es enorme porque muestra cómo cloud no solo almacena o ejecuta, sino que también coordina procesos completos sin intervención humana.",
      },
      {
        type: "text",
        content:
          "Google Cloud ofrece distintas formas de automatización: funciones activadas por eventos (Cloud Run functions), herramientas de orquestación de pasos (Workflows), tareas programadas (Cloud Scheduler) y tareas diferidas (Cloud Tasks). Lo más importante no es memorizar cada producto, sino entender el principio: si ocurre esto, entonces haz aquello. Esa lógica es la base de automatizaciones modernas.",
      },
      {
        type: "text",
        content:
          "La diferencia entre un proceso manual y uno automatizado es clara: manualmente, una persona revisa, valida, ejecuta y reporta. En automatización, el evento dispara la lógica y el sistema realiza la tarea de forma consistente. Esto reduce errores humanos, ahorra tiempo, hace el flujo más confiable y permite escalar sin contratar más personas para tareas repetitivas.",
      },
      {
        type: "automationBuilder",
      },
      {
        type: "tabs",
        title: "Automatización en la práctica",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "La automatización cloud sigue el patrón: (1) Evento — disparador inicial; (2) Regla/condición — evalúa si debe actuar; (3) Acción — ejecuta la respuesta automáticamente; (4) Resultado — estado final del proceso. Esto puede ser una sola función o un flujo de varios pasos orquestados. La clave es eliminar la intervención manual repetitiva.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Herramientas de automatización: Cloud Run functions (respuesta a eventos), Eventarc (enrutamiento), Cloud Scheduler (cron jobs), Workflows (orquestación multi-paso), Cloud Tasks (tareas diferidas con retry). Ejemplo completo: Scheduler dispara cada hora → function consulta API → guarda resultados en Firestore → notifica via Pub/Sub.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "Equivalencia conceptual: Lambda (funciones), EventBridge (eventos + scheduler), Step Functions (orquestación multi-paso), SQS (tareas diferidas). Ejemplo: EventBridge rule (cron) → Lambda → DynamoDB → SNS notification. El patrón 'si pasa X, haz Y' es idéntico en ambos proveedores.",
          },
        ],
      },
      {
        type: "table",
        title: "Herramientas de automatización: GCP vs AWS",
        headers: ["Necesidad", "Google Cloud", "AWS", "Patrón"],
        rows: [
          ["Reaccionar a un evento", "Cloud Run functions + Eventarc", "Lambda + EventBridge", "Evento → función → resultado"],
          ["Tarea programada (cron)", "Cloud Scheduler", "EventBridge Scheduler", "Hora → disparador → acción"],
          ["Flujo de varios pasos", "Workflows", "Step Functions", "Paso 1 → condición → paso 2 → ..."],
          ["Tarea diferida con retry", "Cloud Tasks", "SQS + Lambda", "Encolar → reintentar → completar"],
          ["Notificación fan-out", "Pub/Sub + push subs", "SNS + subscriptions", "Evento → múltiples destinos"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué proceso automatizarías?",
        scenarios: [
          {
            situation: "Cada vez que un estudiante sube un archivo de laboratorio, alguien del equipo docente revisa manualmente que sea PDF, que pese menos de 10MB y que el nombre siga un formato específico.",
            question: "¿Cómo automatizarías esto?",
            hint: "Evento: archivo subido a Storage. Función: validar tipo, tamaño y nombre. Resultado: aceptar o rechazar con notificación automática.",
          },
          {
            situation: "El equipo de operaciones revisa cada mañana si hay VMs que llevan más de 24 horas encendidas en el proyecto de desarrollo.",
            question: "¿Cómo eliminarías esa revisión manual?",
            hint: "Cloud Scheduler (cron diario) → función que lista VMs → filtra por uptime > 24h → notifica o apaga automáticamente.",
          },
          {
            situation: "Cuando un dato cambia en la base, el equipo de marketing necesita actualizar su CRM manualmente copiando información.",
            question: "¿Qué automatización implementarías?",
            hint: "Trigger: document.update en Firestore → función que lee cambio → llama API del CRM → sincroniza datos automáticamente.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Automatización = si ocurre X y se cumple Y, entonces haz Z sin intervención manual",
          "Reduce tareas repetitivas, errores humanos y tiempo de respuesta",
          "Se construye combinando eventos + condiciones + funciones + resultados",
          "GCP ofrece: Cloud Run functions, Eventarc, Cloud Scheduler, Workflows, Cloud Tasks",
          "AWS equivalente: Lambda, EventBridge, Step Functions, SQS",
          "La automatización puede ser simple (un evento → una función) o compleja (flujo multi-paso)",
          "El principio es universal e independiente del proveedor: detectar → evaluar → actuar → confirmar",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué ventaja principal tiene la automatización en cloud?",
        options: [
          {
            label: "Hace todo manualmente pero más lento",
            correct: false,
            explanation: "La automatización es lo opuesto a hacer las cosas manualmente — ejecuta tareas sin intervención humana.",
          },
          {
            label: "Reduce tareas repetitivas y responde sin intervención constante",
            correct: true,
            explanation: "Correcto. El sistema detecta eventos y ejecuta acciones automáticamente, eliminando trabajo manual repetitivo y reduciendo errores.",
          },
          {
            label: "Elimina la necesidad de eventos",
            correct: false,
            explanation: "Al contrario — la automatización se basa en eventos. Los eventos son los disparadores que activan las acciones automáticas.",
          },
          {
            label: "Obliga a usar máquinas virtuales permanentes",
            correct: false,
            explanation: "La automatización event-driven funciona con funciones serverless — no requiere máquinas permanentes.",
          },
        ],
      },
    ],
  },
  {
    slug: "despliegues",
    title: "Despliegues básicos de servicios",
    readingTime: "12 min",
    objectives: [
      "Comprender qué significa desplegar un servicio: llevar código desde tu máquina local hasta infraestructura cloud donde puede ejecutarse y recibir tráfico",
      "Identificar los destinos principales de despliegue (Cloud Run, GKE, App Engine) y cuándo elegir cada uno",
      "Visualizar el flujo completo de un despliegue: preparar app → elegir destino → ejecutar deploy → servicio disponible",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Tu código funciona en tu laptop, pero ¿cómo haces para que otros lo puedan usar por internet las 24 horas?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Desplegar (deploy) un servicio significa tomarlo de tu entorno de desarrollo local y colocarlo en una infraestructura cloud donde puede ejecutarse de forma continua, recibir tráfico de usuarios o de otros servicios, y ser administrado (escalado, monitorizado, actualizado). No es simplemente 'subir archivos' — implica elegir un destino, configurar cómo se ejecuta y garantizar que esté disponible.",
      },
      {
        type: "text",
        title: "El problema que resuelve el despliegue",
        content:
          "Mientras tu código solo vive en tu máquina, solo tú puedes ejecutarlo. No es accesible por otros, no escala, no tiene respaldo y depende de que tu computadora esté encendida. Desplegar en la nube resuelve todos estos problemas: el servicio se ejecuta en infraestructura confiable, puede atender múltiples usuarios simultáneamente y sigue funcionando aunque tú apagues tu laptop.",
      },
      {
        type: "text",
        content:
          "Google Cloud ofrece varias opciones según la complejidad de tu servicio. Para una API simple o un microservicio en contenedor, Cloud Run permite desplegar con un solo comando y obtener una URL pública. Para aplicaciones multi-componente que necesitan control de pods y networking, GKE proporciona un clúster de Kubernetes completo. Para apps web sin contenedor, App Engine acepta tu código directamente.",
      },
      {
        type: "text",
        content:
          "El flujo general siempre sigue la misma estructura: preparar tu aplicación (código + configuración), elegir un destino apropiado, ejecutar el despliegue con las herramientas del proveedor, y verificar que el servicio está accesible. La diferencia entre destinos está en cuánto control necesitas y cuánta gestión estás dispuesto a asumir.",
      },
      {
        type: "deploymentFlow",
      },
      {
        type: "tabs",
        title: "Destinos de despliegue",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            content:
              "El destino de despliegue determina cómo se ejecuta tu servicio, cuánto control tienes y qué responsabilidades asumes. Más abstracción (serverless) significa menos gestión pero menos control. Más control (Kubernetes) significa más flexibilidad pero más responsabilidad operativa.",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "Cloud Run / GKE / App Engine",
            content:
              "Cloud Run: contenedores serverless con escala a cero, ideal para APIs y microservicios. GKE: Kubernetes administrado para cargas complejas. App Engine: plataforma para apps web sin contenedor. Cloud Deploy: pipeline de entrega continua. Artifact Registry: almacén de imágenes de contenedor.",
          },
          {
            id: "aws",
            label: "Amazon Web Services",
            badge: "App Runner / EKS / Beanstalk",
            content:
              "App Runner: contenedores serverless similares a Cloud Run. ECS Fargate: contenedores sin gestionar servidores. EKS: Kubernetes administrado. Elastic Beanstalk: plataforma para apps web. CodeDeploy: entregas automatizadas. ECR: registro de imágenes de contenedor.",
          },
        ],
      },
      {
        type: "table",
        title: "Comparación de destinos de despliegue",
        headers: ["Destino", "Mejor para", "Comando típico", "Escala a cero"],
        rows: [
          ["Cloud Run / App Runner", "APIs, microservicios, contenedores", "gcloud run deploy / aws apprunner create-service", "Sí"],
          ["GKE / EKS", "Apps multi-componente, control de networking", "kubectl apply -f deployment.yaml", "No (pods mínimos)"],
          ["App Engine / Beanstalk", "Apps web sin contenedor, prototipos", "gcloud app deploy / eb deploy", "Parcial"],
        ],
      },
      {
        type: "scenario",
        title: "Elegir destino de despliegue",
        scenarios: [
          {
            situation: "Tienes una API REST en Python con Flask que procesa solicitudes de un frontend. No esperas tráfico constante — hay picos por la mañana y nada de noche.",
            question: "¿Qué destino elegirías y por qué?",
            hint: "Un servicio con tráfico variable que puede escalar a cero para no pagar cuando no hay uso → Cloud Run es ideal.",
          },
          {
            situation: "Tu aplicación tiene 5 microservicios que se comunican entre sí, necesitas service mesh, y tienes un equipo de DevOps que sabe Kubernetes.",
            question: "¿Qué destino es apropiado para esta complejidad?",
            hint: "Múltiples servicios con comunicación interna y equipo experto → GKE/EKS ofrece el control necesario.",
          },
          {
            situation: "Un estudiante quiere poner en línea su proyecto de Django en 5 minutos sin aprender Docker ni Kubernetes.",
            question: "¿Cuál es la ruta más rápida para tenerlo disponible?",
            hint: "Sin contenedor, sin Kubernetes, solo código → App Engine o Elastic Beanstalk acepta el código directamente.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del despliegue de servicios",
        items: [
          "Desplegar ≠ subir archivos — implica destino, runtime, configuración y disponibilidad",
          "Cloud Run es el punto de partida recomendado: un comando, escala automática, HTTPS incluido",
          "GKE/EKS da máximo control pero requiere gestionar clústers, pods y manifiestos YAML",
          "App Engine/Beanstalk acepta código sin contenedor — ideal para prototipos rápidos",
          "El despliegue convierte código local en un servicio accesible por URL con capacidad de escalar",
          "Cloud Deploy / CodeDeploy permiten pipelines de entrega continua para ambientes de producción",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué significa desplegar un servicio en la nube?",
        options: [
          {
            label: "Guardar tu código en un repositorio de Git",
            correct: false,
            explanation: "Guardar en Git es versionamiento, no despliegue. El código en Git no se está ejecutando ni recibiendo tráfico.",
          },
          {
            label: "Llevar tu aplicación a infraestructura cloud donde puede ejecutarse, recibir tráfico y ser administrada",
            correct: true,
            explanation: "Exacto — desplegar implica que el servicio está corriendo, es accesible y puede ser escalado y monitorizado.",
          },
          {
            label: "Comprar un servidor físico y copiar archivos por FTP",
            correct: false,
            explanation: "Eso es el modelo tradicional on-premise. El despliegue cloud usa servicios administrados sin gestionar hardware.",
          },
          {
            label: "Ejecutar el código en tu máquina con un puerto abierto",
            correct: false,
            explanation: "Eso es desarrollo local. No es confiable, no escala y depende de que tu máquina esté encendida.",
          },
        ],
      },
    ],
  },
];
