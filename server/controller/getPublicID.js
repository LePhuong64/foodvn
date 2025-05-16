const GetPublicId = (imageUrl) => {
  const parts = imageUrl.split("/");
  const filename = parts.pop().split(".").slice(0, -1).join(".");
  const folder = parts.pop();
  return `${folder}/${filename}`;
};

export default GetPublicId;
