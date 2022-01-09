#!/bin/bash

PATH_ENV=$PWD

docker-compose -f $PATH_ENV/docker-compose-development.yml up -d
