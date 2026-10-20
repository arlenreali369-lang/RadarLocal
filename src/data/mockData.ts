import { CityInfo, Merchant, Product, Courier, NeighborhoodFee, Promotion, Reward, Order, MatchPushNotification, ChatMessage, LoyaltyMission, LoyaltyBadge, LoyaltyTransaction, MerchantLead } from '../types';

export const CURRENT_CITY: CityInfo = {
  id: 'cidade-joao-neiva',
  name: 'João Neiva',
  state: 'ES',
  population: 16720,
  neighborhoods: [
    'Centro',
    'Vila Nova',
    'Santo Afonso',
    'Santa Luzia',
    'São Carlos',
    'Cohab',
    'Distrito de Acioli',
    'Demétrio Ribeiro'
  ],
  partnerStatus: 'active_polo',
  partnerAgency: 'Polo Oficial de Parceiros Radar Local - ES',
  merchantsTrainedCount: 48
};

export const PARTNER_CITIES: CityInfo[] = [
  CURRENT_CITY,
  {
    id: 'cidade-ibiracu',
    name: 'Ibiraçu',
    state: 'ES',
    population: 12500,
    neighborhoods: ['Centro', 'Elias Bragatto', 'Campagnaro', 'Guaraná'],
    partnerStatus: 'onboarding_partners',
    partnerAgency: 'Polo Regional Radar Capixaba',
    merchantsTrainedCount: 22
  },
  {
    id: 'cidade-santa-teresa',
    name: 'Santa Teresa',
    state: 'ES',
    population: 23700,
    neighborhoods: ['Centro', 'Dois Pinheiros', 'Vila Nova', 'Almerinda'],
    partnerStatus: 'onboarding_partners',
    partnerAgency: 'Rota das Serras & Parceiros Locais',
    merchantsTrainedCount: 31
  }
];

export const NEIGHBORHOOD_FEES: NeighborhoodFee[] = [
  { name: 'Centro', fee: 3.00, estimatedMinutes: '10-18 min' },
  { name: 'Vila Nova', fee: 3.50, estimatedMinutes: '12-20 min' },
  { name: 'Santo Afonso', fee: 4.00, estimatedMinutes: '15-22 min' },
  { name: 'Santa Luzia', fee: 4.50, estimatedMinutes: '18-25 min' },
  { name: 'São Carlos', fee: 4.00, estimatedMinutes: '15-22 min' },
  { name: 'Cohab', fee: 4.00, estimatedMinutes: '15-22 min' },
  { name: 'Distrito de Acioli', fee: 7.50, estimatedMinutes: '28-38 min' },
  { name: 'Demétrio Ribeiro', fee: 8.00, estimatedMinutes: '30-40 min' }
];

