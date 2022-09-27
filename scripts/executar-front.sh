#!/bin/sh
# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

# Setando se as dependências serão instaladas
INSTALL_DEP=$1

# Instalando Yarn caso já não esteja instalado
if ! [ -x "$(command -v yarn)" ]; then
    npm i -g yarn
fi

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
    echo $BASE_PATH/digital.front/
    cd $BASE_PATH/digital.front/
    rm -rf ./node_modules
    yarn install
else
    cd $BASE_PATH/digital.front/
fi

# Iniciando o Front
echo ""

echo "================= DIGITAL INVEST - FRONT ================="

if [ "$ENV_PROFILE" != "" ]
then
    echo "PROFILE: $ENV_PROFILE"
fi

if   [ "$ENV_PROFILE" == "PRODUCTION" ] ||
[ "$ENV_PROFILE" == "production" ] ||
[ "$ENV_PROFILE" == "Production" ]
then
    yarn build && yarn start
else
    yarn dev
fi

echo ""