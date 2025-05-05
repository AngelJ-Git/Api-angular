import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: './users-table.component.html',
})

export class UserTableComponent {
  // Recibimos la lista de usuarios desde el componente padre
  @Input() users: User[]=[];
  //Creamos una variable para guardar el texto de busqueda que el usuario ingresa
  filter: string = '';

  /**
   * Filtramos los usuarios en tiempo real según lo que el usuario escriba en el input
   * y si el nombre o la ciudad del usuario incluyen el texto ingresado, se mostrará en la tabla. */
  get filteredUsers() {
    return this.users.filter(user =>
      // Filtra por nombre
      user.name.toLowerCase().includes(this.filter.toLowerCase()) ||
      // Filtra por ciudad
      user.address?.city.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}

