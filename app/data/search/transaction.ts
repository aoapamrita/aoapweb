import apiclient from "@/app/utilities/createclient";

export const searchTransactionById = async (input) => {
    try {
      const { data } = await apiclient.post(`/api/search/transaction`, input);
      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  };