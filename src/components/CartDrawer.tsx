import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  CurrencyCode,
  OrderRecord,
  PAYMENT_METHODS,
  PaymentMethodId,
  SELLER_INFO,
  UcPackage,
  formatPrice,
} from '@/src/data/ucPackages';

export interface CartItem {
  pkg: UcPackage;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  playerId: string;
  onPlayerIdChange: (value: string) => void;
  selectedPayment: PaymentMethodId;
  onSelectPayment: (method: PaymentMethodId) => void;
  onUpdateQuantity: (packageId: string, delta: number) => void;
  onRemoveItem: (packageId: string) => void;
  onOrderConfirmed: (order: OrderRecord) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  playerId,
  onPlayerIdChange,
  selectedPayment,
  onSelectPayment,
  onUpdateQuantity,
  onRemoveItem,
  onOrderConfirmed,
}: CartDrawerProps) {
  const [nickname, setNickname] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.pkg.prices[currency] * item.quantity,
    0,
  );
  const totalUc = items.reduce(
    (sum, item) => sum + item.pkg.totalUc * item.quantity,
    0,
  );

  const activeMethod = PAYMENT_METHODS[selectedPayment];

  const copyText = async (text: string, onDone: (state: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    onDone(true);
    setTimeout(() => onDone(false), 2000);
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    const cleanedId = playerId.trim();
    if (!/^\d{6,14}$/.test(cleanedId)) {
      setFormError('Введите корректный PUBG Player ID (от 6 до 14 цифр).');
      return;
    }
    if (items.length === 0) {
      setFormError('Корзина пуста. Добавьте хотя бы один пакет UC.');
      return;
    }

    setFormError('');
    const orderNumber = `UC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderNumber,
      createdAt: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      playerId: cleanedId,
      nickname: nickname.trim() || 'Не указан',
      contactPhone: contactPhone.trim() || 'Не указан',
      paymentMethod: selectedPayment,
      currency,
      totalAmount,
      totalUc,
      items: items.map((item) => ({
        title: item.pkg.title,
        quantity: item.quantity,
        unitPrice: item.pkg.prices[currency],
        totalUc: item.pkg.totalUc * item.quantity,
      })),
    };

    setConfirmedOrder(newOrder);
    onOrderConfirmed(newOrder);
  };

  const buildReceiptText = (order: OrderRecord) => {
    const itemsList = order.items
      .map((i) => `${i.title} x${i.quantity}`)
      .join(', ');
    const methodLabel = PAYMENT_METHODS[order.paymentMethod].name;
    return [
      `Заказ #${order.orderNumber} (${SELLER_INFO.name})`,
      `PUBG ID: ${order.playerId}`,
      `Никнейм: ${order.nickname}`,
      `Пакеты: ${itemsList} (Итого ${order.totalUc} UC)`,
      `К оплате: ${formatPrice(order.totalAmount, order.currency)}`,
      `Способ оплаты: ${methodLabel}`,
      `Номер перевода: ${SELLER_INFO.phone}`,
    ].join('\n');
  };

  const handleCloseDrawer = () => {
    setFormError('');
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Корзина и оформление заказа"
        >
          <div
            className="fixed inset-0"
            onClick={handleCloseDrawer}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#0B0E14]/80 backdrop-blur-3xl saturate-150 border-l border-white/[0.15] shadow-[inset_1px_0_0_rgba(255,255,255,0.12)] h-full flex flex-col"
          >
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-white/[0.10] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#F5A623]" />
                <h2 className="font-display text-xl font-bold text-[#F4F5F7]">
                  {confirmedOrder ? 'Заказ оформлен' : 'Оформление заказа'}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                aria-label="Закрыть корзину"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[#B0B7C6] hover:text-[#F4F5F7] hover:bg-white/[0.08] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {confirmedOrder ? (
                <div className="space-y-5">
                  <div className="bg-emerald-500/[0.10] border border-emerald-400/35 rounded-2xl p-5 space-y-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Заявка #{confirmedOrder.orderNumber} принята</span>
                    </div>
                    <p className="text-sm text-[#B0B7C6] leading-relaxed">
                      Переведите{' '}
                      <strong className="font-mono text-[#F4F5F7] tabular-nums">
                        {formatPrice(confirmedOrder.totalAmount, confirmedOrder.currency)}
                      </strong>{' '}
                      через{' '}
                      <strong className="text-[#F4F5F7]">
                        {PAYMENT_METHODS[confirmedOrder.paymentMethod].name}
                      </strong>{' '}
                      на номер{' '}
                      <strong className="font-mono text-[#F5A623]">{SELLER_INFO.phone}</strong>{' '}
                      (получатель:{' '}
                      <strong className="text-[#F4F5F7]">{SELLER_INFO.name}</strong>).
                    </p>
                  </div>

                  <div className="liquid-glass-subtle rounded-2xl p-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">Продавец</span>
                      <span className="font-semibold text-[#F4F5F7]">
                        {SELLER_INFO.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">Способ оплаты</span>
                      <span className="font-semibold text-[#F4F5F7]">
                        {PAYMENT_METHODS[confirmedOrder.paymentMethod].name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">Номер перевода</span>
                      <span className="font-mono tabular-nums text-[#F5A623]">
                        {SELLER_INFO.phone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">PUBG Player ID</span>
                      <span className="font-mono tabular-nums text-[#F4F5F7]">
                        {confirmedOrder.playerId}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">Итого UC</span>
                      <span className="font-mono tabular-nums text-[#F4F5F7]">
                        {confirmedOrder.totalUc.toLocaleString('ru-RU')} UC
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/[0.10] flex justify-between gap-2">
                      <span className="text-[#9BA3B4]">К оплате</span>
                      <span className="font-mono text-base font-semibold text-[#F5A623] tabular-nums">
                        {formatPrice(confirmedOrder.totalAmount, confirmedOrder.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        copyText(buildReceiptText(confirmedOrder), setCopiedReceipt)
                      }
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 bg-[#F5A623] text-[#090B0E] font-semibold text-sm rounded-xl hover:bg-[#FFB938] transition-colors cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                    >
                      {copiedReceipt ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Чек заказа скопирован</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Скопировать текст заказа</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyText(SELLER_INFO.phone, setCopiedPhone)}
                      className="liquid-glass-subtle w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 text-[#F4F5F7] hover:border-white/25 font-medium text-sm rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Номер {SELLER_INFO.phone} скопирован</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#B0B7C6]" />
                          <span>Копировать номер: {SELLER_INFO.phone}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag
                    className="w-10 h-10 text-[#6B7385] mx-auto"
                    strokeWidth={1.5}
                  />
                  <p className="text-base font-medium text-[#F4F5F7]">
                    Корзина пока пуста
                  </p>
                  <p className="text-sm text-[#9BA3B4] max-w-[30ch] mx-auto">
                    Выберите нужный пакет UC в каталоге, чтобы оформить пополнение.
                  </p>
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Items List */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.pkg.id}
                        className="liquid-glass-subtle rounded-xl p-4 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[#F4F5F7] truncate">
                            {item.pkg.title}
                          </p>
                          <p className="font-mono text-xs text-[#F5A623] tabular-nums mt-0.5">
                            {formatPrice(item.pkg.prices[currency], currency)} за шт.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.pkg.id, -1)}
                            aria-label={`Уменьшить количество ${item.pkg.title}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-[#F4F5F7] hover:bg-white/[0.12] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-sm tabular-nums w-6 text-center text-[#F4F5F7]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.pkg.id, 1)}
                            aria-label={`Увеличить количество ${item.pkg.title}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-[#F4F5F7] hover:bg-white/[0.12] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.pkg.id)}
                            aria-label={`Удалить ${item.pkg.title}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9BA3B4] hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Player Info Fields */}
                  <div className="space-y-4 pt-4 border-t border-white/[0.10]">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-pubg-id"
                        className="block text-xs font-semibold text-[#F4F5F7]"
                      >
                        PUBG Mobile Player ID (обязательно)
                      </label>
                      <input
                        id="drawer-pubg-id"
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        required
                        value={playerId}
                        onChange={(e) => {
                          setFormError('');
                          onPlayerIdChange(e.target.value.replace(/\D/g, ''));
                        }}
                        placeholder="Например: 5123456789"
                        className="liquid-glass-input w-full min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-mono tabular-nums text-[#F4F5F7] placeholder:text-[#6B7385] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-nickname"
                        className="block text-xs font-semibold text-[#F4F5F7]"
                      >
                        Никнейм в игре (необязательно)
                      </label>
                      <input
                        id="drawer-nickname"
                        type="text"
                        maxLength={32}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Для дополнительной проверки"
                        className="liquid-glass-input w-full min-h-[44px] px-3.5 py-2 rounded-xl text-sm text-[#F4F5F7] placeholder:text-[#6B7385] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-contact"
                        className="block text-xs font-semibold text-[#F4F5F7]"
                      >
                        Ваш телефон или Telegram (необязательно)
                      </label>
                      <input
                        id="drawer-contact"
                        type="text"
                        maxLength={40}
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Для уведомления о зачислении"
                        className="liquid-glass-input w-full min-h-[44px] px-3.5 py-2 rounded-xl text-sm text-[#F4F5F7] placeholder:text-[#6B7385] focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selection (ДС / Эсхата) */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.10]">
                    <span className="block text-xs font-semibold text-[#F4F5F7]">
                      Выберите способ оплаты
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      {(['dc', 'eskhata'] as PaymentMethodId[]).map((methodId) => {
                        const isActive = selectedPayment === methodId;
                        return (
                          <button
                            key={methodId}
                            type="button"
                            onClick={() => onSelectPayment(methodId)}
                            className={`min-h-[42px] px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] ${
                              isActive
                                ? 'bg-[#F5A623] text-[#090B0E] border-[#F5A623] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                                : 'liquid-glass-subtle text-[#B0B7C6] hover:text-[#F4F5F7]'
                            }`}
                          >
                            {PAYMENT_METHODS[methodId].name}
                          </button>
                        );
                      })}
                    </div>

                    <div className="liquid-glass-subtle rounded-xl p-4 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#9BA3B4]">Способ</span>
                        <span className="font-semibold text-[#F4F5F7]">
                          {activeMethod.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#9BA3B4]">Получатель</span>
                        <span className="font-semibold text-[#F4F5F7]">
                          {SELLER_INFO.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#9BA3B4]">Номер перевода</span>
                        <button
                          type="button"
                          onClick={() => copyText(SELLER_INFO.phone, setCopiedPhone)}
                          className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#F5A623] hover:underline cursor-pointer"
                        >
                          <span className="tabular-nums">{SELLER_INFO.phone}</span>
                          {copiedPhone ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-rose-400">
                      {formError}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Sticky Checkout Footer */}
            {!confirmedOrder && items.length > 0 && (
              <div className="p-6 border-t border-white/[0.10] bg-[#07090D]/60 backdrop-blur-xl space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="block text-xs text-[#9BA3B4]">
                      Итого ({totalUc.toLocaleString('ru-RU')} UC)
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#F4F5F7] tabular-nums">
                      {formatPrice(totalAmount, currency)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full min-h-[46px] px-5 py-3 bg-[#F5A623] text-[#090B0E] font-semibold text-sm rounded-xl hover:bg-[#FFB938] active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                >
                  Подтвердить заказ
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
