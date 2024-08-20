import { createStore } from "vuex";
import reservation from "./reservation";
import diningReservation from "./diningReservation";
const store = createStore({
    modules: {
        reservation,
        diningReservation
    }
})

export default store;