import MagicString from 'magic-string'
import { capitalize } from '../utils'
import { ModuleContext } from '../types'
import { useNuxt } from '@nuxt/kit'
import { createUnplugin } from 'unplugin'

const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*?)["'][\s,]*[^)]*\)/g

export const transformDirectivesPlugin = createUnplugin((context: ModuleContext) => {
  const { sourcemap } = useNuxt().options
  return {
    name: 'quasar:directive',
    enforce: 'post',

    transform(code, id) {
      const [ filename ] = id.split('?', 2)

      if (!filename.endsWith('.vue'))
        return null

      const s = new MagicString(code)
      const directives: {
        name: string,
        alias: string,
        path: string
      }[] = []

      let counter = 0

      s.replace(directivesRegExp, (full, name) => {
        const directive = context.imports.directives.find(d => d.name === name)
        if (directive) {
          const alias = `__q_directive_${counter++}`
          directives.push({
            name: capitalize(name),
            alias,
            path: directive.path
          })
          return alias
        } else {
          return full
        }
      })

      if (directives.length) {
        s.prepend(
          directives
            .map(d => `import { ${d.name} as ${d.alias} } from '${d.path}'`)
            .join('\n')
        )
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: sourcemap[context.mode]
            ? s.generateMap({ source: id, includeContent: true })
            : undefined
        }
      }

    }
  }
})
