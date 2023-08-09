import React from "react";

import { SortableTable } from "../components/SortableTable";
import { data, tableHeads } from "../../example_data";

export default {
	title: "Sortable Table Component",
	component: SortableTable,
};

const Template = () => <SortableTable data={data} tableHeads={tableHeads} />;

export const App = Template.bind({});
