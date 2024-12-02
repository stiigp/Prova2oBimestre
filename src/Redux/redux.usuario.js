import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../Services/usuarioService";
import ESTADO from "./redux.estado";

export const consultarUsuarios = createAsyncThunk('consultarUsuarios', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta.listaUsuarios)) {
            return {
                status: true,
                listaUsuarios: resposta.listaUsuarios
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem,
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
        };
    }
});
export const gravarUsuario = createAsyncThunk('gravarUsuario', async (usuario) => {
    try {
        const resposta = await gravar(usuario);
        if (resposta.status) {
            usuario.id = resposta.id;
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const deletarUsuario = createAsyncThunk('deletarUsuario', async (usuario) => {
    try {
        const resposta = await deletar(usuario);
        if (resposta.status) {
            window.alert(resposta.mensagem);
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            window.alert(resposta.mensagem);
            window.alert(usuario.senha);
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        window.alert(erro.mensagem);
        window.alert(usuario);
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resposta = await atualizar(usuario);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        ESTADO: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(consultarUsuarios.pending, (state) => {
                state.ESTADO = ESTADO.PENDENTE;
            })
            .addCase(consultarUsuarios.fulfilled, (state, action) => {
                state.ESTADO = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaUsuarios = action.payload.listaUsuarios;
            })
            .addCase(consultarUsuarios.rejected, (state, action) => {
                state.ESTADO = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(gravarUsuario.pending, (state) => {
                state.ESTADO = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.ESTADO = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                } else {
                    state.ESTADO = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarUsuario.rejected, (state, action) => {
                state.ESTADO = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(deletarUsuario.pending, (state) => {
                state.ESTADO = ESTADO.PENDENTE;
            })
            .addCase(deletarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.ESTADO = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.filter((usuario) => usuario.id !== action.payload.usuario.id);
                } else {
                    state.ESTADO = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarUsuario.rejected, (state, action) => {
                state.ESTADO = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(atualizarUsuario.pending, (state) => {
                state.ESTADO = ESTADO.PENDENTE;
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.ESTADO = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaUsuarios.findIndex((usuario) => usuario.id === action.payload.usuario.id);
                    if (indice !== -1) {
                        state.listaUsuarios[indice] = action.payload.usuario;
                    }
                } else {
                    state.ESTADO = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.ESTADO = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
        }
});

export const { zerarMensagem } = usuarioReducer.actions;
export default usuarioReducer.reducer;
