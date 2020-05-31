# 2020-05-30

While SWR seems promising, it has a few built-in behaviors that may prove unexpected, and may need to be finessed for our applications. For example, [focus revalidation](https://swr.now.sh/#focus-revalidation), [refetch on interval](https://swr.now.sh/#refetch-on-interval), or error retry.

All of the [use hooks](https://usehooks.com/) had some issues out of the box:

  1. `useAuth` had problems signing in, although this was more an `axios` issue than the hook. `axios` by default does not work with cookie / session authentication that Django supplies. We need to give it a `withCredentials` flag, which also enabled CSRF. The issue is that on first login, when there is no cookie, we have to say `withCredentials: true` in the login call to set the cookies. But on subsequent calls, if `withCredentials` is set, it sends the wrong cookies and gets rejected. I'm currently handling that by hand during sessions, turning it on and off, but in a real app we'll have to detect it somehow.
  2. `useRouter` has some issue with `useParams` at least. It caches the value and wraps it in a `useMemo`, which _should_ update whenever `useParams` returns a different value, but in practice I found that it did not, and instead of using `const { params } = useRouter()`, I had to use `const params = useParams()` directly.
  3. `useRequireAuth` seemingly works as designed. Unfortunately, because we're using `useSWR` for fetching remote data, and all hooks have to be defined unconditionally in a component, a fetch happens before the user is redirected to the login page. This could potentially be an expensive operation, and it is extraneous in the very least. The hook was removed in favor of [the recommended React Router approach](https://reacttraining.com/react-router/web/example/auth-workflow).

I have not had cause to use anything from [`react-use`](https://github.com/streamich/react-use) so far.
