cd /Controller/ && git clone "$GIT_URL" && cd "$(basename "$GIT_URL" .git)"
npm install && npm run build