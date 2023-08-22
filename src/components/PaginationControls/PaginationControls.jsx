import React from "react";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";

export const PaginationControls = ({
	currentPage,
	setCurrentPage,
	itemsPerPage,
	filteredData,
}) => {
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	return (
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
	);
};
