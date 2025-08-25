import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NavigationItem {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  
  // ========== PROPIEDADES READONLY ==========
  private readonly navigationItems: NavigationItem[] = [
    { label: 'HOME', sectionId: 'home' },
    { label: 'SOBRE MI', sectionId: 'sobre-mi' },
    { label: 'GALERIA', sectionId: 'galeria' },
    { label: 'FAQs', sectionId: 'faqs' },
    { label: 'CONTACTO', sectionId: 'contacto' }
  ];

  public readonly brandName = 'RYUU';
  public readonly brandLogo = '龍刺青';
  public readonly subscriptionPlaceholder = 'Tu email';
  public readonly subscriptionText = 'suscríbete a promociones:';

  // ========== PROPIEDADES REACTIVAS ==========
  public emailSubscription = '';
  public isScrolled = false;
  public isNavigationActive = false;
  public isMobile = false;
  public activeSection = 'home';

  // ========== REFERENCIAS PARA CLEANUP ==========
  private intersectionObserver?: IntersectionObserver;

  // ========== LIFECYCLE HOOKS ==========
  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.setupSectionObserver();
    this.checkCurrentSection();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  // ========== INICIALIZACIÓN ==========
  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
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

  // ========== RESPONSIVE HANDLING ==========

  // ========== NAVEGACIÓN Y SCROLL ==========
  public navigateToSection(event: MouseEvent, sectionId: string): void {
    event.preventDefault();

    // Actualizar sección activa inmediatamente para feedback visual
    this.activeSection = sectionId;

    if (sectionId === 'home') {
      // Ir al inicio de la página
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
      this.updateUrl('');
    } else {
      // Buscar el elemento de la sección
      const element = document.getElementById(sectionId);
      
      if (element) {
        const headerOffset = 180; // Altura del header fijo
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        this.updateUrl(sectionId);
      } else {
        console.warn(`Sección '${sectionId}' no encontrada en el DOM`);
      }
    }

    // Cerrar menú móvil
    this.closeNavigationOnMobile();
  }

  private updateUrl(sectionId: string): void {
    const url = sectionId ? `#${sectionId}` : '';
    history.pushState(null, '', url);
  }

  private checkCurrentSection(): void {
    // Verificar si hay un hash en la URL al cargar
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.activeSection = hash;
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        this.scrollToSection(hash);
      }, 200);
    }
  }

  private scrollToSection(sectionId: string): void {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private setupSectionObserver(): void {
    // Configurar intersection observer para detectar la sección visible
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detectar cuando la sección está en el centro
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && this.activeSection !== sectionId) {
            this.activeSection = sectionId;
            this.updateUrl(sectionId === 'home' ? '' : sectionId);
          }
        }
      });
    }, observerOptions);

    // Observar todas las secciones que existan
    this.navigationItems.forEach(item => {
      const element = document.getElementById(item.sectionId);
      if (element) {
        this.intersectionObserver?.observe(element);
      }
    });

    // También observar si existe una sección home específica
    const homeElement = document.getElementById('home');
    if (homeElement) {
      this.intersectionObserver.observe(homeElement);
    }
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
      event.preventDefault();
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
    }, 0);
  }

  public closeNavigationOnMobile(): void {
    if (this.isMobile && this.isNavigationActive) {
      
      this.isNavigationActive = false;
    }
  }

  // ========== HOST LISTENERS ==========
  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isScrolled = scrollTop > 50;
  }

  @HostListener('window:resize', [])
  public onWindowResize(): void {
    const wasMobile = this.isMobile;
    this.checkScreenSize();
    
    // Si cambió de móvil a desktop, cerrar el menú móvil
    if (wasMobile && !this.isMobile) {
      this.isNavigationActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    if (!this.isMobile || !this.isNavigationActive) {
      return;
    }

    const target = event.target as HTMLElement;
    const navigation = document.querySelector('.navigation') as HTMLElement;
    const navToggle = document.querySelector('.nav-toggle') as HTMLElement;
    
    // Cerrar si se hace clic fuera del menú y del toggle
    if (navigation && navToggle && 
        !navigation.contains(target) && 
        !navToggle.contains(target)) {
      this.isNavigationActive = false;
    }
  }

  @HostListener('window:hashchange', [])
  public onHashChange(): void {
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.activeSection = hash;
      this.scrollToSection(hash);
    } else {
      this.activeSection = 'home';
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    // Cerrar menú con Escape
    if (event.key === 'Escape' && this.isMobile && this.isNavigationActive) {
      this.isNavigationActive = false;
    }
  }

  // ========== CLEANUP ==========
  private cleanup(): void {
    // Limpiar ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Limpiar IntersectionObserver
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}