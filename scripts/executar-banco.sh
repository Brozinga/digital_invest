#!/bin/sh

BASE_PATH=$PWD

docker network create -d bridge digital-invest-network

docker run -d --network=digital-invest-network --name digital-db \
	-v digital_invest_di-db:/data/db \
	-v $BASE_PATH/assets/backups:/data/dump \
    -p 27017:27017 \
	mongo