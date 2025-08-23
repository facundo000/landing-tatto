import { Component, AfterViewInit, ElementRef } from '@angular/core';

// Importaciones de GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Es una buena práctica registrar el plugin al inicio
    gsap.registerPlugin(ScrollTrigger);
    this.initScrollAnimation();
  }

  private initScrollAnimation(): void {
    const componentElement = this.elementRef.nativeElement;

    // Creamos una línea de tiempo (timeline) para controlar la secuencia de animaciones
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: componentElement, // El disparador es el componente completo
        start: 'top 70%',         // La animación empieza cuando el 70% del componente es visible
        toggleActions: 'play none none none' // Se reproduce una sola vez
      }
    });

    // Añadimos las animaciones a la línea de tiempo en el orden que queramos
    tl
      .from(componentElement.querySelector('.about-image'), { 
        opacity: 0, 
        x: -50, // Aparece desde la izquierda
        duration: 0.8, 
        ease: 'power3.out' 
      })
      .from(componentElement.querySelector('.about-subtitle'), { 
        opacity: 0, 
        y: 20, 
        duration: 0.6, 
        ease: 'power2.out' 
      }, '-=0.5') // El '-=0.5' hace que esta animación empiece 0.5s antes de que la anterior termine
      .from(componentElement.querySelectorAll('.about-description'), { 
        opacity: 0, 
        y: 20, 
        duration: 0.6, 
        stagger: 0.2, // Anima cada párrafo con 0.2s de diferencia
        ease: 'power2.out' 
      }, '-=0.4')
      .from(componentElement.querySelector('.about-social'), { 
        opacity: 0, 
        y: 20, 
        duration: 0.5 
      }, '-=0.3');
  }
}