# typescript-openapi-generator

A typescript only client code generator for Swagger 2.0 and OpenApi 3.0 specifications.

Consider this a WIP! I wouldn't use it in production just yet.

However if you have an API specification file that hasn't been correctly parsed please let me know.

This project is inspired by the amazing work that the [OpenAPITools](https://github.com/OpenAPITools/openapi-generator) devs have done.

However my own experiences with trying to modify the generators was frustrating and over complex.
I wanted to create something that just focused on generating Typescript I could remove a lot of the complexity for scaffolding files.

## Installation

You can install the package globally, so it is available anywhere on the command line.

```
npm install -g typescript-openapi-generator
```

You can also install as part of your project in the dev dependancies

```
npm install -D typescript-openapi-generator
```

## Usage

There is a CLI tool that you can use tcg (typescript code gen!)

As an example if it is installed globally you can do

```
tcg --apiFile your-example-api-spec.yaml
```

If is installed in your project you can use npx

```
npx tcg --apiFile your-example-api-spec.yaml
```

If you don't want to use npx you can add a script into your package.json

```
scripts: {
    "tcg: "tcg"
}
```

And it's usage is (note the escaping -- before the arguments):

```
npm run tcg -- --apiFile your-example-api-spec.yaml
```

## Arguments

There are several parameters in the CLI to use

|                            |                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **--apiFile**              | the relative path from the CWD to the api specification file you want to use           |
| **--generator** (optional) | which generator to use (default value: 'default')                                      |
| **--outputDir** (optional) | the relative path from the CWD to the output folder (default value: 'code-gen-output') |

You can also run `tcg --help` to view the help page

## Generators

|             |                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------ |
| **default** | only creates models, has a index.ts that you can start to use in your code                       |
| **angular** | creates models, angular services and an api module that you can directly use in your application |
