# IntermodalFlow — Guía de Desarrollo
## Aplicación Web Logística con Angular 22 + Bootstrap 5

> **¿Para quién es esta guía?**  
> Para desarrolladores que están comenzando con Angular. Cada comando y cada línea de código se explica para que entiendas *qué hace* y *por qué*.

---

## ¿Qué vamos a construir?

Una plataforma logística llamada **IntermodalFlow** con tres áreas:

| Área | Ruta | Descripción |
|------|------|-------------|
| Pública | `/home`, `/catalogo-servicios`, etc. | Visible para cualquier visitante |
| Cliente | `/cliente/dashboard`, etc. | Acceso con login |
| Administrador | `/admin/dashboard`, etc. | Panel de gestión |

---

## Estructura final del proyecto

```
src/
└── app/
    ├── core/
    │   ├── models/         ← Interfaces TypeScript (tipos de datos)
    │   └── services/       ← Servicios (lógica de negocio)
    ├── shared/
    │   ├── navbar-public/  ← Navbar de la zona pública
    │   ├── navbar-app/     ← Navbar de zonas privadas
    │   ├── sidebar-client/ ← Menú lateral del cliente
    │   └── sidebar-admin/  ← Menú lateral del admin
    ├── public/             ← Páginas públicas
    ├── client/             ← Páginas del cliente
    └── admin/              ← Páginas del administrador
```

---

---

# PARTE 1
# Instalación del entorno y creación del proyecto

**Responsable:** Participante 1  
**Objetivo:** Dejar el proyecto listo para que los demás participantes puedan trabajar.

---

## Paso 1.1 — Verificar Node.js

Abre la terminal de VSCode (`Ctrl + Ñ` en Windows) y ejecuta:

```bash
node --version
```

Debes ver algo como `v22.x.x`. Si no tienes Node.js instalado, descárgalo de [https://nodejs.org](https://nodejs.org) (versión LTS).

---

## Paso 1.2 — Instalar Angular CLI

Angular CLI es la herramienta de línea de comandos que nos permite crear proyectos, componentes y más.

```bash
npm install -g @angular/cli
```

Verifica que se instaló:

```bash
ng version
```

---

## Paso 1.3 — Crear el proyecto Angular

```bash
ng new web_app_logistico --style=css --ssr=false
```

Cuando pregunte:
- `? Which stylesheet format would you like to use?` → selecciona **CSS**
- `? Do you want to enable Server-Side Rendering (SSR)?` → escribe **N** y presiona Enter

Luego entra a la carpeta del proyecto:

```bash
cd web_app_logistico
```

Abre el proyecto en VSCode:

```bash
code .
```

---

## Paso 1.4 — Instalar extensiones recomendadas en VSCode

En VSCode, instala estas extensiones (búscalas en el panel de extensiones `Ctrl+Shift+X`):

- **Angular Language Service** — resalta errores en templates HTML de Angular
- **Prettier - Code formatter** — da formato automático al código

---

## Paso 1.5 — Instalar Bootstrap 5 y Bootstrap Icons

Bootstrap es el framework CSS que usamos para el diseño visual.

```bash
npm install bootstrap bootstrap-icons
```

---

## Paso 1.6 — Configurar angular.json

Abre el archivo `angular.json` y busca la sección `"styles"` y `"scripts"`. Reemplaza **todo el contenido** del archivo con lo siguiente:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm"
  },
  "newProjectRoot": "projects",
  "projects": {
    "web_app_logistico": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "css",
          "skipTests": true,
          "type": ""
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/bootstrap-icons/font/bootstrap-icons.css",
              "src/styles.css"
            ],
            "scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "web_app_logistico:build:production"
            },
            "development": {
              "buildTarget": "web_app_logistico:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
```

> **¿Por qué modificamos angular.json?**  
> - `"styles"` carga Bootstrap CSS globalmente en toda la app.  
> - `"scripts"` carga el JavaScript de Bootstrap (necesario para menús, modales, etc.).  
> - `"schematics"` con `"type": ""` hace que los componentes generados se llamen `layout.ts` en lugar de `layout.component.ts` — la convención moderna de Angular.

---

## Paso 1.7 — Agregar estilos globales personalizados

Abre `src/styles.css` y reemplaza su contenido:

```css
/* src/styles.css */
:root {
  --if-primary: #1c3557;
  --if-primary-dark: #142845;
}

.bg-if-primary        { background-color: var(--if-primary) !important; }
.text-if-primary      { color: var(--if-primary) !important; }
.border-if-primary    { border-color: var(--if-primary) !important; }

.btn-if-primary {
  background-color: var(--if-primary);
  border-color: var(--if-primary);
  color: #fff;
}
.btn-if-primary:hover,
.btn-if-primary:focus {
  background-color: var(--if-primary-dark);
  border-color: var(--if-primary-dark);
  color: #fff;
}
```

> **¿Qué son estas clases?**  
> Bootstrap ya trae `.bg-primary`, `.text-primary`, etc. Nosotros creamos `.bg-if-primary` ("if" = IntermodalFlow) con el color corporativo azul marino de nuestra empresa. Así podemos usarlas en cualquier componente sin repetir el color.

---

## Paso 1.8 — Crear la estructura de carpetas

Ejecuta estos comandos en la terminal para crear las carpetas:

```bash
mkdir src\app\core
mkdir src\app\core\models
mkdir src\app\core\services
mkdir src\app\shared
mkdir src\app\public
mkdir src\app\client
mkdir src\app\admin
```

---

## Paso 1.9 — Verificar que la app inicia

```bash
ng serve -o
```

Deberías ver la página de bienvenida de Angular en el navegador. Con `Ctrl+C` en la terminal la detienes.

---

**✅ Entrega de la Parte 1:**  
El proyecto debe compilar con `ng serve -o`, mostrar la pantalla de Angular y tener la estructura de carpetas creada.

---

---

# PARTE 2
# Rutas, Modelos, Servicios y Componente Raíz

**Responsable:** Participante 2  
**Requiere:** Haber completado la Parte 1.  
**Objetivo:** Crear los tipos de datos (modelos), la lógica de datos (servicios) y configurar la navegación entre páginas (rutas).

---

## Concepto clave: ¿Qué es un componente standalone?

En Angular moderno (v17+), cada componente es **standalone** (autónomo). Eso significa que el componente declara directamente qué necesita en su `imports[]`, sin depender de un módulo externo.

```typescript
@Component({
  selector: 'app-home',   // ← nombre del tag HTML personalizado
  standalone: true,        // ← es autónomo (valor por defecto en Angular 22)
  imports: [RouterLink],   // ← qué directivas/componentes usa este componente
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
```

---

## Paso 2.1 — Crear los modelos de datos

Los modelos son **interfaces TypeScript** que definen la forma de los datos. Es como un contrato: "un Despacho SIEMPRE tendrá estas propiedades".

**Crea el archivo** `src/app/core/models/despacho.model.ts`:

```typescript
// src/app/core/models/despacho.model.ts
export interface Despacho {
  codigo: string;
  ruta: string;
  estado: 'En tránsito' | 'En almacén' | 'Cargando' | 'Entregado';
}
```

**Crea el archivo** `src/app/core/models/incidencia.model.ts`:

```typescript
// src/app/core/models/incidencia.model.ts
export interface Incidencia {
  codigo: string;
  despachoRelacionado: string;
  tipo: 'Retraso' | 'Daño en carga' | 'Documentación' | 'Otro';
  descripcion: string;
  estado: 'Abierta' | 'En proceso' | 'Resuelta';
}
```

**Crea el archivo** `src/app/core/models/alerta.model.ts`:

```typescript
// src/app/core/models/alerta.model.ts
export interface Alerta {
  mensaje: string;
  tipo: 'warning' | 'info' | 'success';
  fecha: string;
}
```

---

## Paso 2.2 — Crear los servicios

Los servicios son clases que contienen **lógica de negocio y datos**. Un servicio con `providedIn: 'root'` existe como una sola instancia en toda la aplicación (patrón Singleton).

**Crea el archivo** `src/app/core/services/despachos.ts`:

```typescript
// src/app/core/services/despachos.ts
import { Injectable } from '@angular/core';
import { Despacho } from '../models/despacho.model';

@Injectable({
  providedIn: 'root'   // ← disponible en toda la app sin importarlo manualmente
})
export class DespachosService {

  private despachos: Despacho[] = [
    { codigo: 'DSP-1001', ruta: 'Lima → Arequipa',   estado: 'En tránsito' },
    { codigo: 'DSP-1002', ruta: 'Callao → Trujillo', estado: 'En almacén'  },
    { codigo: 'DSP-1003', ruta: 'Lima → Cusco',       estado: 'Cargando'    }
  ];

  obtenerTodos(): Despacho[] {
    return this.despachos;
  }

  obtenerActivos(): Despacho[] {
    return this.despachos.filter(d => d.estado !== 'Entregado');
  }
}
```

**Crea el archivo** `src/app/core/services/auth.ts`:

```typescript
// src/app/core/services/auth.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {}
```

**Crea el archivo** `src/app/core/services/incidencias.ts`:

```typescript
// src/app/core/services/incidencias.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Incidencias {}
```

---

## Paso 2.3 — Generar todos los componentes

Ahora vamos a generar la estructura de todos los componentes con `ng generate`. El comando crea automáticamente los archivos `.ts`, `.html` y `.css`.

**Componentes compartidos:**
```bash
ng generate component shared/navbar-public
ng generate component shared/navbar-app
ng generate component shared/sidebar-client
ng generate component shared/sidebar-admin
```

**Layouts (estructuras de página):**
```bash
ng generate component public/layout
ng generate component client/layout
ng generate component admin/layout
```

**Páginas públicas:**
```bash
ng generate component public/home
ng generate component public/catalogo-servicios
ng generate component public/catalogo-rutas
ng generate component public/simulador-cotizacion
```

**Páginas del cliente:**
```bash
ng generate component client/login
ng generate component client/dashboard
ng generate component client/despachos
ng generate component client/seguimiento
ng generate component client/historial
ng generate component client/incidencias
ng generate component client/centro-alertas
```

**Páginas del administrador:**
```bash
ng generate component admin/dashboard-admin
ng generate component admin/gestion-despachos
ng generate component admin/gestion-contenedores
ng generate component admin/gestion-incidencias
```

---

## Paso 2.4 — Configurar las rutas (app.routes.ts)

Las rutas le dicen a Angular qué componente mostrar según la URL del navegador. Reemplaza el contenido de `src/app/app.routes.ts`:

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { Layout as PublicLayout }   from './public/layout/layout';
import { Home }                     from './public/home/home';
import { CatalogoServicios }        from './public/catalogo-servicios/catalogo-servicios';
import { CatalogoRutas }            from './public/catalogo-rutas/catalogo-rutas';
import { SimuladorCotizacion }      from './public/simulador-cotizacion/simulador-cotizacion';

import { Login }                    from './client/login/login';
import { Layout as ClientLayout }   from './client/layout/layout';
import { Dashboard }                from './client/dashboard/dashboard';
import { Despachos }                from './client/despachos/despachos';
import { Seguimiento }              from './client/seguimiento/seguimiento';
import { Historial }                from './client/historial/historial';
import { Incidencias }              from './client/incidencias/incidencias';
import { CentroAlertas }            from './client/centro-alertas/centro-alertas';

import { Layout as AdminLayout }    from './admin/layout/layout';
import { DashboardAdmin }           from './admin/dashboard-admin/dashboard-admin';
import { GestionDespachos }         from './admin/gestion-despachos/gestion-despachos';
import { GestionContenedores }      from './admin/gestion-contenedores/gestion-contenedores';
import { GestionIncidencias }       from './admin/gestion-incidencias/gestion-incidencias';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,        // ← Layout que envuelve las páginas públicas
    children: [
      { path: '',                   redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',               component: Home },
      { path: 'catalogo-servicios', component: CatalogoServicios },
      { path: 'catalogo-rutas',     component: CatalogoRutas },
      { path: 'simulador-cotizacion', component: SimuladorCotizacion },
    ]
  },
  { path: 'login', component: Login },
  {
    path: 'cliente',
    component: ClientLayout,        // ← Layout que envuelve las páginas del cliente
    children: [
      { path: '',           redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',  component: Dashboard },
      { path: 'despachos',  component: Despachos },
      { path: 'seguimiento', component: Seguimiento },
      { path: 'historial',  component: Historial },
      { path: 'incidencias', component: Incidencias },
      { path: 'centro-alertas', component: CentroAlertas },
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,         // ← Layout que envuelve las páginas del admin
    children: [
      { path: '',                    redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',           component: DashboardAdmin },
      { path: 'gestion-despachos',   component: GestionDespachos },
      { path: 'gestion-contenedores', component: GestionContenedores },
      { path: 'gestion-incidencias', component: GestionIncidencias },
    ]
  },
  { path: '**', redirectTo: 'home' }   // ← Cualquier ruta desconocida va a Home
];
```

> **¿Qué son las rutas hijas (`children`)?**  
> Permiten que un componente padre (Layout) muestre diferentes componentes hijos según la URL. Por ejemplo, `/cliente/dashboard` carga `ClientLayout` y dentro de él muestra `Dashboard`. Así el navbar y sidebar no se recrean al cambiar de página.

---

## Paso 2.5 — Actualizar el componente raíz (app.ts)

El componente raíz es el punto de entrada de toda la app. Reemplaza `src/app/app.ts`:

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
```

Reemplaza `src/app/app.html`:

```html
<!-- src/app/app.html -->
<router-outlet></router-outlet>
```

> **¿Qué es `<router-outlet>`?**  
> Es un marcador de posición donde Angular inserta el componente que corresponde a la URL actual. Sin él, la navegación no funcionaría.

---

**✅ Entrega de la Parte 2:**  
`ng serve -o` debe compilar sin errores. La app mostrará una página en blanco (aún no hay contenido visual), pero no debe haber errores en la consola.

---

---

# PARTE 3
# Navbar Público, Layout Público, Home y Catálogo de Servicios

**Responsable:** Participante 3  
**Requiere:** Haber completado las Partes 1 y 2.  
**Objetivo:** Implementar la navbar pública, el layout, la página de inicio y el catálogo de servicios con filtrado reactivo.

---

## Concepto clave: ¿Qué es un Layout?

Un **Layout** es un componente que actúa como "cáscara" de otras páginas. Define las partes comunes (navbar, footer) y deja un espacio (`<router-outlet>`) donde Angular inyecta el contenido de cada página.

```
┌─────────────────────────────┐
│        <NavbarPublic>        │  ← siempre visible
├─────────────────────────────┤
│                             │
│     <router-outlet>          │  ← cambia según la URL
│    (Home / Catálogo / etc.)  │
│                             │
├─────────────────────────────┤
│           Footer            │  ← siempre visible
└─────────────────────────────┘
```

---

## Paso 3.1 — Navbar público

### `src/app/shared/navbar-public/navbar-public.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-public.html',
  styleUrl: './navbar-public.css'
})
export class NavbarPublicComponent { }
```

> **`RouterLink`** — convierte un `<a>` en un enlace de Angular que navega sin recargar la página.  
> **`RouterLinkActive`** — agrega una clase CSS al enlace cuando su ruta está activa (para resaltar el ítem actual del menú).

### `src/app/shared/navbar-public/navbar-public.html`

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-if-primary">
  <div class="container">
    <a class="navbar-brand fw-bold" routerLink="/home">
      <i class="bi bi-truck me-2"></i>IntermodalFlow
    </a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#publicNav"
            aria-controls="publicNav" aria-expanded="false"
            aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="publicNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" routerLink="/home" routerLinkActive="active">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/catalogo-servicios" routerLinkActive="active">Servicios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/catalogo-rutas" routerLinkActive="active">Rutas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/simulador-cotizacion" routerLinkActive="active">Cotizar</a>
        </li>
      </ul>
      <a class="btn btn-light btn-sm" routerLink="/login">
        <i class="bi bi-box-arrow-in-right me-1"></i>Iniciar sesión
      </a>
    </div>
  </div>
</nav>
```

---

## Paso 3.2 — Layout público

### `src/app/public/layout/layout.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarPublicComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout { }
```

### `src/app/public/layout/layout.html`

```html
<app-navbar-public></app-navbar-public>

<router-outlet></router-outlet>

<footer class="bg-dark text-white-50 py-4 mt-4">
  <div class="container text-center small">
    © 2026 IntermodalFlow · Plataforma logística
  </div>
</footer>
```

---

## Paso 3.3 — Página Home

### `src/app/public/home/home.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
```

### `src/app/public/home/home.css`

```css
.hero-icon {
  font-size: 9rem;
  opacity: .85;
}
```

### `src/app/public/home/home.html`

```html
<!-- Hero: sección de bienvenida con fondo azul -->
<header class="bg-if-primary text-white py-5">
  <div class="container py-4">
    <div class="row align-items-center g-4">
      <div class="col-lg-7">
        <h1 class="fw-bold mb-3">Sigue tus despachos en un solo lugar</h1>
        <p class="lead mb-4">
          Consulta servicios, simula cotizaciones y haz seguimiento de tu carga
          en tiempo real, sin llamadas ni correos.
        </p>
        <a routerLink="/simulador-cotizacion" class="btn btn-light btn-lg me-2">
          Simular cotización
        </a>
        <a routerLink="/catalogo-servicios" class="btn btn-outline-light btn-lg">
          Ver servicios
        </a>
      </div>
      <div class="col-lg-5 text-center">
        <i class="bi bi-globe-americas hero-icon"></i>
      </div>
    </div>
  </div>
</header>

<!-- Sección de servicios destacados -->
<section class="container py-5">
  <h2 class="h4 mb-4 text-if-primary">¿Qué ofrecemos?</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-truck fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Transporte terrestre</h3>
          <p class="text-muted mb-0">
            Carga general y contenedores a nivel nacional con seguimiento continuo.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-box-seam fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Gestión de contenedores</h3>
          <p class="text-muted mb-0">
            Control de disponibilidad y estado de tus contenedores en todo momento.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-geo-alt fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Trazabilidad</h3>
          <p class="text-muted mb-0">
            Conoce la ubicación y el historial de movimientos de cada despacho.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Paso 3.4 — Catálogo de Servicios

Este componente muestra tarjetas de servicios con **filtrado reactivo**: cuando el usuario escribe o selecciona un filtro, la lista se actualiza automáticamente sin recargar la página.

### `src/app/public/catalogo-servicios/catalogo-servicios.ts`

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

// Definimos la estructura de un servicio con una interfaz TypeScript
interface Servicio {
  tipo: string;
  badgeClass: string;   // clase CSS de Bootstrap para el badge de color
  nombre: string;
  descripcion: string;
  precio: string;
}

@Component({
  selector: 'app-catalogo-servicios',
  imports: [FormsModule, NgClass],
  templateUrl: './catalogo-servicios.html',
  styleUrl: './catalogo-servicios.css',
})
export class CatalogoServicios {

  filtroTipo = '';       // valor del select de tipo de carga
  filtroBuscar = '';     // valor del input de búsqueda

  // Lista completa de servicios (datos estáticos para esta versión)
  readonly servicios: Servicio[] = [
    {
      tipo: 'Carga general',
      badgeClass: 'bg-secondary',
      nombre: 'Transporte terrestre nacional',
      descripcion: 'Distribución de carga seca en rutas nacionales con seguimiento de estado.',
      precio: 'S/ 1,200'
    },
    {
      tipo: 'Refrigerada',
      badgeClass: 'bg-info text-dark',
      nombre: 'Cadena de frío',
      descripcion: 'Transporte refrigerado para productos perecibles con control de temperatura.',
      precio: 'S/ 2,400'
    },
    {
      tipo: 'Peligrosa',
      badgeClass: 'bg-warning text-dark',
      nombre: 'Carga peligrosa (MATPEL)',
      descripcion: 'Manejo especializado de materiales peligrosos con personal certificado.',
      precio: 'S/ 3,100'
    },
    {
      tipo: 'Contenedor',
      badgeClass: 'bg-dark',
      nombre: 'Movimiento de contenedores',
      descripcion: "Traslado de contenedores 20' y 40' entre puerto y almacén.",
      precio: 'S/ 1,800'
    }
  ];

  // Método que devuelve solo los servicios que coinciden con los filtros activos
  serviciosFiltrados(): Servicio[] {
    return this.servicios.filter(s => {
      const coincideTipo = !this.filtroTipo || s.tipo === this.filtroTipo;
      const coincideBuscar = !this.filtroBuscar ||
        s.nombre.toLowerCase().includes(this.filtroBuscar.toLowerCase());
      return coincideTipo && coincideBuscar;
    });
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroBuscar = '';
  }
}
```

> **¿Qué es `FormsModule`?**  
> Permite usar `[(ngModel)]` en los inputs. El doble corchete `[()]` es el "banana in a box" — la sintaxis de Angular para binding bidireccional: el input muestra el valor de la propiedad Y actualiza esa propiedad cuando el usuario escribe.

### `src/app/public/catalogo-servicios/catalogo-servicios.html`

```html
<main class="container py-4">
  <h1 class="h3 mb-1 text-if-primary">Catálogo de servicios</h1>
  <p class="text-muted">Conoce nuestras soluciones logísticas. No necesitas iniciar sesión.</p>

  <!-- Panel de filtros -->
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <div class="row g-3 align-items-end">
        <div class="col-md-5">
          <label class="form-label" for="fTipoCarga">Filtrar por tipo de carga</label>
          <select class="form-select" id="fTipoCarga" [(ngModel)]="filtroTipo">
            <option value="">Todos</option>
            <option>Carga general</option>
            <option>Refrigerada</option>
            <option>Peligrosa</option>
            <option>Contenedor</option>
          </select>
        </div>
        <div class="col-md-5">
          <label class="form-label" for="fBuscar">Buscar servicio</label>
          <input type="text" class="form-control" id="fBuscar"
                 placeholder="Ej. terrestre" [(ngModel)]="filtroBuscar">
        </div>
        <div class="col-md-2 d-grid">
          <button type="button" class="btn btn-if-primary" (click)="limpiarFiltros()">
            <i class="bi bi-x-circle me-1"></i>Limpiar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Cards de servicios — @for itera sobre serviciosFiltrados() -->
  <div class="row g-4">
    @for (servicio of serviciosFiltrados(); track servicio.nombre) {
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <span class="badge mb-2" [ngClass]="servicio.badgeClass">{{ servicio.tipo }}</span>
            <h2 class="h5">{{ servicio.nombre }}</h2>
            <p class="text-muted small">{{ servicio.descripcion }}</p>
          </div>
          <div class="card-footer bg-white border-0">
            <span class="text-if-primary fw-semibold">Desde {{ servicio.precio }}</span>
          </div>
        </div>
      </div>
    }
    @if (serviciosFiltrados().length === 0) {
      <div class="col-12">
        <p class="text-muted text-center py-4">
          No se encontraron servicios con ese criterio.
        </p>
      </div>
    }
  </div>
</main>
```

> **`@for` y `@if`** son la nueva sintaxis de control de flujo de Angular 17+. Reemplaza a las antiguas directivas `*ngFor` y `*ngIf`.  
> - `@for (item of lista; track item.id)` — repite el bloque por cada elemento de la lista.  
> - `@if (condicion)` — muestra el bloque solo si la condición es verdadera.  
> - `[ngClass]="objeto"` — aplica clases CSS dinámicamente según un objeto o string.

---

**✅ Entrega de la Parte 3:**  
Al ejecutar `ng serve -o`, la ruta `/home` debe mostrar el hero con el globo azul y las 3 cards de servicios. La ruta `/catalogo-servicios` debe mostrar las 4 tarjetas y el filtro debe funcionar.

---

---

# PARTE 4
# Catálogo de Rutas y Simulador de Cotización

**Responsable:** Participante 4  
**Requiere:** Haber completado las Partes 1, 2 y 3.  
**Objetivo:** Implementar la tabla de rutas con filtrado y el simulador de cotización con cálculo real en TypeScript.

---

## Paso 4.1 — Catálogo de Rutas

### `src/app/public/catalogo-rutas/catalogo-rutas.ts`

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

// Interfaz que define la estructura de cada ruta
interface Ruta {
  codigo: string;
  origen: string;
  destino: string;
  distancia: string;
  tipo: string;
  badgeClass: string;
  tiempo: string;
}

@Component({
  selector: 'app-catalogo-rutas',
  imports: [FormsModule, NgClass],
  templateUrl: './catalogo-rutas.html',
  styleUrl: './catalogo-rutas.css',
})
export class CatalogoRutas {

  filtroTipo = '';
  filtroBuscar = '';

  readonly rutas: Ruta[] = [
    {
      codigo: 'RT-001', origen: 'Lima',   destino: 'Arequipa',
      distancia: '1,010 km', tipo: 'Carga general',
      badgeClass: 'bg-secondary', tiempo: '16 h'
    },
    {
      codigo: 'RT-002', origen: 'Callao', destino: 'Trujillo',
      distancia: '560 km',   tipo: 'Contenedor',
      badgeClass: 'bg-dark',            tiempo: '9 h'
    },
    {
      codigo: 'RT-003', origen: 'Lima',   destino: 'Cusco',
      distancia: '1,100 km', tipo: 'Refrigerada',
      badgeClass: 'bg-info text-dark',  tiempo: '20 h'
    },
    {
      codigo: 'RT-004', origen: 'Piura',  destino: 'Lima',
      distancia: '980 km',   tipo: 'Carga general',
      badgeClass: 'bg-secondary',       tiempo: '15 h'
    }
  ];

  rutasFiltradas(): Ruta[] {
    const buscar = this.filtroBuscar.toLowerCase();
    return this.rutas.filter(r => {
      const coincideTipo = !this.filtroTipo || r.tipo === this.filtroTipo;
      const coincideBuscar = !buscar ||
        r.origen.toLowerCase().includes(buscar) ||
        r.destino.toLowerCase().includes(buscar);
      return coincideTipo && coincideBuscar;
    });
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroBuscar = '';
  }
}
```

### `src/app/public/catalogo-rutas/catalogo-rutas.html`

```html
<main class="container py-4">
  <h1 class="h3 mb-1 text-if-primary">Catálogo de rutas</h1>
  <p class="text-muted">Origen y destino de nuestras rutas disponibles. Filtra por tipo de carga.</p>

  <!-- Filtros -->
  <div class="row g-3 align-items-end mb-3">
    <div class="col-md-4">
      <label class="form-label" for="rTipo">Tipo de carga</label>
      <select class="form-select" id="rTipo" [(ngModel)]="filtroTipo">
        <option value="">Todos</option>
        <option>Carga general</option>
        <option>Refrigerada</option>
        <option>Contenedor</option>
      </select>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="rBuscar">Buscar ruta</label>
      <input type="text" class="form-control" id="rBuscar"
             placeholder="Ej. Lima" [(ngModel)]="filtroBuscar">
    </div>
    <div class="col-md-2">
      <button type="button" class="btn btn-if-primary w-100" (click)="limpiarFiltros()">
        <i class="bi bi-x-circle me-1"></i>Limpiar
      </button>
    </div>
  </div>

  <!-- Tabla de rutas -->
  <div class="card shadow-sm">
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Código</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Distancia</th>
            <th>Tipo de carga</th>
            <th>Tiempo estimado</th>
          </tr>
        </thead>
        <tbody>
          @for (ruta of rutasFiltradas(); track ruta.codigo) {
            <tr>
              <td>{{ ruta.codigo }}</td>
              <td>{{ ruta.origen }}</td>
              <td>{{ ruta.destino }}</td>
              <td>{{ ruta.distancia }}</td>
              <td>
                <span class="badge" [ngClass]="ruta.badgeClass">{{ ruta.tipo }}</span>
              </td>
              <td>{{ ruta.tiempo }}</td>
            </tr>
          }
          @if (rutasFiltradas().length === 0) {
            <tr>
              <td colspan="6" class="text-center text-muted py-3">
                No se encontraron rutas con ese criterio.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</main>
```

---

## Paso 4.2 — Simulador de Cotización

Este es el componente más interesante de la zona pública. El usuario ingresa datos y el componente **calcula el precio en tiempo real** usando TypeScript.

### `src/app/public/simulador-cotizacion/simulador-cotizacion.ts`

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-cotizacion',
  imports: [FormsModule],
  templateUrl: './simulador-cotizacion.html',
  styleUrl: './simulador-cotizacion.css',
})
export class SimuladorCotizacion {

