<p align="center">
   <a href="https://github.com/tusharf5/react-outclick">
     <img src="https://raw.githubusercontent.com/tusharf5/react-outclick/master/static/logo.gif" alt="react click outside component" height="100"/>
   </a>
</p>

<h1 align="center">react-outclick</h1>

<p align="center">React component for handling clicks outside of a component.</p>

<p align="center">
	<a href="https://github.com/tusharf5/react-outclick">
     <img src="https://img.shields.io/npm/l/react-outclick" height="20"/>
  </a>
	<a href="https://github.com/tusharf5/react-outclick">
     <img src="https://img.shields.io/npm/v/react-outclick" height="20"/>
  </a>
	<a href="https://github.com/tusharf5/react-outclick">
     <img src="https://img.shields.io/npm/dt/react-outclick" height="20"/>
  </a>
	<a href="https://github.com/tusharf5/react-outclick">
     <img src="https://img.shields.io/bundlephobia/minzip/react-outclick" height="20"/>
  </a>
</p><br/><br/>

## Install

```bash
npm install --save react-outclick
or
yarn add react-outclick
```

## Usage

By default, clicks are detected everywhere outside your component.

<img src="https://raw.githubusercontent.com/tusharf5/react-outclick/master/static/default-use.svg" height="350"/>


```tsx
import OnOutsiceClick from 'react-outclick';

function App() {
  return (
    <OnOutsiceClick
      onOutsideClick={(ev: Event) => {
        alert('You clicked outside of this component!!!');
      }}>
      Hello World
    </OnOutsiceClick>
  );
}
```

If a `container` prop is also specified, clicks are only handled if they they happen outside of your component and inside the `container` element.

<img src="https://raw.githubusercontent.com/tusharf5/react-outclick/master/static/container-use.svg" height="350"/>


```tsx
import React from 'react';
import OnOutsiceClick from 'react-outclick';

export default function App() {
  const click = () => {
    console.log('click');
  };
  const ref = React.useRef();
  return (
    <div>
      <nav>
        <span>Clicks will not be handled here as it is outside the container</span>
      </nav>
      <main ref={ref}>
        {/** Click will be detected here  **/}
        <div className='App'>
          <h1>I am inside container</h1>
          <OnOutsiceClick container={ref} onOutsideClick={click}>
            <h2>I am inside OutsideClick component</h2>
          </OnOutsiceClick>
        </div>
      </main>
    </div>
  );
}
```

### Props

#### children: `PropTypes.node.isRequired`

Since the `OnOutsiceClick` specifically handles clicks outside a specific subtree, `children` is expected to be defined. A consumer should also not render the `OnOutsiceClick` in the case that `children` are not defined.

_Note that if you use a `Portal` (native or `react-portal`) of any sort in the `children`, the `OnOutsiceClick` will not behave as expected._

#### onOutsideClick: `PropTypes.func.isRequired`

The `onOutsideClick` prop is also required as without it, the `OnOutsiceClick` is basically a heavy-weight `<div />`. It takes the relevant clickevent as an arg and gets triggered when the user clicks anywhere outside of the subtree generated by the DOM node.

#### container: `PropTypes.func`

By default, this library will detect any `click` event that happens outside of your react component. But sometimes, you want to
detect event inside a container and outside one of its child. For that you can pass in a container (parent) element react ref as a prop.

#### display: `PropTypes.oneOf(['block', 'flex', 'inline-block', 'inline', 'contents'])`

By default, the `OnOutsiceClick` renders a `display: block` `<div />` to wrap the subtree defined by `children`. If desired, the `display` can be set to `inline-block`, `inline`, `flex`, or `contents` instead. There is no way not to render a wrapping `<div />`.

#### touchEvent: `PropTypes.oneOf(['touchstart' , 'touchend'])`

The type of touch event to detect. By default, it is `touchend`.

#### mouseEvent: `PropTypes.oneOf(['click' , 'mousedown' , 'mouseup'])`

The type of mouse event to detect. By default, it is `click`.

## License

MIT © [tusharf5](https://github.com/tusharf5)
