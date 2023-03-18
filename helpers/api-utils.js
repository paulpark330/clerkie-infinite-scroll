const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

export const getInitialFriends = async () => {
  const res = await fetch(
    `${API_URL}/friends?sort[0]=id&pagination[page]=1&pagination[pageSize]=10`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data.data;
};

export const getMoreFriends = async (page, pageSize) => {
  const res = await fetch(
    `${API_URL}/friends?sort[0]=id&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data;
};
