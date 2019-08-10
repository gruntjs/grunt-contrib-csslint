# Usage Examples

```js
csslint: {
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  },
  lax: {
    options: {
      import: false
    },
    src: ['path/to/**/*.css']
  }
}
```

## Loading rules from an external file

```js
csslint: {
  options: {
    csslintrc: '.csslintrc'
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  },
  lax: {
    options: {
      import: false
    },
    src: ['path/to/**/*.css']
  }
}
```

## Specifying output formatters

```js
csslint: {
  options: {
    csslintrc: '.csslintrc',
    formatters: [
      {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
      {id: 'csslint-xml', dest: 'report/csslint.xml'}
    ]
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  }
}
```

## Providing a custom formatter

```js
csslint: {
  options: {
    csslintrc: '.csslintrc',
    formatters: [
      {id: require('csslint-stylish'), dest: 'report/csslint_stylish.xml'}
    ]
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  }
}
```

## Using absolute file paths in the output formatters

```js
csslint: {
  options: {
    absoluteFilePathsForFormatters: true,
    formatters: [
      {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
      {id: 'csslint-xml', dest: 'report/csslint.xml'}
    ]
  }
}
```
