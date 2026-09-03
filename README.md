# ☁️ CloudComputing (Next.js Course Platform & AI Tutor)

Plataforma educativa web e interactiva para el curso de **Cloud Computing y Google Cloud Platform (GCP)**. Integra lecciones multimedia, simuladores interactivos de arquitectura cloud, evaluaciones estructuradas y un **Tutor IA Flotante** conectado al backend RAG con analíticas avanzadas para el docente.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Estilos:** Tailwind CSS, Lucide Icons, Glassmorphism UI
- **Renderizado de Contenido:** `react-markdown` + `remark-gfm` (Soporte para tablas, código sintáctico y enlaces)
- **Exportación:** Generador de reportes en PDF integrados para Gemini Notebook LM.

---

## 🌟 Funcionalidades Destacadas

### 🤖 1. Tutor IA Flotante (`FloatingChatbot.tsx`)
- **Streaming SSE en Tiempo Real:** Visualización fluida de respuestas a medida que la IA las genera.
- **Insignia de Caché Semántica (⚡ Instantánea):** Notificación cuando una duda repetida es resuelta de forma inmediata sin latencia.
- **Sistema de Feedback (👍 / 👎):** Botones de valoración en cada mensaje para que los estudiantes califiquen las respuestas del tutor.
- **Modal de Lectura Ampliada & Exportación PDF:** Vista expansiva para toma de notas y exportación a PDF compatible con Gemini Notebook.

### 📊 2. Dashboard de Analíticas Docente (`/dashboard`)
- **Diseño Ejecutivo Claro (Light Mode):** Interfaz limpia en tonos azul marino profundo para facilitar la lectura.
- **Tarjetas de KPIs:** Total de consultas, tasa de satisfacción ($\% 	ext{ de } 	ext{👍}$), ratio de ahorro por Caché y latencia promedio.
- **Indicador de Satisfacción (Donut Gauge SVG):** Métrica gráfica de aprobación de las respuestas.
- **Mapa de Calor de Dudas por Unidad:** Gráfico de barras que identifica en qué Unidad Temática los estudiantes tienen más dificultades.
- **Franjas Horarias de Estudio:** Desglose de horas del día en que los alumnos estudian más (Mañana, Tarde, Noche, Madrugada).
- **Bitácora de Consultas Recientes:** Tabla interactiva con buscador y filtro por unidad temaria.

### 🔒 3. Sistema de Protección por Clave de Acceso (`CHAT_ACCESS_KEY`)
- Modal y almacenamiento persistente en `localStorage` para exigir la clave del curso antes de consumir peticiones del backend.

---

## 📂 Estructura del Proyecto

```
CloudComputing/
├── app/
│   ├── dashboard/page.tsx      # Vista del Dashboard de Analíticas Docente (Light Mode)
│   ├── components/
│   │   ├── FloatingChatbot.tsx # Chatbot Flotante con SSE streaming y feedback 👍/👎
│   │   ├── Navbar.tsx          # Barra de navegación con enlace a /dashboard
│   │   └── ...                 # Componentes interactivos del curso (Compute, Storage, IAM, etc.)
│   ├── lib/
│   │   └── api.ts              # Cliente API centralizado y funciones de comunicación con CloudBackend
│   └── page.tsx                # Página principal del curso
├── data/                       # Contenido estructurado de lecciones y laboratorios
└── README.md
```

---

## 🔧 Configuración para Desarrollo Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AcaCourses/CloudComputing.git
   cd CloudComputing
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar la URL del Backend en un archivo `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:10000
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
