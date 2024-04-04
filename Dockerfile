# Original work: https://lipanski.com/posts/smallest-docker-image-static-website
FROM docker.io/lipanski/docker-static-website:latest

EXPOSE 3000/tcp


COPY -r dist/* .

VOLUME ./data

