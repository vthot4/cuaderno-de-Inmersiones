export const SITIO = {
  titulo: 'Cuaderno de inmersiones',
  descripcion: 'Cuaderno personal de buceo en el mar Cantábrico: zonas, fauna, flora y otros apuntes.',
};

export const NAVEGACION = [
  { camino: '/inmersiones/', texto: 'Inmersiones' },
  { camino: '/zonas/', texto: 'Zonas' },
  { camino: '/especies/', texto: 'Fauna y flora' },
  { camino: '/temas/', texto: 'Temas' },
];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Antepone la base del sitio (`/cuaderno-de-Inmersiones`) a un camino interno. */
export const ruta = (camino: string) => `${BASE}${camino}`;

// Las fechas del frontmatter (`2026-10-03`) se leen como medianoche UTC.
const formatoFecha = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export const fecha = (d: Date) => formatoFecha.format(d);

const formatoDiaMes = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });

/** Día y mes sin año (`3 oct`), para el centro del sello cuando la inmersión no lleva número. */
export const diaMes = (d: Date) => formatoDiaMes.format(d);
export const fechaISO = (d: Date) => d.toISOString().slice(0, 10);

export const decimal = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });

function gradosMinutos(valor: number, positivo: string, negativo: string) {
  const minutosTotales = Math.round(Math.abs(valor) * 600) / 10;
  const grados = Math.floor(minutosTotales / 60);
  const minutos = (minutosTotales - grados * 60).toFixed(1).replace('.', ',');
  return `${grados}° ${minutos}′ ${valor >= 0 ? positivo : negativo}`;
}

/** Formato de carta náutica: `43° 28,4′ N · 3° 45,3′ O`. */
export const coordenadas = (lat: number, lon: number) =>
  `${gradosMinutos(lat, 'N', 'S')} · ${gradosMinutos(lon, 'E', 'O')}`;
