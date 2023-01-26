import { GridPetPages0 } from '@/components/GridPetPages0'
import LayoutHeaderDashboard from '@/layouts/layoutHeaderDashboard'
import { petGetPages0WithCursor } from '@/lib/pages/page0/getPagesWithCursor'
import { petGetSite } from '@/lib/sites/getSite'
import { petGetSites } from '@/lib/sites/getSites'
import { PaginationProvider } from '@/providers/PaginationContext'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import React from 'react'

export const getSite = async (id: string) => {
  return await petGetSite(id)
}
export const getPages0WithCursor = async (parentId: string) => {
  return await petGetPages0WithCursor({first: 256}, parentId)
}

export async function getStaticPaths() {
  const sites = await petGetSites()
  return {
    paths: sites.map(data => ({params: {siteId: data._id}})),
    fallback: 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext ) {
  const { params } = context
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['pet-get-site', params?.siteId], () => getSite(params?.siteId as string))
  await queryClient.prefetchQuery(['pet-get-pages0-with-cursor', {first: 256}, params?.siteId], () => getPages0WithCursor(params?.siteId as string))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    },
  }
} 

export default function Page() {
 
  return (
    <PaginationProvider>
      <GridPetPages0/>
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