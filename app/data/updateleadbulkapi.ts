import apiclient from "../utilities/createclient";

export default async function invokebulkAPI(input) {

    console.log("callapi-leadsquared", input);
 try {
    const { data } = await apiclient.post("/api/leadsquared/lsqbulkAPI", input);
    console.log("callapi-success", data);
    return data;
  } catch (error) {
    const { data } = error.response;
    console.log("callapi-error", data);
  }


}