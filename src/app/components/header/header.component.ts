import { Component, OnInit, AfterViewInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PrimeNG } from 'primeng/config'

interface NavigationItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  private readonly navigationItems: NavigationItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'SOBRE MI', route: '/sobre-mi' },
    { label: 'GALERIA', route: '/galeria' },
    { label: 'FAQs', route: '/faqs' },
    { label: 'CONTACTO', route: '/contacto' }
  ];

  public readonly brandName = 'RYUU';
  public readonly brandLogo = '龍刺青';
  public readonly subscriptionPlaceholder = 'Tu email';
  public readonly subscriptionText = 'suscribete a promociones';
  public readonly submitButtonIcon = 'pi pi-send';

  public emailSubscription = '';

  ngOnInit(): void {
    // Inicialización básica
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada del header
    gsap.fromTo('.header-container', 
      { 
        y: -100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out' 
      }
    );

    // Animación de los elementos de navegación
    gsap.fromTo('.nav-item', 
      { 
        y: -20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.3
      }
    );

    // Animación del formulario de suscripción
    gsap.fromTo('.subscription-form', 
      { 
        scale: 0.8, 
        opacity: 0 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)',
        delay: 0.6
      }
    );

    // Efectos hover para los elementos de navegación
    this.setupHoverEffects();
  }

  private setupHoverEffects(): void {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { 
          scale: 1.05, 
          duration: 0.2, 
          ease: 'power2.out' 
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, { 
          scale: 1, 
          duration: 0.2, 
          ease: 'power2.out' 
        });
      });
    });
  }

  public getNavigationItems(): NavigationItem[] {
    return this.navigationItems;
  }

  

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
} 