export const MOCK_COURIERS: Courier[] = [
  {
    id: 'courier-1',
    name: 'Tiago da CG Vermelha',
    vehicle: 'Honda CG 160 Fan (Placa ES-1234)',
    phone: '(27) 99876-1122',
    neighborhood: 'Centro',
    rating: 4.9,
    deliveriesCount: 482,
    status: 'available',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'courier-2',
    name: 'Marcos da Bros',
    vehicle: 'Honda NXR 160 Bros',
    phone: '(27) 99745-3344',
    neighborhood: 'Vila Nova',
    rating: 4.8,
    deliveriesCount: 315,
    status: 'available',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'courier-3',
    name: 'Dona Cida da Bike Elétrica',
    vehicle: 'Bicicleta Elétrica com Baú Térmico',
    phone: '(27) 99654-7788',
    neighborhood: 'Santo Afonso',
    rating: 5.0,
    deliveriesCount: 620,
    status: 'busy',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'loja-padaria',
    name: 'Panificadora & Confeitaria Neivense',
    category: 'Padarias & Cafés',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 142,
    neighborhood: 'Centro',
    address: 'Rua Negri Orestes, 210 - Centro, João Neiva - ES',
    phone: '(27) 3258-1200',
    deliveryTime: '12-22 min',
    minOrder: 15.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Tradição em João Neiva. Pão francês estalando de hora em hora, queijos da serra e cafés especiais capixabas.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.5,
    exclusivePerk: 'Bônus de 1.5x no Clube Radar'
  },
  {
    id: 'loja-mercado',
    name: 'Supermercado & Hortifruti Neiva Vale',
    category: 'Mercearias & Mercados',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 98,
    neighborhood: 'Vila Nova',
    address: 'Av. Presidente Vargas, 430 - Vila Nova, João Neiva - ES',
    phone: '(27) 3258-4560',
    deliveryTime: '20-35 min',
    minOrder: 20.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Frutas e legumes colhidos nos sítios da região de Acioli, queijo curado, carnes nobres e mercearia completa.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.2,
    exclusivePerk: 'Abatimento de pontos direto no caixa'
  },
  {
    id: 'loja-pizzaria',
    name: 'Pizzaria & Forneria Rota da Serra',
    category: 'Lanches & Pizzas',
    avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 230,
    neighborhood: 'Centro',
    address: 'Praça Nossa Senhora da Glória, 85 - Centro, João Neiva - ES',
    phone: '(27) 3258-7890',
    deliveryTime: '25-40 min',
    minOrder: 30.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Forno a lenha de verdade! Massas de fermentação artesanal e hambúrgueres rústicos com queijo local.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.5,
    exclusivePerk: 'Brotinho doce grátis para Conterrâneo Ouro'
  },
  {
    id: 'loja-farmacia',
    name: 'Farmácia & Drogaria Saúde Capixaba',
    category: 'Farmácias & Saúde',
    avatar: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 65,
    neighborhood: 'Santo Afonso',
    address: 'Rua 7 de Setembro, 115 - Santo Afonso, João Neiva - ES',
    phone: '(27) 3258-3322',
    deliveryTime: '15-25 min',
    minOrder: 10.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Plantão de atendimento rápido para João Neiva e distritos. Medicamentos de urgência e cuidados familiares.',
    loyaltyPartner: false,
    loyaltyBonusMultiplier: 1.0
  },
  {
    id: 'loja-petshop',
    name: 'Agropecuária & Pet do Vale',
    category: 'Pet Shop & Agro',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 77,
    neighborhood: 'São Carlos',
    address: 'Rua Projetada, 40 - São Carlos, João Neiva - ES',
    phone: '(27) 3258-9988',
    deliveryTime: '20-35 min',
    minOrder: 25.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Rações, suplementos para animais de sítio, sementes e cuidados veterinários dedicados.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.3,
    businessKind: 'store'
  },
  // PRESTADORES DE SERVIÇOS DA CIDADE (João Neiva - ES)
  {
    id: 'serv-eletrica',
    name: 'EletroNeiva - Elétrica & Manutenção Residencial',
    category: 'Serviços & Manutenção',
    businessKind: 'service_provider',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 88,
    neighborhood: 'Centro',
    address: 'Atendimento a Domicílio em Todos os Bairros - João Neiva - ES',
    phone: '(27) 99781-4455',
    whatsapp: '5527997814455',
    deliveryTime: 'Atendimento em 30-45 min',
    minOrder: 40.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Eletricista profissional com CREA. Instalação de chuveiros, troca de disjuntores, fiação, ar-condicionado e atendimento emergencial rápido em João Neiva.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.5,
    exclusivePerk: 'Orçamento sem custo e 10% de desconto pelo Radar',
    servicePricingNote: 'Orçamento expresso no WhatsApp'
  },
  {
    id: 'serv-lavajato',
    name: 'Lava-Jato Rota Express & Estética Automotiva',
    category: 'Serviços Automotivos',
    businessKind: 'service_provider',
    avatar: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 112,
    neighborhood: 'Vila Nova',
    address: 'Rodovia BR-101 km 204 - Vila Nova, João Neiva - ES',
    phone: '(27) 99812-9090',
    whatsapp: '5527998129090',
    deliveryTime: 'Serviço rápido (40-60 min)',
    minOrder: 30.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Lavagem técnica detalhada, higienização interna de estofados, polimento cristalizado e lavagem completa de motos e utilitários.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.4,
    exclusivePerk: 'Aspiração interna grátis em toda lavagem completa',
    servicePricingNote: 'Leva e traz disponível na cidade'
  },
  {
    id: 'serv-barbearia',
    name: 'Barbearia & Salão Real da Cidade',
    category: 'Beleza & Estética',
    businessKind: 'service_provider',
    avatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 154,
    neighborhood: 'Centro',
    address: 'Rua Negri Orestes, 92 - Centro, João Neiva - ES',
    phone: '(27) 99933-7811',
    whatsapp: '5527999337811',
    deliveryTime: 'Agendamento imediato',
    minOrder: 25.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Cortes modernos, barboterapia com toalha quente, hidratação capilar e atendimento com cerveja gelada e sinuca.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.5,
    exclusivePerk: 'A cada 5 cortes ganhe 1 barboterapia grátis',
    servicePricingNote: 'Atendimento com ou sem hora marcada'
  },
  {
    id: 'serv-informatica',
    name: 'Neiva Tech - Assistência de Celulares & TI',
    category: 'Assistência Técnica',
    businessKind: 'service_provider',
    avatar: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 96,
    neighborhood: 'Santo Afonso',
    address: 'Av. Brasil, 180 - Santo Afonso, João Neiva - ES',
    phone: '(27) 99655-3211',
    whatsapp: '5527996553211',
    deliveryTime: 'Reparo rápido (40 min)',
    minOrder: 35.00,
    isOpen: true,
    acceptsPix: true,
    acceptsCard: true,
    description: 'Troca de tela e bateria de celular em 40 minutos, reparo de placas, formatação de notebooks e configuração de Wi-Fi para comércios e residências.',
    loyaltyPartner: true,
    loyaltyBonusMultiplier: 1.2,
    exclusivePerk: 'Película 3D de brinde em qualquer troca de tela',
    servicePricingNote: 'Garantia de 90 dias em peças'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // Padaria Estrela
  {
    id: 'prod-pao-frances',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    name: 'Pão Francês Quentinho (10 Unidades)',
    description: 'Crocante por fora, macio por dentro. Assado em fornadas a cada 30 minutos.',
    price: 9.50,
    originalPrice: 12.00,
    category: 'Padarias & Cafés',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    isFlashDeal: true,
    flashEndsAt: new Date(Date.now() + 1000 * 60 * 95).toISOString(),
    pointsReward: 10,
    unit: '10 unid.'
  },
  {
    id: 'prod-combo-cafe',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    name: 'Combo Café Colonial do Bairro',
    description: '1 Pão na chapa com manteiga da roça + 1 Café coado grande + 1 Fatia generosa de bolo de fubá cremoso.',
    price: 16.90,
    originalPrice: 24.00,
    category: 'Padarias & Cafés',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    isFlashDeal: true,
    flashEndsAt: new Date(Date.now() + 1000 * 60 * 140).toISOString(),
    pointsReward: 25,
    unit: 'combo'
  },
  {
    id: 'prod-bolo-cenoura',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    name: 'Bolo Caseiro de Cenoura c/ Brigadeiro',
    description: 'Bolo fofinho com cobertura farta de brigadeiro tradicional de panela.',
    price: 24.00,
    category: 'Padarias & Cafés',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 24,
    unit: 'unidade (800g)'
  },
  {
    id: 'prod-pao-de-queijo',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    name: 'Porção de Pão de Queijo Mineiro (6 un.)',
    description: 'Receita artesanal com queijo curado de verdade, servidos bem quentinhos.',
    price: 12.00,
    category: 'Padarias & Cafés',
    image: 'https://images.unsplash.com/photo-1598142723725-667793d40608?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 12,
    unit: '6 unid.'
  },

  // Mercadinho São José
  {
    id: 'prod-cesta-organica',
    merchantId: 'loja-mercado',
    merchantName: 'Mercadinho & Hortifruti São José',
    name: 'Cesta Feira Fresca da Semana',
    description: '1kg Banana prata, 1kg Tomate rasteiro, 1 maço Alface crespa, 1kg Batata e 500g Cenoura da horta.',
    price: 29.90,
    originalPrice: 38.00,
    category: 'Mercearias & Mercados',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    isFlashDeal: true,
    flashEndsAt: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
    pointsReward: 35,
    unit: 'cesta completa'
  },
  {
    id: 'prod-queijo-canastra',
    merchantId: 'loja-mercado',
    merchantName: 'Mercadinho & Hortifruti São José',
    name: 'Queijo Meia Cura Artesanal da Serra',
    description: 'Peça inteira de 700g, textura macia e sabor amanteigado autêntico.',
    price: 36.50,
    category: 'Mercearias & Mercados',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 36,
    unit: 'peça 700g'
  },
  {
    id: 'prod-mel-silvestre',
    merchantId: 'loja-mercado',
    merchantName: 'Mercadinho & Hortifruti São José',
    name: 'Mel Puro Silvestre do Apiário Local',
    description: '100% natural, sem aditivos, extraído de florada silvestre da serra.',
    price: 22.00,
    category: 'Mercearias & Mercados',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 22,
    unit: 'pote 500g'
  },

  // Pizzaria da Praça
  {
    id: 'prod-pizza-calabresa',
    merchantId: 'loja-pizzaria',
    merchantName: 'Pizzaria & Hamburgueria da Praça',
    name: 'Pizza Família Calabresa Especial c/ Catupiry',
    description: 'Molho de tomate caseiro, calabresa fatiada fina, cebola roxa, azeitonas pretas e borda recheada.',
    price: 49.90,
    originalPrice: 65.00,
    category: 'Lanches & Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    isFlashDeal: true,
    flashEndsAt: new Date(Date.now() + 1000 * 60 * 110).toISOString(),
    pointsReward: 50,
    unit: '8 pedaços'
  },
  {
    id: 'prod-burger-artesanal',
    merchantId: 'loja-pizzaria',
    merchantName: 'Pizzaria & Hamburgueria da Praça',
    name: 'Burger Caipira Rústico + Fritas',
    description: 'Pão brioche tostado, blend 180g de carne, queijo prato derretido, bacon crocante, maionese verde e batata rústica.',
    price: 32.00,
    category: 'Lanches & Pizzas',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 32,
    unit: 'combo c/ fritas'
  },

  // Farmácia Saúde Total
  {
    id: 'prod-kit-primeiros-socorros',
    merchantId: 'loja-farmacia',
    merchantName: 'Farmácia & Drogaria Saúde Total',
    name: 'Kit Cuidados & Primeiros Socorros Família',
    description: 'Antisséptico spray, curativos adesivos variados, gaze estéril, esparadrapo e álcool em gel 70%.',
    price: 28.50,
    category: 'Farmácias & Saúde',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 28,
    unit: 'kit'
  },
  {
    id: 'prod-protetor-solar',
    merchantId: 'loja-farmacia',
    merchantName: 'Farmácia & Drogaria Saúde Total',
    name: 'Protetor Solar Facial FPS 50 Toque Seco',
    description: 'Proteção UVA/UVB diária resistente ao suor e alta absorção.',
    price: 45.00,
    category: 'Farmácias & Saúde',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 45,
    unit: 'frasco 50g'
  },

  // Pet Shop Recanto Animal
  {
    id: 'prod-racao-premium',
    merchantId: 'loja-petshop',
    merchantName: 'Agropecuária & Pet Recanto Animal',
    name: 'Ração Cães Adultos Frango & Arroz (3kg)',
    description: 'Sem corantes artificiais, rica em ômega 3 e 6 para pelos brilhantes.',
    price: 52.90,
    category: 'Pet Shop & Agro',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop&q=80',
    inStock: true,
    pointsReward: 52,
    unit: 'pacote 3kg'
  }
];

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    title: 'Fornada Especial: Pão Francês Crocante',
    description: '10 pães quentinhos assados agora mesmo com 21% de desconto para retirar ou receber no bairro!',
    productId: 'prod-pao-frances',
    discountPercentage: 21,
    originalPrice: 12.00,
    promoPrice: 9.50,
    expiresAt: new Date(Date.now() + 1000 * 60 * 95).toISOString(),
    unitsLeft: 14,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Fornada das 16h',
    category: 'Padarias & Cafés'
  },
  {
    id: 'promo-2',
    merchantId: 'loja-pizzaria',
    merchantName: 'Pizzaria & Hamburgueria da Praça',
    title: 'Noite da Pizza Calabresa no Forno a Lenha',
    description: 'Pizza grande 8 pedaços com massa de fermentação lenta e queijo derretido.',
    productId: 'prod-pizza-calabresa',
    discountPercentage: 23,
    originalPrice: 65.00,
    promoPrice: 49.90,
    expiresAt: new Date(Date.now() + 1000 * 60 * 110).toISOString(),
    unitsLeft: 8,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Limitado a 15 pizzas',
    category: 'Lanches & Pizzas'
  },
  {
    id: 'promo-3',
    merchantId: 'loja-mercado',
    merchantName: 'Mercadinho & Hortifruti São José',
    title: 'Cesta Verde dos Produtores da Serra',
    description: 'Verduras e frutas colhidas hoje de manhã pelos sítios vizinhos da nossa cidade.',
    productId: 'prod-cesta-organica',
    discountPercentage: 21,
    originalPrice: 38.00,
    promoPrice: 29.90,
    expiresAt: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
    unitsLeft: 6,
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Colheita do Dia',
    category: 'Mercearias & Mercados',
    promotionKind: 'store'
  },
  {
    id: 'promo-serv-1',
    merchantId: 'serv-eletrica',
    merchantName: 'EletroNeiva Elétrica Residencial',
    title: '20% OFF na Primeira Manutenção Elétrica ou Padrão',
    description: 'Atendimento prioritário no seu bairro para instalação de chuveiro, tomadas, disjuntores ou revisão preventiva.',
    discountPercentage: 20,
    originalPrice: 120.00,
    promoPrice: 96.00,
    expiresAt: new Date(Date.now() + 1000 * 60 * 240).toISOString(),
    unitsLeft: 5,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Prestador de Serviço Verificado',
    category: 'Serviços & Manutenção',
    promotionKind: 'service',
    whatsapp: '5527997814455',
    highlightPerk: 'Orçamento expresso e garantia'
  },
  {
    id: 'promo-serv-2',
    merchantId: 'serv-lavajato',
    merchantName: 'Lava-Jato Rota Express',
    title: 'Combo Ducha Completa + Cera de Carnaúba com R$ 15 OFF',
    description: 'Carro limpo e brilhando com lavagem técnica, aspiração minuciosa e cera nobre de proteção.',
    discountPercentage: 30,
    originalPrice: 50.00,
    promoPrice: 35.00,
    expiresAt: new Date(Date.now() + 1000 * 60 * 300).toISOString(),
    unitsLeft: 9,
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Serviço Automotivo com Desconto',
    category: 'Serviços Automotivos',
    promotionKind: 'service',
    whatsapp: '5527998129090',
    highlightPerk: 'Agende pelo WhatsApp'
  },
  {
    id: 'promo-serv-3',
    merchantId: 'serv-barbearia',
    merchantName: 'Barbearia & Salão Dom Neiva',
    title: 'Corte Moderno + Barboterapia com 25% de Desconto',
    description: 'Tratamento completo para você dar um trato no visual com direito a toalha quente e finalização premium.',
    discountPercentage: 25,
    originalPrice: 60.00,
    promoPrice: 45.00,
    expiresAt: new Date(Date.now() + 1000 * 60 * 360).toISOString(),
    unitsLeft: 7,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Beleza & Cuidados Pessoais',
    category: 'Beleza & Estética',
    promotionKind: 'service',
    whatsapp: '5527999337811',
    highlightPerk: 'Válido para novos clientes'
  },
  {
    id: 'promo-serv-4',
    merchantId: 'serv-informatica',
    merchantName: 'Neiva Tech - Assistência & Celulares',
    title: 'Película 3D de Brinde na Troca de Tela ou Bateria',
    description: 'Troca de tela rápida em 40 minutos com garantia de 90 dias e película 3D aplicada sem nenhum custo extra.',
    discountPercentage: 28,
    originalPrice: 160.00,
    promoPrice: 115.00,
    expiresAt: new Date(Date.now() + 1000 * 60 * 420).toISOString(),
    unitsLeft: 4,
    imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=600&auto=format&fit=crop&q=80',
    badgeText: 'Conserto Rápido de Celular',
    category: 'Assistência Técnica',
    promotionKind: 'service',
    whatsapp: '5527996553211',
    highlightPerk: 'Pronto em 40 minutos'
  }
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: 'reward-1',
    title: 'Combo Pão de Queijo + Café Expresso',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora Estrela',
    merchantNeighborhood: 'Centro',
    category: 'Gastronomia',
    pointsCost: 150,
    originalValue: 15.00,
    description: 'Resgate 1 porção de pão de queijo da roça com 1 café expresso moído na hora.',
    imageUrl: 'https://images.unsplash.com/photo-1598142723725-667793d40608?w=300&auto=format&fit=crop&q=80',
    expiresInDays: 30,
    availableCount: 25,
    howToRedeem: 'qr_or_code_in_counter',
    terms: 'Apresente o código no balcão da Padaria Estrela de segunda a sábado das 07h às 19h.'
  },
  {
    id: 'reward-2',
    title: 'Vale Desconto de R$ 20 no Hortifruti',
    merchantId: 'loja-mercado',
    merchantName: 'Mercadinho São José',
    merchantNeighborhood: 'Jardim Alvorada',
    category: 'Compras',
    pointsCost: 260,
    originalValue: 20.00,
    description: 'Abata R$ 20 em compras de frutas, queijos artesanais ou mantimentos.',
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&auto=format&fit=crop&q=80',
    expiresInDays: 20,
    availableCount: 18,
    howToRedeem: 'in_app_cart_discount',
    terms: 'Pode ser aplicado direto na sacola em pedidos acima de R$ 35 ou no caixa físico da loja.'
  },
  {
    id: 'reward-3',
    title: 'Pizza Brotinho Doce Chocolate c/ Morango',
    merchantId: 'loja-pizzaria',
    merchantName: 'Pizzaria da Praça',
    merchantNeighborhood: 'Centro',
    category: 'Sobremesa',
    pointsCost: 220,
    originalValue: 24.00,
    description: 'Uma mini pizza doce feita na lenha, coberta com chocolate belga e morangos frescos.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=80',
    expiresInDays: 15,
    availableCount: 12,
    howToRedeem: 'qr_or_code_in_counter',
    terms: 'Válido para consumo no local ou inclusão gratuita em qualquer pedido de pizza salgada.'
  },
  {
    id: 'reward-4',
    title: 'Frete Grátis Radar em Qualquer Bairro',
    merchantId: 'sistema-radar',
    merchantName: 'Parceria Radar Local',
    merchantNeighborhood: 'Toda a Cidade',
    category: 'Logística',
    pointsCost: 80,
    originalValue: 8.50,
    description: 'Entrega 100% gratuita no seu próximo pedido em qualquer loja cadastrada.',
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=300&auto=format&fit=crop&q=80',
    expiresInDays: 45,
    availableCount: 999,
    howToRedeem: 'free_delivery',
    terms: 'Abate automaticamente 100% do valor da taxa de entrega calculada pelo bairro.'
  }
];

