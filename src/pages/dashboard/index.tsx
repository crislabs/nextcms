import LayoutHeaderDashboard from '@/layouts/layoutHeaderDashboard'
import React from 'react'

export default function Page() {
  return (
    <div>Dashboard</div>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {

  return (
    <LayoutHeaderDashboard>
      {page}
    </LayoutHeaderDashboard>
  )
}