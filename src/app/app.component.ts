import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from "./components/about/about.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { FaqComponent } from "./components/faq/faq.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";
import { WhatsappButtonComponent } from './components/whatsappButton/whatsappButton.component';

@Component({
  selector: 'app-root',
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
export class AppComponent {
  title = 'landing_tatto';
}
