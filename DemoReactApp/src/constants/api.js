const API_URI = 'https://pv247messaging.azurewebsites.net/api/v2';
const API_APP_ID = 'f1a58775-114f-46c0-ab5b-9712dac5a285';

export const API_AUTH_URI = `${API_URI}/auth`;
export const API_FILE_URI = `${API_URI}/file`;
export const createApiUserUri = (userEmail) => `${API_URI}/${API_APP_ID}/user/${userEmail}`;
export const createApiFilerUri = (fileId) => `${API_URI}//file/${fileId}/download-link`;

export const USER_EMAIL = 'undefined@null.zero';