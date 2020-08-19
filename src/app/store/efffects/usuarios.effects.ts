import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuariosSuccess } from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEfects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(() => this.usuarioService.getUsers().pipe(
                map(usuarios => usuariosActions.cargarUsuariosSuccess({usuarios})),
                catchError( err => of(usuariosActions.cargarUsuariosError({payload: err})))
            ))
        )
    );

}
