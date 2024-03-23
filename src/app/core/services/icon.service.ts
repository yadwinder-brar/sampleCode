import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {


  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,) { }


  getIcons() {
    this.matIconRegistry.addSvgIcon(
      `home_grey`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/home_grey.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_menu_alarm copy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_menu_alarm copy.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `log-out-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/log_out.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `user-profile-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/user_profile.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `hamburger-blue`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/hamburger-blue.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/close.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `elv_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/elv_icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `light_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/light_icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `temp_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/temp_icon.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `water_drop`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/water_drop.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `alarm_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_menu_alarm.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `location_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_map_normal.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_alarm_calendar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_alarm_calendar.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_download.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_header_lang`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_header_lang.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_menu_chevron`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_menu_chevron.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_menu_chevron1`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_menu_chevron1.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `upload-file`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/upload-file.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `file-document`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/file-document.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_alarm`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_map_alarm.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_yellow_unmanned`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/mapIcons/icon_map_yellow_unmanned.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_grey_manned`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/mapIcons/icon_map_grey_manned.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_grey_unmanned`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/mapIcons/icon_map_grey_unmanned.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_green_unmanned`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/mapIcons/icon_map_green_unmanned.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `icon_map_red_unmanned`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/mapIcons/icon_map_red_unmanned.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `arrow_upward`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_trend_up.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `arrow_downward`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/icon_trend_down.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `add_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/Add-Button.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `edit_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/edit.svg'
      ),

    );
    this.matIconRegistry.addSvgIcon(
      `delete_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/trash.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `upload_Image`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/upload_Image.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `arrow_down`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/arrow_down.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `search_Icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/search_Icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `userCancel`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/userCancel.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `filterIcon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/filterIcon.svg'
      )
    );

  }
}
