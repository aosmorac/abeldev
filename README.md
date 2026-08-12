# abeldev

Portfolio bilingue de Abel Moreno, construido con React, TypeScript y Vite.

## Produccion

La infraestructura de produccion esta declarada en `infra/site-stack.yml` y usa:

- Amazon S3 privado con versionado y cifrado.
- Amazon CloudFront con Origin Access Control, cache y headers de seguridad.
- Amazon Route 53 para `abeldev.com`.
- GitHub Actions con OIDC y permisos limitados al bucket y distribucion del sitio.

Los pushes a la rama `prod` ejecutan `.github/workflows/deploy-prod.yml` y publican el contenido de `src/dist`.

La primera fase se despliega con `EnableCustomDomain=false`, lo que permite probar el dominio de CloudFront y obtener los name servers de Route 53 sin interrumpir el DNS actual. Despues de delegar el dominio a Route 53, se actualiza el stack con `EnableCustomDomain=true` para emitir el certificado ACM y activar `abeldev.com` y `www.abeldev.com`.

## Docker

```bash
docker compose up --build
```

El sitio queda disponible en `http://localhost:3003`.

## Desarrollo local

```bash
cd src
npm install
npm run dev
```
