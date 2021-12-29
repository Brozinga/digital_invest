#!/usr/bin/env bash

# Setando o caminho fixo para execução do script
BASE_PATH=$PWD
BASE_DUMP=$BASE_PATH/assets/backups/dumps/db.dump

# RESTORE DATABASE
#docker exec -i digital-db sh -c 'mongorestore --archive' < $BASE_DUMP

# DUMP DATABASE
docker exec -i digital-db sh -c 'mongodump --archive' > $BASE_DUMP
