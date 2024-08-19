function initState() {
    return {
        newReservationCount: parseInt(localStorage.getItem('newReservationCount')) || 0,
    }
}

const reservation = {
    namespaced: true,
    state: initState,
    mutations: {
        // 남은 개수 증가
        increment_reservation_count(state) {
            state.newReservationCount += 1; // 예약이 들어오면 개수 증가
            localStorage.setItem('newReservationCount', state.newReservationCount);
        },
        // 들어온 객실예약 조회하면 > 개수 -1되도록
        async decrement_reservation_count(state) {
            if (state.newReservationCount > 0) {
                state.newReservationCount -= 1;
                console.log('감소: ', state.newReservationCount);
            } else {
                state.newReservationCount = 0;
            }
            localStorage.setItem('newReservationCount', state.newReservationCount); 
        }

    },
    actions: {
        incrementReservationCount({commit}) {
            commit('increment_reservation_count');
        },
        decrementReservationCount({commit}) {
            commit('decrement_reservation_count');
        }
    },
    getters: {
        newReservationCount: (state) => state.newReservationCount
    }
};

export default reservation;