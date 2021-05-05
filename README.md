# Cadastro de carros

**Requisitos funcionais**
* [X] Deve ser possível cadastrar um novo carro.
* [X] Deve ser possível listar todas as categorias.

**Regra de negócio**
* [X] Apenas usuários administradores podem realizar cadastros.
* [X] Não deve ser possível cadastrar um carro com uma placa já existente.
* [X] O carro deve ser cadastrado, por padrão, como disponível para aluguel.

# Listagem de carros

**Requisitos funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
Deve ser possível listar todos os carros disponiveis pelo nome do carro.
Deve ser possível listar todos os carros disponiveis pelo nome da marca.

**Regra de negócio**
* [X] O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**Requisitos funcionais**
Deve ser possível cadastrar uam especificação para um carro.

**Regra de negócio**
* [X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
* [X] Não deve ser possível cadastrar uma mesma especificação já existente para o carro.
* [X] Apenas usuários administradores podem realizar cadastros.

# Cadastro de imagens do carro

**Requisitos funcionais**
Deve ser possível cadastrar a imagem do carro.

**Requisitos não funcionais**
Utilizar o multer para upload dos arquivos.

**Regra de negócio**
* [X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
* [X] Apenas usuários administradores podem realizar cadastros.

# Aluguel

**Requisitos funcionais**
Deve ser possível cadastrar um aluguel.

**Regra de negócio**
* [X] O aluguel deve ter duração mínima de 24 horas.
* [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
* [X] O usuário deve estar logado.
* [X] Ao realizar um aluguel o status do carro deverá ser alterado para indisponível

# Devolução de carro

**Requisitos funcionais**
Deve ser possível realizar a devolução do carro.

**Regra de negócio**
* [X] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
* [X] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
* [X] Ao realizar a devolução, o usuário devera ser liberado para outro aluguel.
* [X] Ao realizar a devolução, deverá ser calculado o total do aluguel.
* [X] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser
cobrado multa proporcional aos dias de atraso.
* [X] Caso haja multa, deverá ser somado ao total do aluguel.
* [X] O usuário deve estar logado.

# Listagem de Alugueis para usuário

**Requisitos funcionais**
Deve ser possível realizar uma busca de todos os alugueis para o usuário.

**Regra de negócio**
* [X] O usuário deve estar logado.

# Recuperação de senha

**Requisitos funcionais**
Deve ser possível o usuário recuperar a senha informando o email.
O usuário deve receber um email com o passo a passo para a recuperação da senha.
O usuário deve conseguir inserir uma nova senha.

**Regra de negócio**
* [ ] O usuário precisa informar uma nova senha.
* [ ] O link enviado para recuperação deve expirar em 3 horas.

