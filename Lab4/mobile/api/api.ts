import type { MyFile } from '@/types/MyFile';
import { getBackendHost } from '@/utils/utils';
import axios from 'axios';

export const makeFungusClassificationRequest = async (file: MyFile) => {
  const backendHost = getBackendHost();
  const url = `${backendHost}/api/v1/classify-fungus`

  const formData = new FormData();
  formData.append('image', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any)

  try {
    console.log("called")
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    console.log(response.data.result)
    return response;
  }
  catch (error) {
    console.error(error)
    throw error;
  }
}
