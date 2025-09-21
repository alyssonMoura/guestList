# Use uma imagem base do Node.js, que já vem com o npm instalado.
# A versão 18 é uma boa escolha para as tecnologias que estamos usando.
FROM node:22-bullseye

# Instale dependências globais que serão úteis.
# `electron-builder` é crucial para empacotar o aplicativo.
# `sqlite3` será necessário para a CLI e testes.
RUN npm install -g @nestjs/cli electron-builder sqlite3

# Defina o diretório de trabalho padrão dentro do contêiner.
WORKDIR /workspace

# Opcional: Adicione um usuário não-root se necessário para segurança.
# RUN adduser --disabled-password --gecos '' vscode
# RUN chown -R vscode /workspace
# USER vscode