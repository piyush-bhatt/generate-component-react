# create-component

create-component is a CLI generator for ReactJS components based on specified name and options.

## Content

* [Installation](#installation)
* [Usage](#usage)
  * [Functional Component](#functional-component)
  * [Class Based Component](#class-based-component)
  * [Options](#options)
* [Examples](#examples)
* [Contributing](#contributing)
* [License](#license)


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install

```bash
npm install -g create-component
```

## Usage

Make sure to execute the commands from your app root directory

### Functional Component
```bash
create-component <component-name> -f
```
   or
```bash
cc <component-name> --function
```

### Class Based Component
```bash
create-component <component-name> -c
```
   or
```bash
cc <component-name> --class
```


### Options

Following options can be used optionally,

**--css** : add a CSS module for the generated component, e.g.,
```bash
create-component <component-name> --class --css
```

**-s** or **--state** : add state to the generated component, e.g.,
```bash
create-component <component-name> --class --state
```

## Examples

* Sample component (functional component with state and css):

    ```bash
    create-component sample --function --css --state

    CREATED <app-root-dir>\src\sample\sample.css
    CREATED <app-root-dir>\src\sample\sample.js
    CREATED <app-root-dir>\src\sample\index.js
    ```
* Sample component (class based component without state but with css):

    ```bash
    create-component sample --class --css

    CREATED <app-root-dir>\src\sample\sample.css
    CREATED <app-root-dir>\src\sample\sample.js
    CREATED <app-root-dir>\src\sample\index.js
    ```
* Sample component (functional component in nested directory without state and css):

    ```bash
    create-component components/sample --function

    CREATED <app-root-dir>\src\components\sample\sample.js
    CREATED <app-root-dir>\src\components\sample\index.js
    ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)