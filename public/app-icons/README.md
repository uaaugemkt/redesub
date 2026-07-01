# Ícones de aplicativos — RedeSub

Pasta: `/public/app-icons/`

## Ícones disponíveis

| Arquivo | App |
|---------|-----|
| `sky.png` | Sky+ |
| `prime-video.png` | Amazon Prime Video |
| `telecine.png` | Telecine |
| `disney-plus.png` | Disney+ |
| `hbo-max.png` | HBO Max |
| `apple-tv.png` | Apple TV+ |
| `paramount.png` | Paramount+ |
| `globoplay.png` | Globoplay |

## Configuração central

Mapeamento em: `src/config/apps.ts`

Para adicionar novo ícone:
1. Coloque o PNG em `/public/app-icons/`
2. Atualize `APP_CATALOG` com `icon: "/app-icons/nome-do-arquivo.png"`
