export type LabTask = {
  title: string;
  conceptNote: string;
  guidingQuestion: string;
  observation: string;
  reflection: string;
  participationQuestions: string[];
};

export type LabOverviewStep = {
  step: number;
  action: string;
  detail: string;
  icon?: string; // lucide icon name or "service:ServiceName" for GCP service SVGs
};

export type LabOverview = {
  serviceIcon: string; // path to SVG in /assets/
  serviceName: string;
  duration: string;
  level: string;
  credits: number;
  objectives: string[];
  steps: LabOverviewStep[];
  whatYouLearn: string[];
};

export type LabContent = {
  slug: string;
  labNumber: number;
  title: string;
  description: string;
  introduction: string;
  concepts: { term: string; definition: string }[];
  interactionPattern: string[];
  participationRules: string[];
  tasks: LabTask[];
  labUrl?: string;
  overview?: LabOverview;
};

export const labsContent: LabContent[] = [
  {
    slug: "create-a-virtual-machine",
    labNumber: 3,
    labUrl:"https://www.skills.google/paths/36/course_templates/153/labs/631624",
    title: "Create a Virtual Machine",
    description:
      "Creación y configuración básica de una máquina virtual en Google Compute Engine explorando zonas y regiones.",
    overview: {
      serviceIcon: "/assets/Compute Engine.svg",
      serviceName: "Compute Engine",
      duration: "25 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear una VM desde la consola de Google Cloud",
        "Crear una VM con la herramienta de línea de comandos gcloud",
        "Instalar y conectar un servidor web NGINX a tu VM",
      ],
      steps: [
        {
          step: 1,
          action: "Configurar región y zona",
          detail: "Establecer la ubicación geográfica donde vivirán tus recursos con gcloud config.",
          icon: "globe",
        },
        {
          step: 2,
          action: "Crear VM desde la consola",
          detail: "Usar la interfaz gráfica para configurar nombre, tipo de máquina (e2-medium), SO (Debian) y firewall HTTP.",
          icon: "service:Compute Engine",
        },
        {
          step: 3,
          action: "Conectarse por SSH",
          detail: "Acceder a la terminal de la VM directamente desde el navegador.",
          icon: "terminal",
        },
        {
          step: 4,
          action: "Instalar NGINX",
          detail: "Ejecutar apt-get install para levantar un servidor web y verificar con la IP externa.",
          icon: "server",
        },
        {
          step: 5,
          action: "Crear VM con gcloud",
          detail: "Reproducir la misma VM con un solo comando: gcloud compute instances create.",
          icon: "code",
        },
        {
          step: 6,
          action: "Verificar resultado",
          detail: "Confirmar ambas VMs en la lista de instancias y conectar por SSH con gcloud.",
          icon: "check-circle",
        },
      ],
      whatYouLearn: [
        "Qué es una VM y cómo se relaciona con zonas y regiones",
        "La diferencia entre crear recursos por consola vs. CLI",
        "Cómo exponer un servicio web con reglas de firewall",
        "La ventaja de gcloud para automatización y scripts",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB, porque no solo guía al estudiante a completar pasos técnicos, sino que agrega contexto conceptual, preguntas de reflexión y participación para reforzar el aprendizaje. El objetivo es que el estudiante no memorice comandos, sino que comprenda qué está haciendo al crear una VM, elegir una zona, abrir tráfico HTTP e instalar un servidor web. Compute Engine permite crear y administrar instancias desde la consola, la CLI de gcloud y otros mecanismos de gestión.\n\nTambién es importante que el estudiante reconozca que una VM no es solo \"una máquina encendida\", sino un recurso con configuración de región, zona, sistema operativo, disco y red. En Compute Engine, las instancias pertenecen a un proyecto, se crean en una zona específica y usan un sistema operativo e instancias de máquina definidos por el usuario.",
    concepts: [
      {
        term: "Región",
        definition:
          "Ubicación geográfica independiente (por ejemplo us-central1). Cada región contiene varias zonas y determina la latencia hacia los usuarios y la redundancia disponible.",
      },
      {
        term: "Zona",
        definition:
          "Subdivisión dentro de una región (por ejemplo us-central1-a). Es donde realmente vive la VM. Si una zona falla, las demás zonas de la misma región siguen operando.",
      },
      {
        term: "Instancia o VM",
        definition:
          "En Compute Engine, \"instance\", \"compute instance\" y \"VM\" se usan como términos equivalentes en la documentación.",
      },
      {
        term: "Machine type",
        definition:
          "Define CPU y memoria, por ejemplo e2-medium.",
      },
      {
        term: "HTTP (Hyper Text Transfer Protocol)",
        definition:
          "Protocolo de comunicación que usan los navegadores web para pedir páginas a un servidor web. Funciona en el puerto 80 (o 443 para HTTPS cifrado). Cuando escribes una URL en el navegador, estás usando HTTP para hablar con el servidor.",
      },
      {
        term: "Servidor web",
        definition:
          "Es una máquina (en este caso, tu VM) que corre un programa capaz de recibir pedidos HTTP (preguntas) de navegadores y responder con páginas web. NGINX es un servidor web — está a la escucha esperando que alguien desde el navegador le pida un archivo.",
      },
      {
        term: "SSH (Secure Shell)",
        definition:
          "Protocolo de red seguro que te permite conectarte por terminal a una máquina remota como si estuvieras sentado frente a ella. La conexión está cifrada (encriptada) para que nadie pueda ver lo que escribes. En Google Cloud, puedes abrir una sesión SSH directamente desde el navegador sin necesidad de herramientas adicionales.",
      },
      {
        term: "Firewall",
        definition:
          "Regla de seguridad que controla qué tráfico de red entra y sale de una máquina. Es como un guardia que decide: 'este tráfico entra, aquel no'. Sin una regla de firewall que permita el puerto 80, aunque tu servidor web esté corriendo, nadie podrá conectarse desde el navegador.",
      },
      {
        term: "Puerto",
        definition:
          "Un número que identifica un servicio en la máquina. El puerto 80 es para HTTP (navegador web), el puerto 22 es para SSH (terminal remota), el puerto 443 es para HTTPS (web seguro). Es como las puertas de un edificio — cada puerta lleva a un servicio diferente.",
      },
      {
        term: "NGINX",
        definition:
          "Servidor web ligero y muy rápido. Cuando lo instalas en tu VM con 'apt-get install nginx', el programa se pone a escuchar en el puerto 80. Cuando visitas http://IP-externa-de-tu-VM desde el navegador, NGINX recibe la solicitud HTTP y responde con su página por defecto.",
      },
      {
        term: "Cloud Shell",
        definition:
          "Es un entorno de terminal (terminal significa línea de comandos) que Google proporciona en la consola web. Ya viene con herramientas instaladas como gcloud, kubectl y otras. No necesitas instalar nada en tu computadora — todo está listo para usar.",
      },
    ],
    interactionPattern: [
      "Antes de la tarea: una pregunta guía breve.",
      "Durante la tarea: una nota de \"observa esto\" con el concepto clave.",
      "Después de la tarea: una mini reflexión o evidencia esperada.",
      "Cierre de tarea: participación oral o escrita de 2 estudiantes.",
    ],
    participationRules: [
      "Solo se participa respondiendo una pregunta.",
      "Cada pregunta la contestan 2 personas.",
      "Las preguntas son abiertas, no de opción múltiple.",
      "Deben responderse de forma breve, pero justificando con base en lo que hicieron en el laboratorio.",
      "Las preguntas se distribuyen a lo largo de las tasks para mantener atención y ritmo.",
    ],
    tasks: [
      {
        title: "Task 1: Crear la VM desde la consola",
        conceptNote:
          "La consola permite configurar visualmente todos los parámetros de una instancia: zona, tipo de máquina, SO, disco y reglas de firewall.",
        guidingQuestion:
          "¿Qué parámetros mínimos necesitas definir para crear una VM funcional?",
        observation:
          "Observa cómo la zona seleccionada determina la latencia y la disponibilidad de tu instancia.",
        reflection:
          "¿Qué acabas de configurar? Un recurso de cómputo con SO, red y reglas de acceso en una zona específica de Google Cloud.",
        participationQuestions: [
          "¿Por qué elegiste esa región y esa zona para crear la instancia?",
          "¿Qué diferencias observaste entre seleccionar e2-medium y otras opciones de máquina?",
          "¿Qué papel cumple el sistema operativo Debian dentro de la VM?",
        ],
      },
      {
        title: "Task 2: Instalar NGINX",
        conceptNote:
          "Instalar software en una VM cloud funciona igual que en cualquier servidor Linux: apt update + apt install. La diferencia es que necesitas tráfico HTTP habilitado para exponer el servicio.",
        guidingQuestion:
          "¿Qué necesitas además de instalar el paquete para que el servidor sea accesible desde Internet?",
        observation:
          "Observa que NGINX queda corriendo como servicio; puedes verificarlo con la IP externa de la VM en tu navegador.",
        reflection:
          "¿Qué acabas de configurar? Un servidor web funcional accesible por HTTP gracias a la regla de firewall que habilitaste al crear la VM.",
        participationQuestions: [
          "¿Qué cambió en la VM después de ejecutar la instalación de NGINX?",
          "¿Por qué fue necesario habilitar tráfico HTTP para que el servidor pudiera verse desde el navegador?",
        ],
      },
      {
        title: "Task 3: Crear otra VM con gcloud",
        conceptNote:
          "gcloud compute instances create logra el mismo resultado que la consola, pero de forma reproducible y scriptable. El comando incluye zona, tipo de máquina e imagen en una sola línea.",
        guidingQuestion:
          "¿Qué ventaja tiene crear una VM por comando vs. por consola cuando necesitas repetir la operación?",
        observation:
          "Observa la salida del comando: incluye nombre, zona, tipo de máquina, IP interna e IP externa de la nueva instancia.",
        reflection:
          "¿Qué acabas de configurar? La misma VM que antes, pero con un solo comando que podrías guardar en un script para automatizar.",
        participationQuestions: [
          "¿Qué ventaja viste al crear una instancia con gcloud en lugar de usar la consola?",
          "¿Qué información te devuelve el comando de creación de la VM que te ayuda a confirmar que se creó correctamente?",
        ],
      },
    ],
  },
  {
    slug: "app-engine-qwik-start-python",
    labNumber: 4,
    labUrl:"https://www.skills.google/paths/36/course_templates/153/labs/631628",
    title: "App Engine: Qwik Start - Python",
    description:
      "Despliegue rápido de una aplicación web sencilla escrita en Python utilizando el entorno administrado App Engine.",
    overview: {
      serviceIcon: "/assets/App Engine.svg",
      serviceName: "App Engine",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Desplegar una aplicación Python en App Engine",
        "Probar y modificar la app localmente antes del deploy",
        "Comprender el modelo serverless de App Engine",
      ],
      steps: [
        {
          step: 1,
          action: "Habilitar API",
          detail: "Activar App Engine Admin API desde la consola",
          icon: "Shield",
        },
        {
          step: 2,
          action: "Clonar repositorio",
          detail: "Descargar la app Hello World de Python desde GitHub",
          icon: "Download",
        },
        {
          step: 3,
          action: "Configurar entorno",
          detail: "Crear entorno virtual Python y activar dependencias",
          icon: "Terminal",
        },
        {
          step: 4,
          action: "Probar localmente",
          detail: "Ejecutar Flask en puerto 5000 y verificar respuesta",
          icon: "Play",
        },
        {
          step: 5,
          action: "Modificar código",
          detail: "Editar main.py para cambiar el mensaje de la app",
          icon: "FileEdit",
        },
        {
          step: 6,
          action: "Desplegar a producción",
          detail: "Ejecutar gcloud app deploy y acceder a la URL pública",
          icon: "Upload",
        },
      ],
      whatYouLearn: [
        "Diferencia entre probar localmente y desplegar en la nube",
        "Cómo App Engine abstrae servidores, OS y escalamiento",
        "Flujo completo: clonar → editar → probar → deploy",
        "Relación con Cloud Functions y Cloud Run como alternativas serverless",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque no se limita a seguir comandos: busca que el estudiante comprenda qué significa desplegar una aplicación en una plataforma administrada, qué parte controla el desarrollador y qué parte resuelve Google Cloud automáticamente. En App Engine standard, la aplicación corre sobre infraestructura administrada por Google con runtimes preconfigurados, lo que reduce la necesidad de gestionar servidores, sistema operativo y escalamiento manual.\n\nEn este lab, el valor formativo está en comparar tres momentos del trabajo real de desarrollo: probar localmente, modificar el código y desplegar a producción. Cloud Shell ofrece acceso autenticado al proyecto y permite ejecutar gcloud, editar archivos y desplegar desde un entorno listo para usar.\n\nAquí no solo se despliega una app en Python: también se analiza cómo App Engine permite concentrarse en el código mientras Google Cloud abstrae la infraestructura, el runtime administrado y buena parte de la operación del despliegue.",
    concepts: [
      {
        term: "API (Application Programming Interface)",
        definition:
          "Interfaz que permite que un programa se comunique con otro por HTTP. Es como un contrato: 'si me envías una solicitud HTTP a esta URL, yo te respondo con esta información'. Tu app Flask crea una API: cuando el navegador pide http://localhost:5000/hello, Flask responde con 'Hello World'.",
      },
      {
        term: "Flask",
        definition:
          "Framework (herramienta) de Python para crear aplicaciones web. Es ligero y fácil — con pocas líneas de código puedes crear una API que responde a solicitudes HTTP. En este lab usas Flask; otros frameworks similares son Django (Python), Express (Node.js), FastAPI (Python).",
      },
      {
        term: "Ambiente virtual (Virtual Environment)",
        definition:
          "Carpeta aislada de Python en tu máquina donde instalar solo las librerías que tu proyecto necesita, sin afectar el Python global del sistema operativo. Es como una 'burbuja' donde puedes instalar Flask 2.0, otra app puede tener Flask 1.5, y no se interfieren. Se crea con 'python -m venv venv' y se activa antes de trabajar.",
      },
      {
        term: "Puerto",
        definition:
          "Número que identifica un servicio de red en una máquina. Puerto 80 es para HTTP (web normal), puerto 443 es para HTTPS (web seguro), puerto 5000 es un puerto común para desarrollo web en localhost. Es como decirle a Flask: 'escucha en puerto 5000', y cuando escribes http://localhost:5000 en el navegador, estás conectando al puerto 5000 de tu máquina.",
      },
      {
        term: "Localhost / 127.0.0.1",
        definition:
          "Dirección especial que significa 'tu propia máquina'. http://localhost:5000 es lo mismo que http://127.0.0.1:5000. Cuando ejecutas una app localmente (en tu máquina), escuchas en localhost. Es interno — solo tú puedes acceder desde tu navegador.",
      },
      {
        term: "Ejecutar localmente",
        definition:
          "Correr la app en tu máquina (no en la nube) para probarla antes de despliegarla. Ejemplo: 'python main.py' inicia Flask en localhost:5000. Ves los cambios al instante, debuggeas fácil, y nadie más puede acceder porque está en localhost. Es la etapa de desarrollo/testing antes del deploy.",
      },
      {
        term: "Deployment / Deploy",
        definition:
          "Publicar la app desde tu máquina local a un servidor público en la nube para que cualquiera pueda acceder. 'gcloud app deploy' sube tu código a App Engine, Google configura todo, y tu app queda en una URL pública (como miapp.appspot.com). El deploy es el paso de 'solo yo puedo verla' a 'el mundo puede verla'.",
      },
      {
        term: "App Engine",
        definition:
          "Plataforma de Google Cloud para alojar aplicaciones web sin que tengas que gestionar servidores. Subes tu código (Python, Node.js, Go, etc.), App Engine crea el entorno, lo escala automáticamente, y tu app está lista. No configuras os, ni nginx, ni nada — solo tu código.",
      },
      {
        term: "Entorno estándar",
        definition:
          "Tipo de App Engine que usa runtimes preconfigurados (Python 3.9, Node.js 16, etc.). Es más simple que Flexible: Google ya tiene todo armado, solo desplegas tu código. Escala a cero si nadie usa tu app (no pagas).",
      },
      {
        term: "Cloud Shell",
        definition:
          "Terminal web que Google te ofrece en la consola. Ya tiene gcloud instalado, Python, git, y acceso a tu proyecto. No necesitas instalar nada en tu computadora — abres Cloud Shell en el navegador y listo.",
      },
      {
        term: "Repositorio / Repository",
        definition:
          "Carpeta en GitHub (o similar) donde está el código de un proyecto. Cuando haces 'git clone', descargas el código completo a tu máquina. En este lab clonas el repo con el código de Hello World en Python.",
      },
      {
        term: "main.py",
        definition:
          "Archivo Python que contiene tu aplicación Flask. Es el 'punto de entrada' — cuando ejecutas 'python main.py', Flask comienza a escuchar en puerto 5000 y tu app está lista para recibir solicitudes HTTP.",
      },
    ],
    interactionPattern: [
      "Qué vas a hacer: acción concreta del lab.",
      "Qué significa: interpretación conceptual de esa acción.",
      "Pregunta guía: reflexión breve antes o después de ejecutar.",
      "Participación: pregunta abierta asignada a 2 estudiantes.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Todas las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente en el laboratorio.",
      "Las preguntas se distribuyen a lo largo de las tasks para mantener atención continua.",
    ],
    tasks: [
      {
        title: "Task 1: Enable Google App Engine Admin API",
        conceptNote:
          "Antes de trabajar con App Engine, es necesario habilitar la API administrativa que permite crear y gestionar versiones de la app desde la CLI.",
        guidingQuestion:
          "¿Por qué crees que Google Cloud no habilita todas las APIs por defecto en un proyecto nuevo?",
        observation:
          "Observa que habilitar una API no crea recursos: solo abre la puerta para que puedas usarlos.",
        reflection:
          "¿Qué acabas de configurar? Habilitaste el permiso para que tu proyecto pueda crear y administrar aplicaciones en App Engine.",
        participationQuestions: [
          "¿Por qué fue necesario habilitar la App Engine Admin API antes de trabajar con el despliegue de la aplicación?",
        ],
      },
      {
        title: "Task 2: Download the Hello World app",
        conceptNote:
          "Clonar un repositorio base y preparar un entorno virtual es una práctica estándar: te permite empezar con código funcional y aislarlo de otras dependencias del sistema.",
        guidingQuestion:
          "¿Qué ventajas tiene empezar desde un repositorio base en lugar de crear todo desde cero?",
        observation:
          "Observa que el entorno virtual (venv) aísla las dependencias de Python: lo que instales ahí no afecta al sistema ni a otros proyectos.",
        reflection:
          "¿Qué acabas de configurar? Un entorno de desarrollo aislado con el código base listo para probar y desplegar.",
        participationQuestions: [
          "¿Qué aprendiste del hecho de clonar un proyecto existente y preparar un entorno virtual antes de ejecutarlo?",
        ],
      },
      {
        title: "Task 3: Test the application",
        conceptNote:
          "Ejecutar la app localmente en Cloud Shell simula el comportamiento de producción, pero corre en un puerto interno que solo tú puedes ver. Esto permite validar sin publicar.",
        guidingQuestion:
          "¿Qué te permite verificar una prueba local que todavía no garantiza un despliegue exitoso?",
        observation:
          "Observa que la URL de vista previa en Cloud Shell es distinta de la URL final que tendrá la app una vez desplegada en App Engine.",
        reflection:
          "¿Qué acabas de configurar? Una prueba local que confirma que el código funciona antes de comprometerlo en producción.",
        participationQuestions: [
          "¿Qué diferencia observaste entre ejecutar la aplicación localmente en Cloud Shell y verla ya publicada en internet?",
        ],
      },
      {
        title: "Task 4: Make a change",
        conceptNote:
          "Modificar el código antes de desplegar te permite verificar el ciclo completo: editar → probar → desplegar. Esto refuerza la idea de iteración rápida.",
        guidingQuestion:
          "¿Por qué conviene hacer un cambio visible (como modificar el texto de salida) antes de desplegar por primera vez?",
        observation:
          "Observa que editar main.py y volver a probar localmente confirma que el cambio funciona antes de que llegue al entorno público.",
        reflection:
          "¿Qué acabas de configurar? Una modificación controlada que podrás rastrear una vez que la app esté desplegada.",
        participationQuestions: [
          "¿Por qué es importante probar un cambio pequeño en main.py antes de desplegar la aplicación?",
        ],
      },
      {
        title: "Task 5: Deploy your app",
        conceptNote:
          "gcloud app deploy empaqueta tu código, lo sube a App Engine y crea una nueva versión. App Engine abstrae la gestión de servidores e infraestructura operativa en el entorno estándar.",
        guidingQuestion:
          "¿Qué implica que App Engine sea una plataforma serverless para el trabajo del desarrollador?",
        observation:
          "Observa que durante el deploy no elegiste zona, VM ni sistema operativo: App Engine tomó esas decisiones por ti.",
        reflection:
          "¿Qué acabas de configurar? Un despliegue completo donde tú controlaste el código y App Engine controló toda la infraestructura.",
        participationQuestions: [
          "Cuando ejecutaste gcloud app deploy, ¿qué parte del proceso crees que siguió dependiendo de ti y qué parte quedó automatizada por App Engine?",
        ],
      },
      {
        title: "Task 6: View your application",
        conceptNote:
          "La URL final de App Engine es gestionada por Google Cloud y accesible públicamente. Es distinta de la vista previa local del puerto usado en Cloud Shell.",
        guidingQuestion:
          "¿Cómo confirmas que lo que ves en la URL pública corresponde exactamente al código que desplegaste?",
        observation:
          "Observa que la URL sigue el patrón PROJECT_ID.REGION_ID.r.appspot.com — tu proyecto y región están codificados en ella.",
        reflection:
          "¿Qué acabas de configurar? La verificación final de que tu app está en producción, accesible y mostrando el cambio que hiciste.",
        participationQuestions: [
          "Después de abrir la URL final de la app, ¿qué evidencia te confirmó que el cambio hecho localmente sí llegó al entorno desplegado?",
        ],
      },
    ],
  },
  {
    slug: "cloud-run-functions-qwik-start-command-line",
    labNumber: 5,
    labUrl:"https://www.skills.google/paths/36/course_templates/153/labs/631631",
    title: "Cloud Run Functions: Qwik Start - Command Line",
    description:
      "Creación y despliegue de una función serverless orientada a eventos mediante la interfaz de comandos.",
    overview: {
      serviceIcon: "/assets/Cloud Run.svg",
      serviceName: "Cloud Run Functions",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear una Cloud Run function activada por eventos Pub/Sub",
        "Desplegar y probar la función desde la línea de comandos",
        "Verificar la ejecución mediante logs en la nube",
      ],
      steps: [
        {
          step: 1,
          action: "Crear directorio y código",
          detail: "Escribir index.js con el handler helloPubSub y package.json",
          icon: "FileCode",
        },
        {
          step: 2,
          action: "Instalar dependencias",
          detail: "Ejecutar npm install para el Functions Framework",
          icon: "Download",
        },
        {
          step: 3,
          action: "Desplegar función",
          detail: "Usar gcloud functions deploy con trigger-topic Pub/Sub",
          icon: "Upload",
        },
        {
          step: 4,
          action: "Publicar mensaje",
          detail: "Enviar un mensaje al tema cf-demo con gcloud pubsub",
          icon: "Send",
        },
        {
          step: 5,
          action: "Verificar logs",
          detail: "Leer los logs de la función para confirmar la ejecución",
          icon: "FileSearch",
        },
      ],
      whatYouLearn: [
        "Modelo event-driven: la función solo se ejecuta cuando ocurre un evento",
        "Pub/Sub como sistema de mensajería asíncrona que desacopla emisor y receptor",
        "Despliegue serverless sin administrar infraestructura",
        "Observabilidad: verificar ejecución mediante gcloud functions logs",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque amplía la práctica técnica con explicaciones conceptuales sobre cómputo serverless, eventos, mensajería asíncrona y observabilidad mediante logs. En Cloud Run functions, el estudiante se concentra en escribir y desplegar código, mientras la plataforma administra la infraestructura subyacente y ejecuta la función cuando ocurre el evento configurado.\n\nA diferencia de una aplicación que permanece ejecutándose continuamente, aquí el código responde solo cuando algo sucede, por ejemplo la publicación de un mensaje en un tema de Pub/Sub. Pub/Sub es un servicio de mensajería asíncrona y administrada que desacopla productores y consumidores de mensajes.\n\nA lo largo de la actividad, el estudiante crea una función, la despliega, publica un mensaje en Pub/Sub y verifica mediante logs que el evento activó correctamente la ejecución del código. Cloud Run functions permite precisamente ese patrón: reaccionar a eventos sin administrar servidores de forma directa.",
    concepts: [
      {
        term: "Evento",
        definition:
          "Un suceso que ocurre en un sistema y desencadena una acción. Ejemplos: un usuario sube un archivo, llega un mensaje a una cola, se cumple una hora programada. En este lab, el evento es 'un mensaje fue publicado en Pub/Sub' — cuando eso ocurre, la función se ejecuta automáticamente.",
      },
      {
        term: "Tópico (Topic)",
        definition:
          "Canal de comunicación en Pub/Sub donde los productores publican mensajes. Es como un buzón — los productores ponen mensajes adentro, los consumidores (funciones) los leen. En el lab creas un tópico 'cf-demo' y publicas mensajes allí.",
      },
      {
        term: "Mensaje",
        definition:
          "Datos que un productor envía a un tópico en Pub/Sub. Es el contenido que se transmite. En el lab publicas un mensaje con un nombre (ej: 'World') en el tópico 'cf-demo', y la función lo recibe y responde.",
      },
      {
        term: "Pub/Sub (Publish/Subscribe)",
        definition:
          "Servicio de mensajería asíncrona de Google Cloud que desacopla productores y consumidores. Productores publican mensajes en tópicos, consumidores se suscriben y reciben. Es asíncrono porque el productor no espera a que el consumidor procese — solo publica y sigue. Ideal para procesamiento event-driven.",
      },
      {
        term: "Trigger",
        definition:
          "Lo que causa que una función se ejecute. En el lab, el trigger es Pub/Sub — la función se ejecuta cada vez que hay un mensaje en el tópico. Otros triggers posibles: HTTP (alguien hace request), Cloud Storage (archivo subido), Cloud Scheduler (hora programada).",
      },
      {
        term: "Node.js",
        definition:
          "Entorno de ejecución de JavaScript fuera del navegador. Permite escribir backend y scripts en JavaScript. En el lab escribes la función en JavaScript/Node.js ( index.js). Node.js es popular para APIs y funciones serverless porque es ligero y rápido.",
      },
      {
        term: "Runtime",
        definition:
          "Entorno que ejecuta tu código. Ejemplos: Python 3.9, Node.js 16, Go 1.16. El runtime incluye el intérprete (programa que convierte tu código en instrucciones) y librerías base. Cuando desplegas, especificas el runtime. Google Cloud ya lo tiene configurado — solo instalas tus dependencias.",
      },
      {
        term: "Entry Point",
        definition:
          "Función específica que Google Cloud llama cuando se ejecuta tu código. En Node.js es el nombre de la función exportada. En el lab el entry point es 'helloPubSub' — es el nombre de la función que recibe el mensaje de Pub/Sub. Google Cloud busca esa función y la ejecuta cuando llega el evento.",
      },
      {
        term: "Deployment / Despliegue",
        definition:
          "Proceso de publicar tu código en la nube para que se ejecute allá. 'gcloud functions deploy' toma tu código local, lo sube, configura el trigger (Pub/Sub), y la función queda lista. A diferencia del despliegue web (que sigue corriendo), Cloud Functions solo se ejecuta cuando ocurre el evento.",
      },
      {
        term: "Cloud Shell",
        definition:
          "Terminal web integrada en Google Cloud con herramientas preinstaladas (gcloud, node, npm, etc.). No necesitas configurar nada en tu computadora — abres Cloud Shell y ejecutas comandos directamente.",
      },
      {
        term: "package.json",
        definition:
          "Archivo JavaScript que lista dependencias del proyecto y metadatos. Define qué librerías necesita tu código (ej: '@google-cloud/functions-framework'). Cuando ejecutas 'npm install', lee este archivo e instala todo.",
      },
      {
        term: "Logs",
        definition:
          "Registros de lo que pasó cuando la función se ejecutó. Google Cloud guarda automáticamente logs: qué entrada recibió, qué salida produjó, cuánto tardó, si hubo error. Con 'gcloud functions logs read' ves ese histórico — así verificas que la función respondió al evento.",
      },
    ],
    interactionPattern: [
      "Antes de ejecutar: \"¿Qué evento esperas que dispare la función?\"",
      "Durante la tarea: \"Observa qué parámetro define el trigger.\"",
      "Después de la tarea: \"¿Qué evidencia confirma que la función sí respondió?\"",
      "Participación: pregunta abierta para 2 estudiantes.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben ser 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks del laboratorio.",
    ],
    tasks: [
      {
        title: "Task 1: Create a function",
        conceptNote:
          "La función helloPubSub dentro de index.js es código que solo se ejecuta cuando un evento la activa. Cloud Run functions puede ejecutar funciones dirigidas por eventos cuando se define un trigger adecuado. El Functions Framework registra y ejecuta la función escrita en Node.js.",
        guidingQuestion:
          "¿Qué diferencia hay entre escribir una aplicación completa y escribir una función que responde a un evento?",
        observation:
          "Observa que la función recibe un objeto evento con los datos del mensaje — no se ejecuta sola, necesita un trigger.",
        reflection:
          "¿Qué acabas de configurar? Una función serverless lista para responder a eventos de Pub/Sub, con sus dependencias instaladas.",
        participationQuestions: [
          "¿Qué entendiste sobre el papel de helloPubSub dentro del archivo index.js y por qué esa función depende de un evento para ejecutarse?",
          "¿Por qué fue necesario instalar dependencias con npm install antes de desplegar la función?",
        ],
      },
      {
        title: "Task 2: Deploy your function",
        conceptNote:
          "El comando gcloud functions deploy empaqueta el código, lo sube y configura el trigger. Los triggers forman parte de la configuración del despliegue y determinan cómo se invoca la función.",
        guidingQuestion:
          "¿Qué información del comando de despliegue define el entorno de ejecución?",
        observation:
          "Observa los parámetros del comando: runtime, trigger-topic y entry-point definen todo el contexto de ejecución sin que toques un servidor.",
        reflection:
          "¿Qué acabas de configurar? Una función desplegada, vinculada a un tópico de Pub/Sub, lista para activarse con cada mensaje publicado.",
        participationQuestions: [
          "Al desplegar la función con gcloud functions deploy, ¿qué parte del comportamiento quedó definida por los parámetros del comando y qué parte por el código fuente?",
        ],
      },
      {
        title: "Task 3: Test the function",
        conceptNote:
          "Publicar un mensaje en el tópico simula el evento que en producción vendría de otro servicio o sistema. Pub/Sub permite enviar mensajes entre sistemas desacoplados, y las funciones se activan cuando esos mensajes llegan al tópico configurado.",
        guidingQuestion:
          "¿Qué hace que Pub/Sub sea útil en arquitecturas desacopladas?",
        observation:
          "Observa que no invocaste la función directamente: publicaste un mensaje y la plataforma se encargó de ejecutar el código.",
        reflection:
          "¿Qué acabas de configurar? Un test end-to-end del flujo evento → función: publicaste un mensaje y la función lo procesó automáticamente.",
        participationQuestions: [
          "¿Qué relación observaste entre publicar un mensaje en el tópico cf-demo y la ejecución de la función?",
        ],
      },
      {
        title: "Task 4: View logs",
        conceptNote:
          "Los logs forman parte de la observabilidad del servicio y muestran evidencia de la ejecución y salida de la función. Sin una interfaz gráfica, los logs son tu ventana al comportamiento real.",
        guidingQuestion:
          "¿Qué puede decirte un log que no puedes ver solo con el comando de publicación?",
        observation:
          "Observa que los logs incluyen timestamp, contenido del mensaje procesado y estado de la ejecución — confirmación directa del flujo completo.",
        reflection:
          "¿Qué acabas de configurar? Verificaste mediante registros de actividad que tu función realmente respondió al evento publicado.",
        participationQuestions: [
          "¿Por qué revisar logs es una forma válida de confirmar que la función sí respondió al evento aunque no hayas visto una interfaz gráfica?",
        ],
      },
      {
        title: "Task 5: Test your understanding",
        conceptNote:
          "Cloud Run functions está pensado para ejecutarse bajo demanda y escalar según los eventos recibidos. El modelo serverless elimina la necesidad de mantener un servicio corriendo permanentemente.",
        guidingQuestion:
          "Si tu función recibiera 1000 mensajes simultáneos, ¿quién se encargaría de escalar las ejecuciones?",
        observation:
          "Observa el contraste: en una VM tú administras el servidor; con funciones serverless, la plataforma escala, ejecuta y detiene automáticamente.",
        reflection:
          "¿Qué acabas de configurar? Completaste el ciclo completo: crear → desplegar → activar → verificar, todo sin administrar un solo servidor.",
        participationQuestions: [
          "Después de completar el laboratorio, ¿cómo explicarías con tus propias palabras qué ventaja tiene una función serverless frente a un servicio que debe permanecer ejecutándose todo el tiempo?",
        ],
      },
    ],
  },
  {
    slug: "google-kubernetes-engine-qwik-start",
    labNumber: 6,
    labUrl:"https://www.skills.google/paths/36/course_templates/153/labs/631634",
    title: "Google Kubernetes Engine: Qwik Start",
    description:
      "Despliegue y escalado de una aplicación contenedorizada dentro de un entorno gestionado con Kubernetes.",
    overview: {
      serviceIcon: "/assets/Google Kubernetes Engine.svg",
      serviceName: "Google Kubernetes Engine",
      duration: "25 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear un clúster GKE con nodos Compute Engine",
        "Desplegar una aplicación contenedorizada en el clúster",
        "Exponer la app a Internet mediante un Service LoadBalancer",
      ],
      steps: [
        {
          step: 1,
          action: "Configurar zona",
          detail: "Establecer región y zona predeterminada con gcloud config",
          icon: "MapPin",
        },
        {
          step: 2,
          action: "Crear clúster",
          detail: "Crear un clúster GKE con máquinas e2-medium y 3 nodos",
          icon: "Server",
        },
        {
          step: 3,
          action: "Obtener credenciales",
          detail: "Autenticarse con get-credentials para interactuar vía kubectl",
          icon: "Key",
        },
        {
          step: 4,
          action: "Desplegar aplicación",
          detail: "Crear un Deployment con la imagen hello-app desde Container Registry",
          icon: "Upload",
        },
        {
          step: 5,
          action: "Exponer servicio",
          detail: "Crear un Service tipo LoadBalancer en puerto 8080",
          icon: "Globe",
        },
        {
          step: 6,
          action: "Eliminar clúster",
          detail: "Borrar el clúster para liberar recursos del proyecto",
          icon: "Trash2",
        },
      ],
      whatYouLearn: [
        "Relación entre clúster, nodos, Deployments y Services en Kubernetes",
        "Cómo GKE abstrae la gestión de infraestructura de contenedores",
        "Exposición de cargas de trabajo a Internet con LoadBalancer",
        "Ciclo completo: crear clúster → desplegar → exponer → eliminar",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque permite entender, paso a paso, cómo Kubernetes organiza el despliegue de aplicaciones en clústeres administrados por Google Cloud. En GKE, el estudiante no solo ejecuta comandos: también observa la relación entre clúster, nodos, Deployment y Service, que son piezas centrales de la arquitectura.\n\nAdemás, el laboratorio sirve para conectar contenedores con red y acceso externo. Un Deployment gestiona la aplicación, mientras que un Service de tipo LoadBalancer expone la carga de trabajo hacia Internet mediante balanceo de carga en Google Cloud.\n\nDurante la práctica, el estudiante configura la zona, crea un clúster, obtiene credenciales, despliega una aplicación, la expone mediante un Service y finalmente elimina el clúster. GKE proporciona la infraestructura administrada para ejecutar estos pasos dentro de un entorno de Kubernetes sobre Google Cloud.",
    concepts: [
      {
        term: "Contenedor",
        definition:
          "Paquete pequeño que contiene tu aplicación + todas sus dependencias (librerías, runtime, configuración). Es como una caja sellada — funciona igual en tu máquina, en GCP, en AWS. Docker es la herramienta más común para crear contenedores. La imagen de contenedor (ej: hello-app) es el plano; el contenedor en ejecución es la instancia.",
      },
      {
        term: "Imagen (Container Image)",
        definition:
          "Plantilla de lectura-única que define qué va dentro del contenedor. Incluye SO base, app, dependencias, archivos. En el lab reciben la imagen 'hello-app' desde Container Registry. Cuando ejecutas un contenedor a partir de una imagen, se crea una copia con estado mutable.",
      },
      {
        term: "Pod",
        definition:
          "Unidad más pequeña en Kubernetes. Un pod contiene uno o más contenedores (generalmente uno). Los contenedores en un pod comparten red — tienen la misma IP y puerto local. Si tu app necesita múltiples procesos, podrías tenerlos en diferentes contenedores dentro del mismo pod, pero es raro. En el lab, cada pod contiene un contenedor de hello-app.",
      },
      {
        term: "Cluster (Clúster de Kubernetes)",
        definition:
          "Grupo de máquinas (nodos) que trabajan juntas para ejecutar tus aplicaciones. Está formado por: Control Plane (cerebro que toma decisiones — dónde ejecutar pods, cuándo hacer scaling) y Nodos (máquinas que ejecutan los pods). En el lab creas un clúster GKE con 3 nodos (VMs de e2-medium).",
      },
      {
        term: "Control Plane",
        definition:
          "Componente del clúster que administra todo: recibe tus instrucciones (kubectl), decide dónde correr los pods, expone servicios, maneja updates. En GKE, Google administra el Control Plane — tú solo cuidas los nodos de trabajo.",
      },
      {
        term: "Node (Nodo)",
        definition:
          "Máquina dentro del clúster que ejecuta los pods. En GCP, un nodo es una instancia de Compute Engine (ej: e2-medium). En el lab creas un clúster con 3 nodos — eso significa 3 VMs donde Kubernetes distribuirá los pods de tu app.",
      },
      {
        term: "Deployment",
        definition:
          "Objeto de Kubernetes que dice 'quiero que mi aplicación corra X replicas (copias) de este pod'. El Deployment gestiona automáticamente: si un pod falla, lo reinicia; si escalas a 5 replicas, crea 5 pods idénticos; si haces rollout de nueva versión, actualiza de forma gradual sin downtime. En el lab creas un Deployment con la imagen hello-app.",
      },
      {
        term: "ReplicaSet",
        definition:
          "Lo que crea el Deployment bajo el capó. Asegura que siempre corra el número de replicas deseado. Si especificas 3 replicas y uno falla, ReplicaSet crea uno nuevo. Usualmente no hablas directamente con ReplicaSet — hablas con Deployment que lo maneja.",
      },
      {
        term: "Service (Servicio de Kubernetes)",
        definition:
          "Abstracción para exponer tus pods dentro del clúster o hacia el exterior. Porque los pods son efímeros (nacen y mueren), necesitas un punto de acceso estable. Un Service consigue una IP interna y puede exponerse nuevamente. En el lab creas un Service tipo LoadBalancer que expone la app externamente.",
      },
      {
        term: "LoadBalancer",
        definition:
          "Tipo de Service que crea un balanceador de carga en Google Cloud (IP pública) que distribuye tráfico entre tus pods. Sin balanceador, si alguien llama directamente a un pod y ese pod muere, se pierde la conexión. Con LoadBalancer, el tráfico entra por la IP pública, se balancea entre pods vivos — si un pod falla, el resto sigue sirviendo.",
      },
      {
        term: "kubectl (Kubernetes Command-Line Tool)",
        definition:
          "Herramienta de línea de comandos para controlar Kubernetes. Es tu interfaz para hablar con el clúster: crear deployments, ver pods, ver logs, escalar. Ejemplos: 'kubectl create deployment', 'kubectl get pods', 'kubectl logs POD-NAME'. En el lab usas kubectl para desplegar y gestionar la app.",
      },
      {
        term: "kubectl get-credentials",
        definition:
          "Comando que autentica tu kubectl con un clúster GKE específico. Sin esto, kubectl no sabe a qué clúster conectarse. Después de ejecutar este comando, kubectl puede comunicarse con el Control Plane del clúster para recibir tus instrucciones.",
      },
      {
        term: "Container Registry (GCR)",
        definition:
          "Servicio de Google Cloud que almacena imágenes de contenedor. Es como GitHub pero para imágenes en lugar de código. En el lab, la imagen 'hello-app' viene del Container Registry. Cuando despliegas, le dices a Kubernetes 'usa esta imagen de Registry' y él la descarga a los nodos.",
      },
      {
        term: "GKE (Google Kubernetes Engine)",
        definition:
          "Versión administrada de Kubernetes en Google Cloud. Google gestiona el Control Plane, actualizaciones, seguridad. Tú solo mantienes los nodos (VMs). Es más simple que instalar/administrar Kubernetes manualmente. En el lab usas GKE para crear un clúster listo para producción en minutos.",
      },
      {
        term: "Scaling / Escalamiento",
        definition:
          "Aumentar o disminuir replicas de un Deployment. 'kubectl scale deployment hello-app --replicas=5' crea 5 copias de tu app. Si tráfico sube, escalas horizontalmente (más replicas). Si tráfico baja, reduces replicas (ahorras dinero). Kubernetes distribuye automáticamente entre los nodos disponibles.",
      },
    ],
    interactionPattern: [
      "Configurar zona y región.",
      "Crear clúster.",
      "Obtener credenciales.",
      "Desplegar app.",
      "Exponerla con Service.",
      "Eliminar clúster.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Set a default compute zone",
        conceptNote:
          "En GKE, la ubicación determina dónde viven los recursos del clúster y sus nodos. Definir zona y región antes de crear el clúster asegura que los recursos se creen en la ubicación deseada.",
        guidingQuestion:
          "¿Qué ventaja tiene administrar una aplicación mediante Kubernetes en vez de hacerlo manualmente en cada VM?",
        observation:
          "Observa que la zona seleccionada afecta latencia, disponibilidad y costos del clúster.",
        reflection:
          "¿Qué acabas de configurar? El contexto geográfico donde vivirá tu clúster y todos sus nodos.",
        participationQuestions: [
          "¿Por qué fue importante definir la región y la zona antes de crear el clúster?",
        ],
      },
      {
        title: "Task 2: Create a GKE cluster",
        conceptNote:
          "Un clúster de GKE incluye un plano de control (administrado por Google) y nodos basados en Compute Engine. El plano de control coordina todo; los nodos ejecutan las cargas.",
        guidingQuestion:
          "¿Qué recursos de infraestructura se crean automáticamente cuando ejecutas el comando para crear un clúster?",
        observation:
          "Observa que al crear lab-cluster, GKE levanta VMs (nodos) automáticamente — no tuviste que crearlas manualmente.",
        reflection:
          "¿Qué acabas de configurar? Un clúster de Kubernetes con plano de control y nodos listos para recibir aplicaciones.",
        participationQuestions: [
          "¿Qué entiendes por clúster después de crear lab-cluster, y cómo se relaciona con los nodos que lo componen?",
        ],
      },
      {
        title: "Task 3: Get authentication credentials",
        conceptNote:
          "Las credenciales permiten que kubectl se autentique y envíe instrucciones al clúster. Sin este paso, tu terminal no puede comunicarse con el plano de control.",
        guidingQuestion:
          "¿Por qué necesitas credenciales después de crear el clúster si ya sabes que existe?",
        observation:
          "Observa que get-credentials configura tu archivo kubeconfig local para que kubectl sepa a qué clúster conectarse.",
        reflection:
          "¿Qué acabas de configurar? La autenticación entre tu terminal y el clúster para poder enviar comandos de Kubernetes.",
        participationQuestions: [
          "¿Por qué necesitas credenciales después de crear el clúster si ya sabes que existe?",
        ],
      },
      {
        title: "Task 4: Deploy an application to the cluster",
        conceptNote:
          "El Deployment maneja la aplicación (réplicas, actualizaciones, rollbacks) y el Service define cómo se accede a ella. Un Service tipo LoadBalancer crea un balanceador para dar acceso externo a la carga de trabajo.",
        guidingQuestion:
          "¿Qué cambia cuando pasas de tener un contenedor corriendo a tenerlo gestionado por un Deployment? ¿Por qué un Service es necesario aunque el contenedor ya exista dentro del clúster?",
        observation:
          "Observa que después de crear el Deployment la app existe pero no es accesible externamente hasta que creas el Service con tipo LoadBalancer.",
        reflection:
          "¿Qué acabas de configurar? Una aplicación desplegada en Kubernetes, gestionada por un Deployment y expuesta a Internet mediante un Service con balanceo de carga.",
        participationQuestions: [
          "¿Qué diferencia observaste entre crear un Deployment y exponerlo con un Service?",
          "¿Por qué el tipo LoadBalancer fue necesario para ver la aplicación desde el navegador?",
        ],
      },
      {
        title: "Task 5: Delete the cluster",
        conceptNote:
          "Eliminar recursos evita costos innecesarios y cierra el ciclo de vida del entorno creado. En un entorno de aprendizaje, esto refuerza la buena práctica de limpiar lo que ya no se usa.",
        guidingQuestion:
          "¿Qué riesgo hay si dejas un clúster de prueba activo después de terminar?",
        observation:
          "Observa que eliminar el clúster destruye todos los nodos, Deployments y Services asociados — es una operación irreversible.",
        reflection:
          "¿Qué acabas de configurar? Cerraste el ciclo completo: crear → desplegar → exponer → eliminar, demostrando control total del recurso.",
        participationQuestions: [
          "¿Qué aprendiste al eliminar el clúster al final del laboratorio y por qué es una buena práctica hacerlo?",
        ],
      },
    ],
  },
  {
    slug: "cloud-storage-qwik-start-cli-sdk",
    labNumber: 7,
    title: "Cloud Storage: Qwik Start - CLI/SDK",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631644",
    description:
      "Uso de la herramienta de línea de comandos gsutil para realizar tareas básicas de gestión de objetos en Cloud Storage.",
    overview: {
      serviceIcon: "/assets/Cloud Storage.svg",
      serviceName: "Cloud Storage",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear un bucket de almacenamiento en la nube",
        "Subir, descargar y organizar objetos en carpetas",
        "Controlar permisos de acceso público con ACLs",
      ],
      steps: [
        {
          step: 1,
          action: "Crear bucket",
          detail: "Usar gcloud storage buckets create con nombre único global",
          icon: "Database",
        },
        {
          step: 2,
          action: "Subir objeto",
          detail: "Copiar un archivo local al bucket con gcloud storage cp",
          icon: "Upload",
        },
        {
          step: 3,
          action: "Descargar objeto",
          detail: "Descargar el archivo del bucket de vuelta a Cloud Shell",
          icon: "Download",
        },
        {
          step: 4,
          action: "Organizar en carpetas",
          detail: "Copiar objetos dentro de subcarpetas lógicas en el bucket",
          icon: "FolderOpen",
        },
        {
          step: 5,
          action: "Hacer público",
          detail: "Otorgar permiso de lectura a allUsers mediante ACL",
          icon: "Globe",
        },
        {
          step: 6,
          action: "Revocar acceso y eliminar",
          detail: "Remover acceso público y borrar objetos del bucket",
          icon: "ShieldOff",
        },
      ],
      whatYouLearn: [
        "Buckets como contenedores globales de objetos en la nube",
        "Flujo comando → efecto → verificación en consola",
        "Control de acceso con ACLs (allUsers, READER)",
        "Organización lógica de objetos con carpetas en Cloud Storage",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque no solo muestra cómo usar Cloud Storage desde la línea de comandos, sino que ayuda a entender qué significa almacenar datos en la nube, cómo se organizan en buckets y cómo se controlan los permisos de acceso. Cloud Storage usa buckets como contenedores básicos de objetos, y los nombres de bucket deben ser globalmente únicos y cumplir reglas estrictas de nomenclatura.\n\nAdemás, el lab introduce una práctica muy útil en contextos reales: verificar en la consola cada acción ejecutada desde Cloud Shell. Eso permite relacionar el comando con el cambio visible en la interfaz y reforzar el modelo mental de \"comando → efecto → verificación\".\n\nEste laboratorio complementa el AB porque introduce el uso de Cloud Storage desde la línea de comandos para crear buckets, subir y descargar objetos, organizarlos en carpetas lógicas y controlar permisos de acceso. Durante la práctica, el estudiante relaciona cada comando con un cambio visible en la consola y refuerza así el flujo de trabajo entre terminal e interfaz gráfica.",
    concepts: [
      {
        term: "Bucket",
        definition:
          "Contenedor base de Cloud Storage donde se almacenan todos los objetos. Los nombres de bucket son globalmente únicos en todo Google Cloud — nadie más en el mundo puede tener un bucket con tu mismo nombre. Es como reservar un nombre de dominio, pero para almacenamiento. En el lab creas un bucket para guardar imágenes.",
      },
      {
        term: "Nomenclatura de Bucket",
        definition:
          "Reglas estrictas para nombres: solo minúsculas, números, guiones; entre 3-63 caracteres; no comenzar ni terminar con guión; no usar espacios ni caracteres especiales. Esto es porque los buckets tienen URLs públicas potenciales (ej: storage.googleapis.com/tu-bucket-name) y deben cumplir con estándares DNS.",
      },
      {
        term: "Objeto",
        definition:
          "Archivo o dato almacenado dentro de un bucket en Cloud Storage. Cada objeto tiene: contenido (bytes del archivo), nombre (path), metadatos (tamaño, tipo, fecha). A diferencia de un servidor de archivos tradicional, los objetos en Cloud Storage no se modifican 'in place' — si necesitas cambiar contenido, reemplazas el objeto completo.",
      },
      {
        term: "gs:// URI",
        definition:
          "Formato de dirección para objetos en Cloud Storage. 'gs://' significa 'Google Storage'. Ejemplo: 'gs://mi-bucket/archivo.txt' referencia el archivo 'archivo.txt' dentro de 'mi-bucket'. Es similar a cómo 'https://' y 's3://' funcionan para web y AWS S3 respectivamente. En el lab usas comandos como 'gcloud storage cp archivo.txt gs://mi-bucket'.",
      },
      {
        term: "gsutil",
        definition:
          "Herramienta de línea de comandos (CLI) para interactuar con Cloud Storage (legacy, siendo reemplazada). Permite subir, descargar, listar, eliminar objetos. Comandos: 'gsutil cp', 'gsutil ls', 'gsutil rm'. En versiones nuevas, Google recomienda usar 'gcloud storage' en su lugar.",
      },
      {
        term: "gcloud storage",
        definition:
          "Conjunto de comandos CLI modernos de Google Cloud para gestionar Cloud Storage. Más rápido y limpio que gsutil. Ejemplos: 'gcloud storage buckets create', 'gcloud storage cp archivo.txt gs://bucket/', 'gcloud storage objects list'. En el lab usas estos comandos para crear bucket, subir, descargar y organizar objetos.",
      },
      {
        term: "Prefijo / Carpeta Lógica",
        definition:
          "Cloud Storage no tiene carpetas reales (no es un sistema de archivos jerárquico). En su lugar, usa 'prefijos' — una convención de nomenclatura. Ejemplo: 'gs://mi-bucket/imagenes/foto.jpg' y 'gs://mi-bucket/documentos/resumen.pdf' — aquí 'imagenes/' y 'documentos/' son prefijos, no carpetas físicas. La consola web muestra esto como carpetas para comodidad, pero internamente son solo nombres con barras. En el lab copias un objeto a 'image-folder/', creando así un prefijo.",
      },
      {
        term: "Metadatos de Objeto",
        definition:
          "Información sobre un objeto almacenado: tamaño en bytes, tipo MIME (image/jpeg, text/plain, etc.), fecha de creación, fecha de última modificación, versión, etiquetas. Los metadatos se ven con comandos como 'gcloud storage objects describe gs://bucket/objeto'. Son útiles para organizar, auditar y entender qué contiene cada objeto sin necesidad de descargarlo.",
      },
      {
        term: "ACL (Access Control List)",
        definition:
          "Lista que define quién puede hacer qué con un bucket u objeto. En Cloud Storage hay dos niveles: ACLs de bucket (quién accede al contenedor) y ACLs de objeto (quién accede a archivos específicos). Ejemplos de identidades: tu cuenta (user-id@gmail.com), grupos (group-name@example.com), 'allUsers' (cualquiera en internet). En el lab usas ACLs para hacer público un objeto.",
      },
      {
        term: "allUsers",
        definition:
          "Identidad especial en ACLs que representa a cualquier persona en internet — autenticada o no. Si das permiso READER a 'allUsers' en un objeto, cualquiera que tenga la URL puede descargarlo sin entrar a su cuenta de Google. Es peligroso si el objeto contiene datos sensibles. En el lab deliberadamente haces público un objeto con allUsers, luego lo revocas para practicar el ciclo completo.",
      },
      {
        term: "READER (Rol de Lectura)",
        definition:
          "Permiso específico en ACLs que permite leer/descargar un objeto. No permite modificar, eliminar ni cambiar permisos. Para hacer público un objeto, asignas rol READER a 'allUsers'. Otros roles: OWNER (control total), WRITER (modificar).",
      },
      {
        term: "Cloud Shell",
        definition:
          "Terminal administrada y sin costo que Google Cloud proporciona en la consola web. Incluye gcloud, gsutil, kubectl y otras herramientas preinstaladas. No necesitas instalar nada en tu máquina. Cada sesión tiene 1 GB de almacenamiento persistente y timeout de inactividad. En el lab usas Cloud Shell para ejecutar todos los comandos de gcloud storage.",
      },
      {
        term: "Public Access / Acceso Público",
        definition:
          "Estado de un objeto que permite cualquiera leer/descargar sin autenticación. Se logra asignando READER a 'allUsers' en las ACLs. La URL pública se ve en la consola (ej: https://storage.googleapis.com/bucket/objeto o una URL con 'storage.googleapis.com'). Útil para recursos públicos (imágenes de marketing, datasets abiertos). Riesgoso si el objeto contiene datos privados.",
      },
      {
        term: "Revocar Acceso",
        definition:
          "Eliminar o restringir permisos de un usuario o de 'allUsers'. Si hiciste público un objeto pero después quieres privarlo, revocas el permiso READER a 'allUsers' mediante ACLs. En el lab lo practicas: haces público un objeto, luego lo revocas, demostrando que el control es reversible.",
      },
      {
        term: "Signed URL",
        definition:
          "URL con firma criptográfica que permite compartir acceso temporal a un objeto sin hacer público todo el bucket/objeto. La URL contiene credenciales encriptadas y fecha de expiración. Es más seguro que hacer público porque es temporal y específico. Útil para sistemas donde necesitas compartir archivos con usuarios específicos sin darles acceso permanente.",
      },
    ],
    interactionPattern: [
      "Crear bucket.",
      "Subir objeto.",
      "Descargar objeto.",
      "Copiar a carpeta.",
      "Listar contenido.",
      "Dar acceso público.",
      "Quitar acceso.",
      "Eliminar objeto.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Create a bucket",
        conceptNote:
          "Cloud Storage usa nombres globalmente visibles y compartidos en un espacio de nombres común. Los buckets son los contenedores base donde se almacenan objetos y se pueden organizar con estructuras lógicas.",
        guidingQuestion:
          "¿Qué debe pasar antes de poder guardar archivos en la nube?",
        observation:
          "Observa que el nombre del bucket debe ser único en todo Google Cloud — no solo en tu proyecto.",
        reflection:
          "¿Qué acabas de configurar? Un contenedor globalmente único donde podrás almacenar y organizar objetos.",
        participationQuestions: [
          "¿Por qué el nombre de un bucket tiene que ser único y seguir reglas tan estrictas?",
          "¿Qué relación ves entre crear un bucket y decidir desde el inicio cómo vas a organizar tus archivos dentro de él?",
        ],
      },
      {
        title: "Task 2: Upload an object into your bucket",
        conceptNote:
          "El comando gcloud storage cp copia un archivo local hacia un objeto dentro del bucket. El objeto hereda el nombre del archivo a menos que lo renombres explícitamente.",
        guidingQuestion:
          "¿Qué diferencia hay entre tener un archivo en tu máquina y tenerlo como objeto en Cloud Storage?",
        observation:
          "Observa que después del upload, el objeto aparece en la consola web bajo tu bucket — confirmación visual del comando.",
        reflection:
          "¿Qué acabas de configurar? Un objeto almacenado en la nube, accesible por URL y administrable con permisos.",
        participationQuestions: [
          "¿Qué aprendiste al descargar primero una imagen y luego subirla al bucket con gcloud storage cp?",
        ],
      },
      {
        title: "Task 3: Download an object from your bucket",
        conceptNote:
          "Descargar un objeto implica copiarlo desde el bucket hacia el entorno de trabajo. El contenido no se altera — es una copia exacta del objeto almacenado.",
        guidingQuestion:
          "¿Cuándo necesitarías descargar un objeto que tú mismo subiste?",
        observation:
          "Observa que descargar y subir usan el mismo comando (cp) pero con la dirección invertida: de gs:// a local o de local a gs://.",
        reflection:
          "¿Qué acabas de configurar? Una descarga que confirma que el objeto en la nube es recuperable y consistente.",
        participationQuestions: [
          "¿Qué diferencia observaste entre tener el archivo localmente y recuperarlo desde Cloud Storage?",
        ],
      },
      {
        title: "Task 4: Copy an object to a folder in the bucket",
        conceptNote:
          "Cloud Storage permite organizar datos con una estructura lógica tipo carpeta para facilitar la administración. Las \"carpetas\" son una convención de organización y no directorios físicos tradicionales.",
        guidingQuestion:
          "¿Qué significa \"organizar\" en un almacenamiento de objetos donde no hay carpetas reales?",
        observation:
          "Observa que copiar a image-folder/ crea un nuevo objeto con un prefijo diferente — el original sigue existiendo.",
        reflection:
          "¿Qué acabas de configurar? Una copia del objeto dentro de una estructura lógica que simula un directorio.",
        participationQuestions: [
          "¿Por qué crees que crear una carpeta dentro del bucket ayuda a organizar mejor los objetos?",
        ],
      },
      {
        title: "Task 5: List contents and details",
        conceptNote:
          "Los comandos de listado permiten confirmar existencia, tamaño y ubicación de los objetos. Revisar detalles antes de compartir es una práctica de seguridad básica.",
        guidingQuestion:
          "¿Por qué conviene revisar los detalles de un objeto antes de cambiar sus permisos?",
        observation:
          "Observa que el listado muestra tamaño, fecha y ruta completa — información clave para decidir qué hacer con cada objeto.",
        reflection:
          "¿Qué acabas de configurar? Una verificación del estado actual del bucket y sus objetos antes de modificar permisos.",
        participationQuestions: [
          "¿Qué te aportó listar el contenido y después revisar los detalles de un objeto antes de compartirlo?",
        ],
      },
      {
        title: "Task 6: Make object publicly accessible and remove access",
        conceptNote:
          "ACLs permiten controlar acceso y la publicación cambia quién puede leer el objeto. Las ACLs pueden modificarse para revocar acceso a usuarios públicos como allUsers.",
        guidingQuestion:
          "¿Qué riesgo existe al hacer público un objeto sin revisar su contenido? ¿Por qué revocar acceso es parte del ciclo de administración de datos?",
        observation:
          "Observa que hacer público un objeto lo expone a cualquier persona con la URL — sin autenticación ni restricción.",
        reflection:
          "¿Qué acabas de configurar? Un ciclo completo de control de acceso: publicar, verificar y revocar permisos sobre un objeto.",
        participationQuestions: [
          "¿Por qué es importante pensar antes de hacer público un objeto, aunque solo sea una imagen?",
          "¿Qué te enseña quitar el permiso público sobre la relación entre seguridad y administración de datos?",
        ],
      },
      {
        title: "Task 7: Delete objects",
        conceptNote:
          "Borrar un objeto no elimina necesariamente otras copias del mismo archivo dentro del bucket. Cada objeto es independiente aunque compartan contenido.",
        guidingQuestion:
          "¿Qué pasa con las copias de un objeto cuando eliminas el original?",
        observation:
          "Observa que después de eliminar el objeto original, la copia en image-folder/ sigue existiendo intacta.",
        reflection:
          "¿Qué acabas de configurar? Una eliminación selectiva que demuestra que cada objeto es independiente dentro del bucket.",
        participationQuestions: [
          "¿Qué aprendiste al eliminar el objeto original y dejar intacta la copia dentro de la carpeta?",
        ],
      },
    ],
  },
  {
    slug: "cloud-sql-for-mysql-qwik-start",
    labNumber: 8,
    title: "Cloud SQL for MySQL: Qwik Start",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631648",
    description:
      "Creación de una instancia administrada de MySQL en Cloud SQL y ejecución de operaciones SQL básicas.",
    overview: {
      serviceIcon: "/assets/Cloud SQL.svg",
      serviceName: "Cloud SQL",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear una instancia administrada de MySQL en Cloud SQL",
        "Conectarse a la instancia desde Cloud Shell con el cliente mysql",
        "Crear una base de datos, tabla e insertar/consultar registros",
      ],
      steps: [
        {
          step: 1,
          action: "Crear instancia",
          detail: "Configurar Cloud SQL MySQL (Enterprise, Development preset, zona)",
          icon: "Database",
        },
        {
          step: 2,
          action: "Conectarse con mysql",
          detail: "Usar gcloud sql connect con usuario root desde Cloud Shell",
          icon: "Terminal",
        },
        {
          step: 3,
          action: "Crear base de datos",
          detail: "Ejecutar CREATE DATABASE guestbook en el prompt mysql",
          icon: "Plus",
        },
        {
          step: 4,
          action: "Crear tabla",
          detail: "Definir tabla entries con campos guestName, content, entryID",
          icon: "Table",
        },
        {
          step: 5,
          action: "Insertar datos",
          detail: "Agregar registros de ejemplo con INSERT INTO",
          icon: "FileEdit",
        },
        {
          step: 6,
          action: "Consultar datos",
          detail: "Verificar los registros con SELECT * FROM entries",
          icon: "Search",
        },
      ],
      whatYouLearn: [
        "Cloud SQL como servicio de base de datos relacional totalmente administrado",
        "Conexión segura desde Cloud Shell sin configurar IP ni firewall",
        "Operaciones SQL básicas: CREATE, INSERT, SELECT",
        "Diferencia entre administrar un servidor MySQL vs usar un servicio administrado",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque no solo enseña a crear una instancia de Cloud SQL, sino que ayuda a entender el flujo completo de trabajo con una base de datos administrada: configurar la instancia, conectarse con el cliente mysql, crear una base, cargar datos y consultarlos. Cloud SQL for MySQL está pensado para administrar bases relacionales en Google Cloud con menos carga operativa para el usuario.\n\nAdemás, este lab permite conectar la consola gráfica con la terminal, reforzando el hábito de verificar en la interfaz lo que se ejecuta por comando. Cloud SQL para MySQL es un servicio totalmente administrado para configurar, mantener y administrar bases MySQL en Google Cloud.\n\nDurante la práctica, el estudiante crea una instancia, se conecta desde Cloud Shell, crea una base de datos, define una tabla, inserta registros y consulta el contenido.",
    concepts: [
      {
        term: "Instancia Cloud SQL",
        definition:
          "Servidor de base de datos administrado por Google Cloud. Google maneja hardware, parches de seguridad, backups, mantenimiento — tú solo usas la BD. Cada instancia ejecuta un motor (MySQL, PostgreSQL, SQL Server) y contiene múltiples bases de datos. En el lab creas una instancia con motor MySQL, preset Development y contraseña root.",
      },
      {
        term: "Instance ID",
        definition:
          "Nombre único de tu instancia dentro del proyecto de Google Cloud. Identifica la instancia para conexiones, backups y en la facturación. Debe tener 1-63 caracteres, solo letras, números, guiones. No puede cambiar después de crear la instancia. En el lab usas un Instance ID como 'myinstance' o similar.",
      },
      {
        term: "Motor de Base de Datos",
        definition:
          "Sistema que ejecuta tus bases de datos. Cloud SQL soporta: MySQL (versiones 5.7, 8.0 — código abierto, ampliamente usado), PostgreSQL (código abierto, potente), SQL Server (propietario de Microsoft). Cada motor tiene SQL ligeramente diferente y características específicas. En el lab eliges MySQL como motor.",
      },
      {
        term: "Preset de Configuración",
        definition:
          "Template predefinido que ajusta automáticamente CPU, memoria, almacenamiento. Cloud SQL ofrece: 'Development' (recursos mínimos, bajo costo — para pruebas), 'Production' (recursos mayores, alta disponibilidad), 'Business Critical' (máximo rendimiento, replicación). En el lab usas preset Development porque es un qwik start educativo.",
      },
      {
        term: "Base de Datos (Database)",
        definition:
          "Contenedor lógico dentro de una instancia Cloud SQL. Define un espacio separado donde viven tablas, vistas, funciones, triggers. Dentro de una instancia puedes tener múltiples bases de datos independientes (ejemplo: 'tienda', 'ventas', 'clientes'). En el lab creas una base de datos llamada 'guestbook' con el comando CREATE DATABASE.",
      },
      {
        term: "Tabla (Table)",
        definition:
          "Estructura dentro de una base de datos que organiza datos en filas y columnas. Cada tabla tiene un nombre y define columnas con tipos específicos. Ejemplo: tabla 'entries' con columnas guestName (texto), content (texto largo), entryID (número). Las tablas son donde realmente se guardan los datos. En el lab creas una tabla 'entries' con campos específicos.",
      },
      {
        term: "Columna / Campo (Column)",
        definition:
          "Atributo específico de una tabla. Define qué información guardas en cada registro. Tiene nombre (ej: 'guestName') y tipo de dato (VARCHAR, INT, BOOLEAN, DATE, etc.). Ejemplo: columna 'age' tipo INT permite números enteros; columna 'email' tipo VARCHAR permite texto. En el lab defines columnas: guestName, content, entryID.",
      },
      {
        term: "Tipo de Dato",
        definition:
          "Especifica qué tipo de información se almacena en una columna: VARCHAR(n) = texto hasta n caracteres; INT = número entero; FLOAT = número decimal; DATE = fecha (YYYY-MM-DD); BOOLEAN = verdadero/falso; TEXT = texto largo sin límite. Elegir el tipo correcto ahorra almacenamiento y evita errores. En el lab usas VARCHAR para nombres, TEXT para contenido, INT para IDs.",
      },
      {
        term: "Registro / Fila (Row)",
        definition:
          "Conjunto de datos de una tabla. Una fila = un registro completo. Ejemplo: si una tabla tiene columnas (guestName, content, entryID), una fila = un guest específico con su nombre, contenido y ID único. En el lab insertas registros de ejemplo con INSERT INTO y los ves con SELECT.",
      },
      {
        term: "Clave Primaria (Primary Key)",
        definition:
          "Columna (o conjunto de columnas) que identifica únicamente cada registro. No puede repetirse ni ser nula. En la tabla 'entries', la columna 'entryID' es la clave primaria — cada entrada tiene un ID único. Las claves primarias garantizan que no haya duplicados y permiten búsquedas rápidas.",
      },
      {
        term: "Cliente mysql",
        definition:
          "Herramienta de línea de comandos que te conecta a un servidor MySQL para ejecutar comandos SQL. En la terminal escribes 'mysql -u usuario -p' y luego comandos como CREATE, SELECT, INSERT. Google Cloud proporciona `gcloud sql connect` que automatiza la autenticación y abre el prompt mysql. En el lab usas 'gcloud sql connect INSTANCE-ID --user=root' para conectarte.",
      },
      {
        term: "Prompt mysql",
        definition:
          "Interfaz interactiva donde escribes comandos SQL cuando estás conectado a MySQL. Se ve como 'mysql>' — aquí ejecutas CREATE DATABASE, CREATE TABLE, INSERT, SELECT. Cada comando termina con ';' (punto y coma). En el lab usas el prompt mysql para crear la base guestbook y la tabla entries.",
      },
      {
        term: "Usuario root",
        definition:
          "Usuario de base de datos con permisos administrativos completos. Puede crear bases, crear usuarios, asignar permisos, eliminar datos. En Cloud SQL, 'root' viene preconfigurado con una contraseña que estableciste al crear la instancia. Para aplicaciones en producción, creas usuarios limitados — no usas root para todo. En el lab usas root porque es un laboratorio educativo.",
      },
      {
        term: "Comandos SQL básicos",
        definition:
          "Instrucciones para interactuar con bases de datos: CREATE DATABASE = crear base; CREATE TABLE = crear tabla; USE = seleccionar qué base usar; INSERT INTO = agregar registros; SELECT = consultar datos; UPDATE = modificar datos existentes; DELETE = eliminar registros; DROP = eliminar tablas/bases. En el lab ejecutas CREATE, INSERT, SELECT en el prompt mysql.",
      },
      {
        term: "SQL (Structured Query Language)",
        definition:
          "Lenguaje estándar para bases de datos relacionales. Permite definir estructura (CREATE TABLE), manipular datos (INSERT, UPDATE, DELETE), consultar (SELECT). SQL es agnóstico del motor — un comando básico SELECT funciona igual en MySQL, PostgreSQL, SQL Server. Es de 'alto nivel' — dices QUÉ quieres (not HOW).",
      },
      {
        term: "Autorización IP / Authorization Network",
        definition:
          "Configuración de seguridad que especifica desde qué IPs se puede conectar a la instancia Cloud SQL. Por defecto, Cloud SQL rechaza conexiones externas. En el lab, Cloud Shell tiene autorización automática porque Google lo integra. Si conectaras desde tu computadora local, necesitarías registrar su IP pública en la lista de autorización.",
      },
    ],
    interactionPattern: [
      "Crear instancia.",
      "Conectarse desde Cloud Shell.",
      "Crear base y tabla.",
      "Insertar y consultar datos.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Create a Cloud SQL instance",
        conceptNote:
          "Cloud SQL ofrece opciones de edición y configuración que determinan los recursos y el tipo de despliegue. El Instance ID sirve para distinguir la instancia de otras dentro del mismo proyecto.",
        guidingQuestion:
          "¿Qué ventaja tiene usar una base administrada en lugar de instalar MySQL manualmente?",
        observation:
          "Observa que al crear la instancia elegiste motor (MySQL), preset (Development) y contraseña — sin configurar red, disco o SO manualmente.",
        reflection:
          "¿Qué acabas de configurar? Un servidor de base de datos MySQL totalmente administrado por Google Cloud, listo para recibir conexiones.",
        participationQuestions: [
          "¿Por qué fue importante elegir el motor MySQL y el preset Development antes de crear la instancia?",
          "¿Qué significado tiene para ti que el Instance ID sea único dentro del proyecto?",
        ],
      },
      {
        title: "Task 2: Connect to your instance using the mysql client",
        conceptNote:
          "Cloud Shell funciona como entorno autenticado para interactuar con recursos de Google Cloud. Conectarse desde ahí evita configurar redes, IP permitidas o túneles SSH manualmente.",
        guidingQuestion:
          "¿Por qué es útil conectarse desde Cloud Shell cuando se trabaja con servicios de Google Cloud?",
        observation:
          "Observa que al conectarte aparece el prompt mysql> — ahora estás dentro del servidor de base de datos, no en Cloud Shell.",
        reflection:
          "¿Qué acabas de configurar? Una conexión directa al motor MySQL de tu instancia Cloud SQL, lista para ejecutar comandos SQL.",
        participationQuestions: [
          "¿Qué aprendiste al conectarte a Cloud SQL desde Cloud Shell en lugar de hacerlo desde una aplicación externa?",
        ],
      },
      {
        title: "Task 3: Create a database and upload data",
        conceptNote:
          "El orden refleja la estructura lógica de una base relacional: primero base, luego tabla, después registros. CREATE DATABASE → USE → CREATE TABLE → INSERT es el flujo estándar.",
        guidingQuestion:
          "¿Qué relación hay entre una tabla y un conjunto de registros?",
        observation:
          "Observa que USE guestbook cambia el contexto activo — cualquier CREATE TABLE posterior pertenece a esa base.",
        reflection:
          "¿Qué acabas de configurar? Una base de datos con una tabla estructurada y registros insertados, listos para ser consultados.",
        participationQuestions: [
          "¿Por qué primero creaste la base guestbook y luego la tabla entries?",
          "¿Qué te permitió comprobar el comando SELECT * FROM entries después de insertar datos?",
        ],
      },
      {
        title: "Task 4: Consultar y entender datos",
        conceptNote:
          "CREATE TABLE define la forma de los datos (columnas, tipos) e INSERT agrega contenido concreto. SELECT recupera y muestra lo almacenado.",
        guidingQuestion:
          "¿Qué esperas ver después de insertar dos filas en la tabla?",
        observation:
          "Observa que SELECT muestra exactamente lo que insertaste — confirmación directa de que la base funciona correctamente.",
        reflection:
          "¿Qué acabas de configurar? Una consulta que verifica el ciclo completo: definir estructura → insertar datos → recuperar información.",
        participationQuestions: [
          "¿Qué diferencia observaste entre crear la estructura con CREATE TABLE e insertar registros con INSERT?",
        ],
      },
    ],
  },
  {
    slug: "introduction-to-apis-in-google-cloud",
    labNumber: 9,
    title: "Introduction to APIs in Google Cloud",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631660",
    description:
      "Exploración de la arquitectura de las APIs y ejecución práctica de métodos de la API de Cloud Storage desde Cloud Shell.",
    overview: {
      serviceIcon: "/assets/API.svg",
      serviceName: "Cloud APIs",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Comprender la arquitectura REST: cliente, servidor, HTTP, endpoints y JSON",
        "Autenticarse con OAuth 2.0 para consumir APIs de Google Cloud",
        "Crear un bucket y subir archivos usando la Cloud Storage JSON API",
      ],
      steps: [
        {
          step: 1,
          action: "Explorar API Library",
          detail: "Buscar y habilitar la Fitness API desde la consola",
          icon: "Search",
        },
        {
          step: 2,
          action: "Crear JSON de configuración",
          detail: "Escribir values.json con nombre, ubicación y clase del bucket",
          icon: "FileCode",
        },
        {
          step: 3,
          action: "Obtener token OAuth",
          detail: "Generar un access token en el OAuth 2.0 Playground",
          icon: "Key",
        },
        {
          step: 4,
          action: "Crear bucket vía API",
          detail: "Enviar POST con curl al endpoint de Cloud Storage JSON API",
          icon: "Send",
        },
        {
          step: 5,
          action: "Subir archivo vía API",
          detail: "Hacer upload de una imagen con curl y el token OAuth",
          icon: "Upload",
        },
      ],
      whatYouLearn: [
        "Arquitectura REST: métodos HTTP (GET, POST, PUT, DELETE) y endpoints",
        "Diferencia entre API Keys, OAuth y Service Accounts",
        "Cómo consumir una API directamente con curl desde la terminal",
        "Flujo completo: autenticación → request → response en JSON",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque no solo muestra cómo ejecutar llamadas a una API, sino que ayuda a entender la arquitectura detrás de esas llamadas: cliente, servidor, métodos HTTP, endpoints, JSON y autenticación. Google Cloud APIs son interfaces programáticas que permiten automatizar tareas y trabajar con servicios de Google Cloud desde la terminal o desde código.\n\nAdemás, el lab permite conectar la teoría con una práctica real: crear un JSON con la configuración del bucket, obtener un token OAuth y enviar una solicitud curl a un endpoint REST. La Cloud Storage JSON API está diseñada como una interfaz basada en JSON para acceder y manipular recursos de Cloud Storage.\n\nDurante la práctica, el estudiante habilita una API, prepara un JSON de configuración, obtiene un token de acceso y realiza llamadas REST para crear y usar recursos de Cloud Storage.",
    concepts: [
      {
        term: "API (Application Programming Interface)",
        definition:
          "Conjunto de reglas y protocolos que permite que dos programas se comuniquen. Define qué solicitudes puede hacer un cliente, qué responde el servidor, y en qué formato. Las APIs abstraen complejidad — en lugar de construir Cloud Storage desde cero, usas la API de Google Cloud que expone operaciones como crear buckets, subir archivos. En el lab usas la Cloud Storage JSON API para crear buckets y subir archivos sin acceder a la base de datos directamente.",
      },
      {
        term: "Cliente y Servidor",
        definition:
          "Arquitectura de comunicación: Cliente = programa que inicia la solicitud (ej: tu terminal, una app web); Servidor = programa que recibe, procesa y responde. El cliente siempre inicia, el servidor siempre responde. En el lab, tu terminal (cliente) ejecuta curl para enviar solicitudes al servidor Google Cloud (API). Esta relación es asimétrica — el servidor no inicia comunicación hacia el cliente.",
      },
      {
        term: "HTTP (HyperText Transfer Protocol)",
        definition:
          "Protocolo que define cómo se envían solicitudes y respuestas entre cliente y servidor en internet. Funciona sobre TCP/IP. Define métodos (GET, POST, PUT, DELETE), códigos de estado (200 = éxito, 404 = no encontrado), encabezados y un cuerpo. HTTP es \"sin estado\" — cada solicitud es independiente. En el lab usas HTTP para comunicarte con la Cloud Storage API desde curl.",
      },
      {
        term: "Método HTTP",
        definition:
          "Verbo que define qué acción realizar sobre un recurso: GET = leer/obtener datos (sin efectos secundarios); POST = crear un recurso nuevo; PUT = reemplazar un recurso completo; PATCH = modificar parcialmente; DELETE = eliminar. En el lab usas POST para crear buckets y PUT para subir archivos. Cada método tiene semántica específica — siempre usar el correcto es fundamental en APIs REST.",
      },
      {
        term: "Endpoint",
        definition:
          "URL o ruta específica en el servidor donde actúa una API. Identifica un recurso. Ejemplo: 'https://www.googleapis.com/storage/v1/b' es el endpoint para crear buckets en Cloud Storage. Los endpoints son únicas — cada uno corresponde a una acción específica combinada con un método HTTP. En el lab usas curl con el endpoint de Cloud Storage para crear buckets y subir objetos.",
      },
      {
        term: "Recurso (Resource)",
        definition:
          "Concepto fundamental en REST — representa algo que puede ser identificado, accedido o modificado. Ejemplos: un bucket (recurso), un objeto dentro de un bucket, una base de datos, un usuario. Cada recurso tiene un identificador único (URL/URI). En el lab, un 'bucket' y un 'objeto' son recursos — cada uno tiene una URL única en Cloud Storage.",
      },
      {
        term: "REST / RESTful",
        definition:
          "Estilo arquitectónico para diseñar APIs que usan HTTP estándar. Principios: recursos (URIs), métodos HTTP estándar, respuestas sin estado. 'RESTful' = que sigue estos principios. Ventaja: simple, escalable, usa infraestructura web estándar. Cloud Storage JSON API es una API RESTful — usas GET, POST, PUT, DELETE en URLs específicas. Contrasta con SOAP o RPC que son más complejos.",
      },
      {
        term: "URI / URL",
        definition:
          "Identificador universal de un recurso. URL = Uniform Resource Locator (localización en web, incluye protocolo). URI = Uniform Resource Identifier (identificador general). En APIs: 'https://www.googleapis.com/storage/v1/b/mi-bucket' es una URL que identifica un bucket específico. El patrón {protocol}://{host}/{path}/{resource-id} es estándar en APIs REST.",
      },
      {
        term: "JSON (JavaScript Object Notation)",
        definition:
          "Formato ligero basado en texto para estructurar datos. Usa pares clave-valor, listas, anidamiento. Ejemplo: {\"nombre\": \"mi-bucket\", \"ubicacion\": \"us-central1\"}. Ventajas: legible, parseable fácilmente, agnóstico de lenguaje. Es el estándar de facto en APIs modernas. En el lab creas un JSON con valores.json que describe la configuración del bucket, luego lo envías como cuerpo en la solicitud POST.",
      },
      {
        term: "Request (Solicitud HTTP)",
        definition:
          "Mensaje que envía el cliente al servidor. Contiene: método (GET, POST, etc.), URI del recurso, versión de HTTP, encabezados (metadata), y opcionalmente un cuerpo (datos). Ejemplo: POST /storage/v1/b HTTP/1.1 Host: www.googleapis.com [encabezados] [cuerpo JSON]. En el lab, el comando curl construye y envía un HTTP request con el token OAuth.",
      },
      {
        term: "Response (Respuesta HTTP)",
        definition:
          "Mensaje que envía el servidor al cliente después de procesar una solicitud. Contiene: código de estado (200, 404, etc.), encabezados (metadata), y opcionalmente un cuerpo (datos). Ejemplo: 'HTTP/1.1 200 OK Content-Type: application/json [cuerpo JSON con detalles del bucket creado]'. En el lab ves la respuesta JSON que confirma la creación del bucket.",
      },
      {
        term: "Status Code (Código de Estado HTTP)",
        definition:
          "Número que comunica el resultado de la solicitud: 2xx = éxito (200 OK, 201 Created); 3xx = redirección; 4xx = error del cliente (400 Bad Request, 401 Unauthorized, 404 Not Found); 5xx = error del servidor. El código es crítico — no es lo mismo que el servidor responda 200 (éxito) que 500 (error). En el lab esperas 200 o 201 cuando creas un bucket, 401 si el token OAuth es inválido.",
      },
      {
        term: "Headers (Encabezados HTTP)",
        definition:
          "Metadata que acompaña la solicitud y respuesta. Define formato del contenido, autenticación, compresión. Ejemplos comunes: 'Content-Type: application/json' (formato del cuerpo), 'Authorization: Bearer {token}' (credenciales), 'Accept: application/json' (qué formato esperas recibir). Los headers son independientes del cuerpo — comunican contexto sobre la solicitud. En el lab, curl usa -H para enviar encabezados con el token OAuth.",
      },
      {
        term: "curl",
        definition:
          "Herramienta de línea de comandos para hacer solicitudes HTTP/HTTPS a servidores. Permite GET, POST, PUT, DELETE, pasar encabezados (-H), cuerpos (-d), autenticación. Syntax: curl [opciones] URL. Ejemplo: 'curl -X POST -H \"Authorization: Bearer TOKEN\" -d @values.json ENDPOINT'. Es ampliamente usado para probar APIs. En el lab usas curl desde Cloud Shell para crear buckets y subir archivos a Cloud Storage.",
      },
      {
        term: "OAuth 2.0",
        definition:
          "Protocolo de autorización que permite obtener tokens de acceso seguros sin exponer contraseñas. Flujo: usuario concede permisos → aplicación obtiene token temporal → aplicacion usa token para acceder a recursos. Ventajas: seguro (no comparte credenciales), tokens pueden revocar/expirar. Google Cloud APIs usan OAuth 2.0. En el lab usas el OAuth 2.0 Playground para generar un token que luego usas en las solicitudes curl.",
      },
      {
        term: "Access Token",
        definition:
          "Credencial temporal que demuestra identidad y autorización ante una API. Generado por un servidor de autorización (ej: Google). Tiene tiempo de vida limitado (típicamente 1 hora) — después expira y necesitas generar otro. No es una contraseña — es una llave de corta duración. En el lab generas un access token OAuth y lo incluyes en el encabezado 'Authorization: Bearer {token}' de tus solicitudes curl.",
      },
      {
        term: "Autenticación vs Autorización",
        definition:
          "Autenticación = verificar quién eres ('¿eres tú realmente?'). Autorización = verificar qué permisos tienes ('¿qué puedes hacer?'). Ejemplo: OAuth confirma tu identidad (autenticación) y el token demuestra que tienes permisos para crear buckets (autorización). Una API requiere ambas — no sirve saber quién eres si no tienes permisos para actuar. En el lab, OAuth proporciona autenticación y el token comunica autorización.",
      },
      {
        term: "API Library",
        definition:
          "Catálogo centralizado en Google Cloud Console que lista todas las APIs disponibles: Cloud Storage, Cloud SQL, Compute Engine, etc. Para cada API muestra: descripción, documentación, cuotas, límites. Debes 'habilitar' una API en tu proyecto para poder usarla — esto activa la capacidad pero no crea recursos. En el lab usas API Library para habilitar la Cloud Storage JSON API.",
      },
      {
        term: "API Key",
        definition:
          "Forma simple de autenticación en APIs públicas. Una clave única que identifica tu aplicación (no a un usuario). Menos segura que OAuth porque es de larga duración y expone la identidad de la app. Usada para APIs públicas o cuando OAuth es innecesario. Cloud Google ofrece API Keys, pero para acceso a recursos protegidos usa OAuth o Service Accounts. No se usa en el lab, pero es importante conocer la diferencia.",
      },
      {
        term: "Service Account",
        definition:
          "Cuenta de servicio que representa una aplicación (no un usuario). Tiene credenciales seguras y permisos específicos. Es como un usuario de sistema — ideal para aplicaciones que necesitan acceso a Google Cloud sin intervención humana. La autenticación es más fuerte que API Key. Usado en producción. En el lab usas OAuth para simular un usuario, pero en producción usarías Service Accounts.",
      },
      {
        term: "Quotas / Rate Limiting",
        definition:
          "Límites que Google impone en las APIs para controlar uso: máximo de solicitudes por segundo, máximo de datos transferidos, máximo de recursos creados. Evita abuso y garantiza estabilidad. Cada proyecto tiene cuotas — si las excedes, la API rechaza solicitudes con código 429 (Too Many Requests). En el lab, la Cloud Storage API tiene cuotas, pero como es un laboratorio educativo no las alcanzarás.",
      },
      {
        term: "Documentación de API",
        definition:
          "Referencia oficial que explica: endpoints disponibles, métodos soportados, parámetros requeridos, formato de respuesta, códigos de error. Es esencial para usar una API. Google Cloud API Documentation es accesible online (ej: cloud.google.com/storage/docs/json_api/). Buenos desarrolladores consultan documentación antes de escribir código. En el lab la documentación te dice qué endpoint usar para crear buckets.",
      },
    ],
    interactionPattern: [
      "Entender la API.",
      "Elegir el endpoint.",
      "Preparar el JSON.",
      "Autenticarse con OAuth.",
      "Enviar la solicitud.",
      "Ver la respuesta.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Using the API library",
        conceptNote:
          "La API Library centraliza acceso, documentación y activación de APIs. Las APIs de Cloud suelen tener cuotas y monitoreo para controlar uso y tráfico.",
        guidingQuestion:
          "¿Por qué una API no debería estar habilitada por defecto si no la vas a usar?",
        observation:
          "Observa que habilitar la API no crea recursos: solo activa la capacidad de usarla y te muestra cuotas y métricas asociadas.",
        reflection:
          "¿Qué acabas de configurar? El acceso programático a la Cloud Storage JSON API dentro de tu proyecto.",
        participationQuestions: [
          "¿Por qué crees que fue importante habilitar una API desde la biblioteca antes de usarla en la práctica?",
          "¿Qué aprendiste al explorar cuotas y límites de la API después de habilitarla?",
        ],
      },
      {
        title: "Task 2: Creating a JSON File",
        conceptNote:
          "El archivo JSON describe la configuración necesaria para crear el bucket: nombre, ubicación y clase de almacenamiento. Estos valores los consume la API como cuerpo de la solicitud.",
        guidingQuestion:
          "¿Qué datos mínimos necesita una API para crear un recurso?",
        observation:
          "Observa que el JSON tiene estructura clave-valor: cada campo corresponde a un parámetro que la API espera recibir.",
        reflection:
          "¿Qué acabas de configurar? La especificación del recurso que crearás con la API, en un formato que el servidor puede interpretar.",
        participationQuestions: [
          "¿Por qué el archivo values.json necesitó contener exactamente nombre, ubicación y clase de almacenamiento?",
        ],
      },
      {
        title: "Task 3: Authenticate and authorize the API",
        conceptNote:
          "La autenticación identifica al usuario y la autorización determina lo que puede hacer. La API requiere una forma segura de verificar permisos para operar sobre recursos del usuario.",
        guidingQuestion:
          "¿Por qué una API no debería aceptar acciones sin comprobar identidad?",
        observation:
          "Observa que el token OAuth tiene un tiempo de vida limitado — no es una contraseña permanente sino una credencial temporal.",
        reflection:
          "¿Qué acabas de configurar? Un token de acceso que prueba tu identidad y permisos ante la API de Cloud Storage.",
        participationQuestions: [
          "¿Qué diferencia observaste entre autenticación y autorización cuando generaste el token OAuth?",
          "¿Por qué el token OAuth fue necesario antes de llamar a la API de Cloud Storage?",
        ],
      },
      {
        title: "Task 4: Create a bucket with the JSON/REST API",
        conceptNote:
          "La petición HTTP combina método (POST), endpoint (URL del recurso), encabezados (token) y datos (JSON) para ejecutar la acción. Esto es una llamada REST completa.",
        guidingQuestion:
          "¿Qué parte del comando curl corresponde al método y cuál al recurso?",
        observation:
          "Observa que curl -X POST envía el JSON como cuerpo de la solicitud al endpoint de Cloud Storage — el servidor responde con los detalles del bucket creado.",
        reflection:
          "¿Qué acabas de configurar? Un bucket creado exclusivamente mediante una llamada REST, sin usar la consola ni gcloud.",
        participationQuestions: [
          "¿Qué te ayudó a entender mejor la estructura de una solicitud REST: el curl, los encabezados o el JSON del cuerpo?",
        ],
      },
      {
        title: "Task 5: Upload a file using the JSON/REST API",
        conceptNote:
          "El patrón es el mismo que al crear el bucket: autenticación + método HTTP + endpoint + datos. Cambió el recurso objetivo, pero siguió el mismo estilo de llamada REST.",
        guidingQuestion:
          "¿Qué ventaja tiene usar una API en vez de hacer la tarea manualmente desde la consola?",
        observation:
          "Observa que subir un archivo usa el mismo token y el mismo estilo de petición — la API es consistente en su interfaz.",
        reflection:
          "¿Qué acabas de configurar? Una subida de archivo programática que demuestra que la API sirve para cualquier operación sobre Cloud Storage.",
        participationQuestions: [
          "¿Qué cambió cuando pasaste de crear un bucket a subir un archivo usando el mismo estilo de petición?",
        ],
      },
    ],
  },
  {
    slug: "pub-sub-qwik-start-python",
    labNumber: 10,
    title: "Pub/Sub: Qwik Start - Python",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631664",
    description:
      "Configuración de un sistema de mensajería asíncrona creando temas y suscripciones mediante scripts de Python.",
    overview: {
      serviceIcon: "/assets/PubSub.svg",
      serviceName: "Pub/Sub",
      duration: "10 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Crear y listar temas (topics) y suscripciones en Pub/Sub",
        "Publicar mensajes a un tema desde la línea de comandos",
        "Consumir mensajes con un subscriber pull en Python",
      ],
      steps: [
        {
          step: 1,
          action: "Configurar entorno",
          detail: "Crear entorno virtual Python e instalar google-cloud-pubsub",
          icon: "Terminal",
        },
        {
          step: 2,
          action: "Crear topic",
          detail: "Ejecutar publisher.py para crear MyTopic en el proyecto",
          icon: "Plus",
        },
        {
          step: 3,
          action: "Crear suscripción",
          detail: "Ejecutar subscriber.py para crear MySub vinculado al topic",
          icon: "Link",
        },
        {
          step: 4,
          action: "Publicar mensajes",
          detail: "Enviar mensajes al topic con gcloud pubsub topics publish",
          icon: "Send",
        },
        {
          step: 5,
          action: "Recibir mensajes",
          detail: "Usar subscriber.py receive para consumir mensajes del topic",
          icon: "Download",
        },
      ],
      whatYouLearn: [
        "Patrón publisher-subscriber para mensajería asíncrona desacoplada",
        "Topics como canal compartido y subscriptions como mecanismo de entrega",
        "Diferencia entre suscripciones pull y push",
        "Uso de la librería cliente Python para interactuar con Pub/Sub",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque enseña, con práctica manual, cómo funciona un sistema de mensajería desacoplado entre productores y consumidores. El estudiante crea un tópico, crea una suscripción, publica mensajes y luego los consume, lo que permite visualizar claramente el patrón publisher-subscriber que define a Pub/Sub.\n\nAdemás, el lab ayuda a entender que una suscripción no es solo \"seguir\" un tema, sino establecer un mecanismo de entrega y confirmación de mensajes. Pub/Sub ofrece suscripciones de tipo pull y push, y en este laboratorio se trabaja con un subscriber pull para recuperar mensajes del tópico.\n\nDurante la práctica, el estudiante crea un entorno virtual, instala la librería cliente de Python, crea un topic, configura una suscripción, publica mensajes y finalmente recupera esos mensajes desde el subscriber. Pub/Sub permite desacoplar productores y consumidores mediante topics y subscriptions.",
    concepts: [
      {
        term: "Topic (Tópico)",
        definition:
          "Canal o punto central donde los publishers envían mensajes. Un topic es como un buzón de correo compartido — todos los mensajes publicados en un topic quedan disponibles para sus suscriptores. Cada topic tiene un nombre único dentro del proyecto (ej: 'MyTopic'). Sin topic no hay lugar para depositar mensajes. En el lab creas MyTopic y luego publicas mensajes en él.",
      },
      {
        term: "Publisher (Publicador)",
        definition:
          "Aplicación o componente que envía mensajes a un topic. El publisher no necesita saber quién o cuántos suscriptores existen — solo habla con el topic. Esto es desacoplamiento: productor y consumidor son independientes. En el lab, cuando ejecutas 'gcloud pubsub topics publish MyTopic --message=\"Hola\"', tu terminal actúa como publisher enviando un mensaje al tema.",
      },
      {
        term: "Subscriber (Suscriptor)",
        definition:
          "Aplicación o componente que recibe mensajes desde una suscripción. El subscriber se conecta a una suscripción (no directamente al topic) y recupera los mensajes. Puede haber múltiples subscribers en la misma suscripción — Pub/Sub balancea el trabajo entre ellos. En el lab, subscriber.py es el código que suscriptores ejecutan para recibir mensajes.",
      },
      {
        term: "Subscription (Suscripción)",
        definition:
          "Vínculo configurado entre un topic y un subscriber. Define cómo los mensajes se entregan. Cada suscripción tiene: nombre único, referencia al topic, tipo de entrega (pull o push), deadline de acknowledge. Sin suscripción, los mensajes publicados no llegan a nadie — el topic solo almacena mensajes para suscripciones activas. En el lab creas MySub vinculada a MyTopic.",
      },
      {
        term: "Pull Subscription",
        definition:
          "Tipo de suscripción donde el subscriber **solicita activamente** mensajes ('pull'). El subscriber controla el ritmo: puede pedir 1 mensaje, procesar, pedir otro. Es útil para trabajo sincrónico o cuando necesitas control fino. El subscriber ejecuta código tipo 'dar_me_messages()' repetidamente. En el lab usas pull subscription — subscriber.py ejecuta un loop que pide mensajes.",
      },
      {
        term: "Push Subscription",
        definition:
          "Tipo de suscripción donde Pub/Sub **empuja activamente** los mensajes al subscriber (push). Pub/Sub envía HTTP POST al endpoint del subscriber con el mensaje. Útil para webhooks o cuando quieres que Pub/Sub controle la entrega. Ventaja: desacoplamiento total — el subscriber no necesita conectarse a Pub/Sub, recibe mensajes en su webhook. Desventaja: requiere endpoint HTTP público. No se usa en el lab pero es importante conocer.",
      },
      {
        term: "Message (Mensaje)",
        definition:
          "Unidad de información que se envía a través de Pub/Sub. Estructura: data (cuerpo, bytes), attributes (metadatos clave-valor), message_id (ID único asignado por Pub/Sub), timestamp (cuándo llegó). En el lab publicas mensajes simples: 'Hola', 'Mundo', etc. Los mensajes quedan en el topic para que las suscripciones los recuperen.",
      },
      {
        term: "Message Payload",
        definition:
          "Contenido real del mensaje — los datos que transmites. Puede ser texto, JSON, binario. Pub/Sub no le importa el formato — es responsabilidad del publisher y subscriber acordar qué estructura usar. Ejemplo: pub lica JSON {\"usuario\": \"Ana\", \"accion\": \"logout\"} y sub suscriber espera ese formato. En el lab publicas strings simples como payload.",
      },
      {
        term: "Acknowledge / ACK",
        definition:
          "Confirmación que envía el subscriber a Pub/Sub diciendo \"recibí y procesé este mensaje\". Sin ACK, Pub/Sub asume que el subscriber falló y lo reentrega. El ACK es fundamental para garantía de entrega. En código Python: después de procesar, llamas `message.ack()`. Si no haces ack dentro del deadline (típicamente 10 segundos), el mensaje se reentrega. En el lab llamas ack() después de procesar cada mensaje recibido.",
      },
      {
        term: "Nack (Negative Acknowledge)",
        definition:
          "Confirmación negativa — le dices a Pub/Sub \"no pude procesar este mensaje, reintentalo después\". El mensaje vuelve a cola para ser reentregado. Útil cuando encontras un error transitorio. Contrasta con ACK (éxito) y con timeout (sin respuesta). No se usa en el lab introductorio pero es parte del flujo completo de reentento.",
      },
      {
        term: "Asynchronous Messaging / Mensajería Asíncrona",
        definition:
          "Patrón donde productor y consumidor **no necesariamente coinciden en tiempo real**. Publisher envía mensaje y continúa — no espera que el subscriber lo reciba. Beneficio: desacoplamiento temporal — si el subscriber está fuera de servicio, los mensajes se acumulan en Pub/Sub y se entregan cuando vuelve. Contrasta con comunicación sincrónica (ej: HTTP request/response donde esperas respuesta). En el lab publicas mensajes y el subscriber los recibe después — son independientes.",
      },
      {
        term: "Decoupling / Desacoplamiento",
        definition:
          "Separación entre componentes para que cambios en uno no rompan otro. Pub/Sub desacopla publisher y subscriber en tres formas: tiempo (no necesitan coincidir), ubicación (diferentes máquinas), velocidad (ritmos diferentes). Publisher no conoce ni necesita saber de subscribers. Esto hace sistemas resilientes y escalables. En el lab ves cómo el publisher y subscriber son scripts completamente independientes.",
      },
      {
        term: "Message Ordering",
        definition:
          "Orden en que se reciben los mensajes. En Pub/Sub estándar, no se garantiza orden (aunque en la práctica suele preservarse). Para garantizar orden, usas Message Ordering Key — mensajes con la misma clave se procesan en orden. Importante en casos críticos (ej: transacciones bancarias donde el orden de depósitos/retiros importa). En el lab no usas ordenamiento, pero es concepto importante.",
      },
      {
        term: "Dead Letter Queue (DLQ)",
        definition:
          "Mecanismo para manejar mensajes que fallan repetidamente. Si un mensaje not puede procesarse después de N reintentos, se envía a una cola de letra muerta en lugar de descartarse. Permite inspeccionar qué salió mal. Pub/Sub tiene soporte para DLQs mediante subscripciones dedicadas. No se usa en el lab pero es práctica importante en producción.",
      },
      {
        term: "Virtual Environment (venv)",
        definition:
          "Entorno aislado de Python que contiene su propia versión de Python y paquetes. Esto evita conflictos entre proyectos — si una app necesita librería X versión 1.0 y otra necesita versión 2.0, cada una usa su venv. Se crea con 'python -m venv nombre' y se activa con 'source nombre/bin/activate' (Linux/Mac) o 'nombre\\Scripts\\activate' (Windows). En el lab creas un venv antes de instalar google-cloud-pubsub.",
      },
      {
        term: "Python Client Library",
        definition:
          "Librería que proporciona clases y funciones en Python para interactuar con una API. La librería google-cloud-pubsub abstrae detalles de protocolos HTTP, autenticación, serialización. Sin ella escribirías código bajo nivel con curl. Con la librería: `from google.cloud import pubsub_v1; publisher = pubsub_v1.PublisherClient()` y luego publicas fácilmente. En el lab instalas pip install google-cloud-pubsub.",
      },
      {
        term: "Publisher-Subscriber Pattern",
        definition:
          "Patrón arquitectónico donde existe muchos productores (publishers) y muchos consumidores (subscribers) comunicados por un intermediario (topic). Pros: escalable, flexible, desacoplado. Cada componente es independiente — agregar nuevos publishers o subscribers no afecta a otros. Desventaja: complejidad, debugging. Pub/Sub de Google implementa este patrón. En el lab ves el patrón: un publisher envía a un topic, el subscriber recibe desde una suscripción.",
      },
      {
        term: "Pub/Sub Project",
        definition:
          "Proyecto de Google Cloud que contiene topics y subscriptions. Son recursos que viven bajo tu proyecto específico. El proyecto maneja autenticación, facturación, cuotas. Cuando ejecutas comandos pubsub, usan el proyecto actual de gcloud. En el lab creas MyTopic y MySub dentro de tu proyecto actual.",
      },
      {
        term: "gcloud pubsub (Command-Line Tool)",
        definition:
          "Herramienta CLI para administrar Pub/Sub desde la terminal. Comandos: 'gcloud pubsub topics create', 'gcloud pubsub subscriptions create', 'gcloud pubsub topics publish'. Es más manual que usar la librería client, pero útil para setup inicial o scripting simple. En el lab usas comandos gcloud para publicar mensajes: 'gcloud pubsub topics publish MyTopic --message=\"...'.",
      },
      {
        term: "Retention Policy / Política de Retención",
        definition:
          "Configura cuánto tiempo Pub/Sub mantiene mensajes no confirmados. Después de ese tiempo, los mensajes se descartan incluso si no fueron procesados. Ejemplo: retention=7 días significa que si un subscriber tarda >7 días en consumir, pierde los mensajes. Útil para evitar acumulación infinita de mensajes. En el lab usas retención por defecto (~7 días), pero en producción ajustas según tus necesidades.",
      },
      {
        term: "Message Filtering",
        definition:
          "Capacidad de una suscripción de recibir solo mensajes que coincidan ciertos criterios (basados en atributos). Ejemplo: solo mensajes con attribute 'prioridad=alta'. Reduce trabajo innecesario — el subscriber solo ve mensajes relevantes. Implementado en Pub/Sub mediante filter expressions. No se usa en el lab introductorio pero es avanzado/util.",
      },
    ],
    interactionPattern: [
      "Crear topic.",
      "Crear subscription.",
      "Publicar mensajes.",
      "Consumir mensajes.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Create a virtual environment and install client library",
        conceptNote:
          "El entorno virtual aísla paquetes y evita conflictos con instalaciones del sistema. Las client libraries facilitan interactuar con la API de Pub/Sub desde código Python.",
        guidingQuestion:
          "¿Por qué una aplicación necesita una librería cliente para usar una API?",
        observation:
          "Observa que pip install dentro del venv solo afecta a ese entorno — no modifica el Python del sistema.",
        reflection:
          "¿Qué acabas de configurar? Un entorno aislado con la librería de Pub/Sub lista para crear topics, suscripciones y publicar mensajes.",
        participationQuestions: [
          "¿Por qué fue importante crear un entorno virtual antes de instalar la librería de Pub/Sub?",
          "¿Qué ventaja viste al usar la librería de cliente de Python en lugar de trabajar solo con comandos manuales?",
        ],
      },
      {
        title: "Task 2: Create a topic",
        conceptNote:
          "Un topic funciona como punto central donde se publican mensajes para los suscriptores. Sin topic, no hay lugar donde depositar mensajes.",
        guidingQuestion:
          "¿Qué diferencia hay entre un topic y un mensaje?",
        observation:
          "Observa que crear el topic no genera mensajes — solo establece el canal por donde fluirán.",
        reflection:
          "¿Qué acabas de configurar? El canal de comunicación central del sistema de mensajería.",
        participationQuestions: [
          "¿Qué representa para ti un topic después de crear MyTopic?",
        ],
      },
      {
        title: "Task 3: Create a subscription",
        conceptNote:
          "La suscripción define cómo y quién recibirá los mensajes publicados. Sin suscripción, los mensajes se publican pero nadie los recibe.",
        guidingQuestion:
          "¿Por qué el orden de creación importa en Pub/Sub?",
        observation:
          "Observa que la suscripción se vincula al topic — cualquier mensaje posterior a su creación será entregable al subscriber.",
        reflection:
          "¿Qué acabas de configurar? El mecanismo de entrega que conecta el topic con el consumidor de mensajes.",
        participationQuestions: [
          "¿Por qué no basta con crear el topic y además se necesita una suscripción?",
        ],
      },
      {
        title: "Task 4: Publish messages",
        conceptNote:
          "Los mensajes quedan disponibles para que la suscripción los recupere posteriormente. El publisher no necesita saber quién ni cuándo los leerá.",
        guidingQuestion:
          "¿Qué ventaja tiene que el publisher y el subscriber no necesiten coincidir en tiempo?",
        observation:
          "Observa que publicar un mensaje no requiere que haya un subscriber activo en ese momento — Pub/Sub conserva los mensajes.",
        reflection:
          "¿Qué acabas de configurar? Mensajes depositados en el topic, listos para ser consumidos en cualquier momento.",
        participationQuestions: [
          "¿Qué observaste al publicar varios mensajes en el topic antes de leerlos con el subscriber?",
        ],
      },
      {
        title: "Task 5: View messages",
        conceptNote:
          "El flujo publisher-topic-subscriber funciona de forma desacoplada: producir y consumir son operaciones independientes en tiempo.",
        guidingQuestion:
          "¿Qué ventaja tiene un subscriber pull frente a una interacción síncrona directa?",
        observation:
          "Observa que el subscriber recupera los mensajes publicados anteriormente — confirmación de que Pub/Sub conservó y entregó correctamente.",
        reflection:
          "¿Qué acabas de configurar? La verificación completa del flujo: publicar → almacenar → entregar → confirmar.",
        participationQuestions: [
          "¿Qué te indica el hecho de que los mensajes se recuperen en el subscriber después de haber sido publicados?",
        ],
      },
    ],
  },
  {
    slug: "user-authentication-identity-aware-proxy",
    labNumber: 11,
    title: "User Authentication: Identity-Aware Proxy",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631673",
    description:
      "Restricción de acceso a aplicaciones web y verificación de la identidad del usuario mediante Identity-Aware Proxy (IAP).",
    overview: {
      serviceIcon: "/assets/Identity-Aware Proxy.svg",
      serviceName: "Identity-Aware Proxy",
      duration: "30 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Desplegar un servicio Cloud Run y protegerlo con IAP",
        "Acceder a la identidad del usuario desde encabezados HTTP",
        "Verificar criptográficamente la identidad con JWT firmado",
      ],
      steps: [
        {
          step: 1,
          action: "Desplegar app Hello World",
          detail: "Deploy de un servicio Flask en Cloud Run sin restricción",
          icon: "Upload",
        },
        {
          step: 2,
          action: "Activar IAP",
          detail: "Habilitar Identity-Aware Proxy y restringir acceso al servicio",
          icon: "Shield",
        },
        {
          step: 3,
          action: "Autorizar usuario",
          detail: "Agregar el rol IAP-Secured Web App User al estudiante",
          icon: "UserCheck",
        },
        {
          step: 4,
          action: "Leer identidad",
          detail: "Obtener email y ID del usuario desde headers X-Goog-Authenticated",
          icon: "User",
        },
        {
          step: 5,
          action: "Demostrar spoofing",
          detail: "Desactivar IAP y falsificar headers con curl para ver el riesgo",
          icon: "AlertTriangle",
        },
        {
          step: 6,
          action: "Verificación criptográfica",
          detail: "Validar JWT firmado (X-Goog-IAP-JWT-Assertion) con claves públicas",
          icon: "Lock",
        },
      ],
      whatYouLearn: [
        "IAP como capa centralizada de autenticación sin modificar código de la app",
        "Tres niveles de seguridad: acceso restringido, headers de identidad y JWT verificado",
        "Riesgo de spoofing cuando IAP se desactiva y solo se confía en headers",
        "Verificación criptográfica con firma ES256 y claves públicas de Google",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque va más allá de desplegar una aplicación: enseña cómo añadir una capa de autenticación y autorización centralizada con Identity-Aware Proxy. IAP intercepta las solicitudes, autentica al usuario y solo deja pasar las peticiones autorizadas; además, puede añadir información de identidad a los encabezados de la solicitud para que la app la use.\n\nLa parte más valiosa para el estudiante es que ve tres niveles de seguridad: acceso restringido por IAP, lectura de identidad desde encabezados y verificación criptográfica para evitar suplantación. Los encabezados con prefijo accounts.google.com: están disponibles por compatibilidad, pero no deben usarse como mecanismo de seguridad; para eso debe validarse el JWT firmado.\n\nDurante la práctica, el estudiante despliega un servicio en Cloud Run, restringe su acceso con IAP, lee los encabezados de usuario proporcionados por el proxy y finalmente valida criptográficamente la identidad mediante un JWT firmado.",
    concepts: [
      {
        term: "Identity-Aware Proxy (IAP)",
        definition:
          "Servicio de Google Cloud que se coloca delante de tu aplicación para controlar quién puede entrar, basado en identidad y permisos. IAP autentica al usuario, consulta IAM y solo deja pasar solicitudes autorizadas. Es una capa centralizada de seguridad: proteges apps sin reescribir toda la lógica de login. En el lab usas IAP para pasar de una app pública a una app con acceso restringido.",
      },
      {
        term: "Cloud Run",
        definition:
          "Servicio serverless de Google Cloud para ejecutar contenedores HTTP sin administrar servidores. Escala automáticamente y puede exponerse públicamente o protegerse con IAM/IAP. En este lab, Cloud Run hospeda la app Flask y sirve como ejemplo real de recurso que primero es publico y luego protegido por IAP.",
      },
      {
        term: "Autenticacion",
        definition:
          "Proceso de verificar la identidad de una persona o sistema: responde la pregunta 'quien eres'. Ejemplo: iniciar sesion con cuenta de Google. En el flujo de IAP, la autenticacion ocurre antes de que tu solicitud llegue a la app. Sin autenticacion, no se puede decidir si el usuario debe entrar o no.",
      },
      {
        term: "Autorizacion",
        definition:
          "Proceso de decidir que acciones puede hacer un usuario autenticado: responde la pregunta 'que puedes hacer'. En Google Cloud esto se define con IAM roles. En el lab, aunque un usuario este autenticado, solo entra si tiene el rol IAP-Secured Web App User sobre el recurso.",
      },
      {
        term: "IAM (Identity and Access Management)",
        definition:
          "Sistema de permisos de Google Cloud. Define quien (principal) tiene que rol sobre que recurso. IAP se apoya en IAM para permitir o denegar acceso. Si no asignas el rol correcto en IAM, IAP bloqueara incluso usuarios autenticados.",
      },
      {
        term: "Rol IAP-Secured Web App User",
        definition:
          "Rol de IAM que permite a un usuario acceder a una aplicacion web protegida por IAP. Es el permiso minimo para pasar por IAP hacia el backend. En el lab, asignar este rol al estudiante es clave; sin ese paso, la app queda protegida pero inaccesible.",
      },
      {
        term: "Principal",
        definition:
          "Identidad a la que le asignas permisos: puede ser un usuario, grupo, dominio o cuenta de servicio. En IAM, los permisos siempre se otorgan a un principal. En el lab, el principal principal es la cuenta del estudiante que recibira el rol de acceso a IAP.",
      },
      {
        term: "Headers de identidad",
        definition:
          "Encabezados HTTP que IAP agrega a la solicitud cuando el usuario ya fue autenticado. Ejemplos: X-Goog-Authenticated-User-Email y X-Goog-Authenticated-User-ID. Sirven para personalizar la app (mostrar quien eres), pero por si solos no son prueba criptografica fuerte.",
      },
      {
        term: "X-Goog-Authenticated-User-Email",
        definition:
          "Header que contiene el correo del usuario autenticado por IAP. Suele incluir prefijo como 'accounts.google.com:correo'. Es util para mostrar identidad en UI o aplicar reglas de negocio basicas, siempre que confies en que la solicitud realmente vino a traves de IAP.",
      },
      {
        term: "X-Goog-Authenticated-User-ID",
        definition:
          "Header con identificador estable del usuario autenticado. Es mejor que el correo para identificar usuarios de forma consistente, porque un email podria cambiar. En el lab se usa junto con el correo para demostrar que la app puede leer identidad del solicitante.",
      },
      {
        term: "Spoofing de headers",
        definition:
          "Ataque donde alguien envia headers falsos para hacerse pasar por otro usuario. Si tu app confia ciegamente en headers y IAP esta desactivado o bypassed, un atacante podria inyectar valores falsos con curl. Por eso el lab demuestra el riesgo al desactivar IAP.",
      },
      {
        term: "JWT (JSON Web Token)",
        definition:
          "Token compacto con tres partes (header.payload.signature) codificadas en base64url. Contiene claims de identidad y metadatos, y una firma para detectar alteraciones. IAP envia un JWT en X-Goog-IAP-JWT-Assertion para que la app valide que la identidad es autentica.",
      },
      {
        term: "X-Goog-IAP-JWT-Assertion",
        definition:
          "Header especial con JWT firmado por IAP. Es la fuente confiable para verificar identidad, porque incluye firma criptografica validable con claves publicas de Google. En el lab, validar este token es el nivel de seguridad mas alto frente a suplantacion.",
      },
      {
        term: "Firma criptografica",
        definition:
          "Mecanismo matematico que prueba integridad y origen de un mensaje. Si cambias un bit del JWT, la firma deja de ser valida. En IAP, la firma confirma que el token fue emitido por Google y no manipulado por un atacante.",
      },
      {
        term: "ES256",
        definition:
          "Algoritmo de firma digital (ECDSA con curva P-256 y SHA-256) usado por IAP para firmar JWTs. La app debe validar que el algoritmo sea el esperado y que la firma coincida con la clave publica oficial. Esto evita aceptar tokens forjados.",
      },
      {
        term: "Clave publica",
        definition:
          "Clave que se usa para verificar firmas (no para firmar). Google publica sus claves para que tu app pueda validar JWTs emitidos por IAP. El backend obtiene la clave correcta usando el 'kid' del token y comprueba la firma antes de confiar en los datos.",
      },
      {
        term: "Claims (iss, aud, exp, sub, email)",
        definition:
          "Campos dentro del payload JWT. 'iss' indica quien emitio el token, 'aud' para que servicio va dirigido, 'exp' cuando expira, 'sub' identifica usuario, 'email' su correo. Validar claims es tan importante como validar firma; un token firmado pero con aud incorrecta no debe aceptarse.",
      },
      {
        term: "Audience (aud)",
        definition:
          "Claim que indica a que aplicacion/recurso esta destinado el JWT. Evita reutilizacion de tokens en servicios distintos. En IAP debes verificar que 'aud' coincida exactamente con tu recurso protegido; si no coincide, rechazas la solicitud.",
      },
      {
        term: "Zero Trust",
        definition:
          "Modelo de seguridad que asume 'no confies en nada por defecto'. Cada solicitud se verifica continuamente por identidad, contexto y politica. IAP implementa principios Zero Trust porque no basta estar en la red interna: igual necesitas autenticacion y autorizacion para cada acceso.",
      },
      {
        term: "Defensa en profundidad",
        definition:
          "Estrategia de usar multiples capas de seguridad en vez de una sola. En este lab se ve claro: 1) IAP restringe acceso, 2) headers muestran identidad, 3) JWT firmado verifica identidad criptograficamente. Si una capa falla, las otras reducen riesgo.",
      },
      {
        term: "Principio de minimo privilegio",
        definition:
          "Buena practica de otorgar solo los permisos estrictamente necesarios, por el tiempo necesario. En lugar de dar roles amplios, asignas solo IAP-Secured Web App User a quienes realmente necesitan acceder. Reduce superficie de ataque y errores humanos.",
      },
    ],
    interactionPattern: [
      "App pública.",
      "App protegida por IAP.",
      "App con identidad verificada criptográficamente.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Deploy the application and protect it with IAP",
        conceptNote:
          "IAP intercepta solicitudes y permite el acceso solo a usuarios autorizados. Sin embargo, IAP protege el recurso pero el acceso depende de la política IAM que autoriza a cada usuario.",
        guidingQuestion:
          "¿Qué diferencia hay entre autenticar acceso y mostrar identidad dentro de la app?",
        observation:
          "Observa que antes de IAP cualquiera puede acceder; después de activar IAP, solo usuarios con rol IAP-Secured Web App User pueden entrar.",
        reflection:
          "¿Qué acabas de configurar? Una capa de protección centralizada que verifica identidad antes de dejar pasar solicitudes a tu app.",
        participationQuestions: [
          "¿Qué aprendiste al comparar la app pública con la app protegida por IAP?",
          "¿Por qué no basta con activar IAP si aún no has asignado permisos a usuarios?",
        ],
      },
      {
        title: "Task 2: Access user identity information",
        conceptNote:
          "La app puede mostrar la identidad del usuario autenticado por IAP a través de encabezados HTTP. Sin embargo, esos headers son de compatibilidad y deben compararse con la identidad verificada por JWT.",
        guidingQuestion:
          "¿Por qué una aplicación podría necesitar el correo del usuario?",
        observation:
          "Observa que X-Goog-Authenticated-User-Email y X-Goog-Authenticated-User-ID aparecen solo cuando IAP está activo — la app los lee sin esfuerzo adicional.",
        reflection:
          "¿Qué acabas de configurar? Una app que no solo está protegida, sino que conoce quién la está usando gracias a los encabezados de IAP.",
        participationQuestions: [
          "¿Qué cambia en la aplicación cuando empieza a leer X-Goog-Authenticated-User-Email y X-Goog-Authenticated-User-ID?",
          "¿Por qué esos encabezados sirven para mostrar identidad, pero no deberían considerarse suficientes como seguridad?",
        ],
      },
      {
        title: "Task 3: Use cryptographic verification",
        conceptNote:
          "El JWT firmado (X-Goog-IAP-JWT-Assertion) permite confirmar criptográficamente que la identidad provino de IAP sin alteración. Esto evita que una petición falsa o manipulada suplante la identidad si IAP se desactiva o se intenta omitir.",
        guidingQuestion:
          "¿Qué significa confiar en un header firmado y no en un header cualquiera? ¿Qué pasaría si alguien enviara encabezados falsos directamente al servicio?",
        observation:
          "Observa que la verificación criptográfica muestra la misma identidad que los headers simples, pero ahora sabes que es imposible falsificarla.",
        reflection:
          "¿Qué acabas de configurar? El nivel más alto de confianza en la identidad: verificación criptográfica que protege contra suplantación incluso si IAP falla.",
        participationQuestions: [
          "¿Qué ventaja aporta verificar X-Goog-IAP-JWT-Assertion en lugar de confiar solo en los headers visibles?",
          "¿Qué riesgo evitaste al validar la identidad con firma criptográfica?",
        ],
      },
    ],
  },
  {
    slug: "cloud-iam-qwik-start",
    labNumber: 12,
    title: "Cloud IAM: Qwik Start",
    labUrl:"https://www.skills.google/paths/36/course_templates/154/labs/631676",
    description:
      "Configuración y administración centralizada de políticas, roles y permisos de acceso con Cloud Identity and Access Management.",
    overview: {
      serviceIcon: "/assets/Identity And Access Management.svg",
      serviceName: "Cloud IAM",
      duration: "15 min",
      level: "Introductory",
      credits: 1,
      objectives: [
        "Comprender los roles básicos de IAM (Owner, Editor, Viewer, Browser)",
        "Otorgar y revocar permisos a usuarios sobre un proyecto",
        "Asignar roles granulares (Storage Object Viewer) a nivel de servicio",
      ],
      steps: [
        {
          step: 1,
          action: "Explorar roles del proyecto",
          detail: "Revisar los roles primitivos asignados a dos usuarios distintos",
          icon: "Users",
        },
        {
          step: 2,
          action: "Crear bucket y subir archivo",
          detail: "Preparar un bucket de Cloud Storage con un archivo de prueba",
          icon: "Upload",
        },
        {
          step: 3,
          action: "Verificar acceso Viewer",
          detail: "Confirmar que Username 2 puede ver el bucket con rol Viewer",
          icon: "Eye",
        },
        {
          step: 4,
          action: "Revocar acceso",
          detail: "Eliminar el rol Viewer de Username 2 y verificar pérdida de acceso",
          icon: "UserMinus",
        },
        {
          step: 5,
          action: "Asignar rol granular",
          detail: "Otorgar Storage Object Viewer a Username 2 para acceso específico",
          icon: "ShieldCheck",
        },
        {
          step: 6,
          action: "Verificar acceso granular",
          detail: "Confirmar acceso al bucket desde Cloud Shell con el rol específico",
          icon: "Terminal",
        },
      ],
      whatYouLearn: [
        "Roles primitivos (Owner, Editor, Viewer) y su alcance a nivel de proyecto",
        "Principio de mínimo privilegio: solo otorgar permisos necesarios",
        "Diferencia entre acceso amplio (Project Viewer) y granular (Storage Object Viewer)",
        "Cómo IAM unifica el control de acceso en un sistema consistente",
      ],
    },
    introduction:
      "Este laboratorio es complementario al AB porque permite ver de forma práctica cómo los roles de IAM cambian lo que un usuario puede o no puede hacer dentro de un proyecto. A través de dos identidades distintas, el estudiante observa cómo se otorgan, limitan y revocan permisos sobre recursos como Cloud Storage. IAM unifica el control de acceso de Google Cloud en un sistema consistente de operaciones y permisos.\n\nAdemás, este lab es útil para introducir la idea de mínimo privilegio: no todos los usuarios necesitan acceso total, y las acciones disponibles dependen directamente del rol asignado. Los roles básicos de IAM son amplios y afectan el comportamiento a nivel de proyecto, por lo que conviene usarlos con cuidado.\n\nDurante la práctica, el estudiante trabaja con dos identidades distintas para observar cómo cambian sus capacidades al asignar, revocar y restringir permisos sobre Cloud Storage y sobre el proyecto.",
    concepts: [
      {
        term: "IAM (Identity and Access Management)",
        definition:
          "Sistema de Google Cloud para gestionar quien puede hacer que sobre que recurso. IAM centraliza permisos en politicas que asignan roles a identidades. En vez de configurar cada servicio por separado, defines acceso desde un mismo modelo. En el lab usas IAM para dar, quitar y ajustar permisos entre dos usuarios.",
      },
      {
        term: "Rol",
        definition:
          "Conjunto predefinido de permisos. Un rol no es una persona, es un paquete de capacidades (por ejemplo: ver recursos, crear objetos, administrar IAM). En IAM no asignas permisos uno por uno normalmente; asignas roles a principals. En el lab comparas roles amplios de proyecto con roles granulares de Cloud Storage.",
      },
      {
        term: "Permiso",
        definition:
          "Accion puntual que se puede ejecutar sobre un recurso (ejemplo: storage.objects.get, resourcemanager.projects.get). Los roles son colecciones de permisos. Entender esto ayuda a aplicar minimo privilegio: das el rol que contiene solo los permisos necesarios.",
      },
      {
        term: "Principal",
        definition:
          "Identidad a la que se le asigna acceso. Puede ser usuario, grupo, cuenta de servicio o dominio. IAM siempre responde: que principal tiene que rol sobre que recurso. En el lab, Username 1 y Username 2 son principals distintos con capacidades diferentes.",
      },
      {
        term: "Politica IAM",
        definition:
          "Documento de reglas de acceso asociado a un recurso. Contiene bindings del tipo: principal -> rol. Cuando haces cambios en la consola IAM, realmente estas editando esta politica. En el lab, al agregar o quitar Viewer cambias la politica IAM del proyecto.",
      },
      {
        term: "Binding",
        definition:
          "Asociacion especifica entre un principal y un rol dentro de una politica IAM. Ejemplo: user:ana@example.com -> roles/viewer. Si eliminas ese binding, el usuario pierde esas capacidades. En el lab revocas acceso quitando un binding de Viewer.",
      },
      {
        term: "Proyecto (Project)",
        definition:
          "Contenedor logico de recursos en Google Cloud (Compute, Storage, APIs, IAM). Es tambien un limite administrativo y de facturacion. Si otorgas un rol a nivel proyecto, impacta potencialmente muchos recursos dentro de ese proyecto.",
      },
      {
        term: "Scope / Alcance",
        definition:
          "Nivel donde aplicas un rol: organizacion, carpeta, proyecto o recurso especifico. Roles en niveles altos heredan hacia abajo. En este lab comparas un alcance amplio (Viewer en proyecto) contra uno mas puntual (Storage Object Viewer para una necesidad concreta).",
      },
      {
        term: "Herencia de permisos",
        definition:
          "Comportamiento por el cual permisos otorgados en un nivel superior se aplican a niveles inferiores. Por ejemplo, un rol en proyecto afecta recursos dentro del proyecto. Esta herencia facilita administracion, pero puede dar mas acceso del necesario si no se diseña bien.",
      },
      {
        term: "Owner",
        definition:
          "Rol primitivo con permisos muy amplios, incluyendo gestion de permisos IAM del proyecto. Es poderoso y riesgoso si se usa en exceso. Debe reservarse para pocos administradores. En el lab, el usuario Owner puede crear recursos y administrar accesos.",
      },
      {
        term: "Editor",
        definition:
          "Rol primitivo amplio que permite modificar muchos recursos, pero sin todas las capacidades administrativas de Owner. Sigue siendo un rol grande y no siempre recomendable para uso cotidiano en equipos con seguridad estricta.",
      },
      {
        term: "Viewer",
        definition:
          "Rol primitivo de solo lectura a nivel proyecto. Permite ver recursos y configuraciones, pero no modificarlos. En el lab, Username 2 con Viewer puede observar el bucket creado por otro usuario, pero no administrarlo.",
      },
      {
        term: "Browser",
        definition:
          "Rol basico orientado a descubrimiento de recursos y metadatos, con menos capacidades que Viewer en muchos casos. Se usa para permitir navegacion minima sin otorgar lectura completa de ciertos datos.",
      },
      {
        term: "Storage Object Viewer",
        definition:
          "Rol mas granular enfocado en leer objetos de Cloud Storage. Permite acceso especifico a datos de almacenamiento sin abrir permisos amplios del proyecto completo. En el lab lo usas para demostrar minimo privilegio frente a Project Viewer.",
      },
      {
        term: "Roles primitivos vs roles granulares",
        definition:
          "Roles primitivos (Owner, Editor, Viewer) son amplios y rapidos de usar, pero suelen exceder permisos necesarios. Roles granulares/predefinidos por servicio limitan capacidades a tareas concretas. Buenas practicas modernas prefieren roles granulares.",
      },
      {
        term: "Minimo privilegio",
        definition:
          "Principio de seguridad que indica otorgar solo los permisos estrictamente necesarios para una tarea y nada mas. Reduce errores y superficie de ataque. Este lab lo muestra al pasar de acceso amplio de proyecto a un permiso puntual de Storage.",
      },
      {
        term: "Revocacion de acceso",
        definition:
          "Accion de quitar un rol o binding para retirar permisos. Es parte del ciclo normal de seguridad (onboarding y offboarding). En el lab, cuando revocas Viewer, Username 2 pierde acceso al proyecto y sus recursos.",
      },
      {
        term: "Propagacion de permisos",
        definition:
          "Tiempo que tarda Google Cloud en reflejar cambios IAM en todos sus sistemas. No siempre es instantaneo; puede haber segundos o minutos de retraso. En operaciones reales, esto importa para troubleshooting y para validar cambios antes de asumir que fallaron.",
      },
      {
        term: "Auditoria de acceso",
        definition:
          "Revision de quien tiene que permisos y por que. Se apoya en politicas IAM, registros de actividad y revisiones periodicas. Es clave para cumplimiento y seguridad. Aunque el lab es introductorio, practicar cambios controlados prepara para auditorias reales.",
      },
    ],
    interactionPattern: [
      "Usuario 1 con permisos elevados.",
      "Usuario 2 con rol Viewer.",
      "Revocar acceso.",
      "Conceder permiso específico de Cloud Storage.",
    ],
    participationRules: [
      "Solo pueden participar respondiendo una pregunta.",
      "Hay 6 preguntas diferentes.",
      "Responden 2 personas por pregunta.",
      "Las preguntas son abiertas.",
      "Deben estar 100% relacionadas con lo que hicieron manualmente.",
      "Se distribuyen a lo largo de las tasks.",
    ],
    tasks: [
      {
        title: "Task 1: Explore IAM console and roles",
        conceptNote:
          "Los roles básicos cambian el nivel de acceso y las acciones posibles. Owner incluye permisos para administrar roles y acceso dentro del proyecto, mientras Viewer solo permite lectura.",
        guidingQuestion:
          "¿Qué significa realmente \"tener permisos\" en una plataforma como Google Cloud?",
        observation:
          "Observa que Owner y Viewer tienen el mismo proyecto, pero capacidades completamente diferentes — el rol define qué puedes hacer.",
        reflection:
          "¿Qué acabas de configurar? Identificaste cómo dos usuarios con roles distintos tienen capacidades diferentes sobre los mismos recursos.",
        participationQuestions: [
          "¿Qué diferencia notaste entre ser Owner y ser Viewer dentro del mismo proyecto?",
          "¿Por qué crees que el rol Owner puede administrar permisos y el Viewer no?",
        ],
      },
      {
        title: "Task 2: Prepare a Cloud Storage bucket",
        conceptNote:
          "El acceso al recurso depende de las políticas IAM asignadas. El usuario con permisos de Owner puede crear recursos; el Viewer puede observarlos pero no modificarlos.",
        guidingQuestion:
          "¿Qué esperarías que vea el otro usuario después de que tú creas un bucket?",
        observation:
          "Observa que el usuario Viewer puede ver el bucket creado por Owner — su rol le permite lectura a nivel de proyecto.",
        reflection:
          "¿Qué acabas de configurar? Un recurso visible para ambos usuarios, pero administrable solo por quien tiene el rol adecuado.",
        participationQuestions: [
          "¿Qué aprendiste al crear un bucket desde la cuenta con mayores permisos y luego ver que el otro usuario sí podía observarlo?",
        ],
      },
      {
        title: "Task 3: Remove project access",
        conceptNote:
          "Al revocar el rol, el usuario pierde acceso a los recursos del proyecto. IAM puede tardar en reflejar cambios porque las políticas se distribuyen en el sistema.",
        guidingQuestion:
          "¿Qué pasa cuando un usuario deja de tener un rol que le permitía ver recursos?",
        observation:
          "Observa que después de revocar el rol Viewer, el segundo usuario ya no puede acceder al proyecto ni a sus recursos.",
        reflection:
          "¿Qué acabas de configurar? Una revocación de acceso que demuestra que los permisos son dinámicos y pueden retirarse en cualquier momento.",
        participationQuestions: [
          "¿Qué efecto viste al quitar el rol Viewer del segundo usuario sobre su acceso al proyecto?",
          "¿Por qué la propagación de permisos no es instantánea y qué implica eso para la administración?",
        ],
      },
      {
        title: "Task 4: Add Cloud Storage permissions",
        conceptNote:
          "El permiso Storage Object Viewer es más específico y sigue el principio de mínimo privilegio. En lugar de dar acceso a todo el proyecto, se concede solo lo necesario para la tarea.",
        guidingQuestion:
          "¿Por qué no siempre conviene volver a dar acceso a nivel de proyecto? ¿Qué evidencia te indica que un permiso específico sí funciona?",
        observation:
          "Observa que con Storage Object Viewer el usuario puede ver objetos en Cloud Storage pero no tiene acceso general al proyecto — mínimo privilegio en acción.",
        reflection:
          "¿Qué acabas de configurar? Un permiso granular que demuestra que se puede dar acceso solo a lo necesario sin exponer todo el proyecto.",
        participationQuestions: [
          "¿Qué diferencia hay entre darle a alguien acceso al proyecto completo y darle solo Storage Object Viewer?",
        ],
      },
    ],
  },
];

export function getLabContent(slug: string): LabContent | undefined {
  return labsContent.find((lab) => lab.slug === slug);
}