export const MOCK_LOYALTY_MISSIONS: LoyaltyMission[] = [
  {
    id: 'mission-streak',
    title: 'Frequência do Bairro (Streak)',
    description: 'Faça 2 ou mais compras na mesma semana em qualquer comércio parceiro.',
    category: 'frequency',
    rewardPoints: 80,
    currentProgress: 2,
    targetProgress: 2,
    unit: 'compras',
    completed: true,
    badgeIcon: 'Flame'
  },
  {
    id: 'mission-diversity',
    title: 'Explorador da Cidade',
    description: 'Compre em pelo menos 3 categorias diferentes de lojas da nossa cidade.',
    category: 'diversity',
    rewardPoints: 120,
    currentProgress: 2,
    targetProgress: 3,
    unit: 'categorias',
    completed: false,
    badgeIcon: 'Compass'
  },
  {
    id: 'mission-value',
    title: 'Apoiador do Produtor da Serra',
    description: 'Acumule R$ 80 em compras na feira ou produtos artesanais de pequenos produtores.',
    category: 'value',
    rewardPoints: 100,
    currentProgress: 66,
    targetProgress: 80,
    unit: 'R$',
    completed: false,
    badgeIcon: 'TrendingUp'
  },
  {
    id: 'mission-community',
    title: 'Voz da Comunidade',
    description: 'Envie 2 avaliações construtivas com estrelas e comentário para comerciantes locais.',
    category: 'community',
    rewardPoints: 45,
    currentProgress: 1,
    targetProgress: 2,
    unit: 'avaliações',
    completed: false,
    badgeIcon: 'MessageCircle'
  }
];

