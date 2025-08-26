import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { ChevronDown, ChevronUp } from 'lucide-react'

type BookingSlot = {
  id: string
  startTime: string
  endTime: string
}

function currency(n: number) {
  return `$${n.toFixed(2)}`
}

export default function CartPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const state = (location.state || {}) as { slots?: BookingSlot[]; roomName?: string; price?: number }
  const slots = state.slots || []
  const roomName = state.roomName || 'Selected Room'
  const price = typeof state.price === 'number' ? state.price : 0

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState('')
  const [invoiceOpen, setInvoiceOpen] = useState(true)

  const subtotal = slots.length * price
  const tax = +(subtotal * 0.1).toFixed(2) // simple 10% tax
  const total = +(subtotal + tax).toFixed(2)

  const handleContinue = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({ title: 'Missing information', description: 'Please fill name, email and phone before continuing.', variant: 'destructive' })
      return
    }
    setShowOtp(true)
    toast({ title: 'OTP sent', description: 'A verification code was sent to your phone (simulated).' })
  }

  const handleProceedToPay = () => {
    if (showOtp && otp.trim().length < 4) {
      toast({ title: 'Invalid OTP', description: 'Please enter the 4-digit OTP.', variant: 'destructive' })
      return
    }

    // Simulate payment success
    toast({ title: 'Payment successful', description: `You have paid ${currency(total)}.` })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <div className="text-sm text-muted-foreground">{slots.length} item{slots.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice / items - bigger column on desktop */}
          <div className="lg:col-span-2">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Invoice</h2>
                  <button
                    className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground"
                    onClick={() => setInvoiceOpen(v => !v)}
                    aria-expanded={invoiceOpen}
                  >
                    {invoiceOpen ? <><ChevronUp className="h-4 w-4"/> Hide</> : <><ChevronDown className="h-4 w-4"/> Show</>}
                  </button>
                </div>

                {invoiceOpen && (
                  <div className="mt-4 space-y-4">
                    {slots.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No items in cart. Select slots to book a room.</div>
                    ) : (
                      slots.map((s, i) => (
                        <div key={s.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                          <div>
                            <div className="font-medium">{roomName} <span className="text-xs text-muted-foreground">• {format(new Date(s.startTime), 'MMM d, yyyy')}</span></div>
                            <div className="text-xs text-muted-foreground">{format(new Date(s.startTime), 'h:mm a')} – {format(new Date(s.endTime), 'h:mm a')}</div>
                          </div>
                          <div className="text-sm font-semibold">{currency(price)}</div>
                        </div>
                      ))
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{currency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Tax (10%)</span>
                        <span>{currency(tax)}</span>
                      </div>
                      <div className="flex justify-between mt-2 text-base font-semibold">
                        <span>Total</span>
                        <span>{currency(total)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact information moved to the right column */}
          </div>

          {/* Summary column - sticky on large screens */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              {/* Contact card moved here for better layout on desktop */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-3">Contact information</h3>

                  <div className="mt-2 grid grid-cols-1 gap-2">
                    <div>
                      <Label className="mb-1">Full name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <Label className="mb-1">Email</Label>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label className="mb-1">Phone</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
                    </div>

                    {!showOtp ? (
                      <div className="mt-3">
                        <Button className="w-full" onClick={handleContinue} disabled={slots.length === 0}>Verify & Continue</Button>
                      </div>
                    ) : (
                      <div className="mt-3 space-y-2">
                        <div>
                          <Label className="mb-1">Enter OTP</Label>
                          <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="1234" />
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={handleProceedToPay}>
                            Pay {currency(total)}
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={() => setShowOtp(false)}>Edit</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-3">Order summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items</span>
                      <span>{slots.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{currency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>{currency(tax)}</span>
                    </div>
                  </div>

                  <div className="border-t mt-4 pt-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Total</div>
                      <div className="text-xl font-semibold">{currency(total)}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button className="w-full" onClick={() => { if (!showOtp) handleContinue(); else handleProceedToPay(); }} disabled={slots.length === 0}>
                      {showOtp ? `Pay ${currency(total)}` : 'Checkout'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
