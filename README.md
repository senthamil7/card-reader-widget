# Card reader widget (CRW)

CRW is a react library for capture the credit card images.

## Installation

If you are using npm,

```bash
npm install card-reader-widget
```

For yarn,

```bash
yarn add card-reader-widget
```

## Usage

```javascript
//App.js
import React from 'react';
import CardReader from 'card-reader-widget'
import './App.css';


function App() {
  return (
    <div>
      <CardReader />
    </div>
  );
};

export default App;
```
Add this in your App.css
```css
@import '~card-reader-widget/src/App.css';
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
