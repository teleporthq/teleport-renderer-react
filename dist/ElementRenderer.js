"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = require("prop-types");
var teleport_lib_js_1 = require("teleport-lib-js");
var react_jss_1 = require("react-jss");
var ElementRenderer = /** @class */ (function (_super) {
    __extends(ElementRenderer, _super);
    function ElementRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* eslint-disable */
    ElementRenderer.prototype.render = function () {
        var _a = this.props, component = _a.component, project = _a.project, otherProps = __rest(_a, ["component", "project"]);
        var type = component.type, source = component.source, children = component.children, props = component.props, style = component.style, otherComponentProps = __rest(component, ["type", "source", "children", "props", "style"]);
        var tmpStyle = style;
        var childrenComponents = null;
        if (children && typeof children !== "string") {
            childrenComponents = children.map(function (child, index) { return key = {}('cmp_' + index); }, component = { child: child }, project = { project: project } /  > );
        }
        // if there's only one child, do not pass it as array, as some components don't like that (eg. Router)
        if (childrenComponents.length === 1) {
            childrenComponents = childrenComponents[0];
        }
    };
    ElementRenderer.prototype.if = function (, children) { };
    return ElementRenderer;
}(Component));
exports.default = ElementRenderer;
 === "string";
{
    childrenComponents = children;
}
if (!tmpStyle)
    tmpStyle = {};
// if (! tmpStyle.flexDirection) tmpStyle.flexDirection = 'row'
// if (! tmpStyle.display) tmpStyle.display = 'flex'
var Component = null;
if (source === 'components') {
    var ComponentMapping = 'div';
    Component = function (_a) {
        var classes = _a.classes;
        return className = { classes: .name };
    };
    {
        otherProps;
    }
    {
        props;
    }
    {
        otherComponentProps;
    }
     >
        component;
    {
        project.componentsByName[type].content;
    }
    project = { project: project } /  >
        /ComponentMapping>;
}
else {
    var mapping = teleport_lib_js_1.default.map('react', source, type);
    var ComponentMapping = mapping.type;
    Component = function (_a) {
        var classes = _a.classes;
        return (
        // todo: replace Svg checking
        type === 'Svg' && typeof childrenComponents === 'string'
            ? className : ) = { classes: .name };
    };
    {
        otherProps;
    }
    {
        props;
    }
    {
        otherComponentProps;
    }
    dangerouslySetInnerHTML = {};
    {
        __html: childrenComponents;
    }
}
/>;
className;
{
    classes.name;
}
{
    otherProps;
}
{
    props;
}
{
    otherComponentProps;
}
 > { childrenComponents: childrenComponents } < /ComponentMapping>;
var ComponentWithStyles = react_jss_1.default({ name: tmpStyle })(Component);
return />);
ElementRenderer.propTypes = {
    component: prop_types_1.default.object.isRequired
};
//# sourceMappingURL=ElementRenderer.js.map