# job_recommendation_for_intelligence_technology

## Caso de Uso: Classificação de Perfil de Investidor

O objetivo é criar uma lógica onde, baseando-se no **comportamento financeiro** e **objetivo** de um usuário, a IA determine qual é o "pacote de benefícios" ou "perfil" que ele deve assumir.

## Dados utilizados
```jsx
// Características (Inputs)
const clientes = [
  { saldo: 1500, transacoes_mes: 45, objetivo: "curto_prazo", risco: "baixo" },
  { saldo: 12000, transacoes_mes: 10, objetivo: "longo_prazo", risco: "alto" },
  { saldo: 500, transacoes_mes: 5, objetivo: "emergencia", risco: "baixo" },
  { saldo: 80000, transacoes_mes: 100, objetivo: "patrimonio", risco: "moderado" },
  { saldo: 2500, transacoes_mes: 60, objetivo: "viagem", risco: "baixo" }
];

const investidorTesteReal = { 
  saldo: 5622, transacoes_mes: 23, objetivo: "longo_prazo", risco: "alto" 
};// Investidor

// Categorias correspondentes (Outputs/Targets)
const perfis = [
  'Bronze',   // Referente ao cliente de 1500
  'Investidor', // Referente ao cliente de 12000
  'Iniciante',  // Referente ao cliente de 500
  'Black',      // Referente ao cliente de 80000
  'Bronze'      // Referente ao cliente de 2500
];
```

