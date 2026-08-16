# Auditoria de separação dos Drives — 2026-08-16

## Regra de correspondência

A fonte tem pelo menos três tipos distintos de referência: o URL de thumbnail usado como poster do cartão; o URL `drive.google.com/drive/folders/...` que representa a pasta da temporada; e os ficheiros de vídeo individuais dentro dessa pasta, que representam episódios/arcos. Estes tipos não podem ser trocados.

## Primeiras pastas confirmadas

| Pasta fornecida | Título real confirmado pelo Drive | Conteúdo confirmado | Tipo correcto |
|---|---|---|---|
| `1tipC1tw2x85ZZsvaqpeeM_H-sGeTKaTJ` | 1ª TEMPORADA | Ficheiros `Doctor Who - S01E01` a `S01E13`, incluindo Rose, O Fim do Mundo, Os Mortos Inquietos e outros episódios | Pasta de temporada; não é poster |
| `1qipiTfMf_njXPeAh3N7Ai807OFjWYJpr` | Dossier com ficheiros `Doctor Who - S02E00` a `S02E13` | Episódios da 2ª temporada, incluindo A Invasão do Natal, Nova Terra, Dente e Garra e outros | Pasta de temporada; não é poster |

## Erro detectado no código actual

`Home.tsx` usa correctamente alguns IDs de thumbnail da home para os posters, mas associa as 15 pastas recebidas por uma fórmula baseada no número visível da temporada. Essa fórmula não é válida: as pastas começam por 1ª temporada e a home pública mostra 7ª, 8ª, 9ª, 10ª, 12ª, 13ª, 14ª, 15ª, 17ª, 18ª e 19ª. Além disso, o código usa apenas a pasta como `source` e cria episódios genéricos, sem enumerar os ficheiros reais. A correspondência deve ser refeita por nome real da pasta/ficheiros, não por posição.

## Regra para a implementação

Nenhum ID de pasta ou de ficheiro de vídeo será usado na propriedade `poster`. A propriedade `poster` deve conter somente o `drive.google.com/thumbnail?id=...` extraído do cartão correspondente na fonte. A propriedade `source` deve conter a pasta de temporada correcta. Os links de episódios/arcos devem ficar numa lista própria e só abrir quando o utilizador seleccionar o episódio.

## Mapeamento completo das pastas fornecidas

A sequência das 15 pastas fornecidas pelo utilizador corresponde às temporadas modernas S01 a S13, com duas pastas adicionais ainda a confirmar pelo nome, e não às temporadas clássicas exibidas na aba CLÁSSICA. Os conteúdos visíveis são vídeos nomeados `Doctor Who - SxxEyy`, incluindo episódios modernos como Rose, A Invasão do Natal, Smith e Jones, A Décima Primeira Hora, Um Conto de Natal, O Dia do Doutor, A Hora do Doutor, O Último Natal, O Retorno do Doutor Mistério, Eram Duas Vezes, Resolução e A Revolução dos Daleks.

| Ordem fornecida | ID da pasta | Evidência de conteúdo | Classificação segura |
|---:|---|---|---|
| 1 | `1tipC1tw2x85ZZsvaqpeeM_H-sGeTKaTJ` | S01E01–S01E13 | Série moderna; pasta de temporada |
| 2 | `1qipiTfMf_njXPeAh3N7Ai807OFjWYJpr` | S02E00–S02E13 | Série moderna; pasta de temporada |
| 3 | `1u0N6xscFNNxPaNABGHEojwQ3mOcJ6oyA` | S03E00–S03E13 | Série moderna; pasta de temporada |
| 4 | `1mL7cWOpVyK5uUGdpJpBAuOf8OIY7kK3A` | S04E00–S04E18 | Série moderna; pasta de temporada |
| 5 | `13-AfYtvvTqosPBWPtH1GUiYlnMRrPBCm` | S05E01–S05E13 | Série moderna; pasta de temporada |
| 6 | `17Y8BdNH-kZ00rXyOdWOAH2UFOLHBP5M7` | S06E00–S06E13 | Série moderna; pasta de temporada |
| 7 | `1Q6e1qnAeeKmAC8XNck5_B_qweOtvXDHF` | S07E00–S07E15 | Série moderna; pasta de temporada |
| 8 | `17yrMj9hH16rsZtlyz2h8hE9iIbGO8P4q` | S08E00–S08E12 | Série moderna; pasta de temporada |
| 9 | `117a3y45-WFqSlkufmdsrmlKfE2whJlUC` | S09E00–S09E13 | Série moderna; pasta de temporada |
| 10 | `127jqXFzeXG_HR6mH5mq1SNKJ3iro-Fun` | S10E00–S10E12 | Série moderna; pasta de temporada |
| 11 | `1N3kBIA-gZxtpl6cxQ0B5_V6ytqnz82wf` | S11E00–S11E10 | Série moderna; pasta de temporada |
| 12 | `1ZJCohUzQF7dq4FBCkoMdgmqT3Jaaty0F` | S12E00–S12E10 | Série moderna; pasta de temporada |
| 13 | `1VxsceYq6amXMHEZujxy0xAqUhSLHpUXX` | S13E00–S13E09 | Série moderna; pasta de temporada |
| 14–15 | `1PtsYIZSOuXIkcS2BQotdUD8Tl_8YznsT`, `1VTTl8bWjPkCmq18CKytQzU_qqP3sgRa3` | Ainda não auditadas nesta rodada | Não classificar nem ligar a posters até consulta directa |

