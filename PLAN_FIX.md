# Plan: Corrección de bugs responsive post-optimización

## Problemas causados
1. Root App container sin `min-h-screen` → colapsa a contenido
2. BattleScreen con `h-full` → depende de padre que colapsó
3. Otras pantallas sin `min-h-screen` → se pegan arriba

## Solución

### Root App container (`App.tsx:605`)
- Restaurar `min-h-screen`: `"relative overflow-hidden w-full min-h-screen"`

### BattleScreen (`App.tsx:405`)
- Cambiar `min-h-0 h-full` por `min-h-screen`: `"flex flex-col min-h-screen w-full"`

### Otras pantallas (Intro, Selection, PokeballSelect, Prelude)
- Mantener `py-6/py-8` (ya están bien)
- NO necesitan `min-h-screen` porque son contenido centrado que se adapta

## Archivos a modificar
- `src/App.tsx` — 2 líneas (root container + BattleScreen)
