import apiclient from "@/app/utilities/createclient";

export async function getJeeTransactionsByApplication(applicationId) {
  try {
    const { data } = await apiclient.get(
      `/api/transactions/jee/application/${applicationId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

// export async function getTransactionsByCandidate() {
//   try {
//     const { data } = await apiclient.get(`/api/transactions/entrance/`);
//     return data;
//   } catch (error) {
//     return [];
//   }
// }

export async function createJeeTransaction(input) {
  try {
    const { data } = await apiclient.post(`/api/transactions/jee/`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
