'use client';

import { usePagination } from '@/providers/PaginationContext';
import { SelectionProvider } from '@/providers/SelectionContext';
import { ListPage, Page } from '@/interfaces/page';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';
import { CardPage0 } from './CardPage0';
import { HeadingDashboard } from './HeadingDashboard';
import { HeadingDashboardOption } from './HeadingDashboardOptions';
import { petGetPages0WithCursor } from '@/lib/pages/page0/getPagesWithCursor';
import { Site } from '@/interfaces/site';
import { petGetSite } from '@/lib/sites/getSite';
import { useGetPages0WithCursor } from '@/hooks/pages';
import { usePath } from '@/utils';
import { usePetGetSite } from '@/hooks/sites';

interface Props {
  // listPage: ListPage;
  // site: Site
}

export function GridPetPages0(props: Props) {
  const query = usePath()
  const {data: listPage0} = useGetPages0WithCursor(query[3])
  const {data: site} = usePetGetSite(query[3])
  return (
    <SelectionProvider ids={listPage0?.page.edges.map(data => data.node._id) as string[]}>
      <HeadingDashboard title={site?.data.name} site={site} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listPage0?.page.edges.map((data, i) => (
          <CardPage0 key={i} page={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}