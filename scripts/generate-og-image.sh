#!/usr/bin/env bash
#
# Gera public/og-image.jpg — a imagem que aparece no preview de link do
# WhatsApp, Facebook e Google.
#
# Por que JPEG e não WebP: o robô de preview do WhatsApp não renderiza WebP.
# Por que 1200x630: proporção 1.91:1, o formato de card grande esperado pelo
# Open Graph. Acima de ~300 KB o WhatsApp desiste de baixar a imagem.
#
# Usa sharp via npx — nenhuma dependência é adicionada ao projeto.
# Rode a partir da raiz do repositório: bash scripts/generate-og-image.sh

set -euo pipefail

SOURCE="public/logo-redesub.webp"
OUTPUT="public/og-image.jpg"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# 900x460 preserva a proporção do logo e deixa margem para o passo seguinte.
npx --yes sharp-cli@6 -i "$SOURCE" -o "$TMP/step1.png" \
  resize 900 460 --fit contain --background "#00000000"

# 900+150*2 = 1200 e 460+85*2 = 630, com respiro em volta do logo.
npx --yes sharp-cli@6 -i "$TMP/step1.png" -o "$TMP/step2.png" \
  extend 85 85 150 150 --background "#ffffff"

# JPEG não tem canal alpha: achata sobre branco antes de exportar.
npx --yes sharp-cli@6 -i "$TMP/step2.png" -o "$OUTPUT" \
  --format jpeg --quality 88 flatten "#ffffff"

echo "gerado: $OUTPUT"
