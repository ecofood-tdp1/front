export { type User }

type User = {
    readonly _id: string,
    readonly type: string,
    readonly display_name: string
    readonly latitude: number,
    readonly longitude: number,
}