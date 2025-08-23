import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from "./components/about/about.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { FaqComponent } from "./components/faq/faq.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";
import { WhatsappButtonComponent } from './components/whatsappButton/whatsappButton.component';

// Importaciones de GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que tu componente sea standalone si así lo tienes
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutComponent,
    GalleryComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'landing_tatto';

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Registramos el plugin de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Llamamos a la función que inicializa las animaciones
    this.initScrollAnimations();
  }

  private initScrollAnimations(): void {
    // Seleccionamos todos los elementos con la clase que agregamos en el HTML
    const sections = this.elementRef.nativeElement.querySelectorAll('.animated-section');

    sections.forEach((section: HTMLElement) => {
      // Creamos una animación para cada sección
      gsap.from(section, {
        // La animación se activa con el scroll
        scrollTrigger: {
          trigger: section, // El elemento que dispara la animación
          start: 'top 80%', // La animación empieza cuando el 80% del elemento es visible
          end: 'bottom 20%',
          toggleActions: 'play none none reset', // La animación se reproduce una sola vez
        },
        // Propiedades de la animación
        opacity: 0,       // Empieza invisible
        y: 50,            // Empieza 50px más abajo de su posición final
        duration: 0.8,    // Dura 0.8 segundos
        ease: 'power3.out', // Efecto de desaceleración suave
      });
    });
  }
}