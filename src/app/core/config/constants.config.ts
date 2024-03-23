export const DefaultLanguageCode = "jp";

export const StorageKeys = {
  ActiveLanguageKey: 'activeLanguage',
  AuthTokenKey: 'x-access-token',
  UserRoleKey: 'role',
  UserId: 'id',
  PlanId: 'PlanId',
  ApplicationModeKey: 'applicationMode',
  CurrentProfile:'profile',
  AdminProfile:'AdminProfile',
  ApplicationFrom:'ApplicationFrom',
  UserAccountType:'userAccountType'
}
export enum LocalStorage {
  USER = 'user',
  TOKEN = 'x-access-token',
  CONFIGURATION = 'configuration',
  setItem = "setItem"
}
export const Messages = {
  Error: {
    UnexptectedError: "Something went wrong!! Please try again later.",
  },
  Success: {

  },
  Warning: {
    RequiredField: "Please enter the required field.",
    RequiredFields: "Please enter the required fields.",
    NegativeAmount: "FIELD amount should not be positive .",
    PositiveAmount: "FIELD amount should not be negative .",
    InvalidRangeAmount: "FIELD amount is invalid.",
    InvalidDeferral: "Deferral amount should be less or equal to charge total.",
    Reasons: "Please enter the TEXT value."
  }
}