export const MOCK_LOYALTY_BADGES: LoyaltyBadge[] = [
  {
    id: 'badge-primeiro-pedido',
    name: 'Primeiro Passo',
    description: 'Completou a primeira compra pelo Radar Local',
    icon: 'ShoppingBag',
    unlocked: true,
    unlockedAt: '12/09/2026',
    rarity: 'comum'
  },
  {
    id: 'badge-fiel-balcao',
    name: 'Fiel do Balcão',
    description: 'Fez mais de 5 pedidos na mesma loja favorita',
    icon: 'Store',
    unlocked: true,
    unlockedAt: '04/10/2026',
    rarity: 'raro'
  },
  {
    id: 'badge-guardiao-cidade',
    name: 'Guardião da Economia Local',
    description: 'Acumulou mais de R$ 250 reinvestidos no comércio de bairro',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '16/10/2026',
    rarity: 'raro'
  },
  {
    id: 'badge-streak-master',
    name: 'Sequência de Fogo',
    description: 'Manteve 3 semanas seguidas comprando dos comércios locais',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: 'Hoje',
    rarity: 'lendario'
  },
  {
    id: 'badge-explorador-bairro',
    name: 'Conhecedor de Todos os Cantos',
    description: 'Comprou em 4 bairros diferentes da nossa cidade',
    icon: 'MapPin',
    unlocked: false,
    rarity: 'lendario'
  }
];

