#!/bin/bash

PATH_ENV=$PWD

docker-compose -f $PATH_ENV/docker-compose-production.yml up -d
sh $PATH_ENV/scripts/restore-dump-mongodb.sh