  // Valores del formulario — se sincronizan con los inputs del HTML via [(ngModel)]
  origen    = 'Lima';
  destino   = 'Arequipa';
  peso      = 500;
  tipoCarga = 'Carga general';

  // Valores del resultado del cálculo
  tarifaBase  = 0;
  recargoPeso = 0;
  gestion     = 0;
  total       = 0;
  calculado   = false;    // controla si mostramos el resultado o no

  // Tabla de tarifas base por tipo de carga
  // Record<string, number> es un tipo TypeScript para un objeto {llave: valor}
  private readonly tarifas: Record<string, number> = {
    'Carga general': 1200,
    'Refrigerada':   2400,
    'Peligrosa':     3100,
    'Contenedor':    1800
  };

  calcular(): void {
    // ?? es el operador "nullish coalescing": si tarifas[tipoCarga] es null/undefined, usa 1200
    this.tarifaBase  = this.tarifas[this.tipoCarga] ?? 1200;
    this.recargoPeso = Math.round(this.peso * 0.48);  // S/ 0.48 por kg
    this.gestion     = 100;
    this.total       = this.tarifaBase + this.recargoPeso + this.gestion;
    this.calculado   = true;
  }

  // Formatea un número como moneda peruana: 1540 → "1,540.00"
  formatear(valor: number): string {
    return valor.toLocaleString('es-PE', { minimumFractionDigits: 2 });
  }
}
```

### `src/app/public/simulador-cotizacion/simulador-cotizacion.html`

```html
<main class="container py-4">
  <h1 class="h3 mb-1 text-if-primary">Simulador de cotización</h1>
  <p class="text-muted">Ingresa los datos de tu carga para obtener una cotización referencial.</p>

  <div class="row g-4">

    <!-- Columna izquierda: Formulario -->
    <div class="col-lg-7">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="h6 mb-3">Datos de la carga</h2>
          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label" for="cOrigen">Origen</label>
              <select class="form-select" id="cOrigen" [(ngModel)]="origen">
                <option>Lima</option>
                <option>Callao</option>
                <option>Arequipa</option>
                <option>Trujillo</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label" for="cDestino">Destino</label>
              <select class="form-select" id="cDestino" [(ngModel)]="destino">
                <option>Lima</option>
                <option>Arequipa</option>
                <option>Cusco</option>
                <option>Piura</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label" for="cPeso">Peso de la carga (kg)</label>
              <input type="number" class="form-control" id="cPeso"
                     [(ngModel)]="peso" min="1">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="cTipo">Tipo de carga</label>
              <select class="form-select" id="cTipo" [(ngModel)]="tipoCarga">
                <option>Carga general</option>
                <option>Refrigerada</option>
                <option>Peligrosa</option>
                <option>Contenedor</option>
              </select>
            </div>

            <div class="col-12 d-grid d-md-block">
              <!-- (click)="calcular()" llama al método calcular() del componente -->
              <button type="button" class="btn btn-if-primary px-4" (click)="calcular()">
                <i class="bi bi-calculator me-1"></i>Calcular cotización
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Columna derecha: Resultado -->
    <div class="col-lg-5">
      <div class="card shadow-sm border-0 bg-light">
        <div class="card-body">
          <h2 class="h6 text-muted">Cotización estimada</h2>

          <!-- Solo se muestra si calculado === true -->
          @if (calculado) {
            <p class="display-6 fw-bold text-if-primary mb-1">S/ {{ formatear(total) }}</p>
            <span class="badge bg-success mb-3">Referencial</span>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span>Tarifa base ({{ tipoCarga }})</span>
                <span>S/ {{ formatear(tarifaBase) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span>Recargo por peso ({{ peso }} kg)</span>
                <span>S/ {{ formatear(recargoPeso) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span>Gestión</span>
                <span>S/ {{ formatear(gestion) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between px-0 bg-transparent fw-bold">
                <span>Costo total</span>
                <span>S/ {{ formatear(total) }}</span>
              </li>
            </ul>
          } @else {
            <p class="text-muted py-3 mb-0">
              <i class="bi bi-calculator me-1"></i>
              Completa el formulario y presiona <strong>Calcular cotización</strong>.
            </p>
          }

          <div class="alert alert-info small mt-3 mb-0">
            <i class="bi bi-info-circle me-1"></i>
            Esta cotización es referencial y no constituye un compromiso de servicio.
          </div>
        </div>
      </div>
    </div>

  </div>
</main>
```

---

**✅ Entrega de la Parte 4:**  
- `/catalogo-rutas` muestra la tabla con 4 rutas. Los filtros reducen la tabla al escribir o seleccionar.  
- `/simulador-cotizacion` muestra el formulario. Al presionar "Calcular cotización", aparece el desglose de precios con los valores calculados en TypeScript.

---

---

# PARTE 5
# Login, Área Cliente y Área Administrador

**Responsable:** Participante 5  
**Requiere:** Haber completado las Partes 1, 2, 3 y 4.  
**Objetivo:** Implementar la pantalla de login, los layouts y dashboards de las áreas privadas.

---

## Concepto clave: Layouts con Sidebar

Las zonas privadas (cliente y admin) usan un layout diferente al público. En vez de navbar+footer, tienen navbar + sidebar lateral + contenido.

```
┌──────────────────────────────────┐
│            <NavbarApp>           │
├──────────────┬───────────────────┤
│              │                   │
│  <Sidebar>   │  <router-outlet>  │
│  (menú lat.) │  (Dashboard, etc.)│
│              │                   │
└──────────────┴───────────────────┘
```

---

## Paso 5.1 — Navbar de la app (zona privada)

### `src/app/shared/navbar-app/navbar-app.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-app',
  imports: [RouterLink],
  templateUrl: './navbar-app.html',
  styleUrl: './navbar-app.css',
})
export class NavbarApp {}
```

### `src/app/shared/navbar-app/navbar-app.html`

```html
<nav class="navbar navbar-dark bg-if-primary px-3">
  <a class="navbar-brand fw-bold" routerLink="/cliente/dashboard">
    <i class="bi bi-truck me-2"></i>IntermodalFlow
  </a>
  <div class="d-flex align-items-center gap-3">
    <span class="text-white-50 small">Cliente</span>
    <a class="btn btn-outline-light btn-sm" routerLink="/login">
      <i class="bi bi-box-arrow-right me-1"></i>Salir
    </a>
  </div>
</nav>
```

---

## Paso 5.2 — Sidebar del cliente

### `src/app/shared/sidebar-client/sidebar-client.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-client',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css',
})
export class SidebarClient {}
```

### `src/app/shared/sidebar-client/sidebar-client.html`

```html
<aside class="d-flex flex-column p-3 bg-white border-end" style="min-height: calc(100vh - 56px); width: 220px;">
  <ul class="nav flex-column gap-1">
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/dashboard" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-speedometer2 me-2"></i>Dashboard
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/despachos" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-truck me-2"></i>Despachos
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/seguimiento" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-geo-alt me-2"></i>Seguimiento
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/historial" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-clock-history me-2"></i>Historial
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/incidencias" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-exclamation-triangle me-2"></i>Incidencias
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/centro-alertas" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-bell me-2"></i>Centro de alertas
      </a>
    </li>
  </ul>
</aside>
```

---

## Paso 5.3 — Layout del cliente

### `src/app/client/layout/layout.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarClient } from '../../shared/sidebar-client/sidebar-client';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarApp, SidebarClient],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
```

### `src/app/client/layout/layout.html`

```html
<app-navbar-app></app-navbar-app>

<div class="d-flex">
  <app-sidebar-client></app-sidebar-client>
  <main class="flex-grow-1 p-4 bg-light">
    <router-outlet></router-outlet>
  </main>
</div>
```

---

## Paso 5.4 — Dashboard del cliente

Este es el componente más completo del área privada: obtiene datos del servicio e muestra un resumen.

### `src/app/client/dashboard/dashboard.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  despachosActivos: Despacho[] = [];

  // Inyección de dependencias: Angular provee el servicio automáticamente
  constructor(private despachosService: DespachosService) {}

  // ngOnInit se ejecuta cuando el componente termina de inicializarse
  ngOnInit(): void {
    this.despachosActivos = this.despachosService.obtenerActivos();
  }

  // Devuelve la clase CSS del badge según el estado del despacho
  claseBadge(estado: string): string {
    switch (estado) {
      case 'En tránsito': return 'bg-primary';
      case 'En almacén':  return 'bg-warning text-dark';
      case 'Cargando':    return 'bg-info text-dark';
      default:            return 'bg-secondary';
    }
  }
}
```

### `src/app/client/dashboard/dashboard.html`

```html
<h1 class="h3 mb-4 text-if-primary">Resumen de operaciones</h1>

<!-- KPI: tarjeta con el conteo de despachos activos -->
<div class="row g-3 mb-4">
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Despachos activos</p>
        <p class="h3 fw-bold mb-0">{{ despachosActivos.length }}</p>
      </div>
    </div>
  </div>
</div>

<!-- Tabla de despachos activos -->
<div class="card shadow-sm">
  <div class="card-header bg-white fw-semibold">Despachos activos</div>
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Ruta</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (d of despachosActivos; track d.codigo) {
          <tr>
            <td>{{ d.codigo }}</td>
            <td>{{ d.ruta }}</td>
            <td>
              <span class="badge" [ngClass]="claseBadge(d.estado)">{{ d.estado }}</span>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

---

## Paso 5.5 — Páginas restantes del cliente (stubs)

Estas páginas están en construcción. Reemplaza el contenido de cada archivo `.ts` y `.html`.

### `src/app/client/login/login.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  clave   = '';
}
```

### `src/app/client/login/login.html`

```html
<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="card shadow-sm" style="width: 380px;">
    <div class="card-body p-4">
      <div class="text-center mb-4">
        <i class="bi bi-truck fs-1 text-if-primary"></i>
        <h1 class="h4 mt-2 fw-bold text-if-primary">IntermodalFlow</h1>
        <p class="text-muted small">Ingresa tus credenciales para continuar</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="usuario">Usuario</label>
        <input type="text" class="form-control" id="usuario"
               placeholder="usuario@empresa.com" [(ngModel)]="usuario">
      </div>
      <div class="mb-4">
        <label class="form-label" for="clave">Contraseña</label>
        <input type="password" class="form-control" id="clave"
               placeholder="••••••••" [(ngModel)]="clave">
      </div>
      <div class="d-grid">
        <a class="btn btn-if-primary" routerLink="/cliente/dashboard">
          <i class="bi bi-box-arrow-in-right me-1"></i>Ingresar
        </a>
      </div>
      <div class="text-center mt-3">
        <a routerLink="/home" class="text-muted small">← Volver al inicio</a>
      </div>
    </div>
  </div>
</div>
```

### `src/app/client/despachos/despachos.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-despachos',
  imports: [],
  templateUrl: './despachos.html',
  styleUrl: './despachos.css',
})
export class Despachos {}
```

### `src/app/client/despachos/despachos.html`

```html
<h1 class="h3 mb-4 text-if-primary">Mis despachos</h1>
<div class="alert alert-info">
  <i class="bi bi-info-circle me-2"></i>
  Esta sección mostrará el listado completo de despachos del cliente. En construcción.
</div>
```

### `src/app/client/seguimiento/seguimiento.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  imports: [],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento {}
```

### `src/app/client/seguimiento/seguimiento.html`

```html
<h1 class="h3 mb-4 text-if-primary">Seguimiento en tiempo real</h1>
<div class="alert alert-info">
  <i class="bi bi-geo-alt me-2"></i>
  Esta sección mostrará el mapa de seguimiento de cada despacho. En construcción.
