'use client';

import { useListSite } from '@/hooks/sites';
import { ListSite } from '@/interfaces/site';
import { SelectionProvider } from '@/providers/SelectionContext';
// import { SelectionProvider } from '@/src/providers/SelectionContext';
// import { HeadingDashboard } from './HeadingDashboard';
// import { HeadingDashboardOption } from './HeadingDashboardOptions';

import { CardSite } from './CardSite';
import { HeadingDashboard } from './HeadingDashboard';
import { HeadingDashboardOption } from './HeadingDashboardOptions';

interface Props {
}

export function GridPetSites() {
  
  // const { connectionArgs } = usePagination();
  // const searchParams = useSearchParams();
  const {data: listSite} = useListSite()
  // console.log('sites', listSite)
  // const { data: listSite } = useQuery({
  //   queryKey: ['pet-get-sites-with-cursor', {first: 256}],
  //   queryFn: () => petGetSitesWithCursor({first: 256}),
  //   initialData: props.listSite,
  // });
  return (
    <SelectionProvider ids={listSite?.page.edges?.map(data => data.node._id) as string[]}>
      <HeadingDashboard title={"Sites Pet"} />
      <HeadingDashboardOption />

      <div className={'grid-sites'}>
        {listSite?.page.edges.map((data, i) => (
          <CardSite key={i} site={data.node} />
          ))}
      </div>
     

    </SelectionProvider>
  );
}