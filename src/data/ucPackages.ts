import heroCrateImg from '@/src/assets/images/hero_pubg_supply_crate_1794628401832.jpg';
import starterPackImg from '@/src/assets/images/uc_pack_starter_1794628401693.jpg';
import mediumPackImg from '@/src/assets/images/uc_pack_medium_1794628402432.jpg';
import elitePackImg from '@/src/assets/images/uc_pack_elite_1794628403174.jpg';

export type CurrencyCode = 'TJS' | 'RUB' | 'USD';

export type PackageCategory = 'all' | 'starter' | 'popular' | 'pro';

export type PaymentMethodId = 'dc' | 'eskhata';

export interface UcPackage {
  id: string;
  totalUc: number;
  baseUc: number;
  bonusUc: number;
  title: string;
  subtitle: string;
  category: Exclude<PackageCategory, 'all'>;
  tag?: string;
  prices: {
    TJS: number;
    RUB: number;
    USD: number;
  };
  image: string;
  imageAlt: string;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  playerId: string;
  nickname: string;
  contactPhone: string;
  paymentMethod: PaymentMethodId;
  currency: CurrencyCode;
  totalAmount: number;
  totalUc: number;
  items: Array<{
    title: string;
    quantity: number;
    unitPrice: number;
    totalUc: number;
  }>;
}

export const PAYMENT_METHODS: Record<
  PaymentMethodId,
  { id: PaymentMethodId; name: string; shortName: string; hint: string }
> = {
  dc: {
    id: 'dc',
    name: 'Душанбе Сити (ДС)',
    shortName: 'ДС',
    hint: 'Перевод в приложении Dushanbe City по номеру телефона',
  },
  eskhata: {
    id: 'eskhata',
    name: 'Эсхата Онлайн',
    shortName: 'Эсхата',
    hint: 'Перевод в приложении Eskhata Online по номеру телефона',
  },
};

export const SELLER_INFO = {
  name: 'Каримов Абдучалол',
  paymentMethod: 'Душанбе Сити (ДС) и Эсхата Онлайн',
  phone: '021090008',
  deliveryTime: '2–5 минут',
  region: 'PUBG Mobile · Global / Таджикистан',
} as const;

export const HERO_MEDIA = {
  src: heroCrateImg,
  alt: 'Тактический контейнер снабжения PUBG Mobile с золотыми слитками UC',
};

export const CURRENCY_LABELS: Record<CurrencyCode, { symbol: string; label: string }> = {
  TJS: { symbol: 'сомони', label: 'TJS · сомони' },
  RUB: { symbol: '₽', label: 'RUB · ₽' },
  USD: { symbol: '$', label: 'USD · $' },
};

export const UC_PACKAGES: UcPackage[] = [
  {
    id: 'uc-60',
    totalUc: 60,
    baseUc: 60,
    bonusUc: 0,
    title: '60 UC',
    subtitle: 'Базовый пакет для кейсов и рулеток',
    category: 'starter',
    prices: {
      TJS: 11,
      RUB: 95,
      USD: 1.0,
    },
    image: starterPackImg,
    imageAlt: 'Пакет 60 UC PUBG Mobile — стопка золотых жетонов',
  },
  {
    id: 'uc-325',
    totalUc: 325,
    baseUc: 300,
    bonusUc: 25,
    title: '325 UC',
    subtitle: '300 UC + 25 бонус · Хит для старта сезона',
    category: 'starter',
    tag: 'Выгодно',
    prices: {
      TJS: 53,
      RUB: 470,
      USD: 5.0,
    },
    image: starterPackImg,
    imageAlt: 'Пакет 325 UC PUBG Mobile — набор золотых жетонов',
  },
  {
    id: 'uc-660',
    totalUc: 660,
    baseUc: 600,
    bonusUc: 60,
    title: '660 UC',
    subtitle: '600 UC + 60 бонус · Для Royale Pass',
    category: 'popular',
    tag: 'Популярный',
    prices: {
      TJS: 105,
      RUB: 940,
      USD: 9.9,
    },
    image: mediumPackImg,
    imageAlt: 'Пакет 660 UC PUBG Mobile — тактический кейс с монетами и слитками',
  },
  {
    id: 'uc-1800',
    totalUc: 1800,
    baseUc: 1500,
    bonusUc: 300,
    title: '1800 UC',
    subtitle: '1500 UC + 300 бонус · Elite Pass Plus',
    category: 'popular',
    prices: {
      TJS: 265,
      RUB: 2390,
      USD: 24.9,
    },
    image: mediumPackImg,
    imageAlt: 'Пакет 1800 UC PUBG Mobile — усиленный кейс снабжения',
  },
  {
    id: 'uc-3850',
    totalUc: 3850,
    baseUc: 3000,
    bonusUc: 850,
    title: '3850 UC',
    subtitle: '3000 UC + 850 бонус · Для прокачки оружия',
    category: 'pro',
    prices: {
      TJS: 520,
      RUB: 4690,
      USD: 49.0,
    },
    image: elitePackImg,
    imageAlt: 'Пакет 3850 UC PUBG Mobile — бронированный кейс с золотыми слитками',
  },
  {
    id: 'uc-8100',
    totalUc: 8100,
    baseUc: 6000,
    bonusUc: 2100,
    title: '8100 UC',
    subtitle: '6000 UC + 2100 бонус · Максимальный запас',
    category: 'pro',
    tag: 'Макс. бонус',
    prices: {
      TJS: 1030,
      RUB: 9290,
      USD: 97.0,
    },
    image: elitePackImg,
    imageAlt: 'Пакет 8100 UC PUBG Mobile — элитный сейф золотых слитков',
  },
];

export function formatPrice(amount: number, currency: CurrencyCode): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  }
  if (currency === 'RUB') {
    return `${amount.toLocaleString('ru-RU')} ₽`;
  }
  return `${amount.toLocaleString('ru-RU')} сомони`;
}
