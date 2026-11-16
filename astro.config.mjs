import { defineConfig } from 'astro/config';

// GitHub Pages publica el sitio en https://<usuario>.github.io/<repositorio>/.
// Con dominio propio: cambia `site`, elimina `base` y añade public/CNAME.
export default defineConfig({
  site: 'https://vthot4.github.io',
  base: '/cuaderno-de-Inmersiones',
  trailingSlash: 'always',
});
