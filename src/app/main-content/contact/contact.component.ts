import { Component, ElementRef, ViewChild, booleanAttribute } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatSlideToggleModule, MatCheckboxModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  img: any;
  url(arg0: number): any {
    throw new Error('Method not implemented.');
  }

  @ViewChild('contactForm') contactForm!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('message') message!: ElementRef;
  @ViewChild('checkbox') checkbox!: ElementRef;
  @ViewChild('button') button!: ElementRef;

  nameValue: boolean = false;
  nameClicked: boolean = false;
  emailValue: boolean = false;
  emailClicked: boolean = false;
  messageValue: boolean = false;
  messageClicked: boolean = false;
  checkboxActive: boolean = false;
  checkboxClicked: boolean = false;

  dialogOpen: boolean = false;
  sendingMail: boolean = false;
  mailSuccess: boolean = false;
  mailError: boolean = false;

  checkNameEmpty() {
    if (this.name.nativeElement.value) {
      this.nameValue = true;
      this.name.nativeElement.classList.remove('border');
      this.name.nativeElement.style.border = '1px solid #70E61C';
    } else {
      this.nameValue = false;
      this.name.nativeElement.classList.remove('border');
      this.name.nativeElement.style.border = '1px solid #E61C40';
    }
  }

  checkEmailEmpty() {
    if (this.email.nativeElement.value && this.validateEmail(this.email.nativeElement.value)) {
      this.emailValue = true;
      this.email.nativeElement.classList.remove('border');
      this.email.nativeElement.style.border = '1px solid #70E61C';
    } else {
      this.emailValue = false;
      this.email.nativeElement.classList.remove('border');
      this.email.nativeElement.style.border = '1px solid #E61C40';
    }
  }

  checkMessageEmpty() {
    if (this.message.nativeElement.value) {
      this.messageValue = true;
      this.message.nativeElement.classList.remove('border');
      this.message.nativeElement.style.border = '1px solid #70E61C';
    } else {
      this.messageValue = false;
      this.message.nativeElement.classList.remove('border');
      this.message.nativeElement.style.border = '1px solid #E61C40';
    }
  }

activateCheckbox() {
  const isChecked = this.checkbox.nativeElement.checked;

  if (isChecked) {
    this.checkboxActive = true;
    this.checkbox.nativeElement.style.border = '';
  } else {
    this.checkboxActive = false;
    if (this.checkboxClicked) {
      this.checkbox.nativeElement.classList.remove('border');
      this.checkbox.nativeElement.style.border = '1px solid #E61C40'; 
    }
  }
}


  validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

async sendMail() {
    this.disableInput();
    this.openDialog();

    try {
        const formData = {
            name: this.name.nativeElement.value,
            email: this.email.nativeElement.value,
            message: this.message.nativeElement.value
        };

        const response = await fetch('http://localhost:3000/send_mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        this.sendingMail = false;

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        this.mailSuccess = true;
        console.log('Nachricht erfolgreich gesendet');
    } catch (error) {
        this.sendingMail = false;
        this.mailError = true;
        console.error('Fehler beim Senden der Nachricht:', error);
    } finally {
        setTimeout(() => {
            this.enableInput();
            this.clearInput();
            this.dialogOpen = false;
        }, 5000);
    }
}


  disableInput() {
    this.name.nativeElement.disabled = true;
    this.email.nativeElement.disabled = true;
    this.message.nativeElement.disabled = true;
    this.checkbox.nativeElement.disabled = true;
    this.button.nativeElement.disabled = true;
  }

  enableInput() {
    this.name.nativeElement.disabled = false;
    this.email.nativeElement.disabled = false;
    this.message.nativeElement.disabled = false;
    this.checkbox.nativeElement.disabled = false;
    this.button.nativeElement.disabled = false;
  }

  clearInput() {
    this.resetInput();
    this.resetInputStyle();
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.message.nativeElement.value = '';
    this.checkbox.nativeElement.checked = false;
  }

  resetInput() {
    this.nameValue = false;
    this.nameClicked = false;
    this.emailValue = false;
    this.emailClicked = false;
    this.messageValue = false;
    this.messageClicked = false;
    this.checkboxActive = false;
    this.checkboxClicked = false;
  }

  resetInputStyle() {
    this.name.nativeElement.style.border = '';
    this.email.nativeElement.style.border = '';
    this.message.nativeElement.style.border = '';
    this.checkbox.nativeElement.style.border = '';
    this.name.nativeElement.classList.add('border');
    this.email.nativeElement.classList.add('border');
    this.message.nativeElement.classList.add('border');
    this.checkbox.nativeElement.classList.add('border');
  }

  openDialog() {
    this.dialogOpen = true;
    this.sendingMail = true;

    setTimeout(() => {
      this.dialogOpen = false;
      this.mailSuccess = false;
      this.mailError = false;
    }, 10000);
  }
}
