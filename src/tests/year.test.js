import { Year } from "../classes/year";

test('year 2022', () => {
    const datas = {id: 2022}
    const year = new Year(datas)

    expect(year.getId()).toEqual(2022);
    // expect(year.getId()).toEqual(2022);
})

test("check bankReport string value", () => {
    const datas = [
        {value:{ bank_report: "x0" }, match: /0.00/}, 
        {value:{ bank_report: "" }, match: "0.00"}, 
        {value:{ bank_report: "2000" }, match: "2000.00"}, 
        {value:{ bank_report: "-1" }, match: "-1.00"}
    ]
    datas.forEach(data => {
        const year = new Year(data.value)

        expect(year.getBankReport()).toMatch(data.match)
    })
})

test("check cashReport string value", () => {
    const datas = [
        {value:{ cash_report: "x0" }, match: /0.00/}, 
        {value:{ cash_report: "" }, match: "0.00"}, 
        {value:{ cash_report: "2000" }, match: "2000.00"}, 
        {value:{ cash_report: "-1" }, match: "-1.00"}
    ]
    datas.forEach(data => {
        const year = new Year(data.value)

        expect(year.getCashReport()).toMatch(data.match)
    })
})
