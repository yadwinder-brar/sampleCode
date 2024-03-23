import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ToasterService } from 'src/app/core/services';
import { ValidatorsService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-subAdmin-add-plan',
  templateUrl: './subAdmin-add-plan.component.html',
  styleUrls: ['./subAdmin-add-plan.component.css'],
})
export class SubAdminAddPlanComponent implements OnInit {
  planForm!: FormGroup;
  isLoading: boolean = false;
  planId: any = '';
  planData: any;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toasterServices: ToasterService,
    private _route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    this.planId = this._route.snapshot.params['id'];

    if (this.planId) {
      this.getPlanbyId(this.planId);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.planForm = this._fb.group({
      planName: ['', [ValidatorsService.required]],
      planPrice: ['', [ValidatorsService.required]],
      scanCount: ['', [ValidatorsService.required]],
      validity: ['', [ValidatorsService.selectRequired]],
      additionalFee: this._fb.group({
        packageReceiving: ['', [ValidatorsService.required]],
        packageConsolidation: ['', [ValidatorsService.required]],
        overWeight: ['', [ValidatorsService.required]],
        mailStorage: ['', [ValidatorsService.required]],
        palletReceiving: ['', [ValidatorsService.required]],
        palletStorage: ['', [ValidatorsService.required]],
        packageStorage: ['', [ValidatorsService.required]],
      }),
      penaltyFee: this._fb.group({
        wrongAddress: ['', [ValidatorsService.required]],
        late: ['', [ValidatorsService.required]],
        reinstatement: ['', [ValidatorsService.required]],
      }),
    });
  }
  addEditPlan() {
    if (this.planForm.invalid) {
      this.planForm.value;
      this.planForm.markAllAsTouched();
      return;
    }
    if (this.planForm.valid) {
      this.planId ? this.updatePlan() : this.addPlan();
    }
  }
  addPlan() {
    this.isLoading = true;
    this._apiService.addMailboxPlans(this.planForm.value).subscribe((res) => {
      if (res?.isSuccess) {
        this.isLoading = false;
        this._router.navigate(['/subAdmin/plan']);
      } else {
        this.isLoading = false;
      }
    });
  }
  updatePlan() {
    this.isLoading = true;
    this._apiService
      .updateMailboxPlans(this.planForm.value, this.planId)
      .subscribe((res) => {
        if (res?.isSuccess) {
          this.isLoading = false;
          this._toasterServices.successToast('Plan updated successfully');
          this._router.navigate(['/subAdmin/plan']);
        } else {
          this.isLoading = false;
        }
      });
  }

  getPlanbyId(planId: any) {
    this.isLoading = true;
    this._apiService.getMailBoxPlanById(this.planId).subscribe((res) => {
      if (res?.isSuccess) {
        this.planData = res?.data;
        ValidatorsService.updateForm(this.planForm, this.planData);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
}
