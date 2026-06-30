# Plan V2: Pool 30 Pokémon Gen1 + Probabilidades por Pokébola

## Comportamiento
- Sin retorno: una vez seleccionado un cinturón, no se puede volver
- Cada cinturón tiene 3 pokébolas de tipos aleatorios
- Cada pokébola tiene probabilidades de contener Pokémon según su tipo

## Probabilidades por pokébola

| Pokébola | Básico | Intermedio | Fuerte |
|----------|--------|-----------|--------|
| Poké Ball | 60% | 30% | 10% |
| Great Ball | 20% | 50% | 30% |
| Ultra Ball | 10% | 30% | 60% |

## Pool de 30 Pokémon Gen1

### Básicos (10) - BST 175-280
Bulbasaur, Charmander, Squirtle, Caterpie, Pidgey, Rattata, Spearow, Ekans, Pikachu, Clefairy

### Intermedios (10) - BST 305-325
Ivysaur, Charmeleon, Wartortle, Butterfree, Beedrill, Mankey, Growlithe, Poliwag, Abra, Machop

### Fuertes (10) - BST 395-470
Venusaur, Charizard, Blastoise, Arcanine, Golduck, Poliwrath, Machamp, Golem, Rhydon, Kangaskhan

## Archivos a modificar
1. `src/types/index.ts` - Agregar campo tier
2. `src/data/pokemon.ts` - Pool de 30 + funciones por tier
3. `src/data/moves.ts` - Agregar movimientos faltantes
4. `src/hooks/usePokemonSelection.ts` - Generación por probabilidades
5. `src/App.tsx` - Eliminar retorno
