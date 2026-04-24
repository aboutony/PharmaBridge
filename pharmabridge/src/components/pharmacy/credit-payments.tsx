'use client'

import { useQuery } from '@tanstack/react-query'
import { CreditCard, DollarSign, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CreditInfo {
  pharmacyId: string
  creditLimit: number
  availableCredit: number
  usedCredit: number
  outstandingPayments: number
  paymentDueDate: string
  creditScore: number
}

interface Payment {
  id: string
  orderId: string
  amount: number
  status: string
  paymentDate?: string
  dueDate?: string
  method: string
}

export function CreditAndPayments() {
  const { data: credit, isLoading: creditLoading } = useQuery({
    queryKey: ['pharmacy-credit'],
    queryFn: async () => {
      const response = await fetch('/api/pharmacies/1/credit')
      return response.json()
    },
  })

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ['pharmacy-payments'],
    queryFn: async () => {
      const response = await fetch('/api/pharmacies/1/payments')
      return response.json()
    },
  })

  const getPaymentStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'overdue':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getCreditUtilization = (credit: CreditInfo) => {
    const utilization = (credit.usedCredit / credit.creditLimit) * 100
    return {
      percentage: utilization,
      status: utilization > 80 ? 'High' : utilization > 50 ? 'Medium' : 'Low'
    }
  }

  if (creditLoading || paymentsLoading) {
    return <div className="text-center py-8">Loading credit information...</div>
  }

  const utilization = credit ? getCreditUtilization(credit) : null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Credit & Payments</h2>
        <p className="text-muted-foreground">Manage your credit line and payment history</p>
      </div>

      {/* Credit Overview */}
      {credit && (
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${credit.creditLimit.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${credit.availableCredit.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">${credit.outstandingPayments.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{credit.creditScore}/100</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Credit Utilization */}
      {credit && utilization && (
        <Card>
          <CardHeader>
            <CardTitle>Credit Utilization</CardTitle>
            <CardDescription>
              {utilization.percentage.toFixed(1)}% used • {utilization.status} utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: ${credit.usedCredit.toFixed(2)}</span>
                <span>Available: ${credit.availableCredit.toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    utilization.status === 'High' ? 'bg-red-500' :
                    utilization.status === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${utilization.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Next payment due: {new Date(credit.paymentDueDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Track your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {payments?.length > 0 ? (
            <div className="space-y-3">
              {payments.map((payment: Payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{payment.orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.paymentDate
                        ? `Paid on ${new Date(payment.paymentDate).toLocaleDateString()}`
                        : `Due on ${new Date(payment.dueDate!).toLocaleDateString()}`
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${payment.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground capitalize">{payment.method.replace('_', ' ')}</p>
                    </div>
                    <Badge variant={getPaymentStatusVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No payment history available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