export const INITIAL_LOYALTY_HISTORY: LoyaltyTransaction[] = [
  {
    id: 'tx-1',
    type: 'purchase_value',
    points: 35,
    description: 'Pontos por valor gasto (R$ 29,40 x 1.2x multiplicador)',
    date: 'Hoje, 16:15',
    merchantName: 'Panificadora Estrela',
    relatedOrderId: 'RADAR-8831'
  },
  {
    id: 'tx-2',
    type: 'frequency_streak',
    points: 80,
    description: 'Bônus de Frequência: 2 compras na mesma semana no bairro!',
    date: 'Hoje, 16:16'
  },
  {
    id: 'tx-3',
    type: 'spin_wheel',
    points: 25,
    description: 'Premiação na Roleta da Sorte Diária',
    date: 'Ontem, 11:20'
  },
  {
    id: 'tx-4',
    type: 'review_bonus',
    points: 15,
    description: 'Avaliação de 5 estrelas para Mercadinho São José',
    date: '18/10/2026',
    merchantName: 'Mercadinho São José'
  },
  {
    id: 'tx-5',
    type: 'purchase_value',
    points: 42,
    description: 'Pontos por compra de Cesta Feira Fresca',
    date: '16/10/2026',
    merchantName: 'Mercadinho São José',
    relatedOrderId: 'RADAR-8822'
  }
];


