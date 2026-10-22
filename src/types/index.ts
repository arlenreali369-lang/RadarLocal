export type UserRole = 'customer' | 'merchant';

export type OrderStatus = 'pending' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'cash';

export interface CityInfo {
  id: string;
  name: string;
  state: string;
  population: number;
  neighborhoods: string[];
  partnerStatus: 'active_polo' | 'onboarding_partners';
  partnerAgency: string;
  merchantsTrainedCount: number;
}

export interface NeighborhoodFee {
  name: string;
  fee: number;
  estimatedMinutes: string;
}

export interface Courier {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  neighborhood: string;
  rating: number;
  deliveriesCount: number;
  status: 'available' | 'busy' | 'offline';
  photoUrl: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  merchantId: string;
  merchantName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
  isFlashDeal?: boolean;
  flashEndsAt?: string;
  pointsReward: number;
  unit?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  avatar: string;
  banner: string;
  rating: number;
  reviewsCount: number;
  neighborhood: string;
  address: string;
  phone: string;
  deliveryTime: string;
  minOrder: number;
  isOpen: boolean;
  acceptsPix: boolean;
  acceptsCard: boolean;
  description: string;
  loyaltyPartner: boolean;
  loyaltyBonusMultiplier: number;
  partnerSince?: string;
  exclusivePerk?: string;
  ownerName?: string;
  email?: string;
  pixKey?: string;
  document?: string;
  deliveryType?: 'own_courier' | 'radar_network' | 'pickup' | 'all';
  isNewRegistration?: boolean;
  businessKind?: 'store' | 'service_provider';
  whatsapp?: string;
  servicePricingNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  neighborhood: string;
  merchantId: string;
  merchantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  pointsUsed?: number;
  pointsDiscount?: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_pix' | 'pay_on_delivery';
  pixCode?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  courier?: Courier;
  notes?: string;
  estimatedDeliveryTime?: string;
  rated?: boolean;
  ratingScore?: number;
  ratingComment?: string;
}

export interface ChatMessage {
  id: string;
  orderId?: string;
  merchantId: string;
  customerName: string;
  sender: 'customer' | 'merchant';
  text: string;
  timestamp: string;
  read: boolean;
  imageUrl?: string;
}

export interface Promotion {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  description: string;
  productId?: string;
  discountPercentage: number;
  originalPrice: number;
  promoPrice: number;
  expiresAt: string;
  unitsLeft: number;
  imageUrl: string;
  badgeText: string;
  category: string;
  promotionKind?: 'store' | 'service';
  whatsapp?: string;
  highlightPerk?: string;
}

export interface Reward {
  id: string;
  title: string;
  merchantId: string;
  merchantName: string;
  merchantNeighborhood: string;
  category: string;
  pointsCost: number;
  originalValue: number;
  description: string;
  imageUrl: string;
  expiresInDays: number;
  availableCount: number;
  howToRedeem: 'qr_or_code_in_counter' | 'in_app_cart_discount' | 'free_delivery';
  terms?: string;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'purchase_value' | 'frequency_streak' | 'weekly_mission' | 'review_bonus' | 'spin_wheel' | 'redemption' | 'cart_discount';
  points: number; // positive for earned, negative for spent
  description: string;
  date: string;
  merchantName?: string;
  relatedOrderId?: string;
}

export interface LoyaltyMission {
  id: string;
  title: string;
  description: string;
  category: 'frequency' | 'diversity' | 'value' | 'community';
  rewardPoints: number;
  currentProgress: number;
  targetProgress: number;
  unit: string;
  completed: boolean;
  badgeIcon: string;
}

export interface LoyaltyBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'comum' | 'raro' | 'lendario';
}

export interface LoyaltyProfile {
  points: number;
  lifetimePoints: number;
  tier: 'vizinho_bronze' | 'morador_prata' | 'conterraneo_ouro' | 'embaixador_vip';
  ordersCount: number;
  memberCode: string;
  memberSince: string;
  currentStreakWeeks: number;
  weeklyOrdersCount: number;
  monthlyOrdersCount: number;
  history: LoyaltyTransaction[];
  missions: LoyaltyMission[];
  badges: LoyaltyBadge[];
  redeemedRewards: Array<{
    id: string;
    reward: Reward;
    code: string;
    redeemedAt: string;
    used: boolean;
    expiresAt: string;
  }>;
  dailySpinUsedDate?: string;
}

export interface MatchPushNotification {
  id: string;
  targetRole: 'customer' | 'merchant' | 'both';
  type: 'order' | 'flash_deal' | 'reward' | 'chat' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  relatedOrderId?: string;
  relatedMerchantId?: string;
  avatar?: string;
  priority: 'high' | 'normal';
  notificationKind?: 'store_promo' | 'service_promo' | 'welcome' | 'order' | 'reward' | 'chat' | 'system';
  whatsappContact?: string;
  promoCode?: string;
  discountBadge?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
  registeredAt: string;
  interestedCategories: string[];
  pushEnabled: boolean;
  welcomeBonusClaimed: boolean;
}

export interface MerchantLead {
  id: string;
  storeName: string;
  ownerName: string;
  businessType: string;
  phone: string;
  email: string;
  neighborhood: string;
  address?: string;
  deliveryType: 'own_courier' | 'radar_network' | 'pickup' | 'all';
  primaryProducts?: string;
  preferredContactTime?: 'morning' | 'afternoon' | 'night' | 'anytime';
  status: 'pending_contact' | 'phase_2_contacted' | 'catalog_setup' | 'active';
  createdAt: string;
  adminNotes?: string;
  contactedAt?: string;
}

export interface MarketingPackage {
  id: string;
  name: string;
  tier: 'bronze' | 'silver' | 'gold';
  priceMonthly: number;
  originalPriceMonthly?: number;
  highlightBadge?: string;
  isPopular?: boolean;
  tagline: string;
  bannerSlotsCount: number;
  customArtsCount: number;
  pushCampaignsCount: number;
  whatsAppSupportTier: string;
  description: string;
  features: string[];
}

export interface AdBanner {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  targetCategory: string;
  planTier: 'bronze' | 'silver' | 'gold';
  active: boolean;
  clicksCount: number;
  viewsCount: number;
  badgeLabel: string;
  actionText: string;
  callToActionKind: 'open_store' | 'whatsapp' | 'view_deals';
  whatsappNumber?: string;
  discountHighlight?: string;
  createdAt: string;
}

export interface ArtCreationRequest {
  id: string;
  merchantId: string;
  merchantName: string;
  requestType: 'app_banner' | 'whatsapp_flyer' | 'promo_card' | 'social_post';
  title: string;
  productOrOffer: string;
  regularPrice?: string;
  offerPrice?: string;
  instructions: string;
  status: 'briefing_sent' | 'in_design' | 'ready_for_review' | 'published_in_app';
  createdAt: string;
  estimatedDeliveryHours: number;
  artPreviewUrl?: string;
  designerNotes?: string;
}

export interface MarketingAdvisor {
  name: string;
  role: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  avatarUrl: string;
  statusText: string;
  specialty: string;
}

