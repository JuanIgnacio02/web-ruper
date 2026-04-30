import { getProducts }  from '@/lib/supabase/queries'
import AdminPanel       from '@/components/admin/AdminPanel'

export const metadata = { title: 'Admin — RUPER' }

export default async function AdminPage() {
  const products = await getProducts()
  return <AdminPanel initialProducts={products} />
}
