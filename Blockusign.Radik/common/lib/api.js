import qs from 'qs';
import { getConfig } from 'radiks';

/**
 * 
 * @param {*} query - Use `lt`, `createdBy`, and `fetcher` to query messages.
 * @param lt - fetch all votes created before the time provided
 * @param createdBy - messages created by this username
 * @param fetcher - pass the current user's username, to get info about if they've voted
 */
export const fetchMessages = async (query) => {
  const { apiServer } = getConfig();
  const url = `${apiServer}/api/messages?${qs.stringify(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.messages;
};
