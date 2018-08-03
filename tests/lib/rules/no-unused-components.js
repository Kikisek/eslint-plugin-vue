/**
 * @fileoverview Report used components
 * @author Michał Sajnóg
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unused-components')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
})

tester.run('no-unused-components', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template><div>Lorem ipsum</div></template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <h2>Lorem ipsum</h2>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <TheButton />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="TheButton" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <theButton />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="theButton" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <the-button />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="the-button" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <The-button />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="The-button" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <The-Button />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="The-Button" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <the-Button />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="the-Button" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <the-button />
          <next_Button />
        </div>
      </template>
      <script>
        export default {
          components: {
            'the-button': TheButton,
            'next_Button': NextButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <component is="the-button" />
          <component is="next_Button" />
        </div>
      </template>
      <script>
        export default {
          components: {
            'the-button': TheButton,
            'next_Button': NextButton
          }
        }
      </script>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <h2>Lorem ipsum</h2>
          <component is="TheButton" />
        </div>
      </template>
      <script>
        export default {
          components: {
            TheButton
          }
        }
      </script>`
    },

    // Ignore when `render` is used instead of temoplate
    {
      filename: 'test.vue',
      code: `
      <script>
        export default {
          components: {
            TheButton
          },
          render() {
            return
          }
        }
      </script>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
          <div>
            <h2>Lorem ipsum</h2>
          </div>
        </template>
        <script>
          export default {
            components: {
              TheButton
            },
          }
        </script>
      `,
      errors: [{
        message: 'The "TheButton" component has been registered but not used.',
        line: 10
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
          <div>
            <h2>Lorem ipsum</h2>
            <the_button />
          </div>
        </template>
        <script>
          export default {
            components: {
              TheButton
            },
          }
        </script>
      `,
      errors: [{
        message: 'The "TheButton" component has been registered but not used.',
        line: 11
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
          <div>
            <h2>Lorem ipsum</h2>
            <TheButton />
          </div>
        </template>
        <script>
          export default {
            components: {
              'the-button': TheButton
            },
          }
        </script>
      `,
      errors: [{
        message: 'The "the-button" component has been registered but not used.',
        line: 11
      }]
    }
  ]
})
