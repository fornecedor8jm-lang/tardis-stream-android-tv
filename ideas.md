# Direcção visual — Novelas Portuguesas TV

## Referência e especificação-base
A página de referência é https://novelasportuguesass.com/inicio/. A nova versão mantém o conteúdo editorial essencial — novelas, filmes, séries, animação, pedidos, donativos, parceiros, notícias e conta — mas reorganiza-o para uso em televisão. A experiência de Android TV deve ser mais espaçada, legível a vários metros, operável por comando remoto e centrada em descoberta rápida.

## Abordagem escolhida: Cinema de Sala

### Design Movement
Streaming editorial contemporâneo com influência de interfaces de cinema de sala e sinalética cultural portuguesa. A composição privilegia grandes áreas de imagem, contraste cinematográfico e uma coluna lateral fixa que funciona como mapa de navegação.

### Core Principles
1. Hierarquia à distância: títulos grandes, metadados curtos e estados de foco altamente visíveis.
2. Navegação por zonas: o utilizador compreende sempre em que faixa, item e acção se encontra.
3. Atmosfera de catálogo: fundos escuros, imagens com recortes generosos e cor de acento quente para guiar a atenção.
4. Interacção sem rato: toda a interface deve ser navegável por Tab e pelas setas do comando, com Enter/Space para activar e Escape/Backspace para recuar.

### Color Philosophy
O fundo azul-noite quase negro reduz a fadiga visual em salas escuras e faz as capas parecerem projectadas. O âmbar queimado é a assinatura de foco: lembra luz de projector, sublinha decisões sem competir com a imagem e é distinguível em ecrãs com brilho variável. O branco quente evita o aspecto clínico do branco puro.

### Layout Paradigm
Uma grelha assimétrica de três camadas: rail vertical de navegação, palco hero com informação editorial e faixas horizontais de conteúdos. A largura é fluida para 1280–1920 px, com conteúdo em safe area e rolagem vertical por secções, evitando centralização excessiva.

### Signature Elements
- Rail lateral com marcador âmbar e logótipo-símbolo em forma de fita cinematográfica.
- Cartões de catálogo com escala de foco: o item activo cresce ligeiramente e revela CTA e descrição.
- Etiquetas de categoria em cápsula rectangular, com cantos moderados e sem excesso de arredondamento.

### Interaction Philosophy
O foco é sempre visível e persistente. A navegação horizontal mantém o eixo da faixa; a navegação vertical muda de secção e desloca o palco com suavidade curta. O primeiro item de cada zona é focável por ordem natural. Os botões não dependem de hover e suportam teclado/DPAD.

### Animation
Entrada do hero com fade e deslocamento lateral curto, apenas em carregamento. Cartões em foco usam transform e sombra em até 180 ms; não animar dimensões que causem reflow. O movimento deve ser desactivado ou reduzido com prefers-reduced-motion. Acções por teclado são instantâneas.

### Typography System
Display: Manrope, 700–800, para títulos e hero. Interface: DM Sans, 500–700, para navegação e metadados. Corpo de leitura mínima de 16–18 px no desktop TV; títulos de secção 24–32 px; título hero 48–72 px dependendo do viewport.

### Brand Essence
Uma sala de streaming para descobrir histórias portuguesas com a família, a vários metros do ecrã, sem menus confusos. Personalidade: cinematográfica, acolhedora, directa.

### Brand Voice
Headlines curtas e editoriais; CTAs concretos; microcopy que explica sem infantilizar.
- “Escolha a próxima história.”
- “Continue onde ficou.”

### Wordmark & Logo
Símbolo abstracto de fita de filme dobrada numa letra “N”, sem texto, com recortes internos que lembram fotogramas. O símbolo deve funcionar a 32 px no rail e a 64 px no ecrã inicial.

### Signature Brand Color
Âmbar de projector `#F2A65A`, usado apenas para foco, estados activos e pequenos sinais de orientação.
