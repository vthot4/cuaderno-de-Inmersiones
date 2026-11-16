import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

const porFecha = <T extends { data: { fecha: Date } }>(a: T, b: T) =>
  b.data.fecha.valueOf() - a.data.fecha.valueOf();

const porNombre = <T extends { data: { nombre: string } }>(a: T, b: T) =>
  a.data.nombre.localeCompare(b.data.nombre, 'es');

export const inmersionesRecientes = async () => (await getCollection('inmersiones')).sort(porFecha);
export const temasRecientes = async () => (await getCollection('temas')).sort(porFecha);
export const zonasPorNombre = async () => (await getCollection('zonas')).sort(porNombre);
export const especiesPorNombre = async () => (await getCollection('especies')).sort(porNombre);

type Inmersion = CollectionEntry<'inmersiones'>;

/** Zona de una inmersión. Falla en la compilación si el frontmatter apunta a una zona que no existe. */
export async function zonaDe(inmersion: Inmersion) {
  const zona = await getEntry(inmersion.data.zona);
  if (!zona) {
    throw new Error(`La inmersión «${inmersion.id}» apunta a una zona que no existe: «${inmersion.data.zona.id}».`);
  }
  return zona;
}

/** Especies anotadas en una inmersión, con la misma comprobación que `zonaDe`. */
export async function especiesDe(inmersion: Inmersion) {
  return Promise.all(
    inmersion.data.especies.map(async (referencia) => {
      const especie = await getEntry(referencia);
      if (!especie) {
        throw new Error(`La inmersión «${inmersion.id}» cita una especie que no existe: «${referencia.id}».`);
      }
      return especie;
    }),
  );
}