</div>
```

### `src/app/client/historial/historial.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {}
```

### `src/app/client/historial/historial.html`

```html
<h1 class="h3 mb-4 text-if-primary">Historial de despachos</h1>
<div class="alert alert-info">
  <i class="bi bi-clock-history me-2"></i>
  Esta sección mostrará el historial de despachos completados y cancelados. En construcción.
</div>
```

### `src/app/client/incidencias/incidencias.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-incidencias',
  imports: [],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class Incidencias {}
```

### `src/app/client/incidencias/incidencias.html`

```html
<h1 class="h3 mb-4 text-if-primary">Incidencias</h1>
<div class="alert alert-info">
  <i class="bi bi-exclamation-triangle me-2"></i>
  Esta sección permitirá registrar y consultar incidencias de despacho. En construcción.
</div>
```

### `src/app/client/centro-alertas/centro-alertas.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-centro-alertas',
  imports: [],
  templateUrl: './centro-alertas.html',
  styleUrl: './centro-alertas.css',
})
export class CentroAlertas {}
```

### `src/app/client/centro-alertas/centro-alertas.html`

```html
<h1 class="h3 mb-4 text-if-primary">Centro de alertas</h1>
<div class="alert alert-info">
  <i class="bi bi-bell me-2"></i>
  Esta sección mostrará las alertas y notificaciones del sistema. En construcción.
</div>
```

---

## Paso 5.6 — Sidebar del administrador

### `src/app/shared/sidebar-admin/sidebar-admin.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css',
})
export class SidebarAdmin {}
```

### `src/app/shared/sidebar-admin/sidebar-admin.html`

```html
<aside class="d-flex flex-column p-3 bg-white border-end" style="min-height: calc(100vh - 56px); width: 220px;">
  <ul class="nav flex-column gap-1">
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/dashboard" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-speedometer2 me-2"></i>Dashboard
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-despachos" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-truck me-2"></i>Despachos
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-contenedores" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-box-seam me-2"></i>Contenedores
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-incidencias" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-exclamation-triangle me-2"></i>Incidencias
      </a>
    </li>
  </ul>
</aside>
```

---

## Paso 5.7 — Layout del administrador

### `src/app/admin/layout/layout.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarAdmin } from '../../shared/sidebar-admin/sidebar-admin';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarApp, SidebarAdmin],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
```

### `src/app/admin/layout/layout.html`

```html
<app-navbar-app></app-navbar-app>

<div class="d-flex">
  <app-sidebar-admin></app-sidebar-admin>
  <main class="flex-grow-1 p-4 bg-light">
    <router-outlet></router-outlet>
  </main>
</div>
```

---

## Paso 5.8 — Dashboard del administrador

### `src/app/admin/dashboard-admin/dashboard-admin.ts`

```typescript
import { Component } from '@angular/core';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin {

  totalDespachos: number;

  constructor(private despachosService: DespachosService) {
    this.totalDespachos = this.despachosService.obtenerTodos().length;
  }
}
```

### `src/app/admin/dashboard-admin/dashboard-admin.html`

```html
<h1 class="h3 mb-4 text-if-primary">Panel de administración</h1>

<div class="row g-3 mb-4">
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Total despachos</p>
        <p class="h3 fw-bold mb-0">{{ totalDespachos }}</p>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Contenedores activos</p>
        <p class="h3 fw-bold mb-0">12</p>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Incidencias abiertas</p>
        <p class="h3 fw-bold mb-0">3</p>
      </div>
    </div>
  </div>
</div>

<div class="alert alert-warning">
  <i class="bi bi-tools me-2"></i>
  El panel completo de gestión está en construcción.
</div>
```

---

## Paso 5.9 — Páginas de gestión del administrador (stubs)

### `src/app/admin/gestion-despachos/gestion-despachos.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-despachos',
  imports: [],
  templateUrl: './gestion-despachos.html',
  styleUrl: './gestion-despachos.css',
})
export class GestionDespachos {}
```

### `src/app/admin/gestion-despachos/gestion-despachos.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de despachos</h1>
<div class="alert alert-info">
  <i class="bi bi-truck me-2"></i>
  Aquí se gestionarán todos los despachos de la plataforma. En construcción.
</div>
```

### `src/app/admin/gestion-contenedores/gestion-contenedores.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-contenedores',
  imports: [],
  templateUrl: './gestion-contenedores.html',
  styleUrl: './gestion-contenedores.css',
})
export class GestionContenedores {}
```

### `src/app/admin/gestion-contenedores/gestion-contenedores.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de contenedores</h1>
<div class="alert alert-info">
  <i class="bi bi-box-seam me-2"></i>
  Aquí se gestionará la disponibilidad y estado de los contenedores. En construcción.
</div>
```

### `src/app/admin/gestion-incidencias/gestion-incidencias.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-incidencias',
  imports: [],
  templateUrl: './gestion-incidencias.html',
  styleUrl: './gestion-incidencias.css',
})
export class GestionIncidencias {}
```

### `src/app/admin/gestion-incidencias/gestion-incidencias.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de incidencias</h1>
<div class="alert alert-info">
  <i class="bi bi-exclamation-triangle me-2"></i>
  Aquí se gestionarán las incidencias reportadas por los clientes. En construcción.
</div>
```

---

## Paso 5.10 — Verificación final

Ejecuta la aplicación:

```bash
ng serve -o
```

Verifica que todas las rutas funcionan:

| URL                         | Resultado esperado                          |
|-----------------------------|---------------------------------------------|
| `localhost:4200/home`        | Hero azul + 3 cards de servicios            |
| `/catalogo-servicios`        | 4 cards con filtro funcional                |
| `/catalogo-rutas`            | Tabla con 4 rutas y filtro funcional        |
| `/simulador-cotizacion`      | Formulario que calcula el precio            |
| `/login`                     | Pantalla de login con formulario            |
| `/cliente/dashboard`         | Sidebar + tabla de despachos activos        |
| `/admin/dashboard`           | Sidebar + 3 KPIs                            |

---

**✅ Entrega de la Parte 5:**  
Todas las rutas anteriores deben cargar sin errores. Los layouts de cliente y admin deben mostrar el navbar y el sidebar correctamente.

---

---

# PARTE 6
# Autenticación real, guards de ruta y funcionalidad completa

**Responsable:** Todo el equipo (repaso integral antes de pasar al backend)  
**Requiere:** Haber completado las Partes 1 a 5.  
**Objetivo:** Que ninguna pantalla quede "en construcción": login real con usuarios de prueba, rutas protegidas, y las 8 páginas restantes (despachos, seguimiento, historial, incidencias, centro de alertas, y su versión de gestión en el panel admin) completamente funcionales con datos en memoria. Esta es la última parte **antes** de conectar un backend real.

---

## Concepto clave: ¿Qué es un guard de ruta?

Un **guard** es una función que Angular ejecuta *antes* de activar una ruta. Si devuelve `true`, la navegación continúa; si devuelve `false` o una URL, Angular redirige. Se usa para proteger rutas que requieren sesión iniciada.

```typescript
export const authGuard: CanActivateFn = () => {
  // ...
  if (auth.estaAutenticado()) {
    return true;              // ← deja pasar
  }
  return router.parseUrl('/login'); // ← redirige
};
```

`CanActivateFn` es la versión **funcional** de los guards (Angular 15+), reemplaza a las antiguas clases `implements CanActivate`. Es solo una función, más simple de leer y de testear.

---

## Paso 6.1 — Nuevos modelos de datos

**Crea el archivo** `src/app/core/models/contenedor.model.ts`:

```typescript
// src/app/core/models/contenedor.model.ts
export interface Contenedor {
  codigo: string;
  tipo: 'Seco' | 'Refrigerado' | 'Cisterna';
  estado: 'Disponible' | 'En uso' | 'Mantenimiento';
  ubicacion: string;
}
```

**Crea el archivo** `src/app/core/models/usuario.model.ts`:

```typescript
// src/app/core/models/usuario.model.ts
export interface Usuario {
  usuario: string;
  nombre: string;
  rol: 'cliente' | 'admin';
}
```

---

## Paso 6.2 — Ampliar los servicios en memoria

Añadimos operaciones de creación/edición/borrado a `DespachosService`, convertimos `Incidencias` en un servicio con datos reales, y creamos dos servicios nuevos: `AlertasService` y `ContenedoresService`.

### `src/app/core/services/despachos.ts`

```typescript
import { Injectable } from '@angular/core';
import { Despacho } from '../models/despacho.model';

@Injectable({
  providedIn: 'root'   // ← disponible en toda la app sin importarlo manualmente
})
export class DespachosService {

  private despachos: Despacho[] = [
    { codigo: 'DSP-1001', ruta: 'Lima → Arequipa',   estado: 'En tránsito' },
    { codigo: 'DSP-1002', ruta: 'Callao → Trujillo', estado: 'En almacén'  },
    { codigo: 'DSP-1003', ruta: 'Lima → Cusco',       estado: 'Cargando'    },
    { codigo: 'DSP-1004', ruta: 'Piura → Lima',       estado: 'Entregado'   },
    { codigo: 'DSP-1005', ruta: 'Lima → Trujillo',    estado: 'Entregado'   }
  ];

  obtenerTodos(): Despacho[] {
    return this.despachos;
  }

  obtenerActivos(): Despacho[] {
    return this.despachos.filter(d => d.estado !== 'Entregado');
  }

  obtenerEntregados(): Despacho[] {
    return this.despachos.filter(d => d.estado === 'Entregado');
  }

  obtenerPorCodigo(codigo: string): Despacho | undefined {
    return this.despachos.find(d => d.codigo === codigo);
  }

  crear(despacho: Despacho): void {
    this.despachos.push(despacho);
  }

  actualizar(codigo: string, cambios: Partial<Despacho>): void {
    const despacho = this.obtenerPorCodigo(codigo);
    if (despacho) {
      Object.assign(despacho, cambios);
    }
  }

  eliminar(codigo: string): void {
    this.despachos = this.despachos.filter(d => d.codigo !== codigo);
  }
}
```

> **¿Por qué `Partial<Despacho>` en `actualizar`?**  
> `Partial<T>` convierte todas las propiedades de una interfaz en opcionales. Así `actualizar()` acepta "solo los campos que cambian" en vez de exigir el objeto completo.

### `src/app/core/services/incidencias.ts`

```typescript
import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class Incidencias {

  private incidencias: Incidencia[] = [
    {
      codigo: 'INC-001',
      despachoRelacionado: 'DSP-1001',
      tipo: 'Retraso',
      descripcion: 'La carga salió 3 horas tarde del almacén de origen.',
      estado: 'En proceso'
    },
    {
      codigo: 'INC-002',
      despachoRelacionado: 'DSP-1002',
      tipo: 'Documentación',
      descripcion: 'Falta la guía de remisión firmada.',
      estado: 'Abierta'
    },
    {
      codigo: 'INC-003',
      despachoRelacionado: 'DSP-1004',
      tipo: 'Daño en carga',
      descripcion: 'Se detectó humedad en dos cajas al momento de la entrega.',
      estado: 'Resuelta'
    }
  ];

  private siguienteId = 4;

  obtenerTodas(): Incidencia[] {
    return this.incidencias;
  }

  obtenerPorCodigo(codigo: string): Incidencia | undefined {
    return this.incidencias.find(i => i.codigo === codigo);
  }

  crear(datos: Omit<Incidencia, 'codigo' | 'estado'>): void {
    const codigo = `INC-${String(this.siguienteId++).padStart(3, '0')}`;
    this.incidencias.push({ codigo, estado: 'Abierta', ...datos });
  }

  actualizar(codigo: string, cambios: Partial<Incidencia>): void {
    const incidencia = this.obtenerPorCodigo(codigo);
    if (incidencia) {
      Object.assign(incidencia, cambios);
    }
  }
}
```

> **¿Qué es `Omit<Incidencia, 'codigo' | 'estado'>`?**  
> Es lo opuesto a `Partial`: toma la interfaz `Incidencia` y **quita** las propiedades `codigo` y `estado`. Tiene sentido porque el código lo genera el servicio automáticamente y toda incidencia nueva nace con estado `'Abierta'`.

### `src/app/core/services/alertas.ts` (nuevo)

```typescript
import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private alertas: Alerta[] = [
    { mensaje: 'El despacho DSP-1001 presenta un retraso de 3 horas.', tipo: 'warning', fecha: '2026-07-01' },
    { mensaje: 'El despacho DSP-1004 fue entregado correctamente.',    tipo: 'success', fecha: '2026-06-28' },
    { mensaje: 'Nueva ruta disponible: Lima → Piura.',                  tipo: 'info',    fecha: '2026-06-25' }
  ];

  obtenerTodas(): Alerta[] {
    return this.alertas;
  }
}
```

### `src/app/core/services/contenedores.ts` (nuevo)

```typescript
import { Injectable } from '@angular/core';
import { Contenedor } from '../models/contenedor.model';

@Injectable({
  providedIn: 'root'
})
export class ContenedoresService {

  private contenedores: Contenedor[] = [
    { codigo: 'CNT-2001', tipo: 'Seco',        estado: 'En uso',        ubicacion: 'Callao' },
    { codigo: 'CNT-2002', tipo: 'Refrigerado', estado: 'Disponible',    ubicacion: 'Lima'   },
    { codigo: 'CNT-2003', tipo: 'Cisterna',    estado: 'Mantenimiento', ubicacion: 'Trujillo' }
  ];

  obtenerTodos(): Contenedor[] {
    return this.contenedores;
  }

  obtenerPorCodigo(codigo: string): Contenedor | undefined {
    return this.contenedores.find(c => c.codigo === codigo);
  }

  crear(contenedor: Contenedor): void {
    this.contenedores.push(contenedor);
  }

  actualizar(codigo: string, cambios: Partial<Contenedor>): void {
    const contenedor = this.obtenerPorCodigo(codigo);
    if (contenedor) {
      Object.assign(contenedor, cambios);
    }
  }

  eliminar(codigo: string): void {
    this.contenedores = this.contenedores.filter(c => c.codigo !== codigo);
  }
}
```

### `src/app/core/services/auth.ts` — login real con usuarios de prueba

```typescript
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

// Usuarios de ejemplo — en la Parte 9 esto se reemplaza por una llamada real al backend
interface UsuarioConClave extends Usuario {
  clave: string;
}

const CLAVE_STORAGE = 'if_usuario';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly usuarios: UsuarioConClave[] = [
    { usuario: 'cliente@intermodalflow.com', clave: 'cliente123', nombre: 'Empresa Cliente SAC', rol: 'cliente' },
    { usuario: 'admin@intermodalflow.com',   clave: 'admin123',   nombre: 'Administrador',        rol: 'admin'   }
  ];

  private usuarioActual: Usuario | null = this.leerUsuarioGuardado();

  login(usuario: string, clave: string): Usuario | null {
    const encontrado = this.usuarios.find(u => u.usuario === usuario && u.clave === clave);
    if (!encontrado) {
      return null;
    }
    const { clave: _clave, ...usuarioSinClave } = encontrado;
    this.usuarioActual = usuarioSinClave;
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarioSinClave));
    return usuarioSinClave;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem(CLAVE_STORAGE);
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : null;
  }
}
```

> **¿Por qué guardar el usuario en `localStorage`?**  
> Si el usuario refresca la página (`F5`), Angular vuelve a crear todos los servicios desde cero — sin `localStorage` perdería la sesión inmediatamente. `localStorage` persiste incluso después de cerrar el navegador.

---

## Paso 6.3 — Guard de autenticación

**Crea el archivo** `src/app/core/guards/auth.guard.ts`:

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  return router.parseUrl('/login');
};
```

> **¿Qué es `inject()`?**  
> Fuera de un constructor no podemos usar inyección de dependencias tradicional. `inject()` es la forma moderna de pedirle a Angular una instancia de un servicio dentro de una función standalone, como este guard.

Ahora protegemos las rutas de cliente y admin. Reemplaza `src/app/app.routes.ts`:

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { Layout as PublicLayout } from './public/layout/layout';
import { Home } from './public/home/home';
import { CatalogoServicios } from './public/catalogo-servicios/catalogo-servicios';
import { CatalogoRutas } from './public/catalogo-rutas/catalogo-rutas';
import { SimuladorCotizacion } from './public/simulador-cotizacion/simulador-cotizacion';
import { Login } from './client/login/login';

import { Layout as ClientLayout } from './client/layout/layout';
import { Dashboard } from './client/dashboard/dashboard';
import { Despachos } from './client/despachos/despachos';
import { Seguimiento } from './client/seguimiento/seguimiento';
import { Historial } from './client/historial/historial';
import { Incidencias } from './client/incidencias/incidencias';
import { CentroAlertas } from './client/centro-alertas/centro-alertas';

import { Layout as AdminLayout } from './admin/layout/layout';
import { DashboardAdmin } from './admin/dashboard-admin/dashboard-admin';
import { GestionDespachos } from './admin/gestion-despachos/gestion-despachos';
import { GestionContenedores } from './admin/gestion-contenedores/gestion-contenedores';
import { GestionIncidencias } from './admin/gestion-incidencias/gestion-incidencias';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'catalogo-servicios', component: CatalogoServicios },
      { path: 'catalogo-rutas', component: CatalogoRutas },
      { path: 'simulador-cotizacion', component: SimuladorCotizacion },
    ]
  },
  { path: 'login', component: Login },
  {
    path: 'cliente',
    component: ClientLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'despachos', component: Despachos },
      { path: 'seguimiento', component: Seguimiento },
      { path: 'historial', component: Historial },
      { path: 'incidencias', component: Incidencias },
      { path: 'centro-alertas', component: CentroAlertas },
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardAdmin },
      { path: 'gestion-despachos', component: GestionDespachos },
      { path: 'gestion-contenedores', component: GestionContenedores },
      { path: 'gestion-incidencias', component: GestionIncidencias },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
```

> **`canActivate` vs `canActivateChild`**  
> `canActivate` protege la ruta padre (`/cliente`) misma. `canActivateChild` protege además cada ruta hija (`/cliente/dashboard`, `/cliente/despachos`, etc.) sin tener que repetir el guard en cada una.

---

## Paso 6.4 — Navbar de la app, sidebars y layouts privados

Estos archivos se crearon vacíos en la Parte 5 (`ng generate` los dejó con el contenido de ejemplo). Ahora les damos su versión final.

### `src/app/shared/navbar-app/navbar-app.ts`

```typescript
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar-app',
  imports: [RouterLink],
  templateUrl: './navbar-app.html',
  styleUrl: './navbar-app.css',
})
export class NavbarApp {

  constructor(private auth: Auth, private router: Router) {}

  get usuario() {
    return this.auth.obtenerUsuarioActual();
  }

  get inicio(): string {
    return this.usuario?.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
  }

  salir(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
```

### `src/app/shared/navbar-app/navbar-app.html`

```html
<nav class="navbar navbar-dark bg-if-primary px-3">
  <a class="navbar-brand fw-bold" [routerLink]="inicio">
    <i class="bi bi-truck me-2"></i>IntermodalFlow
  </a>
  <div class="d-flex align-items-center gap-3">
    <span class="text-white-50 small">{{ usuario?.nombre }}</span>
    <button type="button" class="btn btn-outline-light btn-sm" (click)="salir()">
      <i class="bi bi-box-arrow-right me-1"></i>Salir
    </button>
  </div>
</nav>
```

> **¿Por qué un `get` en vez de una propiedad normal?**  
> `usuario` e `inicio` se leen desde el `Auth` cada vez que Angular repinta la vista. Si fueran propiedades fijadas una sola vez en el constructor, no reflejarían un cambio de sesión sin recargar el componente.

### `src/app/shared/sidebar-client/sidebar-client.ts` y `.html`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-client',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css',
})
export class SidebarClient {}
```

```html
<aside class="d-flex flex-column p-3 bg-white border-end" style="min-height: calc(100vh - 56px); width: 220px;">
  <ul class="nav flex-column gap-1">
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/dashboard" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-speedometer2 me-2"></i>Dashboard
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/despachos" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-truck me-2"></i>Despachos
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/seguimiento" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-geo-alt me-2"></i>Seguimiento
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/historial" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-clock-history me-2"></i>Historial
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/incidencias" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-exclamation-triangle me-2"></i>Incidencias
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/cliente/centro-alertas" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-bell me-2"></i>Centro de alertas
      </a>
    </li>
  </ul>
</aside>
```

### `src/app/shared/sidebar-admin/sidebar-admin.ts` y `.html`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css',
})
export class SidebarAdmin {}
```

```html
<aside class="d-flex flex-column p-3 bg-white border-end" style="min-height: calc(100vh - 56px); width: 220px;">
  <ul class="nav flex-column gap-1">
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/dashboard" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-speedometer2 me-2"></i>Dashboard
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-despachos" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-truck me-2"></i>Despachos
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-contenedores" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-box-seam me-2"></i>Contenedores
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link rounded" routerLink="/admin/gestion-incidencias" routerLinkActive="active bg-if-primary text-white">
        <i class="bi bi-exclamation-triangle me-2"></i>Incidencias
      </a>
    </li>
  </ul>
