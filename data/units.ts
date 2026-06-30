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
    title: "Cloud Computing Fundamentals — Parte 1",
    shortTitle: "Arquitectura y operación básica del entorno cloud",
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
        title: "Acceso, consola y APIs",
        slug: "acceso-consola-apis"
      },
      {
        title: "Facturación y administración básica",
        slug: "facturacion-administracion"
      },
      {
        title: "Consola web",
        slug: "consola-web"
      },
      {
        title: "Línea de comandos",
        slug: "linea-comandos"
      },
      {
        title: "Entornos de terminal en la nube",
        slug: "terminal-cloud"
      },
      {
        title: "SDK y herramientas de automatización",
        slug: "sdk-automatizacion"
      },
      {
        title: "APIs y exploración de servicios",
        slug: "apis-exploracion"
      },
    ]
  },
  {
    number: 3,
    title: "Cloud Computing Fundamentals — Parte 2",
    shortTitle: "Cómputo, contenedores y ejecución",
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
        title: "Escalamiento y aplicaciones elásticas",
        slug: "escalamiento"
      },
      {
        title: "Plataformas administradas para aplicaciones",
        slug: "plataformas-administradas"
      },
      {
        title: "Contenedores",
        slug: "contenedores"
      },
      {
        title: "Orquestación de contenedores",
        slug: "orquestacion-contenedores"
      },
      {
        title: "Serverless y funciones",
        slug: "serverless-funciones"
      }
    ]
  },
  {
    number: 4,
    title: "Cloud Computing Fundamentals — Parte 3",
    shortTitle: "Eventos, automatización y servicios dirigidos por eventos",
    modules: [
      {
        title: "Qué es un evento",
        slug: "que-es-evento"
      },
      {
        title: "Programación basada en eventos",
        slug: "programacion-basada-eventos"
      },
      {
        title: "Funciones que responden a eventos",
        slug: "funciones-eventos"
      },
      {
        title: "Automatización",
        slug: "automatizacion"
      },
      {
        title: "Servicios reactivos y casos de uso simples",
        slug: "servicios-reactivos"
      },
      {
        title: "Despliegues básicos de servicios",
        slug: "despliegues"
      }
    ]
  },

  {
    number: 5,
    title: "Cloud Computing Infrastructure Fundamentals — Parte 1",
    shortTitle: "Datos, almacenamiento y acceso a servicios",
    modules: [
      {
        title: "Introducción a la infraestructura cloud",
        slug: "introduccion-infraestructura"
      },
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
      }
    ]
  },
  {
    number: 6,
    title: "Cloud Computing Infrastructure Fundamentals — Parte 2",
    shortTitle: "Storage y SQL/NoSQL",
    modules: [
      {
        title: "Almacenamiento de objetos",
        slug: "almacenamiento-objetos"
      },
      {
        title: "Servicios de bases de datos relacionales",
        slug: "bases-datos-relacionales"
      },
      {
        title: "Servicios SQL administrados",
        slug: "sql-administrado"
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
    title: "Cloud Computing Infrastructure Fundamentals — Parte 3",
    shortTitle: "APIs, mensajería e integración",
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
        title: "Servicios de mensajería y eventos",
        slug: "mensajeria-eventos"
      },
      {
        title: "Integración asíncrona entre servicios",
        slug: "integracion-asincrona"
      }
    ]
  },
  {
    number: 8,
    title: "Cloud Computing Infrastructure Fundamentals — Parte 4",
    shortTitle: "Modelo compartido, cifrado e IAM",
    modules: [
      {
        title: "Seguridad en la nube",
        slug: "seguridad-en-la-nube"
      },
      {
        title: "Modelo de responsabilidad compartida",
        slug: "modelo-responsabilidad-compartida"
      },
      {
        title: "Opciones de cifrado",
        slug: "opciones-cifrado"
      },
      {
        title: "Autenticación y autorización",
        slug: "autenticacion-autorizacion"
      },
      {
        title: "Mejores prácticas de acceso",
        slug: "mejores-practicas-acceso"
      }
    ]
  },
]