import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-attendance-map',
  templateUrl: './attendance-map.component.html',
  styleUrls: ['./attendance-map.component.css']
})
export class AttendanceMapComponent {
  @Input() latitude!: number;
  @Input() longitude!: number;

  let: any = '25.2048';
  long: any = '55.2708';
  url: string = '';

  

  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {

    this.url = 'https://maps.google.com/maps?q='+this.let+','+this.long+'&z=16&output=embed';


   }

  //this.url = `http://maps.google.com/maps?q=${this.let},${this.long}&z=16&output=embed`;

  // getMapUrl(): string {
  //   const url = `http://maps.google.com/maps?q=${this.let},${this.long}&z=16&output=embed`;
  //   return url;
  // }

  getMapUrl(): SafeResourceUrl {
    const url = `http://maps.google.com/maps?q=${this.latitude},${this.longitude}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeModal(): void {
    this.activeModal.close();
  }
}







// import { Component, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-attendance-map',
//   templateUrl: './attendance-map.component.html',
//   styleUrls: ['./attendance-map.component.css']
// })
// export class AttendanceMapComponent {
//   @Input() latitude: number = 25.2048;  // Default latitude
//   @Input() longitude: number = 55.2708; // Default longitude

//   url: string = '';

//   constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {
//     // Initialize the URL with default coordinates
//     this.url = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}&z=16&output=embed`;
//   }

//   getMapUrl(): SafeResourceUrl {
//     // Use the provided latitude and longitude or default values
//     const url = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}&z=16&output=embed`;
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }

//   closeModal(): void {
//     this.activeModal.close();
//   }
// }
