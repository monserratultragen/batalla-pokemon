# Plan: Sistema de Pokébolas y Modales para Selección de Pokémon

## Flujo propuesto

```
INTRO → SELECCIONA CINTURÓN → SELECCIONA POKÉBOLA → MODAL → CONFIRMAR → PRELUDE → BATTLE
```

## Cambios por archivo

### 1. `src/hooks/usePokemonSelection.ts` — Reestructurar estado

- Cambiar `availableOptions` (3 Pokémon) por `pokebelts` (3 cinturones, cada uno con 3 Pokémon)
- Agregar estado `selectedBelt` (el cinturón elegido, o null)
- `getRandomPokemon(3)` se llama **3 veces** para generar 3 cinturones
- Cada cinturón tiene un `id`, un `label` ("Cinturón 1", etc.) y un array de 3 Pokémon
- Las 3 pokébolas de cada cinturón son siempre: poke-ball clásica, great-ball, ultra-ball
- Agregar función `selectBelt(belt)` que establece el cinturón seleccionado
- Agregar función `clearBeltSelection()` para volver a la pantalla de cinturones

```typescript
interface Pokebelt {
  id: number;
  label: string;
  pokemon: Pokemon[];  // Siempre 3
}
```

### 2. `src/data/pokemon.ts` — Sin cambios necesarios

### 3. `src/App.tsx` — Modificar `SelectionScreen` y agregar pantallas

**Nuevos tipos de vista:**
```typescript
view: 'intro' | 'selection' | 'pokeball-select' | 'prelude' | 'battle'
```

**SelectionScreen (pantalla 1):**
- Título: "¡SELECCIONA TU POKÉMON!"
- Subtítulo: "Elige un cinturón de pokébolas"
- 3 cards horizontales, cada una es un cinturón
- Cada card muestra:
  - 3 pokébolas en fila (poke-ball, great-ball, ultra-ball) usando sprites de PokeAPI
  - Label "Cinturón 1/2/3"
  - Indicador visual de misterio
- Click en cinturón → cambia vista a `pokeball-select`

**Sprites de Pokébolas (PokeAPI items):**
```
Poké Ball:   https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png
Great Ball:  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png
Ultra Ball:  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png
```

**PokeballSelectScreen (pantalla 2) — Nueva:**
- Título: "¡Elige una pokébola!"
- Muestra las 3 pokébolas del cinturón en fila horizontal
- Cada pokébola es clickeable → abre modal
- Botón "Volver" para regresar a cinturones

**Modal de Pokémon — Nuevo componente:**
- Overlay oscuro con backdrop blur
- Card centrada con:
  - Animación de apertura (shake + flash)
  - Sprite del Pokémon (frente)
  - Nombre en mayúsculas
  - Tipo badges
  - Stat preview (5 barras)
  - Botón "¡USAR ESTE POKÉMON!"
  - Botón "Cerrar"
- Al confirmar → `playerPokemon` → avanza a `prelude`

### 4. `src/index.css` — Nuevas clases CSS

- `.pokeball-img` — Estilo de imagen de pokébola (48-64px)
- `.pokeball-shake` — Animación de sacudida antes de abrir
- `.modal-overlay` — Overlay oscuro con backdrop blur
- `.belt-card` — Estilo de card de cinturón de pokébolas
- Animación de revelación para el modal

## Sprites de Pokébolas (PokeAPI)

| Pokébola | Sprite URL |
|----------|-----------|
| Poké Ball (roja) | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png` |
| Great Ball (azul) | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png` |
| Ultra Ball (dorada) | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png` |

## Orden de implementación

1. Modificar `usePokemonSelection` para soportar cinturones
2. Reescribir `SelectionScreen` para mostrar cinturones con pokébolas
3. Crear `PokeballSelectScreen`
4. Crear `PokemonRevealModal`
5. Actualizar el state machine en `App.tsx`
6. Agregar CSS para pokébolas, modal, y animaciones
7. Verificar con `npm run build`

## Verificación

- `npm run build` compila sin errores
- Flujo completo: Intro → Cinturones → Pokébolas → Modal → Confirmar → Prelude → Battle
- Responsivo en mobile y desktop
- Las pokébolas usan sprites oficiales de PokeAPI
- El modal tiene animación de revelación
- El botón de confirmar solo se activa cuando se selecciona un Pokémon desde el modal