</aside>
```

### Layout del cliente y del administrador

`src/app/client/layout/layout.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarClient } from '../../shared/sidebar-client/sidebar-client';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarApp, SidebarClient],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
```

`src/app/client/layout/layout.html` (idéntico para `src/app/admin/layout/layout.html`, cambiando `SidebarClient` por `SidebarAdmin`):

```html
<app-navbar-app></app-navbar-app>

<div class="d-flex">
  <app-sidebar-client></app-sidebar-client>
  <main class="flex-grow-1 p-4 bg-light">
    <router-outlet></router-outlet>
  </main>
</div>
```

`src/app/admin/layout/layout.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarAdmin } from '../../shared/sidebar-admin/sidebar-admin';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarApp, SidebarAdmin],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
```

---

## Paso 6.5 — Login real

### `src/app/client/login/login.ts`

```typescript
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario = '';
  clave = '';
  error = false;

  constructor(private auth: Auth, private router: Router) {}

  ingresar(): void {
    const usuarioAutenticado = this.auth.login(this.usuario, this.clave);

    if (!usuarioAutenticado) {
      this.error = true;
      return;
    }

    this.error = false;
    const destino = usuarioAutenticado.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
    this.router.navigate([destino]);
  }
}
```

### `src/app/client/login/login.html`

```html
<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="card shadow-sm" style="width: 380px;">
    <div class="card-body p-4">
      <div class="text-center mb-4">
        <i class="bi bi-truck fs-1 text-if-primary"></i>
        <h1 class="h4 mt-2 fw-bold text-if-primary">IntermodalFlow</h1>
        <p class="text-muted small">Ingresa tus credenciales para continuar</p>
      </div>

      @if (error) {
        <div class="alert alert-danger py-2 small">
          <i class="bi bi-exclamation-circle me-1"></i>Usuario o contraseña incorrectos.
        </div>
      }

      <form (ngSubmit)="ingresar()">
        <div class="mb-3">
          <label class="form-label" for="usuario">Usuario</label>
          <input type="text" class="form-control" id="usuario" name="usuario"
                 placeholder="usuario@empresa.com" [(ngModel)]="usuario" required>
        </div>
        <div class="mb-4">
          <label class="form-label" for="clave">Contraseña</label>
          <input type="password" class="form-control" id="clave" name="clave"
                 placeholder="••••••••" [(ngModel)]="clave" required>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-if-primary">
            <i class="bi bi-box-arrow-in-right me-1"></i>Ingresar
          </button>
        </div>
      </form>

      <div class="alert alert-info small mt-3 mb-0">
        <i class="bi bi-info-circle me-1"></i>
        Demo — cliente: <strong>cliente&#64;intermodalflow.com</strong> / <strong>cliente123</strong><br>
        Demo — admin: <strong>admin&#64;intermodalflow.com</strong> / <strong>admin123</strong>
      </div>

      <div class="text-center mt-3">
        <a routerLink="/home" class="text-muted small">← Volver al inicio</a>
      </div>
    </div>
  </div>
</div>
```

> **`(ngSubmit)` en vez de `(click)` en el botón**  
> `(ngSubmit)` se dispara al enviar el `<form>` (Enter o clic en el botón `submit`), y Angular evita el comportamiento por defecto del navegador (recargar la página). Es la forma correcta de manejar formularios, no solo el clic del botón.

---

## Paso 6.6 — Dashboard del administrador con datos reales

### `src/app/admin/dashboard-admin/dashboard-admin.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { DespachosService } from '../../core/services/despachos';
import { ContenedoresService } from '../../core/services/contenedores';
import { Incidencias } from '../../core/services/incidencias';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {

  totalDespachos = 0;
  contenedoresActivos = 0;
  incidenciasAbiertas = 0;

  constructor(
    private despachosService: DespachosService,
    private contenedoresService: ContenedoresService,
    private incidenciasService: Incidencias
  ) {}

  ngOnInit(): void {
    this.totalDespachos = this.despachosService.obtenerTodos().length;
    this.contenedoresActivos = this.contenedoresService.obtenerTodos()
      .filter(c => c.estado === 'En uso').length;
    this.incidenciasAbiertas = this.incidenciasService.obtenerTodas()
      .filter(i => i.estado === 'Abierta').length;
  }
}
```

### `src/app/admin/dashboard-admin/dashboard-admin.html`

```html
<h1 class="h3 mb-4 text-if-primary">Panel de administración</h1>

<div class="row g-3 mb-4">
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Total despachos</p>
        <p class="h3 fw-bold mb-0">{{ totalDespachos }}</p>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Contenedores en uso</p>
        <p class="h3 fw-bold mb-0">{{ contenedoresActivos }}</p>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <p class="text-muted small mb-1">Incidencias abiertas</p>
        <p class="h3 fw-bold mb-0">{{ incidenciasAbiertas }}</p>
      </div>
    </div>
  </div>
</div>
```

---

## Paso 6.7 — Las 5 páginas del cliente, completas

### Mis despachos — `src/app/client/despachos/despachos.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-despachos',
  imports: [FormsModule, NgClass],
  templateUrl: './despachos.html',
  styleUrl: './despachos.css',
})
export class Despachos implements OnInit {

  todos: Despacho[] = [];
  filtroEstado = '';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.todos = this.despachosService.obtenerTodos();
  }

  despachosFiltrados(): Despacho[] {
    return this.todos.filter(d => !this.filtroEstado || d.estado === this.filtroEstado);
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'En tránsito': return 'bg-primary';
      case 'En almacén':  return 'bg-warning text-dark';
      case 'Cargando':    return 'bg-info text-dark';
      case 'Entregado':   return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}
```

### `src/app/client/despachos/despachos.html`

```html
<h1 class="h3 mb-4 text-if-primary">Mis despachos</h1>

<div class="row g-3 align-items-end mb-3">
  <div class="col-md-4">
    <label class="form-label" for="fEstado">Filtrar por estado</label>
    <select class="form-select" id="fEstado" [(ngModel)]="filtroEstado">
      <option value="">Todos</option>
      <option>En tránsito</option>
      <option>En almacén</option>
      <option>Cargando</option>
      <option>Entregado</option>
    </select>
  </div>
</div>