export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RADAR-8831',
    customerName: 'Mariana Duarte',
    customerPhone: '(19) 99123-4567',
    customerAddress: 'Rua das Camélias, 142 - Apto 3',
    neighborhood: 'Centro',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        notes: 'Pão bem moreninho por favor!'
      },
      {
        product: MOCK_PRODUCTS[1],
        quantity: 1,
        notes: 'Café sem açúcar'
      }
    ],
    subtotal: 26.40,
    deliveryFee: 3.00,
    discount: 0,
    total: 29.40,
    paymentMethod: 'pix',
    paymentStatus: 'paid',
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    courier: MOCK_COURIERS[0],
    estimatedDeliveryTime: 'Chegando em 8 min',
    notes: 'Campainha não toca, por favor bater no portão.'
  },
  {
    id: 'RADAR-8832',
    customerName: 'Seu Geraldo Moreira',
    customerPhone: '(19) 99881-2290',
    customerAddress: 'Av. São Cristóvão, 450',
    neighborhood: 'Bairro São Cristóvão',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    items: [
      {
        product: MOCK_PRODUCTS[2],
        quantity: 1,
        notes: 'Para aniversário'
      }
    ],
    subtotal: 24.00,
    deliveryFee: 4.50,
    discount: 0,
    total: 28.50,
    paymentMethod: 'pix',
    paymentStatus: 'paid',
    status: 'preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    courier: MOCK_COURIERS[1],
    estimatedDeliveryTime: 'Em preparo (20 min)'
  },
  {
    id: 'RADAR-8829',
    customerName: 'Ana Cláudia Silva',
    customerPhone: '(19) 98712-3344',
    customerAddress: 'Rua Bahia, 88 - Casa',
    neighborhood: 'Jardim Alvorada',
    merchantId: 'loja-padaria',
    merchantName: 'Panificadora & Confeitaria Estrela',
    items: [
      {
        product: MOCK_PRODUCTS[3],
        quantity: 2
      }
    ],
    subtotal: 24.00,
    deliveryFee: 4.00,
    discount: 2.00,
    total: 26.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    status: 'delivered',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    courier: MOCK_COURIERS[0],
    rated: true,
    ratingScore: 5,
    ratingComment: 'Chegou quentinho e super rápido, o Tiago entregador foi nota 10!'
  }
];

