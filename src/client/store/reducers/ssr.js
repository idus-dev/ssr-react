export default function todos(state = false, action) {
    switch (action.type) {
        case 'HYDRATED':
            return false;
        default:
            return state;
    }
}
