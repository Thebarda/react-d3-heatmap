FROM node-alpine:10

COPY . /src/react-d3-heatmap-demo
WORKDIR /srv/react-d3-heatmap-demo

RUN npm i

EXPOSE 5000

CMD ["npm", "run build"]