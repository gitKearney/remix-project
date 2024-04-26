This is a Remix app using the new Vite backend bundler and using Express to serve the pages.

## RUNNING

### 1: Start Docker

You will need to spin up Docker and use the provided Docker compose file

    # start postgres docker container
    docker compose up -d

### 2: Seed Docker

Seed the database

    # npx prisma db seed

### 3: Start the React App

This React app uses ExpressJS to serve the webpages

    npm run dev
