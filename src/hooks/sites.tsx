import { ListSite, Site } from "@/interfaces/site";
import { getSitesWithCursor } from "@/pages/dashboard/sites/pet";
import { getSite } from "@/pages/dashboard/sites/pet/[siteId]";
import { useQuery } from "@tanstack/react-query";

export const useListSite = () => {

  return useQuery<ListSite>({
   queryKey: ['pet-get-sites-with-cursor', {first: 256}],
   queryFn: getSitesWithCursor,
 });
}
export const usePetGetSite = (id: string) => {

  return useQuery<Site>({
   queryKey: ['pet-get-site', id],
   queryFn: () => getSite(id),
 });
}


// const { data: listPage0 } = useQuery({
//   queryKey: ['pet-get-pages0-with-cursor', {first: 256}, props.site._id],
//   queryFn: () => petGetPages0WithCursor({first: 256}, props.site._id),
//   initialData: props.listPage,
// });