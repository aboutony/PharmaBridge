export function useRouter() {
  return {
    push: () => undefined,
    replace: () => undefined,
    prefetch: async () => undefined,
  }
}

export function usePathname() {
  return '/en'
}
