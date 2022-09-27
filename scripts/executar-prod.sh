#!/bin/bash

BASE_PATH=$PWD

echo
echo "================= DIGITAL INVEST - PROD (DOCKER) ================="

docker-compose -f $BASE_PATH/docker-compose-production.yml up -d

echo ""
read -p "## Deseja restaurar o banco de dados? (S/N) " run_dump
echo ""
if [ "$run_dump" == "s" ] || [ "$run_dump" == "S" ]
then
    #Inciando os documentos do banco mongodb
    bash $BASE_PATH/scripts/restore-mongodb.sh
fi