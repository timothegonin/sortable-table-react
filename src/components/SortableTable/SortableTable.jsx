import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import "./style.css";
import { DataTable } from "../DataTable";
import { DataTableControls } from "../DataTableControls";

/**
 * Component for displaying a sortable and paginated table with controls.
 * @param {Object} props - The component props.
 * @param {Array} props.data - Data to display in the table.
 * @param {Array} props.tableHeads - Column headers of the table.
 * @returns {JSX.Element} - JSX element representing the sortable and paginated table.
 */
export const SortableTable = ({ data, tableHeads }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [visibleDataCount, setVisibleDataCount] = useState(10);

	const filteredData = data.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<Container fluid="md">
			{/* DataTableControls component to display the controls of DataTable */}
			<DataTableControls
				onVisibleDataChange={setVisibleDataCount}
				onSearchTermChange={setSearchTerm}
				visibleDataCount={visibleDataCount}
				searchTerm={searchTerm}
			/>

			{/* DataTable component to display the sortable table */}
			<DataTable
				data={filteredData.slice(0, visibleDataCount)}
				tableHeads={tableHeads}
				searchTerm={searchTerm}
			/>

			{/* INFOS + PAGINATION */}
			<Stack
				direction="horizontal"
				gap={3}
				className="my-3 d-flex flex-column flex-md-row justify-content-md-between"
			>
				<Badge bg="primary">
					Showing 1 to {Math.min(visibleDataCount, filteredData.length)} of{" "}
					{filteredData.length} entries
				</Badge>
				<Pagination size="sm" className="md-ms-auto my-auto">
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Item>{1}</Pagination.Item>
					<Pagination.Ellipsis />

					<Pagination.Item>{10}</Pagination.Item>
					<Pagination.Item>{11}</Pagination.Item>
					<Pagination.Item active>{12}</Pagination.Item>
					<Pagination.Item>{13}</Pagination.Item>
					<Pagination.Item disabled>{14}</Pagination.Item>

					<Pagination.Ellipsis />
					<Pagination.Item>{20}</Pagination.Item>
					<Pagination.Next />
					<Pagination.Last />
				</Pagination>
			</Stack>
		</Container>
	);
};

SortableTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	tableHeads: PropTypes.arrayOf(PropTypes.string),
};
