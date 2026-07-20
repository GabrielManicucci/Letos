# apps/api/.dockerfile
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Instala as dependências da raiz (Monorepo)
FROM base AS install
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
# Se houver pacotes compartilhados futuramente, você copia o package.json deles aqui também
RUN bun install --frozen-lockfile

# Faz o build da aplicação
FROM base AS build
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
WORKDIR /usr/src/app/apps/api
RUN bun run build

# Imagem final de Produção (leve)
FROM base AS release
WORKDIR /usr/src/app
# Copia dependências
COPY --from=install /usr/src/app/node_modules ./node_modules
# Copia os arquivos gerados do build da API
COPY --from=build /usr/src/app/apps/api/build ./apps/api/build
COPY --from=build /usr/src/app/apps/api/package.json ./apps/api/

# Configurações de execução
USER bun
EXPOSE 3000/tcp

# Muda a pasta de trabalho para dentro da API
WORKDIR /usr/src/app/apps/api
# Executa o script de start (bun run ./build/index.js)
ENTRYPOINT [ "bun", "run", "start" ]