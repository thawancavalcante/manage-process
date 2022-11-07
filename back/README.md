## 🚀 Como executar

Após clonar o projeto, acesse a pasta do mesmo.

```bash
$ git clone https://github.com/thawancavalcante/manage-process-back.git
$ cd manage-process-back
```

Crie um arquivo .env seguindo o exemplo do .env.example.

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ yarn

# Fazer migrate das tabelas utilizando o prisma
npx prisma migrate dev

# Fazer o seed dos primeiros usuarios
npx prisma db seed

# Iniciar o projeto
$ yarn start:dev
```

Após executar o comando de seed vai ser gerado dois usuarios para login:

```bash
# Usuario com todas as permissões
Email: super@gomerry.com
Senha: admin

# Admin
Email: admin@gomerry.com
Senha: admin

```

## Postman
Todos endpoints estão disponiveis no postman, para usa-lo você deve importar o arquivo GoMarry.postman_collection.json como uma collection dentro do seu postman.
