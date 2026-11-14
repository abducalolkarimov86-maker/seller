import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#090B0E]/55 backdrop-blur-2xl saturate-150 border-b border-white/[0.12] shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <a
          href="#"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F4F5F7] hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-md"
        >
          KARIMOV UC
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B0B7C6]"
        >
          <a
            href="#catalog"
            className="hover:text-[#F4F5F7] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F5A623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-sm"
          >
            Пакеты UC
          </a>
          <a
            href="#payment"
            className="hover:text-[#F4F5F7] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F5A623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-sm"
          >
            Оплата ДС
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#F4F5F7] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F5A623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-sm"
          >
            Как купить
          </a>
          <a
            href="#seller"
            className="hover:text-[#F4F5F7] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F5A623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] rounded-sm"
          >
            Продавец
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2.5 min-h-[40px] px-4 py-2 text-sm font-semibold bg-[#F5A623] text-[#090B0E] rounded-xl hover:bg-[#FFB938] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090B0E]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Корзина</span>
            <span className="tabular-nums font-mono text-xs font-semibold bg-[#090B0E]/15 px-1.5 py-0.5 rounded-md">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
