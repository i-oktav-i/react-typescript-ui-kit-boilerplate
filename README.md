# TypeScript React UI Kit boilerplate

## Description

This template is focused on creating a modular UI kit that supports tree shaking.   
By default, there are no code minification, polyfills and babel, apply it to the target __(not this)__ project as needed.   
This template allows you to import part of the components and get only the code necessary for them in the result bundle.   

## How to use

```sh
  npm run storybook # run storybook to dev
  npm run build # compile lib
  npm run check # run ts, eslint and stylelint check
```

### In target project

```js
  // use
  import { ComponentName } from 'pkg-name/ComponentName'
  // or (depending on the selected component export style)
  import ComponentName from 'pkg-name/ComponentName'
  // to import components
  
  import 'pkg-name/styles/ComponentName' // to import component css file
  import 'pkg-name/base.css' // to import global styles
```

---

### Components

To add new component add new folder in `./src/components` with next structure

```
./src/components
└── YourComponentName
    ├── index.css
    ├── index.stories.tsx
    └── index.tsx
```

It will automatically putted in build entries   

It's allowed to make subcomponents

```
./src/components
└── First
    ├── Second
    │   ├── index.css
    │   ├── index.stories.tsx
    │   └── index.tsx
    ├── index.css
    ├── index.stories.tsx
    └── index.tsx
```

Keep in mind that there will be only one css and one js files after the build for this structure
```
./build/components
└── First
    ├── index.css (contains ./src/components/First/index.css and ./src/components/First/Second/index.css)
    ├── index.d.ts (types for ./src/components/First/index.tsx)
    └── index.js (contains ./src/components/First/index.tsx and ./src/components/First/Second/index.tsx)
```
It is possible to import components in components, but don't forget to import all needed css files in project

---

### Utils

Not required, but it is recommended to re-export utilities from `./src/utils/index.ts` and import them from here   
After __project (not this ui)__ build, the resulting bundle will contain only those utilities that were used in the imported components

---

### Styles

Put fonts into `./src/styles/fonts/` as needed   
Add and import global styles into `./src/styles/base.css`