const styles = ({
  ps_theme_primary = 'var(--DEFAULT-theme-primary)',
  ps_theme_primary_text = 'var(--DEFAULT-theme-primary-text)',
  ps_theme_secondary = 'var(--DEFAULT-theme-secondary)',
  ps_theme_background = 'var(--DEFAULT-theme-background)',
  ps_theme_error = 'var(--DEFAULT-theme-error)',
  ps_theme_disabled = 'var(--DEFAULT-theme-disabled)'
}) => `:root {
  --color-primary: ${ps_theme_primary};
  --color-primary-text: ${ps_theme_primary_text};
  --color-secondary: ${ps_theme_secondary};
  --color-background: ${ps_theme_background};
  --color-error: ${ps_theme_error};
  --color-disabled: ${ps_theme_disabled};
}`

const defaultStyles = () => `:root {
  --DEFAULT-theme-primary: #D5DD03;
  --DEFAULT-theme-primary-text: #000000;
  --DEFAULT-theme-secondary: #ff0000;
  --DEFAULT-theme-background: #ff0000;
  --DEFAULT-theme-error: #ff0000;
  --DEFAULT-theme-disabled: #ff0000;
}`

export { styles, defaultStyles }
