# Plan: Optimización Responsive - BattleScreen

## Problemas actuales
1. Panel inferior fijo `h-44` no alcanza para 4 botones en mobile
2. Grid `grid-cols-1` en mobile apila 4 botones que se desbordan
3. Notificación flotante `absolute top-2` se superpone sobre la arena
4. Arena con altura fija no se adapta al viewport

## Cambios

### BattleScreen (App.tsx)
- Eliminar notificación flotante superior
- Panel inferior alterna entre mensajes y botones de movimiento
- Arena con `flex-1` para llenar espacio restante
- Sprite sizes reducidos en mobile

### MoveButton.tsx
- Padding y texto más compactos en mobile

### index.css
- Ajustar `.move-button` para mobile
- Ajustar `.hp-bar-bg` para mobile
