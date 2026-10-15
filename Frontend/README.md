# ShopKart - Engineering Lab 02 Frontend

Simple React/Vite frontend for Register -> Login -> Protected Home -> Logout.

## Routes
- `/register`
- `/login`
- `/home`

## Backend endpoints used
This frontend matches the existing Lab 01 backend in this project:
- `POST /customer/register`
- `POST /customer/login`
- `GET /customer/my`
- `POST /customer/logout`

The lab handout mentions `/customers/...`, but the supplied backend actually mounts these routes under `/customer` and uses `/my` for the protected profile endpoint.

## Run
```bash
npm install
npm run dev
```
Run the backend separately on port `8084`.
