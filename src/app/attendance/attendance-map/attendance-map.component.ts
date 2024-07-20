import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-attendance-map',
  templateUrl: './attendance-map.component.html',
  styleUrls: ['./attendance-map.component.css']
})
export class AttendanceMapComponent {
  @Input() att_latitudeIN!: number;
  @Input() att_longitudeIN!: number;
  @Input() att_latitudeOUT!: number;
  @Input() att_longitudeOUT!: number;

  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {}

  getIntimeMapUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${this.att_latitudeIN},${this.att_longitudeIN}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getOuttimeMapUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${this.att_latitudeOUT},${this.att_longitudeOUT}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
