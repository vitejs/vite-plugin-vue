## <small>5.0.5 (2024-05-30)</small>

* fix(deps): update all non-major dependencies (#360) ([ed4970a](https://github.com/vitejs/vite-plugin-vue/commit/ed4970a)), closes [#360](https://github.com/vitejs/vite-plugin-vue/issues/360)
* fix(deps): update all non-major dependencies (#371) ([0a484c7](https://github.com/vitejs/vite-plugin-vue/commit/0a484c7)), closes [#371](https://github.com/vitejs/vite-plugin-vue/issues/371)
* fix(plugin-vue): don't inline template when `__VUE_PROD_DEVTOOLS__` (#81) ([277a3ab](https://github.com/vitejs/vite-plugin-vue/commit/277a3ab)), closes [#81](https://github.com/vitejs/vite-plugin-vue/issues/81)
* refactor(plugin-vue): use normalizePath from vite (#395) ([2848174](https://github.com/vitejs/vite-plugin-vue/commit/2848174)), closes [#395](https://github.com/vitejs/vite-plugin-vue/issues/395)
* chore(deps): replace dependency eslint-plugin-node with eslint-plugin-n ^14.0.0 (#378) ([997f9bb](https://github.com/vitejs/vite-plugin-vue/commit/997f9bb)), closes [#378](https://github.com/vitejs/vite-plugin-vue/issues/378)
* chore(deps): update all non-major dependencies (#355) ([4faec3d](https://github.com/vitejs/vite-plugin-vue/commit/4faec3d)), closes [#355](https://github.com/vitejs/vite-plugin-vue/issues/355)
* chore(deps): update upstream (#356) ([cf7d91e](https://github.com/vitejs/vite-plugin-vue/commit/cf7d91e)), closes [#356](https://github.com/vitejs/vite-plugin-vue/issues/356)
* chore(deps): update upstream (#361) ([a28c46e](https://github.com/vitejs/vite-plugin-vue/commit/a28c46e)), closes [#361](https://github.com/vitejs/vite-plugin-vue/issues/361)
* chore(deps): update upstream (#367) ([2050ad3](https://github.com/vitejs/vite-plugin-vue/commit/2050ad3)), closes [#367](https://github.com/vitejs/vite-plugin-vue/issues/367)
* chore(deps): update upstream (#379) ([96c82e9](https://github.com/vitejs/vite-plugin-vue/commit/96c82e9)), closes [#379](https://github.com/vitejs/vite-plugin-vue/issues/379)
* chore(plugin-vue): update options on docs ([3f8b472](https://github.com/vitejs/vite-plugin-vue/commit/3f8b472))



## <small>5.0.4 (2024-02-09)</small>

* chore(deps-dev): bump vite from 5.0.10 to 5.0.12 (#354) ([0294b9d](https://github.com/vitejs/vite-plugin-vue/commit/0294b9d)), closes [#354](https://github.com/vitejs/vite-plugin-vue/issues/354)
* chore(deps): update dependency prettier to v3.2.4 (#347) ([e957179](https://github.com/vitejs/vite-plugin-vue/commit/e957179)), closes [#347](https://github.com/vitejs/vite-plugin-vue/issues/347)
* chore(deps): update dependency prettier to v3.2.5 (#352) ([a9f5b11](https://github.com/vitejs/vite-plugin-vue/commit/a9f5b11)), closes [#352](https://github.com/vitejs/vite-plugin-vue/issues/352)
* chore(deps): update upstream (#333) ([573420d](https://github.com/vitejs/vite-plugin-vue/commit/573420d)), closes [#333](https://github.com/vitejs/vite-plugin-vue/issues/333)
* types: omit overridden options ([0c7432b](https://github.com/vitejs/vite-plugin-vue/commit/0c7432b))
* fix(deps): update all non-major dependencies (#332) ([70e5df9](https://github.com/vitejs/vite-plugin-vue/commit/70e5df9)), closes [#332](https://github.com/vitejs/vite-plugin-vue/issues/332)
* fix(plugin-vue): allow disabling transformAssetUrls (#326) ([0ff6fb7](https://github.com/vitejs/vite-plugin-vue/commit/0ff6fb7)), closes [#326](https://github.com/vitejs/vite-plugin-vue/issues/326)



## <small>5.0.3 (2024-01-10)</small>

* fix(deps): update all non-major dependencies (#309) ([8c694f6](https://github.com/vitejs/vite-plugin-vue/commit/8c694f6)), closes [#309](https://github.com/vitejs/vite-plugin-vue/issues/309)
* fix(plugin-vue): handle circular references in HMR check (#334) ([eddcfa8](https://github.com/vitejs/vite-plugin-vue/commit/eddcfa8)), closes [#334](https://github.com/vitejs/vite-plugin-vue/issues/334) [#325](https://github.com/vitejs/vite-plugin-vue/issues/325)
* fix(plugin-vue): handle custom element when hot update ([6ffee6d](https://github.com/vitejs/vite-plugin-vue/commit/6ffee6d))
* chore: fix typo ([0a3b9a5](https://github.com/vitejs/vite-plugin-vue/commit/0a3b9a5))
* chore(deps): update upstream (#310) ([90eb484](https://github.com/vitejs/vite-plugin-vue/commit/90eb484)), closes [#310](https://github.com/vitejs/vite-plugin-vue/issues/310)



## <small>5.0.2 (2023-12-30)</small>

* fix: ensure consistent user template options when reusing AST ([bc0ad64](https://github.com/vitejs/vite-plugin-vue/commit/bc0ad64)), closes [#322](https://github.com/vitejs/vite-plugin-vue/issues/322)
* fix: only enable ast reuse for vue 3.4.3+ ([4a53b6f](https://github.com/vitejs/vite-plugin-vue/commit/4a53b6f))
* chore: bump vue to 3.4.2 ([97002e1](https://github.com/vitejs/vite-plugin-vue/commit/97002e1))



## <small>5.0.1 (2023-12-29)</small>

* fix: Revert "feat: support template AST reuse from Vue 3.4 parser" ([5d68fbd](https://github.com/vitejs/vite-plugin-vue/commit/5d68fbd)), closes [#322](https://github.com/vitejs/vite-plugin-vue/issues/322) [/github.com/vuejs/core/blob/a41c5f1f4367a9f41bcdb8c4e02f54b2378e577d/packages/compiler-sfc/src/parse.ts#L133-L139](https://github.com//github.com/vuejs/core/blob/a41c5f1f4367a9f41bcdb8c4e02f54b2378e577d/packages/compiler-sfc/src/parse.ts/issues/L133-L139) [/github.com/vitejs/vite-plugin-vue/blob/f75de2e5284af6036efa45d5c9ec37757485e3a0/packages/plugin-vue/src/template.ts#L186-L190](https://github.com//github.com/vitejs/vite-plugin-vue/blob/f75de2e5284af6036efa45d5c9ec37757485e3a0/packages/plugin-vue/src/template.ts/issues/L186-L190)
* chore: aggregated changelog for 5.0 [ci skip] ([2b33c32](https://github.com/vitejs/vite-plugin-vue/commit/2b33c32))



## 5.0.0 (2023-12-25)

* **Breaking:** drop `reactivityTransform` support
* **Breaking:** drop Node 14/16 support
* **Breaking:** drop Vite 4.x support
* Vue 3.4 template AST reuse support
* Vue 3.4 compile-time flag `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` support
* Added `customElement` option
* Deprecated `defineModel` option

## 5.0.0-beta.1 (2023-12-14)

* chore: deprecate defineModel option ([0d52a27](https://github.com/vitejs/vite-plugin-vue/commit/0d52a27))
* feat: provide default value for `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` (new in Vue 3.4) ([0fbc4a4](https://github.com/vitejs/vite-plugin-vue/commit/0fbc4a4))



## 5.0.0-beta.0 (2023-12-07)

* chore: upgrade vitest ([db4cf1c](https://github.com/vitejs/vite-plugin-vue/commit/db4cf1c))
* chore(deps): update dependency rollup to ^4.6.1 (#308) ([1a5df4f](https://github.com/vitejs/vite-plugin-vue/commit/1a5df4f)), closes [#308](https://github.com/vitejs/vite-plugin-vue/issues/308)
* feat(plugin-vue): add `customElement` option to compiler (#238) ([99564d5](https://github.com/vitejs/vite-plugin-vue/commit/99564d5)), closes [#238](https://github.com/vitejs/vite-plugin-vue/issues/238)
* fix: respect vite base config for absolute URLs during dev ([515b171](https://github.com/vitejs/vite-plugin-vue/commit/515b171))
* fix(deps): update all non-major dependencies (#298) ([cad0825](https://github.com/vitejs/vite-plugin-vue/commit/cad0825)), closes [#298](https://github.com/vitejs/vite-plugin-vue/issues/298)



## 5.0.0-alpha.0 (2023-11-28)

* fix(plugin-vue): dts for cjs and esm ([c6050ea](https://github.com/vitejs/vite-plugin-vue/commit/c6050ea))
* feat: skip hmr when script is merely formatted (#258) ([8383f49](https://github.com/vitejs/vite-plugin-vue/commit/8383f49)), closes [#258](https://github.com/vitejs/vite-plugin-vue/issues/258)
* feat: support template AST reuse from Vue 3.4 parser ([ba1bab9](https://github.com/vitejs/vite-plugin-vue/commit/ba1bab9))
* feat(plugin-vue): add api type to plugin ([028617d](https://github.com/vitejs/vite-plugin-vue/commit/028617d))
* chore: remove leftover references to reactivity transform ([66d81ce](https://github.com/vitejs/vite-plugin-vue/commit/66d81ce))
* chore(deps): update upstream (#302) ([9c93426](https://github.com/vitejs/vite-plugin-vue/commit/9c93426)), closes [#302](https://github.com/vitejs/vite-plugin-vue/issues/302)
* chore(deps): update upstream (major) (#295) ([f5d8a29](https://github.com/vitejs/vite-plugin-vue/commit/f5d8a29)), closes [#295](https://github.com/vitejs/vite-plugin-vue/issues/295)
* feat!: drop reactivity transform support ([85b2f5b](https://github.com/vitejs/vite-plugin-vue/commit/85b2f5b))
* refactor!: drop node 14&16 (#296) ([4b7be52](https://github.com/vitejs/vite-plugin-vue/commit/4b7be52)), closes [#296](https://github.com/vitejs/vite-plugin-vue/issues/296)
* refactor!: drop vite 4 ([fcabfa5](https://github.com/vitejs/vite-plugin-vue/commit/fcabfa5))
* refactor(plugin-vue): simplify logic of resolving script (#300) ([2ac1045](https://github.com/vitejs/vite-plugin-vue/commit/2ac1045)), closes [#300](https://github.com/vitejs/vite-plugin-vue/issues/300)


### BREAKING CHANGE

* Reactivity Transform is no longer supported as part of
this plugin, in coordination with Vue 3.4. Use VueMacros if you wish to
continue using this feature.


## 4.5.0 (2023-11-16)

* chore: update peerDependencies to support Vite 5 (#290) ([f92861a](https://github.com/vitejs/vite-plugin-vue/commit/f92861a)), closes [#290](https://github.com/vitejs/vite-plugin-vue/issues/290)
* chore: upgrade deps ([c046eba](https://github.com/vitejs/vite-plugin-vue/commit/c046eba))
* fix(deps): update all non-major dependencies (#262) ([c316d43](https://github.com/vitejs/vite-plugin-vue/commit/c316d43)), closes [#262](https://github.com/vitejs/vite-plugin-vue/issues/262)



## <small>4.4.1 (2023-11-08)</small>

* fix: fix style block hmr for vitepress md files ([a26a854](https://github.com/vitejs/vite-plugin-vue/commit/a26a854)), closes [vuejs/vitepress#3129](https://github.com/vuejs/vitepress/issues/3129)
* chore: make tests pass with rollup4 (#271) ([298d419](https://github.com/vitejs/vite-plugin-vue/commit/298d419)), closes [#271](https://github.com/vitejs/vite-plugin-vue/issues/271)



## 4.4.0 (2023-10-02)

* fix(plugin-vue): re-create filters after updating options (#246) ([c383503](https://github.com/vitejs/vite-plugin-vue/commit/c383503)), closes [#246](https://github.com/vitejs/vite-plugin-vue/issues/246)
* feat: support generated JS imports for external scoped style (#196) ([bd5055d](https://github.com/vitejs/vite-plugin-vue/commit/bd5055d)), closes [#196](https://github.com/vitejs/vite-plugin-vue/issues/196)
* chore: add `@ts-ignore` when accessing `legacy?.buildSsrCjsExternalHeuristics` (#255) ([04c3b0b](https://github.com/vitejs/vite-plugin-vue/commit/04c3b0b)), closes [#255](https://github.com/vitejs/vite-plugin-vue/issues/255)
* refactor(plugin-vue): deprecate reactivity transform ([38f8ea5](https://github.com/vitejs/vite-plugin-vue/commit/38f8ea5))
* refactor(plugin-vue): use source-map-js (#247) ([b43690d](https://github.com/vitejs/vite-plugin-vue/commit/b43690d)), closes [#247](https://github.com/vitejs/vite-plugin-vue/issues/247)



## <small>4.3.4 (2023-08-28)</small>

* chore(deps): update typescript-eslint monorepo to v6 (major) (#210) ([fb07b5b](https://github.com/vitejs/vite-plugin-vue/commit/fb07b5b)), closes [#210](https://github.com/vitejs/vite-plugin-vue/issues/210)
* feat(plugin-vue): expose options in `api` (#177) ([269121e](https://github.com/vitejs/vite-plugin-vue/commit/269121e)), closes [#177](https://github.com/vitejs/vite-plugin-vue/issues/177)



## <small>4.3.3 (2023-08-22)</small>

* fix: conditionally get descriptor on hmr (#236) ([b7b1383](https://github.com/vitejs/vite-plugin-vue/commit/b7b1383)), closes [#236](https://github.com/vitejs/vite-plugin-vue/issues/236)



## <small>4.3.2 (2023-08-21)</small>

* fix(plugin-vue): distinguish HMR and transform descriptor (#232) ([9119d4d](https://github.com/vitejs/vite-plugin-vue/commit/9119d4d)), closes [#232](https://github.com/vitejs/vite-plugin-vue/issues/232)



## <small>4.3.1 (2023-08-17)</small>

* fix: revert "fix(plugin-vue): distinguish HMR and transform descriptor (#227)" ([0c28448](https://github.com/vitejs/vite-plugin-vue/commit/0c28448)), closes [#227](https://github.com/vitejs/vite-plugin-vue/issues/227)



## 4.3.0 (2023-08-17)

* docs: add example for transforming custom blocks (#221) ([a6e013e](https://github.com/vitejs/vite-plugin-vue/commit/a6e013e)), closes [#221](https://github.com/vitejs/vite-plugin-vue/issues/221)
* fix: make it work when a default lang was specified (#223) ([ff68ed3](https://github.com/vitejs/vite-plugin-vue/commit/ff68ed3)), closes [#223](https://github.com/vitejs/vite-plugin-vue/issues/223) [#17](https://github.com/vitejs/vite-plugin-vue/issues/17)
* fix: missing typescript declaration for globalTypeFiles (#189) ([1e8d16e](https://github.com/vitejs/vite-plugin-vue/commit/1e8d16e)), closes [#189](https://github.com/vitejs/vite-plugin-vue/issues/189)
* fix(build): ensure correct typing for node esm (#179) ([8a19ee4](https://github.com/vitejs/vite-plugin-vue/commit/8a19ee4)), closes [#179](https://github.com/vitejs/vite-plugin-vue/issues/179)
* fix(deps): update all non-major dependencies (#163) ([3c8193d](https://github.com/vitejs/vite-plugin-vue/commit/3c8193d)), closes [#163](https://github.com/vitejs/vite-plugin-vue/issues/163)
* fix(deps): update all non-major dependencies (#205) ([e014680](https://github.com/vitejs/vite-plugin-vue/commit/e014680)), closes [#205](https://github.com/vitejs/vite-plugin-vue/issues/205)
* fix(plugin-vue): distinguish HMR and transform descriptor (#227) ([aa2b59d](https://github.com/vitejs/vite-plugin-vue/commit/aa2b59d)), closes [#227](https://github.com/vitejs/vite-plugin-vue/issues/227)
* fix(plugin-vue): hmr not working when updating script+template at the same time with a template prep ([93c444c](https://github.com/vitejs/vite-plugin-vue/commit/93c444c)), closes [#106](https://github.com/vitejs/vite-plugin-vue/issues/106) [#28](https://github.com/vitejs/vite-plugin-vue/issues/28) [#76](https://github.com/vitejs/vite-plugin-vue/issues/76)
* feat(types): expose `hoistStatic` option for script compilation (#198) ([7466b4f](https://github.com/vitejs/vite-plugin-vue/commit/7466b4f)), closes [#198](https://github.com/vitejs/vite-plugin-vue/issues/198)



## <small>4.2.3 (2023-05-12)</small>

* fix(types): widen allowed script options for 3.3 features ([3ac08e4](https://github.com/vitejs/vite-plugin-vue/commit/3ac08e4))



## <small>4.2.2 (2023-05-11)</small>

* fix: ignore generic attribute when generating script import ([3170af1](https://github.com/vitejs/vite-plugin-vue/commit/3170af1))
* chore: bump vite ([ffe74e5](https://github.com/vitejs/vite-plugin-vue/commit/ffe74e5))
* chore: bump vue version ([799d875](https://github.com/vitejs/vite-plugin-vue/commit/799d875))



## <small>4.2.1 (2023-04-26)</small>

* fix: lang="tsx" can't be inlined ([c3f5c9c](https://github.com/vitejs/vite-plugin-vue/commit/c3f5c9c)), closes [#159](https://github.com/vitejs/vite-plugin-vue/issues/159)
* chore: update changelog [ci skip] ([9d0d7a7](https://github.com/vitejs/vite-plugin-vue/commit/9d0d7a7))



## 4.2.0 (2023-04-25)

* feat: support 3.3 imported types in SFC macros ([c891652](https://github.com/vitejs/vite-plugin-vue/commit/c891652))


## 4.2.0-beta.3 (2023-04-19)

* fix: fix watcher unlink listener setup timing ([2d2c91a](https://github.com/vitejs/vite-plugin-vue/commit/2d2c91a))



## 4.2.0-beta.2 (2023-04-19)

* fix: invalidate type cache on file removal ([e8cc64b](https://github.com/vitejs/vite-plugin-vue/commit/e8cc64b))



## 4.2.0-beta.1 (2023-04-18)

* perf: only record type deps map in dev ([605b3b0](https://github.com/vitejs/vite-plugin-vue/commit/605b3b0))
* chore: bump vue dev dep ([1f2155a](https://github.com/vitejs/vite-plugin-vue/commit/1f2155a))
* chore: bump vue dev dep (trying windows fix) ([6513ecf](https://github.com/vitejs/vite-plugin-vue/commit/6513ecf))
* chore: remove unused export ([d73c8e7](https://github.com/vitejs/vite-plugin-vue/commit/d73c8e7))
* fix: ensure canInlineMain logic is identical with before refactor ([e6c5a90](https://github.com/vitejs/vite-plugin-vue/commit/e6c5a90))
* feat: support 3.3 imported types in SFC macros ([c891652](https://github.com/vitejs/vite-plugin-vue/commit/c891652))



## 4.2.0-beta.0 (2023-04-17)

* fix: check presence of magic-string instance when using rewriteDefaultAST ([094f784](https://github.com/vitejs/vite-plugin-vue/commit/094f784))
* fix(deps): update all non-major dependencies (#82) ([b274436](https://github.com/vitejs/vite-plugin-vue/commit/b274436)), closes [#82](https://github.com/vitejs/vite-plugin-vue/issues/82)
* fix(vue): retrieve rewritten code (#139) ([199f0cb](https://github.com/vitejs/vite-plugin-vue/commit/199f0cb)), closes [#139](https://github.com/vitejs/vite-plugin-vue/issues/139)
* chore: format ([328fc10](https://github.com/vitejs/vite-plugin-vue/commit/328fc10))
* refactor: reuse script ast for rewriting default (#136) ([9d84656](https://github.com/vitejs/vite-plugin-vue/commit/9d84656)), closes [#136](https://github.com/vitejs/vite-plugin-vue/issues/136)
* refactor: use compiler-sfc 3.3 genDefaultAs option to avoid rewriteDefault ([2c35a66](https://github.com/vitejs/vite-plugin-vue/commit/2c35a66))



## 4.1.0 (2023-03-16)

* fix: avoid resolving to 2.7 compiler-sfc ([cf36b3e](https://github.com/vitejs/vite-plugin-vue/commit/cf36b3e))



## 4.1.0-beta.0 (2023-03-07)

* fix: upgrade rollup and typescript (#114) ([c8a61e3](https://github.com/vitejs/vite-plugin-vue/commit/c8a61e3)), closes [#114](https://github.com/vitejs/vite-plugin-vue/issues/114)
* fix(deps): update all non-major dependencies (#50) ([8f4a5dc](https://github.com/vitejs/vite-plugin-vue/commit/8f4a5dc)), closes [#50](https://github.com/vitejs/vite-plugin-vue/issues/50)



## 4.0.0 (2022-12-09)

* chore: update vite dep to ^4.0.0 (#49) ([5a2f789](https://github.com/vitejs/vite-plugin-vue/commit/5a2f789)), closes [#49](https://github.com/vitejs/vite-plugin-vue/issues/49)
* chore(deps): update all non-major dependencies (#40) ([4c95967](https://github.com/vitejs/vite-plugin-vue/commit/4c95967)), closes [#40](https://github.com/vitejs/vite-plugin-vue/issues/40)
* chore(deps): update rollup and esbuild (#46) ([92fec7b](https://github.com/vitejs/vite-plugin-vue/commit/92fec7b)), closes [#46](https://github.com/vitejs/vite-plugin-vue/issues/46)



## 4.0.0-beta.0 (2022-12-05)

* chore: @typescript-eslint/explicit-module-boundary-types (#2735) ([3337060](https://github.com/vitejs/vite-plugin-vue/commit/3337060)), closes [#2735](https://github.com/vitejs/vite-plugin-vue/issues/2735)
* chore: 3.0 release notes and bump peer deps (#9072) ([e6947e7](https://github.com/vitejs/vite-plugin-vue/commit/e6947e7)), closes [#9072](https://github.com/vitejs/vite-plugin-vue/issues/9072)
* chore: Add `repository.directory` to `packages/**/package.json` (#2687) ([3be6b48](https://github.com/vitejs/vite-plugin-vue/commit/3be6b48)), closes [#2687](https://github.com/vitejs/vite-plugin-vue/issues/2687)
* chore: add version badge for plugins [skip ci] ([d3ebd5f](https://github.com/vitejs/vite-plugin-vue/commit/d3ebd5f))
* chore: author ([d18e950](https://github.com/vitejs/vite-plugin-vue/commit/d18e950))
* chore: bump deps ([1281de5](https://github.com/vitejs/vite-plugin-vue/commit/1281de5))
* chore: bump minors and rebuild lock (#8074) ([069207c](https://github.com/vitejs/vite-plugin-vue/commit/069207c)), closes [#8074](https://github.com/vitejs/vite-plugin-vue/issues/8074)
* chore: bump vue ([93fd77a](https://github.com/vitejs/vite-plugin-vue/commit/93fd77a))
* chore: bump vue and vitepress deps ([e141d89](https://github.com/vitejs/vite-plugin-vue/commit/e141d89))
* chore: bump vue deps to 3.2.5 ([8fec623](https://github.com/vitejs/vite-plugin-vue/commit/8fec623))
* chore: bump vue version ([cab434e](https://github.com/vitejs/vite-plugin-vue/commit/cab434e))
* chore: bump vue version (fix broken alias test case) ([27ac68b](https://github.com/vitejs/vite-plugin-vue/commit/27ac68b))
* chore: change prettier version to exact (#3386) ([a08465c](https://github.com/vitejs/vite-plugin-vue/commit/a08465c)), closes [#3386](https://github.com/vitejs/vite-plugin-vue/issues/3386)
* chore: convert scripts to TS (#6160) ([8653e84](https://github.com/vitejs/vite-plugin-vue/commit/8653e84)), closes [#6160](https://github.com/vitejs/vite-plugin-vue/issues/6160)
* chore: enable `import/no-duplicates` eslint rule (#8199) ([a0b88b3](https://github.com/vitejs/vite-plugin-vue/commit/a0b88b3)), closes [#8199](https://github.com/vitejs/vite-plugin-vue/issues/8199)
* chore: enable prettier trailing commas (#37) ([eef8929](https://github.com/vitejs/vite-plugin-vue/commit/eef8929)), closes [#37](https://github.com/vitejs/vite-plugin-vue/issues/37)
* chore: enable reportUnusedDisableDirectives (#8384) ([6e8094a](https://github.com/vitejs/vite-plugin-vue/commit/6e8094a)), closes [#8384](https://github.com/vitejs/vite-plugin-vue/issues/8384)
* chore: fix code typos (#9033) ([3ca1391](https://github.com/vitejs/vite-plugin-vue/commit/3ca1391)), closes [#9033](https://github.com/vitejs/vite-plugin-vue/issues/9033)
* chore: fix lockfile + missing args ([943f4ab](https://github.com/vitejs/vite-plugin-vue/commit/943f4ab))
* chore: fix plugin-vue build ([e4fbe06](https://github.com/vitejs/vite-plugin-vue/commit/e4fbe06))
* chore: fix publish, build vite before plugin-react and plugin-vue (#6988) ([691da83](https://github.com/vitejs/vite-plugin-vue/commit/691da83)), closes [#6988](https://github.com/vitejs/vite-plugin-vue/issues/6988)
* chore: fix some typos (#2715) ([91d2174](https://github.com/vitejs/vite-plugin-vue/commit/91d2174)), closes [#2715](https://github.com/vitejs/vite-plugin-vue/issues/2715)
* chore: fix typo (#9684) ([eafe717](https://github.com/vitejs/vite-plugin-vue/commit/eafe717)), closes [#9684](https://github.com/vitejs/vite-plugin-vue/issues/9684)
* chore: format (#5459) ([0623832](https://github.com/vitejs/vite-plugin-vue/commit/0623832)), closes [#5459](https://github.com/vitejs/vite-plugin-vue/issues/5459)
* chore: format & check with prettier (#5869) ([2465f11](https://github.com/vitejs/vite-plugin-vue/commit/2465f11)), closes [#5869](https://github.com/vitejs/vite-plugin-vue/issues/5869)
* chore: format and fix typo (#5718) ([bd5c795](https://github.com/vitejs/vite-plugin-vue/commit/bd5c795)), closes [#5718](https://github.com/vitejs/vite-plugin-vue/issues/5718)
* chore: narrow down rollup version (#9637) ([c381571](https://github.com/vitejs/vite-plugin-vue/commit/c381571)), closes [#9637](https://github.com/vitejs/vite-plugin-vue/issues/9637)
* chore: next replace core (#6664) ([c9e9e55](https://github.com/vitejs/vite-plugin-vue/commit/c9e9e55)), closes [#6664](https://github.com/vitejs/vite-plugin-vue/issues/6664)
* chore: no implicit any for local vars (#4314) ([134d0a1](https://github.com/vitejs/vite-plugin-vue/commit/134d0a1)), closes [#4314](https://github.com/vitejs/vite-plugin-vue/issues/4314)
* chore: plugin-vue changelog edits [ci skip] ([6fbf739](https://github.com/vitejs/vite-plugin-vue/commit/6fbf739))
* chore: prefer type imports (#5835) ([f2d9ae8](https://github.com/vitejs/vite-plugin-vue/commit/f2d9ae8)), closes [#5835](https://github.com/vitejs/vite-plugin-vue/issues/5835)
* chore: prefer-const (#2733) ([7e4d61d](https://github.com/vitejs/vite-plugin-vue/commit/7e4d61d)), closes [#2733](https://github.com/vitejs/vite-plugin-vue/issues/2733)
* chore: remove invalid condition (#5758) ([f2f5daf](https://github.com/vitejs/vite-plugin-vue/commit/f2f5daf)), closes [#5758](https://github.com/vitejs/vite-plugin-vue/issues/5758)
* chore: remove stale files ([8fc4c84](https://github.com/vitejs/vite-plugin-vue/commit/8fc4c84))
* chore: remove stale option ([95db63e](https://github.com/vitejs/vite-plugin-vue/commit/95db63e))
* chore: repo setup ([cfb7e42](https://github.com/vitejs/vite-plugin-vue/commit/cfb7e42))
* chore: revert vitejs/vite#8152 (#8161) ([be1d42c](https://github.com/vitejs/vite-plugin-vue/commit/be1d42c)), closes [vitejs/vite#8152](https://github.com/vitejs/vite/issues/8152) [#8161](https://github.com/vitejs/vite-plugin-vue/issues/8161)
* chore: typos (#1463) [skip ci] ([f71e0e0](https://github.com/vitejs/vite-plugin-vue/commit/f71e0e0)), closes [#1463](https://github.com/vitejs/vite-plugin-vue/issues/1463)
* chore: update branch links [ci skip] ([965d07f](https://github.com/vitejs/vite-plugin-vue/commit/965d07f))
* chore: Update fsevents, chokidar, rollup (#1901) ([30949d9](https://github.com/vitejs/vite-plugin-vue/commit/30949d9)), closes [#1901](https://github.com/vitejs/vite-plugin-vue/issues/1901)
* chore: update major deps (#8572) ([858af60](https://github.com/vitejs/vite-plugin-vue/commit/858af60)), closes [#8572](https://github.com/vitejs/vite-plugin-vue/issues/8572)
* chore: update plugins peer deps ([43aa63c](https://github.com/vitejs/vite-plugin-vue/commit/43aa63c))
* chore: upgrade to pnpm v7 (#8041) ([e42c759](https://github.com/vitejs/vite-plugin-vue/commit/e42c759)), closes [#8041](https://github.com/vitejs/vite-plugin-vue/issues/8041)
* chore: use `esno` to replace `ts-node` (#8162) ([addbe17](https://github.com/vitejs/vite-plugin-vue/commit/addbe17)), closes [#8162](https://github.com/vitejs/vite-plugin-vue/issues/8162)
* chore: use `tsx` directly instead of indirect `esno` (#8773) ([0b0a21f](https://github.com/vitejs/vite-plugin-vue/commit/0b0a21f)), closes [#8773](https://github.com/vitejs/vite-plugin-vue/issues/8773)
* chore: use `unbuild` to bundle plugins (#8139) ([83ddf72](https://github.com/vitejs/vite-plugin-vue/commit/83ddf72)), closes [#8139](https://github.com/vitejs/vite-plugin-vue/issues/8139)
* chore: use cjs extension with scripts (#5877) ([6ac51e9](https://github.com/vitejs/vite-plugin-vue/commit/6ac51e9)), closes [#5877](https://github.com/vitejs/vite-plugin-vue/issues/5877)
* chore: use node prefix (#8309) ([32dc514](https://github.com/vitejs/vite-plugin-vue/commit/32dc514)), closes [#8309](https://github.com/vitejs/vite-plugin-vue/issues/8309)
* chore: use recommended lint (#3072) ([50362d4](https://github.com/vitejs/vite-plugin-vue/commit/50362d4)), closes [#3072](https://github.com/vitejs/vite-plugin-vue/issues/3072)
* chore: vite as peer dep for plugin-vue (#4979) ([bef4608](https://github.com/vitejs/vite-plugin-vue/commit/bef4608)), closes [#4979](https://github.com/vitejs/vite-plugin-vue/issues/4979)
* chore(deps): bump rollup version (#5045) ([955df4e](https://github.com/vitejs/vite-plugin-vue/commit/955df4e)), closes [#5045](https://github.com/vitejs/vite-plugin-vue/issues/5045)
* chore(deps): massive major deps update (#5574) ([ee30ad7](https://github.com/vitejs/vite-plugin-vue/commit/ee30ad7)), closes [#5574](https://github.com/vitejs/vite-plugin-vue/issues/5574)
* chore(deps): update all non-major dependencies (#10393) ([e238633](https://github.com/vitejs/vite-plugin-vue/commit/e238633)), closes [#10393](https://github.com/vitejs/vite-plugin-vue/issues/10393)
* chore(deps): update all non-major dependencies (#10488) ([efc0dd8](https://github.com/vitejs/vite-plugin-vue/commit/efc0dd8)), closes [#10488](https://github.com/vitejs/vite-plugin-vue/issues/10488)
* chore(deps): update all non-major dependencies (#10910) ([34ceb0d](https://github.com/vitejs/vite-plugin-vue/commit/34ceb0d)), closes [#10910](https://github.com/vitejs/vite-plugin-vue/issues/10910)
* chore(deps): update all non-major dependencies (#4117) ([6614840](https://github.com/vitejs/vite-plugin-vue/commit/6614840)), closes [#4117](https://github.com/vitejs/vite-plugin-vue/issues/4117)
* chore(deps): update all non-major dependencies (#4309) ([f60927d](https://github.com/vitejs/vite-plugin-vue/commit/f60927d)), closes [#4309](https://github.com/vitejs/vite-plugin-vue/issues/4309)
* chore(deps): update all non-major dependencies (#4992) ([b599b0f](https://github.com/vitejs/vite-plugin-vue/commit/b599b0f)), closes [#4992](https://github.com/vitejs/vite-plugin-vue/issues/4992)
* chore(deps): update all non-major dependencies (#5100) ([8b30606](https://github.com/vitejs/vite-plugin-vue/commit/8b30606)), closes [#5100](https://github.com/vitejs/vite-plugin-vue/issues/5100)
* chore(deps): update all non-major dependencies (#5679) ([8aca1db](https://github.com/vitejs/vite-plugin-vue/commit/8aca1db)), closes [#5679](https://github.com/vitejs/vite-plugin-vue/issues/5679)
* chore(deps): update all non-major dependencies (#5879) ([d61b590](https://github.com/vitejs/vite-plugin-vue/commit/d61b590)), closes [#5879](https://github.com/vitejs/vite-plugin-vue/issues/5879)
* chore(deps): update all non-major dependencies (#6357) ([71dc4fe](https://github.com/vitejs/vite-plugin-vue/commit/71dc4fe)), closes [#6357](https://github.com/vitejs/vite-plugin-vue/issues/6357)
* chore(deps): update all non-major dependencies (#6905) ([de8beb9](https://github.com/vitejs/vite-plugin-vue/commit/de8beb9)), closes [#6905](https://github.com/vitejs/vite-plugin-vue/issues/6905)
* chore(deps): update all non-major dependencies (#7780) ([17c8b26](https://github.com/vitejs/vite-plugin-vue/commit/17c8b26)), closes [#7780](https://github.com/vitejs/vite-plugin-vue/issues/7780)
* chore(deps): update all non-major dependencies (#8474) ([9a97dba](https://github.com/vitejs/vite-plugin-vue/commit/9a97dba)), closes [#8474](https://github.com/vitejs/vite-plugin-vue/issues/8474)
* chore(deps): update all non-major dependencies (#9675) ([654e3f0](https://github.com/vitejs/vite-plugin-vue/commit/654e3f0)), closes [#9675](https://github.com/vitejs/vite-plugin-vue/issues/9675)
* chore(deps): update dependency slash to v4 (#4118) ([7a07f17](https://github.com/vitejs/vite-plugin-vue/commit/7a07f17)), closes [#4118](https://github.com/vitejs/vite-plugin-vue/issues/4118)
* chore(deps): update dependency slash to v5 (#10317) ([6fd5c72](https://github.com/vitejs/vite-plugin-vue/commit/6fd5c72)), closes [#10317](https://github.com/vitejs/vite-plugin-vue/issues/10317)
* chore(deps): update non critical deps (#5569) ([a1eca7c](https://github.com/vitejs/vite-plugin-vue/commit/a1eca7c)), closes [#5569](https://github.com/vitejs/vite-plugin-vue/issues/5569)
* chore(deps): update plugins (#5462) ([caa700f](https://github.com/vitejs/vite-plugin-vue/commit/caa700f)), closes [#5462](https://github.com/vitejs/vite-plugin-vue/issues/5462)
* chore(deps): update to esbuild 0.14.14, with patched dist (#6639) ([506b337](https://github.com/vitejs/vite-plugin-vue/commit/506b337)), closes [#6639](https://github.com/vitejs/vite-plugin-vue/issues/6639)
* chore(deps): update to rollup 3.3 (#10890) ([bd9c3cf](https://github.com/vitejs/vite-plugin-vue/commit/bd9c3cf)), closes [#10890](https://github.com/vitejs/vite-plugin-vue/issues/10890)
* chore(deps): update typescript to v4.3 (#3557) ([d3d5192](https://github.com/vitejs/vite-plugin-vue/commit/d3d5192)), closes [#3557](https://github.com/vitejs/vite-plugin-vue/issues/3557)
* chore(deps): use `esno` to replace `ts-node` (#8152) ([612a1b6](https://github.com/vitejs/vite-plugin-vue/commit/612a1b6)), closes [#8152](https://github.com/vitejs/vite-plugin-vue/issues/8152)
* chore(lint): sort for imports (#8113) ([ca80e9d](https://github.com/vitejs/vite-plugin-vue/commit/ca80e9d)), closes [#8113](https://github.com/vitejs/vite-plugin-vue/issues/8113)
* chore(plugin-vue): backwards compat for ssr option ([b4af35e](https://github.com/vitejs/vite-plugin-vue/commit/b4af35e))
* chore(plugin-vue): bump vite peer dep requirement ([90c7e20](https://github.com/vitejs/vite-plugin-vue/commit/90c7e20))
* chore(plugin-vue): bump vite peer dep to 2.9.0 (#7472) ([976f2e6](https://github.com/vitejs/vite-plugin-vue/commit/976f2e6)), closes [#7472](https://github.com/vitejs/vite-plugin-vue/issues/7472)
* chore(plugin-vue): change @rollup/pluginutils to dep from devDep (#8154) ([b10ac5e](https://github.com/vitejs/vite-plugin-vue/commit/b10ac5e)), closes [#8154](https://github.com/vitejs/vite-plugin-vue/issues/8154)
* chore(plugin-vue): changelog [ci skip] ([77bd76f](https://github.com/vitejs/vite-plugin-vue/commit/77bd76f))
* chore(plugin-vue): comments and readme ([e30b37f](https://github.com/vitejs/vite-plugin-vue/commit/e30b37f))
* chore(plugin-vue): define `renderFnName` if necessary (#1357) ([1cd0590](https://github.com/vitejs/vite-plugin-vue/commit/1cd0590)), closes [#1357](https://github.com/vitejs/vite-plugin-vue/issues/1357)
* chore(plugin-vue): fix return type annotation ([852d71d](https://github.com/vitejs/vite-plugin-vue/commit/852d71d))
* chore(plugin-vue): mark export helper with null byte (#8792) ([5b1e188](https://github.com/vitejs/vite-plugin-vue/commit/5b1e188)), closes [#8792](https://github.com/vitejs/vite-plugin-vue/issues/8792)
* chore(plugin-vue): prepare for release ([bad5279](https://github.com/vitejs/vite-plugin-vue/commit/bad5279))
* chore(plugin-vue): remove deprecated options ([87bad9b](https://github.com/vitejs/vite-plugin-vue/commit/87bad9b))
* chore(plugin-vue): replace source-map with gen/trace-mapping (#8155) ([5713a87](https://github.com/vitejs/vite-plugin-vue/commit/5713a87)), closes [#8155](https://github.com/vitejs/vite-plugin-vue/issues/8155)
* chore(plugin-vue): revert #7527, lower vite peer dep ([85c04f2](https://github.com/vitejs/vite-plugin-vue/commit/85c04f2)), closes [#7527](https://github.com/vitejs/vite-plugin-vue/issues/7527)
* chore(plugin-vue): update reactivityTransform comment docs [ci skip] ([80b4108](https://github.com/vitejs/vite-plugin-vue/commit/80b4108))
* release: plugin-vue@1.0.3 ([7f027a5](https://github.com/vitejs/vite-plugin-vue/commit/7f027a5))
* release: plugin-vue@1.0.4 ([c21710a](https://github.com/vitejs/vite-plugin-vue/commit/c21710a))
* release: plugin-vue@1.0.5 ([7d7e479](https://github.com/vitejs/vite-plugin-vue/commit/7d7e479))
* release: plugin-vue@1.0.6 ([19ff48b](https://github.com/vitejs/vite-plugin-vue/commit/19ff48b))
* release: plugin-vue@1.1.0 ([a3f6de1](https://github.com/vitejs/vite-plugin-vue/commit/a3f6de1))
* release: plugin-vue@1.1.1 ([3a70d96](https://github.com/vitejs/vite-plugin-vue/commit/3a70d96))
* release: plugin-vue@1.1.2 ([4c1ee89](https://github.com/vitejs/vite-plugin-vue/commit/4c1ee89))
* release: plugin-vue@1.1.3 ([d18b6de](https://github.com/vitejs/vite-plugin-vue/commit/d18b6de))
* release: plugin-vue@1.1.4 ([64e42a1](https://github.com/vitejs/vite-plugin-vue/commit/64e42a1))
* release: plugin-vue@1.1.5 ([7de66ff](https://github.com/vitejs/vite-plugin-vue/commit/7de66ff))
* release: plugin-vue@1.10.0 ([b59df72](https://github.com/vitejs/vite-plugin-vue/commit/b59df72))
* release: plugin-vue@1.10.0-beta.0 ([a0a138c](https://github.com/vitejs/vite-plugin-vue/commit/a0a138c))
* release: plugin-vue@1.10.0-beta.1 ([ca04118](https://github.com/vitejs/vite-plugin-vue/commit/ca04118))
* release: plugin-vue@1.10.1 ([e1e19cd](https://github.com/vitejs/vite-plugin-vue/commit/e1e19cd))
* release: plugin-vue@1.10.2 ([e9c929e](https://github.com/vitejs/vite-plugin-vue/commit/e9c929e))
* release: plugin-vue@1.2.0 ([94b375e](https://github.com/vitejs/vite-plugin-vue/commit/94b375e))
* release: plugin-vue@1.2.1 ([6033572](https://github.com/vitejs/vite-plugin-vue/commit/6033572))
* release: plugin-vue@1.2.2 ([bcf29ce](https://github.com/vitejs/vite-plugin-vue/commit/bcf29ce))
* release: plugin-vue@1.2.3 ([6b2ecac](https://github.com/vitejs/vite-plugin-vue/commit/6b2ecac))
* release: plugin-vue@1.2.4 ([e2e47ff](https://github.com/vitejs/vite-plugin-vue/commit/e2e47ff))
* release: plugin-vue@1.2.5 ([d196dd2](https://github.com/vitejs/vite-plugin-vue/commit/d196dd2))
* release: plugin-vue@1.3.0 ([bfc4a09](https://github.com/vitejs/vite-plugin-vue/commit/bfc4a09))
* release: plugin-vue@1.4.0 ([f1eb67d](https://github.com/vitejs/vite-plugin-vue/commit/f1eb67d))
* release: plugin-vue@1.5.0 ([83aa68b](https://github.com/vitejs/vite-plugin-vue/commit/83aa68b))
* release: plugin-vue@1.6.0 ([faf2ec5](https://github.com/vitejs/vite-plugin-vue/commit/faf2ec5))
* release: plugin-vue@1.6.1 ([41dd987](https://github.com/vitejs/vite-plugin-vue/commit/41dd987))
* release: plugin-vue@1.6.2 ([908cd75](https://github.com/vitejs/vite-plugin-vue/commit/908cd75))
* release: plugin-vue@1.7.0 ([c6e9672](https://github.com/vitejs/vite-plugin-vue/commit/c6e9672))
* release: plugin-vue@1.7.1 ([c0c126a](https://github.com/vitejs/vite-plugin-vue/commit/c0c126a))
* release: plugin-vue@1.8.0 ([ee54b65](https://github.com/vitejs/vite-plugin-vue/commit/ee54b65))
* release: plugin-vue@1.8.1 ([5ccbc27](https://github.com/vitejs/vite-plugin-vue/commit/5ccbc27))
* release: plugin-vue@1.9.0 ([e14a3f9](https://github.com/vitejs/vite-plugin-vue/commit/e14a3f9))
* release: plugin-vue@1.9.1 ([b8fc0f2](https://github.com/vitejs/vite-plugin-vue/commit/b8fc0f2))
* release: plugin-vue@1.9.2 ([b9c3991](https://github.com/vitejs/vite-plugin-vue/commit/b9c3991))
* release: plugin-vue@1.9.3 ([df59ff9](https://github.com/vitejs/vite-plugin-vue/commit/df59ff9))
* release: plugin-vue@1.9.4 ([232ddb9](https://github.com/vitejs/vite-plugin-vue/commit/232ddb9))
* release: plugin-vue@2.0.0 ([ec627ed](https://github.com/vitejs/vite-plugin-vue/commit/ec627ed))
* release: plugin-vue@2.0.1 ([b70a4f8](https://github.com/vitejs/vite-plugin-vue/commit/b70a4f8))
* release: plugin-vue@2.1.0 ([f879b32](https://github.com/vitejs/vite-plugin-vue/commit/f879b32))
* release: plugin-vue@2.2.0 ([def902e](https://github.com/vitejs/vite-plugin-vue/commit/def902e))
* release: plugin-vue@2.2.1 ([4d8f246](https://github.com/vitejs/vite-plugin-vue/commit/4d8f246))
* release: plugin-vue@2.2.2 ([6a3c4e7](https://github.com/vitejs/vite-plugin-vue/commit/6a3c4e7))
* release: plugin-vue@2.2.3 ([19948be](https://github.com/vitejs/vite-plugin-vue/commit/19948be))
* release: plugin-vue@2.2.4 ([09dca5b](https://github.com/vitejs/vite-plugin-vue/commit/09dca5b))
* release: plugin-vue@2.3.0 ([6d9de5f](https://github.com/vitejs/vite-plugin-vue/commit/6d9de5f))
* release: plugin-vue@2.3.0-beta.0 ([b9030eb](https://github.com/vitejs/vite-plugin-vue/commit/b9030eb))
* release: plugin-vue@2.3.1 ([60fdfa4](https://github.com/vitejs/vite-plugin-vue/commit/60fdfa4))
* release: plugin-vue@2.3.2 ([0e543da](https://github.com/vitejs/vite-plugin-vue/commit/0e543da))
* release: plugin-vue@3.0.0 ([e2147eb](https://github.com/vitejs/vite-plugin-vue/commit/e2147eb))
* release: plugin-vue@3.0.0-alpha.0 ([38722d9](https://github.com/vitejs/vite-plugin-vue/commit/38722d9))
* release: plugin-vue@3.0.0-alpha.1 ([8a03fd4](https://github.com/vitejs/vite-plugin-vue/commit/8a03fd4))
* release: plugin-vue@3.0.0-alpha.2 ([3888648](https://github.com/vitejs/vite-plugin-vue/commit/3888648))
* release: plugin-vue@3.0.0-beta.0 ([69d9134](https://github.com/vitejs/vite-plugin-vue/commit/69d9134))
* release: plugin-vue@3.0.0-beta.1 ([e0a1770](https://github.com/vitejs/vite-plugin-vue/commit/e0a1770))
* release: plugin-vue@3.0.1 ([ac1beae](https://github.com/vitejs/vite-plugin-vue/commit/ac1beae))
* release: plugin-vue@3.0.2 ([62a3ee1](https://github.com/vitejs/vite-plugin-vue/commit/62a3ee1))
* release: plugin-vue@3.0.3 ([73f5e12](https://github.com/vitejs/vite-plugin-vue/commit/73f5e12))
* release: plugin-vue@3.1.0 ([7ffd9c0](https://github.com/vitejs/vite-plugin-vue/commit/7ffd9c0))
* release: plugin-vue@3.1.0-beta.0 ([8905909](https://github.com/vitejs/vite-plugin-vue/commit/8905909))
* release: plugin-vue@3.2.0 ([bab1e4d](https://github.com/vitejs/vite-plugin-vue/commit/bab1e4d))
* release: plugin-vue@3.2.0-beta.0 ([fbc084a](https://github.com/vitejs/vite-plugin-vue/commit/fbc084a))
* release: plugin-vue@4.0.0-alpha.0 ([11af403](https://github.com/vitejs/vite-plugin-vue/commit/11af403))
* release: plugin-vue@4.0.0-alpha.1 ([7e94789](https://github.com/vitejs/vite-plugin-vue/commit/7e94789))
* release: plugin-vue@4.0.0-alpha.2 ([d826ac2](https://github.com/vitejs/vite-plugin-vue/commit/d826ac2))
* docs: add missing binding in asset import example (#10414) ([1e44c81](https://github.com/vitejs/vite-plugin-vue/commit/1e44c81)), closes [#10414](https://github.com/vitejs/vite-plugin-vue/issues/10414)
* docs: cleanup changes (#8989) ([4439d91](https://github.com/vitejs/vite-plugin-vue/commit/4439d91)), closes [#8989](https://github.com/vitejs/vite-plugin-vue/issues/8989)
* docs: fix typo (#1371) ([0a0350c](https://github.com/vitejs/vite-plugin-vue/commit/0a0350c)), closes [#1371](https://github.com/vitejs/vite-plugin-vue/issues/1371)
* docs: fix typo (#9855) ([c6f5556](https://github.com/vitejs/vite-plugin-vue/commit/c6f5556)), closes [#9855](https://github.com/vitejs/vite-plugin-vue/issues/9855)
* docs: migration guide ([039e7c3](https://github.com/vitejs/vite-plugin-vue/commit/039e7c3))
* docs(plugin-vue): add custom block transform example ([c98a157](https://github.com/vitejs/vite-plugin-vue/commit/c98a157))
* docs(plugin-vue): add link to plugin-vue-jsx (#10830) ([459e27b](https://github.com/vitejs/vite-plugin-vue/commit/459e27b)), closes [#10830](https://github.com/vitejs/vite-plugin-vue/issues/10830)
* docs(plugin-vue): clarify asset url handling (#8184) ([a788f39](https://github.com/vitejs/vite-plugin-vue/commit/a788f39)), closes [#8184](https://github.com/vitejs/vite-plugin-vue/issues/8184)
* docs(plugin-vue): example for passing compiler options ([a55eebc](https://github.com/vitejs/vite-plugin-vue/commit/a55eebc)), closes [#1312](https://github.com/vitejs/vite-plugin-vue/issues/1312)
* docs(plugin-vue): mark `script/template/style` options as `Partial` (#1342) [skip ci] ([da57335](https://github.com/vitejs/vite-plugin-vue/commit/da57335)), closes [#1342](https://github.com/vitejs/vite-plugin-vue/issues/1342)
* docs(plugin-vue): update options in README (#11125) ([e3b7e06](https://github.com/vitejs/vite-plugin-vue/commit/e3b7e06)), closes [#11125](https://github.com/vitejs/vite-plugin-vue/issues/11125)
* docs(vue): add transformAssetUrls example (#7232) ([d4786d1](https://github.com/vitejs/vite-plugin-vue/commit/d4786d1)), closes [#7232](https://github.com/vitejs/vite-plugin-vue/issues/7232)
* fix: adjust vue template sourcemap (#6972) ([0ae86fc](https://github.com/vitejs/vite-plugin-vue/commit/0ae86fc)), closes [#6972](https://github.com/vitejs/vite-plugin-vue/issues/6972)
* fix: allow overwriting `define` options in vue & vue-jsx plugins (#6072) ([f60874c](https://github.com/vitejs/vite-plugin-vue/commit/f60874c)), closes [#6072](https://github.com/vitejs/vite-plugin-vue/issues/6072)
* fix: avoid eager hmr api access ([705bfc3](https://github.com/vitejs/vite-plugin-vue/commit/705bfc3))
* fix: avoid self referencing type in plugin-vue ([50ef75e](https://github.com/vitejs/vite-plugin-vue/commit/50ef75e))
* fix: handle HMR for Vue SFC with query parameters (fix #9341) (#10794) ([eb719bf](https://github.com/vitejs/vite-plugin-vue/commit/eb719bf)), closes [#9341](https://github.com/vitejs/vite-plugin-vue/issues/9341) [#10794](https://github.com/vitejs/vite-plugin-vue/issues/10794)
* fix: hmr doesn't work when modifying the code of jsx in sfc (#4563) ([551eaea](https://github.com/vitejs/vite-plugin-vue/commit/551eaea)), closes [#4563](https://github.com/vitejs/vite-plugin-vue/issues/4563)
* fix: mention that Node.js 13/15 support is dropped (fixes #9113) (#9116) ([04267f7](https://github.com/vitejs/vite-plugin-vue/commit/04267f7)), closes [#9113](https://github.com/vitejs/vite-plugin-vue/issues/9113) [#9116](https://github.com/vitejs/vite-plugin-vue/issues/9116)
* fix: plugin-vue `options.compiler` field (#6588) ([a698346](https://github.com/vitejs/vite-plugin-vue/commit/a698346)), closes [#6588](https://github.com/vitejs/vite-plugin-vue/issues/6588) [#6587](https://github.com/vitejs/vite-plugin-vue/issues/6587)
* fix: plugin-vue dev scripts error in ssr-vue (#5607) ([c6f957b](https://github.com/vitejs/vite-plugin-vue/commit/c6f957b)), closes [#5607](https://github.com/vitejs/vite-plugin-vue/issues/5607)
* fix: reuse the old preprocessor after changing the lang attr (#4224) ([7be5862](https://github.com/vitejs/vite-plugin-vue/commit/7be5862)), closes [#4224](https://github.com/vitejs/vite-plugin-vue/issues/4224)
* fix: revert update dependency slash to v4 (#4118) (#4519) ([78e5474](https://github.com/vitejs/vite-plugin-vue/commit/78e5474)), closes [#4118](https://github.com/vitejs/vite-plugin-vue/issues/4118) [#4519](https://github.com/vitejs/vite-plugin-vue/issues/4519)
* fix: rewrite CJS specific funcs/vars in plugins (#8227) ([da0b6de](https://github.com/vitejs/vite-plugin-vue/commit/da0b6de)), closes [#8227](https://github.com/vitejs/vite-plugin-vue/issues/8227)
* fix: update the vue version in the error message (#6252) ([a3e06d1](https://github.com/vitejs/vite-plugin-vue/commit/a3e06d1)), closes [#6252](https://github.com/vitejs/vite-plugin-vue/issues/6252)
* fix(deps): update all non-major dependencies (#10077) ([fb7c239](https://github.com/vitejs/vite-plugin-vue/commit/fb7c239)), closes [#10077](https://github.com/vitejs/vite-plugin-vue/issues/10077)
* fix(deps): update all non-major dependencies (#10316) ([c369cde](https://github.com/vitejs/vite-plugin-vue/commit/c369cde)), closes [#10316](https://github.com/vitejs/vite-plugin-vue/issues/10316)
* fix(deps): update all non-major dependencies (#4545) ([874dcc2](https://github.com/vitejs/vite-plugin-vue/commit/874dcc2)), closes [#4545](https://github.com/vitejs/vite-plugin-vue/issues/4545)
* fix(deps): update all non-major dependencies (#6782) ([a83ed1b](https://github.com/vitejs/vite-plugin-vue/commit/a83ed1b)), closes [#6782](https://github.com/vitejs/vite-plugin-vue/issues/6782)
* fix(deps): update all non-major dependencies (#7392) ([f3eb74f](https://github.com/vitejs/vite-plugin-vue/commit/f3eb74f)), closes [#7392](https://github.com/vitejs/vite-plugin-vue/issues/7392)
* fix(deps): update all non-major dependencies (#8281) ([3d7002a](https://github.com/vitejs/vite-plugin-vue/commit/3d7002a)), closes [#8281](https://github.com/vitejs/vite-plugin-vue/issues/8281)
* fix(deps): update all non-major dependencies (#8391) ([87e0141](https://github.com/vitejs/vite-plugin-vue/commit/87e0141)), closes [#8391](https://github.com/vitejs/vite-plugin-vue/issues/8391)
* fix(deps): update all non-major dependencies (#8802) ([7082ccf](https://github.com/vitejs/vite-plugin-vue/commit/7082ccf)), closes [#8802](https://github.com/vitejs/vite-plugin-vue/issues/8802)
* fix(deps): update all non-major dependencies (#9985) ([cc26fd3](https://github.com/vitejs/vite-plugin-vue/commit/cc26fd3)), closes [#9985](https://github.com/vitejs/vite-plugin-vue/issues/9985)
* fix(deps): update rollup to `^2.79.1` (#10298) ([f16e0f0](https://github.com/vitejs/vite-plugin-vue/commit/f16e0f0)), closes [#10298](https://github.com/vitejs/vite-plugin-vue/issues/10298)
* fix(esbuild): transpile with esnext in dev (#10207) ([f5a3481](https://github.com/vitejs/vite-plugin-vue/commit/f5a3481)), closes [#10207](https://github.com/vitejs/vite-plugin-vue/issues/10207)
* fix(plugin-vue): add newline character before class components, fix #2787 (#2933) ([05f88e7](https://github.com/vitejs/vite-plugin-vue/commit/05f88e7)), closes [#2787](https://github.com/vitejs/vite-plugin-vue/issues/2787) [#2933](https://github.com/vitejs/vite-plugin-vue/issues/2933)
* fix(plugin-vue): allow overwriting template.transformAssetUrls.includeAbsolute (fix #4836) (#6779) ([74bb93c](https://github.com/vitejs/vite-plugin-vue/commit/74bb93c)), closes [#4836](https://github.com/vitejs/vite-plugin-vue/issues/4836) [#6779](https://github.com/vitejs/vite-plugin-vue/issues/6779)
* fix(plugin-vue): allow to overwrite feature flags (#2675) ([f13ec43](https://github.com/vitejs/vite-plugin-vue/commit/f13ec43)), closes [#2675](https://github.com/vitejs/vite-plugin-vue/issues/2675)
* fix(plugin-vue): avoid applying ref transform to dependencies by default ([9a0c54a](https://github.com/vitejs/vite-plugin-vue/commit/9a0c54a))
* fix(plugin-vue): avoid duplicate import, fix #2640 (#2897) ([aa241e8](https://github.com/vitejs/vite-plugin-vue/commit/aa241e8)), closes [#2640](https://github.com/vitejs/vite-plugin-vue/issues/2640) [#2897](https://github.com/vitejs/vite-plugin-vue/issues/2897)
* fix(plugin-vue): avoid throwing on never requested file ([0661306](https://github.com/vitejs/vite-plugin-vue/commit/0661306))
* fix(plugin-vue): compiler is null on rollup (#6566) ([91be66b](https://github.com/vitejs/vite-plugin-vue/commit/91be66b)), closes [#6566](https://github.com/vitejs/vite-plugin-vue/issues/6566)
* fix(plugin-vue): custom block prev handling ([dd80760](https://github.com/vitejs/vite-plugin-vue/commit/dd80760))
* fix(plugin-vue): default pug doctype ([667637f](https://github.com/vitejs/vite-plugin-vue/commit/667637f)), closes [#1383](https://github.com/vitejs/vite-plugin-vue/issues/1383)
* fix(plugin-vue): don't inline ts scripts during build (#7909) ([77310fc](https://github.com/vitejs/vite-plugin-vue/commit/77310fc)), closes [#7909](https://github.com/vitejs/vite-plugin-vue/issues/7909)
* fix(plugin-vue): don't use object spread in the config hook (#5155) ([c88768b](https://github.com/vitejs/vite-plugin-vue/commit/c88768b)), closes [#5155](https://github.com/vitejs/vite-plugin-vue/issues/5155)
* fix(plugin-vue): enable ts in template also for lang=tsx ([8da60e3](https://github.com/vitejs/vite-plugin-vue/commit/8da60e3))
* fix(plugin-vue): enable ts in template when using tsx in dev mode (#10180) ([9897d98](https://github.com/vitejs/vite-plugin-vue/commit/9897d98)), closes [#10180](https://github.com/vitejs/vite-plugin-vue/issues/10180)
* fix(plugin-vue): ensure descriptor in case main request is cached ([5e6f6c9](https://github.com/vitejs/vite-plugin-vue/commit/5e6f6c9))
* fix(plugin-vue): ensure id on descriptor ([fe1848c](https://github.com/vitejs/vite-plugin-vue/commit/fe1848c))
* fix(plugin-vue): error.length is zero (#6106) ([8a9cc12](https://github.com/vitejs/vite-plugin-vue/commit/8a9cc12)), closes [#6106](https://github.com/vitejs/vite-plugin-vue/issues/6106)
* fix(plugin-vue): exclude direct css request from hmr target (#5422) ([16aa887](https://github.com/vitejs/vite-plugin-vue/commit/16aa887)), closes [#5422](https://github.com/vitejs/vite-plugin-vue/issues/5422)
* fix(plugin-vue): fix hmr issue in vuejs/vue-next#4358 ([7a52d98](https://github.com/vitejs/vite-plugin-vue/commit/7a52d98)), closes [vuejs/vue-next#4358](https://github.com/vuejs/vue-next/issues/4358)
* fix(plugin-vue): fix hmr when emptying sfc file (#2142) ([1153565](https://github.com/vitejs/vite-plugin-vue/commit/1153565)), closes [#2142](https://github.com/vitejs/vite-plugin-vue/issues/2142) [#2128](https://github.com/vitejs/vite-plugin-vue/issues/2128)
* fix(plugin-vue): fix sourcemap when no script block in sfc (close #8601) (#8604) ([66508cc](https://github.com/vitejs/vite-plugin-vue/commit/66508cc)), closes [#8601](https://github.com/vitejs/vite-plugin-vue/issues/8601) [#8604](https://github.com/vitejs/vite-plugin-vue/issues/8604)
* fix(plugin-vue): generate tree-shakable code ([07b1ca2](https://github.com/vitejs/vite-plugin-vue/commit/07b1ca2))
* fix(plugin-vue): handle block src pointing to dependency files ([31863d1](https://github.com/vitejs/vite-plugin-vue/commit/31863d1)), closes [#1812](https://github.com/vitejs/vite-plugin-vue/issues/1812)
* fix(plugin-vue): handle default rewrite edge case for commented class ([551ece9](https://github.com/vitejs/vite-plugin-vue/commit/551ece9)), closes [#2277](https://github.com/vitejs/vite-plugin-vue/issues/2277)
* fix(plugin-vue): handle rewrite default edge case with TS ([5104ee8](https://github.com/vitejs/vite-plugin-vue/commit/5104ee8))
* fix(plugin-vue): handle TS decorators in rewriteDefault fallback ([babf67e](https://github.com/vitejs/vite-plugin-vue/commit/babf67e))
* fix(plugin-vue): import vue file as raw correctly (#1923) ([863865e](https://github.com/vitejs/vite-plugin-vue/commit/863865e)), closes [#1923](https://github.com/vitejs/vite-plugin-vue/issues/1923)
* fix(plugin-vue): invalidate script module cache when it changed in hot update (#11059) ([0b3c22a](https://github.com/vitejs/vite-plugin-vue/commit/0b3c22a)), closes [#11059](https://github.com/vitejs/vite-plugin-vue/issues/11059)
* fix(plugin-vue): make cssm code tree shakeable (#6353) ([dac8075](https://github.com/vitejs/vite-plugin-vue/commit/dac8075)), closes [#6353](https://github.com/vitejs/vite-plugin-vue/issues/6353)
* fix(plugin-vue): mark SFC compiler options as `Partial` (#1316) ([990f338](https://github.com/vitejs/vite-plugin-vue/commit/990f338)), closes [#1316](https://github.com/vitejs/vite-plugin-vue/issues/1316)
* fix(plugin-vue): misleading error thrown after refresh or hmr (#5870) ([8bc76eb](https://github.com/vitejs/vite-plugin-vue/commit/8bc76eb)), closes [#5870](https://github.com/vitejs/vite-plugin-vue/issues/5870)
* fix(plugin-vue): multiple vue files using the same src file (fix #5925, #5447) (#5994) ([41b5d76](https://github.com/vitejs/vite-plugin-vue/commit/41b5d76)), closes [#5925](https://github.com/vitejs/vite-plugin-vue/issues/5925) [#5447](https://github.com/vitejs/vite-plugin-vue/issues/5447) [#5994](https://github.com/vitejs/vite-plugin-vue/issues/5994)
* fix(plugin-vue): pass on script and style options to compiler-sfc ([0ec86cc](https://github.com/vitejs/vite-plugin-vue/commit/0ec86cc)), closes [#1450](https://github.com/vitejs/vite-plugin-vue/issues/1450)
* fix(plugin-vue): properly handle in-template TS syntax + tests ([e950c6e](https://github.com/vitejs/vite-plugin-vue/commit/e950c6e))
* fix(plugin-vue): regenerate scoped css in build watch, fix #7980 (#7989) ([e57af2e](https://github.com/vitejs/vite-plugin-vue/commit/e57af2e)), closes [#7980](https://github.com/vitejs/vite-plugin-vue/issues/7980) [#7989](https://github.com/vitejs/vite-plugin-vue/issues/7989)
* fix(plugin-vue): respect __VUE_PROD_DEVTOOLS__ setting (#4984) ([01bdac9](https://github.com/vitejs/vite-plugin-vue/commit/01bdac9)), closes [#4984](https://github.com/vitejs/vite-plugin-vue/issues/4984)
* fix(plugin-vue): respect `hmr: false` server config, fix #2790 (#2797) ([74b5993](https://github.com/vitejs/vite-plugin-vue/commit/74b5993)), closes [#2790](https://github.com/vitejs/vite-plugin-vue/issues/2790) [#2797](https://github.com/vitejs/vite-plugin-vue/issues/2797)
* fix(plugin-vue): rewrite default after ts compiled (#3591) ([b63a7a9](https://github.com/vitejs/vite-plugin-vue/commit/b63a7a9)), closes [#3591](https://github.com/vitejs/vite-plugin-vue/issues/3591)
* fix(plugin-vue): setup jsx script no hmr (#6568) ([154440e](https://github.com/vitejs/vite-plugin-vue/commit/154440e)), closes [#6568](https://github.com/vitejs/vite-plugin-vue/issues/6568)
* fix(plugin-vue): sfc src import respect alias (#1544) ([c562500](https://github.com/vitejs/vite-plugin-vue/commit/c562500)), closes [#1544](https://github.com/vitejs/vite-plugin-vue/issues/1544) [#1542](https://github.com/vitejs/vite-plugin-vue/issues/1542)
* fix(plugin-vue): special handling for class default export in sfc ([4b8267d](https://github.com/vitejs/vite-plugin-vue/commit/4b8267d)), closes [#1476](https://github.com/vitejs/vite-plugin-vue/issues/1476)
* fix(plugin-vue): support scss/sass/less... hmr on custom template languages (fix #10677) (#10844) ([f2d1d29](https://github.com/vitejs/vite-plugin-vue/commit/f2d1d29)), closes [#10677](https://github.com/vitejs/vite-plugin-vue/issues/10677) [#10844](https://github.com/vitejs/vite-plugin-vue/issues/10844)
* fix(plugin-vue): template src isn't working when script setup (#5418) ([3f4cf82](https://github.com/vitejs/vite-plugin-vue/commit/3f4cf82)), closes [#5418](https://github.com/vitejs/vite-plugin-vue/issues/5418)
* fix(plugin-vue): trigger css hmr on custom template languages (#6987) ([4980edd](https://github.com/vitejs/vite-plugin-vue/commit/4980edd)), closes [#6987](https://github.com/vitejs/vite-plugin-vue/issues/6987)
* fix(plugin-vue): use __vccOpts for vue-class-component (#5374) ([01a6e4b](https://github.com/vitejs/vite-plugin-vue/commit/01a6e4b)), closes [#5374](https://github.com/vitejs/vite-plugin-vue/issues/5374)
* fix(plugin-vue): use server.origin when building base for transformAssetUrls (#8077) ([e7b414e](https://github.com/vitejs/vite-plugin-vue/commit/e7b414e)), closes [#8077](https://github.com/vitejs/vite-plugin-vue/issues/8077)
* fix(plugin-vue): user defined transformAssetUrls ignored in production build (#7171) ([d07e814](https://github.com/vitejs/vite-plugin-vue/commit/d07e814)), closes [#7171](https://github.com/vitejs/vite-plugin-vue/issues/7171)
* fix(ssr): normalize manifest filenames (#3706) ([64ec27b](https://github.com/vitejs/vite-plugin-vue/commit/64ec27b)), closes [#3706](https://github.com/vitejs/vite-plugin-vue/issues/3706) [#3303](https://github.com/vitejs/vite-plugin-vue/issues/3303)
* fix(vue): handle undefined on import.meta.hot.accept (fixes #8625) (#9011) ([8de9fa2](https://github.com/vitejs/vite-plugin-vue/commit/8de9fa2)), closes [#8625](https://github.com/vitejs/vite-plugin-vue/issues/8625) [#9011](https://github.com/vitejs/vite-plugin-vue/issues/9011)
* fix(vue): remove ssr.external config (#9128) ([3f80108](https://github.com/vitejs/vite-plugin-vue/commit/3f80108)), closes [#9128](https://github.com/vitejs/vite-plugin-vue/issues/9128)
* fix(vue): same src file request same key (#8059) ([34632b0](https://github.com/vitejs/vite-plugin-vue/commit/34632b0)), closes [#8059](https://github.com/vitejs/vite-plugin-vue/issues/8059)
* fix(vue): skip url query request (fixes #10863) (#10920) ([3e23e6c](https://github.com/vitejs/vite-plugin-vue/commit/3e23e6c)), closes [#10863](https://github.com/vitejs/vite-plugin-vue/issues/10863) [#10920](https://github.com/vitejs/vite-plugin-vue/issues/10920)
* feat: bump minimum node version to 14.18.0 (#8662) ([d956094](https://github.com/vitejs/vite-plugin-vue/commit/d956094)), closes [#8662](https://github.com/vitejs/vite-plugin-vue/issues/8662)
* feat: css sourcemap support during dev (#7173) ([9c5103a](https://github.com/vitejs/vite-plugin-vue/commit/9c5103a)), closes [#7173](https://github.com/vitejs/vite-plugin-vue/issues/7173)
* feat: custom blocks ([03f24f2](https://github.com/vitejs/vite-plugin-vue/commit/03f24f2))
* feat: dedupe the `vue` in client bundle by default (#11032) ([33c599d](https://github.com/vitejs/vite-plugin-vue/commit/33c599d)), closes [#11032](https://github.com/vitejs/vite-plugin-vue/issues/11032)
* feat: experimental.buildAdvancedBaseOptions (#8450) ([ab7150f](https://github.com/vitejs/vite-plugin-vue/commit/ab7150f)), closes [#8450](https://github.com/vitejs/vite-plugin-vue/issues/8450)
* feat: expose createFilter util (#8562) ([cd6c2a8](https://github.com/vitejs/vite-plugin-vue/commit/cd6c2a8)), closes [#8562](https://github.com/vitejs/vite-plugin-vue/issues/8562)
* feat: import ts with .js in vue (#7998) ([efec835](https://github.com/vitejs/vite-plugin-vue/commit/efec835)), closes [#7998](https://github.com/vitejs/vite-plugin-vue/issues/7998)
* feat: rollup 3 (#9870) ([c84de99](https://github.com/vitejs/vite-plugin-vue/commit/c84de99)), closes [#9870](https://github.com/vitejs/vite-plugin-vue/issues/9870)
* feat: ssr manifest for preload inference ([1506285](https://github.com/vitejs/vite-plugin-vue/commit/1506285))
* feat: support `base` option during dev, deprecate `build.base` (#1556) ([ba4bce2](https://github.com/vitejs/vite-plugin-vue/commit/ba4bce2)), closes [#1556](https://github.com/vitejs/vite-plugin-vue/issues/1556)
* feat: support object style hooks (#9634) ([c744274](https://github.com/vitejs/vite-plugin-vue/commit/c744274)), closes [#9634](https://github.com/vitejs/vite-plugin-vue/issues/9634)
* feat(css): css.devSourcemap option (#7471) ([adbaa94](https://github.com/vitejs/vite-plugin-vue/commit/adbaa94)), closes [#7471](https://github.com/vitejs/vite-plugin-vue/issues/7471)
* feat(plugin-vue): add `reactivityTransform` option. ([b873333](https://github.com/vitejs/vite-plugin-vue/commit/b873333))
* feat(plugin-vue): enable :slotted usage detection ([8ceac0c](https://github.com/vitejs/vite-plugin-vue/commit/8ceac0c))
* feat(plugin-vue): export vue query parse API (#1303) ([96d21ce](https://github.com/vitejs/vite-plugin-vue/commit/96d21ce)), closes [#1303](https://github.com/vitejs/vite-plugin-vue/issues/1303)
* feat(plugin-vue): latest ref transform support ([326b382](https://github.com/vitejs/vite-plugin-vue/commit/326b382))
* feat(plugin-vue): support for vite core new ssr impl ([7f7e913](https://github.com/vitejs/vite-plugin-vue/commit/7f7e913))
* feat(plugin-vue): support importing vue files as custom elements ([1ba31c4](https://github.com/vitejs/vite-plugin-vue/commit/1ba31c4))
* feat(plugin-vue): support optional @vue/compiler-sfc peer dep ([d18ab9e](https://github.com/vitejs/vite-plugin-vue/commit/d18ab9e))
* feat(plugin-vue): support TS in template expressions ([decc925](https://github.com/vitejs/vite-plugin-vue/commit/decc925))
* feat(plugin-vue): warn compiler-sfc version mismatch ([dce80c6](https://github.com/vitejs/vite-plugin-vue/commit/dce80c6))
* perf: regexp perf issues, refactor regexp stylistic issues (#10905) ([086dc36](https://github.com/vitejs/vite-plugin-vue/commit/086dc36)), closes [#10905](https://github.com/vitejs/vite-plugin-vue/issues/10905)
* perf(plugin-vue): inline main script for build + avoid sourcemap generation when possible ([7c26da7](https://github.com/vitejs/vite-plugin-vue/commit/7c26da7))
* refactor: adjust custom element mode behavior ([083c9c8](https://github.com/vitejs/vite-plugin-vue/commit/083c9c8))
* refactor: improve vue compiler error reporting ([4218fd9](https://github.com/vitejs/vite-plugin-vue/commit/4218fd9))
* refactor: more explicit ssr external control via options ([2527a9d](https://github.com/vitejs/vite-plugin-vue/commit/2527a9d))
* refactor: re-organize into monorepo ([629302b](https://github.com/vitejs/vite-plugin-vue/commit/629302b))
* refactor: remove hooks ssr param support (#8491) ([83f3dce](https://github.com/vitejs/vite-plugin-vue/commit/83f3dce)), closes [#8491](https://github.com/vitejs/vite-plugin-vue/issues/8491)
* refactor: simplify array handling (#5734) ([c26f6ec](https://github.com/vitejs/vite-plugin-vue/commit/c26f6ec)), closes [#5734](https://github.com/vitejs/vite-plugin-vue/issues/5734)
* refactor: source map tweaks ([31f5bfe](https://github.com/vitejs/vite-plugin-vue/commit/31f5bfe)), closes [#1677](https://github.com/vitejs/vite-plugin-vue/issues/1677)
* refactor: use node hash (#7975) ([471cc9e](https://github.com/vitejs/vite-plugin-vue/commit/471cc9e)), closes [#7975](https://github.com/vitejs/vite-plugin-vue/issues/7975)
* refactor(hmr): pass context object to `handleHotUpdate` plugin hook ([6c26125](https://github.com/vitejs/vite-plugin-vue/commit/6c26125))
* refactor(plugin-vue): ensure style processing in custom elements mode ([8b232a7](https://github.com/vitejs/vite-plugin-vue/commit/8b232a7))
* refactor(plugin-vue): remove querystring import (#7997) ([329b844](https://github.com/vitejs/vite-plugin-vue/commit/329b844)), closes [#7997](https://github.com/vitejs/vite-plugin-vue/issues/7997)
* refactor(plugin-vue): resolve vue/compiler-sfc from project root ([b9171dd](https://github.com/vitejs/vite-plugin-vue/commit/b9171dd))
* refactor(plugin-vue): respect customElment: false ([f6a91f0](https://github.com/vitejs/vite-plugin-vue/commit/f6a91f0))
* refactor(types): bundle client types (#9966) ([619615c](https://github.com/vitejs/vite-plugin-vue/commit/619615c)), closes [#9966](https://github.com/vitejs/vite-plugin-vue/issues/9966)
* refactor(vue): limit passable compilerOptions (#8994) ([26510c9](https://github.com/vitejs/vite-plugin-vue/commit/26510c9)), closes [#8994](https://github.com/vitejs/vite-plugin-vue/issues/8994)
* build!: bump targets (#8045) ([c5f46d2](https://github.com/vitejs/vite-plugin-vue/commit/c5f46d2)), closes [#8045](https://github.com/vitejs/vite-plugin-vue/issues/8045)
* build!: remove node v12 support (#7833) ([bc43220](https://github.com/vitejs/vite-plugin-vue/commit/bc43220)), closes [#7833](https://github.com/vitejs/vite-plugin-vue/issues/7833)
* feat!: migrate to ESM (#8178) ([f61d065](https://github.com/vitejs/vite-plugin-vue/commit/f61d065)), closes [#8178](https://github.com/vitejs/vite-plugin-vue/issues/8178)
* refactor!: plugin hooks ssr param to object (#5253) ([7da0563](https://github.com/vitejs/vite-plugin-vue/commit/7da0563)), closes [#5253](https://github.com/vitejs/vite-plugin-vue/issues/5253)
* v1.0.1 ([797da60](https://github.com/vitejs/vite-plugin-vue/commit/797da60))
* v1.0.2 ([e258d81](https://github.com/vitejs/vite-plugin-vue/commit/e258d81))
* workflow: adjust release setup ([2de3222](https://github.com/vitejs/vite-plugin-vue/commit/2de3222))
* workflow: separate version bumping and publishing on release (#6879) ([8013d90](https://github.com/vitejs/vite-plugin-vue/commit/8013d90)), closes [#6879](https://github.com/vitejs/vite-plugin-vue/issues/6879)
* workflow: switch to pnpm (#5060) ([ad6047d](https://github.com/vitejs/vite-plugin-vue/commit/ad6047d)), closes [#5060](https://github.com/vitejs/vite-plugin-vue/issues/5060)
* build: build for plugin-vue ([88571bb](https://github.com/vitejs/vite-plugin-vue/commit/88571bb))
* build(plugin-vue): fix build script ([b3ff091](https://github.com/vitejs/vite-plugin-vue/commit/b3ff091))
* wip: asset resolution and tests ([7b1b5a0](https://github.com/vitejs/vite-plugin-vue/commit/7b1b5a0))
* wip: automatic ssr externals inference ([96bce09](https://github.com/vitejs/vite-plugin-vue/commit/96bce09))
* wip: css asset url rewrite ([7680773](https://github.com/vitejs/vite-plugin-vue/commit/7680773))
* wip: fix template pre-processor handling ([d1def7d](https://github.com/vitejs/vite-plugin-vue/commit/d1def7d))
* wip: more vitepress tweaks ([76c21ff](https://github.com/vitejs/vite-plugin-vue/commit/76c21ff))
* wip: optimize vue relative asset reference + handle out of root assets ([2a61dd7](https://github.com/vitejs/vite-plugin-vue/commit/2a61dd7))
* wip: port rollup-plugin-vue to vite plugin ([bb0c105](https://github.com/vitejs/vite-plugin-vue/commit/bb0c105))
* wip: remove debugger, define vue flags in plugin ([31a9c90](https://github.com/vitejs/vite-plugin-vue/commit/31a9c90))
* wip: setup basic testing, refactor server api ([7335861](https://github.com/vitejs/vite-plugin-vue/commit/7335861))
* wip: tweaks for vitepress ([49dac87](https://github.com/vitejs/vite-plugin-vue/commit/49dac87))
* test: vue src imports ([7ef0acf](https://github.com/vitejs/vite-plugin-vue/commit/7ef0acf))


### BREAKING CHANGE

* `handleHotUpdate` plugin hook now receives a single
`HmrContext` argument instead of multiple args.
* `refTransform` option has been replaced by
`reactivityTransform` option. Now also requires vue@^3.2.25.
* now requires vue@^3.2.13 as peer dep


## 4.0.0-alpha.2 (2022-11-30)

* docs(plugin-vue): update options in README (#11125) ([23d79b8](https://github.com/vitejs/vite/commit/23d79b8)), closes [#11125](https://github.com/vitejs/vite/issues/11125)
* fix(plugin-vue): invalidate script module cache when it changed in hot update (#11059) ([9d0b9d8](https://github.com/vitejs/vite/commit/9d0b9d8)), closes [#11059](https://github.com/vitejs/vite/issues/11059)
* fix(plugin-vue): support scss/sass/less... hmr on custom template languages (fix #10677) (#10844) ([d413848](https://github.com/vitejs/vite/commit/d413848)), closes [#10677](https://github.com/vitejs/vite/issues/10677) [#10844](https://github.com/vitejs/vite/issues/10844)



## 4.0.0-alpha.1 (2022-11-22)

* feat: dedupe the `vue` in client bundle by default (#11032) ([fae0e23](https://github.com/vitejs/vite/commit/fae0e23)), closes [#11032](https://github.com/vitejs/vite/issues/11032)



## 4.0.0-alpha.0 (2022-11-15)

* fix: handle HMR for Vue SFC with query parameters (fix #9341) (#10794) ([6462ab0](https://github.com/vitejs/vite/commit/6462ab0)), closes [#9341](https://github.com/vitejs/vite/issues/9341) [#10794](https://github.com/vitejs/vite/issues/10794)
* fix(vue): skip url query request (fixes #10863) (#10920) ([97d200c](https://github.com/vitejs/vite/commit/97d200c)), closes [#10863](https://github.com/vitejs/vite/issues/10863) [#10920](https://github.com/vitejs/vite/issues/10920)
* chore(deps): update all non-major dependencies (#10910) ([f6ad607](https://github.com/vitejs/vite/commit/f6ad607)), closes [#10910](https://github.com/vitejs/vite/issues/10910)
* chore(deps): update to rollup 3.3 (#10890) ([2d17aa2](https://github.com/vitejs/vite/commit/2d17aa2)), closes [#10890](https://github.com/vitejs/vite/issues/10890)
* perf: regexp perf issues, refactor regexp stylistic issues (#10905) ([fc007df](https://github.com/vitejs/vite/commit/fc007df)), closes [#10905](https://github.com/vitejs/vite/issues/10905)
* docs(plugin-vue): add link to plugin-vue-jsx (#10830) ([0c295e0](https://github.com/vitejs/vite/commit/0c295e0)), closes [#10830](https://github.com/vitejs/vite/issues/10830)
* feat: rollup 3 (#9870) ([beb7166](https://github.com/vitejs/vite/commit/beb7166)), closes [#9870](https://github.com/vitejs/vite/issues/9870)



## 3.2.0 (2022-10-26)

* chore(deps): update all non-major dependencies (#10393) ([f519423](https://github.com/vitejs/vite/commit/f519423)), closes [#10393](https://github.com/vitejs/vite/issues/10393)
* chore(deps): update all non-major dependencies (#10488) ([15aa827](https://github.com/vitejs/vite/commit/15aa827)), closes [#10488](https://github.com/vitejs/vite/issues/10488)
* fix(plugin-vue): enable ts in template when using tsx in dev mode (#10180) ([a9f9d31](https://github.com/vitejs/vite/commit/a9f9d31)), closes [#10180](https://github.com/vitejs/vite/issues/10180)
* docs: add missing binding in asset import example (#10414) ([d7ac96d](https://github.com/vitejs/vite/commit/d7ac96d)), closes [#10414](https://github.com/vitejs/vite/issues/10414)



## 3.2.0-beta.0 (2022-10-05)

* fix(deps): update all non-major dependencies (#10077) ([caf00c8](https://github.com/vitejs/vite/commit/caf00c8)), closes [#10077](https://github.com/vitejs/vite/issues/10077)
* fix(deps): update all non-major dependencies (#10316) ([a38b450](https://github.com/vitejs/vite/commit/a38b450)), closes [#10316](https://github.com/vitejs/vite/issues/10316)
* fix(deps): update all non-major dependencies (#9985) ([855f2f0](https://github.com/vitejs/vite/commit/855f2f0)), closes [#9985](https://github.com/vitejs/vite/issues/9985)
* fix(deps): update rollup to `^2.79.1` (#10298) ([2266d83](https://github.com/vitejs/vite/commit/2266d83)), closes [#10298](https://github.com/vitejs/vite/issues/10298)
* fix(esbuild): transpile with esnext in dev (#10207) ([43b7b78](https://github.com/vitejs/vite/commit/43b7b78)), closes [#10207](https://github.com/vitejs/vite/issues/10207)
* chore(deps): update dependency slash to v5 (#10317) ([9d87c11](https://github.com/vitejs/vite/commit/9d87c11)), closes [#10317](https://github.com/vitejs/vite/issues/10317)
* refactor(types): bundle client types (#9966) ([da632bf](https://github.com/vitejs/vite/commit/da632bf)), closes [#9966](https://github.com/vitejs/vite/issues/9966)



## 3.1.0 (2022-09-05)




## 3.1.0-beta.0 (2022-08-29)

* docs: fix typo (#9855) ([583f185](https://github.com/vitejs/vite/commit/583f185)), closes [#9855](https://github.com/vitejs/vite/issues/9855)
* feat: support object style hooks (#9634) ([757a92f](https://github.com/vitejs/vite/commit/757a92f)), closes [#9634](https://github.com/vitejs/vite/issues/9634)
* chore: fix typo (#9684) ([d30f881](https://github.com/vitejs/vite/commit/d30f881)), closes [#9684](https://github.com/vitejs/vite/issues/9684)
* chore(deps): update all non-major dependencies (#9675) ([4e56e87](https://github.com/vitejs/vite/commit/4e56e87)), closes [#9675](https://github.com/vitejs/vite/issues/9675)
* chore(plugin-vue): update reactivityTransform comment docs [ci skip] ([d04784b](https://github.com/vitejs/vite/commit/d04784b))



## <small>3.0.3 (2022-08-12)</small>




## <small>3.0.2 (2022-08-11)</small>

* chore: fix code typos (#9033) ([ed02861](https://github.com/vitejs/vite/commit/ed02861)), closes [#9033](https://github.com/vitejs/vite/issues/9033)
* chore: narrow down rollup version (#9637) ([fcf4d98](https://github.com/vitejs/vite/commit/fcf4d98)), closes [#9637](https://github.com/vitejs/vite/issues/9637)



## <small>3.0.1 (2022-07-18)</small>

* fix: mention that Node.js 13/15 support is dropped (fixes #9113) (#9116) ([2826303](https://github.com/vitejs/vite/commit/2826303)), closes [#9113](https://github.com/vitejs/vite/issues/9113) [#9116](https://github.com/vitejs/vite/issues/9116)
* fix(vue): remove ssr.external config (#9128) ([ec91f98](https://github.com/vitejs/vite/commit/ec91f98)), closes [#9128](https://github.com/vitejs/vite/issues/9128)
* refactor(vue): limit passable compilerOptions (#8994) ([b7b3e65](https://github.com/vitejs/vite/commit/b7b3e65)), closes [#8994](https://github.com/vitejs/vite/issues/8994)



## 3.0.0 (2022-07-13)

* chore: 3.0 release notes and bump peer deps (#9072) ([427ba26](https://github.com/vitejs/vite/commit/427ba26)), closes [#9072](https://github.com/vitejs/vite/issues/9072)
* fix(vue): handle undefined on import.meta.hot.accept (fixes #8625) (#9011) ([70af44a](https://github.com/vitejs/vite/commit/70af44a)), closes [#8625](https://github.com/vitejs/vite/issues/8625) [#9011](https://github.com/vitejs/vite/issues/9011)
* docs: cleanup changes (#8989) ([07aef1b](https://github.com/vitejs/vite/commit/07aef1b)), closes [#8989](https://github.com/vitejs/vite/issues/8989)



## 3.0.0-beta.1 (2022-07-06)

* fix(deps): update all non-major dependencies (#8802) ([a4a634d](https://github.com/vitejs/vite/commit/a4a634d)), closes [#8802](https://github.com/vitejs/vite/issues/8802)
* fix(plugin-vue): handle TS decorators in rewriteDefault fallback ([cb0c76a](https://github.com/vitejs/vite/commit/cb0c76a))
* chore: use `tsx` directly instead of indirect `esno` (#8773) ([f018f13](https://github.com/vitejs/vite/commit/f018f13)), closes [#8773](https://github.com/vitejs/vite/issues/8773)
* chore(plugin-vue): mark export helper with null byte (#8792) ([8de4319](https://github.com/vitejs/vite/commit/8de4319)), closes [#8792](https://github.com/vitejs/vite/issues/8792)



## 3.0.0-beta.0 (2022-06-21)

* feat: bump minimum node version to 14.18.0 (#8662) ([8a05432](https://github.com/vitejs/vite/commit/8a05432)), closes [#8662](https://github.com/vitejs/vite/issues/8662)
* feat: experimental.buildAdvancedBaseOptions (#8450) ([8ef7333](https://github.com/vitejs/vite/commit/8ef7333)), closes [#8450](https://github.com/vitejs/vite/issues/8450)
* chore: use node prefix (#8309) ([60721ac](https://github.com/vitejs/vite/commit/60721ac)), closes [#8309](https://github.com/vitejs/vite/issues/8309)



## 3.0.0-alpha.2 (2022-06-19)

* fix(deps): update all non-major dependencies (#8281) ([c68db4d](https://github.com/vitejs/vite/commit/c68db4d)), closes [#8281](https://github.com/vitejs/vite/issues/8281)
* fix(deps): update all non-major dependencies (#8391) ([842f995](https://github.com/vitejs/vite/commit/842f995)), closes [#8391](https://github.com/vitejs/vite/issues/8391)
* fix(plugin-vue): fix sourcemap when no script block in sfc (close #8601) (#8604) ([ccfccec](https://github.com/vitejs/vite/commit/ccfccec)), closes [#8601](https://github.com/vitejs/vite/issues/8601) [#8604](https://github.com/vitejs/vite/issues/8604)
* chore: enable reportUnusedDisableDirectives (#8384) ([9a99bc4](https://github.com/vitejs/vite/commit/9a99bc4)), closes [#8384](https://github.com/vitejs/vite/issues/8384)
* chore: update major deps (#8572) ([0e20949](https://github.com/vitejs/vite/commit/0e20949)), closes [#8572](https://github.com/vitejs/vite/issues/8572)
* chore: use `esno` to replace `ts-node` (#8162) ([c18a5f3](https://github.com/vitejs/vite/commit/c18a5f3)), closes [#8162](https://github.com/vitejs/vite/issues/8162)
* chore(deps): update all non-major dependencies (#8474) ([6d0ede7](https://github.com/vitejs/vite/commit/6d0ede7)), closes [#8474](https://github.com/vitejs/vite/issues/8474)
* feat: expose createFilter util (#8562) ([c5c424a](https://github.com/vitejs/vite/commit/c5c424a)), closes [#8562](https://github.com/vitejs/vite/issues/8562)
* refactor: remove hooks ssr param support (#8491) ([f59adf8](https://github.com/vitejs/vite/commit/f59adf8)), closes [#8491](https://github.com/vitejs/vite/issues/8491)
* feat!: migrate to ESM (#8178) ([76fdc27](https://github.com/vitejs/vite/commit/76fdc27)), closes [#8178](https://github.com/vitejs/vite/issues/8178)



## 3.0.0-alpha.1 (2022-05-19)

* fix: rewrite CJS specific funcs/vars in plugins (#8227) ([9baa70b](https://github.com/vitejs/vite/commit/9baa70b)), closes [#8227](https://github.com/vitejs/vite/issues/8227)
* fix(plugin-vue): regenerate scoped css in build watch, fix #7980 (#7989) ([dc00225](https://github.com/vitejs/vite/commit/dc00225)), closes [#7980](https://github.com/vitejs/vite/issues/7980) [#7989](https://github.com/vitejs/vite/issues/7989)
* fix(plugin-vue): use server.origin when building base for transformAssetUrls (#8077) ([2f7a490](https://github.com/vitejs/vite/commit/2f7a490)), closes [#8077](https://github.com/vitejs/vite/issues/8077)
* build!: bump targets (#8045) ([66efd69](https://github.com/vitejs/vite/commit/66efd69)), closes [#8045](https://github.com/vitejs/vite/issues/8045)
* chore: enable `import/no-duplicates` eslint rule (#8199) ([11243de](https://github.com/vitejs/vite/commit/11243de)), closes [#8199](https://github.com/vitejs/vite/issues/8199)
* docs(plugin-vue): clarify asset url handling (#8184) ([32c75e2](https://github.com/vitejs/vite/commit/32c75e2)), closes [#8184](https://github.com/vitejs/vite/issues/8184)



## 3.0.0-alpha.0 (2022-05-13)

* chore: bump minors and rebuild lock (#8074) ([aeb5b74](https://github.com/vitejs/vite/commit/aeb5b74)), closes [#8074](https://github.com/vitejs/vite/issues/8074)
* chore: revert vitejs/vite#8152 (#8161) ([85b8b55](https://github.com/vitejs/vite/commit/85b8b55)), closes [vitejs/vite#8152](https://github.com/vitejs/vite/issues/8152) [#8161](https://github.com/vitejs/vite/issues/8161)
* chore: update plugins peer deps ([d57c23c](https://github.com/vitejs/vite/commit/d57c23c))
* chore: upgrade to pnpm v7 (#8041) ([50f8f3b](https://github.com/vitejs/vite/commit/50f8f3b)), closes [#8041](https://github.com/vitejs/vite/issues/8041)
* chore: use `unbuild` to bundle plugins (#8139) ([638b168](https://github.com/vitejs/vite/commit/638b168)), closes [#8139](https://github.com/vitejs/vite/issues/8139)
* chore(deps): use `esno` to replace `ts-node` (#8152) ([2363bd3](https://github.com/vitejs/vite/commit/2363bd3)), closes [#8152](https://github.com/vitejs/vite/issues/8152)
* chore(lint): sort for imports (#8113) ([43a58dd](https://github.com/vitejs/vite/commit/43a58dd)), closes [#8113](https://github.com/vitejs/vite/issues/8113)
* chore(plugin-vue): change @rollup/pluginutils to dep from devDep (#8154) ([dcc8ea4](https://github.com/vitejs/vite/commit/dcc8ea4)), closes [#8154](https://github.com/vitejs/vite/issues/8154)
* chore(plugin-vue): replace source-map with gen/trace-mapping (#8155) ([79a8c85](https://github.com/vitejs/vite/commit/79a8c85)), closes [#8155](https://github.com/vitejs/vite/issues/8155)
* fix(plugin-vue): allow overwriting template.transformAssetUrls.includeAbsolute (fix #4836) (#6779) ([e0fe200](https://github.com/vitejs/vite/commit/e0fe200)), closes [#4836](https://github.com/vitejs/vite/issues/4836) [#6779](https://github.com/vitejs/vite/issues/6779)
* fix(plugin-vue): don't inline ts scripts during build (#7909) ([ba6cae9](https://github.com/vitejs/vite/commit/ba6cae9)), closes [#7909](https://github.com/vitejs/vite/issues/7909)
* fix(plugin-vue): trigger css hmr on custom template languages (#6987) ([2289d04](https://github.com/vitejs/vite/commit/2289d04)), closes [#6987](https://github.com/vitejs/vite/issues/6987)
* fix(plugin-vue): user defined transformAssetUrls ignored in production build (#7171) ([bfab569](https://github.com/vitejs/vite/commit/bfab569)), closes [#7171](https://github.com/vitejs/vite/issues/7171)
* fix(vue): same src file request same key (#8059) ([4c54800](https://github.com/vitejs/vite/commit/4c54800)), closes [#8059](https://github.com/vitejs/vite/issues/8059)
* refactor: use node hash (#7975) ([5ce7c74](https://github.com/vitejs/vite/commit/5ce7c74)), closes [#7975](https://github.com/vitejs/vite/issues/7975)
* build!: remove node v12 support (#7833) ([eeac2d2](https://github.com/vitejs/vite/commit/eeac2d2)), closes [#7833](https://github.com/vitejs/vite/issues/7833)



## <small>2.3.2 (2022-05-04)</small>

* feat: import ts with .js in vue (#7998) ([9974094](https://github.com/vitejs/vite/commit/9974094)), closes [#7998](https://github.com/vitejs/vite/issues/7998)
* refactor(plugin-vue): remove querystring import (#7997) ([f3d15f1](https://github.com/vitejs/vite/commit/f3d15f1)), closes [#7997](https://github.com/vitejs/vite/issues/7997)
* chore(deps): update all non-major dependencies (#7780) ([eba9d05](https://github.com/vitejs/vite/commit/eba9d05)), closes [#7780](https://github.com/vitejs/vite/issues/7780)



## <small>2.3.1 (2022-03-30)</small>

* chore(plugin-vue): revert #7527, lower vite peer dep ([447bbeb](https://github.com/vitejs/vite/commit/447bbeb)), closes [#7527](https://github.com/vitejs/vite/issues/7527)



## 2.3.0 (2022-03-30)

* chore(plugin-vue): bump vite peer dep to 2.9.0 (#7472) ([12fd1d9](https://github.com/vitejs/vite/commit/12fd1d9)), closes [#7472](https://github.com/vitejs/vite/issues/7472)
* feat(css): css.devSourcemap option (#7471) ([57f14cb](https://github.com/vitejs/vite/commit/57f14cb)), closes [#7471](https://github.com/vitejs/vite/issues/7471)
* fix(plugin-vue): respect __VUE_PROD_DEVTOOLS__ setting (#4984) ([90e812a](https://github.com/vitejs/vite/commit/90e812a)), closes [#4984](https://github.com/vitejs/vite/issues/4984)



## 2.3.0-beta.0 (2022-03-22)

* fix(deps): update all non-major dependencies (#7392) ([b63fc3b](https://github.com/vitejs/vite/commit/b63fc3b)), closes [#7392](https://github.com/vitejs/vite/issues/7392)
* feat: css sourcemap support during dev (#7173) ([38a655f](https://github.com/vitejs/vite/commit/38a655f)), closes [#7173](https://github.com/vitejs/vite/issues/7173)
* chore(deps): update all non-major dependencies (#6905) ([839665c](https://github.com/vitejs/vite/commit/839665c)), closes [#6905](https://github.com/vitejs/vite/issues/6905)
* docs(vue): add transformAssetUrls example (#7232) ([08e928c](https://github.com/vitejs/vite/commit/08e928c)), closes [#7232](https://github.com/vitejs/vite/issues/7232)



## [2.2.4](https://github.com/vitejs/vite/compare/plugin-vue@2.2.3...plugin-vue@2.2.4) (2022-02-28)



## [2.2.3](https://github.com/vitejs/vite/compare/plugin-vue@2.2.2...plugin-vue@2.2.3) (2022-02-28)


### Bug Fixes

* **plugin-vue:** setup jsx script no hmr ([#6568](https://github.com/vitejs/vite/issues/6568)) ([c84601c](https://github.com/vitejs/vite/commit/c84601cee5232bad0f65c8fcc663e38bb457a0b3))



## [2.2.2](https://github.com/vitejs/vite/compare/plugin-vue@2.2.1...plugin-vue@2.2.2) (2022-02-18)



## [2.2.1](https://github.com/vitejs/vite/compare/plugin-vue@2.2.0...plugin-vue@2.2.1) (2022-02-18)


### Bug Fixes

* adjust vue template sourcemap ([#6972](https://github.com/vitejs/vite/issues/6972)) ([a774303](https://github.com/vitejs/vite/commit/a7743039f263f41e1c3971e324f893a5ef5e5508))
* **deps:** update all non-major dependencies ([#6782](https://github.com/vitejs/vite/issues/6782)) ([e38be3e](https://github.com/vitejs/vite/commit/e38be3e6ca7bf79319d5d7188e1d347b1d6091ef))



# [2.2.0](https://github.com/vitejs/vite/compare/plugin-vue@2.1.0...plugin-vue@2.2.0) (2022-02-09)


### Bug Fixes

* plugin-vue `options.compiler` field ([#6588](https://github.com/vitejs/vite/issues/6588)) ([caec019](https://github.com/vitejs/vite/commit/caec01998a9599d255761f3efc1c49827aadac0d)), closes [#6587](https://github.com/vitejs/vite/issues/6587)



# [2.1.0](https://github.com/vitejs/vite/compare/plugin-vue@2.0.1...plugin-vue@2.1.0) (2022-01-21)


### Bug Fixes

* **plugin-vue:** compiler is null on rollup ([#6566](https://github.com/vitejs/vite/issues/6566)) ([b289b2d](https://github.com/vitejs/vite/commit/b289b2d433f94949730e1f041f3c8e16c417e9d0))
* **plugin-vue:** make cssm code tree shakeable ([#6353](https://github.com/vitejs/vite/issues/6353)) ([3fb4118](https://github.com/vitejs/vite/commit/3fb4118026e2745140894afb9755298656750f43))
* update the vue version in the error message ([#6252](https://github.com/vitejs/vite/issues/6252)) ([6a47083](https://github.com/vitejs/vite/commit/6a47083df14cb8d2584a86abda8a5e89a731c170))



## [2.0.1](https://github.com/vitejs/vite/compare/plugin-vue@2.0.0...plugin-vue@2.0.1) (2021-12-14)


### Bug Fixes

* **plugin-vue:** error.length is zero ([#6106](https://github.com/vitejs/vite/issues/6106)) ([5ec49be](https://github.com/vitejs/vite/commit/5ec49befad4d7b5e7cc14f14520ba96d5b6f6d69))



# [2.0.0](https://github.com/vitejs/vite/compare/plugin-vue@1.10.2...plugin-vue@2.0.0) (2021-12-12)


### Bug Fixes

* allow overwriting `define` options in vue & vue-jsx plugins ([#6072](https://github.com/vitejs/vite/issues/6072)) ([5f3f6b7](https://github.com/vitejs/vite/commit/5f3f6b7b406cb3371084057c74814eb36175e5cf))
* **plugin-vue:** multiple vue files using the same src file (fix [#5925](https://github.com/vitejs/vite/issues/5925), [#5447](https://github.com/vitejs/vite/issues/5447)) ([#5994](https://github.com/vitejs/vite/issues/5994)) ([df7aec7](https://github.com/vitejs/vite/commit/df7aec7d2a567af1dfbab76e5765aba80dc3cb5c))


### Code Refactoring

* **plugin-vue:** resolve vue/compiler-sfc from project root ([ce8b0fe](https://github.com/vitejs/vite/commit/ce8b0feae334cc224b3f4d2fdb2bffbb62322acf))


### Features

* **plugin-vue:** add `reactivityTransform` option. ([955d0fe](https://github.com/vitejs/vite/commit/955d0fecd936b8175d7a7e4355eab855eb4567f8))


### BREAKING CHANGES

* **plugin-vue:** `refTransform` option has been replaced by
`reactivityTransform` option. Now also requires vue@^3.2.25.
* **plugin-vue:** now requires vue@^3.2.13 as peer dep



## [1.10.2](https://github.com/vitejs/vite/compare/plugin-vue@1.10.1...plugin-vue@1.10.2) (2021-12-07)


### Bug Fixes

* **plugin-vue:** misleading error thrown after refresh or hmr ([#5870](https://github.com/vitejs/vite/issues/5870)) ([5c07cec](https://github.com/vitejs/vite/commit/5c07cec7214948da73fbbc33c7f5c83bf7f6cd2e))



## [1.10.1](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0...plugin-vue@1.10.1) (2021-11-26)


### Bug Fixes

* **plugin-vue:** fix hmr issue in vuejs/core[#4358](https://github.com/vitejs/vite/issues/4358) ([709e4b0](https://github.com/vitejs/vite/commit/709e4b0428d8cdc8299b22898c76e58d66ca92c9))



# [1.10.0](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0-beta.1...plugin-vue@1.10.0) (2021-11-22)



# [1.10.0-beta.1](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0-beta.0...plugin-vue@1.10.0-beta.1) (2021-11-19)


### Bug Fixes

* plugin-vue dev scripts error in ssr-vue ([#5607](https://github.com/vitejs/vite/issues/5607)) ([502b8f2](https://github.com/vitejs/vite/commit/502b8f2b31f06d4e524d36b5566197db76f6ccda))
* **plugin-vue:** template src isn't working when script setup ([#5418](https://github.com/vitejs/vite/issues/5418)) ([518da44](https://github.com/vitejs/vite/commit/518da447e573b6f6ec5e2b1ca837332e0e230c14))
* **plugin-vue:** use __vccOpts for vue-class-component ([#5374](https://github.com/vitejs/vite/issues/5374)) ([c4f9db2](https://github.com/vitejs/vite/commit/c4f9db2cb375729b06f438298560045d4c488c14))



# [1.10.0-beta.0](https://github.com/vitejs/vite/compare/plugin-vue@1.9.4...plugin-vue@1.10.0-beta.0) (2021-10-28)



## [1.9.4](https://github.com/vitejs/vite/compare/plugin-vue@1.9.3...plugin-vue@1.9.4) (2021-10-27)


### Bug Fixes

* **plugin-vue:** exclude direct css request from hmr target ([#5422](https://github.com/vitejs/vite/issues/5422)) ([4331c26](https://github.com/vitejs/vite/commit/4331c26a5e5d7a9efc08a8b7bf7056785a1bcd94))



## [1.9.3](https://github.com/vitejs/vite/compare/plugin-vue@1.9.2...plugin-vue@1.9.3) (2021-10-05)


### Bug Fixes

* **plugin-vue:** don't use object spread in the config hook ([#5155](https://github.com/vitejs/vite/issues/5155)) ([c1ce471](https://github.com/vitejs/vite/commit/c1ce471c07264db034f42573662971f0dc531df7))



## [1.9.2](https://github.com/vitejs/vite/compare/plugin-vue@1.9.1...plugin-vue@1.9.2) (2021-09-24)


### Bug Fixes

* **plugin-vue:** handle rewrite default edge case with TS ([609a342](https://github.com/vitejs/vite/commit/609a342986b2d3b05ef59dc23523239938264008))


### Reverts

* Revert "feat(plugin-vue): define __VUE_SSR__ flag" ([3e2c1bf](https://github.com/vitejs/vite/commit/3e2c1bf74bb8ef583d66c67c715fdeae8d8fe432))



## [1.9.1](https://github.com/vitejs/vite/compare/plugin-vue@1.9.0...plugin-vue@1.9.1) (2021-09-23)


### Features

* ~~**plugin-vue:** define __VUE_SSR__ flag ([49618c1](https://github.com/vitejs/vite/commit/49618c17f38ee54ea17b4b04d58eb5fbf3e532fe))~~ (Reverted)



# [1.9.0](https://github.com/vitejs/vite/compare/plugin-vue@1.8.1...plugin-vue@1.9.0) (2021-09-21)


### Bug Fixes

* **plugin-vue:** enable ts in template also for lang=tsx ([ed88df3](https://github.com/vitejs/vite/commit/ed88df30a93d759e5c4ac0f079b9f604fad2ce40))


### Features

* **plugin-vue:** support optional @vue/compiler-sfc peer dep ([b17b5ae](https://github.com/vitejs/vite/commit/b17b5ae68de50413a95fb992ceda92ec0fceaa86))



## [1.8.1](https://github.com/vitejs/vite/compare/plugin-vue@1.8.0...plugin-vue@1.8.1) (2021-09-19)


### Bug Fixes

* **plugin-vue:** generate tree-shakable code ([316d7af](https://github.com/vitejs/vite/commit/316d7afc0c84e51359938a12ebe1b09ca34ea8bd))



# [1.8.0](https://github.com/vitejs/vite/compare/plugin-vue@1.7.1...plugin-vue@1.8.0) (2021-09-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#4545](https://github.com/vitejs/vite/issues/4545)) ([a44fd5d](https://github.com/vitejs/vite/commit/a44fd5d38679da0be2536103e83af730cda73a95))


### Performance Improvements

* **plugin-vue:** inline main script for build + avoid sourcemap generation when possible ([93d9a2d](https://github.com/vitejs/vite/commit/93d9a2d175b1a1e3fe54197856a86887b1dadb74))



## [1.7.1](https://github.com/vitejs/vite/compare/plugin-vue@1.7.0...plugin-vue@1.7.1) (2021-09-18)


### Bug Fixes

* **plugin-vue:** properly handle in-template TS syntax + tests ([0a2a5e1](https://github.com/vitejs/vite/commit/0a2a5e1c8b9d2765faecfb5e4641b1c5a94575e1))



# [1.7.0](https://github.com/vitejs/vite/compare/plugin-vue@1.6.2...plugin-vue@1.7.0) (2021-09-18)


### Features

* **plugin-vue:** support TS in template expressions ([01fa2ab](https://github.com/vitejs/vite/commit/01fa2abe901834c1c3168c343120429700e82983))



## [1.6.2](https://github.com/vitejs/vite/compare/plugin-vue@1.6.1...plugin-vue@1.6.2) (2021-09-08)


### Bug Fixes

* **plugin-vue:** ensure descriptor in case main request is cached ([85612fe](https://github.com/vitejs/vite/commit/85612fe69da98759dbf3b5352cf47a74f20374ff))



## [1.6.1](https://github.com/vitejs/vite/compare/plugin-vue@1.6.0...plugin-vue@1.6.1) (2021-09-06)


### Bug Fixes

* hmr doesn't work when modifying the code of jsx in sfc ([#4563](https://github.com/vitejs/vite/issues/4563)) ([1012367](https://github.com/vitejs/vite/commit/101236794c5d6d28591302d5552cb1c0ab8f4115))
* **plugin-vue:** avoid applying ref transform to dependencies by default ([cd4f341](https://github.com/vitejs/vite/commit/cd4f341201d5598c3ec9cc594949e7d5304ac7ec))



# [1.6.0](https://github.com/vitejs/vite/compare/plugin-vue@1.5.0...plugin-vue@1.6.0) (2021-08-24)


### Features

* **plugin-vue:** latest ref transform support ([533b002](https://github.com/vitejs/vite/commit/533b0029adc912257251b5021879ab1d676a16ab))
* **plugin-vue:** warn compiler-sfc version mismatch ([e7263b9](https://github.com/vitejs/vite/commit/e7263b98f2e174198b322d26c6a7207d706a6639))



# [1.5.0](https://github.com/vitejs/vite/compare/plugin-vue@1.4.0...plugin-vue@1.5.0) (2021-08-24)



# [1.4.0](https://github.com/vitejs/vite/compare/plugin-vue@1.3.0...plugin-vue@1.4.0) (2021-08-07)

### Features

* Custom Elements mode behavior changed: now only inlines the CSS and no longer exports the custom element constructor (exports the component as in normal mode). Users now need to explicitly call `defineCustomElement` on the component. This allows the custom element to be defined using an async version of the source component.

### Bug Fixes

* revert update dependency slash to v4 ([#4118](https://github.com/vitejs/vite/issues/4118)) ([#4519](https://github.com/vitejs/vite/issues/4519)) ([9b4fe1f](https://github.com/vitejs/vite/commit/9b4fe1fa68c522878d1bdef87d7aa02ae08e986f))



# [1.3.0](https://github.com/vitejs/vite/compare/plugin-vue@1.2.5...plugin-vue@1.3.0) (2021-07-27)


### Bug Fixes

* reuse the old preprocessor after changing the lang attr ([#4224](https://github.com/vitejs/vite/issues/4224)) ([7a3c6e6](https://github.com/vitejs/vite/commit/7a3c6e616385cbc069620ae583d6739a972c0ead))


### Features

* **plugin-vue:** support importing vue files as custom elements ([3a3af6e](https://github.com/vitejs/vite/commit/3a3af6eeafbc9fc686fc909ec6a61c61283316fc))



## [1.2.5](https://github.com/vitejs/vite/compare/plugin-vue@1.2.4...plugin-vue@1.2.5) (2021-07-12)



## [1.2.4](https://github.com/vitejs/vite/compare/plugin-vue@1.2.3...plugin-vue@1.2.4) (2021-06-27)


### Bug Fixes

* **ssr:** normalize manifest filenames ([#3706](https://github.com/vitejs/vite/issues/3706)) ([aa8ca3f](https://github.com/vitejs/vite/commit/aa8ca3f35218c9fb48f87d3f6f4681d379ee45ca)), closes [#3303](https://github.com/vitejs/vite/issues/3303)



## [1.2.3](https://github.com/vitejs/vite/compare/plugin-vue@1.2.2...plugin-vue@1.2.3) (2021-06-01)


### Bug Fixes

* **plugin-vue:** rewrite default after ts compiled ([#3591](https://github.com/vitejs/vite/issues/3591)) ([ea5bafa](https://github.com/vitejs/vite/commit/ea5bafaefbafd858389f88e537cb3473b4669802))



## [1.2.2](https://github.com/vitejs/vite/compare/plugin-vue@1.2.1...plugin-vue@1.2.2) (2021-04-24)


### Bug Fixes

* **plugin-vue:** add newline character before class components, fix [#2787](https://github.com/vitejs/vite/issues/2787) ([#2933](https://github.com/vitejs/vite/issues/2933)) ([8fe828e](https://github.com/vitejs/vite/commit/8fe828e9be9e9de67463af6f5dc35ebdbfdbda28))
* **plugin-vue:** avoid duplicate import, fix [#2640](https://github.com/vitejs/vite/issues/2640) ([#2897](https://github.com/vitejs/vite/issues/2897)) ([011438d](https://github.com/vitejs/vite/commit/011438d16dc42408d5229b842d67dba28868566b))
* **plugin-vue:** respect `hmr: false` server config, fix [#2790](https://github.com/vitejs/vite/issues/2790) ([#2797](https://github.com/vitejs/vite/issues/2797)) ([27e0c3f](https://github.com/vitejs/vite/commit/27e0c3fffd32a0ff90d06a909a5d5cc7d73f44b0))



## [1.2.1](https://github.com/vitejs/vite/compare/plugin-vue@1.2.0...plugin-vue@1.2.1) (2021-03-31)


### Bug Fixes

* **plugin-vue:** allow to overwrite feature flags ([#2675](https://github.com/vitejs/vite/issues/2675)) ([a4acc16](https://github.com/vitejs/vite/commit/a4acc161e10fb6d122f808ad6211feef389d41a9))



# [1.2.0](https://github.com/vitejs/vite/compare/plugin-vue@1.1.5...plugin-vue@1.2.0) (2021-03-26)


### Features

* **plugin-vue:** enable :slotted usage detection ([c40c49f](https://github.com/vitejs/vite/commit/c40c49f6fa806406364f4982fe45a69db15c204f))



## [1.1.5](https://github.com/vitejs/vite/compare/plugin-vue@1.1.4...plugin-vue@1.1.5) (2021-02-26)


### Bug Fixes

* **plugin-vue:** fix hmr when emptying sfc file ([#2142](https://github.com/vitejs/vite/issues/2142)) ([493b942](https://github.com/vitejs/vite/commit/493b94259d6a499e03684d6001fea1a96d56810c)), closes [#2128](https://github.com/vitejs/vite/issues/2128)
* **plugin-vue:** handle default rewrite edge case for commented class ([2900a9a](https://github.com/vitejs/vite/commit/2900a9a6a501628588b31f7453e2fe5a71fe45ce)), closes [#2277](https://github.com/vitejs/vite/issues/2277)
* **plugin-vue:** import vue file as raw correctly ([#1923](https://github.com/vitejs/vite/issues/1923)) ([5b56d70](https://github.com/vitejs/vite/commit/5b56d70c1d173d4c5e3d9532f9c3bc6f8bfc020c))



## [1.1.4](https://github.com/vitejs/vite/compare/plugin-vue@1.1.3...plugin-vue@1.1.4) (2021-01-30)


### Bug Fixes

* **plugin-vue:** handle block src pointing to dependency files ([bb7da3f](https://github.com/vitejs/vite/commit/bb7da3f0f07da6558f0e81bd82ede4cfe1785a56)), closes [#1812](https://github.com/vitejs/vite/issues/1812)



## [1.1.3](https://github.com/vitejs/vite/compare/plugin-vue@1.1.2...plugin-vue@1.1.3) (2021-01-29)


### Bug Fixes

* **plugin-vue:** special handling for class default export in sfc ([d3397e6](https://github.com/vitejs/vite/commit/d3397e61cd9d0761606506dcc176a1cbc845d8b5)), closes [#1476](https://github.com/vitejs/vite/issues/1476)



## [1.1.2](https://github.com/vitejs/vite/compare/plugin-vue@1.1.1...plugin-vue@1.1.2) (2021-01-24)



## [1.1.1](https://github.com/vitejs/vite/compare/plugin-vue@1.1.0...plugin-vue@1.1.1) (2021-01-23)


### Bug Fixes

* avoid eager hmr api access ([fa37456](https://github.com/vitejs/vite/commit/fa37456584a09b52b39a61760a6d130e261886ff))


### Features

* support `base` option during dev, deprecate `build.base` ([#1556](https://github.com/vitejs/vite/issues/1556)) ([809d4bd](https://github.com/vitejs/vite/commit/809d4bd3bf62d3bc6b35f182178922d2ab2175f1))



# [1.1.0](https://github.com/vitejs/vite/compare/plugin-vue@1.0.6...plugin-vue@1.1.0) (2021-01-19)


### Features

* ssr manifest for preload inference ([107e79e](https://github.com/vitejs/vite/commit/107e79e7b7d422f0d1dbe8b7b435636df7c6281c))
* **plugin-vue:** support for vite core new ssr impl ([a93ab23](https://github.com/vitejs/vite/commit/a93ab23491ee9fee78345ddc20567e1b0ceec2a7))



## [1.0.6](https://github.com/vitejs/vite/compare/plugin-vue@1.0.5...plugin-vue@1.0.6) (2021-01-15)


### Bug Fixes

* **plugin-vue:** sfc src import respect alias ([#1544](https://github.com/vitejs/vite/issues/1544)) ([d8754de](https://github.com/vitejs/vite/commit/d8754deeb16ef0d86b17dfa2a3394d0919bcd72e)), closes [#1542](https://github.com/vitejs/vite/issues/1542)



## [1.0.5](https://github.com/vitejs/vite/compare/plugin-vue@1.0.4...plugin-vue@1.0.5) (2021-01-09)


### Bug Fixes

* **plugin-vue:** default pug doctype ([756a0f2](https://github.com/vitejs/vite/commit/756a0f26911e5bff9c1ea3f780a0a1eccd1f1cfd)), closes [#1383](https://github.com/vitejs/vite/issues/1383)
* **plugin-vue:** pass on script and style options to compiler-sfc ([0503d42](https://github.com/vitejs/vite/commit/0503d42aaddbc4b8428c94ede07cf7b84f800cef)), closes [#1450](https://github.com/vitejs/vite/issues/1450)



## [1.0.4](https://github.com/vitejs/vite/compare/plugin-vue@1.0.3...plugin-vue@1.0.4) (2021-01-04)


### Bug Fixes

* **plugin-vue:** mark SFC compiler options as `Partial` ([#1316](https://github.com/vitejs/vite/issues/1316)) ([331484c](https://github.com/vitejs/vite/commit/331484c2600e96543aa8007b4940d023cb5cc19f))


### Features

* **plugin-vue:** export vue query parse API ([#1303](https://github.com/vitejs/vite/issues/1303)) ([56bcb0c](https://github.com/vitejs/vite/commit/56bcb0c475a5dff31527cad6dcd7c61fde424f5e))



## [1.0.3](https://github.com/vitejs/vite/compare/plugin-vue@1.0.2...plugin-vue@1.0.3) (2021-01-02)


### Bug Fixes

* **plugin-vue:** custom block prev handling ([8dbc2b4](https://github.com/vitejs/vite/commit/8dbc2b47dd8fea4a953fb05057edb47122e2dcb7))


### Code Refactoring

* **hmr:** pass context object to `handleHotUpdate` plugin hook ([b314771](https://github.com/vitejs/vite/commit/b3147710e96a8f88ab81b2e45dbf7e7174ad976c))


### BREAKING CHANGES

* **hmr:** `handleHotUpdate` plugin hook now receives a single
`HmrContext` argument instead of multiple args.



## [1.0.2](https://github.com/vitejs/vite/compare/plugin-vue@1.0.2...plugin-vue@1.0.2) (2021-01-02)


### Bug Fixes

* **plugin-vue:** avoid throwing on never requested file ([48a24c1](https://github.com/vitejs/vite/commit/48a24c1fa1f64e89ca853635580911859ef5881b))
* **plugin-vue:** custom block prev handling ([8dbc2b4](https://github.com/vitejs/vite/commit/8dbc2b47dd8fea4a953fb05057edb47122e2dcb7))
* avoid self referencing type in plugin-vue ([9cccdaa](https://github.com/vitejs/vite/commit/9cccdaa0935ca664c8a709a89ebd1f2216565546))
* **plugin-vue:** ensure id on descriptor ([91217f6](https://github.com/vitejs/vite/commit/91217f6d968485303e71128bb79ad4400b9b4412))
