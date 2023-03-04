import axios from "axios";

export const fileUpload = async (file: File) => {
  console.log("🚀 ~ file: fileUpload.ts:4 ~ fileUpload ~ file", file)
  const cloudURL = "https://api.cloudinary.com/v1_1/dxhbjjkbh/image/upload"

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  
  try {

    const resp = await axios.post(cloudURL, formData);

    // const resp = await fetch(cloudURL, {
    //   method: 'POST',
    //   body: formData,
    // });

    console.log(resp);

    if(resp.status == 201){
      throw new Error('cannot upload file');
    }

    const cloudResp = await resp.data;
    return cloudResp;

  } catch (error) {
    console.log(error);
    throw error;
  }
}