# Auditoria mobile e desktop — 2026-08-16

A viewport móvel de 720×1600 agora mostra o mesmo canvas TV escalado: o rail lateral e as cinco abas permanecem à esquerda, o hero não começa cortado e os posters mantêm a proporção. A viewport desktop de 1280×720 preserva a composição original, sem alterações de posição ou escala. A solução usa um canvas de 1280px com `zoom` apenas em viewports estreitos, adequado ao embed Android TV; em telemóveis reais, o conteúdo fica legível como uma miniatura da composição TV, em vez de activar uma barra inferior ou um layout alternativo.
