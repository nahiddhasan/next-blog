"use server"
export const getCategory = async (q="") => {
  console.log(q)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category?q=${q}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const CategoryData = async (slug, q, page, limit) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${slug}?q=${q}&page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const getPosts = async (q, cat,page,limit) => {
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?q=${q}&cat=${cat}&page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

  export const trandings = async () => {
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/trandings`,
      {
        cache: "default",
      }
    );
    if (!res.ok) {
      return "Something went wrong";
    }
    const data = await res.json()
    return data;
  };

 