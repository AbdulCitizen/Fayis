# Fayis Store 🛒

Next.js + Supabase + Paystack e-commerce app.

### Features
- User authentication (Supabase)
- Products & cart
- Checkout with Paystack
- Orders stored in Supabase
- Admin order dashboard

### Setup
1. Copy `.env.local.example` → `.env.local`
2. Fill in:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - PAYSTACK_SECRET_KEY
   - NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
   - NEXT_PUBLIC_SITE_URL
3. Run `npm install`
4. Run `npm run dev`

### Deploy
Push to GitHub → Vercel → add environment variables → deploy 🚀
