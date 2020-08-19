import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[];
  loading: boolean;
  error: any;

  constructor(
    // private usuarioService: UsuarioService
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe(
    //   users => {
    //     this.usuarios = users;
    //   }
    // );
    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(cargarUsuarios());
  }

}
