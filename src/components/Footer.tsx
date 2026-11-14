import { SELLER_INFO } from '@/src/data/ucPackages';

export function Footer() {
  return (
    <footer className="py-10 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-[#9BA3B4]">
        <div className="space-y-1">
          <p className="font-semibold text-[#F4F5F7]">
            Karimov UC Shop <span aria-hidden="true">·</span> {SELLER_INFO.name}
          </p>
          <p className="text-xs">
            Оплата {SELLER_INFO.paymentMethod} на номер{' '}
            <a
              href={`tel:${SELLER_INFO.phone}`}
              className="font-mono tabular-nums text-[#F5A623] hover:underline"
            >
              {SELLER_INFO.phone}
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <a href="#catalog" className="hover:text-[#F4F5F7] transition-colors">
            Пакеты UC
          </a>
          <a href="#payment" className="hover:text-[#F4F5F7] transition-colors">
            Оплата ДС и Эсхата
          </a>
          <a href="#how-it-works" className="hover:text-[#F4F5F7] transition-colors">
            Как купить
          </a>
          <span>© {new Date().getFullYear()} {SELLER_INFO.name}</span>
        </div>
      </div>
    </footer>
  );
}
