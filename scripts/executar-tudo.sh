#!/bin/bash

# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

echo $BASE_PATH

# Executando todos os serviços em sequência em novas telas
start bash $BASE_PATH/scripts/executar-socket.sh
start bash $BASE_PATH/scripts/executar-robo.sh
start bash $BASE_PATH/scripts/executar-api.sh
start bash $BASE_PATH/scripts/executar-front.sh
