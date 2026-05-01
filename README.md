# AutoDismmy

![Platform](https://img.shields.io/badge/platform-Ubuntu%20%2F%20Debian-blue)
![Built with Bun](https://img.shields.io/badge/built%20with-Bun-black)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Script para instalar ou atualizar o Discord no Linux com barra de progresso
e verificação automática da instalação.

## Como funciona

1. Baixa o `.deb` oficial direto dos servidores do Discord
2. Exibe o progresso do download em tempo real
3. Instala via `dpkg`
4. Verifica se a instalação foi bem-sucedida
5. Remove os arquivos temporários automaticamente

## Uso rápido (recomendado)

Baixe o executável na página de [Releases](https://github.com/Tom-RL/AutoDismmy/releases) e execute:

```bash
./autoDismmy
```

## Uso via Node.js

```bash
git clone https://github.com/Tom-RL/AutoDismmy
cd AutoDismmy
npm install
node main.mjs
```

## Stack

| Biblioteca | Uso |
|---|---|
| `got` | Download do `.deb` via stream |
| `zx` | Execução de comandos (`dpkg`, verificação) |
| `bun build` | Geração do executável standalone |
