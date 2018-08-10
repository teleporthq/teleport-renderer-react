import Teleport from '@teleporthq/teleport-lib-js'
import React, { Component } from 'react'
import injectSheet from 'react-jss'

export interface ElementRendererProps {
  key?: string
  component: {
    type: {}
    source: {}
    children: string | Array<ElementRendererProps['component']>
    props: {}
    style: {}
  }
  project: Teleport
  teleport: Teleport
}

class ElementRenderer extends Component<ElementRendererProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { component, project, teleport, ...otherProps } = this.props
    const { type, source, children, props, style, ...otherComponentProps } = component

    let tmpStyle = style
    let childrenComponents = null

    if (children && typeof children !== 'string') {
      childrenComponents = children.map((child, index) => {
        return <ElementRenderer key={'cmp_' + index} component={child} project={project} teleport={teleport} />
      })

      // if there's only one child, do not pass it as array, as some components don't like that (eg. Router)
      if (childrenComponents.length === 1) {
        childrenComponents = childrenComponents[0]
      }
    }

    if (typeof children === 'string') {
      childrenComponents = children
    }

    if (!tmpStyle) tmpStyle = {}

    let componentInstance = null
    if (source === 'components') {
      const ComponentMapping = 'div'
      componentInstance = ({ classes }) => (
        <ComponentMapping className={classes.name} {...otherProps} {...props} {...otherComponentProps}>
          <ElementRenderer component={project.componentsByName[type].content} project={project} teleport={teleport} />
        </ComponentMapping>
      )
    } else {
      const mapping = teleport.map('react', source, type)
      const { type: ComponentMapping } = mapping

      componentInstance = ({ classes }) =>
        // todo: replace Svg checking
        type === 'Svg' && typeof childrenComponents === 'string' ? (
          <ComponentMapping
            className={classes.name}
            {...otherProps}
            {...props}
            {...otherComponentProps}
            dangerouslySetInnerHTML={{ __html: childrenComponents }}
          />
        ) : (
          <ComponentMapping className={classes.name} {...otherProps} {...props} {...otherComponentProps}>
            {childrenComponents}
          </ComponentMapping>
        )
    }

    const ComponentWithStyles = injectSheet({ name: tmpStyle })(componentInstance)

    return <ComponentWithStyles />
  }
}

export default ElementRenderer
