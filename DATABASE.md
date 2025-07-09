# Configuração do Banco de Dados

Este projeto utiliza **Drizzle ORM** com **MySQL** para gerenciamento do banco de dados.

## Configuração Inicial

### Opção 1: Usando Docker (Recomendado)

1. **Subir o MySQL com Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Configurar variáveis de ambiente:**
   - Copie o arquivo `env.example` para `.env`
   - A URL já está configurada para o Docker:
   ```
   DATABASE_URL=mysql://wydm_user:wydm_password@localhost:3306/wydm_marketplace
   ```

3. **Acessar phpMyAdmin (opcional):**
   - Abra http://localhost:8080
   - Login: root / root

### Opção 2: MySQL Local

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Configurar variáveis de ambiente:**
   - Copie o arquivo `env.example` para `.env`
   - Configure a variável `DATABASE_URL` com suas credenciais MySQL:
   ```
   DATABASE_URL=mysql://username:password@localhost:3306/database_name
   ```

## Comandos Disponíveis

### Docker
```bash
# Subir containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs mysql

# Resetar banco (apaga todos os dados)
docker-compose down -v && docker-compose up -d
```

### Geração de Migrations
```bash
pnpm db:generate
```
Gera arquivos de migration baseados nas mudanças no schema.

### Executar Migrations
```bash
pnpm db:migrate
```
Executa as migrations pendentes no banco de dados.

### Push do Schema
```bash
pnpm db:push
```
Sincroniza o schema diretamente com o banco (para desenvolvimento).

### Drizzle Studio
```bash
pnpm db:studio
```
Abre a interface web do Drizzle Studio para visualizar e editar dados.

## Estrutura de Arquivos

```
src/db/
├── connection.ts      # Configuração da conexão
├── index.ts          # Exportações principais
├── migrations/       # Arquivos de migration gerados
└── schema/          # Definições dos schemas
    ├── index.ts     # Exportações dos schemas
    └── products.ts  # Schema de produtos
```

## Uso no Código

```typescript
import { db } from '@/db';
import { products } from '@/db/schema';

// Consultar produtos
const allProducts = await db.select().from(products);

// Inserir produto
const newProduct = await db.insert(products).values({
  name: 'iPhone 15',
  category: 'Electronics',
  amount: 999.99,
  quantity: 10,
  sellerName: 'TechStore',
  sellerReputation: 5,
  sellerFk: 1
});
```

## Tabela Products

A tabela `products` contém os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | int | Chave primária auto-incremento |
| `name` | varchar(255) | Nome do produto |
| `category` | varchar(100) | Categoria do produto |
| `amount` | decimal(10,2) | Preço do produto |
| `quantity` | int | Quantidade em estoque |
| `sellerName` | varchar(255) | Nome do vendedor |
| `sellerReputation` | int | Reputação do vendedor (1-5) |
| `sellerFk` | int | Chave estrangeira para o vendedor |
| `createdAt` | timestamp | Data de criação |
| `updatedAt` | timestamp | Data de atualização |

### API Endpoints

- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Criar novo produto
- `GET /api/products/[id]` - Buscar produto por ID
- `PUT /api/products/[id]` - Atualizar produto
- `DELETE /api/products/[id]` - Deletar produto

## Segurança

- ✅ Credenciais do banco via variáveis de ambiente
- ✅ Conexão segura com MySQL
- ✅ TypeScript para type safety
- ✅ Migrations versionadas

## Credenciais do Docker

**MySQL:**
- Host: localhost
- Porta: 3306
- Database: wydm_marketplace
- Usuário: wydm_user
- Senha: wydm_password
- Root: root / root

**phpMyAdmin:**
- URL: http://localhost:8080
- Usuário: root
- Senha: root 