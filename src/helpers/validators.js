import {
    compose,
    allPass,
    anyPass,
    reduce,
    length,
    lte,
    not,
    find,
    filter,
    values,
    prop,
    equals,
    countBy,
    pick,
} from 'ramda'

/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */


const white = equals('white')
const red = equals('red')
const green = equals('green')
const orange = equals('orange')
const blue = equals('blue')

const star = prop('star')
const square = prop('square')
const triangle = prop('triangle')
const circle = prop('circle')

const count = (color) => compose(
    prop('true'),
    countBy(i => i === color),
    values,
)

export const validateFieldN1 = allPass([
    compose(red, star),
    compose(green, square),
    compose(white, triangle),
    compose(white, circle),
])


// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    lte(2),
    count('green'),
)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
    equals(0),
    reduce((r, i) => r += (i === 'red') - (i === 'blue'), 0),
    values,
)

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    compose(blue, circle),
    compose(red, star),
    compose(orange, square),
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    not,
    equals(undefined),
    find(i => i > 2),
    values,
    filter(i => i !== 'white'),
    countBy(i => i),
    values,
)

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    compose(green, triangle),
    count(2, 'green'),
    count(1, 'red')
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    equals(4),
    count('orange'),
)
// 8. Не красная и не белая звезда.
export const validateFieldN8 = compose(
    not,
    anyPass([
        compose(white, star),
        compose(red, star)
    ])
)

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    equals(4),
    count('green'),
)

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = compose(
    equals(1),
    length,
    values,
    countBy(i => i),
    values,
    pick([ 'triangle', 'square' ]),
)