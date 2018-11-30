export const imports = {
  'src/components/text.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-text" */ 'src/components/text.mdx'),
}
