"use client";

import { useState } from "react";
import {
  Globe,
  Send,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Server,
  HardDrive,
  Database,
  ShieldCheck,
  Code2,
} from "lucide-react";

type ApiService = {
  id: string;
  label: string;
  icon: React.ElementType;
  methods: ApiMethod[];
};

type ApiMethod = {
  id: string;
  verb: "GET" | "POST" | "PUT" | "DELETE";
  name: string;
  endpoint: string;
  gcpEndpoint: string;
  awsEndpoint: string;
  description: string;
  gcpDescription: string;
  awsDescription: string;
  response: string;
  gcpResponse: string;
  awsResponse: string;
};

const services: ApiService[] = [
  {
    id: "storage",
    label: "Almacenamiento",
    icon: HardDrive,
    methods: [
      {
        id: "list-buckets",
        verb: "GET",
        name: "Listar buckets",
        endpoint: "/storage/v1/buckets",
        gcpEndpoint: "GET https://storage.googleapis.com/storage/v1/b?project=mi-proyecto",
        awsEndpoint: "GET https://s3.amazonaws.com/",
        description: "Devuelve la lista de todos los buckets del proyecto activo con su nombre, ubicación y fecha de creación.",
        gcpDescription: "Llama a la Cloud Storage JSON API. Requiere el parámetro project y un token OAuth 2.0 o cuenta de servicio con permiso storage.buckets.list.",
        awsDescription: "Devuelve todos los buckets S3 de la cuenta autenticada. Requiere credenciales IAM con permisos s3:ListAllMyBuckets.",
        response: `{
  "buckets": [
    {
      "name": "archivos-clase",
      "location": "us-east",
      "created": "2026-06-15T10:23:41Z"
    },
    {
      "name": "backups-semanales",
      "location": "us-west",
      "created": "2026-06-10T08:15:22Z"
    }
  ]
}`,
        gcpResponse: `{
  "kind": "storage#buckets",
  "items": [
    {
      "name": "archivos-clase",
      "location": "US-EAST1",
      "storageClass": "STANDARD",
      "timeCreated": "2026-06-15T10:23:41Z"
    },
    {
      "name": "backups-semanales",
      "location": "US-WEST1",
      "storageClass": "NEARLINE",
      "timeCreated": "2026-06-10T08:15:22Z"
    }
  ]
}`,
        awsResponse: `<?xml version="1.0" encoding="UTF-8"?>
<ListAllMyBucketsResult>
  <Buckets>
    <Bucket>
      <Name>archivos-clase</Name>
      <CreationDate>2026-06-15T10:23:41Z</CreationDate>
    </Bucket>
    <Bucket>
      <Name>backups-semanales</Name>
      <CreationDate>2026-06-10T08:15:22Z</CreationDate>
    </Bucket>
  </Buckets>
</ListAllMyBucketsResult>`,
      },
      {
        id: "create-bucket",
        verb: "POST",
        name: "Crear bucket",
        endpoint: "/storage/v1/buckets",
        gcpEndpoint: "POST https://storage.googleapis.com/storage/v1/b?project=mi-proyecto",
        awsEndpoint: "PUT https://mi-bucket.s3.amazonaws.com/",
        description: "Crea un nuevo bucket de almacenamiento. Requiere nombre único y ubicación. Devuelve los datos del recurso creado.",
        gcpDescription: "Crea un nuevo bucket de Cloud Storage. El body JSON incluye name y location. Requiere token OAuth 2.0 con permiso storage.buckets.create.",
        awsDescription: "Crea un nuevo bucket S3. El nombre debe ser globalmente único. El método HTTP es PUT (no POST) — una peculiaridad de la API de S3.",
        response: `{
  "name": "nuevo-laboratorio",
  "location": "us-east",
  "created": "2026-06-29T16:45:10Z",
  "status": "ACTIVE"
}`,
        gcpResponse: `{
  "kind": "storage#bucket",
  "name": "nuevo-laboratorio",
  "location": "US-EAST1",
  "storageClass": "STANDARD",
  "timeCreated": "2026-06-29T16:45:10Z",
  "selfLink": "https://www.googleapis.com/storage/v1/b/nuevo-laboratorio"
}`,
        awsResponse: `HTTP/1.1 200 OK
Location: /mi-nuevo-bucket
Date: Sun, 29 Jun 2026 16:45:10 GMT

(cuerpo vacío — el éxito se indica
con el código 200)`,
      },
    ],
  },
  {
    id: "compute",
    label: "Cómputo",
    icon: Server,
    methods: [
      {
        id: "list-instances",
        verb: "GET",
        name: "Listar instancias",
        endpoint: "/compute/v1/instances",
        gcpEndpoint: "GET https://compute.googleapis.com/compute/v1/projects/mi-proyecto/zones/us-east1-b/instances",
        awsEndpoint: "GET https://ec2.amazonaws.com/?Action=DescribeInstances",
        description: "Devuelve la lista de máquinas virtuales del proyecto con su estado, tipo y zona.",
        gcpDescription: "Llama a la Compute Engine API. Requiere especificar proyecto y zona. Devuelve JSON con detalles de las instancias.",
        awsDescription: "Llama a la acción DescribeInstances de la API de EC2. Devuelve XML con detalles de todas las instancias.",
        response: `{
  "instances": [
    {
      "name": "web-server",
      "type": "standard-2",
      "zone": "us-east-1a",
      "status": "RUNNING"
    },
    {
      "name": "worker-bg",
      "type": "standard-1",
      "zone": "us-east-1b",
      "status": "STOPPED"
    }
  ]
}`,
        gcpResponse: `{
  "items": [
    {
      "name": "web-server",
      "machineType": "e2-standard-2",
      "zone": "us-east1-b",
      "status": "RUNNING",
      "networkInterfaces": [{"networkIP": "10.128.0.2"}]
    },
    {
      "name": "worker-bg",
      "machineType": "e2-standard-1",
      "zone": "us-east1-b",
      "status": "TERMINATED"
    }
  ]
}`,
        awsResponse: `{
  "Reservations": [{
    "Instances": [{
      "InstanceId": "i-0abc123def",
      "InstanceType": "t3.medium",
      "State": { "Name": "running" },
      "AvailabilityZone": "us-east-1a"
    }]
  }]
}`,
      },
    ],
  },
  {
    id: "iam",
    label: "Identidad (IAM)",
    icon: ShieldCheck,
    methods: [
      {
        id: "list-users",
        verb: "GET",
        name: "Listar usuarios",
        endpoint: "/iam/v1/users",
        gcpEndpoint: "POST https://cloudresourcemanager.googleapis.com/v1/projects/mi-proyecto:getIamPolicy",
        awsEndpoint: "GET https://iam.amazonaws.com/?Action=ListUsers",
        description: "Devuelve la lista de usuarios del proyecto con su rol, email y fecha de último acceso.",
        gcpDescription: "En GCP no hay 'usuarios' como recurso. Se consultan las políticas IAM del proyecto, que listan members (cuentas) y sus roles.",
        awsDescription: "Llama a la acción ListUsers de IAM. Devuelve todos los usuarios de la cuenta con su ARN, fecha de creación y ruta.",
        response: `{
  "users": [
    {
      "email": "alumno01@uni.edu",
      "role": "Editor",
      "lastAccess": "2026-06-28T14:30:00Z"
    },
    {
      "email": "profesor@uni.edu",
      "role": "Owner",
      "lastAccess": "2026-06-29T09:15:00Z"
    }
  ]
}`,
        gcpResponse: `{
  "bindings": [
    {
      "role": "roles/editor",
      "members": [
        "user:alumno01@uni.edu"
      ]
    },
    {
      "role": "roles/owner",
      "members": [
        "user:profesor@uni.edu"
      ]
    }
  ],
  "etag": "BwX..."
}`,
        awsResponse: `{
  "Users": [
    {
      "UserName": "alumno01",
      "UserId": "AIDA...",
      "Arn": "arn:aws:iam::123:user/alumno01",
      "CreateDate": "2026-06-01T10:00:00Z"
    },
    {
      "UserName": "profesor",
      "UserId": "AIDA...",
      "Arn": "arn:aws:iam::123:user/profesor",
      "CreateDate": "2026-05-15T08:00:00Z"
    }
  ]
}`,
      },
    ],
  },
];

