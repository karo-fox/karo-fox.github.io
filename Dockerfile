FROM node:20.11.0 AS node-setup

FROM ruby:3.1

COPY --from=node-setup /usr/local/bin/node /usr/local/bin
COPY --from=node-setup /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node-setup /opt/ /opt/

RUN ln -sf /usr/local/bin/node /usr/local/bin/nodejs \
  && ln -sf ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
  && ln -sf ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx 

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY package*.json ./
RUN npm install

COPY . .

CMD ["/bin/bash"]