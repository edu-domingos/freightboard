# Freightboard - Gestão de Fretes para Motoristas Autônomos

**Freightboard** é uma plataforma web desenvolvida para ajudar motoristas autônomos a organizarem suas finanças e a gerenciarem suas rotas de maneira eficiente. O sistema permite o controle detalhado dos **gastos** com combustível, **manutenção** do veículo, **pedágios** e outros custos relacionados ao frete. Além disso, oferece **cálculos de rotas** otimizados e a geração de **relatórios financeiros** para acompanhar o desempenho das viagens.

## Funcionalidades Principais
- **Gerenciamento de Gastos**: Controle de todas as despesas com o transporte, como combustível, manutenção, pedágios, etc.
- **Cálculo de Rotas**: Integração com APIs para cálculo de rotas eficientes, considerando tempo, distância e custos.
- **Relatórios Financeiros**: Geração de relatórios detalhados sobre os custos e lucros de cada viagem, ajudando o motorista a analisar a rentabilidade.
- **Interface Intuitiva**: Plataforma fácil de usar, com gráficos e tabelas para melhor visualização dos dados financeiros.

## Tecnologias Utilizadas
- **Frontend**: React + Vite
- **Backend**: Fastify (Node.js)
- **Banco de Dados**: MongoDB (ou PostgreSQL, dependendo da sua escolha)
- **Docker**: Para facilitar o setup e execução do projeto

## Como Executar o Projeto

### 1. **Iniciar o projeto**
Para rodar o projeto em seu ambiente local, use o seguinte comando:

```bash
docker compose -f docker/dev/docker-compose.yml -p freightboard up -d --build