// Web/UI/Components/Admin/Core Templates/index.tsx
import React from 'react'
import { useStyles } from '../styles'
import { Section } from 'UI/Components/Layout/Section'

export function CoreTemplatesPage(): React.ReactElement {
  const classes = useStyles({})
  return (
    <> 
      <Section title={{ title: 'Core Template Management' }} background='secondary' className={classes.topSection} />

    </>
  )
}