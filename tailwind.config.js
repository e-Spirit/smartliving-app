module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './pages/**/*.vue',
      './pages/**/*.tsx',
      './pages/**/*.jsx',
      './components/**/*.vue',
      './components/**/*.tsx',
      './components/**/*.jsx',
      './assets/**/*.css'
    ]
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0'
      }
    },

    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-text': 'var(--color-primary-text)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        error: 'var(--color-error)',
        disabled: 'var(--color-disabled)',

        orange: {
          50: '#FDE5D8',
          100: '#FBD5C0',
          200: '#F8B490',
          300: '#F59460',
          400: '#F27430',
          500: '#E1580E',
          600: '#B1450B',
          700: '#813208',
          800: '#512005',
          900: '#210D02'
        }
      },
      fontSize: {
        base: ['var(--font-size-base)', '1.5rem']
      },
      fontFamily: {
        body: '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        heading:
          '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        sans: '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      }
    }
  },
  variants: {
    extend: {
      backgroundBlendMode: ['hover']
    }
  },
  plugins: []
}
