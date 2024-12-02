import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../Services/batePapoService";
import ESTADO from "./redux.estado";

export const consultarChats = createAsyncThunk('consultarChats', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta.listaMensagens)) {
            return {
                status: true,
                listaChats: resposta.listaMensagens
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

export const gravarChat = createAsyncThunk('gravarChat', async (chat) => {
    try {
        const resposta = await gravar(chat);
        if (resposta.status) {
            chat.id = resposta.id;
            return {
                status: true,
                mensagem: resposta.mensagem,
                chat
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
export const deletarChat = createAsyncThunk('deletarChat', async (chat) => {
    try {
        const resposta = await deletar(chat);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                chat
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
export const atualizarChat = createAsyncThunk('atualizarChat', async (chat) => {
    try {
        const resposta = await atualizar(chat);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                chat
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

const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaChats: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(consultarChats.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarChats.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaChats = action.payload.listaChats;
            })
            .addCase(consultarChats.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(gravarChat.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarChat.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaChats.push(action.payload.chat);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarChat.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(deletarChat.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarChat.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaChats = state.listaChats.filter((chat) => chat.id !== action.payload.chat.id);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarChat.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(atualizarChat.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarChat.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaChats.findIndex((chat) => chat.id === action.payload.chat.id);
                    if (indice !== -1) {
                        state.listaChats[indice] = action.payload.chat;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarChat.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
        }
});

export const { zerarMensagem } = chatReducer.actions;
export default chatReducer.reducer;
