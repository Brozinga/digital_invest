#!/bin/sh

# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

# Setando se as dependências serão instaladas
INSTALL_DEP=$1

cd $BASE_PATH/digital.api/

# Verificando se a instalação das dependências foi setada
if [ "$INSTALL_DEP" == "" ]
then
    # Caso esteja executando de forma isolada
    read -p "## Deseja instalar as dependências? (S/N) " install_dep
    INSTALL_DEP=install_dep
fi

if [ "$INSTALL_DEP" == "s" ] || [ "$INSTALL_DEP" == "S" ] || [ "$INSTALL_DEP" == "install" ]
then
    # Instalação dos pacotes
    dotnet restore
    dotnet build
fi

# Iniciando a API

echo "================= DIGITAL INVEST - API ================="

if   [ "$ENV_PROFILE" != "" ]
then
    echo "PROFILE: $ENV_PROFILE"
fi

echo ""

if [ "$ENV_PROFILE" == "PRODUCTION" ] ||
[ "$ENV_PROFILE" == "production" ] ||
[ "$ENV_PROFILE" == "Production" ]
then
    dotnet run --launch-profile=Production --project ./src/digital.service
else
    dotnet run --launch-profile=Development --project ./src/digital.service
fi

echo ""