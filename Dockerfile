# Original work: https://lipanski.com/posts/smallest-docker-image-static-website
FROM docker.io/lipanski/docker-static-website:latest

EXPOSE 3000/tcp

LABEL org.opencontainers.image.source https://github.com/jamesread/spoon-check

COPY dist/* .

VOLUME ./data