<div class="card shadow-sm">
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Ruta</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (d of despachosFiltrados(); track d.codigo) {
          <tr>
            <td>{{ d.codigo }}</td>
            <td>{{ d.ruta }}</td>
            <td><span class="badge" [ngClass]="claseBadge(d.estado)">{{ d.estado }}</span></td>
          </tr>
        }
        @if (despachosFiltrados().length === 0) {
          <tr>
            <td colspan="3" class="text-center text-muted py-3">No hay despachos con ese estado.</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

### Seguimiento — `src/app/client/seguimiento/seguimiento.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

// Orden esperado del ciclo de vida de un despacho
const ORDEN_ESTADOS = ['Cargando', 'En almacén', 'En tránsito', 'Entregado'] as const;

@Component({
  selector: 'app-seguimiento',
  imports: [FormsModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento implements OnInit {

  readonly pasos = ORDEN_ESTADOS;

  despachos: Despacho[] = [];
  codigoSeleccionado = '';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.despachos = this.despachosService.obtenerTodos();
    if (this.despachos.length > 0) {
      this.codigoSeleccionado = this.despachos[0].codigo;
    }
  }

  get despachoActual(): Despacho | undefined {
    return this.despachos.find(d => d.codigo === this.codigoSeleccionado);
  }

  // Índice del estado actual dentro del ciclo de vida (para pintar los pasos ya completados)
  indicePaso(paso: string): number {
    return ORDEN_ESTADOS.indexOf(paso as typeof ORDEN_ESTADOS[number]);
  }

  indiceActual(): number {
    return this.despachoActual ? this.indicePaso(this.despachoActual.estado) : -1;
  }
}
```

### `src/app/client/seguimiento/seguimiento.html`

```html
<h1 class="h3 mb-4 text-if-primary">Seguimiento en tiempo real</h1>

<div class="card shadow-sm mb-4">
  <div class="card-body">
    <label class="form-label" for="cDespacho">Selecciona un despacho</label>
    <select class="form-select" id="cDespacho" style="max-width: 320px;" [(ngModel)]="codigoSeleccionado">
      @for (d of despachos; track d.codigo) {
        <option [value]="d.codigo">{{ d.codigo }} — {{ d.ruta }}</option>
      }
    </select>
  </div>
</div>

@if (despachoActual) {
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h6 mb-4">{{ despachoActual.ruta }}</h2>

      <div class="d-flex justify-content-between position-relative">
        @for (paso of pasos; track paso; let i = $index) {
          <div class="text-center flex-fill">
            <div class="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                 style="width: 36px; height: 36px;"
                 [class.bg-if-primary]="i <= indiceActual()"
                 [class.text-white]="i <= indiceActual()"
                 [class.bg-secondary-subtle]="i > indiceActual()">
              @if (i < indiceActual()) {
                <i class="bi bi-check-lg"></i>
              } @else {
                {{ i + 1 }}
              }
            </div>
            <p class="small mt-2 mb-0" [class.fw-bold]="i === indiceActual()" [class.text-if-primary]="i === indiceActual()">
              {{ paso }}
            </p>
          </div>
        }
      </div>
    </div>
  </div>
} @else {
  <p class="text-muted">No hay despachos registrados.</p>
}
```

> **`[class.nombre]="condicion"`** aplica (o quita) una sola clase CSS según una condición booleana — es una alternativa más ligera a `[ngClass]` cuando solo necesitas alternar 1 o 2 clases.

### Historial — `src/app/client/historial/historial.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {

  entregados: Despacho[] = [];

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.entregados = this.despachosService.obtenerEntregados();
  }
}
```

### `src/app/client/historial/historial.html`

```html
<h1 class="h3 mb-4 text-if-primary">Historial de despachos</h1>

<div class="card shadow-sm">
  <div class="card-header bg-white fw-semibold">Despachos entregados</div>
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Ruta</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (d of entregados; track d.codigo) {
          <tr>
            <td>{{ d.codigo }}</td>
            <td>{{ d.ruta }}</td>
            <td><span class="badge bg-success">{{ d.estado }}</span></td>
          </tr>
        }
        @if (entregados.length === 0) {
          <tr>
            <td colspan="3" class="text-center text-muted py-3">Aún no hay despachos entregados.</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

### Incidencias (cliente) — `src/app/client/incidencias/incidencias.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Incidencia } from '../../core/models/incidencia.model';
import { Despacho } from '../../core/models/despacho.model';
import { Incidencias as IncidenciasService } from '../../core/services/incidencias';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-incidencias',
  imports: [FormsModule, NgClass],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class Incidencias implements OnInit {

  incidencias: Incidencia[] = [];
  despachos: Despacho[] = [];

  // Campos del formulario de nueva incidencia
  despachoRelacionado = '';
  tipo: Incidencia['tipo'] = 'Retraso';
  descripcion = '';

  constructor(
    private incidenciasService: IncidenciasService,
    private despachosService: DespachosService
  ) {}

  ngOnInit(): void {
    this.despachos = this.despachosService.obtenerTodos();
    this.incidencias = this.incidenciasService.obtenerTodas();
    if (this.despachos.length > 0) {
      this.despachoRelacionado = this.despachos[0].codigo;
    }
  }

  registrar(): void {
    if (!this.descripcion.trim()) {
      return;
    }
    this.incidenciasService.crear({
      despachoRelacionado: this.despachoRelacionado,
      tipo: this.tipo,
      descripcion: this.descripcion.trim()
    });
    this.descripcion = '';
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Abierta':    return 'bg-danger';
      case 'En proceso':  return 'bg-warning text-dark';
      case 'Resuelta':    return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}
```

### `src/app/client/incidencias/incidencias.html`

```html
<h1 class="h3 mb-4 text-if-primary">Incidencias</h1>

<div class="card shadow-sm mb-4">
  <div class="card-body">
    <h2 class="h6 mb-3">Registrar nueva incidencia</h2>
    <form (ngSubmit)="registrar()">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label" for="iDespacho">Despacho relacionado</label>
          <select class="form-select" id="iDespacho" name="iDespacho" [(ngModel)]="despachoRelacionado">
            @for (d of despachos; track d.codigo) {
              <option [value]="d.codigo">{{ d.codigo }} — {{ d.ruta }}</option>
            }
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="iTipo">Tipo</label>
          <select class="form-select" id="iTipo" name="iTipo" [(ngModel)]="tipo">
            <option>Retraso</option>
            <option>Daño en carga</option>
            <option>Documentación</option>
            <option>Otro</option>
          </select>
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <button type="submit" class="btn btn-if-primary w-100">
            <i class="bi bi-plus-circle me-1"></i>Registrar
          </button>
        </div>
        <div class="col-12">
          <label class="form-label" for="iDescripcion">Descripción</label>
          <textarea class="form-control" id="iDescripcion" name="iDescripcion" rows="2"
                    placeholder="Describe brevemente lo ocurrido" [(ngModel)]="descripcion"></textarea>
        </div>
      </div>
    </form>
  </div>
</div>

<div class="card shadow-sm">
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Despacho</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (i of incidencias; track i.codigo) {
          <tr>
            <td>{{ i.codigo }}</td>
            <td>{{ i.despachoRelacionado }}</td>
            <td>{{ i.tipo }}</td>
            <td class="small text-muted">{{ i.descripcion }}</td>
            <td><span class="badge" [ngClass]="claseBadge(i.estado)">{{ i.estado }}</span></td>
          </tr>
        }
        @if (incidencias.length === 0) {
          <tr>
            <td colspan="5" class="text-center text-muted py-3">No hay incidencias registradas.</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

### Centro de alertas — `src/app/client/centro-alertas/centro-alertas.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../core/models/alerta.model';
import { AlertasService } from '../../core/services/alertas';

@Component({
  selector: 'app-centro-alertas',
  imports: [],
  templateUrl: './centro-alertas.html',
  styleUrl: './centro-alertas.css',
})
export class CentroAlertas implements OnInit {

  alertas: Alerta[] = [];

  constructor(private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.alertas = this.alertasService.obtenerTodas();
  }

  icono(tipo: string): string {
    switch (tipo) {
      case 'warning': return 'bi-exclamation-triangle-fill text-warning';
      case 'success': return 'bi-check-circle-fill text-success';
      default:        return 'bi-info-circle-fill text-info';
    }
  }
}
```

### `src/app/client/centro-alertas/centro-alertas.html`

```html
<h1 class="h3 mb-4 text-if-primary">Centro de alertas</h1>

<div class="card shadow-sm">
  <ul class="list-group list-group-flush">
    @for (a of alertas; track a.mensaje) {
      <li class="list-group-item d-flex align-items-start gap-3">
        <i class="bi {{ icono(a.tipo) }} fs-5"></i>
        <div>
          <p class="mb-0">{{ a.mensaje }}</p>
          <span class="text-muted small">{{ a.fecha }}</span>
        </div>
      </li>
    }
    @if (alertas.length === 0) {
      <li class="list-group-item text-center text-muted py-3">No hay alertas por el momento.</li>
    }
  </ul>
</div>
```

---

## Paso 6.8 — Las 3 páginas de gestión del administrador, completas

### Gestión de despachos — `src/app/admin/gestion-despachos/gestion-despachos.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-gestion-despachos',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-despachos.html',
  styleUrl: './gestion-despachos.css',
})
export class GestionDespachos implements OnInit {

  despachos: Despacho[] = [];

  // Campos del formulario de alta/edición — codigoEnEdicion === null significa "modo creación"
  codigoEnEdicion: string | null = null;
  codigo = '';
  ruta = '';
  estado: Despacho['estado'] = 'Cargando';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.recargar();
  }

  private recargar(): void {
    this.despachos = this.despachosService.obtenerTodos();
  }

  guardar(): void {
    if (!this.codigo.trim() || !this.ruta.trim()) {
      return;
    }

    if (this.codigoEnEdicion) {
      this.despachosService.actualizar(this.codigoEnEdicion, { codigo: this.codigo, ruta: this.ruta, estado: this.estado });
    } else {
      this.despachosService.crear({ codigo: this.codigo, ruta: this.ruta, estado: this.estado });
    }

    this.limpiarFormulario();
    this.recargar();
  }

  editar(despacho: Despacho): void {
    this.codigoEnEdicion = despacho.codigo;
    this.codigo = despacho.codigo;
    this.ruta = despacho.ruta;
    this.estado = despacho.estado;
  }

  eliminar(codigo: string): void {
    this.despachosService.eliminar(codigo);
    this.recargar();
  }

  limpiarFormulario(): void {
    this.codigoEnEdicion = null;
    this.codigo = '';
    this.ruta = '';
    this.estado = 'Cargando';
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'En tránsito': return 'bg-primary';
      case 'En almacén':  return 'bg-warning text-dark';
      case 'Cargando':    return 'bg-info text-dark';
      case 'Entregado':   return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}
```

### `src/app/admin/gestion-despachos/gestion-despachos.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de despachos</h1>

<div class="card shadow-sm mb-4">
  <div class="card-body">
    <h2 class="h6 mb-3">{{ codigoEnEdicion ? 'Editar despacho' : 'Nuevo despacho' }}</h2>
    <form (ngSubmit)="guardar()">
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label" for="gCodigo">Código</label>
          <input type="text" class="form-control" id="gCodigo" name="gCodigo"
                 placeholder="DSP-1006" [(ngModel)]="codigo" [disabled]="!!codigoEnEdicion" required>
        </div>
        <div class="col-md-5">
          <label class="form-label" for="gRuta">Ruta</label>
          <input type="text" class="form-control" id="gRuta" name="gRuta"
                 placeholder="Lima → Ica" [(ngModel)]="ruta" required>
        </div>
        <div class="col-md-2">
          <label class="form-label" for="gEstado">Estado</label>
          <select class="form-select" id="gEstado" name="gEstado" [(ngModel)]="estado">
            <option>Cargando</option>
            <option>En almacén</option>
            <option>En tránsito</option>
            <option>Entregado</option>
          </select>
        </div>
        <div class="col-md-2 d-flex align-items-end gap-2">
          <button type="submit" class="btn btn-if-primary flex-fill" title="Guardar">
            <i class="bi bi-check-lg"></i>
          </button>
          @if (codigoEnEdicion) {
            <button type="button" class="btn btn-outline-secondary" title="Cancelar edición" (click)="limpiarFormulario()">
              <i class="bi bi-x-lg"></i>
            </button>
          }
        </div>
      </div>
    </form>
  </div>
</div>

<div class="card shadow-sm">
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Ruta</th>
          <th>Estado</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        @for (d of despachos; track d.codigo) {
          <tr>
            <td>{{ d.codigo }}</td>
            <td>{{ d.ruta }}</td>
            <td><span class="badge" [ngClass]="claseBadge(d.estado)">{{ d.estado }}</span></td>
            <td class="text-end">
              <button type="button" class="btn btn-sm btn-outline-primary me-1" title="Editar" (click)="editar(d)">
                <i class="bi bi-pencil"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" title="Eliminar" (click)="eliminar(d.codigo)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

> **`[disabled]="!!codigoEnEdicion"`** — el doble signo `!!` convierte cualquier valor a un booleano estricto (`string | null` → `true`/`false`). Bloqueamos el campo "Código" al editar porque es la clave primaria: no debería cambiar una vez creado el registro.

### Gestión de contenedores — `src/app/admin/gestion-contenedores/gestion-contenedores.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Contenedor } from '../../core/models/contenedor.model';
import { ContenedoresService } from '../../core/services/contenedores';

@Component({
  selector: 'app-gestion-contenedores',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-contenedores.html',
  styleUrl: './gestion-contenedores.css',
})
export class GestionContenedores implements OnInit {

  contenedores: Contenedor[] = [];

  codigoEnEdicion: string | null = null;
  codigo = '';
  tipo: Contenedor['tipo'] = 'Seco';
  estado: Contenedor['estado'] = 'Disponible';
  ubicacion = '';

  constructor(private contenedoresService: ContenedoresService) {}

  ngOnInit(): void {
    this.recargar();
  }

  private recargar(): void {
    this.contenedores = this.contenedoresService.obtenerTodos();
  }

  guardar(): void {
    if (!this.codigo.trim() || !this.ubicacion.trim()) {
      return;
    }

    if (this.codigoEnEdicion) {
      this.contenedoresService.actualizar(this.codigoEnEdicion, {
        codigo: this.codigo, tipo: this.tipo, estado: this.estado, ubicacion: this.ubicacion
      });
    } else {
      this.contenedoresService.crear({
        codigo: this.codigo, tipo: this.tipo, estado: this.estado, ubicacion: this.ubicacion
      });
    }

    this.limpiarFormulario();
    this.recargar();
  }

  editar(contenedor: Contenedor): void {
    this.codigoEnEdicion = contenedor.codigo;
    this.codigo = contenedor.codigo;
    this.tipo = contenedor.tipo;
    this.estado = contenedor.estado;
    this.ubicacion = contenedor.ubicacion;
  }

  eliminar(codigo: string): void {
    this.contenedoresService.eliminar(codigo);
    this.recargar();
  }

  limpiarFormulario(): void {
    this.codigoEnEdicion = null;
    this.codigo = '';
    this.tipo = 'Seco';
    this.estado = 'Disponible';
    this.ubicacion = '';
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Disponible':    return 'bg-success';
      case 'En uso':        return 'bg-primary';
      case 'Mantenimiento': return 'bg-warning text-dark';
      default:              return 'bg-secondary';
    }
  }
}
```

### `src/app/admin/gestion-contenedores/gestion-contenedores.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de contenedores</h1>

<div class="card shadow-sm mb-4">
  <div class="card-body">
    <h2 class="h6 mb-3">{{ codigoEnEdicion ? 'Editar contenedor' : 'Nuevo contenedor' }}</h2>
    <form (ngSubmit)="guardar()">
      <div class="row g-3">
        <div class="col-md-2">
          <label class="form-label" for="tCodigo">Código</label>
          <input type="text" class="form-control" id="tCodigo" name="tCodigo"
                 placeholder="CNT-2004" [(ngModel)]="codigo" [disabled]="!!codigoEnEdicion" required>
        </div>
        <div class="col-md-2">
          <label class="form-label" for="tTipo">Tipo</label>
          <select class="form-select" id="tTipo" name="tTipo" [(ngModel)]="tipo">
            <option>Seco</option>
            <option>Refrigerado</option>
            <option>Cisterna</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label" for="tEstado">Estado</label>
          <select class="form-select" id="tEstado" name="tEstado" [(ngModel)]="estado">
            <option>Disponible</option>
            <option>En uso</option>
            <option>Mantenimiento</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="tUbicacion">Ubicación</label>
          <input type="text" class="form-control" id="tUbicacion" name="tUbicacion"
                 placeholder="Lima" [(ngModel)]="ubicacion" required>
        </div>
        <div class="col-md-2 d-flex align-items-end gap-2">
          <button type="submit" class="btn btn-if-primary flex-fill" title="Guardar">
            <i class="bi bi-check-lg"></i>
          </button>
          @if (codigoEnEdicion) {
            <button type="button" class="btn btn-outline-secondary" title="Cancelar edición" (click)="limpiarFormulario()">
              <i class="bi bi-x-lg"></i>
            </button>
          }
        </div>
      </div>
    </form>
  </div>
</div>

<div class="card shadow-sm">
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Ubicación</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        @for (c of contenedores; track c.codigo) {
          <tr>
            <td>{{ c.codigo }}</td>
            <td>{{ c.tipo }}</td>
            <td><span class="badge" [ngClass]="claseBadge(c.estado)">{{ c.estado }}</span></td>
            <td>{{ c.ubicacion }}</td>
            <td class="text-end">
              <button type="button" class="btn btn-sm btn-outline-primary me-1" title="Editar" (click)="editar(c)">
                <i class="bi bi-pencil"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" title="Eliminar" (click)="eliminar(c.codigo)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

### Gestión de incidencias — `src/app/admin/gestion-incidencias/gestion-incidencias.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Incidencia } from '../../core/models/incidencia.model';
import { Incidencias as IncidenciasService } from '../../core/services/incidencias';

@Component({
  selector: 'app-gestion-incidencias',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-incidencias.html',
  styleUrl: './gestion-incidencias.css',
})
export class GestionIncidencias implements OnInit {

  incidencias: Incidencia[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.incidencias = this.incidenciasService.obtenerTodas();
  }

  cambiarEstado(incidencia: Incidencia, nuevoEstado: Incidencia['estado']): void {
    this.incidenciasService.actualizar(incidencia.codigo, { estado: nuevoEstado });
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Abierta':    return 'bg-danger';
      case 'En proceso':  return 'bg-warning text-dark';
      case 'Resuelta':    return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}
```

### `src/app/admin/gestion-incidencias/gestion-incidencias.html`

```html
<h1 class="h3 mb-4 text-if-primary">Gestión de incidencias</h1>

<div class="card shadow-sm">
  <div class="table-responsive">
    <table class="table table-hover align-middle mb-0">
      <thead class="table-light">
        <tr>
          <th>Código</th>
          <th>Despacho</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th style="width: 200px;">Actualizar estado</th>
        </tr>
      </thead>
      <tbody>
        @for (i of incidencias; track i.codigo) {
          <tr>
            <td>{{ i.codigo }}</td>
            <td>{{ i.despachoRelacionado }}</td>
            <td>{{ i.tipo }}</td>
            <td class="small text-muted">{{ i.descripcion }}</td>
            <td><span class="badge" [ngClass]="claseBadge(i.estado)">{{ i.estado }}</span></td>
            <td>
              <select class="form-select form-select-sm" title="Actualizar estado de la incidencia"
                      [ngModel]="i.estado" (ngModelChange)="cambiarEstado(i, $event)">
                <option>Abierta</option>
                <option>En proceso</option>
                <option>Resuelta</option>
              </select>
            </td>
          </tr>
        }
        @if (incidencias.length === 0) {
          <tr>
            <td colspan="6" class="text-center text-muted py-3">No hay incidencias registradas.</td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

> **`[ngModel]` + `(ngModelChange)` por separado, en vez de `[(ngModel)]`**  
> Cuando necesitas ejecutar tu propia lógica (`cambiarEstado(...)`) además de actualizar el valor, "desempaquetas" el banana-in-a-box en sus dos partes: `[ngModel]` para mostrar el valor y `(ngModelChange)` para reaccionar al cambio.

---

**✅ Entrega de la Parte 6:**  
Ejecuta `ng serve -o`. Ingresa con `cliente@intermodalflow.com` / `cliente123` o `admin@intermodalflow.com` / `admin123`. Ninguna pantalla debe decir "En construcción". Debes poder: filtrar despachos, ver la línea de tiempo del seguimiento, ver el historial, registrar y ver incidencias, ver alertas, y en el panel admin crear/editar/eliminar despachos y contenedores, y cambiar el estado de una incidencia. Al cerrar sesión y visitar `/cliente/dashboard` directamente por la URL, debes ser redirigido a `/login`.

---

---

# PARTE 7
# Backend — Node.js, Express, TypeScript y MySQL

**Responsable:** Participante 2  
**Requiere:** Haber completado la Parte 6 (frontend 100% funcional).  
**Objetivo:** Levantar un servidor backend propio, separado del proyecto Angular, con conexión a una base de datos MySQL real.

---

## Concepto clave: ¿Por qué un backend separado?

Hasta ahora, todos los datos (despachos, incidencias, etc.) vivían **en la memoria del navegador** — se perdían al recargar la página. Un backend es un programa que corre en un servidor, guarda los datos de forma permanente en una base de datos, y expone esos datos a través de una **API REST** (un conjunto de URLs que responden JSON). Angular deja de ser dueño de los datos: ahora los *pide prestados* al backend por HTTP.

```
Angular (navegador)  ──HTTP/JSON──▶  Backend Express  ──SQL──▶  MySQL
   (Parte 9)                           (Partes 7-8)
```

Creamos el backend en una carpeta **separada** del proyecto Angular — `backend/` — porque son dos aplicaciones independientes, con su propio `package.json`, que se ejecutan con comandos distintos.

### Estructura final del backend

```
backend/
├── database/
│   └── schema.sql        ← tablas + datos de ejemplo (Paso 7.2)
├── .env                  ← tus credenciales locales (no se sube a git)
├── .env.example           ← plantilla de variables de entorno
├── package.json
├── tsconfig.json
└── src/
    ├── config/
    │   └── db.ts          ← pool de conexión a MySQL
    ├── middlewares/
    │   ├── async-handler.ts
    │   └── auth.middleware.ts
    ├── controllers/        ← lógica de cada recurso (Parte 8)
    ├── routes/             ← rutas de cada recurso (Parte 8)
    ├── app.ts              ← configuración de Express (Parte 8)
    ├── server.ts           ← arranque en local (Parte 8)
    └── lambda.ts           ← arranque en AWS Lambda (Parte 10)
```

---

## Paso 7.1 — Instalar MySQL

Descarga e instala **MySQL Community Server** desde [https://dev.mysql.com/downloads/mysql](https://dev.mysql.com/downloads/mysql) (o usa XAMPP, que ya lo incluye). Durante la instalación, anota la contraseña que le pongas al usuario `root` — la necesitarás en el Paso 7.3.

Verifica que quedó instalado abriendo **MySQL Workbench** (viene con el instalador) y conectándote con el usuario `root`.

---

## Paso 7.2 — Crear la base de datos

**Crea el archivo** `backend/database/schema.sql` — este script crea la base de datos, las tablas, y las inserta con los mismos datos de ejemplo que ya usaba el frontend en memoria (para que nada cambie visualmente al conectar el backend):

```sql
-- backend/database/schema.sql
-- Ejecuta este script completo en MySQL Workbench (o `mysql -u root -p < schema.sql`)
-- Crea la base de datos, las tablas y los datos de ejemplo (los mismos que ya usaba el frontend en memoria).

CREATE DATABASE IF NOT EXISTS intermodalflow
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE intermodalflow;

-- ── usuarios ────────────────────────────────────────────────────────────
CREATE TABLE usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  usuario       VARCHAR(120) NOT NULL UNIQUE,
  clave_hash    VARCHAR(60)  NOT NULL,
  nombre        VARCHAR(120) NOT NULL,
  rol           ENUM('cliente', 'admin') NOT NULL
);

-- Contraseñas: cliente123 / admin123 (ya hasheadas con bcrypt, 10 rounds)
INSERT INTO usuarios (usuario, clave_hash, nombre, rol) VALUES
  ('cliente@intermodalflow.com', '$2a$10$xeY9N.Ddqw3hK/hperEkOOY13JgztEPADBJFdmkyssKJ6YU5BemMW', 'Empresa Cliente SAC', 'cliente'),
  ('admin@intermodalflow.com',   '$2a$10$afGtvuoCf4s7jaC8sB25VOqC4lkhR9YoFCuDhgtzDhkILStKiedze', 'Administrador',        'admin');

-- ── despachos ───────────────────────────────────────────────────────────
CREATE TABLE despachos (
  codigo  VARCHAR(20) PRIMARY KEY,
  ruta    VARCHAR(160) NOT NULL,
  estado  ENUM('En tránsito', 'En almacén', 'Cargando', 'Entregado') NOT NULL
);

INSERT INTO despachos (codigo, ruta, estado) VALUES
  ('DSP-1001', 'Lima → Arequipa',   'En tránsito'),
  ('DSP-1002', 'Callao → Trujillo', 'En almacén'),
  ('DSP-1003', 'Lima → Cusco',      'Cargando'),
  ('DSP-1004', 'Piura → Lima',      'Entregado'),
  ('DSP-1005', 'Lima → Trujillo',   'Entregado');

-- ── incidencias ─────────────────────────────────────────────────────────
CREATE TABLE incidencias (
  codigo                VARCHAR(20) PRIMARY KEY,
  despacho_relacionado  VARCHAR(20) NOT NULL,
  tipo                  ENUM('Retraso', 'Daño en carga', 'Documentación', 'Otro') NOT NULL,
  descripcion           TEXT NOT NULL,
  estado                ENUM('Abierta', 'En proceso', 'Resuelta') NOT NULL DEFAULT 'Abierta',
  FOREIGN KEY (despacho_relacionado) REFERENCES despachos(codigo)
);

INSERT INTO incidencias (codigo, despacho_relacionado, tipo, descripcion, estado) VALUES
  ('INC-001', 'DSP-1001', 'Retraso',       'La carga salió 3 horas tarde del almacén de origen.', 'En proceso'),
  ('INC-002', 'DSP-1002', 'Documentación', 'Falta la guía de remisión firmada.',                    'Abierta'),
  ('INC-003', 'DSP-1004', 'Daño en carga', 'Se detectó humedad en dos cajas al momento de la entrega.', 'Resuelta');

-- ── alertas ─────────────────────────────────────────────────────────────
CREATE TABLE alertas (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  mensaje  VARCHAR(255) NOT NULL,
  tipo     ENUM('warning', 'info', 'success') NOT NULL,
  fecha    DATE NOT NULL
);

INSERT INTO alertas (mensaje, tipo, fecha) VALUES
  ('El despacho DSP-1001 presenta un retraso de 3 horas.', 'warning', '2026-07-01'),
  ('El despacho DSP-1004 fue entregado correctamente.',    'success', '2026-06-28'),
  ('Nueva ruta disponible: Lima → Piura.',                  'info',    '2026-06-25');

-- ── contenedores ────────────────────────────────────────────────────────
CREATE TABLE contenedores (
  codigo     VARCHAR(20) PRIMARY KEY,
  tipo       ENUM('Seco', 'Refrigerado', 'Cisterna') NOT NULL,
  estado     ENUM('Disponible', 'En uso', 'Mantenimiento') NOT NULL,
  ubicacion  VARCHAR(80) NOT NULL
);

INSERT INTO contenedores (codigo, tipo, estado, ubicacion) VALUES
  ('CNT-2001', 'Seco',        'En uso',        'Callao'),
  ('CNT-2002', 'Refrigerado', 'Disponible',    'Lima'),
  ('CNT-2003', 'Cisterna',    'Mantenimiento', 'Trujillo');

-- ── usuario de aplicación dedicado ──────────────────────────────────────
-- No uses 'root' desde el backend: crea un usuario con permisos solo sobre esta base.
CREATE USER IF NOT EXISTS 'if_app'@'localhost' IDENTIFIED BY 'CambiaEstaClave123!';
GRANT ALL PRIVILEGES ON intermodalflow.* TO 'if_app'@'localhost';
FLUSH PRIVILEGES;
```

> **¿Por qué `utf8mb4` y no `utf8`?**  
> El `utf8` "clásico" de MySQL en realidad solo soporta hasta 3 bytes por carácter y no puede representar algunos símbolos (como ciertos emojis). `utf8mb4` es el UTF-8 completo (hasta 4 bytes): con él, las tildes, la `ñ` y cualquier símbolo Unicode se guardan correctamente sin configuración adicional — a diferencia de otros motores (como SQL Server), aquí no hace falta un tipo de columna especial para texto Unicode.

> **¿Por qué las contraseñas no se guardan en texto plano?**  
> Si alguien accediera a la base de datos, vería directamente las claves de todos los usuarios. `clave_hash` guarda el resultado de pasar la contraseña por **bcrypt**, un algoritmo de un solo sentido: es fácil calcular el hash a partir de la clave, pero prácticamente imposible hacerlo al revés. Al iniciar sesión, el backend no "desencripta" el hash — vuelve a hashear la clave que escribió el usuario y compara los dos hashes (Paso 8.3).

> **¿Por qué crear el usuario `if_app` en vez de usar `root` desde el backend?**  
> `root` puede hacer *cualquier cosa* en tu servidor MySQL (crear/borrar bases, usuarios, todo). Si esa contraseña se filtrara desde un `.env` mal cuidado, comprometerías todo el servidor. `if_app` solo tiene permisos sobre la base `intermodalflow` — el daño posible queda acotado a esta aplicación.

Ejecuta el script completo en MySQL Workbench (ábrelo, pega el contenido, y presiona el botón de rayo ⚡ para ejecutarlo) o con:

```bash
mysql -u root -p < backend/database/schema.sql
```

---

## Paso 7.3 — Crear el proyecto backend

Desde la **raíz del repositorio** (fuera de `src/`), crea la carpeta y el proyecto Node:

```bash
mkdir backend
cd backend
npm init -y
```

Instala las dependencias:

```bash
npm install express mysql2 dotenv cors bcryptjs jsonwebtoken
npm install -D typescript ts-node-dev @types/express @types/node @types/cors @types/bcryptjs @types/jsonwebtoken
```

> **¿Qué hace cada paquete?**  
> - **express** — el framework que define las rutas de la API.  
> - **mysql2** — el driver que permite a Node.js hablar con MySQL (usamos su versión `/promise` para usar `async/await`).  
> - **dotenv** — carga variables de entorno (contraseñas, puertos) desde un archivo `.env` sin hardcodearlas en el código.  
> - **cors** — permite que Angular (que corre en `http://localhost:4200`, un origen distinto al del backend) pueda llamar a esta API sin que el navegador la bloquee.  
> - **bcryptjs** — hashea y compara contraseñas.  
> - **jsonwebtoken** — crea y valida los JWT de la Parte 8.  
> - **ts-node-dev** — ejecuta TypeScript directamente en desarrollo y reinicia el servidor cada vez que guardas un cambio (equivalente a `ng serve` pero para el backend).

**Reemplaza** `backend/package.json` para agregar los scripts:

```json
{
  "name": "web-app-logistico-backend",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.22.5"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^22.5.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.4"
  }
}
```

**Crea el archivo** `backend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts"]
}
```

**Crea el archivo** `backend/.gitignore`:

```
node_modules/
dist/
.env
```

---

## Paso 7.4 — Variables de entorno

**Crea el archivo** `backend/.env.example` (una plantilla que sí se sube a git):

```
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=if_app
DB_PASSWORD=
DB_NAME=intermodalflow

JWT_SECRET=cambia-esta-clave-por-una-propia
JWT_EXPIRES_IN=8h
```

Ahora **copia ese archivo a uno nuevo llamado `.env`** (este sí tiene tus datos reales y nunca se sube a git) y coloca en `DB_PASSWORD` la clave que le pusiste al usuario `if_app` en el Paso 7.2.

> **¿Por qué `.env` está en `.gitignore`?**  
> `.env` contiene secretos (contraseñas, claves de firma). Si lo subes a un repositorio, cualquiera con acceso al código los vería. `.env.example` sí se comparte porque solo documenta *qué* variables hacen falta, sin sus valores reales.

---

## Paso 7.5 — Conexión a MySQL

**Crea el archivo** `backend/src/config/db.ts`:

```typescript
// backend/src/config/db.ts
import mysql from 'mysql2/promise';

// Un pool reutiliza conexiones en vez de abrir una nueva por cada consulta —
// más rápido y evita agotar las conexiones disponibles de MySQL.
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});
```

> **¿Qué es un "pool" de conexiones?**  
> Abrir una conexión a MySQL toma tiempo. En vez de abrir/cerrar una por cada petición HTTP, el *pool* mantiene hasta 10 conexiones ya abiertas y las reparte entre las peticiones que llegan al mismo tiempo.

---

**✅ Entrega de la Parte 7:**  
La carpeta `backend/` existe con su propio `package.json`, `tsconfig.json`, `.env` (con la clave del usuario `if_app`) y `database/schema.sql` ya ejecutado en tu MySQL local. Verifica con MySQL Workbench que la base `intermodalflow` tiene sus 5 tablas con datos, y que las palabras con tildes/`ñ` se ven correctamente.

---

---

# PARTE 8
# Endpoints REST y autenticación JWT

**Responsable:** Participante 3  
**Requiere:** Haber completado la Parte 7.  
**Objetivo:** Exponer toda la lógica de negocio (despachos, incidencias, contenedores, alertas, login) como una API REST protegida con JWT.

---

## Concepto clave: ¿Qué es JWT?

Un **JWT (JSON Web Token)** es un texto firmado digitalmente que el backend entrega al hacer login exitoso. Contiene información del usuario (`usuario`, `rol`) y una firma que solo el backend puede generar (con `JWT_SECRET`). En cada petición posterior, Angular envía ese token en el header `Authorization: Bearer <token>`; el backend valida la firma sin necesidad de consultar la base de datos en cada petición — así sabemos quién hace la petición sin manejar sesiones con cookies.

```
1. POST /api/auth/login  { usuario, clave }
                              │
                              ▼
                  ¿clave coincide con el hash? ──▶ firma un JWT y lo devuelve
                              │
2. GET /api/despachos   Authorization: Bearer <token>
                              │
                              ▼
                  el middleware verifica la firma ──▶ deja pasar la petición
```

---

## Paso 8.1 — Middleware de errores asíncronos

Express 4 (la versión estable actual) **no captura automáticamente** los errores lanzados dentro de una función `async`. Si una consulta a MySQL falla y no la atrapamos, la petición del cliente se queda esperando una respuesta que nunca llega. Resolvemos esto con un wrapper reutilizable.

**Crea el archivo** `backend/src/middlewares/async-handler.ts`:

```typescript
// backend/src/middlewares/async-handler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

type ManejadorAsincrono = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Express 4 no captura los errores de una Promise rechazada dentro de un handler async:
// sin este wrapper, un fallo de MySQL dejaría la petición colgada para siempre en el navegador.
// asyncHandler atrapa ese rechazo y lo reenvía a next(), que dispara el middleware de errores de app.ts.
export function asyncHandler(fn: ManejadorAsincrono): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
```

---

## Paso 8.2 — Middleware de autenticación

**Crea el archivo** `backend/src/middlewares/auth.middleware.ts`:

```typescript
// backend/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface PayloadUsuario {
  usuario: string;
  rol: 'cliente' | 'admin';
}

// Angular envía el token en cada request gracias al interceptor (Parte 9).
// Aquí lo validamos antes de dejar pasar la petición al controlador.
export function verificarToken(req: Request, res: Response, next: NextFunction): void {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith('Bearer ')) {
    res.status(401).json({ mensaje: 'No se envió un token de autenticación.' });
    return;
  }

  const token = encabezado.substring('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as PayloadUsuario;
    (req as Request & { usuario: PayloadUsuario }).usuario = payload;
    next();
  } catch {
    res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
}
```

---

## Paso 8.3 — Controlador y ruta de autenticación

**Crea el archivo** `backend/src/controllers/auth.controller.ts`:

```typescript
// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

interface FilaUsuario extends RowDataPacket {
  id: number;
  usuario: string;
  clave_hash: string;
  nombre: string;
  rol: 'cliente' | 'admin';
}

export async function login(req: Request, res: Response): Promise<void> {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    res.status(400).json({ mensaje: 'Usuario y clave son obligatorios.' });
    return;
  }

  const [filas] = await pool.query<FilaUsuario[]>(
    'SELECT id, usuario, clave_hash, nombre, rol FROM usuarios WHERE usuario = ?',
    [usuario]
  );
  const encontrado = filas[0];

  // Comparamos siempre contra un hash (aunque no exista el usuario) para no filtrar
  // por tiempo de respuesta si el usuario existe o no.
  const claveValida = encontrado
    ? await bcrypt.compare(clave, encontrado.clave_hash)
    : await bcrypt.compare(clave, '$2a$10$invalidoinvalidoinvalidoinvalidoinvalidoinvalido');

  if (!encontrado || !claveValida) {
    res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
    return;
  }

  const payload = { usuario: encontrado.usuario, rol: encontrado.rol };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string ?? '8h'
  } as jwt.SignOptions);

  res.json({
    token,
    usuario: { usuario: encontrado.usuario, nombre: encontrado.nombre, rol: encontrado.rol }
  });
}
```

> **¿Por qué comparar contra un hash "inválido" cuando el usuario no existe?**  
> Si devolviéramos el error inmediatamente al no encontrar el usuario, alguien podría medir el tiempo de respuesta para adivinar qué correos existen (una respuesta instantánea = usuario no existe; una respuesta con el tiempo que tarda bcrypt = usuario sí existe). Comparando siempre contra *algo*, el tiempo de respuesta es parecido en ambos casos.

**Crea el archivo** `backend/src/routes/auth.routes.ts`:

```typescript
import { Router } from 'express';
import { asyncHandler } from '../middlewares/async-handler';
import { login } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/login', asyncHandler(login));
```

---

## Paso 8.4 — Controladores y rutas de los recursos

### Despachos

**Crea el archivo** `backend/src/controllers/despachos.controller.ts`:

```typescript
// backend/src/controllers/despachos.controller.ts
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export async function obtenerTodos(_req: Request, res: Response): Promise<void> {
  const [filas] = await pool.query<RowDataPacket[]>('SELECT * FROM despachos');
  res.json(filas);
}

export async function obtenerActivos(_req: Request, res: Response): Promise<void> {
  const [filas] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM despachos WHERE estado <> 'Entregado'"
  );
  res.json(filas);
}

export async function crear(req: Request, res: Response): Promise<void> {
  const { codigo, ruta, estado } = req.body;
  await pool.query(
    'INSERT INTO despachos (codigo, ruta, estado) VALUES (?, ?, ?)',
    [codigo, ruta, estado]
  );
  res.status(201).json({ codigo, ruta, estado });
}

export async function actualizar(req: Request, res: Response): Promise<void> {
  const { codigo: codigoParam } = req.params;
  const { codigo, ruta, estado } = req.body;
  await pool.query(
    'UPDATE despachos SET codigo = ?, ruta = ?, estado = ? WHERE codigo = ?',
    [codigo, ruta, estado, codigoParam]
  );
  res.json({ codigo, ruta, estado });
}

export async function eliminar(req: Request, res: Response): Promise<void> {
  const { codigo } = req.params;
  await pool.query('DELETE FROM despachos WHERE codigo = ?', [codigo]);
  res.status(204).send();
}
```

> **¿Por qué `?` en las consultas SQL en vez de meter la variable directo en el texto?**  
> Esos `?` son **parámetros preparados**: `mysql2` los reemplaza de forma segura por los valores del array. Si en cambio armáramos el SQL concatenando texto (`"...WHERE codigo = '" + codigo + "'"`), un usuario malicioso podría escribir código SQL dentro de un campo de texto y alterar la consulta — esto se llama **inyección SQL**, una de las vulnerabilidades más comunes y peligrosas en aplicaciones web.

**Crea el archivo** `backend/src/routes/despachos.routes.ts`:

```typescript
import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler';
import * as despachosController from '../controllers/despachos.controller';

export const despachosRouter = Router();

despachosRouter.use(verificarToken);

despachosRouter.get('/', asyncHandler(despachosController.obtenerTodos));
despachosRouter.get('/activos', asyncHandler(despachosController.obtenerActivos));
despachosRouter.post('/', asyncHandler(despachosController.crear));
despachosRouter.put('/:codigo', asyncHandler(despachosController.actualizar));
despachosRouter.delete('/:codigo', asyncHandler(despachosController.eliminar));
```

> **`router.use(verificarToken)`** aplica el middleware a **todas** las rutas definidas después, en este router. Así no hace falta repetirlo en cada línea.

### Incidencias

**Crea el archivo** `backend/src/controllers/incidencias.controller.ts`:

```typescript
// backend/src/controllers/incidencias.controller.ts
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export async function obtenerTodas(_req: Request, res: Response): Promise<void> {
  const [filas] = await pool.query<RowDataPacket[]>('SELECT * FROM incidencias');
  res.json(filas);
}

export async function crear(req: Request, res: Response): Promise<void> {
  const { despachoRelacionado, tipo, descripcion } = req.body;

  const [ultimo] = await pool.query<RowDataPacket[]>(
    "SELECT codigo FROM incidencias ORDER BY codigo DESC LIMIT 1"
  );
  const siguiente = ultimo[0]
    ? Number(ultimo[0].codigo.split('-')[1]) + 1
    : 1;
  const codigo = `INC-${String(siguiente).padStart(3, '0')}`;

  await pool.query(
    'INSERT INTO incidencias (codigo, despacho_relacionado, tipo, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
    [codigo, despachoRelacionado, tipo, descripcion, 'Abierta']
  );
  res.status(201).json({ codigo, despachoRelacionado, tipo, descripcion, estado: 'Abierta' });
}

export async function actualizar(req: Request, res: Response): Promise<void> {
  const { codigo } = req.params;
  const { estado } = req.body;
  await pool.query('UPDATE incidencias SET estado = ? WHERE codigo = ?', [estado, codigo]);
  res.json({ codigo, estado });
}
```

**Crea el archivo** `backend/src/routes/incidencias.routes.ts`:

```typescript
import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler';
import * as incidenciasController from '../controllers/incidencias.controller';

export const incidenciasRouter = Router();

incidenciasRouter.use(verificarToken);

incidenciasRouter.get('/', asyncHandler(incidenciasController.obtenerTodas));
incidenciasRouter.post('/', asyncHandler(incidenciasController.crear));
incidenciasRouter.put('/:codigo', asyncHandler(incidenciasController.actualizar));
```

### Contenedores

**Crea el archivo** `backend/src/controllers/contenedores.controller.ts`:

```typescript
// backend/src/controllers/contenedores.controller.ts
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export async function obtenerTodos(_req: Request, res: Response): Promise<void> {
  const [filas] = await pool.query<RowDataPacket[]>('SELECT * FROM contenedores');
  res.json(filas);
}

export async function crear(req: Request, res: Response): Promise<void> {
  const { codigo, tipo, estado, ubicacion } = req.body;
  await pool.query(
    'INSERT INTO contenedores (codigo, tipo, estado, ubicacion) VALUES (?, ?, ?, ?)',
    [codigo, tipo, estado, ubicacion]
  );
  res.status(201).json({ codigo, tipo, estado, ubicacion });
}

export async function actualizar(req: Request, res: Response): Promise<void> {
  const { codigo: codigoParam } = req.params;
  const { codigo, tipo, estado, ubicacion } = req.body;
  await pool.query(
    'UPDATE contenedores SET codigo = ?, tipo = ?, estado = ?, ubicacion = ? WHERE codigo = ?',
    [codigo, tipo, estado, ubicacion, codigoParam]
  );
  res.json({ codigo, tipo, estado, ubicacion });
}

export async function eliminar(req: Request, res: Response): Promise<void> {
  const { codigo } = req.params;
  await pool.query('DELETE FROM contenedores WHERE codigo = ?', [codigo]);
  res.status(204).send();
}
```

**Crea el archivo** `backend/src/routes/contenedores.routes.ts`:

```typescript
import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler';
import * as contenedoresController from '../controllers/contenedores.controller';

export const contenedoresRouter = Router();

contenedoresRouter.use(verificarToken);

contenedoresRouter.get('/', asyncHandler(contenedoresController.obtenerTodos));
contenedoresRouter.post('/', asyncHandler(contenedoresController.crear));
contenedoresRouter.put('/:codigo', asyncHandler(contenedoresController.actualizar));
contenedoresRouter.delete('/:codigo', asyncHandler(contenedoresController.eliminar));
```

### Alertas

**Crea el archivo** `backend/src/controllers/alertas.controller.ts`:

```typescript
// backend/src/controllers/alertas.controller.ts
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export async function obtenerTodas(_req: Request, res: Response): Promise<void> {
  const [filas] = await pool.query<RowDataPacket[]>('SELECT * FROM alertas ORDER BY fecha DESC');
  res.json(filas);
}
```

**Crea el archivo** `backend/src/routes/alertas.routes.ts`:

```typescript
import { Router, Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

// 1. Creamos el router de Express
export const alertasRouter = Router();

// 2. Definimos la función controladora (la que ya tenías)
export async function obtenerTodas(_req: Request, res: Response): Promise<void> {
  try {
    const [filas] = await pool.query<RowDataPacket[]>('SELECT * FROM alertas ORDER BY fecha DESC');
    res.json(filas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener alertas' });
  }
}

// 3. Asociamos la función a la ruta GET "/"
alertasRouter.get('/', obtenerTodas);
```

---

## Paso 8.5 — Ensamblar la aplicación Express

**Crea el archivo** `backend/src/app.ts`:

```typescript
// backend/src/app.ts
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { despachosRouter } from './routes/despachos.routes';
import { incidenciasRouter } from './routes/incidencias.routes';
import { contenedoresRouter } from './routes/contenedores.routes';
import { alertasRouter } from './routes/alertas.routes';

export const app = express();

app.use(cors());          // permite que Angular (otro origen/puerto) llame a esta API
app.use(express.json());  // parsea el body de las peticiones como JSON

// Ruta pública para comprobar que el servidor está vivo sin tocar la base de datos
app.get('/api/health', (_req, res) => {
  res.json({ estado: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/despachos', despachosRouter);
app.use('/api/incidencias', incidenciasRouter);
app.use('/api/contenedores', contenedoresRouter);
app.use('/api/alertas', alertasRouter);

// Middleware de errores: Express lo reconoce porque declara 4 parámetros.
// Cualquier error pasado a next(err) —incluidos los de MySQL— termina aquí en vez de colgar la petición.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor.' });
});
```

**Crea el archivo** `backend/src/server.ts`:

```typescript
// backend/src/server.ts
import 'dotenv/config';
import { app } from './app';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`API de IntermodalFlow escuchando en http://localhost:${PORT}`);
});
```

> **¿Por qué separar `app.ts` de `server.ts`?**  
> `app.ts` define *qué* hace la API (rutas y middlewares) sin arrancar nada. `server.ts` es el único archivo que realmente pone al servidor a escuchar un puerto. Esta separación permite, por ejemplo, reutilizar `app` en pruebas automatizadas sin tener que levantar un servidor real — y es exactamente lo que reutilizaremos para desplegar en AWS Lambda (Parte 10), donde no hay un puerto que escuchar.

---

## Paso 8.6 — Probar la API

Levanta el servidor:

```bash
cd backend
npm run dev
```

Deberías ver `API de IntermodalFlow escuchando en http://localhost:3000`. Prueba estos comandos en otra terminal (o con Postman/Thunder Client):

```bash
curl http://localhost:3000/api/health
```

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"usuario\":\"admin@intermodalflow.com\",\"clave\":\"admin123\"}"
```

Copia el `token` que te devuelve el login y pruébalo contra una ruta protegida:

```bash
curl http://localhost:3000/api/despachos -H "Authorization: Bearer PEGA_AQUI_EL_TOKEN"
```

Si llamas a `/api/despachos` **sin** el header `Authorization`, debes recibir `401 No se envió un token de autenticación.`

---

**✅ Entrega de la Parte 8:**  
`npm run dev` levanta el servidor sin errores. `/api/health` responde `{"estado":"ok"}`. El login con las credenciales de prueba devuelve un token JWT. Las rutas de despachos/incidencias/contenedores/alertas devuelven `401` sin token y los datos reales (los del `schema.sql`) con un token válido.

---

---

# PARTE 9
# Consumir la API REST desde Angular

**Responsable:** Participante 4  
**Requiere:** Haber completado la Parte 8 (backend corriendo en `http://localhost:3000`).  
**Objetivo:** Reemplazar los servicios en memoria de Angular por llamadas HTTP reales al backend, manteniendo el mismo comportamiento visual para el usuario.

---

## Concepto clave: de datos síncronos a Observables

Hasta la Parte 6, `despachosService.obtenerTodos()` devolvía un **array directamente** — la operación era instantánea porque los datos vivían en memoria. Una petición HTTP, en cambio, tarda un tiempo indeterminado (la red, el servidor, la base de datos). Angular representa ese "dato que llegará en el futuro" con un **`Observable`**, y el componente se **suscribe** a él para reaccionar cuando el dato finalmente llega:

```typescript
// Antes (Parte 6) — síncrono
this.todos = this.despachosService.obtenerTodos();

// Ahora (Parte 9) — asíncrono
this.despachosService.obtenerTodos().subscribe(despachos => this.todos = despachos);
```

---

## Paso 9.1 — Configurar los `environments`

Angular permite definir variables distintas para desarrollo y producción (por ejemplo, la URL de la API), y sustituirlas automáticamente al compilar.

**Crea el archivo** `src/environments/environment.ts`:

```typescript
// src/environments/environment.ts — usado en desarrollo (ng serve)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**Crea el archivo** `src/environments/environment.prod.ts`:

```typescript
// src/environments/environment.prod.ts — usado en producción (ng build)
// La URL se reemplaza por la de API Gateway al desplegar en AWS (ver Parte 10).
export const environment = {
  production: true,
  apiUrl: 'https://TU-ID-DE-API-GATEWAY.execute-api.us-east-1.amazonaws.com/api'
};
```

En `angular.json`, dentro de `architect.build.configurations.production`, agrega `fileReplacements` (antes del array `budgets` que ya existía):

```json
"production": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.prod.ts"
    }
  ],
  "budgets": [
    ...
  ]
}
```

> **¿Qué hace `fileReplacements`?**  
> Le dice al compilador de Angular: "cuando construyas para producción (`ng build`), reemplaza físicamente el archivo `environment.ts` por `environment.prod.ts` antes de compilar". El resto del código sigue importando `environment.ts` de forma normal — nunca necesita saber cuál de los dos archivos terminó usando.

---

## Paso 9.2 — Interceptor JWT

Un **interceptor** es una función que Angular ejecuta para **toda** petición HTTP saliente. Lo usamos para adjuntar automáticamente el token guardado, sin que cada servicio tenga que acordarse de hacerlo.

**Crea el archivo** `src/app/core/interceptors/auth.interceptor.ts`:

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

// Un interceptor funcional se ejecuta para TODA petición HTTP saliente.
// Aquí adjuntamos el JWT guardado en localStorage, así ningún componente
// tiene que acordarse de enviarlo manualmente.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Auth).obtenerToken();

  if (!token) {
    return next(req);
  }

  const peticionConToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(peticionConToken);
};
```

---

## Paso 9.3 — Registrar `HttpClient` y el interceptor

Reemplaza `src/app/app.config.ts`:

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

> **`provideHttpClient(withInterceptors([...]))`** es la forma moderna (basada en funciones, sin `NgModule`) de habilitar `HttpClient` en toda la app y registrar los interceptores que debe usar.

---

## Paso 9.4 — Reescribir los servicios con `HttpClient`

### `src/app/core/services/auth.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

interface RespuestaLogin {
  token: string;
  usuario: Usuario;
}

const CLAVE_TOKEN = 'if_token';
const CLAVE_USUARIO = 'if_usuario';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly url = `${environment.apiUrl}/auth`;
  private usuarioActual: Usuario | null = this.leerUsuarioGuardado();

  constructor(private http: HttpClient) {}

  // Devuelve un Observable porque el login ahora es una petición HTTP asíncrona
  // al backend (antes era una simple búsqueda en un array en memoria).
  login(usuario: string, clave: string): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.url}/login`, { usuario, clave }).pipe(
      tap(respuesta => {
        this.usuarioActual = respuesta.usuario;
        localStorage.setItem(CLAVE_TOKEN, respuesta.token);
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(respuesta.usuario));
      })
    );
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
  }

  estaAutenticado(): boolean {
    return localStorage.getItem(CLAVE_TOKEN) !== null;
  }

  obtenerToken(): string | null {
    return localStorage.getItem(CLAVE_TOKEN);
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem(CLAVE_USUARIO);
    return guardado ? JSON.parse(guardado) : null;
  }
}
```

> **¿Qué hace `.pipe(tap(...))`?**  
> `tap` ejecuta un "efecto secundario" (guardar en `localStorage`) sin transformar el valor que fluye por el Observable — a diferencia de `map`, que sí lo transformaría. Es el lugar correcto para reaccionar a una respuesta sin alterarla.

### `src/app/core/services/despachos.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Despacho } from '../models/despacho.model';

@Injectable({
  providedIn: 'root'
})
export class DespachosService {

  private readonly url = `${environment.apiUrl}/despachos`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Despacho[]> {
    return this.http.get<Despacho[]>(this.url);
  }

  obtenerActivos(): Observable<Despacho[]> {
    return this.http.get<Despacho[]>(`${this.url}/activos`);
  }

  crear(despacho: Despacho): Observable<Despacho> {
    return this.http.post<Despacho>(this.url, despacho);
  }

  actualizar(codigo: string, cambios: Partial<Despacho>): Observable<Despacho> {
    return this.http.put<Despacho>(`${this.url}/${codigo}`, cambios);
  }

  eliminar(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${codigo}`);
  }
}
```

> **Nota:** `obtenerEntregados()` y `obtenerPorCodigo()` (que existían en la Parte 6) ya no forman parte del servicio — no tiene sentido crear un endpoint nuevo en el backend solo para filtrar una lista que ya tenemos en el navegador. En su lugar, `Historial` y `Seguimiento` filtran el array que reciben de `obtenerTodos()` (Paso 9.5). Es una simplificación, no una limitación.

### `src/app/core/services/incidencias.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Incidencia } from '../models/incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class Incidencias {

  private readonly url = `${environment.apiUrl}/incidencias`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url);
  }

  crear(datos: Omit<Incidencia, 'codigo' | 'estado'>): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.url, datos);
  }

  actualizar(codigo: string, cambios: Partial<Incidencia>): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.url}/${codigo}`, cambios);
  }
}
```

