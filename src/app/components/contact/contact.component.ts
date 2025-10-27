import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactInfo {
  address: string;
  phone?: string;
  email?: string;
}

interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  imports: [ FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent { 
  public emailSubscription = '';


  contactInfo: ContactInfo = {
    address: 'Camino del Dragón 7822',
  };

  socialMedia: SocialMedia[] = [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/tu-estudio',
      icon: 'instagram'
    }
  ];

  onSocialClick(social: SocialMedia): void {
    window.open(social.url, '_blank');
  }

  onMapClick(): void {
    // Abrir dirección en Google Maps
    const address = encodeURIComponent(this.contactInfo.address);
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
  }

}
