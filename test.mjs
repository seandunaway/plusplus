export default async function (fn) {
    let test

    if (typeof window !== 'undefined')
        test = window.test

    if (typeof process !== 'undefined')
        test = process.env.test

    if (! test)
        return

    let result = fn ()

    if (result)
        console .log (result)
}
