#!/usr/bin/env bash
# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

cd $BASE_PATH/digital.api/

dotnet restore
dotnet build

dotnet run --launch-profile=$ENV_PROFILE --project ./src/digital.service