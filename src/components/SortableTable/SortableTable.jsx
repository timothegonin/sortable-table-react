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

/**
 * Component for displaying a sortable and paginated table with controls.
 * @param {Object} props - The component props.
 * @param {Array} props.data - Data to display in the table.
 * @param {Array} props.tableHeads - Column headers of the table.
 * @returns {JSX.Element} - JSX element representing the sortable and paginated table.
 */
export const SortableTable = ({ data, tableHeads }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearchTerm = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	return (
		<Container fluid="md">
			{/* CONTROLS AND TABLE */}
			<Form className="w-100 mb-4 ">
				<Row className="d-flex flex-column-reverse flex-md-row justify-content-between">
					<Col className="col-8 col-md-4 d-flex align-items-center">
						Show
						<Form.Select className="mx-3">
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
			</Form>

			{/* TableData component to display the sortable table */}
			<TableData data={data} tableHeads={tableHeads} searchTerm={searchTerm} />

			{/* INFOS + PAGINATION */}
			<Stack
				direction="horizontal"
				gap={3}
				className="my-3 d-flex flex-column flex-md-row justify-content-md-between"
			>
				<Badge bg="primary">Showing 1 to 1 of 1 entries</Badge>
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
