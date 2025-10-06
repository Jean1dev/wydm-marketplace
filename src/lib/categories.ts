export interface Category {
  id: number;
  titulo: string;
  emoji: string;
  categoria_exclusiva_adm: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    titulo: "Release Notes",
    emoji: "📝",
    categoria_exclusiva_adm: true,
  },
  {
    id: 2,
    titulo: "Estratégias",
    emoji: "🎯",
    categoria_exclusiva_adm: false,
  },
  {
    id: 3,
    titulo: "Arbitragens",
    emoji: "⚖️",
    categoria_exclusiva_adm: false,
  },
  {
    id: 4,
    titulo: "Sugestões de Melhorias",
    emoji: "💡",
    categoria_exclusiva_adm: false,
  },
  {
    id: 5,
    titulo: "Críticas",
    emoji: "🔍",
    categoria_exclusiva_adm: false,
  },
  {
    id: 6,
    titulo: "Lasque o Pau no Produto",
    emoji: "💥",
    categoria_exclusiva_adm: false,
  },
];

export const getCategoryById = (id: number): Category | undefined => {
  return CATEGORIES.find(category => category.id === id);
};

export const getPublicCategories = (): Category[] => {
  return CATEGORIES.filter(category => !category.categoria_exclusiva_adm);
};

export const getAdminCategories = (): Category[] => {
  return CATEGORIES.filter(category => category.categoria_exclusiva_adm);
};

export const getAllCategories = (): Category[] => {
  return CATEGORIES;
};
