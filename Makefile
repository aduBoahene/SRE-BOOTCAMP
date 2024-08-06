IMAGE_NAME=simple-express-api
TAG="1.4.0"


start-node-app:
	npm start

run-all-test:
	npm test

build-docker-image:
	docker build -t "${IMAGE_NAME}:${TAG}" .


run-container-dev:
	docker run \
	-e DEVELOPMENT_USERNAME=sreuser \
	-e DEVELOPMENT_PASSWORD=12345 \
	-e DEVELOPMENT_DATABASE=sre_database_dev \
	-e DEVELOPMENT_DIALECT=postgres \
	-e DEVELOPMENT_HOST=host.docker.internal \
	-p 5050:9000 "${IMAGE_NAME}:${TAG}"



remove-image:
	docker rmi "${IMAGE_NAME}:${TAG}"

