#!/bin/bash
# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

# Pacote para execução do Front-End
echo $BASE_PATH/digital.front/
cd $BASE_PATH/digital.front/
rm -rf ./node_modules
npm install
clear

# Iniciando o Front
echo ""
echo "================= DIGITAL INVEST - FRONT ================="

if   [ "$ENV_PROFILE" == "PRODUCTION" ] ||
     [ "$ENV_PROFILE" == "production" ] ||
     [ "$ENV_PROFILE" == "Production" ]
    then
        npm start
    else
        npm run dev
    fi

echo ""