export type LabTask = {
  title: string;
  conceptNote: string;
  guidingQuestion: string;
  observation: string;
  reflection: string;
  participationQuestions: string[];
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
};

export const labsContent: LabContent[] = [
  {
    slug: "create-a-virtual-machine",
    labNumber: 3,
    title: "Create a Virtual Machine",
    description:
      "Creación y configuración básica de una máquina virtual en Google Compute Engine explorando zonas y regiones.",
    introduction:
      "Este laboratorio es complementario al AB, porque no solo guía al estudiante a completar pasos técnicos, sino que agrega contexto conceptual, preguntas de reflexión y participación para reforzar el aprendizaje. El objetivo es que el estudiante no memorice comandos, sino que comprenda qué está haciendo al crear una VM, elegir una zona, abrir tráfico HTTP e instalar un servidor web. Compute Engine permite crear y administrar instancias desde la consola, la CLI de gcloud y otros mecanismos de gestión.\n\nTambién es importante que el estudiante reconozca que una VM no es solo \"una máquina encendida\", sino un recurso con configuración de región, zona, sistema operativo, disco y red. En Compute Engine, las instancias pertenecen a un proyecto, se crean en una zona específica y usan un sistema operativo e instancias de máquina definidos por el usuario.",
    concepts: [
      {
        term: "Región y zona",
        definition:
          "Una región agrupa varias zonas; la zona define dónde vive la VM y otros recursos zonales.",
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
        term: "Firewall HTTP",
        definition:
          "Habilitar tráfico HTTP permite que el navegador acceda al servidor web instalado en la VM.",
      },
      {
        term: "Cloud Shell",
        definition:
          "Es un entorno con herramientas ya listas, incluyendo gcloud, para administrar recursos de Google Cloud.",
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
    title: "App Engine: Qwik Start - Python",
    description:
      "Despliegue rápido de una aplicación web sencilla escrita en Python utilizando el entorno administrado App Engine.",
    introduction:
      "Este laboratorio es complementario al AB porque no se limita a seguir comandos: busca que el estudiante comprenda qué significa desplegar una aplicación en una plataforma administrada, qué parte controla el desarrollador y qué parte resuelve Google Cloud automáticamente. En App Engine standard, la aplicación corre sobre infraestructura administrada por Google con runtimes preconfigurados, lo que reduce la necesidad de gestionar servidores, sistema operativo y escalamiento manual.\n\nEn este lab, el valor formativo está en comparar tres momentos del trabajo real de desarrollo: probar localmente, modificar el código y desplegar a producción. Cloud Shell ofrece acceso autenticado al proyecto y permite ejecutar gcloud, editar archivos y desplegar desde un entorno listo para usar.\n\nAquí no solo se despliega una app en Python: también se analiza cómo App Engine permite concentrarse en el código mientras Google Cloud abstrae la infraestructura, el runtime administrado y buena parte de la operación del despliegue.",
    concepts: [
      {
        term: "App Engine",
        definition:
          "Plataforma para alojar aplicaciones sin administrar directamente servidores o VMs.",
      },
      {
        term: "Entorno estándar",
        definition:
          "Usa runtimes preconfigurados y está pensado para despliegue administrado y escalable.",
      },
      {
        term: "Cloud Shell",
        definition:
          "Entorno de línea de comandos con herramientas de desarrollo y acceso al proyecto de Google Cloud.",
      },
      {
        term: "Prueba local",
        definition:
          "Ejecutar la app antes del despliegue permite validar comportamiento y cambios en una vista previa.",
      },
      {
        term: "Deploy",
        definition:
          "Publicar la aplicación en App Engine para obtener una URL accesible desde navegador.",
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
    title: "Cloud Run Functions: Qwik Start - Command Line",
    description:
      "Creación y despliegue de una función serverless orientada a eventos mediante la interfaz de comandos.",
    introduction:
      "Este laboratorio es complementario al AB porque amplía la práctica técnica con explicaciones conceptuales sobre cómputo serverless, eventos, mensajería asíncrona y observabilidad mediante logs. En Cloud Run functions, el estudiante se concentra en escribir y desplegar código, mientras la plataforma administra la infraestructura subyacente y ejecuta la función cuando ocurre el evento configurado.\n\nA diferencia de una aplicación que permanece ejecutándose continuamente, aquí el código responde solo cuando algo sucede, por ejemplo la publicación de un mensaje en un tema de Pub/Sub. Pub/Sub es un servicio de mensajería asíncrona y administrada que desacopla productores y consumidores de mensajes.\n\nA lo largo de la actividad, el estudiante crea una función, la despliega, publica un mensaje en Pub/Sub y verifica mediante logs que el evento activó correctamente la ejecución del código. Cloud Run functions permite precisamente ese patrón: reaccionar a eventos sin administrar servidores de forma directa.",
    concepts: [
      {
        term: "Serverless",
        definition:
          "Modelo donde el proveedor administra infraestructura y escalamiento, mientras el desarrollador se enfoca en el código.",
      },
      {
        term: "Cloud Run functions",
        definition:
          "Funciones ligeras que se ejecutan en respuesta a eventos o invocaciones HTTP.",
      },
      {
        term: "Evento",
        definition:
          "Suceso que activa la ejecución, como un mensaje publicado en Pub/Sub.",
      },
      {
        term: "Pub/Sub",
        definition:
          "Servicio de mensajería asíncrona entre productores y consumidores desacoplados.",
      },
      {
        term: "Logs",
        definition:
          "Registros de ejecución que permiten verificar si la función respondió correctamente al evento. Google Cloud integra observabilidad para revisar la actividad de los servicios desplegados.",
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
    title: "Google Kubernetes Engine: Qwik Start",
    description:
      "Despliegue y escalado de una aplicación contenedorizada dentro de un entorno gestionado con Kubernetes.",
    introduction:
      "Este laboratorio es complementario al AB porque permite entender, paso a paso, cómo Kubernetes organiza el despliegue de aplicaciones en clústeres administrados por Google Cloud. En GKE, el estudiante no solo ejecuta comandos: también observa la relación entre clúster, nodos, Deployment y Service, que son piezas centrales de la arquitectura.\n\nAdemás, el laboratorio sirve para conectar contenedores con red y acceso externo. Un Deployment gestiona la aplicación, mientras que un Service de tipo LoadBalancer expone la carga de trabajo hacia Internet mediante balanceo de carga en Google Cloud.\n\nDurante la práctica, el estudiante configura la zona, crea un clúster, obtiene credenciales, despliega una aplicación, la expone mediante un Service y finalmente elimina el clúster. GKE proporciona la infraestructura administrada para ejecutar estos pasos dentro de un entorno de Kubernetes sobre Google Cloud.",
    concepts: [
      {
        term: "Cluster",
        definition:
          "Conjunto de control plane y nodos donde se ejecutan las cargas de trabajo.",
      },
      {
        term: "Node",
        definition:
          "Instancia de Compute Engine que corre los procesos de Kubernetes.",
      },
      {
        term: "Deployment",
        definition:
          "Objeto de Kubernetes para desplegar y mantener aplicaciones sin estado.",
      },
      {
        term: "Service",
        definition:
          "Objeto que define acceso, red y balanceo hacia la aplicación.",
      },
      {
        term: "LoadBalancer",
        definition:
          "Tipo de Service que crea un balanceador para exponer la app externamente.",
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
    description:
      "Uso de la herramienta de línea de comandos gsutil para realizar tareas básicas de gestión de objetos en Cloud Storage.",
    introduction:
      "Este laboratorio es complementario al AB porque no solo muestra cómo usar Cloud Storage desde la línea de comandos, sino que ayuda a entender qué significa almacenar datos en la nube, cómo se organizan en buckets y cómo se controlan los permisos de acceso. Cloud Storage usa buckets como contenedores básicos de objetos, y los nombres de bucket deben ser globalmente únicos y cumplir reglas estrictas de nomenclatura.\n\nAdemás, el lab introduce una práctica muy útil en contextos reales: verificar en la consola cada acción ejecutada desde Cloud Shell. Eso permite relacionar el comando con el cambio visible en la interfaz y reforzar el modelo mental de \"comando → efecto → verificación\".\n\nEste laboratorio complementa el AB porque introduce el uso de Cloud Storage desde la línea de comandos para crear buckets, subir y descargar objetos, organizarlos en carpetas lógicas y controlar permisos de acceso. Durante la práctica, el estudiante relaciona cada comando con un cambio visible en la consola y refuerza así el flujo de trabajo entre terminal e interfaz gráfica.",
    concepts: [
      {
        term: "Bucket",
        definition:
          "Contenedor básico donde se guardan los objetos.",
      },
      {
        term: "Objeto",
        definition:
          "Archivo o dato almacenado dentro del bucket.",
      },
      {
        term: "ACL",
        definition:
          "Lista de control de acceso usada para definir quién puede acceder a buckets u objetos.",
      },
      {
        term: "Cloud Shell",
        definition:
          "Terminal administrada para ejecutar comandos de Google Cloud.",
      },
      {
        term: "Public access",
        definition:
          "Permiso que permite consultar un objeto sin autenticación.",
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
    description:
      "Creación de una instancia administrada de MySQL en Cloud SQL y ejecución de operaciones SQL básicas.",
    introduction:
      "Este laboratorio es complementario al AB porque no solo enseña a crear una instancia de Cloud SQL, sino que ayuda a entender el flujo completo de trabajo con una base de datos administrada: configurar la instancia, conectarse con el cliente mysql, crear una base, cargar datos y consultarlos. Cloud SQL for MySQL está pensado para administrar bases relacionales en Google Cloud con menos carga operativa para el usuario.\n\nAdemás, este lab permite conectar la consola gráfica con la terminal, reforzando el hábito de verificar en la interfaz lo que se ejecuta por comando. Cloud SQL para MySQL es un servicio totalmente administrado para configurar, mantener y administrar bases MySQL en Google Cloud.\n\nDurante la práctica, el estudiante crea una instancia, se conecta desde Cloud Shell, crea una base de datos, define una tabla, inserta registros y consulta el contenido.",
    concepts: [
      {
        term: "Instancia Cloud SQL",
        definition:
          "Servidor administrado donde vive la base de datos.",
      },
      {
        term: "Instance ID",
        definition:
          "Identificador único de la instancia dentro del proyecto.",
      },
      {
        term: "Base de datos",
        definition:
          "Contenedor lógico dentro de la instancia para organizar tablas y datos.",
      },
      {
        term: "Tabla",
        definition:
          "Estructura para guardar registros con columnas definidas.",
      },
      {
        term: "Cliente mysql",
        definition:
          "Herramienta de línea de comandos para ejecutar consultas SQL.",
      },
      {
        term: "CREATE, USE, INSERT, SELECT",
        definition:
          "Comandos básicos para crear, seleccionar, insertar y consultar información.",
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
    description:
      "Exploración de la arquitectura de las APIs y ejecución práctica de métodos de la API de Cloud Storage desde Cloud Shell.",
    introduction:
      "Este laboratorio es complementario al AB porque no solo muestra cómo ejecutar llamadas a una API, sino que ayuda a entender la arquitectura detrás de esas llamadas: cliente, servidor, métodos HTTP, endpoints, JSON y autenticación. Google Cloud APIs son interfaces programáticas que permiten automatizar tareas y trabajar con servicios de Google Cloud desde la terminal o desde código.\n\nAdemás, el lab permite conectar la teoría con una práctica real: crear un JSON con la configuración del bucket, obtener un token OAuth y enviar una solicitud curl a un endpoint REST. La Cloud Storage JSON API está diseñada como una interfaz basada en JSON para acceder y manipular recursos de Cloud Storage.\n\nDurante la práctica, el estudiante habilita una API, prepara un JSON de configuración, obtiene un token de acceso y realiza llamadas REST para crear y usar recursos de Cloud Storage.",
    concepts: [
      {
        term: "API",
        definition:
          "Interfaz que permite que programas se comuniquen entre sí.",
      },
      {
        term: "Cliente y Servidor",
        definition:
          "El cliente hace la petición; el servidor recibe y procesa la petición.",
      },
      {
        term: "HTTP",
        definition:
          "Protocolo usado para intercambiar solicitudes y respuestas.",
      },
      {
        term: "Endpoint",
        definition:
          "URL o ruta concreta donde se accede a un recurso.",
      },
      {
        term: "REST / RESTful",
        definition:
          "Estilo de diseño que usa métodos HTTP y recursos identificables.",
      },
      {
        term: "JSON",
        definition:
          "Formato ligero para estructurar datos.",
      },
      {
        term: "OAuth",
        definition:
          "Mecanismo de autorización que permite obtener tokens de acceso seguros.",
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
    description:
      "Configuración de un sistema de mensajería asíncrona creando temas y suscripciones mediante scripts de Python.",
    introduction:
      "Este laboratorio es complementario al AB porque enseña, con práctica manual, cómo funciona un sistema de mensajería desacoplado entre productores y consumidores. El estudiante crea un tópico, crea una suscripción, publica mensajes y luego los consume, lo que permite visualizar claramente el patrón publisher-subscriber que define a Pub/Sub.\n\nAdemás, el lab ayuda a entender que una suscripción no es solo \"seguir\" un tema, sino establecer un mecanismo de entrega y confirmación de mensajes. Pub/Sub ofrece suscripciones de tipo pull y push, y en este laboratorio se trabaja con un subscriber pull para recuperar mensajes del tópico.\n\nDurante la práctica, el estudiante crea un entorno virtual, instala la librería cliente de Python, crea un topic, configura una suscripción, publica mensajes y finalmente recupera esos mensajes desde el subscriber. Pub/Sub permite desacoplar productores y consumidores mediante topics y subscriptions.",
    concepts: [
      {
        term: "Topic",
        definition:
          "Punto común al que los publishers envían mensajes.",
      },
      {
        term: "Publisher",
        definition:
          "Aplicación que publica mensajes en un topic.",
      },
      {
        term: "Subscriber",
        definition:
          "Aplicación que recibe mensajes desde una suscripción.",
      },
      {
        term: "Subscription",
        definition:
          "Vínculo entre el topic y el consumidor.",
      },
      {
        term: "Pull subscription",
        definition:
          "El cliente solicita mensajes al servidor.",
      },
      {
        term: "Acknowledge",
        definition:
          "Confirmación de que un mensaje fue recibido y procesado.",
      },
      {
        term: "Asynchronous messaging",
        definition:
          "Modelo en el que productor y consumidor no necesitan coincidir en tiempo real.",
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
    description:
      "Restricción de acceso a aplicaciones web y verificación de la identidad del usuario mediante Identity-Aware Proxy (IAP).",
    introduction:
      "Este laboratorio es complementario al AB porque va más allá de desplegar una aplicación: enseña cómo añadir una capa de autenticación y autorización centralizada con Identity-Aware Proxy. IAP intercepta las solicitudes, autentica al usuario y solo deja pasar las peticiones autorizadas; además, puede añadir información de identidad a los encabezados de la solicitud para que la app la use.\n\nLa parte más valiosa para el estudiante es que ve tres niveles de seguridad: acceso restringido por IAP, lectura de identidad desde encabezados y verificación criptográfica para evitar suplantación. Los encabezados con prefijo accounts.google.com: están disponibles por compatibilidad, pero no deben usarse como mecanismo de seguridad; para eso debe validarse el JWT firmado.\n\nDurante la práctica, el estudiante despliega un servicio en Cloud Run, restringe su acceso con IAP, lee los encabezados de usuario proporcionados por el proxy y finalmente valida criptográficamente la identidad mediante un JWT firmado.",
    concepts: [
      {
        term: "Identity-Aware Proxy (IAP)",
        definition:
          "Servicio de Google Cloud que controla acceso según identidad del usuario.",
      },
      {
        term: "Cloud Run",
        definition:
          "Plataforma para desplegar servicios web administrados.",
      },
      {
        term: "Headers de identidad",
        definition:
          "Encabezados HTTP que IAP añade con el correo e ID del usuario.",
      },
      {
        term: "JWT firmado",
        definition:
          "Objeto criptográficamente firmado que permite verificar que la identidad no fue alterada.",
      },
      {
        term: "Zero trust",
        definition:
          "Modelo de seguridad que no confía por defecto y verifica cada acceso.",
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
    description:
      "Configuración y administración centralizada de políticas, roles y permisos de acceso con Cloud Identity and Access Management.",
    introduction:
      "Este laboratorio es complementario al AB porque permite ver de forma práctica cómo los roles de IAM cambian lo que un usuario puede o no puede hacer dentro de un proyecto. A través de dos identidades distintas, el estudiante observa cómo se otorgan, limitan y revocan permisos sobre recursos como Cloud Storage. IAM unifica el control de acceso de Google Cloud en un sistema consistente de operaciones y permisos.\n\nAdemás, este lab es útil para introducir la idea de mínimo privilegio: no todos los usuarios necesitan acceso total, y las acciones disponibles dependen directamente del rol asignado. Los roles básicos de IAM son amplios y afectan el comportamiento a nivel de proyecto, por lo que conviene usarlos con cuidado.\n\nDurante la práctica, el estudiante trabaja con dos identidades distintas para observar cómo cambian sus capacidades al asignar, revocar y restringir permisos sobre Cloud Storage y sobre el proyecto.",
    concepts: [
      {
        term: "IAM",
        definition:
          "Sistema de Google Cloud para crear y administrar permisos.",
      },
      {
        term: "Rol",
        definition:
          "Conjunto de permisos asignados a un usuario o principal.",
      },
      {
        term: "Viewer",
        definition:
          "Rol de solo lectura.",
      },
      {
        term: "Owner",
        definition:
          "Rol con permisos para administrar roles y permisos del proyecto.",
      },
      {
        term: "Principal",
        definition:
          "Identidad a la que se le asigna acceso.",
      },
      {
        term: "Proyecto",
        definition:
          "Contenedor de recursos y políticas de IAM.",
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
