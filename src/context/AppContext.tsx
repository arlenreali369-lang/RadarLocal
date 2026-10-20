import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  UserRole,
  OrderStatus,
  PaymentMethod,
  Merchant,
  Product,
  CartItem,
  Order,
  ChatMessage,
  Promotion,
  Reward,
  LoyaltyProfile,
  LoyaltyTransaction,
  LoyaltyMission,
  LoyaltyBadge,
  MatchPushNotification,
  Courier,
  NeighborhoodFee,
  CityInfo,
  MerchantLead,
  CustomerProfile
} from '../types';
import {
  CURRENT_CITY,
  NEIGHBORHOOD_FEES,
  MOCK_COURIERS,
  MOCK_MERCHANTS,
  MOCK_PRODUCTS,
  MOCK_PROMOTIONS,
  MOCK_REWARDS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_LOYALTY_HISTORY,
  MOCK_LOYALTY_MISSIONS,
  MOCK_LOYALTY_BADGES,
  MOCK_MERCHANT_LEADS,
  ADMIN_APP_INFO
} from '../data/mockData';
import { sounds } from '../utils/audio';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  city: CityInfo;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (name: string) => void;
  isOffline: boolean;
  toggleOfflineMode: () => void;
  lastSyncTime: string;

  merchants: Merchant[];
  products: Product[];
  promotions: Promotion[];
  rewards: Reward[];
  couriers: Courier[];
  neighborhoodFees: NeighborhoodFee[];

  cart: CartItem[];
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartPointsDiscount: number;
  cartPointsUsed: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPointsDiscount: (pointsToUse: number) => boolean;
  removePointsDiscount: () => void;

  orders: Order[];
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    neighborhood: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, courierId?: string) => void;
  rateOrder: (orderId: string, score: number, comment?: string) => void;

  loyaltyProfile: LoyaltyProfile;
  redeemReward: (rewardId: string) => { success: boolean; code?: string; message: string };
  spinDailyWheel: () => { pointsWon: number; message: string };
  claimMissionReward: (missionId: string) => void;
  useVoucher: (voucherCode: string) => void;

  notifications: MatchPushNotification[];
  unreadNotificationsCount: number;
  activeToast: MatchPushNotification | null;
  dismissToast: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendMatchPush: (notif: Omit<MatchPushNotification, 'id' | 'timestamp' | 'read'>) => void;

  chatMessages: ChatMessage[];
  sendChatMessage: (merchantId: string, text: string, sender?: 'customer' | 'merchant', customerName?: string, imageUrl?: string) => void;

  // Merchant controls & Onboarding
  activeMerchant: Merchant;
  activeMerchantId: string;
  setActiveMerchantId: (id: string) => void;
  registerMerchant: (data: Partial<Merchant>, starterProducts?: Partial<Product>[]) => Merchant;
  isMerchantOnboardingOpen: boolean;
  setIsMerchantOnboardingOpen: (open: boolean) => void;
  openMerchantOnboarding: () => void;

  // Merchant Leads (Fase 1) & Showroom Landing
  merchantLeads: MerchantLead[];
  registerMerchantLead: (leadData: Omit<MerchantLead, 'id' | 'createdAt' | 'status'>) => MerchantLead;
  updateLeadStatus: (leadId: string, status: MerchantLead['status'], notes?: string) => void;
  isMerchantShowroomOpen: boolean;
  setIsMerchantShowroomOpen: (open: boolean) => void;
  openMerchantShowroom: () => void;
  adminWhatsAppNumber: string;
  adminWhatsAppFormatted: string;

  createPromotion: (promoData: Omit<Promotion, 'id' | 'merchantId' | 'merchantName'>) => void;
  deletePromotion: (id: string) => void;
  updateNeighborhoodFee: (neighborhood: string, fee: number) => void;
  addCourier: (courier: Omit<Courier, 'id' | 'rating' | 'deliveriesCount'>) => void;
  updateCourierStatus: (id: string, status: Courier['status']) => void;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  viewingStoreId: string | null;
  setViewingStoreId: (storeId: string | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatTargetMerchantId: string | null;
  openChatWithMerchant: (merchantId: string) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Customer Profile & Instant Push Registration
  customerProfile: CustomerProfile | null;
  isCustomerRegistrationOpen: boolean;
  setIsCustomerRegistrationOpen: (open: boolean) => void;
  openCustomerRegistration: () => void;
  registerCustomer: (data: {
    name: string;
    phone: string;
    neighborhood: string;
    interestedCategories: string[];
    enablePush: boolean;
  }) => { profile: CustomerProfile; instantNotifications: MatchPushNotification[] };
  lastRegisteredInstantNotifs: MatchPushNotification[];
  isRegistrationSuccessModalOpen: boolean;
  setIsRegistrationSuccessModalOpen: (open: boolean) => void;
  triggerInstantPromoDemo: () => void;
  logoutCustomer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'radar_local_data_v2';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Centro');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

  // Catalogs
  const [merchants, setMerchants] = useState<Merchant[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_merchants`);
      return saved ? JSON.parse(saved) : MOCK_MERCHANTS;
    } catch {
      return MOCK_MERCHANTS;
    }
  });
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [promotions, setPromotions] = useState<Promotion[]>(MOCK_PROMOTIONS);
  const [rewards] = useState<Reward[]>(MOCK_REWARDS);
  const [couriers, setCouriers] = useState<Courier[]>(MOCK_COURIERS);
  const [neighborhoodFees, setNeighborhoodFees] = useState<NeighborhoodFee[]>(NEIGHBORHOOD_FEES);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartPointsUsed, setCartPointsUsed] = useState<number>(0);
  const [cartPointsDiscount, setCartPointsDiscount] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Loyalty Profile
  const [loyaltyProfile, setLoyaltyProfile] = useState<LoyaltyProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_loyalty`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.history && parsed.missions) return parsed;
      }
    } catch {}

    return {
      points: 320,
      lifetimePoints: 680,
      tier: 'morador_prata',
      ordersCount: 8,
      memberCode: 'RL-7829-BR',
      memberSince: 'Setembro / 2026',
      currentStreakWeeks: 3,
      weeklyOrdersCount: 2,
      monthlyOrdersCount: 6,
      history: INITIAL_LOYALTY_HISTORY,
      missions: MOCK_LOYALTY_MISSIONS,
      badges: MOCK_LOYALTY_BADGES,
      redeemedRewards: [
        {
          id: 'vouch-init-1',
          reward: MOCK_REWARDS[0],
          code: 'RADAR-REWARD-482910',
          redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          used: false,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 29).toISOString()
        }
      ]
    };
  });

  // Notifications
  const [notifications, setNotifications] = useState<MatchPushNotification[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });
  const [activeToast, setActiveToast] = useState<MatchPushNotification | null>(null);

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chat`);
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  // Navigation states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewingStoreId, setViewingStoreId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTargetMerchantId, setChatTargetMerchantId] = useState<string | null>('loja-padaria');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Active Merchant & Onboarding states
  const [activeMerchantId, setActiveMerchantId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_active_merchant`);
      return saved || MOCK_MERCHANTS[0].id;
    } catch {
      return MOCK_MERCHANTS[0].id;
    }
  });

  const activeMerchant = useMemo(() => {
    return merchants.find(m => m.id === activeMerchantId) || merchants[0] || MOCK_MERCHANTS[0];
  }, [merchants, activeMerchantId]);

  const [isMerchantOnboardingOpen, setIsMerchantOnboardingOpen] = useState<boolean>(false);
  const openMerchantOnboarding = () => setIsMerchantOnboardingOpen(true);

  // Merchant Leads (Fase 1) & Showroom Landing
  const [merchantLeads, setMerchantLeads] = useState<MerchantLead[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_merchant_leads`);
      return saved ? JSON.parse(saved) : MOCK_MERCHANT_LEADS;
    } catch {
      return MOCK_MERCHANT_LEADS;
    }
  });

  const [isMerchantShowroomOpen, setIsMerchantShowroomOpen] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('portal') === 'lojista' ||
             params.get('link') === 'lojista' ||
             params.get('modo') === 'lojista' ||
             params.get('cadastro') === 'lojista';
    } catch {
      return false;
    }
  });
  const openMerchantShowroom = () => setIsMerchantShowroomOpen(true);

  // Customer Profile State & Instant Notifications
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_customer_profile`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isCustomerRegistrationOpen, setIsCustomerRegistrationOpen] = useState<boolean>(false);
  const openCustomerRegistration = () => setIsCustomerRegistrationOpen(true);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] = useState<boolean>(false);
  const [lastRegisteredInstantNotifs, setLastRegisteredInstantNotifs] = useState<MatchPushNotification[]>([]);

  // Persist locally for offline capability
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_loyalty`, JSON.stringify(loyaltyProfile));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_chat`, JSON.stringify(chatMessages));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_merchants`, JSON.stringify(merchants));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_active_merchant`, activeMerchantId);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_merchant_leads`, JSON.stringify(merchantLeads));
      if (customerProfile) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_customer_profile`, JSON.stringify(customerProfile));
      } else {
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}_customer_profile`);
      }
      setLastSyncTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    } catch {}
  }, [orders, loyaltyProfile, notifications, chatMessages, merchants, activeMerchantId, merchantLeads, customerProfile]);

  // Network offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOfflineMode = () => {
    setIsOffline(prev => !prev);
  };

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartDeliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    const feeObj = neighborhoodFees.find(f => f.name === selectedNeighborhood);
    return feeObj ? feeObj.fee : 4.00;
  }, [cart, neighborhoodFees, selectedNeighborhood]);

  const cartTotal = useMemo(() => {
    const gross = cartSubtotal + (cartSubtotal > 0 ? cartDeliveryFee : 0);
    return Math.max(0, gross - cartPointsDiscount);
  }, [cartSubtotal, cartDeliveryFee, cartPointsDiscount]);

  const addToCart = (product: Product, quantity = 1, notes?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, notes }];
    });
    sounds.playMessageSent();
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCartPointsUsed(0);
    setCartPointsDiscount(0);
  };

  // Redeem Points directly inside the Cart
  const applyPointsDiscount = (pointsToUse: number): boolean => {
    if (pointsToUse > loyaltyProfile.points) return false;
    // 100 points = R$ 10,00 discount (or proportional)
    const discountValue = Math.min(cartSubtotal, (pointsToUse / 100) * 10);
    setCartPointsUsed(pointsToUse);
    setCartPointsDiscount(discountValue);
    sounds.playCoinReward();
    return true;
  };

  const removePointsDiscount = () => {
    setCartPointsUsed(0);
    setCartPointsDiscount(0);
  };

  // Match Push helper
  const sendMatchPush = (notif: Omit<MatchPushNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: MatchPushNotification = {
      ...notif,
      id: `push-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Agora mesmo',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);

    if (notif.type === 'order') {
      sounds.playNewOrderAlert();
    } else if (notif.type === 'reward') {
      sounds.playCoinReward();
    } else {
      sounds.playMatchPush();
    }

    setTimeout(() => {
      setActiveToast(current => (current?.id === newNotif.id ? null : current));
    }, 6000);
  };

  const dismissToast = () => setActiveToast(null);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read && (n.targetRole === 'both' || n.targetRole === userRole)).length;
  }, [notifications, userRole]);

  // Place Order with Value + Frequency Points Calculation
  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    neighborhood: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `RADAR-${orderNumber}`;
    const merchant = merchants.find(m => m.id === cart[0]?.product.merchantId) || activeMerchant;

    // 1. Calculate points earned from order value with Tier multiplier
    let tierMultiplier = 1.0;
    if (loyaltyProfile.tier === 'morador_prata') tierMultiplier = 1.2;
    else if (loyaltyProfile.tier === 'conterraneo_ouro') tierMultiplier = 1.5;
    else if (loyaltyProfile.tier === 'embaixador_vip') tierMultiplier = 2.0;

    const merchantBonusMultiplier = merchant.loyaltyBonusMultiplier || 1.0;
    const valuePointsEarned = Math.round(cartSubtotal * tierMultiplier * merchantBonusMultiplier);

    // 2. Frequency bonus (encouraging recurring purchases in small town)
    const newWeeklyCount = loyaltyProfile.weeklyOrdersCount + 1;
    let frequencyBonusPoints = 0;
    let frequencyBonusDescription = '';

    if (newWeeklyCount >= 2) {
      // Bonus for recurring purchase in the same week
      frequencyBonusPoints = 50;
      frequencyBonusDescription = `Bônus de Frequência Semanal: ${newWeeklyCount}ª compra no comércio da cidade!`;
    }

    const totalPointsAwarded = valuePointsEarned + frequencyBonusPoints;

    const newOrder: Order = {
      id: orderId,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerAddress: details.customerAddress,
      neighborhood: details.neighborhood,
      merchantId: merchant.id,
      merchantName: merchant.name,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      discount: cartPointsDiscount,
      pointsUsed: cartPointsUsed,
      pointsDiscount: cartPointsDiscount,
      total: cartTotal,
      paymentMethod: details.paymentMethod,
      paymentStatus: details.paymentMethod === 'pix' ? 'paid' : details.paymentMethod === 'cash' ? 'pay_on_delivery' : 'paid',
      pixCode: `00020126580014BR.GOV.BCB.PIX0136pix@radarlocal.com.br520400005303986540${cartTotal.toFixed(2)}5802BR5913${merchant.name.substring(0, 13)}6009SAO BENTO62070503***6304`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: details.notes,
      estimatedDeliveryTime: '20-35 min'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update Loyalty Profile with transactions
    setLoyaltyProfile(prev => {
      let currentPoints = prev.points;

      // If user spent points in cart for discount
      const newTransactions: LoyaltyTransaction[] = [];

      if (cartPointsUsed > 0) {
        currentPoints -= cartPointsUsed;
        newTransactions.push({
          id: `tx-spend-${Date.now()}`,
          type: 'cart_discount',
          points: -cartPointsUsed,
          description: `Desconto de R$ ${cartPointsDiscount.toFixed(2).replace('.', ',')} no pedido #${orderId}`,
          date: 'Agora mesmo',
          merchantName: merchant.name,
          relatedOrderId: orderId
        });
      }

      // Add Value Points
      currentPoints += valuePointsEarned;
      newTransactions.push({
        id: `tx-val-${Date.now()}`,
        type: 'purchase_value',
        points: valuePointsEarned,
        description: `Pontos por valor gasto (R$ ${cartSubtotal.toFixed(2).replace('.', ',')} x ${tierMultiplier}x nível)`,
        date: 'Agora mesmo',
        merchantName: merchant.name,
        relatedOrderId: orderId
      });

      // Add Frequency Bonus if applicable
      if (frequencyBonusPoints > 0) {
        currentPoints += frequencyBonusPoints;
        newTransactions.push({
          id: `tx-freq-${Date.now()}`,
          type: 'frequency_streak',
          points: frequencyBonusPoints,
          description: frequencyBonusDescription,
          date: 'Agora mesmo'
        });
      }

      const newLifetime = prev.lifetimePoints + totalPointsAwarded;

      // Tier check
      let newTier: LoyaltyProfile['tier'] = 'vizinho_bronze';
      if (newLifetime >= 1200) newTier = 'embaixador_vip';
      else if (newLifetime >= 600) newTier = 'conterraneo_ouro';
      else if (newLifetime >= 200) newTier = 'morador_prata';

      // Update missions progress
      const updatedMissions = prev.missions.map(m => {
        if (m.id === 'mission-streak') {
          const progress = Math.min(m.targetProgress, newWeeklyCount);
          return { ...m, currentProgress: progress, completed: progress >= m.targetProgress };
        }
        if (m.id === 'mission-value') {
          const progress = Math.min(m.targetProgress, m.currentProgress + cartSubtotal);
          return { ...m, currentProgress: progress, completed: progress >= m.targetProgress };
        }
        return m;
      });

      return {
        ...prev,
        points: currentPoints,
        lifetimePoints: newLifetime,
        ordersCount: prev.ordersCount + 1,
        weeklyOrdersCount: newWeeklyCount,
        monthlyOrdersCount: prev.monthlyOrdersCount + 1,
        tier: newTier,
        history: [...newTransactions, ...prev.history],
        missions: updatedMissions
      };
    });

    clearCart();
    sounds.playCoinReward();

    // Trigger Merchant Match Push
    sendMatchPush({
      targetRole: 'merchant',
      type: 'order',
      title: `🔔 Novo Pedido #${orderId} Recebido!`,
      message: `${details.customerName} acabou de pedir R$ ${cartTotal.toFixed(2).replace('.', ',')} no ${details.neighborhood}.`,
      priority: 'high',
      relatedOrderId: orderId,
      relatedMerchantId: merchant.id
    });

    // Customer notification detailing points earned
    sendMatchPush({
      targetRole: 'customer',
      type: 'order',
      title: `🎉 Pedido Confirmado! +${totalPointsAwarded} Pontos!`,
      message: `Você ganhou +${valuePointsEarned} pts pelo valor da compra${frequencyBonusPoints > 0 ? ` e +${frequencyBonusPoints} pts de frequência semanal!` : '!'}`,
      priority: 'high',
      relatedOrderId: orderId
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, courierId?: string) => {
    let assignedCourier: Courier | undefined;
    if (courierId) {
      assignedCourier = couriers.find(c => c.id === courierId);
    }

    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const updated = {
            ...order,
            status,
            courier: assignedCourier || order.courier,
            updatedAt: new Date().toISOString()
          };
          return updated;
        }
        return order;
      })
    );

    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (status === 'preparing') {
      sendMatchPush({
        targetRole: 'customer',
        type: 'order',
        title: `🍳 Pedido #${orderId} em preparo!`,
        message: `${order.merchantName} começou a preparar seus produtos com todo o carinho.`,
        priority: 'normal',
        relatedOrderId: orderId
      });
    } else if (status === 'out_for_delivery') {
      const courierName = assignedCourier?.name || 'Entregador de confiança';
      sendMatchPush({
        targetRole: 'customer',
        type: 'order',
        title: `🛵 Saiu para entrega! Pedido #${orderId}`,
        message: `${courierName} está a caminho da sua casa no ${order.neighborhood}!`,
        priority: 'high',
        relatedOrderId: orderId
      });
    } else if (status === 'delivered') {
      sendMatchPush({
        targetRole: 'customer',
        type: 'order',
        title: `🎉 Pedido #${orderId} entregue!`,
        message: 'Bom apetite! Avalie o comércio e ganhe +15 Pontos de Fidelidade!',
        priority: 'high',
        relatedOrderId: orderId
      });
    }
  };

  const rateOrder = (orderId: string, score: number, comment?: string) => {
    const order = orders.find(o => o.id === orderId);
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, rated: true, ratingScore: score, ratingComment: comment } : o))
    );

    // Reward customer with 15 bonus points for reviewing local commerce
    const bonus = 15;
    setLoyaltyProfile(prev => ({
      ...prev,
      points: prev.points + bonus,
      lifetimePoints: prev.lifetimePoints + bonus,
      history: [
        {
          id: `tx-rev-${Date.now()}`,
          type: 'review_bonus',
          points: bonus,
          description: `Avaliação de ${score} estrelas para ${order?.merchantName || 'Comércio Local'}`,
          date: 'Agora mesmo',
          merchantName: order?.merchantName,
          relatedOrderId: orderId
        },
        ...prev.history
      ]
    }));

    sounds.playCoinReward();

    sendMatchPush({
      targetRole: 'merchant',
      type: 'system',
      title: '⭐ Nova Avaliação de Cliente!',
      message: `Cliente deu ${score} estrelas para o pedido #${orderId}: "${comment || 'Excelente atendimento de bairro!'}"`,
      priority: 'normal'
    });
  };

  // Loyalty Reward Redemption
  const redeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return { success: false, message: 'Recompensa não encontrada' };

    if (loyaltyProfile.points < reward.pointsCost) {
      return { success: false, message: `Pontos insuficientes. Você precisa de ${reward.pointsCost} pontos.` };
    }

    const code = `RADAR-REWARD-${Math.floor(100000 + Math.random() * 900000)}`;

    setLoyaltyProfile(prev => ({
      ...prev,
      points: prev.points - reward.pointsCost,
      history: [
        {
          id: `tx-redeem-${Date.now()}`,
          type: 'redemption',
          points: -reward.pointsCost,
          description: `Resgate: ${reward.title} (${reward.merchantName})`,
          date: 'Agora mesmo',
          merchantName: reward.merchantName
        },
        ...prev.history
      ],
      redeemedRewards: [
        {
          id: `redeemed-${Date.now()}`,
          reward,
          code,
          redeemedAt: new Date().toISOString(),
          used: false,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * reward.expiresInDays).toISOString()
        },
        ...prev.redeemedRewards
      ]
    }));

    sounds.playCoinReward();

    // Match Push to merchant
    sendMatchPush({
      targetRole: 'merchant',
      type: 'reward',
      title: '🎁 Alerta de Resgate de Recompensa!',
      message: `Um morador resgatou "${reward.title}" na sua loja. Código: ${code}. Prepare o atendimento especial!`,
      priority: 'high',
      relatedMerchantId: reward.merchantId
    });

    return { success: true, code, message: `Recompensa resgatada com sucesso! Código gerado: ${code}` };
  };

  const useVoucher = (voucherCode: string) => {
    setLoyaltyProfile(prev => ({
      ...prev,
      redeemedRewards: prev.redeemedRewards.map(v =>
        v.code === voucherCode ? { ...v, used: true } : v
      )
    }));
  };

  const claimMissionReward = (missionId: string) => {
    const mission = loyaltyProfile.missions.find(m => m.id === missionId);
    if (!mission || !mission.completed) return;

    setLoyaltyProfile(prev => ({
      ...prev,
      points: prev.points + mission.rewardPoints,
      lifetimePoints: prev.lifetimePoints + mission.rewardPoints,
      history: [
        {
          id: `tx-mission-${Date.now()}`,
          type: 'weekly_mission',
          points: mission.rewardPoints,
          description: `Missão Concluída: ${mission.title}`,
          date: 'Agora mesmo'
        },
        ...prev.history
      ],
      missions: prev.missions.map(m =>
        m.id === missionId ? { ...m, currentProgress: 0, completed: false } : m
      )
    }));

    sounds.playCoinReward();
  };

  // Daily Lucky Spin
  const spinDailyWheel = () => {
    const rewardsPool = [15, 25, 50, 10, 30, 100];
    const won = rewardsPool[Math.floor(Math.random() * rewardsPool.length)];

    setLoyaltyProfile(prev => ({
      ...prev,
      points: prev.points + won,
      lifetimePoints: prev.lifetimePoints + won,
      dailySpinUsedDate: new Date().toISOString().split('T')[0],
      history: [
        {
          id: `tx-spin-${Date.now()}`,
          type: 'spin_wheel',
          points: won,
          description: 'Giro da Sorte do Comércio Local',
          date: 'Agora mesmo'
        },
        ...prev.history
      ]
    }));

    sounds.playCoinReward();
    return { pointsWon: won, message: `Parabéns! Você ganhou +${won} Pontos do Bairro na Roleta Diária!` };
  };

  // Chat bilateral
  const sendChatMessage = (
    merchantId: string,
    text: string,
    sender: 'customer' | 'merchant' = userRole,
    customerName = 'Mariana Duarte',
    imageUrl?: string
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      merchantId,
      customerName,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      imageUrl
    };

    setChatMessages(prev => [...prev, newMsg]);
    sounds.playMessageSent();

    if (sender === 'customer') {
      sendMatchPush({
        targetRole: 'merchant',
        type: 'chat',
        title: `💬 Nova mensagem de ${customerName}`,
        message: text.length > 50 ? `${text.substring(0, 50)}...` : text,
        priority: 'high',
        relatedMerchantId: merchantId
      });
    } else {
      sendMatchPush({
        targetRole: 'customer',
        type: 'chat',
        title: `💬 Mensagem do Lojista (${activeMerchant.name})`,
        message: text.length > 50 ? `${text.substring(0, 50)}...` : text,
        priority: 'high',
        relatedMerchantId: merchantId
      });
    }
  };

  const openChatWithMerchant = (merchantId: string) => {
    setChatTargetMerchantId(merchantId);
    setIsChatOpen(true);
  };

  const createPromotion = (promoData: Omit<Promotion, 'id' | 'merchantId' | 'merchantName'>) => {
    const promoId = `promo-${Date.now()}`;
    const newPromo: Promotion = {
      ...promoData,
      id: promoId,
      merchantId: activeMerchant.id,
      merchantName: activeMerchant.name
    };

    setPromotions(prev => [newPromo, ...prev]);

    if (promoData.productId) {
      setProducts(prev =>
        prev.map(p =>
          p.id === promoData.productId
            ? { ...p, isFlashDeal: true, price: promoData.promoPrice, originalPrice: promoData.originalPrice }
            : p
        )
      );
    }

    sendMatchPush({
      targetRole: 'customer',
      type: 'flash_deal',
      title: `⚡ Oferta Relâmpago: ${newPromo.title}!`,
      message: `${activeMerchant.name} anunciou ${newPromo.discountPercentage}% OFF com vagas limitadas. Peça já!`,
      priority: 'high',
      relatedMerchantId: activeMerchant.id
    });
  };

  const deletePromotion = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
  };

  const updateNeighborhoodFee = (neighborhood: string, fee: number) => {
    setNeighborhoodFees(prev =>
      prev.map(n => (n.name === neighborhood ? { ...n, fee } : n))
    );
  };

  const addCourier = (courierData: Omit<Courier, 'id' | 'rating' | 'deliveriesCount'>) => {
    const newCourier: Courier = {
      ...courierData,
      id: `courier-${Date.now()}`,
      rating: 5.0,
      deliveriesCount: 0
    };
    setCouriers(prev => [...prev, newCourier]);
  };

  const updateCourierStatus = (id: string, status: Courier['status']) => {
    setCouriers(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  const registerMerchant = (data: Partial<Merchant>, starterProducts?: Partial<Product>[]): Merchant => {
    const cleanSlug = (data.name || 'loja')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const newId = `loja-${cleanSlug}-${Date.now().toString().slice(-4)}`;

    const newMerchant: Merchant = {
      id: newId,
      name: data.name || 'Novo Comércio de João Neiva',
      category: data.category || 'Mercearias & Mercados',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
      banner: data.banner || 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 1,
      neighborhood: data.neighborhood || selectedNeighborhood || 'Centro',
      address: data.address || `${data.neighborhood || 'Centro'}, João Neiva - ES`,
      phone: data.phone || '(27) 99999-0000',
      deliveryTime: data.deliveryTime || '15-25 min',
      minOrder: data.minOrder ?? 10.00,
      isOpen: true,
      acceptsPix: true,
      acceptsCard: true,
      description: data.description || 'Novo estabelecimento parceiro credenciado no Radar Local em João Neiva.',
      loyaltyPartner: true,
      loyaltyBonusMultiplier: 1.5,
      exclusivePerk: data.exclusivePerk || 'Acúmulo de pontos turbinado no Radar',
      ownerName: data.ownerName,
      email: data.email,
      pixKey: data.pixKey,
      document: data.document,
      deliveryType: data.deliveryType || 'all',
      partnerSince: 'Hoje',
      isNewRegistration: true
    };

    setMerchants(prev => [newMerchant, ...prev]);
    setActiveMerchantId(newId);
    setUserRole('merchant');

    if (starterProducts && starterProducts.length > 0) {
      const createdProducts: Product[] = starterProducts.map((p, idx) => ({
        id: `prod-${newId}-${idx}-${Date.now()}`,
        merchantId: newId,
        merchantName: newMerchant.name,
        name: p.name || 'Produto',
        description: p.description || '',
        price: p.price || 12.00,
        originalPrice: p.originalPrice,
        category: newMerchant.category,
        image: p.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
        inStock: true,
        pointsReward: Math.round((p.price || 12) * 1.5)
      }));
      setProducts(prev => [...createdProducts, ...prev]);
    }

    sendMatchPush({
      targetRole: 'both',
      type: 'system',
      title: '🎉 Novo Lojista Credenciado em João Neiva!',
      message: `${newMerchant.name} acaba de se cadastrar no Radar Local no bairro ${newMerchant.neighborhood}! Conheça a vitrine e ganhe pontos.`,
      priority: 'high',
      relatedMerchantId: newId
    });

    sounds.playCoinReward();
    return newMerchant;
  };

  const registerMerchantLead = (leadData: Omit<MerchantLead, 'id' | 'createdAt' | 'status'>): MerchantLead => {
    const newLead: MerchantLead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'pending_contact',
      createdAt: new Date().toISOString()
    };
    setMerchantLeads(prev => [newLead, ...prev]);

    // Send high-priority alert to Admin
    sendMatchPush({
      targetRole: 'merchant',
      type: 'system',
      title: '📋 Novo Lojista Cadastrado (Fase 1)!',
      message: `${newLead.storeName} (${newLead.ownerName}) de João Neiva cadastrou-se no portal. Chame no WhatsApp para iniciar a Fase 2!`,
      priority: 'high'
    });

    sounds.playSuccess();
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: MerchantLead['status'], notes?: string) => {
    setMerchantLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status,
          ...(notes !== undefined ? { adminNotes: notes } : {}),
          ...(status === 'phase_2_contacted' ? { contactedAt: new Date().toISOString() } : {})
        };
      }
      return lead;
    }));
  };

  const registerCustomer = (data: {
    name: string;
    phone: string;
    neighborhood: string;
    interestedCategories: string[];
    enablePush: boolean;
  }) => {
    const profile: CustomerProfile = {
      id: `client-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: data.name,
      phone: data.phone,
      neighborhood: data.neighborhood,
      registeredAt: new Date().toISOString(),
      interestedCategories: data.interestedCategories,
      pushEnabled: data.enablePush,
      welcomeBonusClaimed: true
    };

    setCustomerProfile(profile);
    setSelectedNeighborhood(data.neighborhood);

    // 1. Credit 50 Welcome Points to Loyalty Profile
    const bonus = 50;
    setLoyaltyProfile(prev => ({
      ...prev,
      points: prev.points + bonus,
      lifetimePoints: prev.lifetimePoints + bonus,
      history: [
        {
          id: `tx-welcome-${Date.now()}`,
          type: 'weekly_mission',
          points: bonus,
          description: `🎉 Bônus Boas-Vindas Morador (${data.neighborhood})`,
          date: 'Agora mesmo'
        },
        ...prev.history
      ]
    }));

    // 2. Generate INSTANTANEOUS NOTIFICATIONS: Stores and Local Service Providers!
    const firstName = data.name.trim().split(' ')[0] || 'Morador';
    const instantNotifications: MatchPushNotification[] = [
      {
        id: `push-welcome-${Date.now()}`,
        targetRole: 'customer',
        type: 'reward',
        title: `🎉 Bem-vindo(a), ${firstName}! (+50 Pontos)`,
        message: `Seu cadastro no Radar Local foi ativado! Você ganhou 50 pontos no Clube Radar e já começou a receber alertas instantâneos de comércios e prestadores de serviços de ${data.neighborhood}!`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'high',
        notificationKind: 'welcome',
        discountBadge: '+50 Pontos Grátis'
      },
      {
        id: `push-loja-padaria-${Date.now()}`,
        targetRole: 'customer',
        type: 'flash_deal',
        title: `🥖 Panificadora Neivense: Pão quentinho saindo com 21% OFF!`,
        message: `Fornada artesanal crocante saindo agora com entrega prioritária no ${data.neighborhood}! Peça pelo app.`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'high',
        relatedMerchantId: 'loja-padaria',
        notificationKind: 'store_promo',
        discountBadge: '21% OFF',
        avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: `push-serv-eletrica-${Date.now()}`,
        targetRole: 'customer',
        type: 'flash_deal',
        title: `🛠️ EletroNeiva Serviços: 20% OFF no seu bairro!`,
        message: `Manutenção elétrica, revisão de padrão e instalação residencial com 20% de desconto para novos cadastros do ${data.neighborhood}. Chame no WhatsApp!`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'high',
        relatedMerchantId: 'serv-eletrica',
        notificationKind: 'service_promo',
        whatsappContact: '5527997814455',
        discountBadge: '20% OFF',
        avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: `push-serv-lavajato-${Date.now()}`,
        targetRole: 'customer',
        type: 'flash_deal',
        title: `🚗 Lava-Jato Rota Express: Ducha Completa + Cera por R$ 35!`,
        message: `Lavagem técnica de veículos com R$ 15 de desconto hoje. Válido para novos moradores cadastrados em João Neiva!`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'high',
        relatedMerchantId: 'serv-lavajato',
        notificationKind: 'service_promo',
        whatsappContact: '5527998129090',
        discountBadge: 'R$ 15 OFF',
        avatar: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: `push-barbearia-${Date.now()}`,
        targetRole: 'customer',
        type: 'flash_deal',
        title: `✂️ Barbearia Real: Corte + Barba com 25% OFF!`,
        message: `Trato completo no visual com toalha quente e atendimento vip. Agendamento direto pelo WhatsApp!`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'normal',
        relatedMerchantId: 'serv-barbearia',
        notificationKind: 'service_promo',
        whatsappContact: '5527999337811',
        discountBadge: '25% OFF',
        avatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: `push-pizzaria-${Date.now()}`,
        targetRole: 'customer',
        type: 'flash_deal',
        title: `🍕 Pizzaria Rota da Serra: R$ 15 OFF no 1º Pedido!`,
        message: `Pizza quentinha no forno a lenha entregue na sua porta. Use o cupom BEMVINDO15 no checkout!`,
        timestamp: 'Agora mesmo',
        read: false,
        priority: 'normal',
        relatedMerchantId: 'loja-pizzaria',
        notificationKind: 'store_promo',
        promoCode: 'BEMVINDO15',
        discountBadge: 'R$ 15 OFF',
        avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&auto=format&fit=crop&q=80'
      }
    ];

    setNotifications(prev => [...instantNotifications, ...prev]);
    setLastRegisteredInstantNotifs(instantNotifications);
    setActiveToast(instantNotifications[1]);
    setIsCustomerRegistrationOpen(false);
    setIsRegistrationSuccessModalOpen(true);

    sounds.playCoinReward();

    if (data.enablePush && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            try {
              new Notification('Radar Local João Neiva', {
                body: `🎉 Bem-vindo(a), ${firstName}! Novas promoções de lojas e serviços já estão ativas para o ${data.neighborhood}!`,
                icon: '/icon.png'
              });
            } catch {}
          }
        });
      } else if (Notification.permission === 'granted') {
        try {
          new Notification('Radar Local João Neiva', {
            body: `🎉 Bem-vindo(a), ${firstName}! Novas promoções de lojas e serviços já estão ativas para o ${data.neighborhood}!`,
            icon: '/icon.png'
          });
        } catch {}
      }
    }

    return { profile, instantNotifications };
  };

  const triggerInstantPromoDemo = () => {
    const demoPool: Array<{
      title: string;
      message: string;
      kind: 'store_promo' | 'service_promo';
      merchantId: string;
      whatsapp?: string;
      badge: string;
      avatar: string;
    }> = [
      {
        title: '🥖 Panificadora Neivense: Fornada das 17h!',
        message: 'Pão francês quentinho e bolo de cenoura com brigadeiro com 20% OFF para entrega no seu bairro!',
        kind: 'store_promo',
        merchantId: 'loja-padaria',
        badge: '20% OFF',
        avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80'
      },
      {
        title: '⚡ EletroNeiva: Orçamento Grátis e 20% OFF!',
        message: 'Eletricista disponível para atendimento rápido no seu bairro. Instalação e reparos elétricos com desconto!',
        kind: 'service_promo',
        merchantId: 'serv-eletrica',
        whatsapp: '5527997814455',
        badge: '20% OFF',
        avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&auto=format&fit=crop&q=80'
      },
      {
        title: '🚗 Lava-Jato Rota Express: Vaga Aberta!',
        message: 'Traga seu carro agora e ganhe aplicação de cera e pretinho grátis na lavagem completa!',
        kind: 'service_promo',
        merchantId: 'serv-lavajato',
        whatsapp: '5527998129090',
        badge: 'Cera Grátis',
        avatar: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&auto=format&fit=crop&q=80'
      },
      {
        title: '📱 Neiva Tech: Troca de Tela em 40min com Brinde!',
        message: 'Conserto expresso de celulares com película 3D grátis para clientes cadastrados no Radar Local.',
        kind: 'service_promo',
        merchantId: 'serv-informatica',
        whatsapp: '5527996553211',
        badge: 'Película Grátis',
        avatar: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=100&auto=format&fit=crop&q=80'
      }
    ];

    const pick = demoPool[Math.floor(Math.random() * demoPool.length)];
    const newDemoNotif: MatchPushNotification = {
      id: `push-demo-${Date.now()}`,
      targetRole: 'customer',
      type: 'flash_deal',
      title: pick.title,
      message: pick.message,
      timestamp: 'Agora mesmo',
      read: false,
      priority: 'high',
      notificationKind: pick.kind,
      relatedMerchantId: pick.merchantId,
      whatsappContact: pick.whatsapp,
      discountBadge: pick.badge,
      avatar: pick.avatar
    };

    setNotifications(prev => [newDemoNotif, ...prev]);
    setActiveToast(newDemoNotif);
    sounds.playMatchPush();
  };

  const logoutCustomer = () => {
    setCustomerProfile(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_customer_profile`);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        city: CURRENT_CITY,
        selectedNeighborhood,
        setSelectedNeighborhood,
        isOffline,
        toggleOfflineMode,
        lastSyncTime,

        merchants,
        products,
        promotions,
        rewards,
        couriers,
        neighborhoodFees,

        cart,
        cartSubtotal,
        cartDeliveryFee,
        cartPointsDiscount,
        cartPointsUsed,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyPointsDiscount,
        removePointsDiscount,

        orders,
        placeOrder,
        updateOrderStatus,
        rateOrder,

        loyaltyProfile,
        redeemReward,
        spinDailyWheel,
        claimMissionReward,
        useVoucher,

        notifications,
        unreadNotificationsCount,
        activeToast,
        dismissToast,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendMatchPush,

        chatMessages,
        sendChatMessage,

        activeMerchant,
        activeMerchantId,
        setActiveMerchantId,
        registerMerchant,
        isMerchantOnboardingOpen,
        setIsMerchantOnboardingOpen,
        openMerchantOnboarding,

        merchantLeads,
        registerMerchantLead,
        updateLeadStatus,
        isMerchantShowroomOpen,
        setIsMerchantShowroomOpen,
        openMerchantShowroom,
        adminWhatsAppNumber: ADMIN_APP_INFO.whatsappNumber,
        adminWhatsAppFormatted: ADMIN_APP_INFO.whatsappFormatted,

        createPromotion,
        deletePromotion,
        updateNeighborhoodFee,
        addCourier,
        updateCourierStatus,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        viewingStoreId,
        setViewingStoreId,
        isCartOpen,
        setIsCartOpen,
        isChatOpen,
        setIsChatOpen,
        chatTargetMerchantId,
        openChatWithMerchant,
        isNotificationsOpen,
        setIsNotificationsOpen,

        // Customer Profile & Instant Push Registration
        customerProfile,
        isCustomerRegistrationOpen,
        setIsCustomerRegistrationOpen,
        openCustomerRegistration,
        registerCustomer,
        lastRegisteredInstantNotifs,
        isRegistrationSuccessModalOpen,
        setIsRegistrationSuccessModalOpen,
        triggerInstantPromoDemo,
        logoutCustomer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
