# LubriBox — Sitio Web

Sitio web para **LubriBox Car Service**, lubricentro ubicado en Córdoba, Argentina. Permite a los clientes consultar precios de servicios según su vehículo y sacar turnos online.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework principal (App Router) |
| [React](https://react.dev/) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos |
| [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) | 2.4 | Almacenamiento de servicios y categorías |
| [iron-session](https://github.com/vvo/iron-session) | 8 | Sesiones seguras para el panel admin |
| [Lucide React](https://lucide.dev/) | 1.14 | Iconografía |
| [Vercel](https://vercel.com/) | — | Deploy y hosting |

---

## Estructura del proyecto

```
src/
├── app/                        # Rutas (Next.js App Router)
│   ├── page.tsx                # Landing / Home
│   ├── layout.tsx              # Layout global (Header, Footer, WhatsApp button)
│   ├── globals.css             # Estilos globales y animaciones
│   │
│   ├── servicios/
│   │   ├── page.tsx            # Servidor: carga servicios y categorías
│   │   └── ServiciosClient.tsx # Cliente: selector de auto + lista de precios
│   │
│   ├── turnos/
│   │   ├── page.tsx            # Servidor: carga servicios disponibles
│   │   └── TurnosClient.tsx    # Cliente: formulario de 3 pasos
│   │
│   ├── quienes-somos/
│   │   └── page.tsx            # Página institucional
│   │
│   ├── admin/
│   │   ├── page.tsx            # Login del panel administrativo
│   │   └── dashboard/
│   │       ├── page.tsx        # Servidor: verifica sesión y carga datos
│   │       └── DashboardClient.tsx  # Cliente: CRUD de servicios y categorías
│   │
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts  # POST: autenticación del admin
│       │   └── logout/route.ts # POST: cierre de sesión
│       ├── servicios/route.ts  # PUT: guarda servicios y categorías en Blob
│       └── precios/route.ts    # GET: API pública de precios
│
├── components/
│   ├── Header.tsx              # Navegación principal (responsive)
│   ├── Footer.tsx              # Footer con contacto, horarios y mapa
│   └── WhatsAppButton.tsx      # Botón flotante de WhatsApp
│
├── data/
│   ├── autos.ts                # Catálogo de marcas, modelos, años y litros de aceite
│   ├── servicios.ts            # Servicios por defecto, categorías, interfaces y helpers de precio
│   └── disponibilidad.ts       # Horarios y slots disponibles para turnos
│
└── lib/
    ├── servicios-store.ts      # Lectura/escritura en Vercel Blob (servicios + categorías)
    ├── session.ts              # Configuración de sesión con iron-session
    └── precios.ts              # Helpers de cálculo de precios
```

---

## Páginas

### `/` — Landing
Presenta el negocio con hero, strip de marcas, ventajas, servicios destacados con precios base, testimonios y CTA.

### `/servicios` — Servicios y Precios
El cliente selecciona marca, modelo y año de su vehículo. El sistema calcula el precio exacto de cada servicio en base a los litros de aceite del motor. Los servicios están organizados por categorías filtrables.

### `/turnos` — Sacar Turno
Formulario de 3 pasos:
1. Selección de vehículo y servicio
2. Elección de día y horario disponible
3. Datos de contacto

Al confirmar, se abre WhatsApp con un mensaje prearmado al número del lubricentro. También genera un link para agregar el turno a Google Calendar.

### `/quienes-somos` — Quiénes Somos
Página institucional con descripción del negocio y valores.

### `/admin` — Panel Administrativo
Login protegido por usuario y contraseña. Redirige al dashboard.

### `/admin/dashboard` — Dashboard
Panel de gestión que permite:
- **Categorías**: agregar y eliminar categorías de servicios
- **Servicios**: editar precios (auto y camioneta), agregar nuevos servicios y eliminar existentes
- Los cambios se guardan en **Vercel Blob** y se invalida el caché de las páginas públicas automáticamente

---

## Datos

Los datos del catálogo de autos (`src/data/autos.ts`) están hardcodeados e incluyen más de 200 modelos de 17 marcas con sus respectivos motores y capacidades de aceite verificadas para el mercado argentino.

Los servicios y categorías tienen **dos niveles de persistencia**:
1. **Por defecto** — definidos en `src/data/servicios.ts`, se usan si no hay datos en Blob
2. **Vercel Blob** — cuando el admin guarda cambios, se almacena un JSON en Blob que sobreescribe los valores por defecto en producción

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | Token de Vercel Blob para leer/escribir servicios |
| `SESSION_PASSWORD` | Clave de cifrado para las sesiones (mín. 32 caracteres) |
| `ADMIN_USERNAME` | Usuario del panel admin |
| `ADMIN_PASSWORD` | Contraseña del panel admin |

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

Para que el panel admin persista cambios localmente, se necesita el token de Vercel Blob. Sin él, los cambios se muestran en pantalla pero no se guardan (se usa el fallback hardcodeado).

---

## Deploy

El proyecto está desplegado en **Vercel**. Cada `git push` a `main` puede deployarse con:

```bash
vercel --prod
```
