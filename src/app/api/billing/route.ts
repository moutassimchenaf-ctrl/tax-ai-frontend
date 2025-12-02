import { NextResponse } from 'next/server';
import { BillingService } from '@/lib/billing';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Handle Stripe Webhook
    if (body.type === 'checkout.session.completed') {
      const session = body.data.object;
      
      // Record to Ledger
      await BillingService.recordToLedger({
        id: session.id,
        userId: session.client_reference_id,
        amount: session.amount_total,
        status: 'completed',
        date: new Date().toISOString()
      });
      
      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Billing Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
