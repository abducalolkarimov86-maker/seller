import { useState } from 'react';
import { ArrowDownRight, Check, Copy, Phone } from 'lucide-react';
import { HERO_MEDIA, SELLER_INFO } from '@/src/data/ucPackages';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  playerId: string;
  onPlayerIdChange: (value: string) => void;
  onJumpToCatalog: () => void;
}

export function Hero({ playerId, onPlayerIdChange, onJumpToCatalog }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SELLER_INFO.phone);
    } catch {
      const input = document.createElement('input');
      input.value = SELLER_INFO.phone;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-white/[0.10]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-medium text-[#B0B7C6]">
                {SELLER_INFO.region} <span aria-hidden="true">·</span> Зачисление за {SELLER_INFO.deliveryTime}
              </p>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight text-[#F4F5F7]"
                style={{ textWrap: 'balance' }}
              >
                Магазин UC для PUBG Mobile от {SELLER_INFO.name}
              </h1>

              <p className="text-base text-[#B0B7C6] leading-relaxed max-w-[52ch]">
                Мгновенное пополнение Unknown Cash (UC) по вашему Player ID без пароля.
                Удобная оплата через{' '}
                <span className="text-[#F4F5F7] font-semibold">Душанбе Сити (ДС)</span> и{' '}
                <span className="text-[#F4F5F7] font-semibold">Эсхата Онлайн</span>{' '}
                на номер{' '}
                <span className="font-mono text-[#F5A623] tabular-nums font-medium">
                  {SELLER_INFO.phone}
                </span>
                .
              </p>
            </div>

            {/* Liquid Glass Checkout Pre-fill Module */}
            <div className="liquid-glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="hero-pubg-id"
                  className="text-sm font-semibold text-[#F4F5F7]"
                >
                  PUBG Mobile Player ID
                </label>
                <span className="text-xs text-[#9BA3B4]">
                  Только цифровой UID профиля
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="hero-pubg-id"
                  type="text"
                  inputMode="numeric"
                  maxLength={14}
                  value={playerId}
                  onChange={(e) => onPlayerIdChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="Введите ваш ID, например: 5123456789"
                  className="liquid-glass-input flex-1 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-mono tabular-nums text-[#F4F5F7] placeholder:text-[#6B7385] focus:outline-none focus:border-[#F5A623] transition-colors"
                />
                <button
                  type="button"
                  onClick={onJumpToCatalog}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 bg-[#F5A623] text-[#090B0E] font-semibold text-sm rounded-xl hover:bg-[#FFB938] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                >
                  <span>Выбрать пакет</span>
                  <ArrowDownRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Clean Seller & Payment Quick Actions */}
              <div className="pt-4 border-t border-white/[0.10] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-[#B0B7C6] flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span>
                    Продавец:{' '}
                    <strong className="font-semibold text-[#F4F5F7]">{SELLER_INFO.name}</strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    ДС / Эсхата:{' '}
                    <strong className="font-mono tabular-nums text-[#F5A623]">
                      {SELLER_INFO.phone}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="liquid-glass-subtle inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-medium text-[#F4F5F7] hover:border-white/25 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#B0B7C6]" />
                        <span>Копировать ДС</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${SELLER_INFO.phone}`}
                    aria-label={`Позвонить продавцу ${SELLER_INFO.phone}`}
                    className="liquid-glass-subtle inline-flex items-center justify-center w-9 h-9 text-[#B0B7C6] hover:text-[#F4F5F7] hover:border-white/25 rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Liquid Glass Framed Showcase Visual */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden liquid-glass min-h-[300px] sm:min-h-[380px] lg:min-h-full">
            <ResilientImage
              src={HERO_MEDIA.src}
              alt={HERO_MEDIA.alt}
              fallbackTitle="PUBG Mobile UC"
              className="w-full h-full object-cover lg:absolute lg:inset-0"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#07090D]/90 via-[#07090D]/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Bottom Floating Liquid Glass Specification Strip */}
            <div className="absolute bottom-4 left-4 right-4 liquid-glass rounded-xl px-5 py-4 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-[11px] text-[#B0B7C6]">Диапазон</span>
                <span className="font-display text-base sm:text-lg font-bold text-[#F4F5F7] tabular-nums">
                  60–8100 UC
                </span>
              </div>
              <div className="border-l border-white/[0.12] pl-4">
                <span className="block text-[11px] text-[#B0B7C6]">ДС и Эсхата</span>
                <span className="font-mono text-sm sm:text-base font-semibold text-[#F5A623] tabular-nums">
                  {SELLER_INFO.phone}
                </span>
              </div>
              <div className="border-l border-white/[0.12] pl-4">
                <span className="block text-[11px] text-[#B0B7C6]">Зачисление</span>
                <span className="text-sm sm:text-base font-semibold text-[#F4F5F7]">
                  {SELLER_INFO.deliveryTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
