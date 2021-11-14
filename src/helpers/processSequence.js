import {
    compose,
    allPass,
    ifElse,
    tap,
    prop,
    andThen,
    otherwise,
    test,
    mathMod,
    length,
    flip,
    partial,
} from 'ramda'

/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import Api from '../tools/api'
const api = new Api()

const isGte2Lte10 = test(/^.{3,9}$/)
const isFloat = test(/^[0-9]+\.?[0-9]*$/)
const isValid = allPass([ isFloat, isGte2Lte10 ])
const square = number => number ** 2
const parseNumber = compose(Math.round, parseFloat);

const fetchBinary = compose(
    andThen(prop('result')),
    api.get('https://api.tech/numbers/base'),
    number => ({ from: 10, to: 2, number })
)

const fetchAnimal = compose(
    andThen(prop('result')),
    animalId => api.get(`https://animals.tech/${animalId}`)({})
)

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => compose(
    ifElse(
        isValid, // 2. Строка валидируется: 10 > length > 2 и это число
        compose(
            otherwise(handleError),
            andThen(handleSuccess), // 9. Завершить цепочку вызовом handleSuccess в который в качестве аргумента положить результат полученный на предыдущем шаге
            andThen(fetchAnimal), // 8. C помощью API /animals.tech/{id} получить случайное животное используя полученный остаток в качестве id
            andThen(compose(
                tap(writeLog),
                flip(mathMod)(3), // 7. Взять остаток от деления на 3 ✏️
                tap(writeLog),
                square, // 6. Возвести в квадрат с помощью Javascript ✏️
                tap(writeLog),
                length, // 5. Взять кол-во символов в полученном от API числе ✏️
                tap(writeLog),
            )),
            fetchBinary, // 4. C помощью API /numbers/base перевести из 10-й системы счисления в двоичную ✏️
            tap(writeLog),
            parseNumber, // 3. Привести строку к числу, округлить к ближайшему целому ✏️
        ),
        partial(handleError, [ 'ValidationError' ]), // 💥2. В случае ошибки валидации вызвать handleError с 'ValidationError' строкой в качестве аргумента
    ),
    tap(writeLog), // 1. Берем строку N. Пишем изначальную строку в writeLog.
)(value)

export default processSequence

