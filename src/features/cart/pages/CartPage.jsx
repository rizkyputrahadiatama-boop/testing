import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import CartItemRow from '../components/CartItemRow.jsx'
import { useCart } from '../CartContext.jsx'
import { formatIDR } from '../../../shared/lib/format.js'

const MIN_ORDER_AMOUNT = 20000

export default function CartPage() {
  const { items, totals, clearCart } = useCart()
  const navigate = useNavigate()

  const subtotal = totals?.subtotal || 0
  const isMinOrderReached = subtotal >= MIN_ORDER_AMOUNT
  const remainingAmount = MIN_ORDER_AMOUNT - subtotal

  return (
    <PageShell title="Keranjang Belanja">
      <div className="py-4 px-2 pb-12">
        {items.length === 0 ? (
          /* Tampilan Keranjang Kosong */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-xs">
            <p className="text-sm font-semibold text-slate-700">
              Keranjang kamu masih kosong
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Pilih produk menarik dan tambahkan ke sini!
            </p>
            <Link
              to="/"
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* List Item Keranjang */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-800">
                  Daftar Produk ({items.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition"
                >
                  Kosongkan
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Ringkasan Belanja & Peringatan Min Order */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs">
              <h2 className="mb-3 text-sm font-bold text-slate-800">
                Ringkasan Belanja
              </h2>

              <div className="flex justify-between text-xs text-slate-600">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-slate-800">
                  {formatIDR ? formatIDR(subtotal) : `Rp${subtotal.toLocaleString('id-ID')}`}
                </span>
              </div>

              {/* Validasi Minimal Order Rp20.000 */}
              {!isMinOrderReached && (
                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                  <p className="font-semibold">⚠️ Minimal Pembelian Rp20.000</p>
                  <p className="mt-0.5 opacity-90">
                    Tambah pesanan sebesar{' '}
                    <span className="font-bold">
                      {formatIDR ? formatIDR(remainingAmount) : `Rp${remainingAmount.toLocaleString('id-ID')}`}
                    </span>{' '}
                    lagi untuk melakukan checkout.
                  </p>
                </div>
              )}

              {/* Tombol Checkout / Link ke /checkout */}
              <button
                disabled={!isMinOrderReached}
                onClick={() => navigate('/checkout')}
                className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isMinOrderReached
                  ? 'Lanjut ke Checkout'
                  : 'Belum Memenuhi Min. Pembelian'}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}