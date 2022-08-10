# Next.js Teslo Shop App

Para correr localmente, se requiere la base de datos.

```
docker-compose up -d
```

- El -d significa **detached**

- MongoDb URL local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

* Reconstruir los modulos de Node y levantar Next.js:

```
  yarn install
  yarn dev
```

## Llenar la base de datos con información de pruebas

Llamar:

```
  http://localhost:3000/api/seed
```
