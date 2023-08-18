import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import "./style.css";
import { TableData } from "../TableData";
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

	// const handleSearchTerm = (e) => {
	// 	const value = e.target.value;
	// 	setSearchTerm(value);
	// };

	// const handleVisibleDataChange = (e) => {
	// 	const value = parseInt(e.target.value, 10);
	// 	setVisibleDataCount(value);
	// };

	const filteredData = data.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<Container fluid="md">
			{/* CONTROLS AND TABLE */}
			{/* <Form className="w-100 mb-4 ">
				<Row className="d-flex flex-column-reverse flex-md-row justify-content-between">
					<Col className="col-8 col-md-4 d-flex align-items-center">
						Show
						<Form.Select
							className="mx-3"
							onChange={handleVisibleDataChange}
							value={visibleDataCount}
						>
							<option>10</option>
							<option>25</option>
							<option>50</option>
							<option>100</option>
						</Form.Select>
						entries
					</Col>
					<Col className="col-8 mb-3 mb-md-0 col-md-3">
						<Form.Control
							type="search"
							placeholder="Search"
							aria-label="Search"
							onChange={handleSearchTerm}
						/>
					</Col>
				</Row>
			</Form> */}
			{/* DataTableControls component to display the controls of TableData */}
			<DataTableControls
				onVisibleDataChange={setVisibleDataCount}
				onSearchTermChange={setSearchTerm}
				visibleDataCount={visibleDataCount}
				searchTerm={searchTerm}
			/>

			{/* TableData component to display the sortable table */}
			<TableData
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
