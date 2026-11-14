import { useState } from 'react';
import { Check, Copy, Phone, ShieldCheck, Wallet } from 'lucide-react';
import {
  OrderRecord,
  PAYMENT_METHODS,
  PaymentMethodId,
  SELLER_INFO,
  formatPrice,
} from '@/src/data/ucPackages';

interface PaymentAndGuideSectionProps {
  selectedPayment: PaymentMethodId;
  onSelectPayment: (method: PaymentMethodId) => void;
  recentOrders: OrderRecord[];
}

export function PaymentAndGuideSection({
  selectedPayment,
  onSelectPayment,
  recentOrders,
}: PaymentAndGuideSectionProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const activeMethod = PAYMENT_METHODS[selectedPayment];

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
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="payment" className="py-16 lg:py-24 border-b border-white/[0.10]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Card: Liquid Glass Payment Card (ДС & Эсхата) */}
          <div
            id="seller"
            className="lg:col-span-6 liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-7"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#F5A623]">
                <Wallet className="w-4 h-4 shrink-0" />
                <span>Прямой перевод без комиссии</span>
              </div>

              <h2 className="font-display text-3xl font-bold text-[#F4F5F7] tracking-tight">
                Оплата через ДС и Эсхата
              </h2>

              <div
                role="group"
                aria-label="Способ оплаты"
                className="liquid-glass-subtle inline-flex items-center gap-1 p-1 rounded-xl"
              >
                {(['dc', 'eskhata'] as PaymentMethodId[]).map((methodId) => {
                  const isActive = selectedPayment === methodId;
                  return (
                    <button
                      key={methodId}
                      type="button"
                      onClick={() => onSelectPayment(methodId)}
                      className={`min-h-[38px] px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                        isActive
                          ? 'bg-[#F5A623] text-[#090B0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                          : 'text-[#B0B7C6] hover:text-[#F4F5F7]'
                      }`}
                    >
                      {PAYMENT_METHODS[methodId].name}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm sm:text-base text-[#B0B7C6] leading-relaxed">
                {activeMethod.hint}. Переведите точную сумму заказа на номер продавца —
                заявки обрабатываются лично.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="liquid-glass-subtle rounded-xl p-4">
                  <span className="block text-xs text-[#9BA3B4]">Имя получателя</span>
                  <span className="block text-base font-semibold text-[#F4F5F7] mt-1">
                    {SELLER_INFO.name}
                  </span>
                </div>

                <div className="liquid-glass-subtle rounded-xl p-4">
                  <span className="block text-xs text-[#9BA3B4]">
                    Номер ({activeMethod.shortName})
                  </span>
                  <span className="block font-mono text-lg font-semibold text-[#F5A623] tabular-nums mt-1">
                    {SELLER_INFO.phone}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#F5A623] text-[#090B0E] font-semibold text-sm rounded-xl hover:bg-[#FFB938] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Номер скопирован</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Копировать {SELLER_INFO.phone}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${SELLER_INFO.phone}`}
                  className="liquid-glass-subtle inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-[#F4F5F7] hover:border-white/25 font-medium text-sm rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#B0B7C6]" />
                  <span>Позвонить продавцу</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Card: Liquid Glass 3-Step Buying Guide */}
          <div
            id="how-it-works"
            className="lg:col-span-6 liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-7"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#B0B7C6]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#F5A623]" />
                <span>Надёжно · Доступ к аккаунту не нужен</span>
              </div>

              <h2 className="font-display text-3xl font-bold text-[#F4F5F7] tracking-tight">
                Как получить UC за 3 шага
              </h2>
            </div>

            <ol className="space-y-5">
              <li className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-[#F5A623] tabular-nums pt-0.5 shrink-0">
                  01.
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#F4F5F7]">
                    Выберите нужный пакет UC
                  </h3>
                  <p className="text-sm text-[#B0B7C6] leading-relaxed">
                    Нажмите «Купить» на любом пакете — он сразу добавится в корзину
                    в выбранной вами валюте.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 pt-4 border-t border-white/[0.10]">
                <span className="font-mono text-sm font-semibold text-[#F5A623] tabular-nums pt-0.5 shrink-0">
                  02.
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#F4F5F7]">
                    Введите Player ID и оплатите через ДС или Эсхата
                  </h3>
                  <p className="text-sm text-[#B0B7C6] leading-relaxed">
                    Укажите цифровой UID из профиля PUBG Mobile и переведите сумму на
                    номер{' '}
                    <span className="font-mono text-[#F4F5F7] tabular-nums">
                      {SELLER_INFO.phone}
                    </span>{' '}
                    ({SELLER_INFO.name}) через Душанбе Сити или Эсхата Онлайн.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 pt-4 border-t border-white/[0.10]">
                <span className="font-mono text-sm font-semibold text-[#F5A623] tabular-nums pt-0.5 shrink-0">
                  03.
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#F4F5F7]">
                    Получите UC через {SELLER_INFO.deliveryTime}
                  </h3>
                  <p className="text-sm text-[#B0B7C6] leading-relaxed">
                    Подтвердите заявку в корзине, сохраните номер чека и ожидайте
                    зачисления UC прямо в игру.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Recent Orders History Table */}
        {recentOrders.length > 0 && (
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-[#F4F5F7]">
                История ваших заказов
              </h3>
              <span className="text-xs text-[#9BA3B4]">
                Сохранено локально в браузере
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/[0.10] text-xs text-[#9BA3B4]">
                    <th className="py-3 pr-4 font-medium">Заказ</th>
                    <th className="py-3 pr-4 font-medium">PUBG ID</th>
                    <th className="py-3 pr-4 font-medium">Номинал</th>
                    <th className="py-3 pr-4 font-medium">Сумма</th>
                    <th className="py-3 font-medium">Способ оплаты</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {recentOrders.map((order) => {
                    const methodName =
                      PAYMENT_METHODS[order.paymentMethod || 'dc'].name;
                    return (
                      <tr key={order.orderNumber}>
                        <td className="py-3.5 pr-4 font-mono tabular-nums text-[#F4F5F7]">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3.5 pr-4 font-mono tabular-nums text-[#B0B7C6]">
                          {order.playerId}
                        </td>
                        <td className="py-3.5 pr-4 text-[#F4F5F7] tabular-nums">
                          {order.totalUc.toLocaleString('ru-RU')} UC
                        </td>
                        <td className="py-3.5 pr-4 font-mono tabular-nums text-[#F5A623]">
                          {formatPrice(order.totalAmount, order.currency)}
                        </td>
                        <td className="py-3.5 text-[#B0B7C6]">
                          {methodName} · {SELLER_INFO.phone}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