const verbColors: Record<string, string> = {
  GET: "bg-green/15 text-green border-green/30",
  POST: "bg-azure/15 text-azure border-azure/30",
  PUT: "bg-orange/15 text-orange border-orange/30",
  DELETE: "bg-red-100 text-red-600 border-red-200",
};

type ViewMode = "concept" | "gcp" | "aws";

export function ApiExplorer() {
  const [activeService, setActiveService] = useState<string>("storage");
  const [activeMethod, setActiveMethod] = useState<string>("list-buckets");
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [executed, setExecuted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const service = services.find((s) => s.id === activeService)!;
  const method = service.methods.find((m) => m.id === activeMethod) ?? service.methods[0];

  const handleServiceChange = (id: string) => {
    setActiveService(id);
    const svc = services.find((s) => s.id === id)!;
    setActiveMethod(svc.methods[0].id);
    setExecuted(false);
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Explorador de APIs cloud
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Selecciona un servicio y un método. Haz clic en &quot;Enviar solicitud&quot; para ver la respuesta.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => { setViewMode("concept"); setExecuted(false); }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Concepto
          </button>
          <button
            onClick={() => { setViewMode("gcp"); setExecuted(false); }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "gcp"
                ? "bg-white text-azure shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            GCP
          </button>
          <button
            onClick={() => { setViewMode("aws"); setExecuted(false); }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "aws"
                ? "bg-white text-orange shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            AWS
          </button>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
        {/* Left: Service selector */}
        <div className="space-y-1.5">
          <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium px-1">
            Servicio
          </p>
          {services.map((svc) => {
            const Icon = svc.icon;
            const isActive = activeService === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => handleServiceChange(svc.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all text-xs ${
                  isActive
                    ? "border-azure/30 bg-azure/5 text-foreground font-semibold"
                    : "border-transparent text-text-secondary hover:bg-panel/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-azure" : ""}`} />
                {svc.label}
              </button>
            );
          })}
        </div>

        {/* Right: Method + Response */}
        <div className="space-y-3">
          {/* Method selector */}
          <div className="space-y-1.5">
            <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">
              Método
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.methods.map((m) => {
                const isActive = activeMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => { setActiveMethod(m.id); setExecuted(false); }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] font-medium transition-all ${
                      isActive
                        ? "border-azure/30 bg-azure/5 text-foreground"
                        : "border-border text-text-secondary hover:border-azure/20"
                    }`}
                  >
                    <span className={`px-1 py-0.5 rounded text-[8px] font-bold border ${verbColors[m.verb]}`}>
                      {m.verb}
                    </span>
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Request panel */}
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-border">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${verbColors[method.verb]}`}>
                {method.verb}
              </span>
              <code className="text-[10px] text-foreground font-mono flex-1 truncate">
                {viewMode === "aws" ? method.awsEndpoint : viewMode === "gcp" ? method.gcpEndpoint : method.endpoint}
              </code>
              <button
                onClick={() => copyText("endpoint", viewMode === "aws" ? method.awsEndpoint : viewMode === "gcp" ? method.gcpEndpoint : method.endpoint)}
                className="text-text-secondary hover:text-foreground transition-colors p-0.5"
              >
                {copiedId === "endpoint" ? <Check className="w-3 h-3 text-green" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="px-3 py-2 bg-white/50">
              <p className="text-xs text-text-secondary leading-relaxed">
                {viewMode === "aws" ? method.awsDescription : viewMode === "gcp" ? method.gcpDescription : method.description}
              </p>
            </div>

            {/* Send button */}
            <div className="px-3 py-2 border-t border-border bg-panel/50">
              {!executed ? (
                <button
                  onClick={() => setExecuted(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                    viewMode === "aws"
                      ? "bg-orange/10 text-orange border border-orange/30 hover:bg-orange/20"
                      : "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
                  }`}
                >
                  <Send className="w-3 h-3" />
                  Enviar solicitud
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-green font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  200 OK — Respuesta recibida
                </div>
              )}
            </div>
          </div>

          {/* Response panel */}
          {executed && (
            <div className="rounded-lg border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-900">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-green-400 font-medium">Response</span>
                  <span className="text-[9px] text-gray-500">
                    {viewMode === "aws" ? "application/json" : "application/json"}
                  </span>
                </div>
                <button
                  onClick={() => copyText("response", viewMode === "aws" ? method.awsResponse : viewMode === "gcp" ? method.gcpResponse : method.response)}
                  className="text-gray-500 hover:text-gray-300 transition-colors p-0.5"
                >
                  {copiedId === "response" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <pre className="bg-gray-900 px-4 py-3 text-[10px] text-gray-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {viewMode === "aws" ? method.awsResponse : viewMode === "gcp" ? method.gcpResponse : method.response}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Flow diagram */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-text-secondary pt-1">
        <span className="px-2 py-1 rounded border border-border bg-panel/50">Tu app / script</span>
        <ArrowRight className="w-3 h-3" />
        <span className={`px-2 py-1 rounded border font-medium ${
          viewMode === "aws"
            ? "border-orange/30 bg-orange/5 text-orange"
            : "border-azure/30 bg-azure/5 text-azure"
        }`}>
          API del servicio
        </span>
        <ArrowRight className="w-3 h-3" />
        <span className="px-2 py-1 rounded border border-border bg-panel/50">Respuesta JSON/XML</span>
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 Toda acción que haces en la consola es, internamente, una llamada a estas APIs. Explorarlas te da el control programático completo.
      </p>
    </div>
  );
}
