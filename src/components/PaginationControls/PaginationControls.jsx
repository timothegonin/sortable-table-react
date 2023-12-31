import React from "react";
import PropTypes from "prop-types";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";

/**
 * Component for rendering pagination controls.
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - Callback to set the current page.
 * @param {number} props.itemsPerPage - Number of items to display per page.
 * @param {Array} props.filteredData - The data to be paginated.
 * @returns {JSX.Element} - JSX element representing the pagination controls.
 */
export const PaginationControls = ({
	currentPage,
	setCurrentPage,
	itemsPerPage,
	filteredData,
}) => {
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const badgeText =
		filteredData.length === 0
			? "Table is empty"
			: `Showing ${indexOfFirstItem + 1} to ${Math.min(
					indexOfLastItem,
					filteredData.length
			  )} of ${filteredData.length} entries`;

	return (
		<Stack
			direction="horizontal"
			gap={3}
			className="my-3 d-flex flex-column flex-md-row justify-content-md-between user-select-none"
		>
			{/* Display information about the currently shown items */}
			<Badge
				bg={filteredData.length === 0 ? "secondary" : "primary"}
				className="p-2"
			>
				{badgeText}
			</Badge>
			{/* Pagination control */}
			<Pagination size="sm" className="md-ms-auto my-auto">
				<Pagination.First
					onClick={() => setCurrentPage(1)}
					disabled={currentPage === 1 || filteredData.length === 0}
				/>
				<Pagination.Prev
					onClick={() => setCurrentPage((prev) => prev - 1)}
					disabled={currentPage === 1}
				/>

				<Pagination.Item
					active={filteredData.length !== 0 && "true"}
					disabled={filteredData.length === 0 && "true"}
				>
					{currentPage}
				</Pagination.Item>

				<Pagination.Next
					onClick={() => setCurrentPage((prev) => prev + 1)}
					disabled={
						currentPage === Math.ceil(filteredData.length / itemsPerPage) ||
						filteredData.length === 0
					}
				/>
				<Pagination.Last
					onClick={() => {
						filteredData.length === 0
							? setCurrentPage(1)
							: setCurrentPage(Math.ceil(filteredData.length / itemsPerPage));
					}}
					disabled={
						currentPage ===
						Math.ceil(
							filteredData.length / itemsPerPage || filteredData.length === 0
						)
					}
				/>
			</Pagination>
		</Stack>
	);
};

PaginationControls.propTypes = {
	currentPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	filteredData: PropTypes.array.isRequired,
};
