import { ApiEndpoints } from './../config/api-endpoints.config';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FaqList } from 'src/app/share/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: any = environment.apiUrls.baseApiUrl;
  constructor(private http: HttpClient) {}

  // country list and state list  api

  getCountryList() {
    return this.http.get<any>(this.url + ApiEndpoints.Common.CountryList);
  }
  getStateList(queryParams: any) {
    const country = queryParams?.country;
    const url = `${this.url}${ApiEndpoints.Common.StateList}?country=${country}`;
    return this.http.get<any>(url);
  }

  getCityList(queryParams: any) {
    const state = queryParams?.state;
    const url = `${this.url}${ApiEndpoints.Common.CityList}?state=${state}`;
    return this.http.get<any>(url);
  }

  // user apis start
  getUserScanCount() {
    return this.http.get<any>(this.url + ApiEndpoints.Users.GetUserScanCount);
  }
  getUserDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Users.GetUserDetail + '/' + id
    );
  }
  getSubAdminAccountSetting() {
    return this.http.get<any>(
      this.url + ApiEndpoints.SubAdmin.GetSubAdminAccountSetting
    );
  }

  getUserPositionTag() {
    return this.http.get<any>(this.url + ApiEndpoints.Users.UserTag);
  }
  getUsersList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const status = data?.status;
    const sort = data?.sort;
    const userPositionTag = data?.userPositionTag;
    const accountType = data?.accountType;
    const role = data?.role;
    const url = `${this.url}${ApiEndpoints.Users.GetUserDetail}?search=${search}&accountSortOrder=updatedAt,DSC&accountType=${accountType}&userPositionTag=${userPositionTag}&roleCode=${role}&sortOrder=${sort}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  loginToSubAdminAcc(data:any){
    return this.http.post<any>(this.url + ApiEndpoints.Users.LoginToSubAdminAcc,data);
  }

  
  deleteCustomerProfile(id: any, data: any, type: any) {
    let item = {
      accountType: type,
      userId: id,
    };
    return this.http.put<any>(
      this.url + ApiEndpoints.DeleteUserProfile.DeleteUserProfile + '/' + data,
      item
    );
  }

  getInvoiceUsersList(data?: any) {
    const tag = data || '';
    const url = `${this.url}${ApiEndpoints.Users.GetShipMentUserDetail}?filter=${tag}`;
    return this.http.get<any>(url);
  }
  getProInvoicesList(userId: string) {
    const url = `${this.url}${ApiEndpoints.Invoices.ShipmentInvoices}?userId=${userId}&pageSize=100&invoiceVersion=normal&paymentStatus=unpaid&isAddedToSpecialInvoice=false`;
    return this.http.get<any>(url);
  }

  downloadForm(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.DownloadForm.DownloadMailboxForm,
      data
    );
  }
  createSpecialInvoice(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.CreateSpecialInvoice,
      data
    );
  }
  calculateAmount(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Invoices.Calculate + '/' + id,
      data
    );
  }
  updateUserStatus(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.GetUserDetail + '/' + id,
      data
    );
  }
  deleteUserForAdmin(id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.DeleteUserForAdmin + '/' + id,
      ''
    );
  }
  addUserToVip(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.AddToVip + '/' + id,
      data
    );
  }
  inviteCustomer(data: any) {
    return this.http.post<any>(this.url + ApiEndpoints.Users.InviteUser, data);
  }

  addUser(data: any) {
    return this.http.post<any>(this.url + ApiEndpoints.Users.AddUser, data);
  }
  addSubAdmin(data: any, id?:string) {
     if (id) {
      return this.http.put<any>(this.url + ApiEndpoints.Users.AddUser+'/'+id, data)
    }
     else{
       return this.http.post<any>(this.url + ApiEndpoints.SubAdmin.AddSubAdmin, data)
    }
    
  }

  upgradeAccount(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.UpgradeAccount + '/' + id,
      data
    );
  }

  updateUserTour(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.updateTour + '/' + id,
      data
    );
  }

  // user apis end

  createSenderAddress(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Shipments.CreateSenderAddress,
      data
    );
  }
  updateSenderAddress(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.UpdateSenderAddress + '/' + id,
      data
    );
  }
  createReceiverAddress(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.CreateReceiverAddress + '/' + id,
      data
    );
  }

  getShipmentDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Shipments.GetShipments + '/' + id
    );
  }

  verifyAddress(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Shipments.VerifyAdress,
      data
    );
  }

  addPackage(data: any, id: string, type?: string) {
    if (type == 'fedEx') {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.AddFedExPackage + '/' + id,
        data
      );
    } else {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.AddPackageForUps + '/' + id,
        data
      );
    }
  }

  selectService(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.SelectService + '/' + id,
      data
    );
  }
  updateQuotes(data: any, id: string, carrierType?: any) {
    if (carrierType == 'fedEx') {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.UpdateQuotes + '/' + id,
        data
      );
    } else if (carrierType == 'ups') {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.UpdateQuotesForUps + '/' + id,
        data
      );
    } else {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.UpdateQuotes + '/' + id,
        data
      );
    }
  }
  updateProfile(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.UpdateProfile + '/' + id,
      data
    );
  }
  UpdatePassword(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Auth.UpdatePassword + '/' + id,
      data
    );
  }
  // shipments apis

  copyShipment(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Shipments.CopyShipment,
      data
    );
  }
  createShipment(id: string, data: any, carrierType: any) {
    if (carrierType == 'fedEx') {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.CreateShipment + '/' + id,
        data
      );
    } else if (carrierType == 'ups') {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.CreateUpsShipment + '/' + id,
        data
      );
    } else {
      return this.http.put<any>(
        this.url + ApiEndpoints.Shipments.CreateShipment + '/' + id,
        data
      );
    }
  }
  cancelShipment(id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.CancelShipment + '/' + id,
      ''
    );
  }
  DeleteCancelShipment(id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.DeleteCancelShipment + '/' + id,
      ''
    );
  }
  paymentShipment(id: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Shipments.PaymentShipment,
      id
    );
  }
  uploadBulkShipment(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Shipments.BulkShipment,
      data
    );
  }

  getShipments(data: any) {
    const userId = '';
    // data?.userId
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const status = data?.shipmentStatus;
    const date = data?.shipmentDate;
    const sort = data?.sort || 'createdAt,DSC';
    const shipmentListType = data?.shipmentListType
      ? data?.shipmentListType
      : '';
    const url = `${this.url}${ApiEndpoints.Shipments.GetShipments}?createdBy=${userId}&shipmentListType=${shipmentListType}&sortOrder=${sort}&date=${date}&search=${search}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getCustomerShipments(data: any) {
    const userId = data?.userId;
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const status = data?.shipmentStatus;
    const date = data?.shipmentDate;
    const sort = data?.sort || 'createdAt,DSC';
    const shipmentListType = data?.shipmentListType
      ? data?.shipmentListType
      : '';
    const url = `${this.url}${ApiEndpoints.Shipments.GetShipments}?createdBy=${userId}&shipmentListType=${shipmentListType}&sortOrder=${sort}&date=${date}&search=${search}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getBulkShipments(data: any) {
    const userId = data?.userId;
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const sort = data?.sort;
    // const shipmentListType = data?.shipmentListType &shipmentListType=${shipmentListType}
    const url = `${this.url}${ApiEndpoints.Shipments.GetBulkShipments}?createdBy=${userId}&sortOrder=${sort}&search=${search}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  deleteBulkShipments(id: string) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Shipments.DeleteBulkShipments + '/' + id
    );
  }
  deleteShipment(id: string) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Shipments.DeleteShipment + '/' + id
    );
  }

  printLabel(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Shipments.PrintLabel + '/' + id
    );
  }
  printMultipleLabel(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Shipments.PrintMultipleLabel + '/' + id
    );
  }

  // Address api start

  getAddresDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Addresses.GetAddressDetail + '/' + id
    );
  }
  getAddresess(data: any) {
    const userId = data.userId;
    const pageNo = data.pageNo;
    const pageSize = data.pageSize;
    const search = data.search;
    const addressType = data.addressType;
    const status = data.addressTags;
    const addressInputType = data?.addressInputType;
    const sort = data?.sort;
    const url = `${this.url}${ApiEndpoints.Addresses.GetAddress}?user=${userId}&sortOrder=${sort}&addressType=${addressType}&search=${search}&addressInputType=${addressInputType}&tags=${status}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  exportAddressList(id: any) {
    const userId = id;
    const url = `${this.url}${ApiEndpoints.Addresses.ExportAddress}?userId=${userId}`;
    return this.http.get<any>(url);
  }
  importAddressList(file: any) {
    let data = new FormData();
    data.append('file', file);
    // const userId = id
    // const url = `${this.url}${ApiEndpoints.Addresses.ImportAddress}`;
    // return this.http.get<any>(url)
    return this.http.post<any>(
      this.url + ApiEndpoints.Addresses.ImportAddress,
      data
    );
  }

  getDefaultAddresses(data: any) {
    const url = `${this.url}${ApiEndpoints.Addresses.GetAddress}?addressType=${data?.addressType}&user=${data?.user}`;
    return this.http.get<any>(url);
  }

  addAddress(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Addresses.AddAddress,
      data
    );
  }
  updateAddress(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Addresses.UpdateAddress + '/' + id,
      data
    );
  }

  addTags(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Addresses.AddAddress + '/' + id,
      data
    );
  }

  deleteAddress(id: any) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Addresses.DeleteAddress + '/' + id
    );
  }

  // packages  api  start

  getPackageList(data: any) {
    const userId = data?.userId;
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const packageType = data?.packageType;
    const sort = data?.sort;
    const url = `${this.url}${ApiEndpoints.Packages.GetPackagesDetail}?createdBy=${userId}&sortOrder=${sort}&search=${search}&packageType=${packageType}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getPackagesById(userId: any) {
    const url = `${this.url}${ApiEndpoints.Packages.GetPackagesDetail}?createdBy=${userId}`;
    return this.http.get<any>(url);
  }

  getPackageDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Packages.GetPackageDetail + '/' + id
    );
  }

  updatePackageDetail(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Packages.GetPackageDetail + '/' + id,
      data
    );
  }
  addPackageDetail(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Packages.AddPackage,
      data
    );
  }

  deletePackage(id: any) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Packages.DeletePackage + '/' + id
    );
  }

  // packages  api  end

  // faq  api  start

  getFaqList(data: any) {
    const search = data?.search;
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const url = `${this.url}${ApiEndpoints.Faq.GetFaq}?search=${search}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  addFaq(data: FaqList) {
    return this.http.post<any>(this.url + ApiEndpoints.Faq.AddFaq, data);
  }

  updateFaq(data: FaqList, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Faq.EditFaq + '/' + id,
      data
    );
  }

  deleteFaq(id: string) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Faq.DeleteFaq + '/' + id
    );
  }

  // faq  api  end

  // analytics and report  api  start

  getLogs() {
    return this.http.get<any>(this.url + ApiEndpoints.AnalyticsAndReports.Logs);
  }
  getLocations() {
    return this.http.get<any>(
      this.url + ApiEndpoints.AnalyticsAndReports.Locations
    );
  }

  getRevenue(data: any) {
    const search = data?.search;
    const startDate = data?.startDate;
    const endDate = data?.endDate;
    const url = `${this.url}${ApiEndpoints.AnalyticsAndReports.Revenue}?search=${search}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(url);
  }

  // analytics and report  api end

  // dashboard  api  start
  getDashboardStatus() {
    return this.http.get<any>(this.url + ApiEndpoints.Dashboard.Status);
  }

  getShipmentSavingGraph(data: any) {
    const year = data?.year;
    const url = `${this.url}${ApiEndpoints.Dashboard.ShipmentDashboardSaving}?year=${year}`;
    return this.http.get<any>(url);
  }
  getShipmentsCountGraph(data: any) {
    const fromDate = data?.fromDate;
    const toDate = data?.toDate;
    const url = `${this.url}${ApiEndpoints.Dashboard.ShipmentDashboarShipmentCount}?startDate=${fromDate}&endDate=${toDate}`;
    return this.http.get<any>(url);
  }

  getMailboxGraphData(data: any) {
    const year = data?.year;
    const url = `${this.url}${ApiEndpoints.Dashboard.MailboxGraph}?year=${year}`;
    return this.http.get<any>(url);
  }

  getMailboxCountData(data: any) {
    const fromDate = data?.fromDate;
    const toDate = data?.toDate;
    const url = `${this.url}${ApiEndpoints.Dashboard.MailboxCount}?startDate=${fromDate}&endDate=${toDate}`;
    return this.http.get<any>(url);
  }

  getAdminAccountCount(data: any) {
    const year = data?.year;
    const url = `${this.url}${ApiEndpoints.Dashboard.AdminAccountGraph}?year=${year}`;
    return this.http.get<any>(url);
  }
  
  subAdminDashboardData(){
  const url = `${this.url}${ApiEndpoints.Dashboard.SubAdminAccountGraph}`;
  return this.http.get<any>(url);

}


  // dashboard  api  end

  // carrier apis start

  getCarrierDetail() {
    return this.http.get<any>(this.url + ApiEndpoints.Carrier.Carriers);
  }

  // carrier apis end

  // margin and discount apis start

  getMarginAndDiscountDetail() {
    return this.http.get<any>(
      this.url + ApiEndpoints.MarginAndDiscount.MarginAndDiscount
    );
  }
  updateMargin(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MarginAndDiscount.MarginAndDiscount + '/' + id,
      data
    );
  }
  updateDiscount(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MarginAndDiscount.MarginAndDiscount + '/' + id,
      data
    );
  }
  updateVipDiscount(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MarginAndDiscount.VipMarginAndDiscount + '/' + id,
      data
    );
  }

  // margin and discount apis end

  // mailBox  api start
  getMailboxProfile(id: any) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Users.UpdateProfile + '/' + id
    );
  }
  cancelMailboxScan(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.CancelLabels + '/' + id,
      ''
    );
  }
  MarkAsPickup(id: any) {
    let data = {
      status: 'archived',
      action: 'inActive',
      labelRequestedStatus: 'inActive',
      lastActionAdmin: 'labelDelivered',
      lastActionUser: 'labelDelivered',
      sendMail: true,
    };
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.MarkAsPickup + '/' + id,
      data
    );
  }
  sendToArchive(id: any) {
    let data = {
      status: 'archived',
      action: 'inActive',
    };
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.SendToArchive + '/' + id,
      data
    );
  }

  getMailInboxList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const status = data?.status;
    const type = data?.type;
    const date = data?.date;
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.InboxList}?status=${status}&lastActionAdmin=${type}&search=${search}&date=${date}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getMailArchiveList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const date = data?.date;
    const status = data?.status;
    const type = data?.type;
    const profileId = data?.profileId;
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.InboxList}?status=${status}&action=${type}&search=${search}&date=${date}&pageNo=${pageNo}&pageSize=${pageSize}`;
    // &profileId=${profileId}
    return this.http.get<any>(url);
  }
  getMailTrashList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const status = data?.status;
    const search = data?.search;
    const date = data?.date;
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.InboxList}?status=${status}&search=${search}&date=${date}`;
    // &pageNo=${pageNo}&pageSize=${pageSize}
    return this.http.get<any>(url);
  }
  getApprovedMailboxList() {
    // const pageNo = ''
    // const pageSize = ''
    // &pageNo=${pageNo}&pageSize=${pageSize}
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.Profiles}?accountType=virtualMailBox&status=approved&pageSize=5000`;
    return this.http.get<any>(url);
  }

  getMailboxScansCount(id: any) {
    const url = `${this.url}${
      ApiEndpoints.MailboxProfiels.GetMailboxScansCount + '/' + id
    }`;
    return this.http.get<any>(url);
  }
  assignLabel(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.AssignLabels,
      data
    );
  }
  // Fixme change end point when api call
  assignMailboxPlanToUser(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.AssignPlanToUser,
      data
    );
  }
  assignMailboxScanCount(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.AssignScanCount,
      data
    );
  }
  getUserMailboxDetail(id: any) {
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.AssignLabels}?profileId=${id}&pageSize=1000`;
    return this.http.get<any>(url);
  }
  // &labelRequestedStatus=active serverPaging=false
  assignOpenAndScanRes(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.OpenAndScanRes + '/' + id,
      data
    );
  }
  forwardMail(id: any, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.ForwardLabel + '/' + id,
      data
    );
  }
  forwardMultipleMail(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.ForwardMultipleLabel,
      data
    );
  }
  verifyOtp(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.HoldForPickupVerify + '/' + id,
      data
    );
  }
  holdForPickUp(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.HoldForPickup + '/' + id,
      ''
    );
  }
  holdForPickUpOtp(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.HoldForPickupOtp + '/' + id,
      ''
    );
  }
  holdForPickUpMultipleOtp(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.HoldForPickupMultipleOtp,
      data
    );
  }

  openAndScanReq(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.OpenAndScanReq,
      data
    );
  }
  forwordMailBox(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.ForwardLabel + '/' + id,
      data
    );
  }
  notMyMail(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.NotMyMail,
      data
    );
  }
  sendInTrash(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.AddInTrash,
      data
    );
  }
  getLabelDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.MailboxProfiels.AssignLabels + '/' + id
    );
  }

  addShipmentDateForForwardLabel(id: any, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.AddShipmentDate + '/' + id,
      data
    );
  }

  getMailBoxRequestList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const sort = data?.sort;
    const acountType = data?.acountType;
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.Profiles}?search=${search}&sortOrder=${sort}&accountSortOrder=updatedAt,DSC&accountType=${acountType}&status=pending&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getMailBoxOrderList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const toDate = data?.toDate;
    const fromDate = data?.fromDate;
    const assigne = data?.assigne;
    const sort = data?.sort;
    const status = data?.status;
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.Profiles}?search=${search}&accountSortOrder=${sort}&accountType=virtualMailBox&status=${status}&startDate=${fromDate}&endDate=${toDate}&isAssigne=${assigne}&pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  markActiveInactive(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.MarkActiveInactive + '/' + id,
      data
    );
  }
  getMailBoxRequestDetail(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.MailboxProfiels.Profiles + '/' + id
    );
  }
  getMailBoxPlans(data?: string) {
    const url = `${this.url}${ApiEndpoints.MailboxProfiels.Plans}?validity=${data}`;
    return this.http.get<any>(url);
  }
  changeDueDate(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.ChangeDueDate + '/' + id,
      data
    );
  }
  addRemovePopular(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.Plans + '/' + id,
      data
    );
  }
  getMailBoxPlanById(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.MailboxProfiels.Plans + '/' + id
    );
  }
  addMailboxPlans(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.Plans,
      data
    );
  }
  updateMailboxPlans(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.Plans + '/' + id,
      data
    );
  }

  deletePlan(id: string, data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.Plans + '/' + id,
      data
    );
  }

  buyMailBoxPlans(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.BuyPlans,
      data
    );
  }

  approveRejectShipmentRequest(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.ApproveOrReject + '/' + id,
      data
    );
  }
  approveRejectMailBoxRequest(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.ApproveReject + '/' + id,
      data
    );
  }
  reassignMailbox(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.Profiles + '/' + id,
      data
    );
  }
  paymentVerification(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.Payment,
      data
    );
  }
  shipmentPaymentVerification(data: any) {
    return this.http.post<any>(this.url + ApiEndpoints.Shipments.Payment, data);
  }

  updateForwardQuots(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.ForwardResponse + '/' + id,
      data
    );
  }

  selectForwardPlan(data: any, id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.MailboxProfiels.SelectForwardPlan + '/' + id,
      data
    );
  }
  selectForwardPlanPayment(id: any) {
    return this.http.put<any>(
      this.url +
        ApiEndpoints.MailboxProfiels.SelectForwardPlanPayment +
        '/' +
        id,
      ''
    );
  }

  ForwardLabelPayment(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.MailboxProfiels.CheckForwardPayment,
      data
    );
  }

  // mailBox  api end

  // invoice api start

  getShipmentInvoiceList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const date = data?.date;
    const status = data?.payStatus;
    const sort = data?.sort;
    const url = `${this.url}${ApiEndpoints.Invoices.ShipmentInvoices}?search=${search}&sortOrder=${sort}&paymentStatus=${status}&pageNo=${pageNo}&date=${date}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getSubAdminMandatoryInvoiceList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const date = data?.date;
    const status = data?.payStatus;
    const sort = data?.sort;
    const userId = data?.userId;
    const url = `${this.url}${ApiEndpoints.Invoices.SubAdminMandatoryInvoiceList}?search=${search}&invoiceType=assignByAdmin&userId=${userId}&sortOrder=${sort}&paymentStatus=${status}&pageNo=${pageNo}&date=${date}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getSubInvoiceList(data: any) {
    const pageNo = data?.pageNo
    const pageSize = data?.pageSize
    const search = data?.search
    const date = data?.date
    const status = data?.payStatus
    const sort = data?.sort
    const url = `${this.url}${ApiEndpoints.Invoices.SubAdminInvoices}?search=${search}&invoicesOf=${'SUB_ADMIN'}&sortOrder=${sort}&paymentStatus=${status}&pageNo=${pageNo}&date=${date}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getMailBoxInvoiceList(data: any) {
    const pageNo = data?.pageNo;
    const pageSize = data?.pageSize;
    const search = data?.search;
    const date = data?.date;
    const status = data?.payStatus;
    const sort = data?.sort;
    const url = `${this.url}${ApiEndpoints.Invoices.MailboxInvoices}?search=${search}&sortOrder=${sort}&paymentStatus=${status}&pageNo=${pageNo}&date=${date}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getSubAdminInvoiceList(data:any){
    const pageNo = data?.pageNo
    const pageSize = data?.pageSize
    const search = data?.search
    const date = data?.date
    const status = data?.payStatus
    const sort = data?.sort
    const invoicesOf = data?.invoicesOf
    const url = `${this.url}${ApiEndpoints.Invoices.SubAdminInvoices}?search=${search}&invoicesOf=${invoicesOf}&sortOrder=${sort}&paymentStatus=${status}&pageNo=${pageNo}&date=${date}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  cancelInvoice(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Invoices.CancelInvoice + '/' + id,
      ''
    );
  }
  cancelSubAdminInvoice(id: any) {
    return this.http.put<any>(this.url + ApiEndpoints.Invoices.CancelSubAdminInvoice + '/' + id, '')
  }
  cancelSpecialInvoice(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Invoices.CancelSpecialInvoice + '/' + id,
      ''
    );
  }
  cancelMailboxInvoice(id: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Invoices.CancelMailboxInvoice + '/' + id,
      ''
    );
  }

  getUnpaidCount() {
    return this.http.get<any>(
      this.url + ApiEndpoints.Invoices.ShipmentInvoicesCount
    );
  }
  getMailboxUnpaidCount() {
    return this.http.get<any>(
      this.url + ApiEndpoints.Invoices.MailboxInvoicesCount
    );
  }
  downloadShipmentInvoice(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Invoices.downloadShipmentInvoice + '/' + id
    );
  }
  downloadMailboxInvoice(id: string) {
    return this.http.get<any>(
      this.url + ApiEndpoints.Invoices.downloadMailboxInvoice + '/' + id
    );
  }

  payForward(id: any) {
    let data = { invoiceId: id };
    return this.http.put<any>(
      this.url + ApiEndpoints.Invoices.PayInvoice + '/' + id,
      ''
    );
  }
  payAdminMailboxForward(id: any) {
    let data = { invoiceId: id };
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.PayAdminMailboxInvoice,
      data
    );
  }
  payAutomaticInvoice(id: any) {
    let data = { invoiceId: id };
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.PayAutomaticPlanInvoice,
      data
    );
  }
  payShipmentInvoice(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.payShipmentInvoice,
      data
    );
  }
  paySubAdminInvoice(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.paySubAdminInvoice,
      data
    );
  }

  shipmentInvoicePayment(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.ShipmentPaymentVerification,
      data
    );
  }
  forwardPayment(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.PaymentVerificationPlan,
      data
    );
  }
  createMailboxInvoice(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.CreateMailboxInvoice,
      data
    );
  }
  createShipmentInvoice(data: any) {
    return this.http.post<any>(
      this.url + ApiEndpoints.Invoices.CreateShipmentInvoice,
      data
    );
  }

  // invoice api end

  //  card Apis

  addCard(data: any) {
    return this.http.post<any>(this.url + ApiEndpoints.Shipments.AddCard, data);
  }
  deleteCard(id: any) {
    return this.http.delete<any>(
      this.url + ApiEndpoints.Shipments.AddCard + '/' + id
    );
  }
  getCardList(id: any) {
    const UserId = id;
    const url = `${this.url}${ApiEndpoints.Shipments.GetCard}?user=${UserId}`;
    return this.http.get<any>(url);
  }

  getInvoicePaymentStatus() {
    return this.http.get<any>(
      this.url + ApiEndpoints.Shipments.GetShipmentsPaidStatus
    );
  }

  // add address api
  senderAddress(data: any) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Shipments.AddShipment.AddAddress,
      data
    );
  }

  addProfileDocs(data: any, id: string) {
    return this.http.put<any>(
      this.url + ApiEndpoints.Users.UploadDocs + '/' + id,
      data
    );
  }

  // notification apis start

  getNotifications() {
    return this.http.get<any>(
      this.url + ApiEndpoints.Notifications.GetNotifications
    );
  }

  // notification apis end
}
