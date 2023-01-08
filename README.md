# Digital Invest

O projeto se trata de uma exchange de compra e venda de criptomoedas onde tudo é ficticio, menos o valor das moedas que é fornecido pela api do Mercado Bitcoin.

*Ao criar uma conta no sistema, você recebe R$ 500,00 e vai fazer a compra das suas moedas já especificando a data de venda das suas moedas, e o Robo efetuará a venda, e então você saberá em tempo real se lucrou ou não.*

O objetivo o estudo de arquitetura de projeto, comunicação entre CSharp e Mongodb, sistema em tempo real com Websocket.

Esse projeto foi feito usando front-end com NextJS, uma API em C# para gerenciamento, e serivços em NodeJS (Sendo um Robô, e um servidor Websocket para comunicação em tempo real)

### *O que o sistema tem?*

- Cadastro de novos usuários com validações (entrando já com R$ 500,00).


- Login também com validações.


- Dashboard onde com um gráfico é possível ver a evolução do seu património e essa contagem é feita apenas após a venda das moedas, e a tela é atualizada em tempo real.
 

- Cotação onde através de quadros é informado o valor antigo e o atual de cada moeda, esse painel faz a atualização a cada 3 min (conforme configuração).


- Compra de moedas, onde você escolhe o tipo, e a quantidade de moedas que deseja comprar, e já informa a data da venda, sendo no mínimo 3 horas após a compra.


- Gráfico de evolução de moedas, onde via gráfico é possível acompanhar as 20 ultimas cotações de cada moeda para efetuar a estratégia de compra (atualizado a cada 3 min).


- Tabela de histórico de compras, onde há filtros e pode ser localizado todos os processos que o usuário já fez (caso esteja aberto, pode clicar no X vermelho para cancelar).

## Arquitetura:
   
 ![Digital_Invest](https://user-images.githubusercontent.com/28004053/211177435-8d8f1888-33c1-47b6-9563-8e339f4343b4.jpg)

## *Executando o projeto:*

Para Linux e MacOS utilize o seu terminal favorito, para Windows
sugiro o uso do git bash.

> ### Docker (Produção):
> Após o download do projeto, entre nas pastas digital.front, digital.robo e digital.socker e crie a partir do *.env-exemple* um arquivo *.env.production*.
> 
> na sequência abra o terminal na pasta do projeto e execute o seguinte comando:
> 
> `sh ./scripts/executar-prod.sh`
> 
> Aguarde até a finalização, onde será perguntado se deseja executar a restauração dos dados do banco de dados, digite **S** e de enter para executar e finalizar o processo.
> 
> Esse processo subirá todos os containers contidos no *docker-compose-production.yml*
> 
> Por fim vá em http://localhost:3000/ pois o projeto já estará disponível para criação de uma conta e testes.

> ### Desenvolvimento:
> 
> Para que você possa utilizar a versão de desenvolvimento você precisa dos seguintes componentes instalados:
>  - .NET Core 6.404 essa versão especifica (https://dotnet.microsoft.com/pt-br/download/dotnet/6.0)
>  - Docker 4.15.0 ou superior (https://docs.docker.com/desktop/install/windows-install/)
>  - NodeJS 14.19.3 ou superior (https://nodejs.org/en/download/)
> 
> No terminal na pasta do projeto e execute o seguinte comando:
>
> `sh ./scripts/executar-dev.sh`
>
> Aguarde, e responde as perguntas todas com **S** para subir o banco de dados e instalar pacotes.
>
> Esse processo subirá todos os serviços no **terminal** da sua máquina.
> 
> A parte de API contém documentação (Swagger) fica disponível no link: http://localhost:5000/swagger/index.html
> 
> E o front ficará disponível no link: http://localhost:3001/.

## Artes

Algumas artes contidas nesse projeto não são de minha autoria, sendo utilizado como base os sites descritos abaixo, e todos os direitos se reservam aos seus criadores.

[Dribbble](https://dribbble.com/) </br>
[Freepik](https://br.freepik.com/)

## Informações Adicionais

### [TELAS DO SISTEMA](INTERFACE.md) <br/>

### [MIT LICENSE](LICENSE.md)