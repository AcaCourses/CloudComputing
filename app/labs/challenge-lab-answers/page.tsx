import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Terminal,
  BookOpen,
  Shield,
  Info,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Challenge Lab: Guía de Respuestas | Cloud Computing",
  description:
    "Guía explicativa paso a paso del Challenge Lab: Implement Load Balancing on Compute Engine (GSP313).",
};

/* ───────────────────────────── helpers ───────────────────────────── */

function CodeLine({
  line,
  explanation,
}: {
  line: string;
  explanation: string;
}) {
  return (
    <div className="group">
      <div className="font-mono text-sm bg-black/80 text-green-400 px-4 py-2 rounded-t-lg border border-border select-none pointer-events-none">
        {line}
      </div>
      <div className="px-4 py-2 bg-panel border border-t-0 border-border rounded-b-lg text-sm text-text-secondary">
        <span className="text-azure font-semibold">↳</span> {explanation}
      </div>
    </div>
  );
}

function TaskSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-azure text-white text-sm font-bold">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>
      <div className="space-y-6 pl-2 sm:pl-4 border-l-2 border-azure/20">
        {children}
      </div>
    </section>
  );
}

function CommandBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-azure" />
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ───────────────────────────── page ─────────────────────────────── */

export default function ChallengeLabAnswersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/labs/implement-load-balancing-on-compute-engine-challenge-lab"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-azure transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la guía del Challenge Lab
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-red bg-red/10 px-2 py-1 rounded-md">
                RESPUESTAS
              </span>
              <span className="text-xs font-mono text-text-secondary">
                GSP313
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Implement Load Balancing on Compute Engine
            </h1>
            <p className="text-text-secondary text-lg">
              Guía explicativa comando por comando — NO para copiar y pegar.
            </p>
          </header>

          {/* ════════════════ DISCLAIMER ════════════════ */}
          <div className="mb-12 p-6 rounded-2xl border-2 border-red/40 bg-red/5">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red shrink-0 mt-0.5" />
              <h2 className="text-lg font-bold text-red">
                ⚠️ Disclaimer — Lee esto antes de continuar
              </h2>
            </div>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-foreground">
                  Esta es una guía de referencia, NO una solución para copiar y
                  pegar.
                </strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Los comandos aquí mostrados <strong>pueden estar desactualizados</strong>{" "}
                  respecto a la versión actual del lab. Google actualiza
                  periódicamente las imágenes, nombres de recursos y requisitos.
                </li>
                <li>
                  <strong>NO copies y pegues bloques completos.</strong> Los
                  comandos están fragmentados línea por línea a propósito para que
                  entiendas qué hace cada parte.
                </li>
                <li>
                  Usa esta guía como <strong>mapa mental</strong>: comprende el
                  orden de los recursos, las dependencias entre ellos y la lógica
                  de cada flag. Luego escribe TÚ los comandos en Cloud Shell.
                </li>
                <li>
                  Si un comando falla, <strong>lee el error</strong>. El 90% de
                  los problemas se resuelven ajustando zona, región, nombre de
                  proyecto o versión de imagen.
                </li>
                <li>
                  El objetivo pedagógico es que <strong>domines el proceso</strong>,
                  no que obtengas un badge sin aprender.
                </li>
              </ul>
            </div>
          </div>

          {/* ════════════════ BLOQUE INICIAL ════════════════ */}
          <TaskSection number={0} title="Bloque inicial: Zona, Región y Proyecto">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Antes de cualquier tarea, necesitas almacenar en variables de shell
                  los valores por defecto de tu proyecto de lab. Estos valores vienen
                  preconfigurados en la metadata del proyecto de Qwiklabs.
                </p>
              </div>
            </div>

            <CommandBlock title="Obtener la zona por defecto">
              <CodeLine
                line="ZONE=$(gcloud compute project-info describe \"
                explanation="Inicia la asignación de variable ZONE. Llama a gcloud para obtener info del proyecto actual."
              />
              <CodeLine
                line="  --format=&quot;value(commonInstanceMetadata.items[google-compute-default-zone])&quot;)"
                explanation="--format filtra la salida: extrae solo el valor del campo 'google-compute-default-zone' de la metadata del proyecto. Resultado: algo como 'us-east1-b'."
              />
            </CommandBlock>

            <CommandBlock title="Obtener la región por defecto">
              <CodeLine
                line="REGION=$(gcloud compute project-info describe \"
                explanation="Mismo patrón: obtiene info del proyecto para extraer la región."
              />
              <CodeLine
                line="  --format=&quot;value(commonInstanceMetadata.items[google-compute-default-region])&quot;)"
                explanation="Extrae 'google-compute-default-region'. Resultado: algo como 'us-east1'. La región es el 'padre' de la zona."
              />
            </CommandBlock>

            <CommandBlock title="Obtener el Project ID">
              <CodeLine
                line="PROJECT_ID=$(gcloud config get-value project)"
                explanation="Lee el project ID configurado en tu sesión de gcloud. Esto lo setea automáticamente Qwiklabs cuando inicias el lab."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">¿Por qué es importante?</strong>{" "}
                  En vez de hardcodear valores (que cambian en cada sesión de lab),
                  usas variables. Si la zona de hoy es <code>us-east1-b</code> y
                  mañana es <code>us-west1-a</code>, tu script sigue funcionando.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 1 ════════════════ */}
          <TaskSection number={1} title="Crear instancias web y regla de firewall">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  El lab requiere 3 VMs (<code>web1</code>, <code>web2</code>,{" "}
                  <code>web3</code>) con Apache corriendo y una regla de firewall
                  que permita HTTP. El tag <code>network-lb-tag</code> conecta el
                  firewall con las VMs.
                </p>
              </div>
            </div>

            <CommandBlock title="Crear la VM web1 (repetir para web2 y web3)">
              <CodeLine
                line="gcloud compute instances create web1 \"
                explanation="Comando para crear una instancia. 'web1' es el nombre del recurso — cámbialo a web2 y web3 en las siguientes ejecuciones."
              />
              <CodeLine
                line="  --zone=$ZONE \"
                explanation="Usa la variable que definiste arriba. La VM vivirá en esa zona específica."
              />
              <CodeLine
                line="  --machine-type=e2-small \"
                explanation="Tipo de máquina económica con 2 vCPU y 2 GB RAM. El lab pide exactamente esta."
              />
              <CodeLine
                line="  --tags=network-lb-tag \"
                explanation="Tag de red: la regla de firewall se aplicará SOLO a VMs que tengan este tag. Es el vínculo lógico firewall↔VM."
              />
              <CodeLine
                line="  --image-family=debian-11 \"
                explanation="Familia de imagen del SO. ATENCIÓN: el lab puede pedir debian-12. Verifica la versión que aparece en tu enunciado."
              />
              <CodeLine
                line="  --image-project=debian-cloud \"
                explanation="Proyecto público de Google que contiene las imágenes de Debian. Siempre es 'debian-cloud' para imágenes oficiales Debian."
              />
              <CodeLine
                line="  --metadata=startup-script='#!/bin/bash"
                explanation="Inicia un script que se ejecutará automáticamente cuando la VM arranque por primera vez."
              />
              <CodeLine
                line="  apt-get update"
                explanation="Actualiza la lista de paquetes disponibles en el sistema operativo."
              />
              <CodeLine
                line="  apt-get install apache2 -y"
                explanation="Instala el servidor web Apache. El flag -y acepta automáticamente sin pedir confirmación."
              />
              <CodeLine
                line="  service apache2 restart"
                explanation="Reinicia Apache para asegurar que está corriendo después de la instalación."
              />
              <CodeLine
                line={'  echo "<h3>Web Server: web1</h3>" | tee /var/www/html/index.html\''}
                explanation="Escribe un HTML simple en la página por defecto de Apache. CAMBIA 'web1' por 'web2' o 'web3' en cada VM para identificarlas."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-yellow-light border border-yellow/30 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">No copies el bloque entero 3 veces.</strong>{" "}
                  Ejecuta el comando UNA vez, espera a que termine, luego edita el nombre
                  (<code>web2</code>, <code>web3</code>) y el texto del echo. Así detectas
                  errores antes de repetir.
                </p>
              </div>
            </div>

            <CommandBlock title="Crear la regla de firewall para HTTP">
              <CodeLine
                line="gcloud compute firewall-rules create www-firewall-network-lb \"
                explanation="Crea una regla de firewall con nombre 'www-firewall-network-lb'. Este nombre lo exige el lab — si lo cambias, no te dará puntos."
              />
              <CodeLine
                line="  --allow tcp:80 \"
                explanation="Permite tráfico TCP en puerto 80 (HTTP). Sin esto, nadie puede ver las páginas web de tus VMs."
              />
              <CodeLine
                line="  --target-tags network-lb-tag"
                explanation="La regla SOLO aplica a instancias con tag 'network-lb-tag'. Por eso pusiste ese tag en web1/web2/web3."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  Después de crear todo, corre{" "}
                  <code className="bg-black/10 px-1 rounded">
                    curl http://$(gcloud compute instances describe web1 --zone=$ZONE --format=&quot;get(networkInterfaces[0].accessConfigs[0].natIP)&quot;)
                  </code>{" "}
                  y deberías ver &quot;Web Server: web1&quot;.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 2 ════════════════ */}
          <TaskSection number={2} title="Configurar el Network Load Balancer (L4)">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  El NLB opera en capa 4 (TCP/UDP). Necesitas: IP estática → health check → target pool → forwarding rule.
                  El orden importa porque cada recurso depende del anterior.
                </p>
              </div>
            </div>

            <CommandBlock title="Paso 2.1 — Reservar una IP estática regional">
              <CodeLine
                line="gcloud compute addresses create network-lb-ip-1 \"
                explanation="Reserva una IP externa estática con nombre 'network-lb-ip-1'. Este nombre lo requiere el lab."
              />
              <CodeLine
                line="  --region=$REGION"
                explanation="La IP es regional porque el NLB es regional. Debe estar en la misma región que tus VMs."
              />
            </CommandBlock>

            <CommandBlock title="Paso 2.2 — Crear un health check HTTP legacy">
              <CodeLine
                line="gcloud compute http-health-checks create basic-check"
                explanation="Crea un health check HTTP legacy llamado 'basic-check'. Periódicamente verifica que el puerto 80 responde con HTTP 200. NOTA: esto usa la API legacy (http-health-checks), no la moderna (health-checks). Los target pools SOLO aceptan legacy."
              />
            </CommandBlock>

            <CommandBlock title="Paso 2.3 — Crear el target pool">
              <CodeLine
                line="gcloud compute target-pools create www-pool \"
                explanation="Crea un pool llamado 'www-pool'. Un target pool es un grupo de VMs que recibirá tráfico del NLB."
              />
              <CodeLine
                line="  --region=$REGION \"
                explanation="El pool es regional — debe coincidir con la región de tus instancias."
              />
              <CodeLine
                line="  --http-health-check basic-check"
                explanation="Asocia el health check al pool. Solo las VMs que pasen el check recibirán tráfico."
              />
            </CommandBlock>

            <CommandBlock title="Paso 2.4 — Agregar instancias al pool">
              <CodeLine
                line="gcloud compute target-pools add-instances www-pool \"
                explanation="Agrega instancias al pool existente 'www-pool'."
              />
              <CodeLine
                line="  --instances web1,web2,web3 \"
                explanation="Lista de instancias separadas por coma. Las 3 VMs serán backends del NLB."
              />
              <CodeLine
                line="  --zone=$ZONE"
                explanation="Zona donde viven las instancias. Deben estar en una zona dentro de la región del pool."
              />
            </CommandBlock>

            <CommandBlock title="Paso 2.5 — Crear la forwarding rule">
              <CodeLine
                line="gcloud compute forwarding-rules create www-rule \"
                explanation="Crea la regla de reenvío 'www-rule'. Esta es la 'puerta de entrada' del NLB: recibe tráfico y lo envía al pool."
              />
              <CodeLine
                line="  --region=$REGION \"
                explanation="Regla regional — coincide con la región del pool y la IP."
              />
              <CodeLine
                line="  --ports 80 \"
                explanation="Puerto donde escucha el NLB. El tráfico que llegue al puerto 80 se reenviará."
              />
              <CodeLine
                line="  --address network-lb-ip-1 \"
                explanation="Usa la IP estática que reservaste en el paso 2.1. Esta será la IP pública del NLB."
              />
              <CodeLine
                line="  --target-pool www-pool"
                explanation="El pool destino. El tráfico que entre por esta IP:80 se distribuirá entre las instancias del pool."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  Consulta la IP con{" "}
                  <code className="bg-black/10 px-1 rounded">
                    gcloud compute addresses describe network-lb-ip-1 --region=$REGION --format=&quot;get(address)&quot;
                  </code>{" "}
                  y luego haz <code className="bg-black/10 px-1 rounded">curl http://ESA_IP</code>.
                  Deberías ver el HTML de alguna de las 3 VMs.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 3 ════════════════ */}
          <TaskSection number={3} title="Crear el HTTP Load Balancer (L7)">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  El ALB (Application Load Balancer) opera en capa 7. La cadena de recursos es:
                  instance template → managed instance group → firewall para health checks →
                  IP global → health check → backend service → URL map → target HTTP proxy → forwarding rule global.
                </p>
              </div>
            </div>

            <CommandBlock title="Paso 3.1 — Crear el instance template">
              <CodeLine
                line="gcloud compute instance-templates create lb-backend-template \"
                explanation="Crea una plantilla reutilizable. Todas las VMs del MIG se crearán con esta configuración idéntica."
              />
              <CodeLine
                line="  --region=$REGION \"
                explanation="Región donde se almacena la plantilla."
              />
              <CodeLine
                line="  --network=default \"
                explanation="Red VPC donde vivirán las instancias. 'default' es la red que viene con todo proyecto de GCP."
              />
              <CodeLine
                line="  --subnet=default \"
                explanation="Subred dentro de la red default. Se autocrea por región."
              />
              <CodeLine
                line="  --tags=allow-health-check \"
                explanation="Tag que usaremos para la regla de firewall de health checks. Diferente al tag del NLB — son balanceadores distintos."
              />
              <CodeLine
                line="  --machine-type=e2-medium \"
                explanation="Tipo de máquina: 2 vCPU, 4 GB RAM. El lab pide e2-medium para el ALB (diferente del e2-small del NLB)."
              />
              <CodeLine
                line="  --image-family=debian-11 \"
                explanation="Imagen del SO. RECUERDA: verifica si tu lab pide debian-12. Ajusta según tu enunciado."
              />
              <CodeLine
                line="  --image-project=debian-cloud \"
                explanation="Proyecto público con imágenes Debian oficiales."
              />
              <CodeLine
                line="  --metadata=startup-script='#!/bin/bash"
                explanation="Script de inicio automático para cada instancia del MIG."
              />
              <CodeLine
                line="  apt-get update"
                explanation="Actualiza índice de paquetes."
              />
              <CodeLine
                line="  apt-get install -y apache2"
                explanation="Instala Apache con aceptación automática."
              />
              <CodeLine
                line="  a2ensite default-ssl"
                explanation="Habilita el sitio SSL por defecto de Apache (opcional pero presente en guías oficiales)."
              />
              <CodeLine
                line="  a2enmod ssl"
                explanation="Habilita el módulo SSL de Apache."
              />
              <CodeLine
                line='  vm_hostname="$(curl -H "Metadata-Flavor:Google" http://169.254.169.254/computeMetadata/v1/instance/name)"'
                explanation="Obtiene el nombre de la VM desde el metadata server interno de GCP. Cada instancia del MIG tendrá un nombre distinto."
              />
              <CodeLine
                line={'  echo "Page served from: $vm_hostname" | tee /var/www/html/index.html\''}
                explanation="Escribe en index.html el nombre de la instancia. Así cuando hagas curl verás CUÁL instancia respondió."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.2 — Crear el Managed Instance Group (MIG)">
              <CodeLine
                line="gcloud compute instance-groups managed create lb-backend-group \"
                explanation="Crea un MIG llamado 'lb-backend-group'. Google administrará las instancias automáticamente."
              />
              <CodeLine
                line="  --template=lb-backend-template \"
                explanation="Usa el template del paso anterior. Todas las VMs del grupo serán idénticas."
              />
              <CodeLine
                line="  --size=2 \"
                explanation="Arranca con 2 instancias. El lab puede pedir otro número — verifica."
              />
              <CodeLine
                line="  --zone=$ZONE"
                explanation="Zona donde se crearán las instancias del grupo."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.3 — Firewall para health checks de Google">
              <CodeLine
                line="gcloud compute firewall-rules create fw-allow-health-check \"
                explanation="Crea una regla de firewall llamada 'fw-allow-health-check'. Este nombre lo exige el lab."
              />
              <CodeLine
                line="  --network=default \"
                explanation="Aplica a la red 'default'."
              />
              <CodeLine
                line="  --action=allow \"
                explanation="Acción: permitir el tráfico que coincida con la regla."
              />
              <CodeLine
                line="  --direction=ingress \"
                explanation="Dirección: tráfico de entrada (desde fuera hacia las VMs)."
              />
              <CodeLine
                line="  --source-ranges=130.211.0.0/22,35.191.0.0/16 \"
                explanation="RANGOS FIJOS de Google para health checks. Estos son los IPs desde donde Google envía las verificaciones de salud. NO los cambies."
              />
              <CodeLine
                line="  --target-tags=allow-health-check \"
                explanation="Solo aplica a VMs con tag 'allow-health-check' (las del MIG del paso 3.1)."
              />
              <CodeLine
                line="  --rules=tcp:80"
                explanation="Permite TCP puerto 80. Los health checks verifican que Apache responda en ese puerto."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.4 — Reservar IP global para el ALB">
              <CodeLine
                line="gcloud compute addresses create lb-ipv4-1 \"
                explanation="Reserva una IP estática con nombre 'lb-ipv4-1'. Nombre requerido por el lab."
              />
              <CodeLine
                line="  --ip-version=IPV4 \"
                explanation="Versión de IP: IPv4. También existe IPv6 pero el lab usa v4."
              />
              <CodeLine
                line="  --global"
                explanation="IP GLOBAL (no regional como la del NLB). El ALB es global — una sola IP sirve tráfico mundial."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.5 — Crear health check moderno">
              <CodeLine
                line="gcloud compute health-checks create http http-basic-check \"
                explanation="Crea un health check MODERNO (no legacy) llamado 'http-basic-check'. Los backend services usan la API moderna."
              />
              <CodeLine
                line="  --port 80"
                explanation="Verifica el puerto 80. Enviará GET / cada pocos segundos y esperará HTTP 200."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.6 — Crear el backend service">
              <CodeLine
                line="gcloud compute backend-services create web-backend-service \"
                explanation="Crea un backend service: la abstracción que agrupa backends (MIGs) con health checks y políticas de balanceo."
              />
              <CodeLine
                line="  --protocol=HTTP \"
                explanation="Protocolo de comunicación con los backends. HTTP porque Apache sirve en texto plano."
              />
              <CodeLine
                line="  --port-name=http \"
                explanation="Nombre del puerto nombrado. Los MIGs mapean 'http' al puerto 80 por convención."
              />
              <CodeLine
                line="  --health-checks=http-basic-check \"
                explanation="Asocia el health check moderno. Solo backends sanos recibirán tráfico."
              />
              <CodeLine
                line="  --global"
                explanation="Backend service global — coincide con la IP global del ALB."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.7 — Vincular el MIG al backend service">
              <CodeLine
                line="gcloud compute backend-services add-backend web-backend-service \"
                explanation="Agrega un backend (tu MIG) al backend service existente."
              />
              <CodeLine
                line="  --instance-group=lb-backend-group \"
                explanation="El MIG que creaste en el paso 3.2."
              />
              <CodeLine
                line="  --instance-group-zone=$ZONE \"
                explanation="Zona del MIG. Debe coincidir con donde lo creaste."
              />
              <CodeLine
                line="  --global"
                explanation="Indica que el backend service es global."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.8 — Crear el URL map">
              <CodeLine
                line="gcloud compute url-maps create web-map-http \"
                explanation="Crea un URL map llamado 'web-map-http'. Define cómo se enrutan las peticiones HTTP a los backends."
              />
              <CodeLine
                line="  --default-service web-backend-service"
                explanation="Todo el tráfico va al backend service. En escenarios avanzados podrías rutar por path (/api → servicio A, / → servicio B)."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.9 — Crear el target HTTP proxy">
              <CodeLine
                line="gcloud compute target-http-proxies create http-lb-proxy \"
                explanation="Crea un proxy HTTP llamado 'http-lb-proxy'. Es el intermediario que recibe peticiones HTTP y las enruta según el URL map."
              />
              <CodeLine
                line="  --url-map web-map-http"
                explanation="Vincula el proxy al URL map del paso anterior. Proxy → URL map → backend service → MIG → VMs."
              />
            </CommandBlock>

            <CommandBlock title="Paso 3.10 — Crear la forwarding rule global">
              <CodeLine
                line="gcloud compute forwarding-rules create http-content-rule \"
                explanation="Crea la regla de reenvío global. Es la 'puerta de entrada' del ALB — donde el mundo se conecta."
              />
              <CodeLine
                line="  --address=lb-ipv4-1 \"
                explanation="Usa la IP global que reservaste en el paso 3.4."
              />
              <CodeLine
                line="  --global \"
                explanation="Regla global porque el ALB atiende tráfico de cualquier región del mundo."
              />
              <CodeLine
                line="  --target-http-proxy=http-lb-proxy \"
                explanation="Envía el tráfico al proxy HTTP del paso 3.9."
              />
              <CodeLine
                line="  --ports=80"
                explanation="Escucha en puerto 80. El tráfico HTTP que llegue a lb-ipv4-1:80 entrará al ALB."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  El ALB tarda 3-5 minutos en propagarse. Obtén la IP con{" "}
                  <code className="bg-black/10 px-1 rounded">
                    gcloud compute addresses describe lb-ipv4-1 --global --format=&quot;get(address)&quot;
                  </code>{" "}
                  y luego haz <code className="bg-black/10 px-1 rounded">curl http://ESA_IP</code>.
                  Verás &quot;Page served from: [nombre-instancia]&quot; rotando entre backends.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ RESUMEN VISUAL ════════════════ */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-azure" />
              <h2 className="text-xl font-bold text-foreground">
                Resumen de dependencias
              </h2>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-panel/50">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">
                    Network LB (L4) — Regional
                  </h3>
                  <div className="space-y-1 text-sm text-text-secondary font-mono">
                    <p>1. IP estática (regional)</p>
                    <p className="pl-4">↓</p>
                    <p>2. Health check (legacy)</p>
                    <p className="pl-4">↓</p>
                    <p>3. Target pool + instancias</p>
                    <p className="pl-4">↓</p>
                    <p>4. Forwarding rule → pool</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">
                    HTTP LB (L7) — Global
                  </h3>
                  <div className="space-y-1 text-sm text-text-secondary font-mono">
                    <p>1. Instance template</p>
                    <p className="pl-4">↓</p>
                    <p>2. MIG (usa template)</p>
                    <p className="pl-4">↓</p>
                    <p>3. Firewall + IP global + health check</p>
                    <p className="pl-4">↓</p>
                    <p>4. Backend service → MIG</p>
                    <p className="pl-4">↓</p>
                    <p>5. URL map → backend svc</p>
                    <p className="pl-4">↓</p>
                    <p>6. HTTP proxy → URL map</p>
                    <p className="pl-4">↓</p>
                    <p>7. Forwarding rule → proxy</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════ DISCLAIMER FINAL ════════════════ */}
          <section className="mb-10">
            <div className="p-6 rounded-2xl border-2 border-orange/40 bg-yellow-light/30">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <h3 className="text-base font-bold text-foreground">
                  Recordatorio final
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary list-disc pl-8">
                <li>
                  Si un comando falla con &quot;already exists&quot;, ya creaste ese recurso — sigue adelante.
                </li>
                <li>
                  Si falla con &quot;not found&quot;, revisa que el recurso previo (del que depende) sí existe.
                </li>
                <li>
                  Las <strong>imágenes de SO</strong> cambian: si <code>debian-11</code> ya no está disponible, prueba con <code>debian-12</code>.
                </li>
                <li>
                  Los <strong>nombres de recursos</strong> (IP, pool, template, MIG, URL map, proxy) deben ser EXACTAMENTE los que pide el lab o no obtendrás puntuación.
                </li>
                <li>
                  El ALB necesita <strong>3-5 minutos</strong> para propagarse. No entres en pánico si no responde inmediatamente.
                </li>
                <li>
                  Esta guía es un <strong>mapa</strong>, no un GPS. Tú conduces.
                </li>
              </ul>
            </div>
          </section>

          {/* Back link bottom */}
          <div className="pt-6 border-t border-border">
            <Link
              href="/labs/implement-load-balancing-on-compute-engine-challenge-lab"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-azure transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la guía del Challenge Lab
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
