import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  emailForm = this.fb.group({
    name: [''],
    email: [''],
    message: [''],
    phone: [''],
    subject: [''],
  });
  error: string = '';
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}
  ngOnInit(): void {}

  sendEmail(
    name: String,
    subject: string,
    phone: string,
    email: String,
    message: String
  ) {
    //Set the url with your secretKey from formspree.io
    let url = 'https://formspree.io/f/xpzvwjbe';

    //Set Headers
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    console.log(name.length + subject + phone + email + message);

    if (
      name != undefined &&
      subject != undefined &&
      phone != undefined &&
      email != undefined &&
      message != undefined &&
      name.length != 0 &&
      subject.length != 0 &&
      phone.length != 0 &&
      email.length != 0 &&
      message.length != 0
    ) {
      let data = `name=${name}&subject=${subject}&phone=${phone}&email=${email}&message=${message}`;
      let errorMessage: string = '';

      this.httpClient.post<any>(url, data, httpOptions).subscribe({
        next: (data) => {
          console.log('email sent' + JSON.stringify(data));
          document.getElementById('modalLink')?.click();
        },
        error: (error) => {
          errorMessage = error.message;
          console.log('error!', errorMessage);
          this.error =
            'Mesajınız gönderilemedi. Lütfen bilgilerinizi doğru ve eksiksiz giriniz.';
        },
      });
    } else {
      this.error =
        'Mesajınız gönderilemedi. Lütfen bilgilerinizi doğru ve eksiksiz giriniz.';
    }
  }
}
