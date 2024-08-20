function initState() {
    return {
        newDiningReservationCount: parseInt(localStorage.getItem('newDiningReservationCount')) || 0,
    }
}

const diningReservation = {
    namespaced: true,
    state: initState,
    mutations: {
        // 남은 개수 증가
        increment_diningReservation_count(state) {
            state.newDiningReservationCount += 1; // 예약이 들어오면 개수 증가
            localStorage.setItem('newDiningReservationCount', state.newDiningReservationCount);
        },
        // 들어온 객실예약 조회하면 > 개수 -1되도록
        async decrement_diningReservation_count(state) {
            if (state.newDiningReservationCount > 0) {
                state.newDiningReservationCount -= 1;
                console.log('감소: ', state.newDiningReservationCount);
            } else {
                state.newDiningReservationCount = 0;
            }
            localStorage.setItem('newDiningReservationCount', state.newDiningReservationCount); 
        }

    },
    actions: {
        incrementDiningReservationCount({commit}) {
            commit('increment_diningReservation_count');
        },
        decrementDiningReservationCount({commit}) {
            commit('decrement_diningReservation_count');
        }
    },
    getters: {
        newDiningReservationCount: (state) => state.newDiningReservationCount
    }
}

export default diningReservation;