import { ListPage } from "@/interfaces/page";
import { ListSite, Site } from "@/interfaces/site";
import { getSitesWithCursor } from "@/pages/dashboard/sites/pet";
import { getPages0WithCursor, getSite } from "@/pages/dashboard/sites/pet/[siteId]";
import { useQuery } from "@tanstack/react-query";

export const useGetPages0WithCursor = (parentId: string) => {

  return useQuery<ListPage>({
   queryKey: ['pet-get-pages0-with-cursor', {first: 256}, parentId],
   queryFn: () => getPages0WithCursor(parentId),
 });
}
export const usePetGetSite = (id: string) => {

  return useQuery<Site>({
   queryKey: ['pet-get-site', id],
   queryFn: () => getSite(id),
 });
}
