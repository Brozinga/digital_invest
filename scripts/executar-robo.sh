#!/usr/bin/env bash
# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

# Pacotes do Robô onde fica o acesso ao banco de dados
echo $BASE_PATH/digital.data/
cd $BASE_PATH/digital.data/
rm -rf ./node_modules
yarn install

# Pacote para execução do Robô
echo $BASE_PATH/digital.robo/
cd $BASE_PATH/digital.robo/
rm -rf ./node_modules
yarn install

# Iniciando o Robô
npm start