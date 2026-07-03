import { TopicContent } from "./unit1";

export const unit3Content: TopicContent[] = [
  {
    slug: "opciones-computo",
    title: "Opciones de cómputo en la nube",
    readingTime: "10 min",
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
    slug: "escalamiento",
    title: "Escalamiento y aplicaciones elásticas",
    readingTime: "12 min",
    objectives: [
      "Comprender qué es el escalamiento horizontal y vertical, y cuándo aplicar cada uno",
      "Identificar cómo funcionan los grupos de instancias administrados (MIGs) y las políticas de autoscaling en Google Cloud",
      "Diseñar políticas de escalamiento basadas en métricas como CPU, tráfico o uso de memoria",
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
        title: "Autoescalado: la clave de la elasticidad",
        content:
          "El autoescalado monitorea métricas (CPU, memoria, peticiones/segundo) y ajusta automáticamente el número de instancias. Cuando la carga sube, se crean nuevas instancias. Cuando baja, se eliminan. Esto permite pagar solo por lo que se usa sin intervención manual. El autoscaler necesita una política que defina: mínimo de instancias (siempre disponibles), máximo (techo de gasto), métrica objetivo (por ejemplo, 60% CPU) y período de estabilización (cooldown).",
      },
      {
        type: "text",
        content:
          "En Google Cloud, el autoescalado se configura a través de Managed Instance Groups (MIGs). Un MIG es un grupo de VMs idénticas basadas en un instance template. El autoscaler del MIG monitorea las métricas y decide cuántas instancias deben existir. También realiza auto-healing: si una instancia no responde al health check, se recrea automáticamente.",
      },
      {
        type: "scalingSimulator",
      },
      {
        type: "tabs",
        title: "Escalamiento automático en la práctica",
        tabs: [
          {
            id: "concepto",
            label: "Concepto general",
            badge: "Teoría",
            content:
              "El autoescalado requiere: (1) un grupo de instancias homogéneas, (2) un balanceador de carga que distribuya el tráfico, (3) una política de escalado con métrica objetivo y límites, (4) un health check que verifique la salud de cada instancia. El resultado es una aplicación que responde a picos sin intervención y ahorra en períodos de baja demanda.",
          },
          {
            id: "gcp",
            label: "En Google Cloud",
            badge: "GCP",
            content:
              "Se usa un Managed Instance Group (MIG) con autoscaling policy. Se define un instance template (imagen, tipo de máquina, disco), luego se crea el MIG con min/max instances y target CPU utilization. Comando: gcloud compute instance-groups managed set-autoscaling my-mig --max-num-replicas=10 --target-cpu-utilization=0.6 --cool-down-period=60. También soporta métricas custom de Cloud Monitoring.",
          },
          {
            id: "aws",
            label: "Comparación AWS",
            badge: "AWS",
            content:
              "En AWS se usa un Auto Scaling Group (ASG) asociado a un Launch Template. Se configura con target tracking scaling policy (ej: CPUUtilization al 60%). Comando: aws autoscaling put-scaling-policy --policy-name cpu-target --auto-scaling-group-name my-asg --policy-type TargetTrackingScaling --target-tracking-configuration. AWS usa por defecto un cooldown de 300s (vs 60s en GCP).",
          },
        ],
      },
      {
        type: "table",
        title: "Escalamiento: GCP vs AWS",
        headers: ["Aspecto", "Google Cloud (MIG)", "AWS (ASG)", "Notas"],
        rows: [
          ["Grupo de instancias", "Managed Instance Group", "Auto Scaling Group", "Ambos usan templates"],
          ["Template", "Instance Template", "Launch Template", "Definen imagen, tipo, disco, red"],
          ["Autoscaling", "Autoscaler policy", "Scaling Policy", "Ambos soportan target tracking"],
          ["Cooldown default", "60 segundos", "300 segundos", "GCP reacciona más rápido por defecto"],
          ["Health check", "Autohealing en MIG", "EC2 Health Checks + ELB", "GCP recrea VMs automáticamente"],
          ["Métricas custom", "Cloud Monitoring", "CloudWatch", "Ambos permiten métricas personalizadas"],
          ["Spot/Preemptible", "Spot VMs en MIG", "Spot Instances en ASG", "Ahorro 60-91% con interrupciones"],
        ],
      },
      {
        type: "scenario",
        title: "Diseña tu política de escalamiento",
        scenarios: [
          {
            situation: "E-commerce que espera un pico de 20x tráfico durante Hot Sale (dura 48 horas). Normalmente tiene 3 instancias.",
            question: "¿Cómo configurarías el autoscaling del MIG?",
            hint: "Piensa en el mínimo antes del evento, el máximo durante, y si el CPU target debería ser más conservador.",
          },
          {
            situation: "API de procesamiento de imágenes. Cada request es pesado (CPU al 90% por 10 segundos por imagen). Necesitas evitar timeout.",
            question: "¿Qué métrica usarías y qué target configurarías?",
            hint: "Con requests de CPU intensivo, necesitas un target CPU bajo para que escale antes de saturarse.",
          },
          {
            situation: "App universitaria donde el tráfico es alto de 8am a 2pm y casi cero de medianoche a 6am. Quieres ahorrar máximo.",
            question: "¿Qué combinación de mínimos, spot VMs y schedule usarías?",
            hint: "GCP permite scheduled scaling (escalar por horario) además del autoscaler reactivo.",
          },
        ],
      },
      {
        type: "list",
        title: "Puntos clave del tema",
        items: [
          "Escalar vertical = más recursos por máquina; horizontal = más máquinas",
          "El escalamiento horizontal es el patrón dominante en cloud por su disponibilidad y elasticidad",
          "Un MIG (GCP) o ASG (AWS) agrupa instancias homogéneas con autoescalado",
          "La política de autoscaling define: métrica objetivo, mínimo, máximo y cooldown",
          "GCP tiene cooldown de 60s por defecto (más reactivo); AWS usa 300s por defecto",
          "Auto-healing recrea automáticamente instancias que fallan health checks",
          "Spot/Preemptible VMs reducen costos 60-91% para cargas tolerantes a interrupciones",
          "El patrón completo es: instance template → MIG → autoscaler → load balancer → health checks",
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
];
