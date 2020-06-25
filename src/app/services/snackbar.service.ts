import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  // Para mostrar un aviso de cual fue el error en el llenado de formulario
  openSnackBar(params: string, action: string) {
    const snackBarRef = this.snackBar.open(params, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      // console.log('The snackbar was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      // console.log('The snackbar action was triggered');
    });
  }
}
