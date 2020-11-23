export default interface Predicate<T> {
    (t: T): Promise<boolean> | boolean;
}
