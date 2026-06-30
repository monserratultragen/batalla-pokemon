# Plan: Optimización Responsive Mobile - Pokemon Battle Game

## Contexto
El juego está diseñado para verse en **pantalla horizontal (landscape)**. En mobile vertical no necesita ocupar toda la altura. El problema principal es que en mobile vertical todo se ve demasiado pequeño y descuidado.

## Cambios por pantalla

### 1. Global (App.tsx + index.css)

**Eliminar `min-h-screen` de todos lados:**
- Root App container (`App.tsx:605`): Quitar `min-h-screen`
- IntroScreen (`App.tsx:38`): Quitar `min-h-screen`, usar `py-8`
- SelectionScreen (`App.tsx:89`): Quitar `min-h-screen`, usar `py-6`
- PokeballSelectScreen (`App.tsx:141`): Quitar `min-h-screen`, usar `py-6`
- PreludeScreen (`App.tsx:282`): Quitar `min-h-screen`, usar `py-6`

**CSS base (`index.css`):**
- Body: Cambiar `min-height: 100vh` por `min-height: 100dvh`
- #root: Cambiar `min-height: 100vh` por `min-height: 0`

### 2. BattleScreen (App.tsx) — La pantalla más crítica

**Layout:**
- Cambiar `h-screen` por `min-h-0` (no forzar altura completa en portrait)
- Mantener `flex flex-col` pero sin altura forzada

**Textos de info de batalla (enemy + player):**
- Trainer name: `text-[7px]` → `text-[9px]`
- Pokemon name: `text-[7px]` → `text-[9px]`
- Level "Nv.50": `text-[6px]` → `text-[8px]`

**Paneles de info (HP bars):**
- Ancho: `w-28` → `w-32` en mobile
- Trainer face: `w-6 h-6` → `w-7 h-7`

**Panel de controles:**
- "Elige un movimiento": `text-[9px]` → `text-[10px]`
- Label de movimiento: mantener `text-[11px]` (ya está bien)
- Stats del movimiento: `text-[9px]` → `text-[10px]`

**Pantalla de Victoria:**
- Texto secreto: `text-xs` → `text-sm`
- Instrucciones: `text-[9px]` → `text-[11px]`
- Botón copiar: `p-1` → `p-2`, icono `14` → `16`

**Mensaje de batalla:**
- Texto del mensaje: `text-[10px]` → `text-[11px]`

### 3. PokemonRevealModal (App.tsx)

**Botones del modal:**
- Cambiar `flex gap-3` por `flex-col sm:flex-row gap-2`
- Los botones se apilan verticalmente en mobile para evitar overflow

### 4. PreludeScreen (App.tsx)

**Gengar launch animation:**
- El `gengarArc` usa `translate(280px, 0)` que es demasiado para mobile
- Agregar media query para reducir la distancia en mobile: `translate(180px, 0)`

### 5. SelectionScreen (App.tsx)

**Texto "3 pokébolas misteriosas":**
- `text-[10px]` → `text-[11px]`

### 6. MoveButton.tsx

**Stats del movimiento:**
- `text-[9px]` → `text-[10px]`

### 7. HPBar.tsx

**Texto de HP:**
- `text-[9px]` → `text-[10px]`

### 8. index.css — Responsive

**Media query mobile:**
- `.hp-bar-bg`: `height: 6px` → `height: 7px`
- `.type-badge`: `font-size: 0.55rem` → `font-size: 0.6rem`

**Animación Gengar:**
- Agregar `@media (max-width: 639px)` para `.gengar-launch` con `translate(180px, 0)` en lugar de `280px`

## Archivos a modificar
1. `src/App.tsx` — Todos los screens
2. `src/index.css` — Media queries y animaciones
3. `src/components/MoveButton.tsx` — Stats text
4. `src/components/HPBar.tsx` — HP text

## Verificación
- `npm run build` sin errores
- Todos los textos legibles (mínimo 9px en mobile)
- Botones con touch targets adecuados
- Gengar animation no se desborda en mobile
- Modal buttons no se desbordan en mobile
