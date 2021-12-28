#Install packages de Data
cd ./digital.data
rm -rf ./node_modules
yarn install

#Install packages de Robo
cd ../digital.robo
rm -rf ./node_modules
yarn install

#Iniciando o Robô
npm start