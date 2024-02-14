export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  keyUserdata: 'userData',
  lembreMeEmail: 'lembreMeEmail',
  lembreMe: 'lembreMe'
}