### `src/app/core/services/alertas.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private readonly url = `${environment.apiUrl}/alertas`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.url);
  }
}
```

### `src/app/core/services/contenedores.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contenedor } from '../models/contenedor.model';

@Injectable({
  providedIn: 'root'
})
export class ContenedoresService {

  private readonly url = `${environment.apiUrl}/contenedores`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.url);
  }

  crear(contenedor: Contenedor): Observable<Contenedor> {
    return this.http.post<Contenedor>(this.url, contenedor);
  }

  actualizar(codigo: string, cambios: Partial<Contenedor>): Observable<Contenedor> {
    return this.http.put<Contenedor>(`${this.url}/${codigo}`, cambios);
  }

  eliminar(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${codigo}`);
  }
}
```

---

## Paso 9.5 — Adaptar los componentes a `subscribe()`

El patrón se repite en todos los componentes: donde antes asignabas el resultado directamente, ahora te suscribes.

### `login.ts`

```typescript
ingresar(): void {
  this.auth.login(this.usuario, this.clave).subscribe({
    next: (respuesta) => {
      this.error = false;
      const destino = respuesta.usuario.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
      this.router.navigate([destino]);
    },
    error: () => {
      this.error = true;
    }
  });
}
```

> El segundo objeto de `subscribe({ next, error })` maneja también el caso de **error** — con datos en memoria esto no existía, pero una petición HTTP puede fallar (red caída, credenciales inválidas → 401, servidor apagado).

### `client/dashboard/dashboard.ts`, `client/despachos/despachos.ts`

```typescript
ngOnInit(): void {
  this.despachosService.obtenerActivos().subscribe(despachos => this.despachosActivos = despachos);
}
```

```typescript
ngOnInit(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => this.todos = despachos);
}
```

### `client/seguimiento/seguimiento.ts`

```typescript
ngOnInit(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => {
    this.despachos = despachos;
    if (despachos.length > 0) {
      this.codigoSeleccionado = despachos[0].codigo;
    }
  });
}

get despachoActual(): Despacho | undefined {
  return this.despachos.find(d => d.codigo === this.codigoSeleccionado);
}
```

> `despachoActual` ya no llama al servicio — filtra el array que ya está en memoria del componente. Si volviera a llamar a `obtenerPorCodigo()` como Observable dentro de un `get`, Angular dispararía una petición HTTP nueva en cada ciclo de detección de cambios.

### `client/historial/historial.ts`

```typescript
ngOnInit(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => {
    this.entregados = despachos.filter(d => d.estado === 'Entregado');
  });
}
```

### `client/incidencias/incidencias.ts`

```typescript
ngOnInit(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => {
    this.despachos = despachos;
    if (despachos.length > 0) {
      this.despachoRelacionado = despachos[0].codigo;
    }
  });
  this.cargarIncidencias();
}

private cargarIncidencias(): void {
  this.incidenciasService.obtenerTodas().subscribe(incidencias => this.incidencias = incidencias);
}

registrar(): void {
  if (!this.descripcion.trim()) {
    return;
  }
  this.incidenciasService.crear({
    despachoRelacionado: this.despachoRelacionado,
    tipo: this.tipo,
    descripcion: this.descripcion.trim()
  }).subscribe(() => {
    this.descripcion = '';
    this.cargarIncidencias();
  });
}
```

> Tras crear la incidencia, volvemos a pedir la lista completa (`cargarIncidencias()`) en vez de insertar el objeto manualmente en el array local — así el componente siempre muestra lo que realmente quedó guardado en la base de datos (con el código autogenerado por el backend).

### `client/centro-alertas/centro-alertas.ts`

```typescript
ngOnInit(): void {
  this.alertasService.obtenerTodas().subscribe(alertas => this.alertas = alertas);
}
```

### `admin/dashboard-admin/dashboard-admin.ts`

```typescript
ngOnInit(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => this.totalDespachos = despachos.length);

  this.contenedoresService.obtenerTodos().subscribe(contenedores => {
    this.contenedoresActivos = contenedores.filter(c => c.estado === 'En uso').length;
  });

  this.incidenciasService.obtenerTodas().subscribe(incidencias => {
    this.incidenciasAbiertas = incidencias.filter(i => i.estado === 'Abierta').length;
  });
}
```

### `admin/gestion-despachos/gestion-despachos.ts` (patrón CRUD con recarga)

```typescript
private recargar(): void {
  this.despachosService.obtenerTodos().subscribe(despachos => this.despachos = despachos);
}

guardar(): void {
  if (!this.codigo.trim() || !this.ruta.trim()) {
    return;
  }

  const datos = { codigo: this.codigo, ruta: this.ruta, estado: this.estado };
  const operacion = this.codigoEnEdicion
    ? this.despachosService.actualizar(this.codigoEnEdicion, datos)
    : this.despachosService.crear(datos);

  operacion.subscribe(() => {
    this.limpiarFormulario();
    this.recargar();
  });
}

eliminar(codigo: string): void {
  this.despachosService.eliminar(codigo).subscribe(() => this.recargar());
}
```

> El mismo patrón (`recargar()` tras cada operación exitosa) se aplica igual en `admin/gestion-contenedores/gestion-contenedores.ts`, reemplazando `despachosService` por `contenedoresService` y los campos correspondientes.

### `admin/gestion-incidencias/gestion-incidencias.ts`

```typescript
ngOnInit(): void {
  this.cargar();
}

private cargar(): void {
  this.incidenciasService.obtenerTodas().subscribe(incidencias => this.incidencias = incidencias);
}

cambiarEstado(incidencia: Incidencia, nuevoEstado: Incidencia['estado']): void {
  this.incidenciasService.actualizar(incidencia.codigo, { estado: nuevoEstado }).subscribe(() => this.cargar());
}
```

Los archivos `.html` de todos estos componentes **no cambian** — solo cambió cómo el componente obtiene los datos, no cómo la plantilla los muestra. Esa separación entre "cómo llega el dato" y "cómo se pinta" es exactamente lo que hace que Angular sea mantenible.

---

**✅ Entrega de la Parte 9:**  
Con el backend corriendo (`npm run dev` en `backend/`) y el frontend corriendo (`ng serve -o` en la raíz), inicia sesión con `admin@intermodalflow.com` / `admin123`. Todos los datos que veas (despachos, incidencias, contenedores, alertas) ahora vienen de MySQL — si detienes el backend, el frontend debe mostrar listas vacías o quedarse cargando en vez de romperse. Verifica en la pestaña **Network** del navegador que cada petición a `/api/...` incluye el header `Authorization: Bearer ...`.

---

---

# PARTE 10
# Despliegue en AWS — RDS, Lambda y API Gateway

**Responsable:** Participante 5  
**Requiere:** Haber completado la Parte 9. Necesitas una cuenta de AWS (la capa gratuita alcanza para este proyecto).  
**Objetivo:** Llevar el backend de `localhost` a la nube: la base de datos a **RDS**, el servidor Express a una función **Lambda**, y exponerla al público con **API Gateway**.

---

## Concepto clave: ¿por qué estos tres servicios?

| Servicio | Reemplaza a... | Por qué |
|----------|-----------------|---------|
| **Amazon RDS** | Tu MySQL local | Un motor de base de datos administrado por AWS: se encarga de backups, parches y disponibilidad. RDS soporta motores relacionales (MySQL, PostgreSQL, MariaDB, SQL Server) — por eso usamos MySQL y no una base NoSQL como MongoDB, que en AWS es un servicio distinto (DocumentDB). |
| **AWS Lambda** | `node server.js` corriendo todo el tiempo | En vez de mantener un servidor encendido 24/7, Lambda ejecuta tu código **solo cuando llega una petición** y cobra por milisegundos de uso. Ideal para una app académica con tráfico bajo/intermitente. |
| **Amazon API Gateway** | El puerto `3000` abierto en tu máquina | Es la "puerta de entrada" HTTP pública que recibe las peticiones de Angular y las reenvía a la Lambda. Sin él, una Lambda no tiene URL propia a la que Angular pueda llamar. |

```
Angular (build de producción)
        │  HTTPS
        ▼
  API Gateway  (URL pública)
        │  invoca
        ▼
  AWS Lambda   (tu código Express, sin cambios de lógica)
        │  mysql2
        ▼
  Amazon RDS (MySQL)
```

---

## Paso 10.1 — Crear la instancia RDS MySQL

**Por consola (AWS Console → RDS → Create database):**

1. Motor: **MySQL**.
2. Plantilla: **Free tier**.
3. Identificador: `intermodalflow-db`.
4. Usuario maestro: `admin`, y define una contraseña (guárdala).
5. Tipo de instancia: `db.t3.micro` (incluida en la capa gratuita).
6. Conectividad → **Public access: Yes** (solo para esta práctica académica; en un entorno real se deja `No` y se accede desde una VPC privada).
7. En **VPC security group**, crea uno nuevo o edita el existente para permitir el puerto **3306** entrante desde tu IP (y luego, en el Paso 10.3, desde Lambda).
8. Crea la base de datos y espera unos minutos a que el estado pase a "Available".

**Alternativa por AWS CLI:**

```bash
aws rds create-db-instance \
  --db-instance-identifier intermodalflow-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password "TU_CLAVE_SEGURA" \
  --allocated-storage 20 \
  --publicly-accessible
```

---

## Paso 10.2 — Migrar el schema a RDS

Copia el **endpoint** de la instancia (Console → RDS → tu instancia → "Endpoint & port") y ejecuta el mismo `schema.sql` de la Parte 7, ahora apuntando a RDS:

```bash
mysql -h TU-ENDPOINT.rds.amazonaws.com -u admin -p < backend/database/schema.sql
```

Actualiza tu `backend/.env` **local** (para pruebas) con esos datos, o crea variables de entorno separadas para la Lambda (Paso 10.4):

```
DB_HOST=TU-ENDPOINT.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=TU_CLAVE_SEGURA
DB_NAME=intermodalflow
```

> **Nota:** en la Parte 7 creamos el usuario `if_app` para no usar una cuenta con permisos totales desde el backend. En RDS puedes repetir el mismo patrón: conéctate primero con `admin` (el usuario maestro) y ejecuta el mismo bloque `CREATE USER` / `GRANT` del final del `schema.sql` contra el endpoint de RDS, y usa esas credenciales (no las de `admin`) en el `.env` de la Lambda.

---

## Paso 10.3 — Adaptar Express para correr como Lambda

Una función Lambda no "escucha" un puerto — recibe un evento y devuelve una respuesta. El paquete `serverless-http` envuelve una app Express existente y la convierte en un handler compatible con Lambda **sin reescribir ninguna ruta ni controlador**.

```bash
cd backend
npm install serverless-http
```

**Crea el archivo** `backend/src/lambda.ts`:

```typescript
// backend/src/lambda.ts
import 'dotenv/config';
import serverless from 'serverless-http';
import { app } from './app';

// Reutiliza exactamente la misma app de Express (rutas, middlewares, controladores)
// que ya usa server.ts en local — por eso separamos app.ts de server.ts en la Parte 8.
export const handler = serverless(app);
```

> `server.ts` (con `app.listen(...)`) lo sigues usando para desarrollo local. `lambda.ts` es el punto de entrada que AWS ejecuta en la nube. Ambos comparten la misma `app` — la lógica de negocio no se duplica.

---

## Paso 10.4 — Crear la función Lambda

Compila el proyecto y empaqueta el `dist/` junto con `node_modules/`:

```bash
npm run build
```

**Por consola (AWS Console → Lambda → Create function):**

1. Nombre: `intermodalflow-api`.
2. Runtime: **Node.js 22.x**.
3. Sube un `.zip` con el contenido de `backend/dist/`, `backend/node_modules/` y `backend/package.json`.
4. Handler: `lambda.handler` (archivo `lambda.js` compilado, propiedad `handler`).
5. En **Configuration → Environment variables**, agrega `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `JWT_EXPIRES_IN` (los mismos valores de tu `.env`, nunca los subas dentro del `.zip`).
6. En **Configuration → VPC**, conecta la Lambda a la misma VPC que tu instancia RDS, para que puedan comunicarse de forma privada.

> **¿Por qué las variables de entorno van en la consola y no en el código?**  
> Igual que en local: nunca se hardcodean secretos. La diferencia es que en AWS, en vez de un archivo `.env`, esos valores viven cifrados en la configuración de la Lambda.

---

## Paso 10.5 — Exponerla con API Gateway

**Por consola (AWS Console → API Gateway → Create API → HTTP API):**

1. Integración: selecciona la Lambda `intermodalflow-api`.
2. Ruta: `ANY /{proxy+}` — reenvía **cualquier** método y ruta (`/api/despachos`, `/api/auth/login`, etc.) tal cual a la Lambda, que internamente usa Express para decidir qué controlador ejecutar.
3. Despliega un **stage** (por ejemplo `prod`).
4. Copia la **Invoke URL** que te entrega API Gateway (algo como `https://abc123.execute-api.us-east-1.amazonaws.com`).

---

## Paso 10.6 — Apuntar Angular a la API en la nube

Actualiza `src/environments/environment.prod.ts` con la URL real de tu API Gateway:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://abc123.execute-api.us-east-1.amazonaws.com/api'
};
```

Genera el build de producción (usa automáticamente este archivo gracias al `fileReplacements` de la Parte 9):

```bash
ng build
```

El contenido de `dist/web_app_logistico/` ya está listo para subirse a un hosting estático (S3 + CloudFront, Netlify, Vercel, etc.) — ese despliegue queda fuera del alcance de esta guía, pero el frontend compilado ya apunta a tu API real en AWS.

---

## Paso 10.7 — Notas de seguridad para producción real

Esta guía prioriza que el equipo vea el flujo completo funcionando. Para un entorno de producción real (fuera del alcance académico), como siguiente paso deberías:

- Poner el **Security Group** de RDS en `Public access: No` y permitir tráfico **solo** desde el Security Group de la Lambda (no desde "cualquier IP").
- Rotar el `JWT_SECRET` y guardarlo en **AWS Secrets Manager** en vez de una variable de entorno plana.
- Restringir `cors()` en `app.ts` a la URL exacta de tu frontend, en vez de aceptar cualquier origen.

---

**✅ Entrega de la Parte 10:**  
La API responde en la URL de API Gateway (pruébalo con `curl https://TU-URL/api/health`). El frontend compilado con `ng build` usa esa URL. Con esto, **IntermodalFlow** queda completo de punta a punta: frontend Angular + backend Express/TypeScript + base de datos MySQL en AWS RDS, todo servido a través de Lambda y API Gateway.

