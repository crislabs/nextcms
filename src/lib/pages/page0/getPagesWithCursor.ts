import { ListPage, Page } from '@/interfaces/page';
import { ConnectionArgs, ListInput } from '@/interfaces/site';

export async function petGetPages0WithCursor(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListPage> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // cache: 'force-cache',
    // next: { revalidate: 86400 },

    body: JSON.stringify({
      query: `
      query PetGetPages0WithCursor($args: ConnectionArgs!, $parentId: String!){
        petGetPages0WithCursor(args: $args, parentId:$parentId){
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
       
          
        }
      }
      `,
      variables: { args, parentId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetPages0WithCursor);
}
