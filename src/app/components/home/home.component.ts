import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from '../users-table/users-table.component';
import { User } from '../../interfaces/user.interface';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  // Creamos una lista vacía para guardar los usuarios que vamos a traer de la API
  users: User[]=[];

  // Configuramos el constructor para poder hacer peticiones HTTP a la API
  constructor(private httpClient: HttpClient) {}

  /**
   * Este método se ejecuta automaticamente cuando el componente se carga
   * trae la lista de usuarios desde la API externa y los guarda. */
  ngOnInit() {
    // Hacemos la solicitud GET a la API para obtener los usuarios
    this.httpClient.get('https://jsonplaceholder.typicode.com/users')
    .pipe(
      // Si algo falla, capturamos el error y lo mostramos en la consola.
      catchError(error => {
        console.error('Error al consumir la API:', error);
        return throwError(() => new Error('Error al obtener los datos'));
      })
    )
      // Cuando la respuesta llega, guardamos los usuarios en la lista
      .subscribe((result) => {
        this.users = result as any[];
      })
  }
}

