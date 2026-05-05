import { CartProvider }  from '@/components/cart/CartProvider'
import { ToastProvider } from '@/components/ui/ToastProvider'
import Navbar            from '@/components/layout/Navbar'
import Footer            from '@/components/layout/Footer'
import CartDrawer        from '@/components/cart/CartDrawer'
import WaFloat           from '@/components/ui/WaFloat'
import ScrollTopButton   from '@/components/ui/ScrollTopButton'
import Loader            from '@/components/ui/Loader'
import MobileBottomNav   from '@/components/layout/MobileBottomNav'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <WaFloat />
        <ScrollTopButton />
        <MobileBottomNav />
      </ToastProvider>
    </CartProvider>
  )
}
