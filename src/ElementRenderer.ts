import React, { Component } from 'react'
import PropTypes from 'prop-types'
import teleport from 'teleport-lib-js'
import injectSheet from 'react-jss'

export default class ElementRenderer extends Component {

  /* eslint-disable */
  render () {
    const { component, project, ...otherProps } = this.props

    const { type, source, children, props, style, ...otherComponentProps } = component

    let tmpStyle = style
    let childrenComponents = null

    if (children && typeof children !== "string") {
      childrenComponents = children.map((child, index) => { return (<ElementRenderer key={('cmp_'+index)} component={child} project={project} />) })

      // if there's only one child, do not pass it as array, as some components don't like that (eg. Router)
      if (childrenComponents.length === 1){
        childrenComponents = childrenComponents[0]
      }
    }

    if (typeof children === "string") {
      childrenComponents = children
    }

    if (! tmpStyle) tmpStyle = {}
    // if (! tmpStyle.flexDirection) tmpStyle.flexDirection = 'row'
    // if (! tmpStyle.display) tmpStyle.display = 'flex'

    let Component = null
    if (source === 'components') {
      const ComponentMapping = 'div'
      Component = ({classes}) => (
        <ComponentMapping className={classes.name} {...otherProps} {...props} {...otherComponentProps}>
          <ElementRenderer component={project.componentsByName[type].content} project={project} />
        </ComponentMapping>
      )
    } else {
      const mapping = teleport.map('react', source, type)
      const { type: ComponentMapping } = mapping

      Component = ({classes}) => (
        // todo: replace Svg checking
        type === 'Svg' && typeof childrenComponents === 'string'
        ? <ComponentMapping className={classes.name} {...otherProps} {...props} {...otherComponentProps} dangerouslySetInnerHTML={{ __html: childrenComponents }} />
        : <ComponentMapping className={classes.name} {...otherProps} {...props} {...otherComponentProps}>{childrenComponents}</ComponentMapping>
      )
    }

    const ComponentWithStyles = injectSheet({ name: tmpStyle })(Component)

    return (<ComponentWithStyles />)
  }
  /* eslint-enable */
}

ElementRenderer.propTypes = {
  component: PropTypes.object.isRequired
}
