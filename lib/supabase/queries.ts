import { createClient } from './server'
import type { Product, ProductInsert, ProductUpdate } from '@/types'

// ─── GET ALL ────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Supabase] getProducts:', error.message)
    return []
  }
  return (data ?? []) as Product[]
}

// ─── GET BY ID ──────────────────────────────────────────
export async function getProductById(id: number): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[Supabase] getProductById:', error.message)
    return null
  }
  return data as Product
}

// ─── INSERT ─────────────────────────────────────────────
export async function saveProduct(payload: ProductInsert): Promise<Product> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('productos')
    .insert(payload)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Product
}

// ─── UPDATE ─────────────────────────────────────────────
export async function updateProduct(id: number, payload: ProductUpdate): Promise<Product> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('productos')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Product
}

// ─── DELETE ─────────────────────────────────────────────
export async function deleteProduct(id: number): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ─── TOGGLE STOCK ────────────────────────────────────────
export async function toggleStock(id: number, stock: boolean): Promise<Product> {
  return updateProduct(id, { stock })
}
