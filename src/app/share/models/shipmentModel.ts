import { AdditionalInfo } from "./additionalInfo.model";
import { Packages } from "./packages.model";
import { Receiver } from "./receiver.model";

export interface shipmentDetail {
id?:string;
uniqueId?:string;
status?:string;
additionalInformation:AdditionalInfo
isCopied?:boolean;
selectedService:selectedService;
serviceQuote?:serviceQuote[];
shipmentDetail?:shipmentDetail;
trackingNumber?:string
shipmentTrackingDetail?:shipmentTrackingDetail
trackingStatus?:trackingStatus
isPaymentComplete?:boolean;
sender?:Receiver;
receiver?:Receiver
packages?:Packages[]
createdBy?:string
shipmentPaymentHistory?:ShipmentPaymentHistory

}

export interface ShipmentPaymentHistory{ }

 export interface trackingStatus{ 
   CODE: string,
   DEFINATION:string
 }
 export interface shipmentTrackingDetail{ 
 }
 export interface shipmentDetail{ 
 }

 export interface selectedService{
    serviceType?:string
    shipmentPrice?:number
    serviceName?:string
    day?: string,
    dayOfWeek?: string,
    time?: string
 }
 export interface serviceQuote{
    name?:string
    value?:number
 }
