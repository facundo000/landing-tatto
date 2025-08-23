import { Component, OnInit, AfterViewInit, inject, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
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
    ButtonModule,
    NgClass
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
  public readonly subscriptionText = 'suscribete a promociones:';
  public readonly submitButtonIcon = 'pi pi-send';

  public emailSubscription = '';
  public isScrolled = false;
  public isNavigationActive = false;
  public isMobile = false;

  ngOnInit(): void {
    this.checkScreenSize();
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

    // Animación de los elementos de navegación (solo si no es móvil)
    if (!this.isMobile) {
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
    }

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

    // Efectos hover para los elementos de navegación (solo en desktop)
    if (!this.isMobile) {
      this.setupHoverEffects();
    }
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

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  public getNavigationItems(): NavigationItem[] {
    return this.navigationItems;
  }

  public onSubmitSubscription(): void {
    if (this.emailSubscription.trim()) {
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

  public toggleNavigation(): void {
    if (!this.isMobile) return;

    this.isNavigationActive = !this.isNavigationActive;

    // Usamos setTimeout para asegurar que Angular actualice el DOM antes de que GSAP busque los elementos.
    setTimeout(() => {
      if (this.isNavigationActive) {
        // Animación de entrada (ahora sí encontrará .nav-list.active)
        gsap.fromTo('.nav-list.active', 
          { 
            x: '-100%', 
            opacity: 0 
          },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.3, 
            ease: 'power2.out' 
          }
        );

        // Animación de los ítems del menú
        gsap.fromTo('.nav-list.active .nav-item', 
          { 
            x: -20, 
            opacity: 0 
          },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.3, 
            stagger: 0.1, 
            ease: 'power2.out',
            delay: 0.1
          }
        );
      }
      // Nota: Si tienes una animación de salida para cuando se cierra el menú, 
      // también debería ir dentro de este setTimeout, en un bloque 'else'.
    }, 0); // Un retardo de 0 es suficiente.
  }

  // Cerrar el menú móvil al hacer clic en un enlace
  public closeNavigationOnMobile(): void {
    if (this.isMobile && this.isNavigationActive) {
      this.isNavigationActive = false;
    }
  }

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 50;
  }

  @HostListener('window:resize', [])
  public onWindowResize(): void {
    const wasMove = this.isMobile;
    this.checkScreenSize();
    
    // Si cambió de móvil a desktop, cerrar el menú móvil
    if (wasMove && !this.isMobile) {
      this.isNavigationActive = false;
    }
  }

  // Cerrar el menú móvil al hacer clic fuera de él
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const navigation = document.querySelector('.navigation');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (this.isMobile && this.isNavigationActive && 
        navigation && navToggle &&
        !navigation.contains(target) && 
        !navToggle.contains(target)) {
      this.isNavigationActive = false;
    }
  }
}