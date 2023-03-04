import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dxhbjjkbh',
  api_key: '277323142449427',
  api_secret: 'JT1jNcMwwKEHUnM-JQGo4fcKG1o',
  secure: true,
});

describe('tests on fileUpload', () => {
  test('should upload a file to cloudinary', async () => {
    const imageUrl =
      'https://c-fa.cdn.smule.com/rs-s78/arr/9f/07/686e7639-a473-47dd-9278-7c5cbc9270f5.jpg';

    const controller = new AbortController();
    const response = await fetch(imageUrl);

    const file = new File([await response.blob()], 'lilo.jpg');

    const resp = await fileUpload(file);
    const image = resp.secure_url as string;
    const imageId = image.split('/').slice(-1).pop()?.replace('.jpg', '');
    if (imageId) {
      await cloudinary.api.delete_resources(['journal/' + imageId]);
    }
    expect(resp.secure_url).toBeDefined();
  });
});
