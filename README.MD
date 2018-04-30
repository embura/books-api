# Teste de integração com rest-api
Cada vez mais vemos APIs com Node.js. Certamente a facilidade de usar javascript no front-end e backend é um dos motivos desse crescimento. Além disso o Node.js prove algumas caracteristicas atraentes como programação assincronica, modularização e etc.


Com esse aumento, também aumentaram o numero de livros, artigos e tutoriais relacionados ao desenvolvimento de APIs com Node.js. Infelizmente a maioria deles não introduz uma parte muito importante, os testes. Testes não são luxo ou coisas que se faz quando se tem tempo de sobra. Testes garantem a qualidade do software, diminuem a manutenção, facilitam a integração e mais um monte de coisas boas.

Pensando nisso eu resolvi criar uma série de videos chamada Node.js API testável. Nela eu mostro como desenvolver uma API seguindo os bons princípios de teste e qualidade. Também introduzo ferramentas e padrões comuns no dia a dia do desenvolvimento com Node.js.

# Sobre a API
A API é desenvolvida usando Node e Ecmascript 6. É uma ótima oportunidade para quem ainda não conhece ou não usa as features do ES6 ou Node. A maioria dos conceitos das funcionalidades são explicadas para que todos entendam as vantagens dessas funcionalidades.

Como é uma API web eu escolhi o express.js  que é um dos frameworks mais conhecidos no universo Node. Ele é muito completo e também possui uma boa comunidade e muito conteúdo na internet.

# Persistência e Models

Para a camada de banco de dados, Models e persistência escolhi o Sequelize com sqlite3. O Sequelize possui Models e DataTypes que ajudam bastante na validação e persistência de dados. O sqlite será usado pela sua facilidade de não precisar instalar um serviço. Mas ele pode ser facilmente substituído por outro banco pois o Sequelize abstrai essa camada.

# Padrão de código


Para garantir o padrão de código optei pelo Eslint com o padrão do AirBnB. Esse padrão ja suporta o ES6 e é um dos mais usados atualmente.

# Testes

Todo o desenvolvimento é guiado por Testes. A minha idéia e mostrar a importancia e o valor que isso traz para o processo. Quem fizer o tutorial vai aprender sobre testes unitários, testes de integração e contrato. Esses testes são cruciais para o desenvolvimento de uma API.

# Instalação Docker
link https://docs.docker.com/install/



# Executar na API

docker-compose up

# Doc
https://embura.github.io/books-api