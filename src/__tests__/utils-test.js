import { convertDateArrToObjectArr } from "../utils"

test("it should convert an array of date to an array object{date: Date, count: Number} correctly", () => {
	const dateArr = [
		new Date(2018, 9, 9, 12, 14, 1),
		new Date(2018, 9, 10, 13, 12, 2),
		new Date(2018, 9, 9, 12, 45, 21),
		new Date(2018, 2, 12, 12, 45, 56),
		new Date(2018, 9, 10, 21, 21, 21),
		new Date(2018, 10, 12, 12, 12, 12),
		new Date(2018, 9, 9, 9, 9, 9),
		new Date(2018, 10, 12, 23, 23, 23),
		new Date(2018, 9, 9, 9, 9, 12),
	]
	const expected = [
		{ date: new Date(2018, 9, 9), count: 4 },
		{ date: new Date(2018, 9, 10), count: 2 },
		{ date: new Date(2018, 2, 12), count: 1 },
		{ date: new Date(2018, 10, 12), count: 2 },
	]
	expect(convertDateArrToObjectArr(dateArr)).toEqual(expected)
})

test("it should convert an array of timestamp to an array object{date: Date, count: Number} correctly", () => {
	const dateArr = [
		1539080041000,
		1539169922000,
		1539081921000,
		1520855156000,
		1539199281000,
		1542021132000,
		1539068949000,
		1542061403000,
		1539068952000,
	]
	const expected = [
		{ date: new Date(2018, 9, 9), count: 4 },
		{ date: new Date(2018, 9, 10), count: 2 },
		{ date: new Date(2018, 2, 12), count: 1 },
		{ date: new Date(2018, 10, 12), count: 2 },
	]
	expect(convertDateArrToObjectArr(dateArr)).toEqual(expected)
})

test("it should return an empty array", () => {
	const dateArr = [
		"1539080041000",
		"1539169922000",
		"1539081921000",
		"1520855156000",
		"1539199281000",
		"1542021132000",
		"1539068949000",
		"1542061403000",
		"1539068952000",
	]
	const expected = []
	expect(convertDateArrToObjectArr(dateArr)).toEqual(expected)
})
