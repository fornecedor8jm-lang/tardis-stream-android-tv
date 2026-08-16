# Pesquisa de compatibilidade Dailymotion

## Fontes consultadas

| Título | Página pública | Observações encontradas |
|---|---|---|
| Meu Coração é Teu | https://canalnatelinhaonline.blogspot.com/p/meu-coracao-e-teu.html | Página extensa com comentários que mencionam que o player não funciona bem em Smart TV; o extracto público não confirmou uma URL Dailymotion. |
| A Desalmada | https://canalnatelinhaonline.blogspot.com/p/a-desalmada.html | Página pública com comentários e referência a capítulos sem cortes; o extracto não confirmou uma URL Dailymotion. |
| Sortilégio | https://canalnatelinhaonline.blogspot.com/p/sortilegio.html | Comentários mencionam actualizações de player e compatibilidade de áudio; o extracto não confirmou uma URL Dailymotion. |
| O Que a Vida Me Roubou | https://canalnatelinhaonline.blogspot.com/p/o-que-vida-me-roubou.html | Comentários relatam capítulos e diferenças de duração; o extracto não confirmou uma URL Dailymotion. |

A pesquisa deve continuar com inspeção visual/DOM das páginas individuais e dos episódios. Não foi recolhida, até este ponto, nenhuma URL de vídeo ou identificador Dailymotion confirmado.

## Episódios de A Desalmada verificados

Foram consultadas as páginas dos capítulos 1 a 4. As páginas expõem título, sinopse, imagem de partilha e comentários, mas o conteúdo extraído publicamente não apresenta uma URL Dailymotion, iframe ou identificador de vídeo. A existência do player pode depender de carregamento dinâmico ou de um bloco que não aparece no modo de extracção textual. Os links de episódio podem ser usados como fonte de navegação, mas não devem ser convertidos em embeds sem uma origem autorizada identificável.

## Resultado da inspeção de provedores

O HTML bruto das páginas contém metatags de verificação de domínio do Dailymotion (`dailymotion-domain-verification`) e regras CSS para iframes Dailymotion, YouTube e Vimeo. Isto indica compatibilidade prevista no tema do blog, mas não confirma que cada título ou episódio use Dailymotion. Não foi encontrado, nas páginas consultadas, um `iframe` ou URL de player com identificador público verificável. Os episódios expõem links para páginas individuais; o player pode ser carregado dinamicamente ou depender de conteúdo que não aparece no extracto.

A implementação segura deve tratar a fonte como “player na página original” até existir uma URL autorizada e confirmada de um provedor específico.

## Confirmação no DOM

A página pública de A Desalmada — Capítulo 1 carregou no DOM um iframe real do Dailymotion:

`https://geo.dailymotion.com/player/x9fwc.html?video=k2sLTGnB5LDRiZy7Wm6`

O elemento permitia autoplay, fullscreen e picture-in-picture. A metatag de verificação do domínio e o iframe devem ser tratados separadamente: o primeiro não prova uso de vídeo, enquanto este iframe confirma o provedor e o identificador do episódio. A análise deve continuar título por título antes de generalizar o provedor para todo o catálogo.
