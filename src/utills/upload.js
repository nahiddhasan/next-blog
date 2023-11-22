const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Next_Blog");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/nahiddhasan/image/upload", {
        method: "POST",
        body: data,
      });
  
      const resData = await res.json();
      return resData.url;
    } catch (error) {
      console.log(error);
    }
  };
  
  export default upload;