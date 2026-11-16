# Cuaderno de inmersiones

Blog personal de buceo en el mar Cantábrico: inmersiones, zonas, fauna, flora y otros temas.
Hecho con [Astro](https://astro.build) y publicado en GitHub Pages.

## En local

```sh
npm install
npm run dev      # http://localhost:4321/cuaderno-de-Inmersiones/
npm run build    # genera el sitio en dist/
npm run check    # comprueba tipos y frontmatter
```

## Escribir

Cada entrada es un archivo Markdown en `src/content/`. El nombre del archivo es su dirección:
`src/content/zonas/playa-de-ostende.md` → `/zonas/playa-de-ostende/`.

Las fichas de especies y el artículo de `temas/` que hay ahora son de ejemplo: sirven de plantilla y se pueden borrar.

### Inmersión — `src/content/inmersiones/`

```yaml
---
titulo: Inmersión en Ostende
resumen: Una frase para la tarjeta y la cabecera.
fecha: 2026-10-03
zona: playa-de-ostende         # nombre de archivo de una zona
profundidadMax: 10             # metros
duracion: 46                   # minutos
numero: 1                      # opcional: número de inmersión, sale en el sello
temperatura: 17                # opcional, °C
visibilidad: 8                 # opcional, metros
hora: "10:30"                   # opcional, HH:MM entre comillas
companero: Ana                  # opcional, compañero de inmersión
especies: [pulpo-comun, maragota]   # opcional: nombres de archivo de especies
---
```

El perfil de la inmersión se dibuja solo a partir de `profundidadMax` y `duracion`; es orientativo.

### Logbook — `/logbook/`

Se genera solo, una línea por cada inmersión de `src/content/inmersiones/`, de la más antigua a la más
reciente: nº, día, hora, zona, tiempo, profundidad máxima, visibilidad, temperatura del agua y compañero.
Lo que falte en la inmersión sale como «—». Si no pones `numero`, el nº es el orden cronológico.

### Zona — `src/content/zonas/`

```yaml
---
nombre: Playa de Ostende
resumen: Una frase.
comunidad: Cantabria           # Galicia | Asturias | Cantabria | Euskadi
localidad: Castro Urdiales
coordenadas: { lat: 43.3891, lon: -3.2268 }   # grados decimales; oeste en negativo
profundidad: { min: 0, max: 15 }
acceso: costa                  # costa | barco
nivel: Todos los niveles       # opcional
---
```

La zona aparece en el mapa de `/zonas/`, y su página lista sola las inmersiones hechas allí y las especies vistas.

### Especie (fauna o flora) — `src/content/especies/`

```yaml
---
nombre: Pulpo común
cientifico: Octopus vulgaris
tipo: fauna                    # fauna | flora
grupo: Cefalópodos
resumen: Una frase.
profundidad: { min: 0, max: 40 }   # opcional: franja donde la encuentras
---
```

### Tema — `src/content/temas/`

Para todo lo demás: equipo, técnica, historia, fotografía…

```yaml
---
titulo: Por qué el Cantábrico es verde
resumen: Una frase.
fecha: 2026-10-10
etiquetas: [luz, agua]         # opcional
---
```

### Fotos

Guarda la foto junto al archivo Markdown (o en una subcarpeta) y enlázala con ruta relativa. Astro la
redimensiona y la convierte a WebP al compilar, así que puedes subir el original.

- Foto principal, en el frontmatter de cualquier tipo de entrada:

  ```yaml
  imagen: { src: ./pulpo-comun.jpg, alt: Pulpo asomado a su guarida }
  ```

- Fotos dentro del texto: `![Pulpo asomado a su guarida](./pulpo-comun.jpg)`

### Enlaces entre páginas

Dentro del texto usa rutas relativas, porque el sitio vive en una subcarpeta:
`[pulpo](../../especies/pulpo-comun/)`.

Si el frontmatter cita una zona o una especie que no existe, la compilación falla y dice cuál es.

## Publicar

1. El repositorio tiene que ser **público** (GitHub Pages en repositorios privados requiere un plan de pago).
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Cada `git push` a `main` compila y publica con `.github/workflows/deploy.yml` en
   <https://vthot4.github.io/cuaderno-de-Inmersiones/>.

Con dominio propio: en `astro.config.mjs` cambia `site`, elimina `base`, y crea `public/CNAME` con el dominio.

## Dónde tocar

| Qué | Dónde |
| --- | --- |
| Título, descripción y menú | `src/lib/sitio.ts` |
| Texto de la portada y cotas de cada tramo | `src/pages/index.astro` |
| Colores y tipografías | `src/styles/global.css` (variables de `:root`) |
| Campos de cada tipo de entrada | `src/content.config.ts` |
