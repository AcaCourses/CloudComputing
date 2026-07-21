"use client";

import { useState } from "react";
import { ArrowRight, Code2, Server, Shield, RefreshCw } from "lucide-react";

type Operation = {
  method: string;
  color: string;
  bg: string;
  border: string;
  path: string;
  description: string;
  requestBody?: string;
  responseBody: string;
  statusCode: string;
  statusColor: string;
};

const operations: Operation[] = [
  {
    method: "GET",
    color: "text-blue",
    bg: "bg-blue-light",
    border: "border-blue/30",
    path: "/estudiantes/123",
    description: "Obtener los datos de un recurso existente. No modifica nada en el servidor.",
    responseBody: '{\n  "id": 123,\n  "nombre": "Ana López",\n  "email": "ana@uni.mx"\n}',
    statusCode: "200 OK",
    statusColor: "text-green bg-green-light/60",
  },
  {
    method: "POST",
    color: "text-green",
    bg: "bg-green-light",
    border: "border-green/30",
    path: "/estudiantes",
    description: "Crear un nuevo recurso. El servidor asigna el ID y devuelve el objeto creado.",
    requestBody: '{\n  "nombre": "Carlos Ruiz",\n  "email": "carlos@uni.mx"\n}',
    responseBody: '{\n  "id": 124,\n  "nombre": "Carlos Ruiz",\n  "creado": true\n}',
    statusCode: "201 Created",
    statusColor: "text-green bg-green-light/60",
  },
  {
    method: "PUT",
    color: "text-orange",
    bg: "bg-orange/10",
    border: "border-orange/30",
    path: "/estudiantes/123",
    description: "Actualizar un recurso existente. Reemplaza los campos indicados.",
    requestBody: '{\n  "email": "ana.nueva@uni.mx"\n}',
    responseBody: '{\n  "id": 123,\n  "email": "ana.nueva@uni.mx",\n  "actualizado": true\n}',
    statusCode: "200 OK",
    statusColor: "text-green bg-green-light/60",
  },
  {
    method: "DELETE",
    color: "text-red",
    bg: "bg-red-light",
    border: "border-red/30",
    path: "/estudiantes/123",
    description: "Eliminar un recurso existente. El servidor confirma la eliminación.",
    responseBody: '{\n  "eliminado": true,\n  "id": 123\n}',
    statusCode: "204 No Content",
    statusColor: "text-text-secondary bg-grey-light",
  },
];

export function ApiVisualizer() {
  const [activeTab, setActiveTab] = useState<"concept" | "rest">("concept");
  const [selectedOp, setSelectedOp] = useState("GET");

  const op = operations.find((o) => o.method === selectedOp)!;

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex border-b border-border">
        {[
          { id: "concept", label: "¿Qué es una API?" },
          { id: "rest", label: "REST en acción" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "concept" | "rest")}
            className={`px-4 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue border-b-2 border-blue bg-blue-light/10"
                : "text-text-secondary hover:text-foreground hover:bg-grey-light/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "concept" ? (
        <div className="p-5">
          <p className="text-xs text-text-secondary mb-5 leading-relaxed">
            Una API es el contrato público entre un cliente y un servicio. La implementación interna puede cambiar por completo — mientras el contrato se respete, el cliente no se entera ni necesita actualizarse.
          </p>

          {/* Client → API → Service diagram */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
            {/* Client */}
            <div className="flex-1 rounded-lg border border-blue/25 bg-blue-light/15 p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Code2 className="w-3.5 h-3.5 text-blue" />
                <span className="text-xs font-semibold text-blue">Cliente</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed mb-2">
                Solo conoce el contrato. No importa cómo está implementado el servicio.
              </p>
              <code className="block text-[10px] bg-white rounded px-2 py-1.5 text-foreground border border-border/50 font-mono">
                GET /estudiantes/123
              </code>
            </div>

            {/* Arrow + contract */}
            <div className="flex sm:flex-col items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4 text-text-secondary hidden sm:block rotate-90" />
              <div className="rounded-lg border-2 border-dashed border-azure/50 bg-azure/5 px-3 py-2.5 text-center shrink-0">
                <Shield className="w-4 h-4 text-azure mx-auto mb-1" />
                <p className="text-[10px] font-bold text-azure uppercase tracking-wide">API</p>
                <p className="text-[9px] text-text-secondary">Contrato estable</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary hidden sm:block rotate-90" />
            </div>

            {/* Service */}
            <div className="flex-1 rounded-lg border border-green/25 bg-green-light/15 p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Server className="w-3.5 h-3.5 text-green" />
                <span className="text-xs font-semibold text-green">Servicio</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed mb-2">
                La implementación puede cambiar sin afectar al cliente.
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] bg-white border border-border/50 rounded px-1.5 py-0.5 font-mono">v1: MySQL</span>
                <ArrowRight className="w-3 h-3 text-green shrink-0" />
                <span className="text-[9px] bg-green-light/60 border border-green/20 rounded px-1.5 py-0.5 font-mono text-green">v2: Spanner</span>
              </div>
            </div>
          </div>

          {/* Versioning note */}
          <div className="rounded-lg border border-orange/20 bg-orange/5 p-3">
            <div className="flex items-start gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-orange mb-0.5">Versionado de APIs</p>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Cuando hay que cambiar la API, se crea una nueva versión (v1, v2). Los clientes especifican qué versión quieren usar. Ambas coexisten hasta que todos migren — nadie se queda sin servicio.
                </p>
                <div className="flex gap-2 mt-2">
                  <code className="text-[9px] bg-white border border-border/40 rounded px-1.5 py-0.5 text-text-secondary font-mono">/api/v1/estudiantes</code>
                  <code className="text-[9px] bg-orange/10 border border-orange/20 rounded px-1.5 py-0.5 text-orange font-mono">/api/v2/estudiantes</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            REST usa verbos HTTP estándar para operar sobre recursos. Selecciona una operación para ver la petición y respuesta.
          </p>

          {/* Method selector */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {operations.map((o) => (
              <button
                key={o.method}
                onClick={() => setSelectedOp(o.method)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedOp === o.method
                    ? `${o.bg} ${o.color} ${o.border} shadow-sm`
                    : "bg-grey-light/60 text-text-secondary border-transparent hover:bg-grey-light"
                }`}
              >
                {o.method}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-[11px] text-text-secondary bg-grey-light/40 rounded-lg p-2.5 mb-3 leading-relaxed">
            {op.description}
          </p>

          {/* Request / Response */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-panel/30 p-3">
              <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-2">Petición</p>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${op.bg} ${op.color} border ${op.border}`}>
                  {op.method}
                </span>
                <code className="text-[11px] text-foreground font-mono truncate">{op.path}</code>
              </div>
              {op.requestBody ? (
                <pre className="text-[10px] bg-white rounded p-2 text-foreground leading-relaxed border border-border/50 overflow-x-auto font-mono">{op.requestBody}</pre>
              ) : (
                <p className="text-[10px] text-text-secondary italic">Sin cuerpo — solo la URL identifica el recurso</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-panel/30 p-3">
              <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-2">Respuesta</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded mb-2 inline-block ${op.statusColor}`}>
                {op.statusCode}
              </span>
              <pre className="text-[10px] bg-white rounded p-2 text-foreground leading-relaxed border border-border/50 overflow-x-auto mt-1 font-mono">{op.responseBody}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
