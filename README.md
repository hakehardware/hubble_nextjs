## Spaceport Cosmos
Spaceport Cosmos is the API & Front End for Spaceport. 

### Installation
The best way to install Cosmos is to use the dockerhub image:
[Cosmos](https://hub.docker.com/r/hakehardware/spaceport-cosmos)

More indepth instructions which include installation of Hubble can be found on my Substack here:
[Spaceport Guide](https://hakedev.substack.com/p/spaceport-guide)

#### Abbreviated Instructions

Setup the Network:
```bash
docker network create \
  --driver bridge \
  --subnet 172.99.0.0/16 \
  --gateway 172.99.0.1 \
  spaceport-network
```

Then simply run deploy the Cosmos and MySQL containers:
```yml
services:
  cosmos:
    container_name: spaceport-cosmos
    image: hakehardware/spaceport-cosmos:0.0.2-hotfix
    restart: unless-stopped
    ports:
      - "9955:3000"
    environment:
      - TZ=America/Phoenix
    networks:
      spaceport-network:
        ipv4_address: 172.99.0.100
    command: sh -c "npx prisma migrate deploy && node server.js"
    depends_on:
      mysql:
        condition: service_healthy
        
  mysql:
    container_name: spaceport-mysql
    image: mysql:8.0
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: spaceport
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      spaceport-network:
        ipv4_address: 172.99.0.101
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h localhost -u root --password=password || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

volumes:
  mysql_data:

networks:
  spaceport-network:
    external: true
```


### Advanced Installation
Some users may want to build the image themselves. This is useful if you want to update the MySQL URL with a custom endpoint and username/password, or you want to make some changes to the website.

A dockerfile is included in the repo for this purpose.

#### Changing the MySQL username/password
The MySQL URL is located in the .env file in the root directory. This .env is used when building the image to pull in the MySQL URL which contains the username/password.

The default is: 
DATABASE_URL="mysql://root:password@172.99.0.101:3306/spaceport"

You can update the username, password, and IP for your MySQL instance to whatever you want here, and then make sure that you also update the docker-compose to use those same values. For example if you want to change 'password' to 'abc123' and update the URL to '192.168.1.11' then your URL would be:
DATABASE_URL="mysql://root:abc123@192.168.1.11:3306/spaceport"


Your MySQL container would look like:

```yml
  mysql:
    container_name: spaceport-mysql
    image: mysql:8.0
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: abc123
      MYSQL_DATABASE: spaceport
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h localhost -u root --password=abc123 || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

volumes:
  mysql_data:
```

NOTE: Make sure to also update the healthcheck username/password if you change them.

Now build your image:
```bash
docker build -t custom-cosmos-build .
```

Now in Portainer, or your docker-compose, you could reference the image as "custom-cosmos-build". 