---

---

# PARTE 11
# Enriquecer la zona pública: carruseles y animaciones al hacer scroll

**Responsable:** Participante 1  
**Requiere:** Haber completado la Parte 10.  
**Objetivo:** Dar más realismo a las páginas públicas (Home, catálogo de servicios, catálogo de rutas) con un carrusel en el hero, una línea de tiempo y estadísticas que se animan al hacer scroll, y un carrusel de testimonios — todo con una directiva reutilizable, sin librerías externas de animación.

---

## Concepto clave: ¿Qué es el Intersection Observer?

`IntersectionObserver` es una API nativa del navegador (no es de Angular) que te avisa cuándo un elemento entra o sale de la pantalla, **sin** tener que escuchar el evento `scroll` manualmente y calcular posiciones a mano (esa técnica antigua era costosa en rendimiento porque se ejecuta decenas de veces por segundo). Le "suscribes" un elemento, y el navegador te notifica una sola vez cuando cruza el umbral que definas.

```
┌───────────────────────────┐
│      Viewport (pantalla)    │
│                           │
│   ┌───────────────┐       │  ← el elemento aún no es visible:
│   │   Sección X    │       │     no pasa nada
│   └───────────────┘       │
└───────────────────────────┘
              │  usuario hace scroll ↓
              ▼
┌───────────────────────────┐
│   ┌───────────────┐       │  ← el elemento entra en pantalla:
│   │   Sección X    │       │     el observer dispara el callback
│   └───────────────┘       │     → aquí agregamos la clase "is-visible"
│      Viewport              │
└───────────────────────────┘
```

## Concepto clave: esta app es zoneless — por qué importan los Signals aquí

Si revisas `package.json`, no existe la dependencia `zone.js`. Eso significa que esta aplicación es **zoneless**: Angular no repinta la vista automáticamente cada vez que corre cualquier callback asíncrono (como hacía con `zone.js` en versiones anteriores). Angular solo sabe que debe repintar cuando el cambio ocurre a través de algo que el framework "escucha": un evento enlazado en el template (`(click)`, `(ngModelChange)`...), una petición de `HttpClient`, o un **signal**.

Un `setInterval` corriendo por su cuenta y mutando una propiedad normal (`this.contador = 5`) **no** dispara un repintado en una app zoneless — el valor cambia en memoria, pero la pantalla se queda congelada. Por eso, en el Paso 11.3, los contadores de la sección de estadísticas se implementan con `signal()`: cuando llamas a `.set(...)`, Angular sí se entera y actualiza la vista, sin importar si zone.js existe o no.

---

## Paso 11.1 — Directiva reutilizable de scroll reveal

**Crea el archivo** `src/app/shared/directives/scroll-reveal.ts`:

