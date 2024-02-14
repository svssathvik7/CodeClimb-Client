import s1 from '../Assets/Snake6.png';
import s2 from '../Assets/Snake7.png';
import s3 from '../Assets/Snake2.png';
import s4 from '../Assets/Snake5.png';
const snakes = {
    99: {
        snakeId: "sn1",
        start: 99,
        end: 4,
        difficulty: "hard",
        snake: s3,
        questionId: "#"
    },
    97: {
        snakeId: "sn2",
        start: 97,
        end: 73,
        difficulty: "medium",
        snake: s2,
        questionId: "#"
    },
    75: {
        snakeId: "sn3",
        start: 75,
        end: 10,
        difficulty: "hard",
        snake: s3,
        questionId: "#"
    },
    59: {
        snakeId: "sn4",
        start: 59,
        end: 8,
        difficulty: "medium",
        snake: s2,
        questionId: "#"
    },
    55: {
        snakeId: "sn5",
        start: 55,
        end: 33,
        difficulty: "easy",
        snake: s1,
        questionId: "#"
    },
    47: {
        snakeId: "sn6",
        start: 47,
        end: 25,
        difficulty: "easy",
        snake: s1,
        questionId: "#"
    },
    43: {
        snakeId: "sn7",
        start: 43,
        end: 21,
        difficulty: "easy",
        snake: s1,
        questionId: "#"
    },
    26: {
        snakeId: "sn8",
        start: 26,
        end: 3,
        difficulty: "easy",
        snake: s4,
        questionId: "#"
    },
    17: {
        snakeId: "sn9",
        start: 17,
        end: 6,
        difficulty: "easy",
        snake: s1,
        questionId: "#"
    },
};
const ladders = {
    74: {
        ladderId: "ld1",
        start: 74,
        end: 94,
        difficulty: "medium",
        questionId: "#"
    },
    65: {
        ladderId: "ld2",
        start: 65,
        end: 90,
        difficulty: "medium",
        questionId: "#"
    },
    63: {
        ladderId: "ld3",
        start: 63,
        end: 83,
        difficulty: "medium",
        questionId: "#"
    },
    52: {
        ladderId: "ld4",
        start: 52,
        end: 72,
        difficulty: "medium",
        questionId: "#"
    },
    41: {
        ladderId: "ld5",
        start: 41,
        end: 61,
        difficulty: "easy",
        questionId: "#"
    },
    30: {
        ladderId: "ld6",
        start: 30,
        end: 50,
        difficulty: "easy",
        questionId: "#"
    },
    19: {
        ladderId: "ld7",
        start: 19,
        end: 39,
        difficulty: "medium",
        questionId: "#"
    },
    16: {
        ladderId: "ld8",
        start: 16,
        end: 28,
        difficulty: "easy",
        questionId: "#"
    },
}
export { snakes, ladders };