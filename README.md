# BondSwapFrontend

## First Setup

For the first setup you should go to `https://nodejs.org/uk/` and download the newest nodejs package
(it needs v12+ to start the project). After node installation type `npm install`. It will install you all the required packages.
In file `enivronments/environment.ts` change the ApiURL to the URL where backend hosted.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Project Pages

Simulation list - first page of the app where all the simulations are stored.
Simulation item - Simulation details page.
Simulation reports - used like a modal with tabs of subcomponents.

## Project Shared Files

`Select component` - re-sharable select that is presented in simulation details page.
You should pass here preselectedItem, the object property you're checking for (if it`s needed) and the list of items.
Event emitter throws back you selectedItem

`Table-columns-dropdown` - is used for the columns you wnt to hide and show

`Neg-number-pipe` - is preferred to use over simple number pipe because it can validate every data and wom`t throw any type error.
it transforms your negative number to: `(|x|)`

`Excel Utility` - utility that provides you an export for the excel with a file-saver package.

`isEmpty` - checks if object is full empty. Now used to check if we can add new row to add cusipData.

## Styles Components

`variables.scss` - Theme that is used in the app. Use and store all the colors, box-shadows, fonts, etc. there

`common.scss` - styles for buttons and inputs

`reports.scss` - re-sharable style for reports (tabs styles and header)

`table.component.scss` - styles for table (row-based-table and column-based-table)