export const INITIAL_NOTIFICATIONS: MatchPushNotification[] = [
  {
    id: 'notif-welcome-init',
    targetRole: 'customer',
    type: 'reward',
    title: '🎉 Bem-vindo(a) ao Radar Local João Neiva!',
    message: 'Seu cadastro foi ativado com sucesso! Você ganhou 50 pontos no Clube Radar e já começou a receber alertas instantâneos de comércios e serviços.',
    timestamp: 'Agora mesmo',
    read: false,
    priority: 'high',
    notificationKind: 'welcome',
    discountBadge: '+50 Pontos Grátis'
  },
  {
    id: 'notif-serv-1',
    targetRole: 'customer',
    type: 'flash_deal',
    title: '🛠️ EletroNeiva Serviços: 20% OFF no seu bairro',
    message: 'Manutenção elétrica preventiva, padrão de energia ou instalação residencial com 20% OFF para novos clientes.',
    timestamp: 'Há 2 minutos',
    read: false,
    priority: 'high',
    relatedMerchantId: 'serv-eletrica',
    notificationKind: 'service_promo',
    whatsappContact: '5527997814455',
    discountBadge: '20% OFF',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-store-1',
    targetRole: 'both',
    type: 'flash_deal',
    title: '🥖 Panificadora Neivense: Pão quentinho saindo!',
    message: 'Fornada das 16h com pão francês crocante saindo agora com 21% de desconto. Aproveite pelo aplicativo!',
    timestamp: 'Há 5 minutos',
    read: false,
    priority: 'high',
    relatedMerchantId: 'loja-padaria',
    notificationKind: 'store_promo',
    discountBadge: '21% OFF',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-serv-2',
    targetRole: 'customer',
    type: 'flash_deal',
    title: '🚗 Lava-Jato Rota Express: Ducha + Cera por R$ 35',
    message: 'Lavagem técnica rápida e cera de carnaúba com R$ 15 de abatimento para quem agendar pelo Radar hoje.',
    timestamp: 'Há 12 minutos',
    read: false,
    priority: 'normal',
    relatedMerchantId: 'serv-lavajato',
    notificationKind: 'service_promo',
    whatsappContact: '5527998129090',
    discountBadge: 'R$ 15 OFF',
    avatar: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-2',
    targetRole: 'customer',
    type: 'order',
    title: '🛵 Pedido a caminho do seu endereço',
    message: 'Tiago da CG Vermelha acabou de pegar seu pedido na Padaria Estrela e está a caminho do Centro.',
    timestamp: 'Há 15 minutos',
    read: false,
    priority: 'high',
    relatedOrderId: 'RADAR-8831',
    notificationKind: 'order'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'chat-1',
    merchantId: 'loja-padaria',
    customerName: 'Mariana Duarte',
    sender: 'customer',
    text: 'Boa tarde! O pão francês dessa fornada está saindo bem quentinho mesmo?',
    timestamp: '16:05',
    read: true
  },
  {
    id: 'chat-2',
    merchantId: 'loja-padaria',
    customerName: 'Mariana Duarte',
    sender: 'merchant',
    text: 'Olá Mariana! Saiu tem 5 minutinhos do forno, bem dourado e estalando a casca. Quer que separe 10 unidades pra você?',
    timestamp: '16:07',
    read: true
  },
  {
    id: 'chat-3',
    merchantId: 'loja-padaria',
    customerName: 'Mariana Duarte',
    sender: 'customer',
    text: 'Quero sim, já fiz o pedido pelo app no Pix! Se puder mandar com o Tiago motoboy agradeço muito.',
    timestamp: '16:09',
    read: true
  },
  {
    id: 'chat-4',
    merchantId: 'loja-padaria',
    customerName: 'Mariana Duarte',
    sender: 'merchant',
    text: 'Perfeito! O Tiago já está embalando com todo cuidado no baú térmico. Obrigado pela preferência!',
    timestamp: '16:11',
    read: false
  }
];

export interface MerchantManualChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  estimatedReadTime: string;
  summary: string;
  actionItems: string[];
  keyPerk: string;
}

