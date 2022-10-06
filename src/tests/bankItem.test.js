import { BankItem } from "../classes/BankItem"
const datas = {
    "id": "01",
    "date": new Date(2022, 7, 26, 15, 0, 0),
    "label": "juste un label",
    "type": "",
    "cheque": "",
    "mvt": "0",
    "checked": false
}

test("create empty", () => {
    const data = { ...datas }
    const bankItem = new BankItem(data)

    expect(bankItem.date).toBeInstanceOf(Date)
})

test("getFolio()", () => {
    const data = { ...datas }
    const bankItem = new BankItem(data)

    expect(bankItem.getFolio()).toMatch("B-2022-001")
})

// describe.each([
//     {  id: "01", mvt: "x0" , expected: /0.00/ },
//     {  id: "01", mvt: "" , expected: "0.00" },
//     {  id: "01", mvt: "2000" , expected: "2000.00" },
//     {  id: "01", mvt: "-1" , expected: "-1.00" }
// ])('$#: new BankItem($id, $mvt).getMvt()', ({ id, mvt, expected }) => {

//     test(`retourne "${expected}"`, () => {
//         const bankItem = new BankItem({id, mvt})

//         expect(bankItem.getMvt()).toMatch(expected)
//     });

// })

test.concurrent.each([
    { id: "01", mvt:"x0" , expected: /0.00 €/ },
    { id: "02", mvt: "" , expected: "0.00 €" },
    { id: "03", mvt: "2000" , expected: "2000.00 €" },
    { id: "04", mvt: "-1" , expected: "-1.00 €" }
])('$# - new BankItem({"$id", "$mvt"}).getMvtEuro() === "$expected"', async ({ id, mvt, expected }) => {

    const bankItem = new BankItem({id, mvt})

    if (typeof expected.replace  === 'function') {
        expect(bankItem.getMvt()).toMatch(expected.replace(" €", ""))
    } else {
        expect(bankItem.getMvt()).toMatch(/0.00/)
    }
    expect(bankItem.getMvtEuro()).toMatch(expected)
})
