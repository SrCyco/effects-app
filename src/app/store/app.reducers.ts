import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import { UsuariosState } from './reducers/usuarios.reducer';


export interface AppState {
   usuarios: reducers.UsuariosState;
   usuario: reducers.UsuarioState;
}



export const appReducers: ActionReducerMap<AppState> = {
   usuarios: reducers.usuariosReducer,
   usuario: reducers.usuarioReducer
};
