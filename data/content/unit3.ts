import { TopicContent } from "./unit1";

export const unit3Content: TopicContent[] = [
  {
    slug: "opciones-computo",
    title: "Opciones de cómputo en la nube",
    readingTime: "10 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Identificar que no todas las cargas se ejecutan igual en la nube y que existen distintas opciones de cómputo según el nivel de control y abstracción",
      "Diferenciar cuándo conviene usar máquinas virtuales, plataformas administradas, contenedores u opciones serverless",
      "Relacionar tipos de aplicaciones con la opción de cómputo más adecuada, usando Google Cloud como referencia principal",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si todas las aplicaciones necesitan ejecutarse en algún lugar, ¿por qué no usar siempre el mismo tipo de servicio para todo?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Las opciones de cómputo en la nube representan distintas formas de ejecutar aplicaciones y cargas de trabajo. La diferencia principal entre ellas está en cuánto control tiene el usuario sobre la infraestructura y cuánto de la operación queda administrado por el proveedor.",
      },
      {
        type: "text",
        title: "Cómputo no es solo 'un servidor'",
        content:
          "En la nube, 'cómputo' no significa solo tener un servidor virtual. También puede significar desplegar una aplicación completa en una plataforma administrada, ejecutar un contenedor sin gestionar servidores o lanzar funciones que responden a eventos. Una de las decisiones más importantes al trabajar en cloud es elegir dónde corre tu carga de trabajo y cuánto quieres administrar tú mismo.",
      },
      {
        type: "text",
        content:
          "Google Cloud ofrece varias opciones que cubren distintos niveles de abstracción: Compute Engine da control sobre máquinas virtuales; GKE permite operar contenedores con Kubernetes; Cloud Run ejecuta contenedores en un entorno serverless; App Engine se enfoca en aplicaciones web administradas; y Cloud Functions responde a eventos con funciones individuales. Lo importante no es memorizar nombres, sino entender la lógica: a más control, más responsabilidad operativa; a más abstracción, menos gestión de infraestructura.",
      },
      {
        type: "computeOptions",
      },
      {
        type: "tabs",
        title: "Opciones de cómputo por nivel de abstracción",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Las opciones de cómputo forman una escala de abstracción: (1) VMs — máximo control, el usuario administra todo desde el SO; (2) Plataforma administrada — el proveedor gestiona la infra, el usuario despliega la app; (3) Contenedores gestionados — orquestación con Kubernetes administrado; (4) Contenedores serverless — ejecutar contenedores sin clúster; (5) Funciones — código breve disparado por eventos. Cada nivel reduce la operación manual pero también el control directo.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud mapea esta escala así: Compute Engine (VMs configurables) → App Engine (PaaS para apps web) → GKE (Kubernetes administrado) → Cloud Run (contenedores serverless) → Cloud Functions (FaaS por evento). Cada servicio tiene su caso ideal y no son mutuamente excluyentes: una arquitectura puede combinar varios.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS la escala equivalente es: EC2 (VMs) → Elastic Beanstalk (PaaS) → EKS (Kubernetes) → App Runner/Fargate (contenedores serverless) → Lambda (FaaS). Los conceptos son los mismos; cambian los nombres comerciales.",
          },
        ],
      },
      {
        type: "table",
        title: "Opciones de cómputo — comparación rápida",
        headers: ["Nivel", "Enfoque", "Google Cloud", "Equivalente AWS", "Control del usuario"],
        rows: [
          ["Infraestructura", "Máximo control sobre SO y configuración", "Compute Engine", "EC2", "Alto — SO, red, disco, software"],
          ["Plataforma", "Desplegar app sin gestionar servidores", "App Engine", "Elastic Beanstalk", "Medio — código y configuración"],
          ["Contenedores gestionados", "Orquestación con Kubernetes", "GKE", "EKS", "Medio-alto — pods, servicios, deployments"],
          ["Contenedores serverless", "Ejecutar contenedor sin clúster", "Cloud Run", "App Runner / Fargate", "Bajo — solo el contenedor"],
          ["Funciones", "Código breve por evento", "Cloud Functions", "Lambda", "Mínimo — solo la función"],
        ],
      },
      {
        type: "scenario",
        title: "¿Qué opción elegirías?",
        scenarios: [
          {
            situation: "Una universidad necesita migrar un software heredado que requiere Windows Server 2016 y dependencias específicas de .NET Framework 4.5.",
            question: "¿Qué opción de cómputo es la más adecuada?",
            hint: "Máquina virtual (Compute Engine). Necesita control total del SO y configuración específica que no se puede lograr en un servicio administrado.",
          },
          {
            situation: "Un equipo de desarrollo quiere desplegar una API REST en Python que recibe tráfico variable: mucho en horario laboral, casi nada en la noche.",
            question: "¿Dónde debería correr esta API?",
            hint: "Cloud Run. Escala a cero automáticamente y solo pagas por solicitudes procesadas. Perfecto para tráfico variable sin gestionar infraestructura.",
          },
          {
            situation: "Necesitas que cada vez que un estudiante suba un archivo a Cloud Storage, se genere automáticamente una vista previa en miniatura.",
            question: "¿Qué opción es la más eficiente?",
            hint: "Cloud Functions. Es una tarea breve, disparada por un evento (subida de archivo), sin necesidad de un servidor corriendo permanentemente.",
          },
          {
            situation: "Tu equipo trabaja con microservicios empaquetados en Docker y necesita networking avanzado, service mesh y despliegues canary.",
            question: "¿Qué opción ofrece ese nivel de orquestación?",
            hint: "GKE (Google Kubernetes Engine). Kubernetes ofrece el nivel de control sobre microservicios, networking y estrategias de despliegue que necesitas.",
          },
        ],
      },
      {
        type: "list",
        title: "Criterios para elegir una opción de cómputo",
        items: [
          "¿Necesito control del sistema operativo? → VM (Compute Engine)",
          "¿Solo quiero desplegar código sin pensar en infraestructura? → App Engine o Cloud Run",
          "¿Mi aplicación está empaquetada en contenedores con Docker? → Cloud Run o GKE",
          "¿Necesito orquestación compleja de microservicios? → GKE",
          "¿Es una tarea breve disparada por un evento? → Cloud Functions",
          "¿El tráfico es muy variable y quiero pagar solo por uso? → Cloud Run o Cloud Functions",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué factor diferencia principalmente una opción de cómputo de otra en la nube?",
        options: [
          {
            label: "El logo del proveedor",
            correct: false,
            explanation: "El proveedor no define la diferencia entre opciones. La misma escala de abstracción existe en GCP, AWS y Azure.",
          },
          {
            label: "El nivel de control y de responsabilidad operativa que tiene el usuario",
            correct: true,
            explanation: "Correcto. Desde VMs (máximo control, máxima responsabilidad) hasta funciones serverless (mínimo control, mínima operación), cada opción equilibra control vs. gestión.",
          },
          {
            label: "La cantidad de menús en la consola",
            correct: false,
            explanation: "La interfaz de la consola no define las diferencias técnicas entre opciones de cómputo.",
          },
          {
            label: "El idioma de la documentación",
            correct: false,
            explanation: "El idioma no tiene relación con las diferencias técnicas entre modelos de cómputo.",
          },
        ],
      },
    ],
  },
  {
    slug: "regiones-zonas",
    title: "Regiones y zonas de Google Cloud",
    readingTime: "8 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Entender qué es una región y qué es una zona en Google Cloud",
      "Distinguir por qué no son lo mismo y cómo se relacionan entre sí",
      "Relacionar su elección con disponibilidad, latencia y recuperación ante fallos",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si una aplicación se cae en un lugar, ¿debería dejar de funcionar por completo o seguir operando desde otra parte?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "En Google Cloud, una región es una ubicación geográfica amplia (como us-central1). Una zona es una parte aislada dentro de esa región (como us-central1-a). Las zonas están pensadas para dar separación e independencia ante fallos, y las regiones para organizar recursos cerca de los usuarios.",
      },
      {
        type: "text",
        title: "Región vs. zona: la geografía de la nube",
        content:
          "La región es el lugar general donde se ubican los recursos. La zona es el sitio más específico donde realmente vive parte de esa infraestructura. Una región contiene varias zonas. Las zonas dentro de una misma región están conectadas con red de baja latencia y alto ancho de banda. Si una zona falla, las otras pueden seguir funcionando — por eso ayudan a mejorar la disponibilidad.",
      },
      {
        type: "text",
        content:
          "Elegir región y zona no es solo un detalle técnico: afecta latencia (cercanía con usuarios), resiliencia (tolerancia a fallos) y en algunos casos regulación (dónde deben residir los datos). Para una app con usuarios en México, elegir una región cercana puede reducir significativamente el tiempo de respuesta.",
      },
      {
        type: "text",
        title: "Forma fácil de pensarlo",
        content:
          "Piensa en la región como una ciudad y en la zona como un barrio o distrito dentro de esa ciudad. Si un barrio tiene un problema, la ciudad no desaparece entera. Esa es la lógica de separación y tolerancia a fallos que Google Cloud aplica con zonas.",
      },
      {
        type: "regionZoneMap",
      },
      {
        type: "table",
        title: "Componentes de la infraestructura geográfica",
        headers: ["Componente", "Descripción", "Ejemplo"],
        rows: [
          ["Región", "Conjunto geográfico amplio", "us-central1 (Iowa), southamerica-east1 (São Paulo)"],
          ["Zona", "Subdivisión aislada dentro de la región", "us-central1-a, us-central1-b, us-central1-c"],
          ["Recursos zonales", "Viven en una sola zona", "Una VM específica, un disco persistente"],
          ["Recursos regionales", "Abarcan varias zonas de una misma región", "IP estática regional, disco regional"],
          ["Conectividad interna", "Enlaces rápidos y de baja latencia entre zonas", "Red privada de Google entre zonas de una región"],
        ],
      },
      {
        type: "tabs",
        title: "Regiones y zonas en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "La separación en zonas permite que un fallo en la infraestructura de un centro de datos no afecte a los demás dentro de la misma región. Distribuir recursos en múltiples zonas (multi-zonal) o regiones (multi-regional) mejora la disponibilidad del sistema. La elección de región impacta: latencia, costo, disponibilidad de servicios y cumplimiento regulatorio.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Google Cloud tiene 40+ regiones en 5 continentes, cada una con 3 o más zonas. Los recursos se crean en una zona específica (ej: gcloud compute instances create mi-vm --zone=us-central1-a). Para alta disponibilidad, se distribuyen réplicas en múltiples zonas o se usan servicios regionales.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "AWS usa el mismo modelo con Regions y Availability Zones (AZs). Cada región tiene 2-6 AZs. El concepto es idéntico: AZs son centros de datos aislados dentro de una región, y distribuir recursos entre AZs mejora la disponibilidad.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Decisiones de región y zona",
        scenarios: [
          {
            situation: "Tu aplicación tiene usuarios principalmente en América Latina y necesitas baja latencia.",
            question: "¿Qué conviene más: una región en EE.UU. o una en Sudamérica?",
            hint: "Una región cercana a los usuarios (southamerica-east1 en São Paulo) reducirá la latencia. Si no hay una región exacta en México, la más cercana geográficamente es la mejor opción.",
          },
          {
            situation: "Tienes una app crítica que no puede detenerse si falla un centro de datos.",
            question: "¿Una sola zona o varias zonas?",
            hint: "Varias zonas (multi-zonal). Si una zona falla, las instancias en otras zonas siguen funcionando. Es la forma básica de alta disponibilidad en la nube.",
          },
          {
            situation: "Despliegas una VM para un laboratorio de prueba temporal que no necesita alta disponibilidad.",
            question: "¿Necesitas distribuir en múltiples zonas?",
            hint: "No necesariamente. Para un entorno de prueba temporal, una sola zona es suficiente y más simple. La multi-zona se justifica para producción crítica.",
          },
        ],
      },
      {
        type: "list",
        title: "Resumen para exponer",
        items: [
          "Una región es un área geográfica amplia (ej: us-central1)",
          "Una zona es una subdivisión aislada dentro de esa región (ej: us-central1-a)",
          "Las zonas ayudan a evitar que una sola falla detenga todo",
          "La elección impacta latencia, disponibilidad y resiliencia",
          "Piensa en región como ciudad y zona como barrio",
          "Juntas permiten diseñar sistemas más disponibles, rápidos y resistentes",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué pasa si una zona de Google Cloud experimenta una falla?",
        options: [
          {
            label: "Todos los recursos de la región se caen automáticamente",
            correct: false,
            explanation: "Las zonas están aisladas entre sí. Una falla en una zona no afecta a las demás dentro de la misma región.",
          },
          {
            label: "Los recursos en esa zona se ven afectados, pero los de otras zonas siguen funcionando",
            correct: true,
            explanation: "Correcto. Las zonas son independientes. Por eso distribuir recursos en múltiples zonas mejora la disponibilidad.",
          },
          {
            label: "Google Cloud redirige todo a otra zona automáticamente sin configuración",
            correct: false,
            explanation: "La redirección automática requiere configuración previa (balanceadores, instancias en múltiples zonas). No ocurre por sí sola.",
          },
          {
            label: "No pasa nada porque la nube nunca falla",
            correct: false,
            explanation: "Cualquier infraestructura puede fallar. Las zonas existen precisamente para mitigar el impacto de esas fallas.",
          },
        ],
      },
    ],
  },
  {
    slug: "maquinas-virtuales",
    title: "Máquinas virtuales",
    readingTime: "10 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Comprender qué es una máquina virtual y por qué sigue siendo una base importante del cómputo cloud",
      "Identificar cuándo conviene usar máquinas virtuales frente a opciones más administradas",
      "Relacionar las VMs con escenarios reales como migración, control del sistema operativo y software especializado",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si existen servicios más modernos como contenedores y serverless, ¿por qué las máquinas virtuales siguen siendo tan importantes?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una máquina virtual es una instancia de cómputo que simula un servidor completo y permite al usuario definir sistema operativo, CPU, memoria, disco y software instalado. En la nube, las VMs ofrecen flexibilidad y control cuando una aplicación necesita más personalización de la infraestructura.",
      },
      {
        type: "text",
        title: "El servidor configurable en la nube",
        content:
          "Las máquinas virtuales siguen siendo fundamentales porque representan la forma más directa de trasladar la lógica del servidor tradicional al entorno cloud. En lugar de comprar hardware físico, el usuario aprovisiona una máquina virtual con las características que necesita y la ejecuta bajo demanda. Esto hace que las VMs sean especialmente útiles para migraciones, sistemas heredados y aplicaciones que requieren configuraciones específicas.",
      },
      {
        type: "text",
        content:
          "En Google Cloud, Compute Engine es la referencia para este modelo. Permite elegir configuraciones predefinidas o personalizadas de CPU, memoria, almacenamiento y, en ciertos casos, GPU. Una VM debe entenderse como una 'computadora remota configurable' que vive en la nube, pero con responsabilidades de administración que el usuario conserva: sistema operativo, parches, seguridad y software.",
      },
      {
        type: "text",
        content:
          "Esto la diferencia claramente de servicios más administrados. Con una VM tienes más libertad, pero también más trabajo: debes decidir configuraciones, instalar componentes, vigilar actualizaciones y entender el entorno de ejecución. Por eso, elegir una VM es elegir control a cambio de responsabilidad operativa.",
      },
      {
        type: "vmBuilder",
      },
      {
        type: "tabs",
        title: "Máquinas virtuales en contexto",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Una VM en la nube incluye: (1) Sistema operativo — Linux o Windows que tú eliges e instalas; (2) CPU y memoria — configurables según la carga; (3) Disco — almacenamiento persistente adjunto; (4) Red — IP, firewall, VPC; (5) Opcionalmente: GPU, discos adicionales, snapshots. El usuario es responsable de administrar todo lo que está dentro de la VM; el proveedor administra el hardware físico debajo.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Compute Engine ofrece: familias de máquinas (e2 para uso general, n2 para balanceado, c2 para cómputo intensivo, m2 para memoria), tipos personalizados (tú defines CPU y RAM exactos), imágenes de SO públicas y custom, discos persistentes (pd-standard, pd-balanced, pd-ssd), GPUs (NVIDIA T4, V100, A100) y VMs preemptibles/spot para ahorro.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "EC2 es el equivalente: familias de instancias (t3 general, m5 balanceado, c5 cómputo, r5 memoria), AMIs para imágenes de SO, volúmenes EBS para disco, y spot instances para ahorro. El concepto es idéntico: servidor virtual configurable bajo demanda.",
          },
        ],
      },
      {
        type: "table",
        title: "Cuándo usar máquinas virtuales",
        headers: ["Caso", "¿Por qué usar una VM?", "Ejemplo en Google Cloud"],
        rows: [
          ["Migración de apps heredadas", "Necesitan un SO o configuración específica que no se adapta a contenedores", "Compute Engine con Windows Server e imagen custom"],
          ["Software con dependencias particulares", "Requiere instalar paquetes, librerías o frameworks concretos", "VM con Ubuntu + CUDA + TensorFlow para ML"],
          ["Control detallado del entorno", "Se necesita administrar CPU, memoria, disco o configuración de red", "VM con tipo personalizado (custom machine type)"],
          ["Uso de aceleradores", "Cargas que requieren GPUs para procesamiento paralelo", "Compute Engine + GPU NVIDIA T4/A100"],
          ["Desarrollo y pruebas", "Entornos aislados que replican producción", "VM preemptible/spot de bajo costo para laboratorios"],
        ],
      },
      {
        type: "starService",
        serviceName: "Compute Engine",
        icon: "/assets/Compute Engine.svg",
        description: "Compute Engine es el servicio de infraestructura como servicio (IaaS) de Google Cloud que permite crear y ejecutar máquinas virtuales en la infraestructura global de Google. Ofrece control total sobre el sistema operativo, la configuración de red, el almacenamiento y los aceleradores de hardware. Es la base para cargas que requieren personalización completa del entorno.",
        features: [
          "Familias de máquinas: E2 (general), N2 (balanceado), C2 (cómputo), M2 (memoria), A2 (GPU)",
          "Tipos personalizados: define CPU y RAM exactos según tu necesidad",
          "Imágenes de SO públicas (Ubuntu, Windows, Debian) y custom",
          "Discos persistentes: pd-standard, pd-balanced, pd-ssd, pd-extreme",
          "VMs preemptibles/spot: hasta 91% de descuento para cargas tolerantes",
          "Live Migration: las VMs se mueven entre hosts sin downtime",
          "GPUs y TPUs para machine learning y HPC",
          "Autoescalado con Managed Instance Groups (MIG)",
        ],
        commands: [
          { command: "gcloud compute instances create my-vm --zone=us-central1-a --machine-type=e2-medium", description: "Crear una VM tipo e2-medium en la zona us-central1-a" },
          { command: "gcloud compute instances list", description: "Listar todas las VMs del proyecto actual" },
          { command: "gcloud compute ssh my-vm --zone=us-central1-a", description: "Conectarse por SSH a una VM" },
          { command: "gcloud compute instances stop my-vm --zone=us-central1-a", description: "Detener una VM (deja de cobrar CPU, sigue cobrando disco)" },
          { command: "gcloud compute instances delete my-vm --zone=us-central1-a", description: "Eliminar una VM y liberar todos sus recursos" },
          { command: "gcloud compute disks snapshot my-disk --zone=us-central1-a", description: "Crear un snapshot (respaldo) de un disco persistente" },
        ],
      },
      {
        type: "useCaseCards",
        serviceName: "Compute Engine",
        cases: [
          {
            title: "Necesito una computadora para simulación numérica pesada",
            icons: ["cpu", "flask", "chart"],
            explanation:
              "Las simulaciones numéricas (elementos finitos, dinámica de fluidos, Monte Carlo) requieren control total del SO, acceso a GPU y grandes cantidades de RAM. Una VM permite configurar exactamente los recursos que la simulación necesita, instalar librerías científicas específicas (CUDA, OpenMPI) y ejecutar jobs de larga duración sin interrupciones.",
            subjects: [
              "Simulación Estocástica",
              "Métodos Numéricos",
            ],
            tag: "GPU/HPC",
          },
          {
            title: "Montar un servidor de base de datos con configuración avanzada",
            icons: ["database", "lock", "disk"],
            explanation:
              "Cuando necesitas un motor de base de datos con tuning avanzado (buffer pool, WAL, replication custom), o un DBMS no soportado como servicio administrado, una VM te da acceso directo al filesystem, configuración de disco (SSD/HDD) y parámetros del SO que un servicio managed no permite modificar.",
            subjects: [
              "Base de Datos",
              "Admin. de Base de Datos",
              "Seguridad Computacional",
            ],
            tag: "control total",
          },
          {
            title: "Entrenar un modelo de IA/ML con GPU dedicada",
            icons: ["brain", "cpu", "chart"],
            explanation:
              "El entrenamiento de modelos de machine learning y deep learning requiere GPUs (NVIDIA T4, V100, A100) con drivers CUDA instalados. Compute Engine permite adjuntar GPUs a una VM, instalar frameworks como TensorFlow o PyTorch, y ejecutar entrenamiento durante horas o días. VMs spot con GPU reducen costos hasta 91%.",
            subjects: [
              "Sistemas Inteligentes",
              "Minería de Datos",
              "Pronósticos",
            ],
            tag: "GPU/HPC",
          },
          {
            title: "Correr un servidor de graficación o renderizado 3D",
            icons: ["monitor", "cpu", "cog"],
            explanation:
              "Aplicaciones de graficación por computadora y renderizado 3D necesitan GPUs potentes y configuraciones específicas de OpenGL/Vulkan. Una VM con GPU dedicada permite instalar drivers gráficos, ejecutar renders pesados de forma remota y usar herramientas como Blender, VTK o frameworks custom sin depender de hardware local.",
            subjects: [
              "Graficación por Computadora",
              "Programación Multimedia",
            ],
            tag: "GPU/HPC",
          },
        ],
      },
      {
        type: "scenario",
        title: "¿VM o servicio administrado?",
        scenarios: [
          {
            situation: "Un laboratorio universitario necesita ejecutar una simulación científica que requiere librerías específicas de Linux, acceso a GPU y 64 GB de RAM.",
            question: "¿VM o servicio administrado?",
            hint: "VM (Compute Engine). Necesita control total del SO, GPU y memoria alta. Un servicio administrado no ofrece ese nivel de personalización.",
          },
          {
            situation: "Un equipo quiere desplegar una API sencilla en Flask (Python) que no requiere nada especial del SO.",
            question: "¿Justifica una VM?",
            hint: "Probablemente no. Cloud Run o App Engine son más eficientes para una API estándar. Una VM agregaría trabajo de administración innecesario.",
          },
          {
            situation: "Una empresa necesita migrar 50 servidores Windows con aplicaciones .NET Framework 4.x desde su datacenter a la nube sin modificar el código.",
            question: "¿Qué opción es la más práctica?",
            hint: "VMs (Compute Engine con Windows Server). La migración 'lift-and-shift' mueve las apps tal cual a VMs en la nube, sin reescribir código.",
          },
        ],
      },
      {
        type: "list",
        title: "Buenas prácticas con máquinas virtuales",
        items: [
          "Elige el tipo de máquina más pequeño que cubra tu necesidad — puedes escalar después",
          "Usa imágenes base actualizadas y aplica parches de seguridad regularmente",
          "Configura snapshots automáticos del disco para respaldos",
          "Apaga las VMs que no estés usando — siguen costando por disco pero ahorras CPU",
          "Usa VMs preemptibles/spot para cargas tolerantes a interrupciones (laboratorios, batch)",
          "Etiqueta las VMs con labels para control de costos (environment=dev, course=cloud)",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es una razón común para elegir una máquina virtual en lugar de una opción más administrada?",
        options: [
          {
            label: "Porque siempre es más barata",
            correct: false,
            explanation: "Las VMs no siempre son más baratas. Para cargas con tráfico variable, opciones serverless pueden ser más económicas porque escalan a cero.",
          },
          {
            label: "Porque ofrece más control sobre el sistema operativo y la configuración",
            correct: true,
            explanation: "Correcto. La razón principal es el control: elegir SO, instalar software específico, configurar red y acceder a hardware especializado como GPUs.",
          },
          {
            label: "Porque no requiere administración",
            correct: false,
            explanation: "Al contrario: las VMs requieren más administración (parches, seguridad, configuración). Los servicios administrados reducen esa carga.",
          },
          {
            label: "Porque no necesita red",
            correct: false,
            explanation: "Toda VM necesita red (VPC, IP, firewall). De hecho, la configuración de red es una de las responsabilidades del usuario con VMs.",
          },
        ],
      },
    ],
  },

  {
    slug: "plataformas-administradas",
    title: "Plataformas administradas (PaaS)",
    readingTime: "11 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Comprender qué es una plataforma administrada y qué responsabilidades delega al proveedor",
      "Identificar App Engine como el servicio PaaS principal de Google Cloud y entender sus dos entornos",
      "Comparar cuándo conviene una plataforma administrada frente a VMs o contenedores",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "¿Qué pasaría si pudieras desplegar tu aplicación con un solo comando, sin configurar servidores, redes ni parches de seguridad?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Una plataforma administrada (PaaS — Platform as a Service) es un servicio cloud donde el usuario solo se preocupa por su código y configuración básica. El proveedor se encarga de la infraestructura, el sistema operativo, las actualizaciones, el escalamiento y la disponibilidad. El usuario no administra servidores: solo despliega.",
      },
      {
        type: "text",
        title: "¿Por qué existen las plataformas administradas?",
        content:
          "Las VMs dan control total, pero también toda la responsabilidad: parches, seguridad, escalamiento manual, configuración de red. Para muchas aplicaciones web comunes (APIs, sitios, backends), ese nivel de control es innecesario. Las plataformas administradas eliminan esa carga operativa: tú escribes la aplicación, la subes, y la plataforma se encarga del resto.",
      },
      {
        type: "text",
        content:
          "El modelo PaaS es ideal cuando tu equipo quiere enfocarse en desarrollar funcionalidades y no en operar infraestructura. Sacrificas algo de control (no eliges el SO ni configuras la red), pero ganas velocidad de despliegue, escalamiento automático y menor carga de mantenimiento.",
      },
      {
        type: "text",
        title: "App Engine: la referencia PaaS de Google Cloud",
        content:
          "App Engine fue el primer servicio de Google Cloud (2008) y sigue siendo una de las formas más simples de desplegar aplicaciones web. Soporta Python, Java, Node.js, Go, PHP, Ruby y .NET. Tiene dos entornos: Standard (sandbox con escalamiento a cero, más restricciones) y Flexible (basado en contenedores Docker, más libertad pero sin escalar a cero).",
      },
      {
        type: "tabs",
        title: "App Engine: Standard vs Flexible",
        tabs: [
          {
            id: "standard",
            label: "Standard",
            badge: "Recomendado",
            content:
              "Entorno sandbox basado en instancias de contenedores preconfiguradas con runtimes predefinidos. Escala a cero (no pagas sin tráfico). Inicio rápido (milisegundos). Restricciones: solo lenguajes soportados, sin escritura en disco local, sin procesos en background persistentes. Ideal para: apps web estándar, APIs REST, prototipos rápidos.",
          },
          {
            id: "flexible",
            label: "Flexible",
            badge: "Docker",
            content:
              "Basado en contenedores Docker sobre VMs de Compute Engine. Permite cualquier lenguaje/runtime. Puedes escribir en disco, usar WebSockets, procesos en background. NO escala a cero (mínimo 1 instancia siempre). Más costoso pero más flexible. Ideal para: apps con dependencias custom o requisitos específicos de runtime.",
          },
          {
            id: "comparacion",
            label: "Cuándo elegir cuál",
            badge: "Decisión",
            content:
              "¿Tu app es un API/web estándar en Python, Node o Java sin requisitos especiales? → Standard. ¿Necesitas runtime custom, WebSockets, procesos persistentes o librerías nativas? → Flexible. ¿Quieres pagar $0 sin tráfico? → Solo Standard lo permite. ¿Tráfico constante 24/7? → Flexible tiene más sentido.",
          },
        ],
      },
      {
        type: "table",
        title: "PaaS vs IaaS: qué administra cada quién",
        headers: ["Responsabilidad", "IaaS (Compute Engine)", "PaaS (App Engine)"],
        rows: [
          ["Hardware y red física", "Proveedor", "Proveedor"],
          ["Sistema operativo", "Usuario", "Proveedor"],
          ["Parches de seguridad", "Usuario", "Proveedor"],
          ["Runtime (lenguaje)", "Usuario instala", "Proveedor proporciona"],
          ["Escalamiento", "Usuario configura (MIG)", "Automático"],
          ["Balanceo de carga", "Usuario configura", "Incluido automáticamente"],
          ["Despliegue de app", "Usuario sube y configura", "Un comando: gcloud app deploy"],
          ["Código de la aplicación", "Usuario", "Usuario"],
        ],
      },
      {
        type: "starService",
        serviceName: "App Engine",
        icon: "/assets/App Engine.svg",
        description: "App Engine es la plataforma como servicio (PaaS) de Google Cloud para desplegar aplicaciones web sin administrar infraestructura. Fue el primer servicio de GCP (2008) y permite llevar una aplicación de código a producción con un solo comando. Gestiona automáticamente el escalamiento, el balanceo de carga, los certificados HTTPS y las actualizaciones del runtime.",
        features: [
          "Dos entornos: Standard (sandbox, escala a cero) y Flexible (Docker, más control)",
          "Lenguajes: Python, Node.js, Java, Go, PHP, Ruby, .NET",
          "Escalamiento automático sin configurar grupos ni balanceadores",
          "Versionado de despliegues: rollback instantáneo a versiones anteriores",
          "Traffic splitting: divide tráfico entre versiones (canary, A/B testing)",
          "HTTPS automático con certificados gestionados por Google",
          "Integración nativa con Cloud Datastore, Cloud SQL, Memcache, Task Queues",
          "Cron jobs integrados para tareas programadas",
        ],
        commands: [
          { command: "gcloud app deploy", description: "Desplegar la aplicación desde el directorio actual" },
          { command: "gcloud app browse", description: "Abrir la app desplegada en el navegador" },
          { command: "gcloud app versions list", description: "Listar todas las versiones desplegadas" },
          { command: "gcloud app services set-traffic --splits v2=1", description: "Enviar 100% del tráfico a la versión v2" },
          { command: "gcloud app logs tail -s default", description: "Ver los logs en tiempo real del servicio default" },
          { command: "gcloud app versions delete v1 v2", description: "Eliminar versiones antiguas para liberar recursos" },
        ],
      },
      {
        type: "useCaseCards",
        serviceName: "App Engine",
        cases: [
          {
            title: "Validar un MVP rápidamente con presupuesto mínimo",
            icons: ["code", "zap", "chart"],
            explanation:
              "Startups y equipos de innovación necesitan validar ideas rápido sin gastar en infraestructura. App Engine Standard con escalado a cero permite desplegar con un comando (gcloud app deploy), servir usuarios reales y pagar $0 si no hay tráfico. Rollback instantáneo si algo falla. Costo mínimo para validación.",
            subjects: [
              "Desarrollo Web",
              "Temas Selectos de Computación I",
            ],
            tag: "escalado automático",
          },
          {
            title: "API REST en Node.js/Python/Go sin pensar en servidores",
            icons: ["code", "server", "cog"],
            explanation:
              "Una API REST simple en Flask, Express o Go que no tiene requisitos especiales (no necesita WebSockets, no modifica estado en disco, no executa procesos background largo). App Engine Standard es perfecta: despliega el código, la plataforma cuida de TODO (SSL, load balancing, actualizaciones, health checks). Cero configuración de infraestructura.",
            subjects: [
              "Desarrollo Web",
              "Análisis de Algoritmos",
            ],
            tag: "PaaS",
          },
          {
            title: "Panel de control para reportes con tráfico predecible",
            icons: ["monitor", "chart", "database"],
            explanation:
              "Dashboard o portal de reportes que se usa 8am-6pm (horario laboral), con tráfico más o menos predecible. App Engine Flexible permite runtime custom, acceso a disco local para cache, y puede mantener 1-2 instancias siempre activas (cost-effective para tráfico consistente). Puedes usar PaaS sin pagar factura de Kubernetes.",
            subjects: [
              "Desarrollo Web",
              "Base de Datos",
            ],
            tag: "base administrada",
          },
          {
            title: "Sitio web informativo con contenido estático + API simple",
            icons: ["globe", "code", "network"],
            explanation:
              "Sitio web universitario con información estática + pequeña API backend (consultar eventos, enviar contacto). App Engine sirve HTML/CSS/JS estático rápido, y la API backend escala con demanda. No necesitas nginx/Apache separados ni configuración de DNS; Google Cloud maneja todo incluyendo HTTPS gratis.",
            subjects: [
              "Desarrollo Web",
              "Programación Multimedia",
            ],
            tag: "escalado automático",
          },
        ],
      },
      {
        type: "table",
        title: "App Engine Standard vs Flexible",
        headers: ["Característica", "Standard", "Flexible"],
        rows: [
          ["Escala a cero", "Sí (pagas $0 sin tráfico)", "No (mínimo 1 instancia)"],
          ["Tiempo de inicio", "Milisegundos", "Minutos (inicia VM+contenedor)"],
          ["Runtime", "Sandbox predefinido", "Docker personalizable"],
          ["Escritura en disco", "No", "Sí (efímera)"],
          ["WebSockets", "No", "Sí"],
          ["SSH a la instancia", "No", "Sí"],
          ["Costo mínimo", "Puede ser $0", "~$30-50/mes mínimo"],
          ["Ideal para", "APIs, web apps estándar", "Apps con deps custom"],
        ],
      },
      {
        type: "tabs",
        title: "Comparación con otros proveedores",
        tabs: [
          {
            id: "gcp",
            label: "Google Cloud",
            badge: "GCP",
            content:
              "App Engine es la opción PaaS clásica de GCP. Para casos más modernos, Cloud Run ofrece una experiencia similar pero basada en contenedores con escalamiento a cero. App Engine sigue siendo relevante para apps existentes y para quien prefiere una experiencia de despliegue sin Docker.",
          },
          {
            id: "aws",
            label: "AWS",
            badge: "AWS",
            content:
              "El equivalente en AWS es Elastic Beanstalk: despliega apps en Python, Node.js, Java, .NET, Go, Ruby con un comando (eb deploy). También gestiona escalamiento, balanceo y health checks. Alternativa moderna: AWS App Runner (más parecido a Cloud Run).",
          },
          {
            id: "azure",
            label: "Azure",
            badge: "Azure",
            content:
              "En Azure, el equivalente es Azure App Service: PaaS para apps web con despliegue directo, escalamiento automático y soporte para .NET, Node.js, Python, Java, PHP. Azure también ofrece Azure Container Apps como alternativa serverless basada en contenedores.",
          },
        ],
      },
      {
        type: "scenario",
        title: "¿PaaS o IaaS?",
        scenarios: [
          {
            situation: "Equipo de 3 desarrolladores necesita desplegar un API REST en Python (Flask) para una app móvil universitaria. No tienen experiencia en administración de servidores.",
            question: "¿App Engine o Compute Engine?",
            hint: "App Engine (Standard). No necesitan administrar servidores, escala automáticamente, y Flask es un runtime soportado nativamente.",
          },
          {
            situation: "Aplicación legacy en Java que usa librerías nativas del SO para procesamiento de imágenes y necesita acceso a directorios locales del filesystem.",
            question: "¿Puede correr en App Engine Standard?",
            hint: "No en Standard (restricciones de sandbox). Podría en Flexible (Docker con deps custom) o directamente en una VM.",
          },
          {
            situation: "Startup con un MVP que quiere validar su idea rápido y pagar lo mínimo posible. La app es un backend Node.js con Express.",
            question: "¿Qué opción minimiza costo y tiempo de configuración?",
            hint: "App Engine Standard. Escala a cero ($0 sin tráfico), despliegue con un comando, sin configuración de infra. Perfecto para validar con costo mínimo.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "PaaS (Plataforma como Servicio) delega la operación de infraestructura al proveedor",
          "App Engine es el PaaS de Google Cloud — despliega apps web con 'gcloud app deploy'",
          "Standard escala a cero y es más barato; Flexible usa Docker y es más permisivo",
          "No administras servidores, parches, SO ni balanceadores — solo tu código",
          "El trade-off: pierdes control sobre la infra a cambio de velocidad y simplicidad",
          "Equivalentes: AWS Elastic Beanstalk, Azure App Service",
          "Ideal para equipos que quieren enfocarse en producto, no en operaciones",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la ventaja principal de usar una plataforma administrada como App Engine?",
        options: [
          {
            label: "Tienes control total sobre el sistema operativo y la red",
            correct: false,
            explanation: "Eso describe a las VMs (IaaS). En PaaS, el proveedor administra el SO y la red por ti.",
          },
          {
            label: "Puedes desplegar sin administrar servidores, con escalamiento automático incluido",
            correct: true,
            explanation: "Correcto. PaaS elimina la carga operativa: solo subes tu código y la plataforma se encarga del resto (infra, escalamiento, HTTPS, balanceo).",
          },
          {
            label: "Es siempre más barato que cualquier VM",
            correct: false,
            explanation: "No necesariamente. Para cargas constantes de alto volumen, una VM reservada puede ser más económica que PaaS.",
          },
          {
            label: "Permite ejecutar cualquier software sin restricciones",
            correct: false,
            explanation: "PaaS impone restricciones (especialmente Standard). Para software con requisitos especiales, puede necesitarse Flexible o una VM.",
          },
        ],
      },
    ],
  },

  {
    slug: "escalamiento",
    title: "Escalamiento y elasticidad",
    readingTime: "10 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Comprender qué es el escalamiento horizontal y vertical, y cuándo aplicar cada uno",
      "Entender el concepto de elasticidad y autoescalado en la nube",
      "Identificar patrones básicos de escalamiento y sus trade-offs",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "¿Qué pasa si tu aplicación tiene 100 usuarios un lunes pero 10,000 un viernes? ¿Cómo evitas caídas sin desperdiciar recursos?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "El escalamiento es la capacidad de ajustar los recursos de cómputo según la demanda. Escalar verticalmente significa darle más poder a una máquina (más CPU/RAM). Escalar horizontalmente significa agregar más máquinas. Las aplicaciones elásticas combinan escalamiento horizontal automático con políticas que responden a métricas en tiempo real.",
      },
      {
        type: "scalingComparison",
      },
      {
        type: "text",
        title: "Vertical vs. Horizontal: dos filosofías",
        content:
          "El escalamiento vertical (scale up) significa hacer una máquina más grande: agregarle más CPU, más RAM, más disco. Es simple, pero tiene un techo físico y requiere reiniciar la máquina. El escalamiento horizontal (scale out) significa agregar más máquinas idénticas detrás de un balanceador de carga. No tiene techo práctico, pero requiere que la aplicación pueda funcionar en múltiples instancias sin conflicto (stateless).",
      },
      {
        type: "text",
        title: "Elasticidad: escalar y des-escalar automáticamente",
        content:
          "La elasticidad es la capacidad de crecer cuando hay demanda y reducirse cuando la demanda baja. El resultado: pagas solo por lo que necesitas en cada momento. Para lograrlo necesitas un autoscaler que monitoree métricas (CPU, memoria, peticiones/segundo) y ajuste automáticamente la cantidad de instancias según reglas configuradas.",
      },
      {
        type: "text",
        content:
          "En Google Cloud, el autoescalado de VMs se configura a través de Managed Instance Groups (MIGs): un grupo de VMs idénticas con un autoscaler que añade o elimina instancias según la carga. En servicios administrados como App Engine o Cloud Run, el escalamiento es completamente automático sin configuración manual de grupos ni templates.",
      },
      {
        type: "scalingSimulator",
      },
      {
        type: "table",
        title: "Escalamiento vertical vs horizontal",
        headers: ["Aspecto", "Vertical (Scale Up)", "Horizontal (Scale Out)"],
        rows: [
          ["Qué cambia", "Más CPU/RAM en una máquina", "Más máquinas idénticas"],
          ["Límite", "Techo físico del hardware", "Sin techo práctico"],
          ["Downtime", "Generalmente requiere reinicio", "Sin downtime (se agregan instancias)"],
          ["Complejidad", "Baja (una sola máquina)", "Media (balanceo, stateless)"],
          ["Costo", "Lineal con recursos", "Pago granular por instancias activas"],
          ["Ideal para", "Apps legacy o con estado pesado", "Apps modernas stateless"],
        ],
      },
      {
        type: "tabs",
        title: "Escalamiento en distintos servicios",
        tabs: [
          {
            id: "vms",
            label: "VMs (MIG)",
            badge: "IaaS",
            content:
              "Para VMs se usa un Managed Instance Group (MIG) con autoscaling policy: defines min/max instancias y una métrica objetivo (ej: 60% CPU). El autoscaler agrega o elimina VMs. Requiere configuración explícita de templates, health checks y balanceadores.",
          },
          {
            id: "appengine",
            label: "App Engine",
            badge: "PaaS",
            content:
              "App Engine escala automáticamente sin configuración de grupos. Defines instancias mínimas y máximas en app.yaml y la plataforma decide cuántas ejecutar según el tráfico. Escala a cero en el entorno estándar.",
          },
          {
            id: "cloudrun",
            label: "Cloud Run",
            badge: "Serverless",
            content:
              "Cloud Run escala a cero por defecto. Cada request crea un contenedor si no hay uno disponible. No necesitas configurar grupos ni templates. Define min-instances para evitar cold starts, max-instances como techo.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Elige la estrategia de escalamiento",
        scenarios: [
          {
            situation: "E-commerce que espera un pico de 20x tráfico durante Hot Sale (dura 48 horas). Normalmente tiene 3 instancias.",
            question: "¿Escalamiento vertical u horizontal?",
            hint: "Horizontal. Un pico de 20x no se resuelve agrandando una máquina; necesitas muchas instancias detrás de un balanceador.",
          },
          {
            situation: "Base de datos relacional con estado que necesita más capacidad de procesamiento.",
            question: "¿Vertical u horizontal?",
            hint: "Vertical (más CPU/RAM a la instancia). Las bases de datos con estado son difíciles de escalar horizontalmente sin sharding.",
          },
          {
            situation: "App universitaria donde el tráfico es alto de 8am a 2pm y casi cero de noche. Quieres ahorrar.",
            question: "¿Qué tipo de escalamiento conviene?",
            hint: "Horizontal con escalado a cero. Un servicio como Cloud Run o App Engine elimina instancias automáticamente cuando no hay tráfico.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Escalar vertical = más recursos por máquina; horizontal = más máquinas",
          "Horizontal es el patrón dominante en cloud por su elasticidad y disponibilidad",
          "La elasticidad permite crecer y reducirse automáticamente según demanda",
          "VMs requieren configuración explícita (MIG + autoscaler + load balancer)",
          "Servicios administrados (App Engine, Cloud Run) escalan automáticamente sin configuración de grupos",
          "Las apps deben ser stateless para escalar horizontalmente sin problemas",
          "Escalar a cero = no pagas cuando no hay tráfico (solo disponible en PaaS/serverless)",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la diferencia principal entre escalamiento vertical y horizontal?",
        options: [
          {
            label: "Vertical agrega más máquinas; horizontal agrega más recursos por máquina",
            correct: false,
            explanation: "Es al revés. Vertical (scale up) da más recursos a una máquina; horizontal (scale out) agrega más máquinas.",
          },
          {
            label: "Vertical da más recursos a una máquina; horizontal agrega más máquinas idénticas",
            correct: true,
            explanation: "Correcto. Scale up = máquina más grande (más CPU/RAM). Scale out = más instancias detrás de un balanceador. Horizontal es el patrón preferido en cloud.",
          },
          {
            label: "Vertical es solo para contenedores y horizontal es solo para VMs",
            correct: false,
            explanation: "Ambos conceptos aplican a VMs y contenedores. No están limitados a un tipo de recurso específico.",
          },
          {
            label: "No hay diferencia real; son nombres distintos para lo mismo",
            correct: false,
            explanation: "Son estrategias distintas con trade-offs muy diferentes. Vertical tiene límites físicos; horizontal no tiene techo práctico pero requiere arquitectura stateless.",
          },
        ],
      },
    ],
  },
  {
    slug: "contenedores",
    title: "Contenedores",
    readingTime: "12 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    objectives: [
      "Comprender qué es un contenedor y por qué se usa para desplegar aplicaciones de forma consistente",
      "Diferenciar contenedores y máquinas virtuales en términos de empaquetado, portabilidad y nivel de abstracción",
      "Relacionar el uso de contenedores con desarrollo moderno, microservicios y despliegues repetibles",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "¿Por qué una aplicación funciona en la computadora del desarrollador, pero falla al desplegarse en otro entorno?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "Un contenedor es un paquete ligero que incluye una aplicación y sus dependencias necesarias para ejecutarse de manera consistente en distintos entornos. A diferencia de una máquina virtual, no replica todo un sistema operativo completo, sino que aprovecha el sistema del host para ejecutar software de forma aislada y portable.",
      },
      {
        type: "containerVsVmVisual",
      },
      {
        type: "containerBuilder",
      },
      {
        type: "tabs",
        title: "Contenedores en la práctica",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "Un contenedor empaqueta: código + dependencias + configuración mínima de runtime. Usa el kernel del SO host en lugar de virtualizar hardware. Las imágenes se construyen con un Dockerfile (instrucciones paso a paso) y se almacenan en un container registry. Cualquier máquina con un container runtime puede ejecutar la misma imagen y obtener el mismo comportamiento.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Flujo típico: (1) Escribir Dockerfile, (2) Construir con Cloud Build: gcloud builds submit --tag gcr.io/PROJECT/app, (3) Almacenar en Artifact Registry, (4) Desplegar en Cloud Run o GKE. Google Cloud también soporta Buildpacks (convertir código a contenedor sin Dockerfile). Herramientas: Docker, Cloud Build, Artifact Registry, Cloud Run, GKE.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "Equivalencia conceptual: Docker es la base en ambos. AWS usa ECR (Elastic Container Registry) para almacenar imágenes, ECS (Elastic Container Service) para orquestación básica, ECS Fargate para contenedores serverless, y EKS para Kubernetes. El concepto de contenedor es idéntico — lo que cambia son los servicios para ejecutarlos y orquestarlos.",
          },
        ],
      },
      {
        type: "table",
        title: "Contenedores vs Máquinas Virtuales",
        headers: ["Característica", "Contenedor", "Máquina Virtual", "Impacto práctico"],
        rows: [
          ["Qué encapsula", "App + dependencias", "SO completo + app + deps", "Contenedores son más ligeros"],
          ["Tamaño típico", "10-500 MB", "1-20 GB", "Menos ancho de banda y almacenamiento"],
          ["Tiempo de inicio", "Segundos", "Minutos", "Contenedores escalan más rápido"],
          ["Aislamiento", "A nivel de proceso (kernel compartido)", "A nivel de hardware (hypervisor)", "VMs más seguras para multi-tenancy"],
          ["Portabilidad", "Alta (cualquier host con container runtime)", "Media (depende del hypervisor)", "Contenedores se mueven fácilmente entre clouds"],
          ["Ideal para", "Microservicios, CI/CD, apps modernas", "Apps legacy, requisitos de SO específicos", "Depende de la naturaleza de la carga"],
        ],
      },
      {
        type: "starService",
        serviceName: "Google Kubernetes Engine (GKE)",
        icon: "/assets/Google Kubernetes Engine.svg",
        description: "Google Kubernetes Engine es el servicio de orquestación de contenedores administrado de Google Cloud. Ejecuta clústeres de Kubernetes donde puedes desplegar, escalar y gestionar aplicaciones contenedorizadas. Google se encarga del plano de control (master nodes), las actualizaciones y la infraestructura subyacente, mientras tú defines cómo se ejecutan tus workloads.",
        features: [
          "Kubernetes administrado: Google gestiona el plano de control (masters, etcd, API server)",
          "Autopilot mode: GKE administra también los nodos — pagas por pod, no por VM",
          "Standard mode: tú controlas los node pools (tipos de máquina, cantidad, GPUs)",
          "Autoescalado a 3 niveles: pods (HPA), nodos (Cluster Autoscaler), clúster (multi-zonal)",
          "Auto-upgrade y auto-repair de nodos para seguridad y disponibilidad",
          "Integración nativa con Cloud Load Balancing, Cloud IAM, Artifact Registry",
          "Soporte para despliegues canary, blue-green y rolling updates",
          "Service mesh con Istio/Anthos para observabilidad y tráfico avanzado",
        ],
        commands: [
          { command: "gcloud container clusters create my-cluster --zone=us-central1-a --num-nodes=3", description: "Crear un clúster GKE con 3 nodos en us-central1-a" },
          { command: "gcloud container clusters get-credentials my-cluster --zone=us-central1-a", description: "Configurar kubectl para conectarse al clúster" },
          { command: "kubectl get pods", description: "Listar todos los pods corriendo en el clúster" },
          { command: "kubectl apply -f deployment.yaml", description: "Desplegar una aplicación definida en un archivo YAML" },
          { command: "kubectl scale deployment my-app --replicas=5", description: "Escalar un deployment a 5 réplicas" },
          { command: "kubectl logs -f deployment/my-app", description: "Ver logs en tiempo real de un deployment" },
        ],
      },
      {
        type: "useCaseCards",
        serviceName: "Google Kubernetes Engine (GKE)",
        cases: [
          {
            title: "Arquitectura de microservicios con múltiples equipos independientes",
            icons: ["boxes", "network", "code"],
            explanation:
              "Cuando una aplicación se divide en 5-10 microservicios desarrollados por equipos diferentes (auth, pagos, inventario, notificaciones, reporting), cada equipo necesita deployar independientemente sin afectar a otros. Kubernetes permite definir servicios, políticas de red (NetworkPolicies) y auto-scaling por servicio. Cada equipo controla su propio deployment.yaml sin tocar infra compartida.",
            subjects: [
              "Programación Paralela y Concurrente",
              "Análisis de Algoritmos",
              "Sistemas Inteligentes",
              "Administración de Redes",
            ],
            tag: "orquestación",
          },
          {
            title: "Servicio crítico que debe tener 99.99% uptime con failover automático",
            icons: ["shield", "globe", "zap"],
            explanation:
              "Un servicio mission-critical (pagos, autenticación) no puede caer. GKE permite definir pods en múltiples zonas, health checks automáticos que reinician pods fallidos, y rolling updates sin downtime. Si un nodo falla, los pods se reschedule instantáneamente en otros nodos. Service mesh (Istio) agrega circuit breakers y retry logic.",
            subjects: [
              "Seguridad Computacional",
              "Administración de Redes",
              "Administración de Base de Datos",
              "Calidad y Confiabilidad de Sistemas",
            ],
            tag: "orquestación",
          },
          {
            title: "Procesar eventos/streams con workers escalables dinámicamente",
            icons: ["workflow", "cpu", "chart"],
            explanation:
              "Sistema que procesa eventos: servidor Kafka produce eventos, workers consumen y procesan en paralelo. Con GKE puedes usar Horizontal Pod Autoscaler (HPA): cuando la cola crece, automáticamente escala a 100 workers; cuando se vacía, reduce a 5. Cada worker es un pod idéntico. No necesitas configurar MIGs manualmente ni predecir la carga.",
            subjects: [
              "Programación Paralela y Concurrente",
              "Procesos Estocásticos",
              "Minería de Datos",
              "Sistemas Operativos",
            ],
            tag: "escalado automático",
          },
          {
            title: "Machine Learning: entrenar modelo + servir predicciones en producción",
            icons: ["brain", "cpu", "chart"],
            explanation:
              "Pipeline típico: training job en GPU que corre 4 horas (genera modelo.pkl), después swapping a serving: 200 instancias de un servidor que predice. Con Kubernetes describes ambas workloads en YAML, luego kubectl apply. Canary deployment: prueba modelo nuevo con 5% tráfico, si metrics bien, sube a 100%.",
            subjects: [
              "Sistemas Inteligentes",
              "Minería de Datos",
              "Estadística II",
              "Procesos Estocásticos",
            ],
            tag: "orquestación",
          },
          {
            title: "Desplegar la misma app en múltiples clouds (AWS, GCP, Azure) con Kubernetes",
            icons: ["cloud", "container", "globe"],
            explanation:
              "Dockerizas tu app, describes deployment en Kubernetes YAML. Ese YAML funciona en GKE, EKS, AKS sin cambios. Cambias solo configuración (namespaces, storage class, ingress). Esto elimina vendor lock-in: si precios de GCP suben, migras el YAML a EKS sin reescribir aplicación.",
            subjects: [
              "Sistemas Operativos",
              "Programación Paralela y Concurrente",
              "Administración de Redes",
              "Seguridad Computacional",
            ],
            tag: "contenedores",
          },
          {
            title: "Cientíﬁco de datos: ejecutar 50 experimentos en paralelo con Kubernetes Jobs",
            icons: ["flask", "cpu", "chart"],
            explanation:
              "Necesitas entrenar 50 modelos con distintos hyperparámetros (learning_rate, batch_size, etc.). Generas 50 Job specs en Kubernetes, Kube crea 50 pods en paralelo usando capacidad del clúster. Algunos terminan rápido, otros tardan más. Sin Kubernetes, harías esto manualmente o con scripts frágiles. Con K8s: kubectl apply -f 50-jobs.yaml y listo.",
            subjects: [
              "Minería de Datos",
              "Estadística II",
              "Procesos Estocásticos",
              "Pronósticos",
              "Optimización II",
            ],
            tag: "orquestación",
          },
        ],
      },
      {
        type: "scenario",
        title: "Detecta el mejor enfoque",
        scenarios: [
          {
            situation: "Aplicación heredada en COBOL que depende de librerías específicas del sistema operativo Windows Server 2012 y drivers propietarios.",
            question: "¿Contenedor o VM?",
            hint: "Dependencias profundas del SO y drivers propietarios suelen requerir una VM completa.",
          },
          {
            situation: "API REST moderna en Node.js con Express, con dependencias definidas en package.json. Se despliega a dev, staging y producción.",
            question: "¿Contenedor o VM?",
            hint: "App moderna + dependencias claras + múltiples entornos = caso ideal para contenedor.",
          },
          {
            situation: "Conjunto de 8 microservicios que se comunican entre sí. Cada uno tiene su propio lenguaje y dependencias. Se actualizan independientemente.",
            question: "¿Qué enfoque es más adecuado?",
            hint: "Microservicios independientes con distintos lenguajes → cada uno en su contenedor.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Un contenedor empaqueta aplicación + dependencias para ejecutarse consistentemente en cualquier entorno",
          "A diferencia de las VMs, los contenedores comparten el kernel del host y son mucho más ligeros",
          "Docker es la herramienta estándar para construir imágenes de contenedor (Dockerfile)",
          "Las imágenes se almacenan en registries (Artifact Registry en GCP, ECR en AWS)",
          "Los contenedores son la base de microservicios, CI/CD y despliegues repetibles",
          "No siempre reemplazan a las VMs — apps con dependencias profundas del SO siguen necesitando VMs",
          "El flujo: Dockerfile → build → push to registry → deploy",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué ventaja describen mejor los contenedores?",
        options: [
          {
            label: "Siempre reemplazan a todas las VMs",
            correct: false,
            explanation: "No siempre. Apps con requisitos específicos del SO, drivers o aislamiento de hardware siguen necesitando VMs.",
          },
          {
            label: "Empaquetan aplicación y dependencias para ejecutarse de forma consistente",
            correct: true,
            explanation: "Correcto. El contenedor incluye todo lo necesario para que la app se comporte igual en desarrollo, pruebas y producción.",
          },
          {
            label: "Necesitan un sistema operativo completo por cada instancia",
            correct: false,
            explanation: "Eso describe a las VMs. Los contenedores comparten el kernel del SO host y no replican un SO completo.",
          },
          {
            label: "Solo funcionan en local, no en la nube",
            correct: false,
            explanation: "Los contenedores son la base del despliegue moderno en la nube (Cloud Run, GKE, ECS, etc.).",
          },
        ],
      },
    ],
  },
  {
    slug: "serverless-funciones",
    title: "Serverless y funciones",
    readingTime: "11 min",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    quizLinks: [
      {
        label: "Quiz: Compute in the Cloud",
        url: "https://www.skills.google/paths/36/course_templates/153/quizzes/625231",
      },
    ],
    objectives: [
      "Comprender qué significa el modelo serverless en cloud y qué parte de la operación abstrae",
      "Explicar qué es una función cloud y cómo responde a eventos o solicitudes",
      "Relacionar serverless con casos de uso simples, automatización y procesamiento reactivo",
    ],
    sections: [
      {
        type: "trigger",
        question:
          "Si solo necesitas ejecutar un fragmento pequeño de lógica cuando ocurre un evento, ¿tiene sentido mantener un servidor activo todo el tiempo?",
      },
      {
        type: "concept",
        title: "Concepto clave",
        content:
          "El modelo serverless permite ejecutar código sin aprovisionar ni administrar servidores directamente. En Google Cloud, Cloud Run functions ofrece una solución ligera para crear funciones de propósito único que responden a eventos o solicitudes sin gestionar la infraestructura subyacente.",
      },
      {
        type: "serverlessExplainer",
      },
      {
        type: "tabs",
        title: "Serverless y funciones en la práctica",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "El modelo serverless tiene 4 elementos: (1) Evento — lo que dispara la ejecución; (2) Función — fragmento de lógica de propósito específico; (3) Plataforma — infraestructura gestionada automáticamente; (4) Escalamiento — ajuste automático según demanda (incluye escalar a cero). El pago es por invocación y duración, no por tiempo de servidor encendido.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Cloud Run functions (2da gen, basadas en Cloud Run): soporta Node.js, Python, Go, Java, .NET, Ruby, PHP. Triggers: HTTP, Cloud Storage, Pub/Sub, Firestore, Firebase Auth, Cloud Scheduler. Deploy: gcloud functions deploy my-func --gen2 --runtime python312 --trigger-http. Pago por invocaciones + GB-segundo de ejecución. Timeout máximo: 60 min.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "Equivalencia conceptual: AWS Lambda ejecuta código sin servidores, disparado por S3, SQS, API Gateway, EventBridge, CloudWatch Events. Soporta Node.js, Python, Go, Java, .NET, Ruby. Pago por invocación + ms de ejecución. Timeout máximo: 15 min (vs 60 min en GCP). Step Functions permite orquestar múltiples Lambdas en flujos.",
          },
        ],
      },
      {
        type: "table",
        title: "Serverless: GCP vs AWS",
        headers: ["Aspecto", "Google Cloud", "AWS", "Notas"],
        rows: [
          ["Servicio principal", "Cloud Run functions (gen2)", "AWS Lambda", "Ambos ejecutan código por evento"],
          ["Runtimes", "Node.js, Python, Go, Java, .NET, Ruby, PHP", "Node.js, Python, Go, Java, .NET, Ruby", "GCP incluye PHP"],
          ["Timeout máximo", "60 minutos", "15 minutos", "GCP permite funciones más largas"],
          ["Triggers nativos", "Storage, Pub/Sub, Firestore, HTTP, Scheduler", "S3, SQS, API Gateway, EventBridge", "Patrones equivalentes"],
          ["Escala a cero", "Sí", "Sí", "No pagas si no hay invocaciones"],
          ["Orquestación de funciones", "Workflows", "Step Functions", "Para flujos multi-paso"],
          ["Pago", "Por invocación + GB-segundo", "Por invocación + ms de RAM", "Modelos similares"],
        ],
      },
      {
        type: "starService",
        serviceName: "Cloud Run",
        icon: "/assets/Cloud Run.svg",
        description: "Cloud Run es la plataforma serverless de Google Cloud para ejecutar contenedores sin administrar infraestructura. Acepta cualquier lenguaje o framework empaquetado en un contenedor Docker, escala automáticamente (incluyendo a cero) y cobra solo por las solicitudes procesadas. Es el punto medio ideal entre la flexibilidad de contenedores y la simplicidad de serverless.",
        features: [
          "Ejecuta cualquier contenedor Docker — sin restricción de lenguaje ni framework",
          "Escala a cero: $0 sin tráfico, instancias se crean bajo demanda",
          "Escala hasta miles de instancias automáticamente según requests",
          "HTTPS automático con dominio .run.app o custom domain",
          "Soporta HTTP/1, HTTP/2, WebSockets y gRPC",
          "Revisiones inmutables con traffic splitting (canary, A/B)",
          "Integración con Pub/Sub, Cloud Scheduler, Eventarc para triggers por evento",
          "CPU siempre activa o solo durante requests (optimización de costo)",
        ],
        commands: [
          { command: "gcloud run deploy my-app --source . --region=us-central1", description: "Desplegar desde código fuente (Cloud Build construye el contenedor automáticamente)" },
          { command: "gcloud run deploy my-app --image gcr.io/PROJECT/my-app --region=us-central1", description: "Desplegar desde una imagen de contenedor existente" },
          { command: "gcloud run services list", description: "Listar todos los servicios de Cloud Run en el proyecto" },
          { command: "gcloud run services update my-app --min-instances=1", description: "Configurar mínimo 1 instancia para evitar cold starts" },
          { command: "gcloud run revisions list --service=my-app", description: "Ver todas las revisiones (versiones) de un servicio" },
          { command: "gcloud run services update-traffic my-app --to-revisions=v2=50,v1=50", description: "Dividir tráfico 50/50 entre dos revisiones (canary)" },
        ],
      },
      {
        type: "useCaseCards",
        serviceName: "Cloud Run / Cloud Functions",
        cases: [
          {
            title: "Procesar imagen cuando se sube a Cloud Storage (thumbnail automático)",
            icons: ["image", "workflow", "cpu"],
            explanation:
              "Estudiante sube una foto de tarea a un bucket. Cloud Storage trigger dispara automáticamente una Cloud Function que: descarga la imagen, la redimensiona a 800px, crea thumbnail, y guarda ambas. La función ejecuta solo los segundos necesarios (ej: 2 seg), luego termina. Pagas por esos 2 segundos × GB-RAM usado, no por tiempo de servidor ocioso.",
            subjects: [
              "Desarrollo Web",
              "Procesamiento de Imágenes",
              "Programación Multimedia",
              "Graficación por Computadora",
            ],
            tag: "evento",
          },
          {
            title: "Webhook que notifica a Slack cuando hay un push a GitHub main",
            icons: ["code", "workflow", "zap"],
            explanation:
              "GitHub dispara un webhook HTTP a tu endpoint. Cloud Functions recibe el JSON, extrae info (autor, commit message), construye un mensaje bonito, y llama el API de Slack para notificar. Código simple (10-20 líneas), ejecuta en milisegundos. Perfect fit: código breve + evento externo + sin estado persistente.",
            subjects: [
              "Desarrollo Web",
              "Administración de Redes",
              "Proyectos de Tecnología de Información",
            ],
            tag: "evento",
          },
          {
            title: "API REST rápida con escalado automático a cero",
            icons: ["server", "globe", "zap"],
            explanation:
              "Necesitas un micro-API: recibe JSON, valida datos, consulta BD, devuelve respuesta. Cloud Run despliega un contenedor con tu app (Express, FastAPI, Go), escala a 0 cuando sin tráfico, instancia se crea en <1 segundo cuando llega request. Pagas por 100ms de cada invocación, no por servidor 24/7. Ideal para MVP o carga baja.",
            subjects: [
              "Desarrollo Web",
              "Análisis de Algoritmos",
              "Administración de Redes",
            ],
            tag: "serverless",
          },
          {
            title: "Tarea programada: generar reporte cada medianoche",
            icons: ["clock", "workflow", "chart"],
            explanation:
              "Cada noche a las 12am, Cloud Scheduler dispara una Cloud Function que: lee logs del día, genera estadísticas, crea PDF, lo guarda en Storage y envía email. Sin costo si no ejecuta, paga solo cuando corre (30 seg aprox). Si lo hicieras en un servidor 24/7, pagarías 30 veces más.",
            subjects: [
              "Desarrollo Web",
              "Base de Datos",
              "Admin. y Sistemas de Contabilidad",
              "Análisis de Decisiones y Teoría de Juegos",
            ],
            tag: "evento",
          },
          {
            title: "Transcribir audio/video cuando se carga a Cloud Storage",
            icons: ["fileaudio", "brain", "workflow"],
            explanation:
              "Laboratorio sube video de una conferencia a un bucket. Cloud Storage trigger dispara función que: descarga video, llama Speech-to-Text API de Google, guarda transcripción en base datos. Función escala sola: si 5 videos suben simultáneamente, 5 instancias ejecutan en paralelo automáticamente. Pagás solo por lo que usaste.",
            subjects: [
              "Programación Multimedia",
              "Sistemas Inteligentes",
              "Minería de Datos",
              "Análisis de Fourier",
            ],
            tag: "evento",
          },
          {
            title: "API de predicción: modelo ML que responde en <100ms",
            icons: ["brain", "zap", "server"],
            explanation:
              "Cargas un modelo entrenado (.pkl) a Cloud Run. Cada request: deserializa modelo (cached en memory), corre predicción, devuelve JSON. Cloud Run mantiene contenedor caliente, promedia <100ms por request. Escala a 100 instancias si llegan muchos requests. Alternativa: Cloud Functions si quieres escalar a cero (pero cold start de 0-5 seg).",
            subjects: [
              "Sistemas Inteligentes",
              "Minería de Datos",
              "Estadística II",
              "Pronósticos",
            ],
            tag: "serverless",
          },
        ],
      },
      {
        type: "scenario",
        title: "¿Conviene una función serverless?",
        scenarios: [
          {
            situation: "Cada vez que un estudiante sube una imagen de tarea, necesitas redimensionarla a 800px y guardar un thumbnail.",
            question: "¿Serverless o servidor permanente?",
            hint: "Tarea corta + activada por evento (upload) + sin estado → caso ideal para una función.",
          },
          {
            situation: "Un webhook de GitHub debe notificar a Slack cuando hay un push a main. La lógica es: recibir JSON → extraer info → enviar mensaje.",
            question: "¿Conviene una función?",
            hint: "Request HTTP → lógica simple → resultado. Caso perfecto para serverless.",
          },
          {
            situation: "Aplicación de videoconferencia que mantiene conexiones WebSocket activas durante horas con cientos de usuarios simultáneos.",
            question: "¿Es buen candidato para serverless?",
            hint: "Conexiones persistentes + larga duración + estado en memoria → serverless no es ideal aquí.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Serverless abstrae toda la infraestructura: el usuario solo escribe la lógica de la función",
          "El modelo es disparador → función → resultado (event-driven)",
          "Cloud Run functions (GCP) y Lambda (AWS) son los servicios principales de funciones serverless",
          "Escalan automáticamente, incluyendo escalar a cero (no pagas sin tráfico)",
          "Ideales para: procesamiento de eventos, webhooks, tareas programadas, automatización",
          "No ideales para: procesos largos, estado persistente, tráfico constante 24/7",
          "El pago es por invocación y duración de ejecución, no por tiempo de servidor encendido",
          "GCP permite hasta 60 min de timeout; AWS Lambda hasta 15 min",
        ],
      },
      {
        type: "quiz",
        question: "¿Qué describe mejor una función en un modelo serverless?",
        options: [
          {
            label: "Una máquina virtual permanente",
            correct: false,
            explanation: "Las funciones serverless son lo opuesto a una VM permanente: solo existen mientras se ejecutan.",
          },
          {
            label: "Un clúster de contenedores completo",
            correct: false,
            explanation: "Eso describe orquestación (Kubernetes). Las funciones son unidades más pequeñas y efímeras.",
          },
          {
            label: "Un bloque de código que se ejecuta en respuesta a un evento o solicitud",
            correct: true,
            explanation: "Correcto. La función se activa solo cuando ocurre un evento, ejecuta su lógica y termina. Sin servidor permanente.",
          },
          {
            label: "Un sistema operativo dentro de un bucket",
            correct: false,
            explanation: "Un bucket es almacenamiento de objetos, no tiene relación con ejecutar sistemas operativos ni funciones.",
          },
        ],
      },
    ],
  },
  {
    slug: "load-balancers",
    title: "Load Balancers: distribución de tráfico",
    courseLink: "https://www.skills.google/paths/36/course_templates/153",
    courseTitle: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    readingTime: "12 min",
    objectives: [
      "Comprender qué es un load balancer y por qué es fundamental en arquitecturas cloud",
      "Diferenciar balanceo en capa 4 (red) y capa 7 (aplicación)",
      "Identificar cuándo una aplicación necesita balanceo de carga",
      "Relacionar conceptos de health checks, alta disponibilidad y escalabilidad horizontal",
    ],
    sections: [
      {
        type: "trigger",
        question: "Si tu aplicación web recibe 10,000 usuarios al mismo tiempo y solo tienes un servidor, ¿qué crees que pasará? ¿Cómo lo resolverías?",
      },
      {
        type: "concept",
        title: "¿Qué es un Load Balancer?",
        content:
          "Un load balancer (balanceador de carga) es como un \"director de tránsito\" que se coloca delante de varios servidores y reparte las solicitudes que llegan de los usuarios entre ellos, para que ninguno se sobrecargue y la aplicación siga respondiendo rápido y de forma estable. Es un sistema (software, hardware o servicio en la nube) que recibe todas las peticiones de los clientes y decide a cuál servidor enviarlas, siguiendo algún algoritmo: round-robin, el menos cargado, por prioridad, etcétera.",
      },
      {
        type: "text",
        title: "Ejemplo sencillo",
        content:
          "Tienes tres servidores web con el mismo sitio, y un único load balancer al frente. Todos los usuarios apuntan a la IP del load balancer; él decide a qué servidor enviar cada visita. Los usuarios siempre ven \"una sola entrada\", pero detrás hay varias \"ventanas de atención\".",
      },
      {
        type: "tabs",
        title: "¿Por qué son útiles?",
        tabs: [
          {
            id: "sobrecarga",
            label: "Evitar sobrecargas",
            badge: "Rendimiento",
            content: "Si todo el tráfico llega a un único servidor, éste puede saturarse, volverse lento o caer. El load balancer reparte las solicitudes para que la carga se distribuya y ningún servidor se 'queme'. Ejemplo: en un evento con miles de usuarios simultáneos, el balanceador distribuye las visitas entre varios servidores para que la web siga funcionando.",
          },
          {
            id: "disponibilidad",
            label: "Alta disponibilidad",
            badge: "Resiliencia",
            content: "El balanceador verifica constantemente qué servidores están sanos mediante health checks. Si un servidor falla, deja de enviarle tráfico y dirige todas las solicitudes a los servidores que siguen funcionando. Los usuarios no notan la caída porque sus peticiones van a las otras VMs disponibles.",
          },
          {
            id: "escalabilidad",
            label: "Escalabilidad",
            badge: "Crecimiento",
            content: "Permite agregar nuevos servidores cuando aumenta la demanda y retirarlos cuando baja, sin cambiar la forma en que los usuarios acceden (siguen viendo la misma IP o URL). Tu API recibe el doble de tráfico por un lanzamiento: añades más instancias y el balanceador automáticamente empieza a enviarles solicitudes.",
          },
          {
            id: "flexibilidad",
            label: "Flexibilidad",
            badge: "Algoritmos",
            content: "Se puede configurar para usar distintos algoritmos de reparto: round-robin, el servidor menos ocupado, asignación por peso, afinidad de sesión (mantener al usuario en el mismo servidor), etcétera. En una app de e-commerce puedes mantener a un usuario en el mismo servidor durante su sesión de compra.",
          },
        ],
      },
      {
        type: "table",
        title: "Tipos de Load Balancers",
        headers: ["Tipo", "Capa", "Qué ve", "Ejemplo de uso"],
        rows: [
          ["Network LB (L4)", "Capa 4 (transporte)", "Solo IP y puerto — no mira el contenido HTTP", "Balancear conexiones TCP de un juego en línea entre servidores"],
          ["Application LB (L7)", "Capa 7 (aplicación)", "Entiende HTTP/HTTPS: URL, host, cabeceras, contenido", "Enviar /api a un backend y /imagenes a otro con un solo LB"],
        ],
      },
      {
        type: "text",
        title: "L4 vs L7 en detalle",
        content:
          "El balanceador de capa 4 trabaja con IP y puertos: todo lo que llegue a IP:80 se reparte entre servidores que escuchan en el puerto 80. No mira el contenido del mensaje HTTP, por lo que es más simple y muy rápido. El de capa 7 entiende el protocolo HTTP/HTTPS y puede tomar decisiones según la URL, el host, las cabeceras o el contenido. Permite cosas como: enviar /api a un conjunto de servidores y /imagenes a otro, o dirigir tráfico según el dominio.",
      },
      {
        type: "loadBalancerSimulator",
      },
      {
        type: "scenario",
        title: "¿Necesitas un Load Balancer?",
        scenarios: [
          {
            situation: "Tu aplicación web tiene picos de tráfico en horarios punta y un solo servidor empieza a dar timeouts.",
            question: "¿Qué tipo de balanceador implementarías y por qué?",
            hint: "Piensa si necesitas inspeccionar las URLs o solo distribuir conexiones TCP.",
          },
          {
            situation: "Tienes una API REST en /api y un frontend estático en /app, y quieres que cada uno corra en servidores diferentes.",
            question: "¿Un balanceador L4 puede resolver esto? ¿O necesitas L7?",
            hint: "L4 no mira las URLs — solo IP y puerto. L7 sí puede enrutar por path.",
          },
          {
            situation: "Un servidor de tu pool se cae por un error de disco. Los usuarios reportan que la web está intermitente.",
            question: "¿Cómo evitaría un load balancer que los usuarios noten la caída?",
            hint: "Piensa en health checks: el balanceador detecta que el servidor no responde y deja de enviarle tráfico.",
          },
        ],
      },
      {
        type: "table",
        title: "Analogías para recordar",
        headers: ["Analogía", "Cómo se relaciona"],
        rows: [
          ["Director de tránsito", "El balanceador está en la entrada de una autopista de muchos carriles; elige por qué carril va cada coche para evitar embotellamientos"],
          ["Cajeros de banco", "Los clientes hacen fila frente a un punto único; el coordinador los envía al cajero libre. Si un cajero se descompone, simplemente deja de usarlo"],
          ["Mesero de restaurante", "Un solo mesero recibe a todos los comensales y los asigna a las mesas disponibles. Si una mesa está sucia (servidor caído), no la usa"],
        ],
      },
      {
        type: "list",
        title: "¿Cuándo empezar a pensar en un Load Balancer?",
        items: [
          "Cuando la aplicación empieza a tener picos de tráfico o tiempos de respuesta variables, y un solo servidor ya no es suficiente",
          "Cuando necesitas tolerancia a fallos: no quieres que una caída de una instancia deje sin servicio a todos los usuarios",
          "Cuando quieres escalar horizontalmente en la nube, usando varias VMs, contenedores o instancias serverless bajo una misma dirección",
          "El load balancer es el punto natural para separar 'cómo entran los usuarios' de 'cuántos servidores tengo detrás'",
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Un load balancer distribuye el tráfico entre múltiples servidores para evitar sobrecargas",
          "Usa health checks para detectar servidores caídos y dejar de enviarles tráfico",
          "Existen balanceadores de capa 4 (red/transporte) y capa 7 (aplicación/HTTP)",
          "L4 es rápido y simple: solo mira IP y puerto. L7 es más inteligente: puede enrutar por URL, host o cabeceras",
          "Permite escalabilidad horizontal: agregar o quitar servidores sin cambiar la IP de entrada",
          "En Google Cloud: Network Load Balancer (L4) y Application Load Balancer (L7) son servicios gestionados",
          "Los algoritmos más comunes son: round-robin, menos cargado, afinidad de sesión y por peso",
          "Es prerequisito conceptual para los labs de balanceo de carga del Skill Badge",
        ],
      },
      {
        type: "quiz",
        question: "¿Cuál es la principal diferencia entre un load balancer de capa 4 y uno de capa 7?",
        options: [
          {
            label: "L4 es más caro que L7",
            correct: false,
            explanation: "El costo no es la diferencia principal. La diferencia está en qué información del tráfico puede inspeccionar cada uno.",
          },
          {
            label: "L4 solo ve IP y puerto; L7 entiende HTTP y puede enrutar por URL, host o cabeceras",
            correct: true,
            explanation: "Correcto. L4 trabaja en la capa de transporte (TCP/UDP) y L7 en la capa de aplicación (HTTP/HTTPS). Esto permite a L7 tomar decisiones más inteligentes.",
          },
          {
            label: "L7 no puede hacer health checks",
            correct: false,
            explanation: "Ambos tipos pueden hacer health checks. L7 incluso puede verificar respuestas HTTP específicas.",
          },
          {
            label: "L4 solo funciona en la nube y L7 solo on-premises",
            correct: false,
            explanation: "Ambos tipos existen tanto en la nube como on-premises. No están limitados a un entorno específico.",
          },
        ],
      },
      {
        type: "quiz",
        question: "¿Qué sucede cuando un load balancer detecta que un servidor no pasa el health check?",
        options: [
          {
            label: "Apaga el servidor automáticamente",
            correct: false,
            explanation: "El balanceador no apaga servidores — solo deja de enviarles tráfico. El servidor puede seguir intentando recuperarse.",
          },
          {
            label: "Envía todas las peticiones a ese servidor para reiniciarlo",
            correct: false,
            explanation: "Enviar más tráfico a un servidor fallando empeoraría la situación, no la resolvería.",
          },
          {
            label: "Deja de enviarle tráfico y redirige las peticiones a los servidores sanos",
            correct: true,
            explanation: "Correcto. El balanceador marca al servidor como no saludable y distribuye el tráfico solo entre los que siguen respondiendo correctamente.",
          },
          {
            label: "Notifica al usuario que hay un error y le pide que espere",
            correct: false,
            explanation: "El objetivo del balanceador es que el usuario NO note la falla. La redirección es transparente.",
          },
        ],
      },
    ],
  },
];
