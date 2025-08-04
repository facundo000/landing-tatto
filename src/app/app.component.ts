import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from "./components/about/about.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { FaqComponent } from "./components/faq/faq.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutComponent,
    GalleryComponent,
    FaqComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landing_tatto';
}
