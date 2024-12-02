import { configureStore } from "@reduxjs/toolkit";
import reduxUsuarios from "./redux.usuario";
import reduxChats from './redux.batepapo';

const store = configureStore({
    reducer: {
        usuarios: reduxUsuarios,
        chats: reduxChats
    }
});

export default store;
