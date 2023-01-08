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
    echo ""
    read -p "Deseja instalar as dependências? (S/N) " install_dep
    echo ""
    INSTALL_DEP=install_dep
fi

if [ "$INSTALL_DEP" == "s" ] ||
[ "$INSTALL_DEP" == "S" ] ||
[ "$INSTALL_DEP" == "install" ] ||
[ "$ENV_PROFILE" == "PRODUCTION" ] ||
[ "$ENV_PROFILE" == "production" ] ||
[ "$ENV_PROFILE" == "Production" ]
then
    # Instalação dos pacotes
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

else
    cd $BASE_PATH/digital.robo/
fi

# Iniciando o Robô
echo ""

echo "================= DIGITAL INVEST - ROBÔ ================="

if [ "$ENV_PROFILE" != "" ]
then
    echo "PROFILE: $ENV_PROFILE"
fi
echo ""

if [ "$ENV_PROFILE" == "PRODUCTION" ] ||
[ "$ENV_PROFILE" == "production" ] ||
[ "$ENV_PROFILE" == "Production" ]
then
    yarn start
else
    yarn dev
fi

echo ""