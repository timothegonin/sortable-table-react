import React from "react";

import { SortableTable } from "../components/SortableTable";
import { data } from "../../example_data";

export default {
	title: "Sortable Table Component",
	component: SortableTable,
};

const Template = () => <SortableTable data={data} />;

export const App = Template.bind({});
