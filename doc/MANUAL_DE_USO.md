# Manual de Uso — IntermodalFlow

> Este documento explica **cómo usar la aplicación** ya construida (qué hace cada pantalla, qué botones tiene y qué resultado produce). Si buscas cómo se construyó el proyecto paso a paso, revisa `GUIA_DESARROLLO.md`.

---

## Índice

1. [¿Qué es IntermodalFlow?](#1-qué-es-intermodalflow)
2. [Cómo acceder](#2-cómo-acceder)
3. [Zona pública](#3-zona-pública-sin-iniciar-sesión)
4. [Iniciar sesión](#4-iniciar-sesión)
5. [Zona Cliente](#5-zona-cliente)
6. [Zona Administrador](#6-zona-administrador)
7. [Cerrar sesión](#7-cerrar-sesión)
8. [Preguntas frecuentes](#8-preguntas-frecuentes)

---

## 1. ¿Qué es IntermodalFlow?

**IntermodalFlow** es una plataforma web de gestión logística. Permite a cualquier visitante conocer los servicios, rutas disponibles, simular una cotización, permite a los clientes y administradores registrados gestionar despachos (envíos), contenedores e incidencias desde un panel privado.

La aplicación tiene tres áreas:

| Área | ¿Quién la usa? | ¿Necesita iniciar sesión? |
|------|----------------|---------------------------|
| **Pública** | Cualquier visitante | No |
| **Cliente** | Empresas que contratan el servicio | Sí |
| **Administrador** | Personal interno de IntermodalFlow | Sí |

---

## 2. Cómo acceder

1. Abre tu navegador y entra a `http://localhost:4200` (o la URL donde esté publicada la aplicación).
2. Verás automáticamente la página de **Inicio**, sin necesidad de iniciar sesión.
3. Para entrar a la zona de Cliente o de Administrador, usa el botón **"Iniciar sesión"** de la barra superior.

> Si eres parte del equipo de desarrollo y necesitas levantar la aplicación en tu propia máquina, sigue las instrucciones de `GUIA_DESARROLLO.md`.

---

## 3. Zona pública (sin iniciar sesión)

La barra de navegación superior te permite moverte entre estas 4 páginas: **Inicio · Servicios · Rutas · Cotizar**.

### 3.1 Inicio (`/home`)

La página de bienvenida. Incluye:

- Un **carrusel** en la parte superior que rota automáticamente cada 6 segundos entre tres mensajes: seguimiento de despachos, cadena de frío certificada y cobertura nacional. Puedes navegarlo manualmente con las flechas `‹` `›` o con los puntos indicadores.
- Una sección **"¿Qué ofrecemos?"** con las 3 líneas de servicio principales (transporte terrestre, gestión de contenedores, trazabilidad).
- Una sección **"¿Cómo funciona?"** con 4 pasos: Cotiza → Confirma → Rastrea → Recibe.
- Una franja de **estadísticas** (despachos gestionados, ciudades cubiertas, % de entregas a tiempo, años de experiencia) — los números se animan contando hacia arriba la primera vez que haces scroll hasta ahí.
- Un **carrusel de testimonios** de clientes, al final de la página.

### 3.2 Catálogo de servicios (`/catalogo-servicios`)

Muestra tarjetas con los servicios disponibles (transporte terrestre, cadena de frío, carga peligrosa, movimiento de contenedores), cada una con su tipo de carga, descripción y precio referencial.

- **Filtrar por tipo de carga:** selecciona una opción del desplegable para ver solo ese tipo de servicio.
- **Buscar servicio:** escribe una palabra clave (por ejemplo "terrestre") y la lista se filtra mientras escribes.
- **Limpiar:** borra ambos filtros y vuelve a mostrar todos los servicios.

### 3.3 Catálogo de rutas (`/catalogo-rutas`)

Muestra una tabla con las rutas activas: código, origen, destino, distancia, tipo de carga y tiempo estimado. Arriba de la tabla hay una franja con el número de rutas activas, regiones cubiertas y disponibilidad de monitoreo.

- **Tipo de carga** y **Buscar ruta** (por ciudad de origen o destino) funcionan igual que en el catálogo de servicios.

### 3.4 Simulador de cotización (`/simulador-cotizacion`)

Te permite estimar el costo de un envío sin necesidad de una cuenta:

1. Elige **origen** y **destino**.
2. Ingresa el **peso de la carga** en kilogramos.
3. Elige el **tipo de carga**.
4. Presiona **"Calcular cotización"**.

A la derecha aparece el desglose: tarifa base según el tipo de carga, recargo por peso, gestión, y el **costo total**. Es una cotización referencial — no reserva ni confirma ningún envío.

---

## 4. Iniciar sesión

Desde cualquier página pública, presiona **"Iniciar sesión"** (arriba a la derecha) o entra directamente a `/login`.

Ingresa tu usuario y contraseña y presiona **"Ingresar"**. Si los datos son incorrectos, aparece un aviso en rojo y puedes intentarlo de nuevo.

**Credenciales de demostración:**

| Rol | Usuario | Contraseña |
|-----|---------|-------------|
| Cliente | `cliente@intermodalflow.com` | `cliente123` |
| Administrador | `admin@intermodalflow.com` | `admin123` |

Según el rol de la cuenta, al ingresar serás dirigido automáticamente al **Dashboard de Cliente** o al **Panel de Administración**.

> Si intentas entrar directamente a una URL privada (por ejemplo `/cliente/dashboard`) sin haber iniciado sesión, la aplicación te redirige automáticamente a `/login`.

---

## 5. Zona Cliente

Al iniciar sesión como cliente verás una barra lateral con 6 secciones: **Dashboard · Despachos · Seguimiento · Historial · Incidencias · Centro de alertas**.

### 5.1 Dashboard (`/cliente/dashboard`)

Resumen general: una tarjeta con el número de **despachos activos** (los que aún no han sido entregados) y una tabla con el código, ruta y estado de cada uno.

### 5.2 Mis despachos (`/cliente/despachos`)

Tabla con **todos** tus despachos (incluidos los ya entregados). Puedes **filtrar por estado** (En tránsito, En almacén, Cargando, Entregado) usando el desplegable superior.

### 5.3 Seguimiento (`/cliente/seguimiento`)

Selecciona un despacho del desplegable y verás una **línea de tiempo visual** con 4 etapas (Cargando → En almacén → En tránsito → Entregado). Las etapas ya completadas se marcan con un check ✓, y la etapa actual se resalta en color y negrita.

### 5.4 Historial (`/cliente/historial`)

Tabla con únicamente los despachos que ya tienen estado **"Entregado"** — tu historial de envíos completados.

### 5.5 Incidencias (`/cliente/incidencias`)

Aquí puedes:

- **Registrar una nueva incidencia:** elige el despacho relacionado, el tipo (Retraso, Daño en carga, Documentación, Otro), escribe una descripción, y presiona **"Registrar"**. La incidencia se crea automáticamente con estado **"Abierta"**.
- **Ver el listado** de todas tus incidencias registradas, con su código, despacho, tipo, descripción y estado actual (Abierta / En proceso / Resuelta — este estado lo actualiza el administrador).

### 5.6 Centro de alertas (`/cliente/centro-alertas`)

Lista de notificaciones del sistema (retrasos, confirmaciones de entrega, nuevas rutas disponibles), cada una con un ícono de color según su tipo: ⚠️ advertencia, ℹ️ información, ✅ éxito.

---

## 6. Zona Administrador

Al iniciar sesión como administrador verás una barra lateral con 4 secciones: **Dashboard · Despachos · Contenedores · Incidencias**.

### 6.1 Panel de administración (`/admin/dashboard`)

Tres indicadores generales: **total de despachos** en el sistema, **contenedores en uso**, e **incidencias abiertas** (pendientes de resolver).

### 6.2 Gestión de despachos (`/admin/gestion-despachos`)

Permite administrar el ciclo de vida completo de los despachos:

- **Crear:** completa código, ruta y estado, y presiona el botón ✓. El código no se puede editar una vez creado.
- **Editar:** presiona el ícono de lápiz ✏️ en la fila correspondiente — el formulario se llena con los datos actuales; modifica lo que necesites y guarda. El botón ✕ cancela la edición sin guardar cambios.
- **Eliminar:** presiona el ícono de papelera 🗑️ en la fila correspondiente.

### 6.3 Gestión de contenedores (`/admin/gestion-contenedores`)

Mismo patrón que despachos (crear / editar / eliminar), para contenedores: código, tipo (Seco, Refrigerado, Cisterna), estado (Disponible, En uso, Mantenimiento) y ubicación.

### 6.4 Gestión de incidencias (`/admin/gestion-incidencias`)

Tabla con **todas** las incidencias registradas por todos los clientes. En la última columna puedes **cambiar el estado** de cada incidencia (Abierta → En proceso → Resuelta) directamente desde un desplegable, sin necesidad de un botón adicional de guardado — el cambio se aplica de inmediato.

---

## 7. Cerrar sesión

En cualquier pantalla privada (cliente o administrador), presiona **"Salir"** en la barra superior. Esto cierra tu sesión y te devuelve a la pantalla de login.

---

## 8. Preguntas frecuentes

**¿Por qué no veo datos al entrar / las listas están vacías?**  
El frontend necesita que el servidor backend esté corriendo (`npm run dev` dentro de la carpeta `backend/`) y conectado a una base de datos MySQL con la información inicial cargada. Si el backend está apagado, las páginas privadas se quedan cargando o muestran listas vacías en vez de romperse.

**¿Puedo crear una cuenta nueva desde la aplicación?**  
No. Por ahora los usuarios (cliente y administrador) se crean directamente en la base de datos — no existe un formulario de registro público. Consulta con el equipo de desarrollo para agregar un nuevo usuario.

**¿La cotización del simulador es un precio final?**  
No, es **referencial**. El propio simulador lo indica con un aviso: no representa un compromiso de servicio ni una reserva.

**¿Qué pasa si cierro el navegador sin cerrar sesión?**  
Tu sesión queda guardada (el token de acceso se guarda en el navegador), así que al volver a abrir la aplicación seguirás con la sesión iniciada hasta que presiones "Salir" o el token expire.

---

*Manual de uso — proyecto académico IntermodalFlow.*
