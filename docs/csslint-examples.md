# Usage Examples

```js
csslint: {
  files: 'app.css',
}
```

## Specifying rules

Rules can be specified as options for all filesets:

```js
csslint: {
  options: {
    import: false
  },
  files: 'app.css',
}
```

Or per filset:

```js
csslint: {
  strict: {
    options: {
      import: 2
    },
    files: {
      src: ['app.css', 'module.css']
    }
  },
  lax: {
    options: {
      import: false
    },
    files: {
      src: 'lib.css'
    }
  }
}
```