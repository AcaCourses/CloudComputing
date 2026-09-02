import { TopicContent } from "./unit1";

export const unit9Content: TopicContent[] = [
  {
    slug: "comparativa-despliegues",
    title: "Evolución de un despliegue (VMs, PaaS, Contenedores, FaaS)",
    sections: [
      {
        type: "text",
        title: "El mismo código, cuatro infraestructuras diferentes",
        content:
          "A lo largo del curso hemos visto diferentes modelos de servicio (IaaS, PaaS, FaaS, Contenedores). Para entender realmente las diferencias operativas y de responsabilidad, la mejor forma es tomar un caso de uso práctico y ver cómo se implementaría en cada uno de ellos.",
      },
      {
        type: "text",
        content:
          "Imagina que has construido una API para una tienda en línea (E-commerce) que procesa pagos y genera recibos. El código ya está escrito. Ahora, ¿cómo lo llevas a producción? Explora las 4 opciones principales a continuación.",
      },
      {
        type: "architectureComparison",
      },
      {
        type: "text",
        title: "¿Cuál deberías elegir?",
        content:
          "La elección no depende de cuál sea 'mejor' en abstracto, sino de las necesidades de tu equipo y producto:\n\n*   **Elige VMs (IaaS)** si tienes un equipo de operaciones dedicado, necesitas control absoluto del sistema operativo, o estás migrando aplicaciones 'legacy' que no pueden modificarse.\n*   **Elige App Engine (PaaS)** si quieres enfocarte 100% en el código, tienes un stack estándar (Node.js, Python, Java) y no quieres saber nada de servidores ni redes.\n*   **Elige Contenedores (CaaS - Cloud Run/GKE)** si necesitas portabilidad (moverte entre nubes), tienes dependencias de sistema complejas, o usas un lenguaje/runtime personalizado, pero aún quieres que la plataforma escale la infraestructura por ti.\n*   **Elige Funciones (FaaS)** si tu carga de trabajo es puramente dirigida por eventos (ej. procesar un archivo justo cuando se sube, reaccionar a un webhook), es muy intermitente y quieres pagar $0 cuando no hay tráfico.",
      }
    ],
  },
];
