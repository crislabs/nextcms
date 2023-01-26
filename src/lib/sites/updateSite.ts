import { UpdateSite, Site } from "@/interfaces/site";

export async function petUpdateSite(input: UpdateSite):Promise<Site> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     query: `
     mutation PetUpdateSite($input: UpdateSite!) {
      petUpdateSite(input: $input) {
        _id
          data {
            name
            type{
              slug
            }
          }
      }
    }
     `,
     variables: {input},
   }),
 })
 .then(res => res.json())
 .then((res)=> res.data)
 .then((result) => result.petUpdateSite) 
}