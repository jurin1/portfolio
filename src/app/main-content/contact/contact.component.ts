import { Component, ElementRef, ViewChild, booleanAttribute } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatSlideToggleModule, MatCheckboxModule, NgStyle, NgIf, FormsModule, ReactiveFormsModule],
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
  mailSend: boolean = false;

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
    if (this.checkbox.nativeElement.checked) {
      this.checkboxActive = true;
    } else if (!this.checkbox.nativeElement.checked && this.checkboxClicked) {
      this.checkboxActive = false;
      this.checkbox.nativeElement.classList.remove('border');
      this.checkbox.nativeElement.style.border = '1px solid #E61C40';
    } else {
      this.checkboxActive = false;
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

    let formData = new FormData();
    formData.append('name', this.name.nativeElement.value);
    formData.append('email', this.email.nativeElement.value);
    formData.append('message', this.message.nativeElement.value);
    await fetch('https://nigen.de/send_mail.php', {
      method: 'POST',
      body: formData
    })

    setTimeout(() => {
      this.enableInput();
      this.clearInput();
    }, 5000);
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
      this.sendingMail = false;
      this.mailSend = true;
    }, 1000);
    setTimeout(() => {
      this.dialogOpen = false;
      this.mailSend = false;
    }, 5000);
  }
}
