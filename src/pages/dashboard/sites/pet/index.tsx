import { GridPetSites } from '@/components/GridPetSites'
import LayoutHeaderDashboard from '@/layouts/layoutHeaderDashboard'
import { petGetSitesWithCursor } from '@/lib/sites/getSitesWithCursor'
import { PaginationProvider } from '@/providers/PaginationContext'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import React from 'react'

export const getSitesWithCursor = async () => {
  return await petGetSitesWithCursor({first: 256})
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['pet-get-sites-with-cursor', {first: 256}], getSitesWithCursor)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}


export default function Page() {
  return (
    <PaginationProvider>
        <GridPetSites />
    </PaginationProvider>
  )
}
Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutHeaderDashboard>
      {page}
    </LayoutHeaderDashboard>
  )
}