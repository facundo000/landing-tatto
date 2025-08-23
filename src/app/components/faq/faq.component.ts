import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {
  readonly openItemIndex = signal<number | null>(null);
 
  readonly faqItems = [
    
    {
      question: '¿Cuál es el proceso para agendar una cita?',
      answer: 'Para agendar una cita, puedes contactarnos a través de nuestras redes sociales, llamar directamente al estudio o enviar un mensaje por WhatsApp. Te pediremos detalles sobre el diseño que deseas, el tamaño aproximado y la ubicación en tu cuerpo. Luego coordinaremos una fecha y hora que funcione para ambos.',
      isOpen: false
    },
    {
      question: '¿Cuánto cuesta un tatuaje de estilo oriental?',
      answer: 'El costo de un tatuaje de estilo oriental varía según varios factores: el tamaño del diseño, la complejidad de los detalles, la ubicación en el cuerpo y el tiempo estimado para completarlo. Los tatuajes japoneses tradicionales suelen requerir múltiples sesiones. Te proporcionaremos un presupuesto detallado después de la consulta inicial.',
    },
    {
      question: '¿Cómo debo cuidar mi tatuaje de estilo japonés?',
      answer: 'El cuidado de un tatuaje japonés es crucial para su correcta cicatrización y conservación de colores. Durante las primeras 2-3 semanas: mantén la zona limpia y seca, aplica pomada cicatrizante según las indicaciones, evita exposición directa al sol, no sumerjas el tatuaje en agua (piscinas, mar), usa ropa holgada y no rasques ni retires las costras. Te daremos instrucciones detalladas post-tatuaje.',
    },
    {
      question: '¿Qué estilos de tatuaje oriental ofrecen?',
      answer: 'Ofrecemos una amplia variedad de estilos orientales: Irezumi (tatuaje japonés tradicional), Neo-Japanese (versión moderna), Chinoiserie (estilo chino), y fusiones contemporáneas. Cada estilo tiene sus características únicas en términos de composición, color y simbolismo.',
    },
    {
      question: '¿Cuánto tiempo dura una sesión de tatuaje?',
      answer: 'La duración de una sesión varía según el tamaño y complejidad del diseño. Las sesiones pequeñas pueden durar 2-3 horas, mientras que piezas grandes pueden requerir sesiones de 4-6 horas. Para tatuajes extensos, dividimos el trabajo en múltiples sesiones para tu comodidad.',
    }
  ];

  /**
   * Cambia la visibilidad de un ítem del acordeón.
   * Si el ítem clickeado ya está abierto, lo cierra.
   * Si otro ítem está abierto, lo cierra y abre el nuevo.
   * @param index El índice del ítem clickeado.
   */
  toggleItem(index: number): void {
    this.openItemIndex.update(currentIndex => (currentIndex === index ? null : index));
  }
}
