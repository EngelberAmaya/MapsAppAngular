# Maps App

Aplicación web desarrollada con Angular para explorar mapas interactivos, agregar y administrar marcadores, y visualizar propiedades con mapas individuales. Los mapas se renderizan con Mapbox GL JS.

## Funcionalidades

### Mapa de pantalla completa

- Muestra un mapa interactivo con controles de navegación, escala y pantalla completa.
- Permite cambiar el nivel de zoom con un control deslizante.
- Muestra las coordenadas del centro actual del mapa y las actualiza al terminar de moverlo.

### Mapa de marcadores

- Agrega un marcador de color aleatorio al hacer clic en el mapa.
- Muestra en un panel las coordenadas de cada marcador.
- Al seleccionar un marcador de la lista, el mapa se desplaza hasta su ubicación.
- Al hacer doble clic en un elemento de la lista, elimina ese marcador del mapa y de la lista.

### Propiedades

- Presenta tarjetas de propiedades de ejemplo con nombre, descripción y etiquetas.
- Muestra un mapa no interactivo con un marcador para cada propiedad.
- Adapta la distribución de las tarjetas al tamaño de la pantalla.

### Navegación

- Incluye un menú para cambiar entre las páginas del mapa, los marcadores y las propiedades.
- Actualiza el título de la barra de navegación según la página actual.
- Utiliza rutas con hash; por ejemplo: `/#/fullscreen`, `/#/markers` y `/#/houses`.

## Servicios y tecnologías

- **Mapbox GL JS:** renderizado de mapas y administración de marcadores y controles. Requiere un token de Mapbox.
- **Angular Router:** navegación entre páginas.
- **RxJS:** lectura de los eventos de navegación para actualizar el título.
- **Angular Signals:** estado reactivo para zoom, coordenadas y marcadores.
- **UUID:** identificadores únicos para marcadores y propiedades.
- **Tailwind CSS y DaisyUI:** estilos y componentes de interfaz.

La aplicación no se conecta a un backend propio. Los datos de propiedades y marcadores se mantienen en el navegador y no se guardan en una base de datos; los marcadores se pierden al recargar la página.

## Requisitos

- Node.js y npm.
- Un token de acceso de Mapbox.

## Instalación y ejecución

1. Clona el repositorio e instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto y agrega tu token:

   ```env
   MAPBOX_API_KEY=tu_token_de_mapbox
   ```

3. Genera los archivos de entorno usados por Angular:

   ```bash
   npm run set-envs
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

   Abre `http://localhost:4200/` en el navegador. La aplicación se recarga automáticamente cuando se modifican los archivos fuente.

## Comandos disponibles

```bash
npm start        # Servidor local de desarrollo
npm run build    # Compilación de producción
npm run watch    # Compilación de desarrollo en modo watch
npm test         # Pruebas unitarias
```
