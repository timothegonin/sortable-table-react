import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Component for displaying controls above the table.
 * @param {Object} props - The component props.
 * @param {number} props.visibleDataCount - Number of visible data.
 * @param {string} props.searchTerm - The search term.
 * @param {Function} props.onVisibleDataChange - Callback when visible data count changes.
 * @param {Function} props.onSearchTermChange - Callback when search term changes.
 * @returns {JSX.Element} - JSX element representing the table controls.
 */

export const DataTableControls = ({
	onVisibleDataChange,
	onSearchTermChange,
	visibleDataCount,
	searchTerm,
	setCurrentPage,
}) => {
	const handleVisibleDataChange = (e) => {
		const value = parseInt(e.target.value, 10);
		onVisibleDataChange(value);
	};

	const handleSearchTermChange = (e) => {
		setCurrentPage(1);
		const value = e.target.value;
		onSearchTermChange(value);
	};

	return (
		<Form className="w-100 mb-4">
			<Row className="d-flex flex-column-reverse flex-md-row justify-content-between">
				<Col className="col-8 col-md-4 d-flex align-items-center">
					Show
					<Form.Select
						className="mx-3"
						onChange={handleVisibleDataChange}
						value={visibleDataCount}
						role="button"
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
						onChange={handleSearchTermChange}
						value={searchTerm}
					/>
				</Col>
			</Row>
		</Form>
	);
};

DataTableControls.propTypes = {
	onVisibleDataChange: PropTypes.func.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
	visibleDataCount: PropTypes.number.isRequired,
	searchTerm: PropTypes.string.isRequired,
};
