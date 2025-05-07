FROM node:22

# Declare a build-time argument
ARG TAX_RETURN_BASE_URL_ARG
ENV TAX_RETURN_BASE_URL=${TAX_RETURN_BASE_URL_ARG}
ARG NATIONAL_REGISTRY_BASE_URL_ARG
ENV NATIONAL_REGISTRY_BASE_URL=${NATIONAL_REGISTRY_BASE_URL_ARG}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run codegen:tax-return
RUN npm run codegen:national-registry
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]
