# ایروفلُ — AeroFlow

پلتفرم تجارت الکترونیک تخصصی برای فن‌های صنعتی، کامپیوتری و تهویه مسکونی.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · shadcn/ui · TanStack Query v5 · react-hook-form + Zod · Axios.

**ویژگی‌ها:**
- چیدمان کاملاً راست‌به‌چپ (RTL) با `dir="rtl"` و استفاده از ویژگی‌های منطقی (`ms-*`, `me-*`).
- جستجوی سراسری با Debounce (۳۵۰ms) و نتایج آنی.
- فیلترهای چندوجهی بر پایه URL (بدون remount مجدد صفحه).
- ماشین‌حساب جریان هوا: `Required CFM = (Volume m³ × ACH) / 1.7` با پیشنهاد فن.
- مقایسه جانبی تا ۴ محصول، صفحه محصول با نمودار منحنی فن و مقایسه صدا.
- فرم‌های اعتبارسنجی‌شده با Zod و پیام خطای فارسی.
- لایه API تایپ‌شده (Axios) آماده اتصال به بک‌اند NestJS.

---

## شروع کار

```bash
npm install
npm run dev        # http://localhost:3000
```

### کنترل کیفیت

```bash
npm run lint
npm run type-check
npm run build
```

## اتصال به بک‌اند

در فایل `.env.local` مقدار `NEXT_PUBLIC_API_URL` را تنظیم کنید تا درخواست‌ها به سرور REST بروند.
در صورت نبود این متغیر، برنامه به‌طور خودکار از فروشگاه نمونه درون‌حافظه‌ای استفاده می‌کند
(`src/lib/mock-data.ts`) تا کل برنامه بدون بک‌اند قابل اجرا باشد.

| Endpoint | Method | Description |
| --- | --- | --- |
| `/products` | GET | فهرست محصولات با پارامترهای فیلتر |
| `/products/:slug` | GET | جزئیات محصول |
| `/products/search` | GET | جستجوی سراسری (`q`) |
| `/consultations` | POST | ثبت درخواست مشاوره |
| `/orders` | POST | ثبت سفارش |

## استقرار

### راه‌اندازی خودکار (Git + GitHub + Vercel)

```bash
chmod +x setup-and-deploy.sh
./setup-and-deploy.sh --repo aeroflow --public --deploy
```

گزینه‌ها: `--private` · `--deploy` · `--repo <name>`

### CI/CD

- روی هر Pull Request به `main`: ESLint + TypeScript + Build verification (`.github/workflows/deploy.yml`)
- روی Push به `main`: استقرار خودکار در Vercel

**Secrets موردنیاز در GitHub:** `VERCEL_TOKEN`، `VERCEL_ORG_ID`، `VERCEL_PROJECT_ID`، (اختیاری) `NEXT_PUBLIC_API_URL`.

---

## ساختار پروژه

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # RTL + QueryProvider + Toast
│   ├── page.tsx              # Home
│   ├── products/[slug]/      # PDP
│   ├── calculator/           # محاسبه‌گر CFM
│   ├── compare/              # مقایسه
│   ├── checkout/             # چندمرحله‌ای
│   └── consultation/         # مشاوره
├── components/
│   ├── ui/                   # shadcn/ui
│   ├── common/               # Navbar, MegaMenu, SearchBar, Footer
│   └── modules/              # catalog / pdp / calculator
├── hooks/                    # useDebounce, useFansQuery
├── lib/                      # api-client, mock-data, products-service, utils
├── schemas/                  # Zod
└── types/                    # fan.types, api.types
```