export const MERCHANT_DEVELOPMENT_MANUAL: MerchantManualChapter[] = [
  {
    id: 'cap-1',
    number: 1,
    title: 'Transformação do Comércio Local em João Neiva - ES',
    subtitle: 'Do WhatsApp confuso para uma operação centralizada de bairro',
    estimatedReadTime: '3 min',
    summary: 'Em cidades como João Neiva (~16.700 hab), a venda por telefone ou WhatsApp gera mensagens perdidas, esquecimento de adicionais e filas no atendimento. No Radar Local, o cliente navega pelo seu cardápio com preços transparentes e envia o pedido já com endereço e pagamento organizado.',
    keyPerk: 'Zero pedidos perdidos em horários de pico',
    actionItems: [
      'Mantenha seu cardápio com fotos nítidas e descrições claras dos produtos locais.',
      'Configure horários de funcionamento condizentes com a rotina de João Neiva.',
      'Utilize o chat integrado apenas para tirar dúvidas rápidas e estreitar laços.'
    ]
  },
  {
    id: 'cap-2',
    number: 2,
    title: 'Estratégia de Ofertas Relâmpago com Match Push',
    subtitle: 'Como esgotar fornadas e lotes de produtos em menos de 60 minutos',
    estimatedReadTime: '4 min',
    summary: 'A ferramenta de Match Push avisa simultaneamente moradores que têm interesse nos seus produtos. O segredo é criar lotes limitados (ex: 12 pizzas, 15 porções de pão na chapa) com contagem regressiva de 90 a 180 minutos para ativar a urgência natural do morador.',
    keyPerk: 'Taxa média de abertura de 74.2% no celular dos moradores',
    actionItems: [
      'Dispare Ofertas Relâmpago em horários chave (16h para cafés/padarias e 18h30 para lanches/jantar).',
      'Defina desconto real de 20% a 30% em produtos com alta margem.',
      'Acompanhe o painel de pedidos ao vivo logo após o disparo do Match Push.'
    ]
  },
  {
    id: 'cap-3',
    number: 3,
    title: 'Logística Otimizada por Bairros & Rotas Agrupadas',
    subtitle: 'Como economizar combustível e valorizar motoboys da cidade',
    estimatedReadTime: '4 min',
    summary: 'João Neiva possui bairros próximos (Centro, Vila Nova, Santo Afonso, Santa Luzia) e distritos rurais (Acioli, Demétrio Ribeiro). Ao invés de mandar um motoboy para cada pedido, o agrupador do Radar Local reúne entregas do mesmo bairro para uma viagem única.',
    keyPerk: 'Economia de até 40% nos custos de deslocamento do motoboy',
    actionItems: [
      'Defina taxas justas por setor (R$ 3,00 para Centro, R$ 4,50 para bairros altos e R$ 7,50 para distritos).',
      'Cadastre motoboys de confiança da cidade (ex: Tiago da CG, Marcos da Bros).',
      'Despache 2 ou mais pedidos do mesmo trajeto com 1 clique no Kanban.'
    ]
  },
  {
    id: 'cap-4',
    number: 4,
    title: 'Fidelização Gamificada com o Clube Radar',
    subtitle: 'Como transformar o cliente esporádico em freguês semanal',
    estimatedReadTime: '3 min',
    summary: 'Lojas parceiras credenciadas oferecem multiplicadores de pontos (ex: 1.5x) e cadastram prêmios de balcão (café com pão de queijo, vale compras). Quando o morador vê que seu comércio pontua mais, ele prioriza a sua loja em vez de comprar fora.',
    keyPerk: 'Retenção de clientes de bairro superior a 82%',
    actionItems: [
      'Valide os códigos de vouchers resgatados pelos clientes com 1 clique no app.',
      'Estimule clientes a avaliarem com 5 estrelas para ganharem +15 pontos bônus.',
      'Crie recompensas de baixo custo e alto valor afetivo para moradores da cidade.'
    ]
  }
];

export const ADMIN_APP_INFO = {
  name: 'Coordenação Geral Radar Local - Polo João Neiva',
  adminContactName: 'Equipe de Implantação Radar Local',
  whatsappNumber: '5527998991530',
  whatsappFormatted: '(27) 99899-1530',
  email: 'parcerias.joaoneiva@radarlocal.com.br',
  city: 'João Neiva - ES',
  officeHours: 'Segunda a Sábado, das 08h às 19h'
};

export const MOCK_MERCHANT_LEADS: MerchantLead[] = [
  {
    id: 'lead-mercearia-neivense',
    storeName: 'Mercearia & Hortifruti Neivense',
    ownerName: 'Geraldo Soares Pinto',
    businessType: 'Mercearias & Mercados',
    phone: '(27) 99841-2390',
    email: 'geraldoneivense@gmail.com',
    neighborhood: 'Centro',
    address: 'Av. Brasil, 420 - Centro, João Neiva - ES',
    deliveryType: 'radar_network',
    primaryProducts: 'Verduras frescas da roça, queijo minas, café torrado e mantimentos',
    preferredContactTime: 'morning',
    status: 'pending_contact',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    adminNotes: 'Interessado em disparar promoções de verduras frescas nas terças e quintas.'
  },
  {
    id: 'lead-boutique-ponto-chique',
    storeName: 'Boutique Ponto Chique Moda',
    ownerName: 'Mariana Silveira',
    businessType: 'Moda, Calçados & Vestuário',
    phone: '(27) 99723-8812',
    email: 'mariana.pontochique@hotmail.com',
    neighborhood: 'Vila Nova',
    address: 'Rua Negri Orestes, 115 - Vila Nova, João Neiva - ES',
    deliveryType: 'pickup',
    primaryProducts: 'Roupas femininas, calçados casuais e acessórios',
    preferredContactTime: 'afternoon',
    status: 'phase_2_contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    contactedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    adminNotes: 'Conversado no WhatsApp. Enviando guia de fotos de roupas e catálogo.'
  },
  {
    id: 'lead-hamburgueria-rota',
    storeName: 'Hamburgueria Rota da Serra',
    ownerName: 'Carlos Eduardo "Kadu"',
    businessType: 'Lanches & Pizzas',
    phone: '(27) 99611-4509',
    email: 'kadu.rotadaserra@gmail.com',
    neighborhood: 'Santo Afonso',
    address: 'Rua Projetada, 55 - Santo Afonso, João Neiva - ES',
    deliveryType: 'all',
    primaryProducts: 'Hambúrguer artesanal no pão brioche, batatas rústicas e milk-shakes',
    preferredContactTime: 'night',
    status: 'pending_contact',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    adminNotes: 'Quer ativar o Radar Relâmpago das 18h às 21h com combo promocional.'
  }
];


