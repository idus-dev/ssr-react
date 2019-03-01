import { COUNTER_DECREMENT, COUNTER_INCREMENT } from './types';

export const increment = () => ({
    type: COUNTER_INCREMENT
});

export const decrement = () => ({
    type: COUNTER_DECREMENT
});