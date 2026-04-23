import { Header } from '@/components/layout/header'
import { PublicLayout } from '@/components/layout/public-layout'
import { DrugAvailabilitySearch } from '@/components/marketplace/drug-search'
import { Card, CardContent } from '@/components/ui/card'

export default function LocaleHome() {
  return (
    <PublicLayout header={<Header title="PharmaBridge Marketplace" />}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 px-6 py-10 shadow-sm tablet:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              PharmaBridge
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground tablet:text-5xl">
              Find trusted medicines across nearby pharmacies
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground tablet:text-lg">
              Search availability, compare prices, and move from discovery to ordering in one place.
            </p>
          </div>
        </section>

        <section>
          <DrugAvailabilitySearch />
        </section>

        <section className="grid gap-4 tablet:grid-cols-3">
          <Card className="border-primary/15 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-primary">Price Comparison</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare listed medicine prices before placing an order.
              </p>
            </CardContent>
          </Card>
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-accent">Local Availability</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Check which pharmacies have stock nearby without making calls.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-foreground">Quick Ordering</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Move from search results to pharmacy details and ordering actions faster.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  )
}
