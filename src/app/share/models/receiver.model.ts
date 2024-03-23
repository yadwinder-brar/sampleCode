export interface Receiver {
    id?	: number| string
    name?:string
    companyName?:string
    email?:string
    address1?:string
    address2?:string
    address3?:string
    city?:string
    zipCode?:string
    state?:string
    country?:string
    countryShortCode?:string
    stateShortCode?:string
    phone?:number
    tags?:string[]
    shipDate?:string
    addressType?:string
    isResidential?:boolean
    isMixed?:boolean
    isBusiness?:boolean
    isVerified?:boolean
    user?:any
 }