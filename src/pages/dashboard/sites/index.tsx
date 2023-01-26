import GridCategories from '@/components/GridCategories'
import LayoutHeaderDashboard from '@/layouts/layoutHeaderDashboard'

export default function Page() {
  return (
    <GridCategories />
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <LayoutHeaderDashboard>
      {page}
    </LayoutHeaderDashboard>
  )
}