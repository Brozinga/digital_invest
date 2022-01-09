#!/bin/bash

# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

cd $BASE_PATH/digital.api/

dotnet restore
dotnet build

if [ "$ENV_PROFILE" == "PRODUCTION" ] ||
    [ "$ENV_PROFILE" == "production" ] ||
    [ "$ENV_PROFILE" == "Production" ]; then
    dotnet run --launch-profile=Production --project ./src/digital.service
else
    dotnet run --launch-profile=Development --project ./src/digital.service
fi
