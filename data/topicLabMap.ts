/**
 * Mapping from unit number + topic slug → related lab(s).
 * Each entry contains the lab slug (for routing to /labs/[slug])
 * and a short display name.
 */

export type RelatedLab = {
  slug: string;
  labNumber: number;
  title: string;
};

type TopicLabMapping = Record<string, RelatedLab[]>;

// Key format: "unit:slug"
export const topicLabMap: TopicLabMapping = {
  // Unit 1
  "1:introduccion-computacion-nube": [
    { slug: "a-tour-of-google-cloud-hands-on-labs", labNumber: 1, title: "A Tour of Google Cloud Hands-on Labs" },
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
  ],
  "1:modelos-servicio": [
    { slug: "app-engine-qwik-start-python", labNumber: 4, title: "App Engine: Qwik Start - Python" },
  ],
  "1:modelos-despliegue": [
    { slug: "cloud-run-functions-qwik-start-command-line", labNumber: 5, title: "Cloud Run Functions: Qwik Start" },
  ],
  "1:proveedores-principales": [
    { slug: "google-kubernetes-engine-qwik-start", labNumber: 6, title: "Google Kubernetes Engine: Qwik Start" },
  ],

  // Unit 2
  "2:arquitectura-entorno-cloud": [
    { slug: "a-tour-of-google-cloud-hands-on-labs", labNumber: 1, title: "A Tour of Google Cloud Hands-on Labs" },
    { slug: "getting-started-with-cloud-shell-and-gcloud", labNumber: 2, title: "Getting Started with Cloud Shell and gcloud" },
  ],
  "2:proyectos-recursos": [
    { slug: "a-tour-of-google-cloud-hands-on-labs", labNumber: 1, title: "A Tour of Google Cloud Hands-on Labs" },
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
  ],
  "2:facturacion-administracion": [
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
  ],
  "2:sdk-automatizacion": [
    { slug: "getting-started-with-cloud-shell-and-gcloud", labNumber: 2, title: "Getting Started with Cloud Shell and gcloud" },
    { slug: "cloud-run-functions-qwik-start-command-line", labNumber: 5, title: "Cloud Run Functions: Qwik Start" },
  ],

  // Unit 3
  "3:opciones-computo": [
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
    { slug: "app-engine-qwik-start-python", labNumber: 4, title: "App Engine: Qwik Start - Python" },
  ],
  "3:regiones-zonas": [
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
  ],
  "3:maquinas-virtuales": [
    { slug: "create-a-virtual-machine", labNumber: 3, title: "Create a Virtual Machine" },
  ],
  "3:plataformas-administradas": [
    { slug: "app-engine-qwik-start-python", labNumber: 4, title: "App Engine: Qwik Start - Python" },
  ],
  "3:escalamiento": [
    { slug: "app-engine-qwik-start-python", labNumber: 4, title: "App Engine: Qwik Start - Python" },
  ],
  "3:contenedores": [
    { slug: "google-kubernetes-engine-qwik-start", labNumber: 6, title: "Google Kubernetes Engine: Qwik Start" },
  ],
  "3:serverless-funciones": [
    { slug: "cloud-run-functions-qwik-start-command-line", labNumber: 5, title: "Cloud Run Functions: Qwik Start" },
  ],

  // Unit 4
  "4:que-es-evento": [
    { slug: "cloud-run-functions-qwik-start-command-line", labNumber: 5, title: "Cloud Run Functions: Qwik Start" },
  ],
  "4:funciones-eventos": [
    { slug: "cloud-run-functions-qwik-start-command-line", labNumber: 5, title: "Cloud Run Functions: Qwik Start" },
  ],
  "4:automatizacion": [
    { slug: "pub-sub-qwik-start-python", labNumber: 10, title: "Pub/Sub: Qwik Start - Python" },
  ],
  "4:despliegues": [
    { slug: "app-engine-qwik-start-python", labNumber: 4, title: "App Engine: Qwik Start - Python" },
  ],

  // Unit 5
  "5:opciones-almacenamiento": [
    { slug: "cloud-storage-qwik-start-cli-sdk", labNumber: 7, title: "Cloud Storage: Qwik Start - CLI/SDK" },
  ],
  "5:datos-estructurados-no-estructurados": [
    { slug: "cloud-storage-qwik-start-cli-sdk", labNumber: 7, title: "Cloud Storage: Qwik Start - CLI/SDK" },
    { slug: "cloud-sql-for-mysql-qwik-start", labNumber: 8, title: "Cloud SQL for MySQL: Qwik Start" },
  ],
  "5:arquitectura-almacenamiento": [
    { slug: "cloud-storage-qwik-start-cli-sdk", labNumber: 7, title: "Cloud Storage: Qwik Start - CLI/SDK" },
  ],
  "5:almacenamiento-objetos": [
    { slug: "cloud-storage-qwik-start-cli-sdk", labNumber: 7, title: "Cloud Storage: Qwik Start - CLI/SDK" },
  ],

  // Unit 6
  "6:bases-datos-relacionales": [
    { slug: "cloud-sql-for-mysql-qwik-start", labNumber: 8, title: "Cloud SQL for MySQL: Qwik Start" },
  ],
  "6:bases-datos-distribuidas": [
    { slug: "cloud-sql-for-mysql-qwik-start", labNumber: 8, title: "Cloud SQL for MySQL: Qwik Start" },
  ],
  "6:opciones-nosql": [
    { slug: "cloud-sql-for-mysql-qwik-start", labNumber: 8, title: "Cloud SQL for MySQL: Qwik Start" },
  ],

  // Unit 7
  "7:proposito-apis": [
    { slug: "introduction-to-apis-in-google-cloud", labNumber: 9, title: "Introduction to APIs in Google Cloud" },
  ],
  "7:api-rest": [
    { slug: "introduction-to-apis-in-google-cloud", labNumber: 9, title: "Introduction to APIs in Google Cloud" },
  ],
  "7:gestion-apis": [
    { slug: "introduction-to-apis-in-google-cloud", labNumber: 9, title: "Introduction to APIs in Google Cloud" },
  ],
  "7:mensajeria-eventos": [
    { slug: "pub-sub-qwik-start-python", labNumber: 10, title: "Pub/Sub: Qwik Start - Python" },
  ],

  // Unit 8
  "8:seguridad-en-la-nube": [
    { slug: "user-authentication-identity-aware-proxy", labNumber: 11, title: "User Authentication: Identity-Aware Proxy" },
  ],
  "8:opciones-cifrado": [
    { slug: "user-authentication-identity-aware-proxy", labNumber: 11, title: "User Authentication: Identity-Aware Proxy" },
  ],
  "8:autenticacion-autorizacion": [
    { slug: "cloud-iam-qwik-start", labNumber: 12, title: "Cloud IAM: Qwik Start" },
  ],
  "8:mejores-practicas-acceso": [
    { slug: "cloud-iam-qwik-start", labNumber: 12, title: "Cloud IAM: Qwik Start" },
  ],
};

export function getRelatedLabs(unit: string | number, topicSlug: string): RelatedLab[] {
  return topicLabMap[`${unit}:${topicSlug}`] ?? [];
}
