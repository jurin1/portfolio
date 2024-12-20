import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  sanitizedCheckboxText: SafeHtml;
  form: FormGroup;
  showPopup = false;
  popupType = "success";

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.sanitizedCheckboxText = this.sanitizer.bypassSecurityTrustHtml('I accept the <a href="/terms" target="_blank">terms and conditions</a>');
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    },
      { updateOn: 'change' })
  }


  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get subject() {
    return this.form.get('subject');
  }

  get message() {
    return this.form.get('message');
  }

  get terms() {
  return this.form.get('terms');
}



  async onSubmit() {
    try {
      const formData = this.form.value;
      const response = await fetch('http://localhost:3000/send_mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.popupType = 'success';
        this.showPopup = true;
        this.form.reset();
        setTimeout(() => {
          this.showPopup = false;
        }, 5000);
      } else {
        this.popupType = 'error';
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 5000);
      }
    } catch (error) {
      this.popupType = 'error';
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 5000);
    }
  }
}