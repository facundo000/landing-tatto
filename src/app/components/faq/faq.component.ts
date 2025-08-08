import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [ CommonModule, AccordionModule ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent { 
  constructor(private cdr: ChangeDetectorRef) {}
  
  faqs: FaqItem[] = [
    {
      id: 1,
      question: '¿Cuál es el proceso para agendar una cita?',
      answer: 'Para agendar una cita, puedes contactarnos a través de nuestras redes sociales, llamar directamente al estudio o enviar un mensaje por WhatsApp. Te pediremos detalles sobre el diseño que deseas, el tamaño aproximado y la ubicación en tu cuerpo. Luego coordinaremos una fecha y hora que funcione para ambos.',
      isOpen: false
    },
    {
      id: 2,
      question: '¿Cuánto cuesta un tatuaje de estilo oriental?',
      answer: 'El costo de un tatuaje de estilo oriental varía según varios factores: el tamaño del diseño, la complejidad de los detalles, la ubicación en el cuerpo y el tiempo estimado para completarlo. Los tatuajes japoneses tradicionales suelen requerir múltiples sesiones. Te proporcionaremos un presupuesto detallado después de la consulta inicial.',
      isOpen: false
    },
    {
      id: 3,
      question: '¿Cómo debo cuidar mi tatuaje de estilo japonés?',
      answer: 'El cuidado de un tatuaje japonés es crucial para su correcta cicatrización y conservación de colores. Durante las primeras 2-3 semanas: mantén la zona limpia y seca, aplica pomada cicatrizante según las indicaciones, evita exposición directa al sol, no sumerjas el tatuaje en agua (piscinas, mar), usa ropa holgada y no rasques ni retires las costras. Te daremos instrucciones detalladas post-tatuaje.',
      isOpen: false
    }
  ];

  toggleFaq(id: number): void {
    // Usar requestAnimationFrame para optimizar el rendimiento
    requestAnimationFrame(() => {
      const faq = this.faqs.find(item => item.id === id);
      if (faq) {
        faq.isOpen = !faq.isOpen;
        this.cdr.markForCheck();
      }
    });
  }
}
