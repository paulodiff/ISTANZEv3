// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  production: false,
  origin: 'http://localhost:8009/',
  apiEndpoint: 'https://pmlab.comune.rimini.it/simplesaml',
  apiLogin: 'passportauth/login',
  apiLogout: 'passportauth/logout',
  apiLoginCheck: 'passportauth/check',
  apiProfile: 'profilemgr/me',
  apiUpload: 'segnalazioni/upload',
  apiLoginNTLM: 'loginmgr/NTLMlogin',
  apiLoginDEMO: 'loginmgr/DEMOlogin',
  apiLoginLDAP: 'loginmgr/LDAPlogin',
  apiLogoutLDAP: 'loginmgr/LDAPlogout',
  apiPosta: 'postamgr/posta',
  apiPostaCDC: 'postamgr/cdc',
  apiPostaStats: 'postamgr/stats',
  routeAfterLogon: 'elencoAtti',
  mapsdemo: false,
  debugFormDefaultData: true,
  loginUserName: '',
  loginUserPassword: '',
  profileStorageId : 'profileData',

  AUTH_EVENTS: {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    serverError: 'server-error',
    oldAppVersion: 'old-app-version'
  },

  USER_ROLES: {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  }

};
