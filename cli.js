#!/usr/bin/env node
'use strict';

let componentName;
const path = require('path');
const fs = require('fs-extra');
const program = require('commander')
    .version(require('./package.json').version)
    .arguments('<name> [errorEntry]')
    .action((name, errorEntry) => {
        componentName = name;
        errorEntry = errorEntry;
        if (errorEntry !== undefined) {
            console.error('ERROR: Component name cannot contain spaces!');
            process.exit(1);
        }
    })
    .option('-f, --function', 'Create a functional component')
    .option('-c, --class', 'Create a class based component')
    .option('-s, --state', "Add state to the component")
    .option('--css', `Add <component-name>.css`)
    .parse(process.argv);

generateComponent(componentName);

function generateComponent(componentName) {
    if (componentName === undefined) {
        console.error('ERROR: No component name specified!');
        process.exit(1);
    }

    const root = process.cwd() + '\\src\\' + componentName.replace(/\//g,'\\');
    componentName = root.split('\\').pop();
    let className = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    if(!fs.existsSync(root)) {
        fs.mkdirSync(root, {recursive: true});
    }

    if(program.css) {
        fs.writeFileSync(
            path.join(root, `${componentName}.css`),
            `/*\nCSS Module: ${componentName}\n*/\n`+
            `.${className} {\n`+
            '\t/* Add css styles for your component here */\n'+
            '}'
        )
        console.log(`CREATED ${root}\\${componentName}.css`)
    }

    if(program.function) {
        fs.writeFileSync(
            path.join(root, `${componentName}.js`),
            `import React, {useState} from 'react';\n`+
            (program.css ? `import classes from './${componentName}.css';\n\n` : '\n')+
            `const ${componentName} = (props) => {\n`+
            (program.state ? '\tconst [stateVar, setStateVar] = useState(0);\n': '')+
            '\treturn(\n'+
            '\t\t<div ' + (program.css ? `className={classes.${className}}` : '') + '>\n\n\t\t</div>\n'+
            '\t);\n'+
            '}\n\n'+
            `export default ${componentName};`
        )
    } else if(program.class) {
        fs.writeFileSync(
            path.join(root, `${componentName}.js`),
            `import React, {Component} from 'react';\n`+
            (program.css ? `import classes from './${componentName}.css';\n\n` : '\n')+
            `class ${className} extends Component {\n`+
            (program.state ? '\tconstructor(props) {\n'+
            '\t\tsuper(props)\n'+
            '\t\tthis.state = { /*Add your state here */ }'+
            '\t}\n': '')+
            '\trender(\n'+
            '\t\treturn(\n'+
            '\t\t\t<div' + (program.css ? `className={classes.${className}}` : '') + '>\n\n\t\t\t</div>\n'+
            '\t\t);\n'+
            '\t)\n'+
            '}\n\n'+
            `export default ${className};`
        )
    }

    if(program.function || program.class) {
        console.log(`CREATED ${root}\\${componentName}.js`)
        fs.writeFileSync(
            path.join(root, 'index.js'),
            `export { default } from './${componentName}';`
        )
        console.log(`CREATED ${root}\\index.js`)
    } else {
        console.error('ERROR: No option specified!');
    }
}