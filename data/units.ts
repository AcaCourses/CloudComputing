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
    title: "Infraestructura, redes y entrega de contenido en la nube",
    shortTitle: "Networking",
    modules: [
      { title: "Regiones y zonas de disponibilidad", slug: "regiones-zonas-disponibilidad" },
      { title: "Redes virtuales (VNet/VPC)", slug: "redes-virtuales" },
      { title: "Subredes y grupos de seguridad", slug: "subredes-grupos-seguridad" },
      { title: "Balanceo de carga", slug: "balanceo-carga" },
      { title: "DNS en la nube", slug: "dns-nube" },
      { title: "CDN y entrega de contenido", slug: "cdn-entrega-contenido" },
      { title: "Conectividad híbrida", slug: "conectividad-hibrida" },
    ],
  },
  {
    number: 3,
    title: "Servicios de cómputo, almacenamiento y bases de datos en la nube",
    shortTitle: "Cómputo & Storage",
    modules: [
      { title: "Máquinas virtuales", slug: "maquinas-virtuales" },
      { title: "Contenedores y orquestación", slug: "contenedores-orquestacion" },
      { title: "Serverless / Functions", slug: "serverless-functions" },
      { title: "App Services y PaaS de cómputo", slug: "app-services-paas" },
      { title: "Almacenamiento de objetos (Blob/S3)", slug: "almacenamiento-objetos" },
      { title: "Almacenamiento de bloques y archivos", slug: "almacenamiento-bloques-archivos" },
      { title: "Bases de datos SQL administradas", slug: "bases-datos-sql" },
      { title: "Bases de datos NoSQL", slug: "bases-datos-nosql" },
    ],
  },
  {
    number: 4,
    title: "Seguridad, cumplimiento, monitoreo y gobierno de la nube",
    shortTitle: "Seguridad & Monitoreo",
    modules: [
      { title: "Identidad y gestión de acceso (IAM)", slug: "identidad-gestion-acceso" },
      { title: "Autenticación y autorización", slug: "autenticacion-autorizacion" },
      { title: "Cifrado y protección de datos", slug: "cifrado-proteccion-datos" },
      { title: "Cumplimiento y normatividad", slug: "cumplimiento-normatividad" },
      { title: "Monitoreo y observabilidad", slug: "monitoreo-observabilidad" },
      { title: "Alertas y logging", slug: "alertas-logging" },
      { title: "Gobernanza y políticas", slug: "gobernanza-politicas" },
    ],
  },
  {
    number: 5,
    title: "Costos, buenas prácticas, tendencias emergentes y proyecto integrador",
    shortTitle: "Costos & Tendencias",
    modules: [
      { title: "Modelos de precios en la nube", slug: "modelos-precios" },
      { title: "Calculadoras de costos", slug: "calculadoras-costos" },
      { title: "Optimización y ahorro", slug: "optimizacion-ahorro" },
      { title: "Well-Architected Framework", slug: "well-architected-framework" },
      { title: "Tendencias: IA, edge, multi-cloud", slug: "tendencias-ia-edge-multicloud" },
      { title: "Proyecto integrador: diseño", slug: "proyecto-integrador-diseno" },
      { title: "Proyecto integrador: implementación", slug: "proyecto-integrador-implementacion" },
    ],
  },
];
