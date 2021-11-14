import {
    compose,
    allPass,
    anyPass,
    lte,
    not,
    filter,
    values,
    prop,
    equals,
    length,
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

const count = (colorFn) => compose(length, filter(colorFn), values)

export const validateFieldN1 = allPass([
    compose(red, star),
    compose(green, square),
    compose(white, triangle),
    compose(white, circle),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 =
    compose(lte(2), count(green))

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => equals(count(red)(figures), count(blue)(figures))

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    compose(blue, circle),
    compose(red, star),
    compose(orange, square),
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    compose(lte(3), count(red)),
    compose(lte(3), count(green)),
    compose(lte(3), count(blue)),
    compose(lte(3), count(orange)),
])
    

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    compose(green, triangle),
    compose(lte(2), count(green)),
    compose(equals(1), count(red)),
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    equals(4),
    count(orange),
)

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([
    compose(not, white, star),
    compose(not, red, star)
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    equals(4),
    count(green),
)

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
    (figures) => equals(square(figures), triangle(figures)),
    compose(not, white, triangle),
])