import apiclient from "@/app/utilities/createclient";

export async function getTransactionsByApplication(applicationId) {
  try {
    const { data } = await apiclient.get(
      `/api/transactions/application/${applicationId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

export async function getTransactionsByCandidate() {
  try {
    const { data } = await apiclient.get(`/api/transactions/entrance/`);
    return data;
  } catch (error) {
    return [];
  }
}

export async function createEntranceTransaction(input) {
  try {
    const { data } = await apiclient.post(`/api/transactions/entrance/`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export const getAllTransaction = async () => {
  try {
    const { data } = await apiclient.get(`/api/transactions/entrance/all/`);
    return data;
  } catch (error) {
    return null;
  }
};