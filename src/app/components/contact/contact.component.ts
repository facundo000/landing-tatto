import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
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
    phone: '+34 654 85 85',
    email: ''
  };

  socialMedia: SocialMedia[] = [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/tu-estudio',
      icon: 'instagram'
    },
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/34654858585',
      icon: 'whatsapp'
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/tu-estudio',
      icon: 'facebook'
    }
  ];
subscriptionPlaceholder: any = 'Loki@gmail.com';

  public onSubmitSubscription(): void {
    if (this.emailSubscription.trim()) {
      
      // Aquí se implementaría la lógica de suscripción
      console.log('Email suscrito:', this.emailSubscription);
      
      // Animación de éxito
      gsap.to('.subscription-form', {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });

      this.emailSubscription = '';
    }
  }

  public onInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmitSubscription();
    }
  }

  onSocialClick(social: SocialMedia): void {
    window.open(social.url, '_blank');
  }

  onMapClick(): void {
    // Abrir dirección en Google Maps
    const address = encodeURIComponent(this.contactInfo.address);
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
  }

  onPhoneClick(): void {
    window.location.href = `tel:${this.contactInfo.phone}`;
  }
}
