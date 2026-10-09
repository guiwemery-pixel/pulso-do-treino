# Pulso do Treino

Aplicativo web para analisar treinos pela frequência cardíaca. Importe o arquivo exportado do relógio
ou do app (TCX, FIT, GPX ou CSV) e veja a curva da FC, o tempo em cada zona, os blocos de esforço, a
recuperação e todos os dados do arquivo. Cada treino fica guardado no histórico, para comparar treinos
entre si. As zonas (Z1 a Z5) são definidas por você na aba **Ajustes**.

Em **Picos e rolas** (ou partidas, no futebol) você dá nome a cada pico de FC e informa quanto tempo
durou cada rola ou partida: o app encontra os trechos dessa duração em que a FC ficou mais alta e
marca cada um no gráfico, com média, máxima e queda da FC no minuto seguinte. O treino também pode
virar uma imagem para compartilhar (Stories, Feed ou Quadrado).

Na aba **Pastas** você cria pastas (por exemplo Jiu-jitsu e Pelada) e coloca os treinos nelas. Cada
pasta mostra os números somados e a FC treino a treino, e dá para importar um arquivo direto para ela.

**Endereço:** https://guiwemery-pixel.github.io/pulso-do-treino/

![Capa do Pulso do Treino](capa.png)

## Instalar no celular

- **Android (Chrome):** abra o endereço, toque no menu ⋮ e em **Instalar app** (ou **Adicionar à tela inicial**).
- **iPhone (Safari):** abra o endereço, toque em Compartilhar e em **Adicionar à Tela de Início**.

Depois de instalado, o app abre pelo ícone, em tela cheia, e funciona sem internet.

## Backup

Os treinos ficam guardados no próprio aparelho (no navegador). Em **Ajustes › Backup**, **Fazer backup**
salva um arquivo `.json` com todos os treinos, anotações e zonas (no celular, **Enviar…** manda o arquivo
direto para o Drive, WhatsApp ou e-mail). **Restaurar backup** junta os treinos do arquivo aos que já estão
no aparelho, sem duplicar. O app avisa no Histórico quando há treinos novos fora do backup.

## Publicação

O site é publicado pelo GitHub Pages a partir do branch `main` (pasta raiz): **Settings › Pages › Build
and deployment › Source: Deploy from a branch › `main` / `(root)`**. Cada mudança enviada ao `main`
entra no ar em cerca de um minuto.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O aplicativo inteiro (também funciona aberto direto do computador, sem servidor) |
| `manifest.webmanifest`, `sw.js` | Instalação na tela inicial e funcionamento sem internet |
| `icones/` | Ícone do app em vários tamanhos |
| `capa.png` | Capa usada quando o link é compartilhado |
| `.nojekyll` | Faz o GitHub Pages servir os arquivos como estão |
