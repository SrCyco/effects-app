import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuariosSuccess } from '../actions/usuarios.actions';
import { cargarUsuario } from '../actions/usuario.actions';

@Injectable()
export class UsuarioEfects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            mergeMap((action) => this.usuarioService.getUserById(action.id).pipe(
                map(usuario => usuariosActions.cargarUsuarioSuccess({usuario})),
                catchError( err => of(usuariosActions.cargarUsuarioError({payload: err})))
            ))
        )
    );

}