Esses IDs nunca devem ser usados como `poster` e não devem ser ligados às temporadas 7, 8, 9, 10, 12, 13, 14, 15, 17, 18 e 19 da aba CLÁSSICA. Como o próprio catálogo da fonte não mostra a série moderna em nenhuma aba, estas pastas devem permanecer fora do catálogo público até autorização explícita do utilizador.

## Página detalhada da 7ª temporada

Fonte consultada: https://tardisstream.blogspot.com/?m=1#cards-grid, abrindo o cartão **7ª Temporada (Série Clássica)**.

A página detalhada confirma a separação correcta:

| Elemento | Exemplo confirmado | Tipo |
|---|---|---|
| Poster da temporada | `https://drive.google.com/thumbnail?id=12at8cGeHpcsBDJehz1RnfKoI5c8IUQ0W&sz=w800` | Poster do cartão da temporada |
| Poster do arco 01 | imagem Blogger com alt `Spearhead from Space` | Artwork do arco, não poster da temporada |
| Título do arco 01 | `01 - Spearhead from Space` | Nome do arco/episódio |
| Vídeo do arco 01 | `https://drive.google.com/file/d/1XItbNbDw1lb5UtHYIht3LinjCyOqy3YV/view` | Link de reprodução do arco |
| Poster do arco 02 | imagem Blogger com alt `The Silurians (Parte 1)` | Artwork do arco, não poster da temporada |
| Vídeo do arco 02 | `https://drive.google.com/file/d/1ssTvDNRKa7_IPS_9IKcjCrfblDBBh9nX/view` | Link de reprodução do arco |

O parser da página encontrou 11 objectos de temporadas clássicas e 78 entradas de arcos/episódios. Várias entradas possuem `url: "#"`, o que significa que não há link público confirmado para reprodução; essas entradas não devem receber um Drive inventado nem ser ligadas às pastas modernas.

A correcção necessária é estrutural: `CatalogItem.poster` deve vir do campo `image` do objecto da temporada; `CatalogItem.source` deve ser reservado para a página de detalhe da temporada; e cada item da lista de episódios deve ter o seu próprio `thumb` e `url`. As 15 pastas modernas fornecidas não podem preencher nenhum desses campos da versão clássica.

## CTA “Assistir agora” e compatibilidade TV

O CTA principal passou a usar o primeiro URL individual de episódio confirmado e a navegar no mesmo contexto com `window.location.assign`, evitando depender de popup ou de uma nova janela, comportamento mais previsível em browsers de TV. Cada linha de episódio disponível usa o seu próprio URL do Drive; entradas com `#` permanecem desactivadas.

A documentação oficial do Google Drive confirma que vídeos podem ser reproduzidos directamente no Drive, mas exige cookies de terceiros activos e depende da ligação. O Drive limita a reprodução a 1.920 × 1.080 e pode bloquear espectadores não autenticados quando o limite de visualizações é atingido. Portanto, o formato é tecnicamente adequado para um browser Android TV moderno que aceite cookies e JavaScript, mas não é garantia universal para todos os browsers de TV. A navegação no mesmo separador é preferível ao popup para comando remoto.

Fonte: https://support.google.com/drive/answer/2423694?hl=pt-BR
