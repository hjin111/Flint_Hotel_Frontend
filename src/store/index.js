import { createStore } from "vuex";
import reservation from "./reservation";

const store = createStore({
    modules: {
        reservation
    }
})

export default store;