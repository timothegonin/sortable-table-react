# Sortable-table-react

A React component for displaying a sortable and pageable table with controls

![JavaScript](https://img.shields.io/badge/Language-JavaScript-f7df1e)
![React](https://img.shields.io/badge/Framework-React-5ed3f3)

### Features description :

- Sort the table columns.
- Select the number of data to display (interacts with pagination).
- Filter table data via the search bar.
- Dynamically display the number of entries shown in the table.
- Paginate the data displayed in the table.

---

---

## Prerequisites

**NodeJS :** (v16.15.0 or later)
**Npm :** (v7.24.0 or later) / **Yarn :** (v1.22.18 or later)

---

---

## Installation

Install with NPM

```bash
npm install sortable-table-react
```

Install with YARN

```bash
yarn add sortable-table-react
```

---

---

## Usage/Examples

```javascript
import { SortableTable } from "sortable-table-react";

const tableHeads = [
	"First Name",
	"Last Name",
	"Start Date",
	"Department",
	"Date of Birth",
	"Street",
	"City",
	"State",
	"Zip Code",
];

const data = [
	{
		id: 1,
		firstName: "Deirdre",
		lastName: "Blackaller",
		department: "Human Resources",
		startDate: "08/27/2008",
		dateOfBirth: "11/27/1978",
		street: "16 Cottonwood Junction",
		city: "Alpharetta",
		state: "Georgia",
		zipCode: "30022",
	},
];

const App = () => {
	return <SortableTable data={data} tableHeads={tableHeads} />;
};

export default App;
```

#### - Props

| Name       | Type                            | Description                  |
| ---------- | ------------------------------- | ---------------------------- |
| data       | **Required** - array of objects | Data to display in the table |
| tableHeads | **Required** - array of string  | List of table headers        |

---

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
