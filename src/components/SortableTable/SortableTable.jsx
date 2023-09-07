import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import "./style.css";
import { DataTable } from "../DataTable";
import { DataTableControls } from "../DataTableControls";
import { PaginationControls } from "../PaginationControls";

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
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		const filtered = data.filter((employee) =>
			Object.values(employee).some(
				(value) =>
					typeof value === "string" &&
					value.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
		setFilteredData(filtered);
	}, [searchTerm, data]);

	useEffect(() => {
		if (currentPage > Math.ceil(filteredData.length / itemsPerPage)) {
			setCurrentPage(Math.ceil(filteredData.length / itemsPerPage));
		}
	}, [currentPage, itemsPerPage, filteredData]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const handleVisibleDataChange = (value) => {
		setVisibleDataCount(value);
	};

	return (
		<Container fluid="md">
			<DataTableControls
				onVisibleDataChange={handleVisibleDataChange}
				onSearchTermChange={setSearchTerm}
				visibleDataCount={visibleDataCount}
				searchTerm={searchTerm}
			/>
			<DataTable
				data={currentData}
				tableHeads={tableHeads}
				searchTerm={searchTerm}
			/>
			<PaginationControls
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				itemsPerPage={visibleDataCount}
				filteredData={filteredData}
			/>
		</Container>
	);
};

SortableTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	tableHeads: PropTypes.arrayOf(PropTypes.string).isRequired,
};
