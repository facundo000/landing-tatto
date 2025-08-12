import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    { id: 1, src: '', alt: 'Placeholder 1' },
    { 
      id: 2, 
      src: 'https://images.unsplash.com/photo-1590246814883-57c511aa4f68?w=500&h=500&fit=crop', 
      alt: 'Tatuaje japonés - Proceso' 
    },
    { 
      id: 3, 
      src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=500&h=500&fit=crop', 
      alt: 'Tatuaje japonés - Espalda completa' 
    },
    { 
      id: 4, 
      src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop', 
      alt: 'Tatuaje japonés - Brazo minimalista' 
    },
    { id: 5, src: '', alt: 'Placeholder 2' },
    { id: 6, src: '', alt: 'Placeholder 3' }
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
