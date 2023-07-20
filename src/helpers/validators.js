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

import {
  prop,
  any,
  pipe,
  equals,
  dissoc,
  propEq,
  allPass,
  countBy,
  identity,
  values,
  complement
} from 'ramda';

// Получение свойств
const getStar = prop('star');
const getTriangle = prop('triangle');
const getSquare = prop('square');
const getCircle = prop('circle');
const getGreen = prop('green');

// Сравнения и условия
const greaterOrEqualTwo = x => x >= 2;
const greaterOrEqualThree = x => x >= 3;
const someGreaterOrEqualThree = any(greaterOrEqualThree);
const someValueGreaterOrEqualThree = pipe(values, someGreaterOrEqualThree);
const isRed = equals('red');
const isOrange = equals('orange');
const isGreen = equals('green');
const isBlue = equals('blue');
const isWhite = equals('white');
const twoGreens = propEq('green', 2);
const oneRed = propEq('red', 1);

// Простые композиции
const isWhiteCircle = pipe(getCircle, isWhite);
const isBlueCircle = pipe(getCircle, isBlue);
const isGreenSquare = pipe(getSquare, isGreen);
const isOrangeSquare = pipe(getSquare, isOrange);
const isWhiteSquare = pipe(getSquare, isWhite);
const isWhiteTriangle = pipe(getTriangle, isWhite);
const isGreenTriangle = pipe(getTriangle, isGreen);
const isRedStar = pipe(getStar, isRed);
const isWhiteStar = pipe(getStar, isWhite);

// Отрициния
const excludeWhite = dissoc('white');
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);
const isNotWhiteTriangle = complement(isWhiteTriangle);
const isNotWhiteSquare = complement(isWhiteSquare);

// Сложные наборы и условия
const conditionMatchingColors = pipe(values, countBy(identity));
const conditionMatchingColorsWhitoutWhite = pipe(conditionMatchingColors, excludeWhite);
const numberOfGreenFigures = pipe(conditionMatchingColors, getGreen);
const numberOfRedsEqualsBlues = ({ numberOfReds, numberOfBlues }) => numberOfReds === numberOfBlues;
const twoGreenFigures = pipe(conditionMatchingColors, twoGreens);
const singleRedFigure = pipe(conditionMatchingColors, oneRed);
const allHasSameColor = color => pipe(conditionMatchingColors, propEq(color, 4));
const numberOfSquaresEqualsTriangles = ({ numberOfSquares, numberOfTriangles }) => numberOfSquares === numberOfTriangles;

// 1. Красная звезда, зеленый квадрат – все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(numberOfGreenFigures, greaterOrEqualTwo);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = pipe(conditionMatchingColors, numberOfRedsEqualsBlues);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(conditionMatchingColorsWhitoutWhite, someValueGreaterOrEqualThree);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, twoGreenFigures, singleRedFigure]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasSameColor('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasSameColor('green');

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, numberOfSquaresEqualsTriangles]);