```typescript
import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollReveal implements AfterViewInit, OnDestroy {

  // Se dispara una sola vez, la primera vez que el elemento entra en el viewport
  @Output() appScrollRevealVisible = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Arranca oculto/desplazado; la clase "is-visible" (definida en styles.css)
    // activa la transición cuando el elemento entra en pantalla.
    this.el.nativeElement.classList.add('scroll-reveal');

    this.observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            this.el.nativeElement.classList.add('is-visible');
            this.appScrollRevealVisible.emit();
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.2 } // se considera "visible" cuando el 20% del elemento entra en pantalla
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // Evita que el observer siga escuchando scroll después de destruir el componente
    this.observer?.disconnect();
  }
}
```

> **¿Por qué es una directiva de atributo (`[appScrollReveal]`) y no un componente?**  
> No necesitamos un template ni un tag HTML nuevo — solo queremos **añadirle comportamiento** a un `<section>` o `<div>` que ya existe. Ese es exactamente el caso de uso de una directiva de atributo: se aplica como un atributo más (`<section appScrollReveal>`) sobre cualquier elemento.

> **¿Por qué `unobserve` después de la primera vez?**  
> No necesitamos que la animación se repita cada vez que el usuario sube y baja la página — solo la primera vez que la sección aparece. `unobserve` apaga el listener para ese elemento en particular sin afectar a los demás.

---

## Paso 11.2 — Clases CSS de la animación

**Agrega esto al final de** `src/styles.css` (no borres nada de lo que ya había):

```css
/* Animación de aparición al hacer scroll — usada por la directiva appScrollReveal */
.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

> **¿Por qué la transición vive en CSS y no se calcula en TypeScript?**  
> El navegador puede animar `opacity` y `transform` usando la GPU, de forma más fluida que si moviéramos el elemento a mano con JavaScript en cada frame. La directiva solo decide **cuándo** agregar la clase; el **cómo** se anima queda en CSS, que es la herramienta correcta para eso.

---

## Paso 11.3 — Enriquecer la página Home

Reemplaza `src/app/public/home/home.ts`:

```typescript
import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollReveal } from '../../shared/directives/scroll-reveal';

interface Contadores {
  despachos: WritableSignal<number>;
  ciudades: WritableSignal<number>;
  entregas: WritableSignal<number>;
  anios: WritableSignal<number>;
}

interface PasoProceso {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface Testimonio {
  autor: string;
  empresa: string;
  comentario: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollReveal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {

  readonly pasosProceso: PasoProceso[] = [
    { icono: 'bi-calculator',      titulo: '1. Cotiza',   descripcion: 'Simula el costo de tu envío en segundos, sin registrarte.' },
    { icono: 'bi-clipboard-check', titulo: '2. Confirma', descripcion: 'Programa la recolección de tu carga en el origen que elijas.' },
    { icono: 'bi-geo-alt',         titulo: '3. Rastrea',  descripcion: 'Sigue el estado de tu despacho en tiempo real desde tu cuenta.' },
    { icono: 'bi-box-seam',        titulo: '4. Recibe',   descripcion: 'Tu carga llega a destino con confirmación de entrega.' }
  ];

  readonly testimonios: Testimonio[] = [
    { autor: 'María Delgado', empresa: 'Textiles del Sur SAC', comentario: 'Desde que usamos IntermodalFlow, sabemos exactamente dónde está cada despacho sin tener que llamar a nadie.' },
    { autor: 'Jorge Huamán',  empresa: 'Agroexport Perú',      comentario: 'La cadena de frío certificada nos dio la confianza para exportar productos perecibles sin sobresaltos.' },
    { autor: 'Lucía Ramos',   empresa: 'Comercial Andina EIRL', comentario: 'El simulador de cotización nos ahorra horas de cotizar por correo con distintos transportistas.' }
  ];

  // Valores que se muestran en la sección de estadísticas — arrancan en 0
  // y se animan hasta su valor final cuando la sección entra en pantalla.
  // Son signals (no propiedades simples) porque esta app es zoneless: sin zone.js,
  // Angular solo repinta la vista cuando algo cambia a través de una señal (u otro
  // mecanismo que Angular conoce), no cuando un setInterval muta una propiedad a secas.
  readonly contadores: Contadores = {
    despachos: signal(0),
    ciudades: signal(0),
    entregas: signal(0),
    anios: signal(0)
  };

  private contadoresIniciados = false;
  private intervalos: ReturnType<typeof setInterval>[] = [];

  // Se llama una sola vez, cuando appScrollReveal detecta que la sección de stats es visible
  iniciarContadores(): void {
    if (this.contadoresIniciados) {
      return;
    }
    this.contadoresIniciados = true;

    this.animarContador('despachos', 1280);
    this.animarContador('ciudades', 24);
    this.animarContador('entregas', 98);
    this.animarContador('anios', 15);
  }

  private animarContador(clave: keyof Contadores, destino: number): void {
    const pasos = 60;
    const duracionMs = 1500;
    const incremento = destino / pasos;
    let actual = 0;

    const intervalo = setInterval(() => {
      actual += incremento;
      if (actual >= destino) {
        this.contadores[clave].set(destino);
        clearInterval(intervalo);
      } else {
        this.contadores[clave].set(Math.round(actual));
      }
    }, duracionMs / pasos);

    this.intervalos.push(intervalo);
  }

  ngOnDestroy(): void {
    // Limpia cualquier animación de contador que siga corriendo si el usuario
    // navega a otra página antes de que termine.
    this.intervalos.forEach(intervalo => clearInterval(intervalo));
  }
}
```

> **¿Por qué `animarContador` recibe `clave: keyof Contadores`?**  
> `keyof Contadores` es el tipo `'despachos' | 'ciudades' | 'entregas' | 'anios'` — TypeScript no te deja llamar a `animarContador('foo', 10)` porque `'foo'` no es una de las llaves reales del objeto. Es la misma idea que ya usamos en `Incidencia['tipo']` en partes anteriores, aplicada a un objeto en vez de a un union type.

Reemplaza `src/app/public/home/home.html`:

```html
<!-- Hero: carrusel de Bootstrap (funciona con bootstrap.bundle.min.js, ya cargado desde la Parte 1) -->
<div id="heroCarousel" class="carousel slide bg-if-primary text-white" data-bs-ride="carousel" data-bs-interval="6000">
  <div class="carousel-inner">

    <div class="carousel-item active">
      <div class="container py-5">
        <div class="row align-items-center g-4 py-4">
          <div class="col-lg-7">
            <h1 class="fw-bold mb-3">Sigue tus despachos en un solo lugar</h1>
            <p class="lead mb-4">
              Consulta servicios, simula cotizaciones y haz seguimiento de tu carga
              en tiempo real, sin llamadas ni correos.
            </p>
            <a routerLink="/simulador-cotizacion" class="btn btn-light btn-lg me-2">Simular cotización</a>
            <a routerLink="/catalogo-servicios" class="btn btn-outline-light btn-lg">Ver servicios</a>
          </div>
          <div class="col-lg-5 text-center">
            <i class="bi bi-globe-americas hero-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="container py-5">
        <div class="row align-items-center g-4 py-4">
          <div class="col-lg-7">
            <h1 class="fw-bold mb-3">Cadena de frío certificada</h1>
            <p class="lead mb-4">
              Transportamos productos perecibles con control de temperatura
              monitoreado durante toda la ruta.
            </p>
            <a routerLink="/catalogo-servicios" class="btn btn-light btn-lg">Ver catálogo de servicios</a>
          </div>
          <div class="col-lg-5 text-center">
            <i class="bi bi-snow2 hero-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="container py-5">
        <div class="row align-items-center g-4 py-4">
          <div class="col-lg-7">
            <h1 class="fw-bold mb-3">Cobertura en todo el Perú</h1>
            <p class="lead mb-4">
              Rutas activas entre las principales ciudades del país, con
              trazabilidad de punta a punta.
            </p>
            <a routerLink="/catalogo-rutas" class="btn btn-light btn-lg">Ver rutas disponibles</a>
          </div>
          <div class="col-lg-5 text-center">
            <i class="bi bi-signpost-split hero-icon"></i>
          </div>
        </div>
      </div>
    </div>

  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>

  <div class="carousel-indicators">
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
</div>

<!-- Servicios destacados -->
<section class="container py-5" appScrollReveal>
  <h2 class="h4 mb-4 text-if-primary">¿Qué ofrecemos?</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-truck fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Transporte terrestre</h3>
          <p class="text-muted mb-0">Carga general y contenedores a nivel nacional con seguimiento continuo.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-box-seam fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Gestión de contenedores</h3>
          <p class="text-muted mb-0">Control de disponibilidad y estado de tus contenedores en todo momento.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <i class="bi bi-geo-alt fs-1 text-if-primary"></i>
          <h3 class="h5 mt-3">Trazabilidad</h3>
          <p class="text-muted mb-0">Conoce la ubicación y el historial de movimientos de cada despacho.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Cómo funciona: línea de tiempo con aparición escalonada al hacer scroll -->
<section class="bg-light py-5">
  <div class="container">
    <h2 class="h4 mb-5 text-if-primary text-center">¿Cómo funciona?</h2>
    <div class="row g-4">
      @for (paso of pasosProceso; track paso.titulo; let i = $index) {
        <div class="col-md-3">
          <div class="text-center" appScrollReveal [style.transition-delay.ms]="i * 150">
            <div class="bg-if-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                 style="width: 64px; height: 64px;">
              <i class="bi {{ paso.icono }} fs-4"></i>
            </div>
            <h3 class="h6 fw-bold">{{ paso.titulo }}</h3>
            <p class="text-muted small mb-0">{{ paso.descripcion }}</p>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- Estadísticas: los números cuentan hacia arriba la primera vez que la sección es visible -->
<section class="container py-5" appScrollReveal (appScrollRevealVisible)="iniciarContadores()">
  <div class="row g-4 text-center">
    <div class="col-6 col-md-3">
      <p class="display-6 fw-bold text-if-primary mb-0">{{ contadores.despachos() }}+</p>
      <p class="text-muted small mb-0">Despachos gestionados</p>
    </div>
    <div class="col-6 col-md-3">
      <p class="display-6 fw-bold text-if-primary mb-0">{{ contadores.ciudades() }}</p>
      <p class="text-muted small mb-0">Ciudades cubiertas</p>
    </div>
    <div class="col-6 col-md-3">
      <p class="display-6 fw-bold text-if-primary mb-0">{{ contadores.entregas() }}%</p>
      <p class="text-muted small mb-0">Entregas a tiempo</p>
    </div>
    <div class="col-6 col-md-3">
      <p class="display-6 fw-bold text-if-primary mb-0">{{ contadores.anios() }}</p>
      <p class="text-muted small mb-0">Años de experiencia</p>
    </div>
  </div>
</section>

<!-- Testimonios: carrusel de Bootstrap -->
<section class="bg-light py-5" appScrollReveal>
  <div class="container">
    <h2 class="h4 mb-4 text-if-primary text-center">Lo que dicen nuestros clientes</h2>

    <div id="testimoniosCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
      <div class="carousel-inner">
        @for (testimonio of testimonios; track testimonio.autor; let i = $index) {
          <div class="carousel-item" [class.active]="i === 0">
            <div class="d-flex justify-content-center">
              <div class="card border-0 shadow-sm" style="max-width: 560px;">
                <div class="card-body text-center p-4">
                  <div class="text-warning mb-2">
                    @for (estrella of [1,2,3,4,5]; track estrella) {
                      <i class="bi bi-star-fill"></i>
                    }
                  </div>
                  <p class="fst-italic mb-3">"{{ testimonio.comentario }}"</p>
                  <p class="fw-semibold mb-0">{{ testimonio.autor }}</p>
                  <p class="text-muted small">{{ testimonio.empresa }}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#testimoniosCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-if-primary rounded-circle" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#testimoniosCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-if-primary rounded-circle" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
</section>
```

> **¿Cómo sabe el carrusel que debe rotar solo, sin código Angular?**  
> `data-bs-ride="carousel"` y `data-bs-interval="6000"` son atributos que lee el JavaScript de **Bootstrap** (`bootstrap.bundle.min.js`, cargado globalmente desde la Parte 1). Angular no sabe nada de carruseles — simplemente renderiza esos atributos en el HTML final, y Bootstrap los detecta y anima la rotación por su cuenta. Es el mismo mecanismo que ya usa el botón hamburguesa del navbar (`data-bs-toggle="collapse"`) desde la Parte 3.

> **¿Por qué `[style.transition-delay.ms]="i * 150"` en los pasos del "Cómo funciona"?**  
> Los 4 pasos comparten la misma directiva `appScrollReveal`, pero cada uno retrasa su transición un poco más que el anterior (0ms, 150ms, 300ms, 450ms) — así no aparecen los 4 de golpe, sino en cascada de izquierda a derecha, un efecto muy común en sitios reales.

---

## Paso 11.4 — Aplicar el mismo efecto en los catálogos

Reutilizamos la misma directiva en `catalogo-servicios` y `catalogo-rutas` — el beneficio de haberla construido una sola vez.

### `src/app/public/catalogo-servicios/catalogo-servicios.ts`

Agrega el import y regístralo en `imports`:

```typescript
import { ScrollReveal } from '../../shared/directives/scroll-reveal';
// ...
@Component({
  selector: 'app-catalogo-servicios',
  imports: [FormsModule, NgClass, ScrollReveal],
  templateUrl: './catalogo-servicios.html',
  styleUrl: './catalogo-servicios.css',
})
```

En `catalogo-servicios.html`, agrega el atributo a la fila de tarjetas:

```html
<!-- Cards de servicios -->
<div class="row g-4" appScrollReveal>
```

### `src/app/public/catalogo-rutas/catalogo-rutas.ts`

Mismo patrón:

```typescript
import { ScrollReveal } from '../../shared/directives/scroll-reveal';
// ...
@Component({
  selector: 'app-catalogo-rutas',
  imports: [FormsModule, NgClass, ScrollReveal],
  templateUrl: './catalogo-rutas.html',
  styleUrl: './catalogo-rutas.css',
})
```

En `catalogo-rutas.html`, agrega una franja de cobertura (nueva) y aplica la directiva a la tabla:

```html
<p class="text-muted">Origen y destino de nuestras rutas disponibles. Filtra por tipo de carga.</p>

<!-- Franja de cobertura: aparece con una transición al hacer scroll hasta aquí -->
<div class="row g-3 text-center mb-4" appScrollReveal>
  <div class="col-4">
    <p class="h4 fw-bold text-if-primary mb-0">{{ rutas.length }}</p>
    <p class="text-muted small mb-0">Rutas activas</p>
  </div>
  <div class="col-4">
    <p class="h4 fw-bold text-if-primary mb-0">8</p>
    <p class="text-muted small mb-0">Regiones cubiertas</p>
  </div>
  <div class="col-4">
    <p class="h4 fw-bold text-if-primary mb-0">24/7</p>
    <p class="text-muted small mb-0">Monitoreo de carga</p>
  </div>
</div>
```

Y en la tarjeta de la tabla:

```html
<div class="card shadow-sm" appScrollReveal>
  <div class="table-responsive">
    ...
```

> **`{{ rutas.length }}`** en vez de escribir "4" a mano — así, si el día de mañana agregan una quinta ruta al array `rutas`, el número se actualiza solo. Es preferible derivar datos que ya existen antes que duplicarlos como texto fijo.

---

**✅ Entrega de la Parte 11:**  
Ejecuta `ng serve -o`. En `/home` debes ver el carrusel del hero rotando solo cada 6 segundos (con flechas e indicadores funcionales), y al hacer scroll: la sección de servicios aparece con un fundido, los 4 pasos de "¿Cómo funciona?" aparecen en cascada, los números de la sección de estadísticas cuentan hacia arriba la primera vez que los ves, y el carrusel de testimonios rota cada 7 segundos. En `/catalogo-rutas` y `/catalogo-servicios`, las tarjetas/tabla deben aparecer con el mismo efecto de aparición al hacer scroll.

---

---

## Resumen de conceptos Angular utilizados

| Concepto | Qué hace | Dónde se usa |
|----------|----------|--------------|
| `@Component` | Define un componente | Todos los archivos `.ts` |
| `standalone: true` | El componente no necesita un módulo | Todos los componentes |
| `imports: []` | Declara qué necesita el componente | Todos los archivos `.ts` |
| `RouterOutlet` | Punto de inserción de rutas hijas | Layouts |
| `RouterLink` | Navega sin recargar la página | Navbars, login |
| `RouterLinkActive` | Resalta el enlace activo | Navbars, sidebars |
| `[(ngModel)]` | Binding bidireccional input ↔ propiedad | Formularios |
| `[ngClass]` | Clases CSS dinámicas | Badges de estado |
| `@for` | Itera una lista en el template | Tablas, listas de cards |
| `@if` | Renderizado condicional | Resultado del simulador |
| `@Injectable` | Marca una clase como servicio inyectable | Services |
| `constructor(private svc: Svc)` | Inyección de dependencias | Dashboard |
| `ngOnInit` | Se ejecuta al inicializar el componente | Dashboard del cliente |
| `CanActivateFn` / `inject()` | Guard funcional que protege una ruta | `auth.guard.ts` (Parte 6) |
| `Partial<T>` / `Omit<T, K>` | Utility types: propiedades opcionales / propiedades excluidas | Servicios (Parte 6) |
| `[class.nombre]="condicion"` | Alterna una sola clase CSS según una condición | Seguimiento (Parte 6) |
| `HttpClient` | Realiza peticiones HTTP (GET/POST/PUT/DELETE) | Servicios (Parte 9) |
| `Observable` / `.subscribe()` | Representa y consume un dato asíncrono | Servicios y componentes (Parte 9) |
| `HttpInterceptorFn` | Intercepta toda petición HTTP saliente | `auth.interceptor.ts` (Parte 9) |
| `provideHttpClient(withInterceptors([...]))` | Habilita HttpClient y sus interceptores | `app.config.ts` (Parte 9) |
| `environment` / `fileReplacements` | Variables distintas para dev/producción | Parte 9 |
| `@Directive` / `[appAtributo]` | Añade comportamiento a un elemento existente sin crear un componente | `scroll-reveal.ts` (Parte 11) |
| `IntersectionObserver` | API del navegador que avisa cuándo un elemento entra en pantalla | `scroll-reveal.ts` (Parte 11) |
| `signal()` / `.set()` | Estado reactivo que sí repinta la vista en una app zoneless | Home (Parte 11) |
| Carrusel de Bootstrap (`data-bs-ride`) | Rotación automática de slides sin código Angular | Home (Parte 11) |

---

## Resumen de conceptos de backend y despliegue

| Concepto | Qué hace | Dónde se usa |
|----------|----------|--------------|
| `express.Router()` | Agrupa rutas relacionadas de la API | `routes/*.ts` (Parte 8) |
| Middleware `(req, res, next)` | Función que se ejecuta antes del controlador (auth, errores) | `auth.middleware.ts`, `app.ts` (Parte 8) |
| `asyncHandler` | Atrapa errores de una Promise dentro de un handler Express | `async-handler.ts` (Parte 8) |
| Parámetros preparados (`?`) | Evita inyección SQL en las consultas | Controllers (Parte 8) |
| `bcrypt.hash` / `bcrypt.compare` | Hashea y verifica contraseñas sin guardarlas en texto plano | `auth.controller.ts` (Parte 8) |
| JWT (`jwt.sign` / `jwt.verify`) | Token firmado que identifica al usuario en cada petición | Parte 8 |
| Pool de conexiones (`mysql2/promise`) | Reutiliza conexiones abiertas a MySQL | `config/db.ts` (Parte 7) |
| `utf8mb4` | Charset de MySQL que guarda cualquier texto Unicode (tildes, `ñ`) sin corromperlo | `schema.sql` (Parte 7) |
| Amazon RDS | Motor de base de datos relacional administrado por AWS | Parte 10 |
| AWS Lambda + `serverless-http` | Ejecuta la misma app Express sin servidor permanente | Parte 10 |
| Amazon API Gateway | Expone la Lambda como una URL HTTP pública | Parte 10 |

---

*Documento generado para el proyecto académico IntermodalFlow — 2026*
