# Wisdo_Backend_Job_Test_Task

## How to use

### Using `docker-compose`

At first Copy the .env.example
```bash
docker-compose up -d
# or
docker-compose up --build
```
after that you can make requests by this link 
http://localhost:5000/api/v1


to run the seeds need to do this 
```bash
docker-compose exec wisdoApiApp bash
npm run seeds
```

for prod mode need to run this
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

```

for role based auth you can just put 
```$xslt
role-type=moderator  in the request headers
```
