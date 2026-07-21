import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Terminal,
  BookOpen,
  Shield,
  Info,
  ChevronRight,
  Code,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Challenge Lab: Set Up App Dev Environment | Cloud Computing",
  description:
    "Guía explicativa paso a paso del Challenge Lab: Set Up an App Dev Environment on Google Cloud (GSP315).",
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

function JsCodeLine({
  line,
  explanation,
}: {
  line: string;
  explanation: string;
}) {
  return (
    <div className="group">
      <div className="font-mono text-sm bg-gray-900 text-yellow-300 px-4 py-2 rounded-t-lg border border-border select-none pointer-events-none">
        {line}
      </div>
      <div className="px-4 py-2 bg-panel border border-t-0 border-border rounded-b-lg text-sm text-text-secondary">
        <span className="text-orange font-semibold">↳</span> {explanation}
      </div>
    </div>
  );
}

/* ───────────────────────────── page ─────────────────────────────── */

export default function SetUpDevChallengeLabAnswersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/labs/set-up-an-app-dev-environment-challenge-lab"
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
                GSP315
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Set Up an App Dev Environment on Google Cloud
            </h1>
            <p className="text-text-secondary text-lg">
              Guía explicativa comando por comando y línea por línea — NO para copiar y pegar.
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
                  periódicamente los runtimes, nombres de recursos y APIs.
                </li>
                <li>
                  <strong>NO copies y pegues bloques completos.</strong> Los
                  comandos y el código están fragmentados línea por línea a propósito para que
                  entiendas qué hace cada parte.
                </li>
                <li>
                  Usa esta guía como <strong>mapa mental</strong>: comprende el
                  orden de los recursos, las dependencias entre ellos y la lógica
                  de cada flag. Luego escribe TÚ los comandos en Cloud Shell.
                </li>
                <li>
                  Si un comando falla, <strong>lee el error</strong>. El 90% de
                  los problemas se resuelven ajustando región, nombre de bucket,
                  topic name o versión de runtime.
                </li>
                <li>
                  Los <strong>nombres de variables</strong> (BUCKET_NAME, TOPIC_NAME, FUNCTION_NAME, USERNAME_2)
                  son placeholders — reemplázalos con los valores exactos de TU panel de lab.
                </li>
                <li>
                  El objetivo pedagógico es que <strong>domines el proceso</strong>,
                  no que obtengas un badge sin aprender.
                </li>
              </ul>
            </div>
          </div>

          {/* ════════════════ ENCABEZADO Y VARIABLES ════════════════ */}
          <TaskSection number={0} title="Encabezado del script y variables">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Antes de cualquier tarea, defines las variables que vienen del enunciado del lab.
                  Cada sesión de GSP315 te asigna valores únicos — copia los tuyos del panel superior.
                </p>
              </div>
            </div>

            <CommandBlock title="Shebang y declaración de variables">
              <CodeLine
                line="#!/bin/bash"
                explanation="Shebang: indica que el archivo se ejecuta con el intérprete bash. Es la línea estándar para scripts en Cloud Shell o Linux."
              />
              <CodeLine
                line='REGION="REGION"'
                explanation="Variable para la región. Reemplaza REGION por el valor que aparece en tu panel (ej: us-central1). Si la cambias, el scoring fallará."
              />
              <CodeLine
                line='ZONE="ZONE"'
                explanation="Variable para la zona. Reemplaza ZONE por el valor del panel (ej: us-central1-a). Debe ser una zona dentro de tu REGION."
              />
              <CodeLine
                line='BUCKET_NAME="Bucket Name"'
                explanation="Nombre exacto del bucket que el lab te pide. Cópialo TAL CUAL del panel — mayúsculas, minúsculas y guiones incluidos."
              />
              <CodeLine
                line='TOPIC_NAME="Topic Name"'
                explanation="Nombre exacto del topic de Pub/Sub. Si lo escribes diferente, el scoring lo marcará como incorrecto."
              />
              <CodeLine
                line='FUNCTION_NAME="Cloud Run Function Name"'
                explanation="Nombre exacto de la Cloud Run Function. Este mismo nombre se usará como entry point en el código Node.js."
              />
              <CodeLine
                line='USERNAME_2="USERNAME_2"'
                explanation="Correo del 'previous cloud engineer' con rol Viewer que debes remover en Task 4. Lo encuentras en el panel del lab."
              />
            </CommandBlock>

            <CommandBlock title="Obtener el Project ID">
              <CodeLine
                line="PROJECT_ID=$(gcloud config get-value project)"
                explanation="Ejecuta gcloud para obtener el ID del proyecto actual (el temporal que Qwiklabs asignó). Lo usarás en el trigger y en la operación de IAM."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">¿Por qué variables?</strong>{" "}
                  Porque los valores cambian en cada sesión de lab. Si hardcodeas
                  &quot;qwiklabs-gcp-abc123&quot; y tu proyecto es otro, todo falla.
                  Las variables te dan flexibilidad y previenen typos.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 1 ════════════════ */}
          <TaskSection number={1} title="Crear el bucket en la región indicada">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  El bucket será el origen y destino de la función de thumbnails.
                  Su nombre exacto y ubicación son parte de la evaluación automática.
                </p>
              </div>
            </div>

            <CommandBlock title="Crear el bucket con gcloud storage">
              <CodeLine
                line='gcloud storage buckets create gs://"$BUCKET_NAME" \'
                explanation="Comando para crear un bucket. 'gcloud storage buckets create' es la CLI moderna de Cloud Storage. gs://BUCKET_NAME define la URI del bucket."
              />
              <CodeLine
                line='  --location="$REGION"'
                explanation="--location indica la región física donde se almacenarán los datos. Debe coincidir exactamente con la REGION de tu panel para pasar el scoring."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  Corre <code className="bg-black/10 px-1 rounded">gcloud storage buckets describe gs://$BUCKET_NAME</code>{" "}
                  y confirma que <code>location</code> muestra tu región. Haz click en &quot;Check my progress&quot; inmediatamente.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 2 ════════════════ */}
          <TaskSection number={2} title="Crear el Pub/Sub topic">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  El topic se usa para publicar un mensaje de notificación cada vez que
                  la función genera un thumbnail exitosamente. La función escribe en este topic.
                </p>
              </div>
            </div>

            <CommandBlock title="Crear el topic">
              <CodeLine
                line='gcloud pubsub topics create "$TOPIC_NAME"'
                explanation="Crea un tema de Pub/Sub con el nombre exacto del panel. El scoring solo verifica que el topic exista con ese nombre — no necesitas crear subscripciones."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-yellow-light border border-yellow/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Importante:</strong>{" "}
                  En el código de <code>index.js</code> más adelante, el valor de <code>topicName</code>{" "}
                  debe ser EXACTAMENTE el mismo string que usaste aquí (solo el ID plano, sin <code>projects/...</code>).
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 3 ════════════════ */}
          <TaskSection number={3} title="Crear la Cloud Run Function (thumbnail)">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Esta es la tarea más compleja. Necesitas: crear directorio → escribir index.js → escribir package.json → desplegar la función.
                  La función se dispara cuando subes una imagen al bucket y genera un thumbnail de 64×64.
                </p>
              </div>
            </div>

            <CommandBlock title="Paso 3.1 — Crear directorio de trabajo">
              <CodeLine
                line="mkdir -p thumbnails-func"
                explanation="Crea un directorio llamado 'thumbnails-func'. El flag -p evita error si ya existe. Aquí vivirán index.js y package.json."
              />
              <CodeLine
                line="cd thumbnails-func"
                explanation="Entra al directorio. Los archivos que crees a continuación se guardarán aquí."
              />
            </CommandBlock>

            {/* ─── index.js ─── */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-orange" />
                Paso 3.2 — Escribir index.js (línea por línea)
              </h3>
              <div className="p-4 rounded-xl bg-orange/5 border border-orange/20 mb-4">
                <p className="text-sm text-text-secondary">
                  El archivo se crea con <code>cat &gt; index.js &lt;&lt;&apos;EOF&apos;</code> (here-document).
                  A continuación se explica cada línea del código JavaScript:
                </p>
              </div>
              <div className="space-y-3">
                <JsCodeLine
                  line="const functions = require('@google-cloud/functions-framework');"
                  explanation="Importa el framework de Cloud Run Functions. Este paquete permite registrar handlers para eventos HTTP o CloudEvents."
                />
                <JsCodeLine
                  line="const { Storage } = require('@google-cloud/storage');"
                  explanation="Importa el cliente de Cloud Storage. Lo usarás para descargar la imagen original y guardar el thumbnail."
                />
                <JsCodeLine
                  line="const { PubSub } = require('@google-cloud/pubsub');"
                  explanation="Importa el cliente de Pub/Sub. Una vez generado el thumbnail, publicarás un mensaje de notificación."
                />
                <JsCodeLine
                  line="const sharp = require('sharp');"
                  explanation="Importa la librería 'sharp' para manipulación de imágenes. Es la que hace el resize a 64×64."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="functions.cloudEvent('FUNCTION_NAME', async cloudEvent => {"
                  explanation="Registra un handler para CloudEvents. REEMPLAZA 'FUNCTION_NAME' con el nombre exacto de tu función del panel. Este string ES el entry point."
                />
                <JsCodeLine
                  line="  const event = cloudEvent.data;"
                  explanation="Extrae el payload del evento. Contiene campos como 'name' (archivo), 'bucket' (bucket origen), etc."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="  console.log(`Event: ${JSON.stringify(event)}`);"
                  explanation="Logea el evento completo. Útil para debugging en Cloud Functions logs si algo falla."
                />
                <JsCodeLine
                  line="  console.log(`Hello ${event.bucket}`);"
                  explanation="Imprime el nombre del bucket. Confirma que el trigger está apuntando al bucket correcto."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="  const fileName = event.name;"
                  explanation="Nombre del archivo que se acaba de subir al bucket (ej: 'foto.jpg')."
                />
                <JsCodeLine
                  line="  const bucketName = event.bucket;"
                  explanation="Nombre del bucket donde ocurrió el evento. Debería coincidir con tu BUCKET_NAME."
                />
                <JsCodeLine
                  line='  const size = "64x64";'
                  explanation="Dimensión del thumbnail. El lab pide exactamente 64×64 píxeles."
                />
                <JsCodeLine
                  line="  const bucket = new Storage().bucket(bucketName);"
                  explanation="Crea un objeto que representa el bucket para interactuar con la API de Storage."
                />
                <JsCodeLine
                  line='  const topicName = "TOPIC_NAME";'
                  explanation="REEMPLAZA 'TOPIC_NAME' con el nombre exacto del topic del panel. Solo el ID plano, sin 'projects/...'."
                />
                <JsCodeLine
                  line="  const pubsub = new PubSub();"
                  explanation="Crea un cliente de Pub/Sub para publicar mensajes cuando el thumbnail se genere."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line='  if (fileName.search("64x64_thumbnail") === -1) {'
                  explanation="Verifica si el archivo NO es ya un thumbnail. Si el nombre contiene '64x64_thumbnail', se ignora para evitar un loop infinito."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="    const filename_split = fileName.split('.');"
                  explanation="Divide el nombre del archivo por puntos. Ej: 'foto.jpg' → ['foto', 'jpg']."
                />
                <JsCodeLine
                  line="    const filename_ext = filename_split[filename_split.length - 1].toLowerCase();"
                  explanation="Toma la última parte como extensión y la convierte a minúsculas. Resultado: 'jpg', 'png', etc."
                />
                <JsCodeLine
                  line="    const filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length - 1);"
                  explanation="Extrae el nombre sin extensión ni el punto. Ej: 'foto.jpg' → 'foto'. El -1 extra remueve el punto."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="    if (filename_ext === 'png' || filename_ext === 'jpg' || filename_ext === 'jpeg') {"
                  explanation="Solo procesa imágenes PNG, JPG o JPEG. Cualquier otro formato se ignora con un log."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="      const gcsObject = bucket.file(fileName);"
                  explanation="Representa el archivo original en el bucket para poder descargarlo."
                />
                <JsCodeLine
                  line="      const newFilename = `${filename_without_ext}_64x64_thumbnail.${filename_ext}`;"
                  explanation="Construye el nombre del thumbnail: 'foto_64x64_thumbnail.jpg'. El scoring verifica que este archivo exista."
                />
                <JsCodeLine
                  line="      const gcsNewObject = bucket.file(newFilename);"
                  explanation="Representa el archivo de thumbnail que se va a crear en el mismo bucket."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="      const [buffer] = await gcsObject.download();"
                  explanation="Descarga el archivo original a memoria como un Buffer. Es la imagen en bruto."
                />
                <JsCodeLine
                  line="      const resizedBuffer = await sharp(buffer)"
                  explanation="Pasa el buffer a sharp para iniciar la cadena de transformación de imagen."
                />
                <JsCodeLine
                  line="        .resize(64, 64, { fit: 'inside', withoutEnlargement: true })"
                  explanation="Redimensiona a máximo 64×64. 'inside' mantiene proporción; 'withoutEnlargement' no agranda imágenes pequeñas."
                />
                <JsCodeLine
                  line="        .toFormat(filename_ext)"
                  explanation="Mantiene el formato original (png o jpg). No convierte entre formatos."
                />
                <JsCodeLine
                  line="        .toBuffer();"
                  explanation="Genera el buffer final de la imagen redimensionada, listo para guardar."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="      await gcsNewObject.save(resizedBuffer, {"
                  explanation="Sube el buffer redimensionado al bucket como nuevo archivo."
                />
                <JsCodeLine
                  line="        metadata: { contentType: `image/${filename_ext}` },"
                  explanation="Establece el Content-Type correcto (image/png o image/jpeg) para que los navegadores lo interpreten bien."
                />
                <JsCodeLine
                  line="      });"
                  explanation="Cierra la llamada a save(). El thumbnail ya está en el bucket."
                />

                <div className="my-4 border-t border-border" />

                <JsCodeLine
                  line="      await pubsub.topic(topicName).publishMessage({ data: Buffer.from(newFilename) });"
                  explanation="Publica un mensaje en el topic con el nombre del thumbnail generado. Esto es lo que el lab valida como 'notificación exitosa'."
                />
                <JsCodeLine
                  line="      console.log(`Message published to ${topicName}`);"
                  explanation="Confirma en logs que el mensaje se publicó. Útil para verificar en Cloud Functions Logs."
                />
              </div>
            </div>

            {/* ─── package.json ─── */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-orange" />
                Paso 3.3 — Escribir package.json
              </h3>
              <div className="p-4 rounded-xl bg-orange/5 border border-orange/20 mb-4">
                <p className="text-sm text-text-secondary">
                  Define las dependencias del proyecto Node.js. Se crea con <code>cat &gt; package.json &lt;&lt;&apos;EOF&apos;</code>.
                  No modifiques las versiones — son las que el lab espera.
                </p>
              </div>
              <div className="space-y-3">
                <JsCodeLine
                  line='"name": "thumbnails"'
                  explanation="Nombre del paquete Node.js. Puede ser cualquier string válido, pero mantén este por consistencia."
                />
                <JsCodeLine
                  line='"version": "1.0.0"'
                  explanation="Versión semántica del proyecto. No afecta el scoring."
                />
                <JsCodeLine
                  line='"description": "Create Thumbnail of uploaded image"'
                  explanation="Descripción legible. Documenta el propósito de la función."
                />
                <JsCodeLine
                  line='"scripts": { "start": "node index.js" }'
                  explanation="Define que 'npm start' ejecuta index.js. Lo usa el runtime de Cloud Functions internamente."
                />
                <JsCodeLine
                  line='"@google-cloud/functions-framework": "^3.0.0"'
                  explanation="Framework que registra y ejecuta tu handler de CloudEvents. Requerido para funciones gen2."
                />
                <JsCodeLine
                  line='"@google-cloud/pubsub": "^2.0.0"'
                  explanation="Cliente de Pub/Sub para publicar mensajes desde la función."
                />
                <JsCodeLine
                  line='"@google-cloud/storage": "^6.11.0"'
                  explanation="Cliente de Cloud Storage para descargar/subir archivos al bucket."
                />
                <JsCodeLine
                  line='"sharp": "^0.32.1"'
                  explanation="Librería de manipulación de imágenes. Hace el resize a 64×64. Versión compatible con el runtime."
                />
                <JsCodeLine
                  line='"engines": { "node": ">=4.3.2" }'
                  explanation="Versión mínima de Node.js requerida. En la práctica tu runtime será Node.js 22 (lo defines al desplegar)."
                />
              </div>
            </div>

            {/* ─── deploy ─── */}
            <CommandBlock title="Paso 3.4 — Desplegar la Cloud Run Function">
              <CodeLine
                line='gcloud functions deploy "$FUNCTION_NAME" \'
                explanation="Despliega la función con el nombre exacto del panel. Este nombre DEBE coincidir con el entry point en functions.cloudEvent(...)."
              />
              <CodeLine
                line="  --gen2 \"
                explanation="Indica que es una función de segunda generación (basada en Cloud Run). El lab lo exige explícitamente."
              />
              <CodeLine
                line='  --runtime=nodejs22 \'
                explanation="Runtime Node.js 22. El lab especifica esta versión — si usas otra puede fallar el scoring."
              />
              <CodeLine
                line='  --region="$REGION" \'
                explanation="Región de despliegue. Debe coincidir con la región del panel del lab."
              />
              <CodeLine
                line="  --source=. \"
                explanation="Usa el directorio actual (thumbnails-func/) como código fuente. Ahí están tu index.js y package.json."
              />
              <CodeLine
                line='  --entry-point="$FUNCTION_NAME" \'
                explanation="El entry point: nombre de la función registrada en functions.cloudEvent('NOMBRE', ...). Debe ser IDÉNTICO al primer argumento de esa llamada."
              />
              <CodeLine
                line="  --trigger-event=google.cloud.storage.object.v1.finalized \"
                explanation="Tipo de evento que dispara la función: 'object finalized' = cuando se termina de subir un archivo al bucket."
              />
              <CodeLine
                line='  --trigger-resource="projects/$PROJECT_ID/buckets/$BUCKET_NAME"'
                explanation="Recurso específico que genera el evento: tu bucket del Task 1. Solo archivos subidos A ESTE bucket dispararán la función."
              />
            </CommandBlock>

            <CodeLine
              line="cd .."
              explanation="Vuelve al directorio padre. No te quedes 'atrapado' en thumbnails-func/ para el siguiente task."
            />

            <div className="p-4 rounded-xl bg-yellow-light border border-yellow/30 mt-6 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <div className="text-sm text-text-secondary space-y-2">
                  <p>
                    <strong className="text-foreground">Errores comunes en Task 3:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Eventarc permissions error:</strong> Espera 2-3 minutos y reintenta. Los service agents tardan en propagarse.
                    </li>
                    <li>
                      <strong>Entry point not found:</strong> El string en <code>functions.cloudEvent(&apos;X&apos;, ...)</code> debe ser EXACTAMENTE igual al <code>--entry-point</code>.
                    </li>
                    <li>
                      <strong>Thumbnail no se genera:</strong> Verifica en logs (<code>gcloud functions logs read</code>) si hay errores de permisos o de sharp.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  Sube una imagen de prueba con{" "}
                  <code className="bg-black/10 px-1 rounded">gcloud storage cp foto.jpg gs://$BUCKET_NAME/</code>.
                  Espera ~30 segundos y verifica que aparezca <code>foto_64x64_thumbnail.jpg</code> en el bucket.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ TASK 4 ════════════════ */}
          <TaskSection number={4} title="Remover al previous cloud engineer (Viewer)">
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Esta tarea valida gobernanza IAM: eliminar accesos heredados e innecesarios.
                  El &quot;previous cloud engineer&quot; tiene rol Viewer y ya no debería tener acceso al proyecto.
                </p>
              </div>
            </div>

            <CommandBlock title="Remover el binding IAM">
              <CodeLine
                line='gcloud projects remove-iam-policy-binding "$PROJECT_ID" \'
                explanation="Comando para quitar un binding de la política IAM del proyecto. No borra al usuario de Google — solo le quita el permiso en ESTE proyecto."
              />
              <CodeLine
                line='  --member="user:$USERNAME_2" \'
                explanation="Identifica al miembro: el correo del cloud engineer anterior. Debe coincidir EXACTAMENTE con 'Username 2' del panel del lab."
              />
              <CodeLine
                line='  --role="roles/viewer"'
                explanation="El rol que se elimina. 'roles/viewer' da acceso de solo lectura a todos los recursos del proyecto. El lab pide removerlo."
              />
            </CommandBlock>

            <div className="p-4 rounded-xl bg-yellow-light border border-yellow/30 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Cuidado:</strong>{" "}
                  NUNCA remuevas tu propia cuenta (Username 1 / Owner). Si lo haces,
                  perderás acceso al proyecto y tendrás que reiniciar el lab completo.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green/5 border border-green/20">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  <strong className="text-foreground">Verificación:</strong>{" "}
                  Corre <code className="bg-black/10 px-1 rounded">gcloud projects get-iam-policy $PROJECT_ID</code>{" "}
                  y confirma que USERNAME_2 ya no aparece con <code>roles/viewer</code>.
                  Alternativa: en la consola web → IAM &amp; Admin → IAM, verifica que la fila desapareció.
                </p>
              </div>
            </div>
          </TaskSection>

          {/* ════════════════ RESUMEN VISUAL ════════════════ */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-azure" />
              <h2 className="text-xl font-bold text-foreground">
                Resumen de dependencias entre tasks
              </h2>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-panel/50">
              <div className="space-y-2 text-sm text-text-secondary font-mono">
                <p className="font-bold text-foreground text-base font-sans mb-3">Orden obligatorio:</p>
                <p>1. <span className="text-azure">Variables</span> → defines REGION, ZONE, BUCKET, TOPIC, FUNCTION, USERNAME_2</p>
                <p className="pl-6">↓</p>
                <p>2. <span className="text-green">Task 1: Bucket</span> → se crea primero porque la función lo necesita como trigger</p>
                <p className="pl-6">↓</p>
                <p>3. <span className="text-green">Task 2: Topic</span> → se crea antes de la función porque el código publica ahí</p>
                <p className="pl-6">↓</p>
                <p>4. <span className="text-orange">Task 3: Function</span> → depende de bucket (trigger) y topic (publish)</p>
                <p className="pl-6">↓</p>
                <p>5. <span className="text-red">Task 4: IAM</span> → independiente, pero se hace al final para no interferir con permisos</p>
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
                  El <strong>entry point</strong> en el deploy y en <code>functions.cloudEvent(&apos;NOMBRE&apos;, ...)</code> deben ser el MISMO string.
                </li>
                <li>
                  <code>topicName</code> en index.js debe ser solo el ID (ej: <code>my-topic</code>), NO la ruta completa <code>projects/PROJECT/topics/my-topic</code>.
                </li>
                <li>
                  Si el trigger falla con error de Eventarc, espera 2-3 minutos — los service agents necesitan propagarse.
                </li>
                <li>
                  Las <strong>imágenes de prueba</strong> deben ser PNG o JPG reales. Un .txt renombrado a .jpg no funcionará.
                </li>
                <li>
                  El <strong>runtime</strong> puede cambiar: si <code>nodejs22</code> no está disponible, prueba con <code>nodejs20</code>.
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
              href="/labs/set-up-an-app-dev-environment-challenge-lab"
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
