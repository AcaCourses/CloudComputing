export type Module = {
  title: string;
  slug: string;
};

export type Unit = {
  number: number;
  title: string;
  shortTitle: string;
  modules: Module[];
};

export const unitsData: Unit[] = [
  {
    number: 1,
    title: "Fundamentos de computación en la nube y modelos de servicio/despliegue",
    shortTitle: "Fundamentos Cloud",
    modules: [
      { title: "Introducción a la computación en la nube", slug: "introduccion-computacion-nube" },
      { title: "Historia y evolución del cloud", slug: "historia-evolucion-cloud" },
      { title: "Modelos de servicio: IaaS, PaaS, SaaS", slug: "modelos-servicio" },
      { title: "Modelos de despliegue: público, privado, híbrido", slug: "modelos-despliegue" },
      { title: "Ventajas y consideraciones del cloud", slug: "ventajas-consideraciones" },
      { title: "Proveedores principales: Azure, AWS, GCP", slug: "proveedores-principales" },
    ],
  },
  {
    number: 2,
    title: "Google Cloud: acceso, consola y administración básica",
    shortTitle: "Uso de Google Cloud",
    modules: [
      {
        title: "Arquitectura general del entorno cloud",
        slug: "arquitectura-entorno-cloud"
      },
      {
        title: "Proyectos y recursos",
        slug: "proyectos-recursos"
      },
      {
        title: "Facturación y administración básica",
        slug: "facturacion-administracion"
      },
      {
        title: "Consola, CLI y entornos de terminal",
        slug: "consola-web"
      },
      {
        title: "SDK, APIs y automatización",
        slug: "sdk-automatizacion"
      },
    ]
  },
  {
    number: 3,
    title: "Cómputo en la nube: VMs, contenedores y serverless",
    shortTitle: "Cómputo en la nube",
    modules: [
      {
        title: "Opciones de cómputo en la nube",
        slug: "opciones-computo"
      },
      {
        title: "Máquinas virtuales",
        slug: "maquinas-virtuales"
      },
      {
        title: "Regiones, zonas y tipos de máquina",
        slug: "regiones-zonas-maquinas"
      },
      {
        title: "Escalamiento y plataformas administradas",
        slug: "escalamiento"
      },
      {
        title: "Contenedores y orquestación",
        slug: "contenedores"
      },
      {
        title: "Serverless y funciones",
        slug: "serverless-funciones"
      }
    ]
  },
  {
    number: 4,
    title: "Programación dirigida por eventos y automatización",
    shortTitle: "Eventos y automatización",
    modules: [
      {
        title: "Eventos en la nube",
        slug: "que-es-evento"
      },
      {
        title: "Funciones que responden a eventos",
        slug: "funciones-eventos"
      },
      {
        title: "Automatización y servicios reactivos",
        slug: "automatizacion"
      },
      {
        title: "Despliegues básicos de servicios",
        slug: "despliegues"
      }
    ]
  },

  {
    number: 5,
    title: "Datos y almacenamiento en la nube",
    shortTitle: "Datos y almacenamiento",
    modules: [
      {
        title: "Opciones de almacenamiento en la nube",
        slug: "opciones-almacenamiento"
      },
      {
        title: "Datos estructurados y no estructurados",
        slug: "datos-estructurados-no-estructurados"
      },
      {
        title: "Arquitectura general de almacenamiento",
        slug: "arquitectura-almacenamiento"
      },
      {
        title: "Almacenamiento de objetos",
        slug: "almacenamiento-objetos"
      }
    ]
  },
  {
    number: 6,
    title: "Bases de datos y modelos de acceso",
    shortTitle: "Bases de datos",
    modules: [
      {
        title: "Bases relacionales y SQL administrado",
        slug: "bases-datos-relacionales"
      },
      {
        title: "Bases de datos distribuidas y globales",
        slug: "bases-datos-distribuidas"
      },
      {
        title: "Opciones NoSQL",
        slug: "opciones-nosql"
      }
    ]
  },
  {
    number: 7,
    title: "APIs, mensajería e integración",
    shortTitle: "APIs e integración",
    modules: [
      {
        title: "El propósito de las APIs",
        slug: "proposito-apis"
      },
      {
        title: "Arquitectura básica de una API REST",
        slug: "api-rest"
      },
      {
        title: "Gestión de APIs",
        slug: "gestion-apis"
      },
      {
        title: "Mensajería e integración asíncrona",
        slug: "mensajeria-eventos"
      }
    ]
  },
  {
    number: 8,
    title: "Seguridad, cifrado e IAM",
    shortTitle: "Seguridad e IAM",
    modules: [
      {
        title: "Seguridad y responsabilidad compartida",
        slug: "seguridad-en-la-nube"
      },
      {
        title: "Opciones de cifrado",
        slug: "opciones-cifrado"
      },
      {
        title: "Autenticación, autorización e IAM",
        slug: "autenticacion-autorizacion"
      },
      {
        title: "Mejores prácticas de acceso",
        slug: "mejores-practicas-acceso"
      }
    ]
  },
]