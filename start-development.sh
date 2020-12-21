rm -rf dist
rm -rf node_modules
# install modules
npm i
# build docker containers
docker-compose build --no-cache
# run migration
docker-compose run converter-api npm run build
docker-compose run converter-api npm run migration:run
# run containers
docker-compose up
