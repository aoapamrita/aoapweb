import apiclient from "../utilities/createclient";

export default async function invokeAPI(input) {

    console.log("callapi-leadsquared", input);
 try {
    const { data } = await apiclient.post("/api/leadsquared/apirequest", input);
    console.log("callapi-success", data);
  } catch (error) {
    const { data } = error.response;
    console.log("callapi-error", data);
  }


}