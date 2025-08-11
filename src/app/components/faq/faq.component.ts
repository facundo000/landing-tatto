import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent { 
  
  // Signals para el estado reactivo
  private readonly _faqs = signal<FaqItem[]>([
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
    },
    {
      id: 4,
      question: '¿Qué estilos de tatuaje oriental ofrecen?',
      answer: 'Ofrecemos una amplia variedad de estilos orientales: Irezumi (tatuaje japonés tradicional), Neo-Japanese (versión moderna), Chinoiserie (estilo chino), y fusiones contemporáneas. Cada estilo tiene sus características únicas en términos de composición, color y simbolismo.',
      isOpen: false
    },
    {
      id: 5,
      question: '¿Cuánto tiempo dura una sesión de tatuaje?',
      answer: 'La duración de una sesión varía según el tamaño y complejidad del diseño. Las sesiones pequeñas pueden durar 2-3 horas, mientras que piezas grandes pueden requerir sesiones de 4-6 horas. Para tatuajes extensos, dividimos el trabajo en múltiples sesiones para tu comodidad.',
      isOpen: false
    }
  ]);

  // Computed signal para obtener los FAQs
  readonly faqs = this._faqs.asReadonly();

  toggleFaq(id: number): void {
  const faqs = this._faqs();
  const index = faqs.findIndex(f => f.id === id);
  const faq = faqs[index];
  const isOpening = !faq.isOpen;

  // actualizar el estado IsOpen en el array
  this._faqs.update(arr => arr.map(f =>
    f.id === id ? { ...f, isOpen: isOpening } : f
  ));

  // animación de altura
  requestAnimationFrame(() => {
    const el = document.getElementById(`faq-answer-${id}`);
    if (!el) return;

    if (isOpening) {
      const fullHeight = el.scrollHeight;
      el.style.height = '0px';
      requestAnimationFrame(() => {
        el.style.height = fullHeight + 'px';
      });
    } else {
      const currHeight = el.scrollHeight;
      el.style.height = currHeight + 'px';
      requestAnimationFrame(() => {
        el.style.height = '0px';
      });
    }

    // luego de la animación, limpiar el estilo inline
    el.addEventListener('transitionend', () => {
      if (isOpening) {
        el.style.height = 'auto';
      } else {
        el.style.height = '';
      }
    }, { once: true });
  });
}

  // Método helper para verificar si un FAQ está abierto
  isFaqOpen(faq: FaqItem): boolean {
    return faq.isOpen;
  }

  // Método helper para obtener el ID del answer
  getAnswerId(faq: FaqItem): string {
    return `faq-answer-${faq.id}`;
  }
}
