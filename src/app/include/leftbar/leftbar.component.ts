import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from '../../app.service'; // Import the service

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements AfterViewInit {

  constructor(
    public router: Router, 
    private appService: AppService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Use service method to get isCollapsed
  get isCollapsed(): boolean {
    return this.appService.getIsCollapsed();
  }

  subMenuState: { [key: string]: boolean } = {
    Reports: false
  };

  toggleSubMenu(menu: string) {
    this.subMenuState[menu] = !this.subMenuState[menu];
  }

  toggleSidebar() {
    this.appService.setIsCollapsed(!this.appService.getIsCollapsed());

    if (isPlatformBrowser(this.platformId)) {
      // Change logo based on sidebar state
      const Logo1 = document.getElementById('logo1') as HTMLImageElement;
      const Logo2 = document.getElementById('logo2') as HTMLImageElement;
      if (this.appService.getIsCollapsed()) {
        Logo1.style.display = 'none';
        Logo2.style.display = 'block';
      } else {
        Logo1.style.display = 'block';
        Logo2.style.display = 'none';
      }
    }
  }

  showAlert(text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      text: text,
    
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }

  logout(): void {
    this.showAlert(
      'Are You Sure, You want to logout?',
    ).then((result: SweetAlertResult<any>) => {
      console.log(result); // You can handle the result here
      if (result.isConfirmed) {
        // Redirect to the login page using window.location.href
        window.location.href = '/login';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Redirect to the home page using window.location.href
        window.location.href = '/Home';
      }
    });
  }
  
  

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the logo is displayed correctly on initial load
      const Logo1 = document.getElementById('logo1') as HTMLImageElement;
      const Logo2 = document.getElementById('logo2') as HTMLImageElement;
      if (this.appService.getIsCollapsed()) {
        Logo1.style.display = 'none';
        Logo2.style.display = 'block';
      } else {
        Logo1.style.display = 'block';
        Logo2.style.display = 'none';
      }
    }
  }
}