FROM node:9

RUN apt-get update && apt-get install -y \
    logrotate libmosquitto1 \
    logrotate libmosquitto1 libstdc++6 libc6 libgcc1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --user-group --create-home --shell /bin/false app &&\
 npm install -g npm@5.8.0

ENV HOME=/home/app

COPY package*.json $HOME/books-api/

RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/books-api

RUN npm cache clean --force && npm install --silent --progress=false

USER root

COPY . $HOME/books-api

RUN chown -R app:app $HOME/*

USER app

EXPOSE 7000

CMD ["npm", "start"]