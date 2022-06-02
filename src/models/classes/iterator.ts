export function* generator(this: any) {
    const values = Object.values(this);

    for (const val of values)
        yield val;
}