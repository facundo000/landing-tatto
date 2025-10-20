import { Component, OnInit, OnDestroy  } from '@angular/core';

interface TattooImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

@Component({
  selector: 'app-gallery',
  imports: [ ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit, OnDestroy { 
  
  images: TattooImage[] = [
    { id: 1, src: 'assets/images/tatto-brazo.webp', alt: 'Tatuaje en blanco y negro del Tío Gilito (Rico McPato) en el hombro, con sombrero, un puro, dados y un gran símbolo de anarquía.' },
    { 
      id: 2, 
      src: 'assets/images/tatto-gemelo.webp', 
      alt: 'Tatuaje en el gemelo (pantorrilla) de un casco espartano, centrado en una banda o brazalete con patrones geométricos.' 
    },
    { 
      id: 3, 
      src: 'assets/images/tatto-antebrazo-2.webp', 
      alt: 'Tatuaje del Ojo de la Providencia dentro de un triángulo, con un fondo rojo estilo acuarela y detalles de hojas en negro.' 
    },
    { 
      id: 4, 
      src: 'assets/images/tatto-cruz.webp', 
      alt: 'Tatuaje minimalista estilizada como una cruz, en tinta negra sólida en el antebrazo.' 
    },
    { id: 5, src: 'assets/images/tatto-mariposa.webp', alt: 'Tatuaje en el omóplato que combina una mariposa en blanco y negro con dos rosas a color rojo y pétalos sueltos.' },
    { id: 6, src: 'assets/images/tatto-antebrazo.webp', alt: 'Tatuaje de estilo japonés en proceso, mostrando las escamas de un pez koi y el delineado de nubes tradicionales.' }
  ];

  isFullscreenOpen = false;
  currentImageIndex = 0;

  ngOnInit() {
    // Escuchar teclas para navegación
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  openFullscreen(index: number) {
    // Solo abrir si la imagen tiene src
    if (this.images[index].src) {
      // Convertir el índice del grid al índice de imágenes válidas
      const validImages = this.getValidImages();
      const validIndex = validImages.findIndex(img => img.id === this.images[index].id);
      
      this.currentImageIndex = validIndex;
      this.isFullscreenOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeFullscreen() {
    this.isFullscreenOpen = false;
    document.body.style.overflow = 'auto';
  }

  nextImage() {
    const validImages = this.getValidImages();
    if (this.currentImageIndex < validImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  getCurrentImage(): TattooImage | undefined {
    const validImages = this.getValidImages();
    return validImages[this.currentImageIndex];
  }

  getValidImages(): TattooImage[] {
    return this.images.filter(img => img.src);
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.isFullscreenOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeFullscreen();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
