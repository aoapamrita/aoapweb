import apiclient from "@/app/utilities/createclient";


export async function getUtmSource() {
  try {
    const { data } = await apiclient.get(
      `/api/data/utmsource`
    );
    return data;
  } catch (error) {
    return [];
  }
}

