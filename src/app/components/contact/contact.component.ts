import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm;
  enviado = false;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comentario: ['', [Validators.required]],
      condicion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      this.enviado = true;
      setTimeout(() => {
        this.enviado = false;
        this.snackBarService.openSnackBar('Formulario enviado', 'Aceptar');
      }, 5000);

      console.log(this.contactForm.value);
    } else {
      if (this.contactForm.get('name').hasError('required')) {
        this.snackBarService.openSnackBar('Porfavor ingresa el nombre', 'Aceptar');
      } else if (this.contactForm.get('email').hasError('required')) {
        this.snackBarService.openSnackBar('Porfavor ingresa una dirección de correo válida', 'Aceptar');
      } else if (this.contactForm.get('comentario').hasError('required')) {
        this.snackBarService.openSnackBar('Porfavor ingresa el comentario', 'Aceptar');
      } else if (this.contactForm.get('condicion').hasError('required')) {
        this.snackBarService.openSnackBar('Porfavor acepta la condición', 'Aceptar');
      }
    }
  }

}
