import { Check, Plus } from 'lucide-react';
import {
  CURRENCY_LABELS,
  CurrencyCode,
  PackageCategory,
  UC_PACKAGES,
  UcPackage,
  formatPrice,
} from '@/src/data/ucPackages';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  category: PackageCategory;
  onCategoryChange: (category: PackageCategory) => void;
  onAddToCart: (pkg: UcPackage) => void;
  recentlyAddedId: string | null;
}

const CATEGORY_TABS: Array<{ id: PackageCategory; label: string }> = [
  { id: 'all', label: 'Все пакеты' },
  { id: 'starter', label: 'Стартовые' },
  { id: 'popular', label: 'Популярные' },
  { id: 'pro', label: 'Крупные' },
];

const CURRENCIES: CurrencyCode[] = ['TJS', 'RUB', 'USD'];

export function CatalogSection({
  currency,
  onCurrencyChange,
  category,
  onCategoryChange,
  onAddToCart,
  recentlyAddedId,
}: CatalogSectionProps) {
  const filteredPackages =
    category === 'all'
      ? UC_PACKAGES
      : UC_PACKAGES.filter((item) => item.category === category);

  return (
    <section id="catalog" className="py-16 lg:py-24 border-b border-white/[0.10]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading & Liquid Glass Filter Segmented Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F7]">
              Пакеты и цены на UC
            </h2>
            <p className="text-sm sm:text-base text-[#B0B7C6] max-w-[58ch]">
              Актуальный прайс для PUBG Mobile. Бонусные UC зачисляются вместе с
              основным пакетом сразу на ваш аккаунт.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Фильтр пакетов"
              className="liquid-glass-subtle inline-flex items-center gap-1 p-1 rounded-xl"
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onCategoryChange(tab.id)}
                    className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                      isActive
                        ? 'bg-[#F5A623] text-[#090B0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                        : 'text-[#B0B7C6] hover:text-[#F4F5F7]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Выбор валюты"
              className="liquid-glass-subtle inline-flex items-center gap-1 p-1 rounded-xl"
            >
              {CURRENCIES.map((code) => {
                const isActive = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    className={`min-h-[38px] px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                      isActive
                        ? 'bg-white/[0.14] text-[#F5A623] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                        : 'text-[#B0B7C6] hover:text-[#F4F5F7]'
                    }`}
                    title={CURRENCY_LABELS[code].label}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3-Column Liquid Glass Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isAdded = recentlyAddedId === pkg.id;
            const unitPrice = pkg.prices[currency];

            return (
              <article
                key={pkg.id}
                className="group flex flex-col liquid-glass rounded-2xl overflow-hidden hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Product Visual Slot */}
                <div className="relative aspect-[4/3] bg-[#0B0D12]/60 overflow-hidden border-b border-white/[0.10]">
                  <ResilientImage
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fallbackTitle={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#090B0E]/90 via-[#090B0E]/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3.5 left-5 right-5 flex items-baseline justify-between gap-3">
                    <span className="font-display text-3xl font-bold text-[#F4F5F7] tracking-tight tabular-nums">
                      {pkg.title}
                    </span>
                    {pkg.tag && (
                      <span className="text-xs font-semibold text-[#F5A623]">
                        {pkg.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-5">
                  <div className="space-y-1.5">
                    <p className="text-xs text-[#9BA3B4]">
                      PUBG Mobile <span aria-hidden="true">·</span> По Player ID
                    </p>
                    <h3 className="text-base font-semibold text-[#F4F5F7]">
                      {pkg.baseUc.toLocaleString('ru-RU')} UC
                      {pkg.bonusUc > 0 && (
                        <span className="text-[#F5A623] font-medium">
                          {' '}
                          + {pkg.bonusUc.toLocaleString('ru-RU')} бонус
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[#B0B7C6] leading-snug">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price Baseline & Buy Action */}
                  <div className="pt-4 border-t border-white/[0.10] flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] text-[#9BA3B4]">Стоимость</span>
                      <span className="font-mono text-xl font-semibold text-[#F4F5F7] tabular-nums">
                        {formatPrice(unitPrice, currency)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(pkg)}
                      className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                        isAdded
                          ? 'bg-emerald-500 text-[#090B0E]'
                          : 'bg-[#F5A623] text-[#090B0E] hover:bg-[#FFB938] active:scale-[0.98]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" />
                          <span>В корзине</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 shrink-0" />
                          <span>Купить</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
