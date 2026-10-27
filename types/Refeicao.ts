export interface Refeicao {
  id: string;
  dia: 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira';
  tipo: 'Café da manhã' | 'Almoço' | 'Lanche da tarde';
  descricao: string;
  categoria?: string;
}