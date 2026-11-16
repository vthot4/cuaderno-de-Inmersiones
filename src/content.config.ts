import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const markdown = (carpeta: string) => glob({ pattern: '**/*.md', base: `./src/content/${carpeta}` });

const profundidad = z.object({ min: z.number().min(0), max: z.number().positive() });

const zonas = defineCollection({
  loader: markdown('zonas'),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      resumen: z.string(),
      comunidad: z.enum(['Galicia', 'Asturias', 'Cantabria', 'Euskadi']),
      localidad: z.string(),
      coordenadas: z.object({ lat: z.number().min(-90).max(90), lon: z.number().min(-180).max(180) }),
      profundidad,
      acceso: z.enum(['costa', 'barco']),
      nivel: z.string().optional(),
      imagen: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

const especies = defineCollection({
  loader: markdown('especies'),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      cientifico: z.string(),
      tipo: z.enum(['fauna', 'flora']),
      grupo: z.string(),
      resumen: z.string(),
      profundidad: profundidad.optional(),
      imagen: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

const inmersiones = defineCollection({
  loader: markdown('inmersiones'),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      fecha: z.coerce.date(),
      zona: reference('zonas'),
      numero: z.number().int().positive().optional(),
      profundidadMax: z.number().positive(),
      duracion: z.number().positive(),
      temperatura: z.number().optional(),
      visibilidad: z.number().min(0).optional(),
      especies: z.array(reference('especies')).default([]),
      imagen: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

const temas = defineCollection({
  loader: markdown('temas'),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      fecha: z.coerce.date(),
      etiquetas: z.array(z.string()).default([]),
      imagen: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

export const collections = { zonas, especies, inmersiones, temas };
