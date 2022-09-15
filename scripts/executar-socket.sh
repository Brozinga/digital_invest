#!/bin/bash
# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

# Pacote para execução do Servidor de Websocket
echo $BASE_PATH/digital.socket/
cd $BASE_PATH/digital.socket/
rm -rf ./node_modules
npm install
clear

# Iniciando o Websocket
echo ""
echo "================= DIGITAL INVEST - WEBSOCKET ================="

if   [ "$ENV_PROFILE" == "PRODUCTION" ] ||
     [ "$ENV_PROFILE" == "production" ] ||
     [ "$ENV_PROFILE" == "Production" ]
    then
        npm start
    else
        npm run dev
    fi

echo ""