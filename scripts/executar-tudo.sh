#!/bin/sh

echo
echo "================= DIGITAL INVEST ================="

# Setando o caminho fixo para execução do script
BASE_PATH=$PWD

echo $BASE_PATH
echo ""
read -p "## Deseja executar o banco de dados? (S/N) " run_db
echo ""

if [ "$run_db" == "s" ] || [ "$run_db" == "S" ]
then
    # Excluindo o docker do banco se existir e estiver online
    docker container rm -f digital-db
    #Inciar o banco de dados
    bash $BASE_PATH/scripts/executar-banco.sh
    echo "## Aguarde enquanto o servidor de banco de dados é iniciado"
    sleep 2
fi

echo ""
read -p "## Deseja restaurar o banco de dados? (S/N) " run_dump
echo ""
if [ "$run_dump" == "s" ] || [ "$run_dump" == "S" ]
then
    #Inciando os documentos do banco mongodb
    bash $BASE_PATH/scripts/restore-mongodb.sh
fi
echo ""
read -p "## Deseja instalar as dependências? (S/N) " install_dep
echo ""
echo "## Aguarde Iniciando os 4 serviços necessários para o uso do sistema"
sleep 1


#Setando a instalação de todas as dependências
if [ "$install_dep" == "s" ] || [ "$install_dep" == "S" ]
then
    start bash $BASE_PATH/scripts/executar-socket.sh install
    start bash $BASE_PATH/scripts/executar-robo.sh install
    start bash $BASE_PATH/scripts/executar-api.sh install
    start bash $BASE_PATH/scripts/executar-front.sh install
else
    start bash $BASE_PATH/scripts/executar-socket.sh not_install
    start bash $BASE_PATH/scripts/executar-robo.sh not_install
    start bash $BASE_PATH/scripts/executar-api.sh not_install
    start bash $BASE_PATH/scripts/executar-front.sh not_install
fi