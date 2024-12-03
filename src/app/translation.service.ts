import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};
  private currentLang = new BehaviorSubject<string>(this.getInitialLanguage()); // Standardsprache

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang.value); // Lade die gespeicherte oder Standard-Sprache
  }

  // Sprache wechseln und im localStorage speichern
  setLanguage(lang: string): void {
    if (this.currentLang.value !== lang) {
      this.loadTranslations(lang); // Lade die Übersetzungen
      this.currentLang.next(lang); // Aktualisiere die aktuelle Sprache
      localStorage.setItem('language', lang); // Speichere die Sprache
    }
  }

  // Übersetzungen aus der JSON-Datei laden
  private loadTranslations(lang: string): void {
    const path = `assets/i18n/${lang}.json`;
    this.http.get(path).subscribe({
      next: (translations) => (this.translations = translations),
      error: (err) => console.error(`Error loading ${lang} translations:`, err),
    });
  }

  // Sprache aus dem localStorage lesen oder Standard setzen
  private getInitialLanguage(): string {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'en'; // 'en' als Standard, falls nichts gespeichert ist
  }

  // Übersetzungswert für einen Schlüssel holen
  translate(key: string): string {
    return key.split('.').reduce((acc, part) => acc && acc[part], this.translations) || key;
  }

  // Aktuelle Sprache abonnierbar machen
  get currentLanguage() {
    return this.currentLang.asObservable();
  }

  // Direktzugriff auf die aktuelle Sprache
  getCurrentLang(): string {
    return this.currentLang.value;
  }
}
