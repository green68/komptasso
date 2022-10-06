import { Years } from '../classes/years';

test('no year found', () => {
    const years = new Years()

    expect(years.getLast()).toBeUndefined();
    expect(years.getLast()).not.toBe(0);
})

test('the last year', () => {
    const datas = [{ id: 2022 }, { id: 2020 }, { id: 2021 }, { id: 2019 }]
    const years = new Years(datas)

    expect(years.getLast().id).toEqual(2022)
})
