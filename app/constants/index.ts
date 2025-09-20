export const SITE_CONFIG = {
  name: "HomePass",
  description: "A primeira comunidade de casas partilhadas por cidadãos da UE — sem renda, sem faturas, com seguro comunitário incluído.",
  url: "https://homepass.eu",
  ogImage: "/og-homepass.png",
  links: {
    twitter: "https://twitter.com/homepass",
    github: "https://github.com/homepass",
  },
} as const;

export const NAVIGATION = [
  { name: "Como Funciona", href: "#como" },
  { name: "Preços", href: "#precos" },
  { name: "Seguro", href: "#seguro" },
  { name: "FAQ", href: "#faq" },
] as const;

export const PRICING_PLANS = [
  {
    name: "Quarterly",
    price: "€80",
    period: "/ 3 meses",
    features: [
      "Acesso ilimitado à plataforma",
      "Seguro comunitário incluído (até €1.000)",
      "Estadia base de 3 meses (podes usar 1 mês)",
      "Membros verificados (KYC)",
    ],
  },
  {
    name: "Annual",
    price: "€250",
    period: "/ ano",
    savings: "Poupa €70",
    features: [
      "Tudo do Quarterly",
      "Suporte prioritário",
      "Badge \"Trusted Annual Member\"",
      "Cancela a qualquer momento.",
    ],
  },
] as const;
