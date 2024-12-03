export default function useRerenderEffect<T extends (...args: any[]) => any, U extends any[]>(f: T, deps: U): void;
