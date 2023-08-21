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
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = visibleDataCount;

	const filteredData = data.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<Container fluid="md">
			<DataTableControls
				onVisibleDataChange={setVisibleDataCount}
				onSearchTermChange={setSearchTerm}
				visibleDataCount={visibleDataCount}
				searchTerm={searchTerm}
			/>
			<DataTable
				data={currentData}
				tableHeads={tableHeads}
				searchTerm={searchTerm}
			/>
			<Stack
				direction="horizontal"
				gap={3}
				className="my-3 d-flex flex-column flex-md-row justify-content-md-between"
			>
				<Badge bg="primary">
					Showing {indexOfFirstItem + 1} to{" "}
					{Math.min(indexOfLastItem, filteredData.length)} of{" "}
					{filteredData.length} entries
				</Badge>
				<Pagination size="sm" className="md-ms-auto my-auto">
					<Pagination.First onClick={() => setCurrentPage(1)} />
					<Pagination.Prev
						onClick={() => setCurrentPage((prev) => prev - 1)}
						disabled={currentPage === 1}
					/>
					{Array.from(
						{ length: Math.ceil(filteredData.length / itemsPerPage) },
						(_, index) => (
							<Pagination.Item
								key={index + 1}
								active={currentPage === index + 1}
								onClick={() => setCurrentPage(index + 1)}
							>
								{index + 1}
							</Pagination.Item>
						)
					)}
					<Pagination.Next
						onClick={() => setCurrentPage((prev) => prev + 1)}
						disabled={
							currentPage === Math.ceil(filteredData.length / itemsPerPage)
						}
					/>
					<Pagination.Last
						onClick={() =>
							setCurrentPage(Math.ceil(filteredData.length / itemsPerPage))
						}
					/>
				</Pagination>
			</Stack>
		</Container>
	);
};

SortableTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	tableHeads: PropTypes.arrayOf(PropTypes.string),
};
